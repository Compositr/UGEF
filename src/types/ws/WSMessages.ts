import { z } from "zod";
import ScamGuild from "../../schema/Guilds/ScamGuild";

export const WSEvents = z.enum([
  "AUTH",
  "AUTH_SUCCESS",
  "AUTH_FAILURE",

  "PING",
  "PONG",

  "SCAMGUILD",
]);

export const WSMessages = z.discriminatedUnion("e", [
  z.object({
    e: z.literal(WSEvents.Enum.AUTH),
    token: z.string().min(1),
  }),
  z.object({
    e: z.literal(WSEvents.Enum.AUTH_SUCCESS),
  }),
  z.object({
    e: z.literal(WSEvents.Enum.AUTH_FAILURE),
    reason: z.string(),
  }),
  z.object({
    e: z.literal(WSEvents.Enum.PING),
  }),
  z.object({
    e: z.literal(WSEvents.Enum.PONG),
  }),
  z.object({
    e: z.literal(WSEvents.Enum.SCAMGUILD),
    data: ScamGuild,
  }),
]);
