import { defineAction } from "astro:actions";
import { contactMeSchema } from "./schema";
import { contactFormPath } from "@/lib/paths";
import { FORMSPREE_FORM_ID } from "astro:env/server";

export const contact = {
  contactMe: defineAction({
    input: contactMeSchema,
    handler: async (data) => {
      try {
        await fetch(contactFormPath(FORMSPREE_FORM_ID), {
          method: "POST",
          body: JSON.stringify(data),
          headers: {
            "Content-Type": "application/json",
          },
        });
      } catch (error) {
        return { success: false };
      }

      return { success: true };
    },
  }),
};
