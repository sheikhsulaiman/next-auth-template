import { Resend } from "resend";
import { MagicLinkEmail } from "../emails/index";
import { generateVerificationToken } from "./token";

export const sendMagicLinkEmail = async (email: string) => {
  const resend = new Resend(process.env.RESEND_API_KEY);
  const token = await generateVerificationToken(email);
  const { data, error } = await resend.emails.send({
    from: "Acme <onboarding@resend.dev>",
    to: [email],
    subject: "Email Verification Required",
    react: MagicLinkEmail({ token: token.token }),
  });

  if (error) {
    console.error("Magic Link Error: ", error);
    return;
  }
};
