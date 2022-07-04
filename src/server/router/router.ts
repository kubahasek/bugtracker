import { createRouter } from "./context";
import { z } from "zod";
import { Resolver } from "dns";
import { PrismaClient } from "@prisma/client";

const db = new PrismaClient();

export const Router = createRouter().query("getIssues", {
  async resolve(req) {
    const issues = await db.issue.findMany({ include: { Project: true } });
    return issues;
  },
});
