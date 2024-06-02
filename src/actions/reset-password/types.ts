import { TResetPasswordSchema } from "./schema";
import { ActionState } from "../action";


export type InputType = TResetPasswordSchema;
export type ReturnType = ActionState<InputType, null>;