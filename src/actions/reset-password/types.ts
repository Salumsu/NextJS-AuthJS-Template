import { z } from "zod";
import { ResetPasswordSchema } from "./schema";
import { ActionState } from "../action";


export type InputType = z.infer<typeof ResetPasswordSchema>;
export type ReturnType = ActionState<InputType, null>;