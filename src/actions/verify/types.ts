import { TVerifySchema } from "./schema";
import { ActionState } from "../action";


export type InputType = TVerifySchema;
export type ReturnType = ActionState<InputType, null>;