import { z } from "zod";
import { RegisterSchema } from "./schema";
import { ActionState } from "../action";


export type InputType = z.infer<typeof RegisterSchema>;
export type ReturnType = ActionState<InputType, null>;