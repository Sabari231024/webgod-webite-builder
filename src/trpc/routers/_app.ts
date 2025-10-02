
import { createTRPCRouter } from "../init";
import { messagesRouter } from "@/modules/messages/server/procesdures";

export const appRouter = createTRPCRouter({
  messages: messagesRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
