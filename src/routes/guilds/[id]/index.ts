import { Route } from "fastify-file-routes";
import { UnwrappedSnowflake } from "../../../schema/formats/Snowflake";

export const routes: Route = {
  get: {
    handler: async function (req, res) {
      const { id } = req.params as any;

      if (!UnwrappedSnowflake.safeParse(id).success)
        return res.badRequest(`Invalid Snowflake`);

      const guild = await this.prisma.scamGuild.findUnique({
        where: {
          id,
        },
        include: {
          admins: true,
        },
      });

      if (!guild) {
        return res.notFound(`Guild not found in database`);
      }

      return {
        $guild: {
          admins: guild.admins.map((a) => ({
            $user: {
              id: a.id,
            },
          })) as any,
          credits: guild.credits,
          guildType: guild.guildType as any,
          id: guild.id as any,
          invites: guild.invites.map((i) => ({
            $invite: {
              code: i,
            },
          })) as any,
          reason: guild.reason,
        },
      };
    },
  },
};
