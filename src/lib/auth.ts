import { randomBytes, timingSafeEqual } from "crypto";
import { cookies } from "next/headers";

const COOKIE_NAME = "admin_token";
const SESSION_TTL = 60 * 60 * 24 * 1000; // 24 hours

const sessions = new Map<string, number>();

function getPassword(): string {
  const pw = process.env.ADMIN_PASSWORD;
  if (!pw) throw new Error("ADMIN_PASSWORD environment variable is not set");
  return pw;
}

export function createSession(): string {
  const token = randomBytes(32).toString("hex");
  sessions.set(token, Date.now() + SESSION_TTL);
  return token;
}

function safeCompare(a: string, b: string): boolean {
  const bufA = Buffer.from(a);
  const bufB = Buffer.from(b);
  if (bufA.length !== bufB.length) return false;
  return timingSafeEqual(bufA, bufB);
}

export async function verifyAuth(): Promise<boolean> {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get(COOKIE_NAME)?.value;
    if (!token) return false;

    for (const [storedToken, expiry] of sessions) {
      if (Date.now() > expiry) {
        sessions.delete(storedToken);
        continue;
      }
      if (safeCompare(Buffer.from(token).toString("hex"), Buffer.from(storedToken).toString("hex"))) {
        return true;
      }
    }
    return false;
  } catch {
    return false;
  }
}

export async function destroySession(): Promise<void> {
  const cookieStore = await cookies();
  const token = cookieStore.get(COOKIE_NAME)?.value;
  if (token) sessions.delete(token);
}

export { COOKIE_NAME, getPassword };
