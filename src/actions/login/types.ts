import { z } from "zod";
import { LoginSchema } from "./schema";
import { ActionState } from "../action";


export type InputType = z.infer<typeof LoginSchema>;
export type ReturnType = ActionState<InputType, null>;