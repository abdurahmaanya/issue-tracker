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
          issueType: z.enum(["Bug", "Task"]),
          projectId: z.number(),
          createdAt: z.string(),
          status: z.enum(["TODO", "INPROGRESS", "DONE"])
        })
    }))
    .mutation(({ ctx, input }) => {
      return ctx.prisma.issue.create({
        data: input.data,
      });
    }),

  update: protectedProcedure
    .input(z.object({
      text: z.number(), data: z.object({
        id: z.number(),
        title: z.string(),
        issueType: z.enum(["Bug", "Task"]),
        projectId: z.number(),
        createdAt: z.string(),
        status: z.enum(["TODO", "INPROGRESS", "DONE"]),
        description: z.string().optional(),
        assignee: z.string().optional(),
        sprintId: z.number().optional(),
        updatedAt: z.date().optional(),
        closedAt: z.date().optional()
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