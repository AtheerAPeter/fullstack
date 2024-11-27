import { serve } from "@hono/node-server";
import { Hono } from "hono";
import { cors } from "hono/cors";
import { PrismaClient } from "@prisma/client";

import v1 from "./routes/v1.js";

export const prisma = new PrismaClient();

const app = new Hono();

app.use("*", cors());

async function main() {
  app.route("/v1", v1);
}

const port = process.env.PORT || 4000;
console.log(`Server is running on port: ${port}`);

serve({
  fetch: app.fetch,
  port: Number(port),
});

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
