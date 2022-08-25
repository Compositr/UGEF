import { ZodError } from "zod";

export default function (error: ZodError) {
  return error.issues.map((e) => `${e.code}: ${e.message} ${e.path.join(" ")}`).join(", ");
}
