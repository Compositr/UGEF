import { z } from "zod";

/**
 * @description Regex matching a Discord Invite
 * @since v0.0.1
 */
export const UnwrappedInvite = z.string().regex(/^[\w-]*$/);

export default z.object({
  $invite: UnwrappedInvite,
});
