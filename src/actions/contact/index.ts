import { defineAction } from "astro:actions";
import { contactMeSchema } from "./schema";
import { contactFormPath } from "@/lib/paths";
import { FORMSPREE_FORM_ID } from "astro:env/server";

export const contact = {
  contactMe: defineAction({
    input: contactMeSchema,
    handler: async (data) => {
      try {
        const response = await fetch(contactFormPath(FORMSPREE_FORM_ID), {
          method: "POST",
          body: JSON.stringify(data),
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
        });

        if (!response.ok) {
          const body = await response.text().catch(() => "");
          console.error(
            `Formspree rejected the submission (${response.status}): ${body}`
          );

          return { success: false };
        }
      } catch (error) {
        console.error("Formspree request failed:", error);

        return { success: false };
      }

      return { success: true };
    },
  }),
};
