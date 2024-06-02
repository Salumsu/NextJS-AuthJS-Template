import { TTwoFactorSchema } from "./schema";
import { ActionState } from "../action";


export type InputType = TTwoFactorSchema;
export type ReturnType = ActionState<InputType, null>;