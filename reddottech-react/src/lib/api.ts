import { getToken } from "./auth";

// Same-origin by default (served behind the Vite dev proxy in development and a
// reverse proxy / API route in production). Override with VITE_API_BASE_URL.
const API_BASE_URL = (import.meta.env.VITE_API_BASE_URL as string) || "/api";

interface FetchOptions extends RequestInit {
  /** When true, throws on HTTP errors even for reads (default: writes throw, reads fall back). */
  throwOnError?: boolean;
}

export async function fetchApi<T>(endpoint: string, options?: FetchOptions): Promise<T | null> {
  try {
    const headers = new Headers(options?.headers);
    if (!headers.has("Content-Type")) {
      headers.set("Content-Type", "application/json");
    }
    const token = getToken();
    if (token) {
      headers.set("Authorization", `Bearer ${token}`);
    }

    const res = await fetch(`${API_BASE_URL}${endpoint}`, {
      ...options,
      headers,
    });

    if (!res.ok) {
      let message = `API Error: ${res.statusText} (${res.status})`;
      try {
        const body = await res.json();
        if (body?.error) message = body.error;
      } catch {
        // ignore non-JSON error responses
      }
      throw new Error(message);
    }

    const data = await res.json();
    return data.data !== undefined ? data.data : data;
  } catch (err) {
    // Reads can gracefully fall back to static/empty data. Writes must not fail
    // silently, otherwise the UI reports success for data that was never saved.
    const method = options?.method || "GET";
    if (method !== "GET" || options?.throwOnError) {
      throw err;
    }
    console.warn(`[SQLite API Fallback] ${endpoint}:`, err);
    return null;
  }
}

// 0. Admin Auth API
export async function adminLogin(email: string, password: string) {
  return await fetchApi<{ token: string; email: string; name: string }>("/auth/login", {
    method: "POST",
    body: JSON.stringify({ email, password }),
    throwOnError: true,
  });
}

export async function logoutAdmin() {
  return await fetchApi("/auth/logout", { method: "POST", throwOnError: true });
}

export async function getMe() {
  return await fetchApi<{ email: string; name?: string }>("/auth/me");
}

export async function changeAdminPassword(currentPassword: string, newPassword: string) {
  return await fetchApi("/auth/change-password", {
    method: "POST",
    body: JSON.stringify({ currentPassword, newPassword }),
    throwOnError: true,
  });
}

// Image File Upload Helper
export async function uploadImage(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = async () => {
      try {
        const base64Data = reader.result as string;
        const res = await fetchApi<{ url: string }>("/upload", {
          method: "POST",
          body: JSON.stringify({
            filename: file.name,
            base64Data,
          }),
          throwOnError: true,
        });
        if (res?.url) {
          resolve(res.url);
        } else {
          resolve(base64Data);
        }
      } catch (err) {
        // Fallback to direct client-side data URL
        resolve(reader.result as string);
      }
    };
    reader.onerror = (err) => reject(err);
    reader.readAsDataURL(file);
  });
}

// 1. Dashboard Stats
export async function getDashboardStats() {
  const stats = await fetchApi<{
    contactsCount: number;
    subscriptionsCount: number;
    certificatesCount: number;
    coursesCount: number;
  }>("/stats");

  return (
    stats || {
      contactsCount: 0,
      subscriptionsCount: 0,
      certificatesCount: 0,
      coursesCount: 0,
    }
  );
}

// 2. Courses API
export async function getCourses() {
  const data = await fetchApi<any[]>("/courses");
  return data;
}

export async function createCourse(course: any) {
  return await fetchApi("/courses", {
    method: "POST",
    body: JSON.stringify(course),
  });
}

export async function updateCourse(id: string | number, course: any) {
  return await fetchApi(`/courses/${id}`, {
    method: "PUT",
    body: JSON.stringify(course),
  });
}

export async function deleteCourse(id: string | number) {
  return await fetchApi(`/courses/${id}`, {
    method: "DELETE",
  });
}

// 3. Certificates API
export async function getCertificates() {
  const data = await fetchApi<any[]>("/certificates");
  return data;
}

export async function claimCertificate(cert: { name: string; email: string; school?: string }) {
  return await fetchApi("/certificates/claim", {
    method: "POST",
    body: JSON.stringify(cert),
  });
}

export async function deleteCertificate(id: number | string) {
  return await fetchApi(`/certificates/${id}`, {
    method: "DELETE",
  });
}

// 4. Contacts API
export async function getContacts() {
  const data = await fetchApi<any[]>("/contacts");
  return data;
}

export async function submitContact(contact: {
  first_name: string;
  last_name?: string;
  email: string;
  phone?: string;
  subject?: string;
  message: string;
}) {
  return await fetchApi("/contacts", {
    method: "POST",
    body: JSON.stringify(contact),
  });
}

export async function deleteContact(id: number | string) {
  return await fetchApi(`/contacts/${id}`, {
    method: "DELETE",
  });
}

// 5. Subscriptions API
export async function getSubscriptions() {
  const data = await fetchApi<any[]>("/subscriptions");
  return data;
}

export async function subscribeNewsletter(email: string) {
  return await fetchApi("/subscriptions", {
    method: "POST",
    body: JSON.stringify({ email }),
  });
}

export async function deleteSubscription(id: number | string) {
  return await fetchApi(`/subscriptions/${id}`, {
    method: "DELETE",
  });
}

// 6. Settings API
export async function getSettings() {
  const data = await fetchApi<Record<string, string>>("/settings");
  return data;
}

export async function updateSettings(settings: Record<string, string>) {
  return await fetchApi("/settings", {
    method: "POST",
    body: JSON.stringify(settings),
  });
}
