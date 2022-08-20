import { z } from "zod";

export const UnwrappedSemVer = z
  .string()
  .regex(
    /^(0|[1-9][0-9]*)\.(0|[1-9][0-9]*)\.(0|[1-9][0-9]*)(?:-((?:0|[1-9][0-9]*|[0-9]*[a-z-][0-9a-z-]*)(?:\.(?:0|[1-9][0-9]*|[0-9]*[a-z-][0-9a-z-]*))*))?(?:\+([0-9a-z-]+(?:\.[0-9a-z-]+)*))?$/i
  );

export default z.object({
  $semver: UnwrappedSemVer,
});
