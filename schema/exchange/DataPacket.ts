import { z } from "zod";
import SemVer from "../formats/SemVer";

export default z.object({
  version: SemVer,
  data: z.any(),
});
