
import { projectsRouter } from "@/modules/projects/server/procesdures";
import { createTRPCRouter } from "../init";
import { messagesRouter } from "@/modules/messages/server/procesdures";
import { usageRouter } from "@/modules/usage/server/procedures";

export const appRouter = createTRPCRouter({
  messages: messagesRouter,
  projects: projectsRouter,
  usage: usageRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
