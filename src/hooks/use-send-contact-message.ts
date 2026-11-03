import {
  MAX_TOKEN_AGE_MS,
  MIN_FILL_TIME_MS,
} from "@/actions/contact/form-timing";
import type { contactActionSchema } from "@/actions/contact/schema";
import { actions } from "astro:actions";
import type { z } from "astro/zod";
import { useEffect, useRef } from "react";

// Refresh 5 min early so a token can't expire on its way to the server
const TOKEN_REFRESH_MS = MAX_TOKEN_AGE_MS - 5 * 60 * 1000;

type FormToken = { value: string; receivedAt: number };

type ContactMessage = Omit<z.input<typeof contactActionSchema>, "startedAt">;

// Sends the contact form; resolves false when the message couldn't be sent.
// The start token is signed by the server when the form opens, and the server
// silently drops messages whose token is younger than 3 s or older than 1 h,
// so send refreshes a stale token and waits out the minimum first (local age
// never exceeds the server's).
export function useSendContactMessage() {
  const formToken = useRef<FormToken | undefined>(undefined);

  const requestToken = async () => {
    const { data } = await actions.contact.start();

    formToken.current = data && {
      value: data.token,
      receivedAt: Date.now(),
    };
  };

  useEffect(() => {
    requestToken().catch(console.error);
  }, []);

  const getReadyToken = async () => {
    const current = formToken.current;

    if (!current || Date.now() - current.receivedAt > TOKEN_REFRESH_MS) {
      await requestToken();
    }

    const token = formToken.current;

    if (!token) return undefined;

    const wait = MIN_FILL_TIME_MS - (Date.now() - token.receivedAt);

    if (wait > 0) {
      await new Promise((resolve) => setTimeout(resolve, wait));
    }

    return token.value;
  };

  const send = async (message: ContactMessage) => {
    try {
      const startedAt = await getReadyToken();

      if (!startedAt) return false;

      const { error } = await actions.contact.contactMe({
        ...message,
        startedAt,
      });

      return !error;
    } catch (error) {
      console.error(error);

      return false;
    }
  };

  return send;
}
