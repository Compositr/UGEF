import { SocketStream, WebsocketHandler } from "@fastify/websocket";
import { FastifyInstance, FastifyRequest } from "fastify";
import { Route } from "fastify-file-routes";
import sjson from "secure-json-parse";
import toScamGuild from "../common/utility/convert/ScamGuild";
import { WSEvents, WSMessages } from "../types/ws/WSMessages";
import crypto from "node:crypto";

export const routes: Route = {
  get: {
    handler: async function (
      this: FastifyInstance,
      conn: SocketStream,
      req: FastifyRequest
    ) {
      let isAuthenticated = false;
      const uuid = crypto.randomUUID();
      const { socket } = conn;

      this.log.info(`New WebSocket connection assigned UUID ${uuid}`);
      this.wsSockets.set(uuid, { auth: false, ws: socket });

      socket.on("message", async (message: any) => {
        const json = sjson.safeParse(message);
        // Close invalid JSON
        if (!json) return socket.close();
        this.log.debug(`WebSocket message received`, { json });

        const parsed = WSMessages.safeParse(json);

        // Drop invalid messages
        if (!parsed.success) return;

        const { data } = parsed;

        switch (data.e) {
          case WSEvents.Enum.AUTH: {
            // Drop repeate auths
            if (isAuthenticated) return;
            const { token } = data;
            if (token !== "super-secret-token") {
              socket.send(JSON.stringify({ e: WSEvents.Enum.AUTH_FAILURE }));
              this.wsSockets.delete(uuid);
              return socket.close();
            }
            socket.send(JSON.stringify({ e: WSEvents.Enum.AUTH_SUCCESS }));
            isAuthenticated = true;
            this.wsSockets.set(uuid, { auth: true, ws: socket });

            break;
          }

          case WSEvents.Enum.PING: {
            if (!isAuthenticated) return;

            socket.send(JSON.stringify({ e: WSEvents.Enum.PONG }));
            break;
          }

          case WSEvents.Enum.PONG: {
            // Clients should never send a PONG
            socket.close();
            this.wsSockets.delete(uuid);

            break;
          }

          case WSEvents.Enum.SCAMGUILD: {
            // Clients should never send a SCAMGUILD
            socket.close();
            this.wsSockets.delete(uuid);

            break;
          }

          default: {
            // Clients should never send unknown stuff
            socket.close();
            this.wsSockets.delete(uuid);
            
            break;
          }
        }
      });

      socket.on("close", () => {
        this.log.info(`WebSocket connection closed with UUID ${uuid}`);
        this.wsSockets.delete(uuid);
      });
    } as any,
    websocket: true,
  },
};
