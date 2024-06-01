"use client";

import { useForm } from "react-hook-form";
import { useSession } from "next-auth/react";
import { zodResolver } from "@hookform/resolvers/zod";

import {
  TUpdateAccInfoSchema,
  UpdateAccInfoSchema,
} from "@/actions/update-acc-info/schema";

import { FormInput } from "@/components/form/input";
import { FormSubmit } from "@/components/form/submit";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { useSafeAction } from "@/hooks/action";
import { updateAccInfo } from "@/actions/update-acc-info";
import { FormSuccess } from "../form/success";
import { FormError } from "../form/error";

export const AccountInformationForm = () => {
  const session = useSession();
  const user = session?.data?.user;

  const form = useForm<TUpdateAccInfoSchema>({
    resolver: zodResolver(UpdateAccInfoSchema),
    defaultValues: {
      name: user?.name ?? "",
      password: "",
      confirm_password: "",
    },
  });

  const { execute, isLoading, success, error } = useSafeAction(updateAccInfo, {
    onSuccess: () => {
      session?.update();
      form.setValue("password", "");
      form.setValue("confirm_password", "");
      form.reset(
        {},
        {
          keepValues: true,
          keepDirty: false,
        }
      );
    },
  });

  const onSubmit = (values: TUpdateAccInfoSchema) => {
    execute(values);
  };

  return (
    <Form {...form}>
      <form
        className="max-w-[500px] space-y-2"
        onSubmit={form.handleSubmit(onSubmit)}
      >
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <FormInput
                  label="Name"
                  id="name"
                  placeholder="John Doe"
                  disabled={isLoading}
                  {...field}
                />
              </FormControl>
              <FormMessage {...field} />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <FormInput
                  label="Password"
                  id="password"
                  placeholder="******"
                  type="password"
                  disabled={isLoading}
                  {...field}
                />
              </FormControl>
              <FormMessage {...field} />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="confirm_password"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <FormInput
                  label="Confirm password"
                  id="confirm_password"
                  placeholder="******"
                  disabled={isLoading}
                  type="password"
                  {...field}
                />
              </FormControl>
              <FormMessage {...field} />
            </FormItem>
          )}
        />

        {success && <FormSuccess>{success}</FormSuccess>}
        {error && <FormError>{error}</FormError>}
        <FormSubmit
          className="w-full"
          disabled={
            !form.formState.isDirty || !form.formState.isValid || isLoading
          }
        >
          Save
        </FormSubmit>
      </form>
    </Form>
  );
};
