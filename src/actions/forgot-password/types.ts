import { TForgotPasswordSchema } from "./schema";
import { ActionState } from "../action";


export type InputType = TForgotPasswordSchema;
export type ReturnType = ActionState<InputType, null>;