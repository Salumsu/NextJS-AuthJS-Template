"use client";

import { useForm } from "react-hook-form";
import { useSession } from "next-auth/react";
import { zodResolver } from "@hookform/resolvers/zod";
import { ElementRef, useRef, useState } from "react";

import {
  ToggleTwoFactorSchema,
  TToggleTwoFactorSchema,
} from "@/actions/toggle-two-factor/schema";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Form, FormControl, FormField, FormItem } from "@/components/ui/form";
import { Checkbox } from "@/components/ui/checkbox";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { useSafeAction } from "@/hooks/action";
import { toggleTwoFactor } from "@/actions/toggle-two-factor";

interface AccountTwoFactorAuthFormProps {
  number_of_confirmations?: number;
}

export const AccountTwoFactorAuthForm = ({
  number_of_confirmations,
}: AccountTwoFactorAuthFormProps) => {
  const session = useSession();
  const user = session?.data?.user;

  const formRef = useRef<ElementRef<"form">>(null);
  const [showDialog, setShowDialog] = useState(false);

  const form = useForm<TToggleTwoFactorSchema>({
    resolver: zodResolver(ToggleTwoFactorSchema),
    defaultValues: {
      enable: user?.isTwoFactorEnabled ?? false,
      delete_confirmations_on_off: false,
    },
  });

  const { execute, isLoading } = useSafeAction(toggleTwoFactor, {
    onSuccess: () => {
      session?.update();
      setShowDialog(false);
    },
  });

  const onSubmit = (values: TToggleTwoFactorSchema) => {
    execute(values);
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        ref={formRef}
        className="flex items-center justify-center"
      >
        <Dialog open={showDialog} onOpenChange={setShowDialog}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Are you sure?</DialogTitle>
            </DialogHeader>
            {user?.isTwoFactorEnabled && (number_of_confirmations ?? 0) > 0 ? (
              <FormField
                control={form.control}
                name="delete_confirmations_on_off"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <div className="flex items-center gap-2">
                        <Checkbox
                          checked={field.value ?? false}
                          onCheckedChange={field.onChange}
                          id="delete_confirmations_on_off"
                          name="delete_confirmations_on_off"
                        />
                        <Label htmlFor="delete_confirmations_on_off">
                          Remove saved devices
                        </Label>
                      </div>
                    </FormControl>
                  </FormItem>
                )}
              />
            ) : (
              <></>
            )}

            <div className="flex justify-end gap-4 items-center">
              <Button
                type="submit"
                disabled={isLoading}
                onClick={() => {
                  form.setValue("enable", !(user?.isTwoFactorEnabled ?? false));
                  formRef.current?.requestSubmit();
                }}
              >
                Confirm
              </Button>
              <Button variant="outline" onClick={() => setShowDialog(false)}>
                Cancel
              </Button>
            </div>
          </DialogContent>
        </Dialog>

        <FormField
          control={form.control}
          name="enable"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Switch
                  checked={field.value}
                  onCheckedChange={() => {
                    setShowDialog(true);
                  }}
                />
              </FormControl>
            </FormItem>
          )}
        />
      </form>
    </Form>
  );
};
