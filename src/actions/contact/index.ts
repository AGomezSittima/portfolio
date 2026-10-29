import { ActionError, defineAction } from "astro:actions";
import { sendContactEmail } from "./brevo";
import { createFormToken, getFormTokenAge } from "./form-token";
import { contactActionSchema } from "./schema";

const MIN_FILL_TIME_MS = 3000;

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

      // REVIEW: a token can be reused; a nonce store (e.g. Netlify Blobs) would stop replays
      const age = getFormTokenAge(startedAt);

      if (age === null) return drop("token");
      if (age < MIN_FILL_TIME_MS) return drop("too fast");

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
