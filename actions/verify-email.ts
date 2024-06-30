"use server";

import prisma from "@/lib/db";

export const verifyEmail = async (token: string) => {
  const existingToken = await prisma.verificationToken.findFirst({
    where: {
      token,
    },
  });

  if (!existingToken) {
    return {
      error: "Invalid token",
    };
  }

  if (new Date(existingToken.expires) < new Date()) {
    return {
      error: "Token expired",
    };
  }

  const existringUser = await prisma.user.findFirst({
    where: {
      email: existingToken.email,
    },
  });

  if (!existringUser) {
    return {
      error: "User not found",
    };
  }

  await prisma.user.update({
    where: {
      id: existringUser.id,
    },
    data: {
      emailVerified: new Date(),
    },
  });

  await prisma.verificationToken.delete({
    where: {
      id: existingToken.id,
    },
  });

  return { ok: "Email verified. You can now sign in." };
};
