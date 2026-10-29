import {
  BREVO_API_KEY,
  CONTACT_FROM_EMAIL,
  CONTACT_TO_EMAIL,
} from "astro:env/server";
import type { z } from "astro/zod";
import type { contactMeSchema } from "./schema";

const BREVO_EMAIL_URL = "https://api.brevo.com/v3/smtp/email";

type ContactEmail = z.infer<typeof contactMeSchema>;

const singleLine = (value: string) => value.replace(/[\r\n]+/g, " ").trim();

export async function sendContactEmail({
  fullName,
  email,
  subject,
  message,
}: ContactEmail) {
  const name = singleLine(fullName);
  const title = singleLine(subject);

  const response = await fetch(BREVO_EMAIL_URL, {
    method: "POST",
    headers: {
      "api-key": BREVO_API_KEY,
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify({
      sender: { name: "Portfolio", email: CONTACT_FROM_EMAIL },
      to: [{ email: CONTACT_TO_EMAIL }],
      replyTo: { email, name },
      subject: `[Portfolio] ${title}`,
      textContent: [
        `Name: ${name}`,
        `Email: ${email}`,
        `Subject: ${title}`,
        "",
        message,
      ].join("\n"),
    }),
    // Below Netlify's function timeout
    signal: AbortSignal.timeout(8000),
  });

  if (!response.ok) {
    throw new Error(`Brevo request failed (${response.status})`);
  }
}
