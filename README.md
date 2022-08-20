# Universal Guild Exchange Format (UGEF)

A universal format to exchange information about scam guilds. Schemas are located in `schema`. All schemas are JSON-compatible.

Schemas are `zod` schemas, and are compatible with TypeScript and JavaScript

## Terminology

Please use the word `Guild` to reference Discord "servers", to avoid confusion with servers (as in computer servers).

## Schemas

The following section describes the different schemas which can be found in `schema`.

### **Object** `ScamGuild`
> Represents a scam Discord guild

**Note:** Invites are optional, to include no invites simply use an empty `Array`.


### **Object** `User`
> Represents a Discord user

Represents a user, just a named container (`$user`) for a `Snowflake`

### **Enum** `GuildType`
> Enum of machine-readable reasons for a `ScamGuild`

This should be backwards compatible (no name changes, etc.) through minor versions.

### **String** `Invite`
> Regex matching a Discord invite

Works with Vanity URLs as well. Only includes the invite code, does not include `discord.gg/`

### **String** `SemVer`
> Regex matching a Semantic Version

### **String** `Snowflake`
> Regex matching Twitter Snowflakes

Matches any valid Snowflake. Does not account for the Discord epoch.