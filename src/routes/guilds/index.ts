import { Route } from "fastify-file-routes";
import { z } from "zod";
import ScamGuild from "../../schema/Guilds/ScamGuild";

export const routes: Route = {
  get: {
    handler: async function (req, res) {
      const guilds = await this.prisma.scamGuild.findMany({
        include: {
          admins: true,
        },
      });

      const scamGuilds: z.infer<typeof ScamGuild>[] = guilds.map((g) => ({
        $guild: {
          admins: g.admins.map((a) => ({
            $user: {
              id: a.id,
            },
          })) as any,
          credits: g.credits,
          guildType: g.guildType as any,
          id: g.id as any,
          invites: g.invites.map((i) => ({
            $invite: {
              code: i,
            },
          })) as any,
          reason: g.reason,
        },
      }));

      res.status(200).send(scamGuilds);
    },
  },
};
