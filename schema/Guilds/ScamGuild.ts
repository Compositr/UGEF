import { z } from "zod";
import Invite from "../formats/Invite";
import Snowflake from "../formats/Snowflake";
import User from "../Users/User";
import GuildType from "../formats/GuildType";

/**
 * @description An object representing a scam Discord Guild
 * @since v0.0.1
 */
export const UnwrappedGuild = z.object({
  id: Snowflake,
  // Why this is a scam guild
  reason: z.string(),
  // Who discovered this guild
  credits: z.array(z.string()).nonempty(),
  // Guild admins
  admins: z.array(User).nonempty(),
  invites: z.array(Invite),
  guildType: GuildType,
});

export default z.object({
  $guild: UnwrappedGuild,
});
