import { createHmac, timingSafeEqual, randomBytes } from "crypto";
import { cookies } from "next/headers";

const COOKIE_NAME = "admin_token";

function getSecret(): string {
  const pw = process.env.ADMIN_PASSWORD;
  if (!pw) throw new Error("ADMIN_PASSWORD environment variable is not set");
  return pw;
}

function signToken(payload: string): string {
  const hmac = createHmac("sha256", getSecret());
  hmac.update(payload);
  return hmac.digest("hex");
}

export function createSession(): string {
  const nonce = randomBytes(16).toString("hex");
  const expiry = Date.now() + 60 * 60 * 24 * 1000; // 24 hours
  const payload = `${nonce}:${expiry}`;
  const signature = signToken(payload);
  return `${payload}:${signature}`;
}

export async function verifyAuth(): Promise<boolean> {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get(COOKIE_NAME)?.value;
    if (!token) return false;

    const parts = token.split(":");
    if (parts.length !== 3) return false;

    const [nonce, expiryStr, signature] = parts;
    const expiry = parseInt(expiryStr, 10);
    if (isNaN(expiry) || Date.now() > expiry) return false;

    const payload = `${nonce}:${expiryStr}`;
    const expected = signToken(payload);

    const sigBuf = Buffer.from(signature);
    const expBuf = Buffer.from(expected);
    if (sigBuf.length !== expBuf.length) return false;

    return timingSafeEqual(sigBuf, expBuf);
  } catch {
    return false;
  }
}

export async function destroySession(): Promise<void> {
  // Stateless token - nothing to destroy server-side
  // Cookie will be cleared by the logout route
}

export { COOKIE_NAME, getSecret as getPassword };
