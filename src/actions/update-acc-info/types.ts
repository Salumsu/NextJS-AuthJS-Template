import { z } from "zod";
import { UpdateAccInfoSchema } from "./schema";
import { ActionState } from "../action";


export type InputType = z.infer<typeof UpdateAccInfoSchema>;
export type ReturnType = ActionState<InputType, null>;