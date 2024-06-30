"use server";
import * as z from "zod";
import { signInSchema } from "@/lib/zod";
import { signIn } from "@/auth";
import { AuthError } from "next-auth";
import prisma from "@/lib/db";
import bcrypt from "bcryptjs";

export const login = async (data: z.infer<typeof signInSchema>) => {
  // Validate the input data
  const validatedData = await signInSchema
    .parseAsync(data)
    .catch((error: z.ZodError) => {
      throw new Error(error.errors[0].message);
    });

  // If the data is invalid, return an error
  if (!validatedData) {
    return { error: "Invalid input data" };
  }

  // Destructure the validated data
  const { email, password } = validatedData;

  // Check if user exists
  const userExists = await prisma.user.findUnique({
    where: {
      email,
    },
  });
  // If the user does not exist, return an error
  if (!userExists || !userExists.email || !userExists.password) {
    return { error: "User does not exist" };
  }

  if (userExists.emailVerified === null) {
    return { error: "Email not verified" };
  }

  // Check if the password is correct
  const isValid = await bcrypt.compare(password, userExists.password);

  // If the password is incorrect, return an error
  if (!isValid) {
    return { error: "Invalid password" };
  }

  try {
    await signIn("credentials", {
      email: userExists.email,
      password: password,
      redirect: false,
    });
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case "CredentialsSignin":
          return { error: "Invalid credentials" };
        case "AccessDenied":
          return { error: "Please verify yours email address" };
        default:
          return { error: "Something went wrong." };
      }
    }
  }

  return { success: "User logged in successfully" };
};
