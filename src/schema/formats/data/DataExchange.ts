import { z } from "zod";
import SemVer from "../SemVer";

export const UnwrappedDataExchange = z.object({
  version: SemVer,
  
});
