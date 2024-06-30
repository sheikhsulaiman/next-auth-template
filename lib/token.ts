import prisma from "./db";
import { v4 as uuidv4 } from "uuid";

export const generateVerificationToken = async (email: string) => {
  // Check if the token for the email exists in the database.
  const existingToken = await prisma.verificationToken.findFirst({
    where: {
      email,
    },
  });

  // If exists, replace
  if (existingToken) {
    await prisma.verificationToken.delete({
      where: {
        id: existingToken.id,
      },
    });
  }

  // Generate a new token.

  const token = uuidv4();

  const newToken = await prisma.verificationToken.create({
    data: {
      email,
      token,
      expires: new Date(Date.now() + 1000 * 60 * 60 * 24), // 24 hours
    },
  });

  return newToken;
};
