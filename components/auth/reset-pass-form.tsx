"use client";
import React from "react";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { forgotPasswordSchema } from "@/lib/zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";

const emailFormSchema = forgotPasswordSchema;

const ResetPassForm = () => {
  const emailForm = useForm<z.infer<typeof emailFormSchema>>({
    resolver: zodResolver(emailFormSchema),
    defaultValues: {
      email: "",
    },
  });

  const onEmailFormSubmit = async (
    values: z.infer<typeof emailFormSchema>
  ) => {};
  return (
    <Form {...emailForm}>
      <form
        onSubmit={emailForm.handleSubmit(onEmailFormSubmit)}
        className="space-y-8"
      >
        <FormField
          control={emailForm.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input placeholder="test@example.com" {...field} />
              </FormControl>
              <FormDescription>
                Enter the your registered email.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button className="w-full" type="submit">
          Get OTP
        </Button>
      </form>
    </Form>
  );
};

export default ResetPassForm;
