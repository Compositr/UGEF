import { RouteHandlerMethod } from "fastify";

const hanlder: RouteHandlerMethod = async function upgradeToWS(req, res) {
  res
    .status(101)
    .header("Upgrade", "websocket")
    .header("Connection", "upgrade");
};
export default hanlder;
