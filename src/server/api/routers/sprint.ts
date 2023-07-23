import { z } from "zod";
import {
    createTRPCRouter,
    protectedProcedure,
} from "~/server/api/trpc";

export const sprintRouter = createTRPCRouter({
    getALl: protectedProcedure.query(({ ctx }) => {
        return ctx.prisma.sprint.findMany();
    }),

    getById: protectedProcedure
        .input(z.object({ id: z.number() }))
        .query(({ ctx, input }) => {
            return ctx.prisma.sprint.findUnique({
                where: {
                    id: input.id,
                },
            });
        }),

    create: protectedProcedure
        .input(z.object({
            data: z.object({
                name: z.string(),
                projectId: z.number()
            })
        }))
        .mutation(({ ctx, input }) => {
            return ctx.prisma.sprint.create({
                data: input.data,
            });
        }),

    update: protectedProcedure
        .input(z.object({
            id: z.number(), data: z.object({
                name: z.string(),
                startDate: z.date(),
                endDate: z.date(),
                projectId: z.number(),
                status: z.enum(["TODO", "INPROGRESS", "DONE"]),
                goal: z.string()
            })
        }))
        .mutation(({ ctx, input }) => {
            return ctx.prisma.sprint.update({
                where: {
                    id: input.id,
                },
                data: input.data,
            });
        }),

    delete: protectedProcedure
        .input(z.object({ id: z.number() }))
        .mutation(({ ctx, input }) => {
            return ctx.prisma.sprint.delete({
                where: {
                    id: input.id,
                },
            });
        }),
});