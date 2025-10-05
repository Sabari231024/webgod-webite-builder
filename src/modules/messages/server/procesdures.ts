import { prisma }  from "@/lib/db";
import { inngest } from "@/inngest/client";
import { protectedProcedure, createTRPCRouter } from "@/trpc/init";
import { z } from "zod";
import { TRPCError } from "@trpc/server";
import { consumeCredits } from "@/lib/usage";
export const messagesRouter = createTRPCRouter({
    getMany: protectedProcedure
    .input(
        z.object(
            {
                projectId: z.string().min(1,{message:"Project ID is required"}),
            }
        ),
    )
    .query(async({input,ctx})=>{
        const messages = await prisma.message.findMany({
            where: {
                projectId: input.projectId,
                project: {
                    userId: ctx.auth.userId,
                },
            },
            include: {
                fragment: true,
            },
            orderBy: {
            updatedAt: "asc",
        },
    });
        return messages;
    }),
    create: protectedProcedure
    .input(
        z.object(
            {
                value: z.string()
                .min(1,{message:"Message is required"})
                .max(5000,{message:"Prompt must be less than 5000 characters"}),
                projectId: z.string().min(1,{message:"Project ID is required"}),
            }
        ),
    )
        .mutation(async({input,ctx})=>{
            const existingProject = await prisma.project.findUnique({
                where: {
                    id: input.projectId,
                    userId: ctx.auth.userId,
                },
            });
            if(!existingProject){
                throw new TRPCError({
                    code: "NOT_FOUND",
                    message: "Project not found",
                })
            }
            try {
                await consumeCredits(); 
            }
            catch (e){
                if (e instanceof Error){ //something failed not rate limit
                    throw new TRPCError({
                        code: "BAD_REQUEST",
                        message: e.message,
                    })
                }
                else{
                    throw new TRPCError({
                        code: "TOO_MANY_REQUESTS",
                        message: "You have no credits left. Please upgrade your account.",
                    })
                }
            }
            const createdMessage = await prisma.message.create(
                {
                    data: {
                        projectId: existingProject.id,
                        content: input.value,
                        role: "USER",
                        type: "RESULT",
                    },
                });
            await inngest.send({
                    name: "code-agent/run",
                    data: {
                      value: input.value,
                      projectId: input.projectId,
                    },
                  });
            return createdMessage;
    })
});
// message.create()