# Universal Guild Exchange Format (UGEF)

A universal format to exchange information about scam guilds. Schemas are located in `schema`. All schemas are JSON-compatible.

Schemas are `zod` schemas, and are compatible with TypeScript and JavaScript

## Goals

The goal of this project is to provide a common format for developers to exchange information about known Discord scam guilds.

The UGEF is designed to be interoperable and federated between developers to distribute information quickly. This format can both be stored in a database and sent over the internet.

## Terminology

Please use the word `Guild` to reference Discord "servers", to avoid confusion with servers (as in computer servers).

## Schemas

The following section describes the different schemas which can be found in `schema`.

### **Object** `ScamGuild`

> Represents a scam Discord guild

`ScamGuild.discovered` refers to when this ScamGuild was first discovered, and should not be modified when it is passed around.

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

### **Object** `DataPacket`

> Object to wrap other data types

Object to wrap other data in a neat packet, ready for network transfer. Also includes SemVer information
