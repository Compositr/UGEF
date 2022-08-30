import fp from "fastify-plugin";
import fastify, { FastifyPluginAsync } from "fastify";
import { PrismaClient } from "@prisma/client";
import toScamGuild from "../common/utility/convert/ScamGuild";
import { inspect } from "node:util";

// Use TypeScript module augmentation to declare the type of server.prisma to be PrismaClient
declare module "fastify" {
  interface FastifyInstance {
    prisma: PrismaClient;
  }
}

const prismaPlugin: FastifyPluginAsync = fp(async (server, options) => {
  const prisma = new PrismaClient();

  await prisma.$connect();

  // Make Prisma Client available through the fastify server instance: server.prisma
  server.decorate("prisma", prisma);

  server.addHook("onClose", async (server) => {
    await server.prisma.$disconnect();
  });

  // Middlewares

  // Logging
  prisma.$use(async (params, next) => {
    const before = Date.now();

    const result = await next(params);

    const after = Date.now();

    server.log.info(
      `Query ${params.model}.${params.action} took ${after - before}ms`
    );

    return result;
  });

  prisma.$use(async (params, next) => {
    if (params.action === "create" && params.model === "ScamGuild") {
      const result: any = await next(params);

      const guild = await prisma.scamGuild.findUnique({
        where: { id: result.id },
        include: {
          admins: true,
        },
      });

      server.log.info(guild);

      if (guild) {
        server.log.info(inspect(server.wsSockets));
        for (const socket of server.wsSockets.values()) {
          if (!socket.auth) continue;
          try {
            socket.ws.send(
              JSON.stringify({
                e: "SCAM_GUILD_CREATED",
                data: toScamGuild(guild),
              })
            );
          } catch (err) {
            server.log.error(`Failed to send message to WebSocket`, { err });
          }
        }
      }

      return result;
    }

    return next(params);
  });
});

export default prismaPlugin;
