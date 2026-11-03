import { ActionError, defineAction } from "astro:actions";
import { sendContactEmail } from "./brevo";
import { createFormToken, getFormTokenAge } from "./form-token";
import { MAX_TOKEN_AGE_MS, MIN_FILL_TIME_MS } from "./form-timing";
import { contactActionSchema } from "./schema";

// Bots get a fake success so they don't retry or learn what failed
const drop = (reason: string) => {
  console.warn(`contact: dropped (${reason})`);

  return { success: true };
};

export const contact = {
  start: defineAction({
    handler: () => ({ token: createFormToken() }),
  }),
  contactMe: defineAction({
    input: contactActionSchema,
    handler: async ({ website, startedAt, ...data }) => {
      if (website) return drop("honeypot");

      const age = getFormTokenAge(startedAt);

      if (age === null) return drop("token");
      if (age < MIN_FILL_TIME_MS) return drop("too fast");
      if (age > MAX_TOKEN_AGE_MS) return drop("expired");

      try {
        await sendContactEmail(data);
      } catch (error) {
        console.error("contact: send failed", error);

        throw new ActionError({
          code: "INTERNAL_SERVER_ERROR",
          message: "Message could not be sent",
        });
      }

      return { success: true };
    },
  }),
};
