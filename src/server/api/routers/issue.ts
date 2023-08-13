import { type Issue } from "@prisma/client";
import { z } from "zod";
import {
  createTRPCRouter,
  protectedProcedure,
} from "~/server/api/trpc";


export const issueRouter = createTRPCRouter({

  getAll: protectedProcedure.query(({ ctx }) => {
    return ctx.prisma.issue.findMany();
  }),

  getById: protectedProcedure
    .input(z.object({ id: z.number() }))
    .query(({ ctx, input }) => {
      return ctx.prisma.issue.findUnique({
        where: {
          id: input.id,
        },
      });
    }),

  create: protectedProcedure
    .input(z.object({
      data: z.object(
        {
          title: z.string(),
          issueType: z.string(),
          projectId: z.number(),
          createdAt: z.date(),
          status: z.string()
        })
    }))
    .mutation(({ ctx, input }) => {
      return ctx.prisma.issue.create({
        data: input.data as Issue,
      });
    }),

  update: protectedProcedure
    .input(z.object({ data: z.object({
        id: z.number(),
        title: z.string(),
        issueType: z.string(),
        projectId: z.number(),
        createdAt: z.date(),
        status: z.string(),
        description: z.string().optional().nullable(),
        assignee: z.string().optional().nullable(),
        sprintId: z.number().optional().nullable(),
        updatedAt: z.date().optional().nullable(),
        closedAt: z.date().optional().nullable()
      })
    }))
    .mutation(({ ctx, input }) => {
      return ctx.prisma.issue.update({
        where: {
          id: input.data.id,
        },
        data: input.data,
      });
    }),

  delete: protectedProcedure
    .input(z.object({ id: z.number() }))
    .mutation(({ ctx, input }) => {
      return ctx.prisma.issue.delete({
        where: {
          id: input.id,
        },
      });
    }),
});