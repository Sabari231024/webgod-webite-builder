import { inngest } from "./client";
import { gemini, createAgent } from "@inngest/agent-kit";
import { Sandbox } from '@e2b/code-interpreter'
import { getSandbox } from "./utils";
export const helloWorld = inngest.createFunction(
  { id: "hello-world" },
  { event: "test/hello.world" },
  async ({ event,step }) => {
    const sandboxId = await step.run("get-sandbox-id",async()=>{
      const sandbox = await Sandbox.create('webgor-nextjs-test2')
      return sandbox.sandboxId;
    })
    const model = gemini({ model: "gemini-2.5-flash" });
    const codeAgent = createAgent({
      name: "code-agent",
      system: "you're an next.js developer. You write readable, maintainable code.you write simple Next.js snippets & React snippets.",
      model: model,
    });
    const { output } = await codeAgent.run(
        `Write teh following snippetof code for: ${event.data.value}`,
    );
    console.log("Output:", output);
    const sandboxUrl = await step.run("get-sandbox-url",async()=>{
      const sandbox = await getSandbox(sandboxId)
      const host = sandbox.getHost(3000);
      return `http://${host}`;
    })
    return { output , sandboxUrl};
  },
);