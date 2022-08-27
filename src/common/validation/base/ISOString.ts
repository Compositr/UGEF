import { z } from "zod";
import isISODate from "../../utility/dates/isISODate";

export default z.string().refine(isISODate, {
  message: "Must be a valid ISO date",
});
