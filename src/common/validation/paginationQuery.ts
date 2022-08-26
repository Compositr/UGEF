import { z } from "zod";
import { UnwrappedSnowflake } from "../../schema/formats/Snowflake";

export default z
  .object({
    cursor: UnwrappedSnowflake,
    take: z.preprocess(
      (v) => Number(v),
      z.number().min(1).max(100).default(100)
    ),
    skip: z.preprocess((v) => Number(v), z.number()),
  })
  .passthrough();