import { CONTACT_FORM_SECRET } from "astro:env/server";
import { createHmac, timingSafeEqual } from "node:crypto";

const sign = (value: string) =>
  createHmac("sha256", CONTACT_FORM_SECRET).update(value).digest("base64url");

export function createFormToken() {
  const issuedAt = Date.now().toString();

  return `${issuedAt}.${sign(issuedAt)}`;
}

// Milliseconds since the token was issued, or null if it isn't valid
export function getFormTokenAge(token: string | undefined) {
  const [issuedAt, signature, ...rest] = token?.split(".") ?? [];

  if (!issuedAt || !signature || rest.length || !/^\d+$/.test(issuedAt)) {
    return null;
  }

  const expected = Buffer.from(sign(issuedAt));
  const received = Buffer.from(signature);

  if (
    expected.length !== received.length ||
    !timingSafeEqual(expected, received)
  ) {
    return null;
  }

  return Date.now() - Number(issuedAt);
}
