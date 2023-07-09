import { z } from "zod";
import {
  createTRPCRouter,
  publicProcedure,
} from "~/server/api/trpc";

const issueFormData = {
  title: z.string(),
  issueType: z.enum(["Bug", "Task"]),
  projectId: z.bigint(),
  createdAt: z.string(),
  status: z.enum(["TODO","INPROGRESS","DONE"])
};

export const issueRouter = createTRPCRouter({
  
  getAll: publicProcedure.query(({ ctx }) => {
    return ctx.prisma.issue.findMany();
  }),

  create: publicProcedure.input(z.object(issueFormData)).mutation(
    ({ ctx, input }) => {
      return ctx.prisma.issue.create({
        data: input,
      });
    }
  )
});