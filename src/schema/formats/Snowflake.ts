import { z } from "zod";

/**
 * @description Regex matching a Twitter Snowflake
 * @since v0.0.1
 */
export const UnwrappedSnowflake = z.string().regex(/^[0-9]{7,}$/);

const WrappedSnowflake = z.object({
  $snowflake: UnwrappedSnowflake,
});

export const SnowflakeObject = z.object({
  id: WrappedSnowflake,
});

export default WrappedSnowflake;
