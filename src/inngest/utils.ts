import { Sandbox } from "@e2b/code-interpreter";

export async function getSandbox(sandboxId: string) {
  // Logic to retrieve and return the sandbox details using the sandboxId
  const sandbox = await Sandbox.connect(sandboxId);
  return sandbox;

}