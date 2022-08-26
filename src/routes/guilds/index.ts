import { Route } from "fastify-file-routes";
import { z } from "zod";
import validationErrorToString from "../../common/utility/validationErrorToString";
import paginationQuery from "../../common/validation/paginationQuery";
import ScamGuild from "../../schema/Guilds/ScamGuild";

export const routes: Route = {
  get: {
    handler: async function (req, res) {
      const validatedQuery = paginationQuery.partial().safeParse(req.query);

      if (!validatedQuery.success)
        return res.badRequest(validationErrorToString(validatedQuery.error));

      try {
        const guilds = await this.prisma.scamGuild.findMany({
          include: {
            admins: true,
          },
          cursor: validatedQuery.data?.cursor
            ? {
                id: validatedQuery.data?.cursor,
              }
            : undefined,
          take: validatedQuery.data?.take,
          // Ternary operator is used to make sure
          skip: validatedQuery.data?.skip ?? validatedQuery.data.cursor ? 1 : 0,
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
      } catch (error) {
        res.internalServerError(`Could not fetch ScamGuilds`);
      }
    },
  },
};
