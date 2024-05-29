import { z } from "zod";
import { ForgotPasswordSchema } from "./schema";
import { ActionState } from "../action";


export type InputType = z.infer<typeof ForgotPasswordSchema>;
export type ReturnType = ActionState<InputType, null>;