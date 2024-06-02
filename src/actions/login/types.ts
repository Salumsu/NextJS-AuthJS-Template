import { TLoginSchema } from "./schema";
import { ActionState } from "../action";


export type InputType = TLoginSchema;
export type ReturnType = ActionState<InputType, null>;