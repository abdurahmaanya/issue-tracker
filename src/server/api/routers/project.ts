import { z } from "zod";
import {
    createTRPCRouter,
    protectedProcedure,
} from "~/server/api/trpc";
import { type Project } from "@prisma/client";

export const projectRouter = createTRPCRouter({
    getAll: protectedProcedure.query(({ ctx }) => {
        return ctx.prisma.project.findMany() as unknown as Project[];
    }),

    getById: protectedProcedure
        .input(z.object({ id: z.number() }))
        .query(({ ctx, input }) => {
            return ctx.prisma.project.findUnique({
                where: {
                    id: input.id,
                },
            });
        }),

    create: protectedProcedure
        .input(z.object({
            data: z.object({
                name: z.string(),
                ownerId: z.string(),
                teamId: z.number().optional(),
                isPersonal: z.boolean().optional(),
            })
        }))
        .mutation(({ ctx, input }) => {
            return ctx.prisma.project.create({
                data: input.data as unknown as Project,
            });
        }),

    update: protectedProcedure
        .input(z.object({
            id: z.number(), data: z.object({
                name: z.string(),
                ownerId: z.string(),
                teamId: z.number().optional(),
                isPersonal: z.boolean().optional(),
            })
        }))
        .mutation(({ ctx, input }) => {
            return ctx.prisma.project.update({
                where: {
                    id: input.id,
                },
                data: input.data,
            });
        }),

    delete: protectedProcedure
        .input(z.object({ id: z.number() }))
        .mutation(({ ctx, input }) => {
            return ctx.prisma.project.delete({
                where: {
                    id: input.id,
                },
            });
        }),
});