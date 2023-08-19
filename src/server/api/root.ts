import { exampleRouter } from "~/server/api/routers/example";
import { createTRPCRouter } from "~/server/api/trpc";
import { issueRouter } from "~/server/api/routers/issue";
import { sprintRouter } from "./routers/sprint";
import { projectRouter } from "./routers/project";

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here.
 */
export const appRouter = createTRPCRouter({
  example: exampleRouter,
  issue: issueRouter,
  sprint: sprintRouter,
  project: projectRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
