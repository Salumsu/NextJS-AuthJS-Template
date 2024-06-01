import * as z from 'zod';

import { ActionFieldErrors, ActionHandler, ActionHandlerWithAuth, ActionState } from '@/actions/action';
import { auth } from '@/auth';

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

export type TSafeAction<TInput, TOutput> = ReturnType<typeof createSafeActionHandler<TInput, TOutput>>

export const createAuthOnlyAction = <TInput, TOutput>(
    handler: ActionHandlerWithAuth<TInput, TOutput>
) => {
    return async (data: TInput): Promise<ActionState<TInput, TOutput>> => {
        const session = await auth();

        if (!session || !session.user) {
            return {
                error: "Unauthenticated"
            }
        }

        return handler(data, session.user);
    }
}