import { TUpdateAccInfoSchema } from "./schema";
import { ActionState } from "../action";


export type InputType = TUpdateAccInfoSchema;
export type ReturnType = ActionState<InputType, null>;