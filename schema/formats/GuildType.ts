import { z } from "zod";

/**
 * @description Enum of Guild types
 * @since v0.0.1
 *
 * IMPORTANT:
 * Anything which is illegal should *not* be added to this list. Instead it should be directly reported to authorities. This includes CSAM, violence, extremism,
 * etc. anything illegal
 */
export const UnwrappedGuildType = z.enum([
  // Standard QR Code Scam
  "QR",
  // TOS-violating guild
  "DISCORD_TOS",
  // Off-platform scams such as Roblox
  "OFF_PLATFORM",
  // Fake nitro
  "FAKE_NITRO",
  // Fraud such as selling stolen accounts
  // Or stolen nitro
  "FRAUD",
  // Distributing selfbots
  "SELFBOT",
  // Distributing malware or viruses
  "MALWARE",
  // OAuth or App Authorisation abuse
  "APP_ABUSE",
  // General spam guilds
  // Including coordinating spam
  "SPAM",
  // Guilds which coordinate witch-hunting or similar activities
  "WITCH_HUNTING",
  // Servers which use non-verified backup bots
  // These are usually used to 'backup' a server from being termed
  "BACKUP_BOTS",
]);

export default z.object({
  $guildType: UnwrappedGuildType,
});
