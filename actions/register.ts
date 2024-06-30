"use server";

import prisma from "@/lib/db";
import * as z from "zod";
import { signUpSchema } from "@/lib/zod";
import bcrypt from "bcryptjs";

export default async function register(data: z.infer<typeof signUpSchema>) {
  try {
    const validatedData = signUpSchema.parse(data);

    if (!validatedData) {
      return { error: "Invalid input data." };
    }

    const { email, password, confirm } = validatedData;

    const userExists = await prisma.user.findUnique({
      where: {
        email,
      },
    });

    if (userExists) {
      return { error: "User already exists." };
    }

    if (password !== confirm) {
      return { error: "Passwords do not match." };
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    const lowerCaseEmail = email.toLowerCase();
    const user = await prisma.user.create({
      data: {
        email: lowerCaseEmail,
        password: hashedPassword,
      },
    });

    console.log("User created: ", user);

    return { message: "User created successfully." };
  } catch (error) {
    console.log("Error: ", error);
    if ((error as { code: string }).code === "ETIMEDOUT") {
      return {
        error: "Unable to connect to the database. Please try again later.",
      };
    } else if ((error as { code: string }).code === "503") {
      return {
        error: "Service temporarily unavailable. Please try again later.",
      };
    } else {
      return { error: "An unexpected error occurred. Please try again later." };
    }
  }
}
