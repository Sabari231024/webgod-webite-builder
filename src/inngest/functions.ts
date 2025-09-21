import { inngest } from "./client";
import { gemini, createAgent } from "@inngest/agent-kit";

export const helloWorld = inngest.createFunction(
  { id: "hello-world" },
  { event: "test/hello.world" },
  async ({ event}) => {
    const codeAgent = createAgent({
      name: "code-agent",
      system: "you're an next.js developer. You write readable, maintainable code.you write simple Next.js snippets & React snippets.",
      model: gemini({ model: "gemini-1.5-flash" }),
    });
    const { output } = await codeAgent.run(
        `Write teh following snippetof code for: ${event.data.value}`,
    );
    console.log("Output:", output);
    return { output };
  },
);