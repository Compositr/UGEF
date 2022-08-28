import { z } from "zod";
import Invite from "../formats/Invite";
import Snowflake from "../formats/Snowflake";
import User from "../Users/User";
import GuildType from "../formats/GuildType";
import ISOString from "../../common/validation/base/ISOString";

/**
 * @description An object representing a scam Discord Guild
 * @since v0.0.1
 */
export const UnwrappedGuild = z.object({
  id: Snowflake,
  // Why this is a scam guild
  reason: z.string(),
  // Who discovered this guild
  // Array to credit multiple people/groups
  credits: z.array(z.string()),
  // Guild admins
  // This includes the Owner of the guild
  admins: z.array(User),
  invites: z.array(Invite),
  guildType: GuildType,

  // This must be a
  discovered: ISOString,
});

export default z.object({
  $guild: UnwrappedGuild,
});
