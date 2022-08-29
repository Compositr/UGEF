import fastifyHelmet from "@fastify/helmet";
import Fastify from "fastify";
import { fileRoutes } from "fastify-file-routes";
import path from "path";
import fastifySensible from "@fastify/sensible";
import prismaPlugin from "./plugins/prismaPlugin";
import fastifyWebsocket from "@fastify/websocket"

const fastify = Fastify({
  logger: {
    transport:
      process.env.NODE_ENV === "development"
        ? {
            target: "pino-pretty",
            options: {
              translateTime: "HH:MM:ss Z",
              ignore: "pid,hostname",
            },
          }
        : undefined,
  },
  ignoreTrailingSlash: true,
});

const start = async () => {
  // Plugins
  await fastify.register(fastifyHelmet);
  await fastify.register(fastifySensible);
  await fastify.register(prismaPlugin);
  await fastify.register(fastifyWebsocket)

  // Routing
  await fastify.register(fileRoutes, {
    routesDir: path.join(__dirname, "routes"),
  });

  try {
    await fastify.listen({
      port: parseInt(process.env.PORT ?? "8000"),
      host: "::",
    });
  } catch (err) {
    throw err;
  }
};

start();
