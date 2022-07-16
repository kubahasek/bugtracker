import { createRouter } from "./context";
import { z } from "zod";
import { Resolver } from "dns";
import { PrismaClient } from "@prisma/client";

const db = new PrismaClient();

export const Router = createRouter()
  .query("getIssues", {
    async resolve(req) {
      const issues = await db.issue.findMany({ include: { Project: true } });
      return issues;
    },
  })
  .query("getCategories", {
    async resolve(req) {
      const categories = await db.category.findMany();
      return categories;
    },
  })
  .query("getProjects", {
    async resolve(req) {
      const projects = await db.project.findMany();
      return projects;
    },
  })
  .query("getIssue", {
    input: z.number(),
    async resolve(input) {
      const issue = await db.issue.findUnique({
        where: { id: input.input },
        include: { Project: true, author: true, Category: true },
      });
      return issue;
    },
  })
  .mutation("createIssue", {
    input: z.object({
      title: z.string().min(1),
      userid: z.number().min(1),
      content: z.string().min(1),
      categoryId: z.number().min(1),
      projectId: z.number().min(1),
    }),
    async resolve({ input }) {
      const issue = await db.issue.create({
        data: input,
      });
      return issue;
    },
  })
  .mutation("solveIssue", {
    input: z.object({
      id: z.number().min(1),
    }),
    async resolve({ input }) {
      const issue = await db.issue.update({
        where: { id: input.id },
        data: { done: true },
      });
      return { ok: true };
    },
  });
