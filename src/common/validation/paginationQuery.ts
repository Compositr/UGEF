import { z } from "zod";
import { UnwrappedGuildType } from "../../schema/formats/GuildType";
import { UnwrappedSnowflake } from "../../schema/formats/Snowflake";
import ISOString from "./base/ISOString";

export default z
  .object({
    cursor: UnwrappedSnowflake,
    take: z.preprocess(
      (v) => Number(v),
      z.number().min(1).max(100).default(100)
    ),
    skip: z.preprocess((v) => Number(v), z.number()),
    from: ISOString,
    to: ISOString,
    orderBy: z.enum(["discovered", "guildType"]),
    orderByOrder: z.enum(["asc", "desc"]),
    guildType: UnwrappedGuildType
  })
  .passthrough();
