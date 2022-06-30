// src/server/router/index.ts
import { createRouter } from "./context";
import superjson from "superjson";

import { Router } from "./router";

export const appRouter = createRouter()
  .transformer(superjson)
  .merge("example.", Router);

// export type definition of API
export type AppRouter = typeof appRouter;
