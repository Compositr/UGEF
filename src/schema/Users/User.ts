import { z } from "zod";
import { SnowflakeObject } from "../formats/Snowflake";

/**
 * @description An object representing a Discord user
 * @since v0.0.1
 */
export default z.object({
  $user: SnowflakeObject,
});
