import { Sandbox } from "@e2b/code-interpreter";
import { AgentResult, TextMessage } from "@inngest/agent-kit";

export async function getSandbox(sandboxId: string) {
  // Logic to retrieve and return the sandbox details using the sandboxId
  const sandbox = await Sandbox.connect(sandboxId);
  return sandbox;

}

export function lastAssistantTextMessageContent(result:AgentResult)
{
    const lastAssistantTextMessageContentIndex = result.output.findLastIndex(
        (message) => message.role === "assistant", 
    );
    const message = result.output[lastAssistantTextMessageContentIndex] as 
        | TextMessage
        | undefined;
    return message?.content
        ? typeof message.content === "string"
            ? message.content
            : message.content.map((c)=>c.text).join("")
        : undefined;   
};