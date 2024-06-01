import { ActionFieldErrors, ActionState } from "@/actions/action";
import { TSafeAction } from "@/lib/action";
import { useCallback, useState, useTransition } from "react";

interface ActionOptions<TInput, TOutput> {
    onStart?: () => void;
    onSuccess?: (result: ActionState<TInput, TOutput>) => void;
    onError?: (result: ActionState<TInput, TOutput>) => void;
    onComplete?: (result: ActionState<TInput, TOutput>) => void;
}

export const useSafeAction = <TInput, TOutput>(action: TSafeAction<TInput, TOutput>, options?: ActionOptions<TInput, TOutput>) => {
    const [success, setSuccess] = useState<string | null>(null);
    const [error, setError] = useState<string | null>(null);
    const [fieldErrors, setFieldErrors] = useState<ActionFieldErrors<TInput> | null>(null);
    const [data, setData] = useState<TOutput | null>(null);

    const [isLoading, startTransition] = useTransition();

    const execute = useCallback((data: TInput) => {
        startTransition(async () => {
            try {
                options?.onStart?.();
                const res = await action(data);

                if (res.data) {
                    setData(res.data);
                }

                if (res.success) {
                    setSuccess(res.success);
                    options?.onSuccess?.(res)
                }

                if (res.error) {
                    setError(res.error);
                    options?.onError?.(res);
                }

                options?.onComplete?.(res)
            } catch (err) {
                console.log(err);
                setError('Server error')
            }
        })
    }, [action, options])


    return {
        success,
        error,
        fieldErrors,
        data,
        isLoading,
        execute
    }
}