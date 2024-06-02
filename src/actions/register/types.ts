import { TRegisterSchema } from "./schema";
import { ActionState } from "../action";


export type InputType = TRegisterSchema;
export type ReturnType = ActionState<InputType, null>;