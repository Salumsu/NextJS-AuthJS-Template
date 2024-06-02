import { TToggleTwoFactorSchema } from "./schema";
import { ActionState } from "../action";


export type InputType = TToggleTwoFactorSchema;
export type ReturnType = ActionState<InputType, null>;