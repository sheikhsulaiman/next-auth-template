"use client";

import { verifyEmail } from "@/actions/verify-email";
import { Loader2 } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import React, { useCallback, useEffect, useState } from "react";
import { sendMagicLinkEmail } from "@/lib/mail";
import { forgotPasswordSchema } from "@/lib/zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
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

const formSchema = forgotPasswordSchema;
const EmailVerify = () => {
  const [error, setError] = useState<string | undefined>(undefined);
  const [success, setSuccess] = useState<string | undefined>(undefined);
  const searchParams = useSearchParams();
  const token = searchParams.get("token");
  const [loading, setLoading] = useState(false);

  const router = useRouter();

  // 1. Define your form.
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    setLoading(true);
    const { email } = values;
    try {
      await sendMagicLinkEmail(email);
      setSuccess("Email sent. Please check your inbox.");
      setLoading(false);
    } catch (error) {
      setError("Email not sent. Please try again.");
      setLoading(false);
    }
  };

  const onVerify = useCallback(() => {
    if (success || error) return;

    setLoading(true);
    if (!token) {
      setError("Invalid token");
      setLoading(false);
      return;
    }

    verifyEmail(token).then((response) => {
      if (response.error) {
        setError(response.error);
        setLoading(false);
        return;
      }

      if (response.ok) {
        setSuccess(response.ok);
        // redirect to login page

        router.push("/api/auth/signin");

        setLoading(false);
        return;
      }
    });
  }, [token, success, error]);

  useEffect(() => {
    if (token) onVerify();
  }, [onVerify, token]);

  return (
    <div>
      {loading && (
        <div className="flex items-center justify-center gap-2 text-yellow-400">
          <Loader2 className="h-4 w-4 animate-spin" />
          Validating...
        </div>
      )}
      {error && (
        <Form {...form}>
          <FormMessage className="text-center">{error}</FormMessage>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <FormField
              control={form.control}
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
              Resend Verification Email.
            </Button>
          </form>
        </Form>
      )}
      {success && (
        <>
          <p className="bg-green-500">{success}</p>
          <p>
            <Loader2 className="h-4 w-4 animate-spin mr-2" />
            Redirecting...
          </p>
        </>
      )}
    </div>
  );
};

export default EmailVerify;
