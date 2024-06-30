"use client";

import { signInSchema } from "@/lib/zod";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useToast } from "@/components/ui/use-toast";
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
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Loader2 } from "lucide-react";

const formSchema = signInSchema;

const SignInForm = () => {
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const { toast } = useToast();
  // 1. Define your form.
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  // 2. Define a submit handler.
  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    setLoading(true);
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    const { email, password } = values;
    try {
      const response = await signIn("credentials", {
        email,
        password,
        redirect: false,
      });

      if (response?.error) {
        toast({
          title: "Error",
          description: response.error,
        });
        return;
      }

      if (response?.ok) {
        toast({
          title: "Sign In Success.",
          description: "You have been successfully signed in.",
        });

        router.push("/dashboard");
      }
      if (!response?.ok) {
        toast({
          title: "Error",
          description: "Invalid credentials. Please try again.",
        });
      }
    } catch (error) {
      console.log("Error: ", error);
      if ((error as { code: string }).code === "ETIMEDOUT") {
        toast({
          title: "Error",
          description:
            "Unable to connect to the database. Please try again later.",
        });
      } else if ((error as { code: string }).code === "503") {
        toast({
          title: "Error",
          description:
            "Service temporarily unavailable. Please try again later.",
        });
      } else {
        toast({
          title: "Error",
          description: "An unexpected error occurred. Please try again later.",
        });
      }
    }

    setLoading(false);
  };

  return (
    <Form {...form}>
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
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Password</FormLabel>
              <FormControl>
                <Input
                  type="password"
                  placeholder="Enter your password."
                  {...field}
                />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit">
          {loading && <Loader2 className="animate-spin" />}
          {!loading && "Sign In"}
        </Button>
      </form>
    </Form>
  );
};

export default SignInForm;
