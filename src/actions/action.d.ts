

export type ActionFieldErrors<T> = {
    [K in keyof T]?: string[];
}

export type ActionState<TInput, TOutput> = {
    data?: TOutput;
    fieldErrors?: ActionFieldErrors<TInput>,
    error?: string | null;
    success?: string | null;
}

export type ActionHandler<TInput, TOutput> =
    (validatedData: TInput) => Promise<ActionState<TInput, TOutput>>;

