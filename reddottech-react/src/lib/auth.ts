import { redirect } from "@tanstack/react-router";

const TOKEN_KEY = "admin_token";
const EMAIL_KEY = "admin_email";

export function getToken(): string | null {
  if (typeof window === "undefined") return null;
  return window.localStorage.getItem(TOKEN_KEY);
}

export function setToken(token: string, email?: string): void {
  if (typeof window === "undefined") return;
  window.localStorage.setItem(TOKEN_KEY, token);
  if (email) window.localStorage.setItem(EMAIL_KEY, email);
}

export function getAdminEmail(): string | null {
  if (typeof window === "undefined") return null;
  return window.localStorage.getItem(EMAIL_KEY);
}

export function setAdminEmail(email: string): void {
  if (typeof window === "undefined") return;
  window.localStorage.setItem(EMAIL_KEY, email);
}

export function clearAuth(): void {
  if (typeof window === "undefined") return;
  window.localStorage.removeItem(TOKEN_KEY);
  window.localStorage.removeItem(EMAIL_KEY);
}

export function isAdminAuthed(): boolean {
  return Boolean(getToken());
}

/**
 * Route guard for admin pages. Throws a redirect to the login page when the
 * visitor has no admin session token stored on the client.
 */
export function requireAdminRoute() {
  if (typeof window === "undefined") {
    return;
  }

  if (!isAdminAuthed()) {
    throw redirect({ to: "/admin/login" });
  }
}
