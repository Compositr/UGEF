import { Route } from "fastify-file-routes";
import pkg from "../../package.json";

export const routes: Route = {
  get: {
    handler: async function (req, res) {
      const guilds = await this.prisma.scamGuild.count();
      const guildTypesAggregate = await this.prisma.scamGuild.groupBy({
        by: ["guildType"],
        _count: {
          _all: true,
        },
      });
      const mostCommonGuildType = guildTypesAggregate.sort(
        (a, b) => b._count._all - a._count._all
      )[0].guildType;
      const leastCommonGuildType = guildTypesAggregate.sort(
        (a, b) => a._count._all - b._count._all
      )[0].guildType;
      res.status(200).send({
        guilds,
        version: pkg.version,
        mostCommonGuildType,
        leastCommonGuildType
      });
    },
  },
};
