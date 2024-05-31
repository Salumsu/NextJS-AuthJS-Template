import { z } from "zod";
import { TwoFactorSchema } from "./schema";
import { ActionState } from "../action";


export type InputType = z.infer<typeof TwoFactorSchema>;
export type ReturnType = ActionState<InputType, null>;