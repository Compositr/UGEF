import { Prisma, } from "@prisma/client";
import { z } from "zod";
import GuildType from "../../../schema/formats/GuildType";
import ScamGuild from "../../../schema/Guilds/ScamGuild";

export default function toScamGuild(
  guild: ScamGuildUGEFConvertable
): z.infer<typeof ScamGuild> {
  return {
    $guild: {
      admins: guild.admins.map((admin) => ({
        $user: {
          id: {
            $snowflake: admin.id,
          },
        },
      })),
      id: {
        $snowflake: guild.id,
      },
      credits: guild.credits,
      discovered: guild.discovered.toISOString(),
      guildType: {
        $guildType: guild.guildType as z.infer<typeof GuildType>["$guildType"],
      },
      invites: guild.invites.map((invite) => ({
        $invite: invite,
      })),
      reason: guild.reason,
    },
  };
}

const ScamGuildUGEFConvertable = Prisma.validator<Prisma.ScamGuildArgs>()({
  include: {
    admins: true,
  },
});

export type ScamGuildUGEFConvertable = Prisma.ScamGuildGetPayload<
  typeof ScamGuildUGEFConvertable
>;
