import { z } from "zod";

/**
 * @description Regex matching a Twitter Snowflake
 * @since v0.0.1
 */
export const UnwrappedSnowflake = z.string().regex(/^[0-9]$/);

export const SnowflakeObject = z.object({
  id: UnwrappedSnowflake,
})

export default z.object({
  $snowflake: UnwrappedSnowflake,
});
