import * as z from 'zod';

import { ActionFieldErrors, ActionHandler, ActionState } from '@/actions/action';

export const createSafeActionHandler = <TInput, TOutput>(
    schema: z.Schema<TInput>,
    handler: ActionHandler<TInput, TOutput>
) => {
    return async (data: Partial<TInput>): Promise<ActionState<TInput, TOutput>> => {
        const validateResult = schema.safeParse(data);

        if (!validateResult.success) {
            return {
                fieldErrors: validateResult.error.flatten().fieldErrors as ActionFieldErrors<TInput>
            }
        }

        return handler(validateResult.data);
    }
}

