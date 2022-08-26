import { Route } from "fastify-file-routes";
import { z } from "zod";
import validationErrorToString from "../../../common/utility/validationErrorToString";
import { UnwrappedSnowflake } from "../../../schema/formats/Snowflake";
import ScamGuild from "../../../schema/Guilds/ScamGuild";

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
        return res.notFound(`ScamGuild not found in database`);
      }

      return {
        $guild: {
          admins: guild.admins.map((a) => ({
            $user: {
              id: {
                $snowflake: a.id,
              },
            },
          })),
          credits: guild.credits,
          guildType: guild.guildType as any,
          id: { $snowflake: guild.id },
          invites: guild.invites.map((i) => ({
            $invite: i,
          })),
          reason: guild.reason,
        },
      } as z.infer<typeof ScamGuild>;
    },
  },

  post: {
    handler: async function (req, res) {
      if (req.headers.authorization !== process.env.APIKEY)
        return res.unauthorized("Invalid API key");

      const validBody = ScamGuild.safeParse(req.body);

      if (!validBody.success)
        return res.badRequest(validationErrorToString(validBody.error));

      const { id } = req.params as any;
      const {
        $guild: { admins, credits, guildType, invites, reason },
      } = validBody.data;

      if (!UnwrappedSnowflake.safeParse(id).success)
        return res.badRequest(`Invalid Snowflake`);

      const guild = await this.prisma.scamGuild.findUnique({
        where: {
          id,
        },
        select: {
          id: true,
        },
      });

      if (guild)
        return res.conflict(
          `ScamGuild with the same ID already exists in database`
        );

      try {
        await this.prisma.scamGuild.create({
          data: {
            admins: {
              connectOrCreate: admins.map((a) => ({
                create: {
                  id: a.$user.id.$snowflake,
                },
                where: {
                  id: a.$user.id.$snowflake,
                },
              })),
            },

            guildType: guildType.$guildType,
            id,
            reason,
            credits: credits,
            invites: invites.map((i) => i.$invite),
          },
        });

        return res.status(201).send();
      } catch (err) {
        return res.internalServerError(`Error creating ScamGuild`);
      }
    },
  },

  patch: {
    handler: async function (req, res) {
      if (req.headers.authorization !== process.env.APIKEY)
        return res.unauthorized("Invalid API key");

      const validBody = ScamGuild.safeParse(req.body);

      if (!validBody.success)
        return res.badRequest(validationErrorToString(validBody.error));

      const { id } = req.params as any;
      const {
        $guild: { admins, credits, guildType, invites, reason },
      } = validBody.data;

      if (!UnwrappedSnowflake.safeParse(id).success)
        return res.badRequest(`Invalid Snowflake`);

      const guild = await this.prisma.scamGuild.findUnique({
        where: {
          id,
        },
        select: {
          id: true,
        },
      });

      if (!guild) return res.notFound(`ScamGuild not found in database`);

      try {
        await this.prisma.scamGuild.update({
          where: {
            id: guild.id,
          },
          data: {
            admins: {
              connectOrCreate: admins.map((a) => ({
                where: {
                  id: a.$user.id.$snowflake,
                },
                create: {
                  id: a.$user.id.$snowflake,
                },
              })),
            },
            credits,
            guildType: guildType.$guildType,
            invites: invites.map((i) => i.$invite),
            reason,
          },
        });

        return res.status(204).send();
      } catch (err) {
        return res.internalServerError(`Error patching ScamGuild`);
      }
    },
  },
};
