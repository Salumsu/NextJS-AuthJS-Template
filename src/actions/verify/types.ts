import { z } from "zod";
import { VerifySchema } from "./schema";
import { ActionState } from "../action";


export type InputType = z.infer<typeof VerifySchema>;
export type ReturnType = ActionState<InputType, null>;