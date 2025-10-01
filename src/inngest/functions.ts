import { z } from "zod";
import { inngest } from "./client";
import { gemini, createAgent, createTool, createNetwork } from "@inngest/agent-kit";
import { Sandbox } from '@e2b/code-interpreter'
import { getSandbox, lastAssistantTextMessageContent } from "./utils";
import { PROMPT } from "@/prompt";

export const helloWorld = inngest.createFunction(
  { id: "hello-world" },
  { event: "test/hello.world" },
  async ({ event,step }) => {
    const sandboxId = await step.run("get-sandbox-id",async()=>{
      const sandbox = await Sandbox.create('webgor-nextjs-test2')
      return sandbox.sandboxId;
    })
    const model = gemini({
    model: "gemini-2.5-pro",
  });
    const codeAgent = createAgent({
      name: "code-agent",
      description: "An Expert AI Agent that writes code in a sandboxed Next.js environment",
      system: PROMPT,
      model: model,
      tools:[
        createTool({
          name: "terminal",
          description: "use the terminal to run commands",
          parameters: z.object({
            command: z.string(),
          }),
          handler: async ({ command },{step}) => {
            return await step?.run("terminal",async()=>{
              const buffers = {stdout:"",stderr:""};
              try{
                const sandbox = await getSandbox(sandboxId);
                const result = await sandbox.commands.run(command,{
                  onStdout:(data:string) => {
                    buffers.stdout += data;
                  },
                  onStderr:(data:string) => {
                    buffers.stderr += data;
                  }
                });
                return result.stdout;
              }
              catch (e){
                console.error(
                  `command failed: ${e} \n stdout: ${buffers.stdout} \n stderr: ${buffers.stderr}`
                );
                return `command failed: ${e} \n stdout: ${buffers.stdout} \n stderr: ${buffers.stderr}`;
              }
            })
        }}),
        createTool({
          name:"createOrUpdateFiles",
          description:"Create or update files in the sandbox",
          parameters: z.object(
            {
              files: z.array(
                z.object({
                  path: z.string(),
                  content: z.string(),
                })
              )
            }
          ),
          handler: async ({ files },{step,network}) => { 
            const newFiles = await step?.run("CreateOrUpdateFiles",async()=>{
              try{
                const updatedFiles = network.state.data.files || {};
                const sandbox = await getSandbox(sandboxId);
                for (const file of files){
                  await sandbox.files.write(file.path,file.content);
                  updatedFiles[file.path] = file.content;

                }
                return updatedFiles;
              }
              catch(e){
                return "error "+e;
              }
            });
            if (typeof newFiles === "object"){
              network.state.data.files = newFiles;
            }
          }
        }),
        createTool({
          name:"readFile",
          description:"read a file from the sandbox",
          parameters: z.object({
            files: z.array(z.string()),
          }),
          handler: async({files},{step}) => {
            return await step?.run("readFile",async()=>{
              try{
                const sandbox = await getSandbox(sandboxId);  
                const contents = [];
                for (const file of files){
                  const content = await sandbox.files.read(file);
                  contents.push({path:file,content})
                }
                return JSON.stringify(contents);
              }
              catch(e){
                return "error "+e;
              }
            })
          },
        })
      ],
      lifecycle:{
        onResponse: async ({result,network})=>{
          const lastAssistantMessagetext = lastAssistantTextMessageContent(result);
          if (lastAssistantMessagetext && network){
            if (lastAssistantMessagetext.includes("<task_summary>")){
              network.state.data.summary = lastAssistantMessagetext;
            }
        }
        return result;
      }
    }
    });

    const network = createNetwork({
      name:"coding-agent",
      agents: [codeAgent],
      maxIter: 15,
      router: async({network}) => {
        const summary = network.state.data.summary;
        if (summary){
          return; 
        }
        return codeAgent;
      },
    });

    /*
    const { output } = await codeAgent.run(
        `Write teh following snippetof code for: ${event.data.value}`,
    ); use network instead of this agent
    */
   const result = await network.run(`
Please implement the following feature in the sandbox environment. 
Only use tools: terminal, createOrUpdateFiles, readFiles.
Do not output code inline. Follow all PROMPT instructions.
Task: ${event.data.value}
`);

    const sandboxUrl = await step.run("get-sandbox-url",async()=>{
      const sandbox = await getSandbox(sandboxId)
      const host = sandbox.getHost(3000);
      return `http://${host}`;
    })
    return { 
      url: sandboxUrl,
      title: "Fragment",
      files: result.state.data.files,
      summary: result.state.data.summary,
    };
  },
);