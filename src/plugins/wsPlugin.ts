import fp from "fastify-plugin";
import { FastifyPluginAsync } from "fastify";
import { PrismaClient } from "@prisma/client";
import { WebSocket } from "ws";

// Use TypeScript module augmentation to declare the type of server.prisma to be PrismaClient
declare module "fastify" {
  interface FastifyInstance {
    wsSockets: Map<string, { auth: boolean; ws: WebSocket }>;
  }
}

const wsPlugin: FastifyPluginAsync = fp(async (server, options) => {
  server.decorate("wsSockets", new Map<string, WebSocket>());
});

export default wsPlugin;
