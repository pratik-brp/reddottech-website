import { getToken, clearAuth, setAdminEmail } from "./auth";

// Same-origin by default (served behind the Vite dev proxy in development and a
// reverse proxy / API route in production). Override with VITE_API_BASE_URL.
const API_BASE_URL =
  (import.meta.env.VITE_API_BASE_URL as string) ||
  (typeof window === "undefined" ? "http://127.0.0.1:5000/api" : "/api");

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

    if (res.status === 401) {
      clearAuth();
      if (
        typeof window !== "undefined" &&
        window.location.pathname.startsWith("/admin") &&
        window.location.pathname !== "/admin/login"
      ) {
        window.location.href = "/admin/login";
      }
      return null;
    }

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
    console.warn(`[API Fallback] ${endpoint}:`, err);
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
  const result = await fetchApi<{ email: string; name?: string }>("/auth/me");
  if (result && result.email) {
    setAdminEmail(result.email);
  }
  return result;
}

export async function changeAdminPassword(currentPassword: string, newPassword: string) {
  return await fetchApi("/auth/change-password", {
    method: "POST",
    body: JSON.stringify({ currentPassword, newPassword }),
    throwOnError: true,
  });
}

export async function changeAdminEmail(newEmail: string, currentPassword: string) {
  const result = await fetchApi<{ email: string; message?: string }>("/auth/change-email", {
    method: "POST",
    body: JSON.stringify({ newEmail, currentPassword }),
    throwOnError: true,
  });
  if (result && result.email) {
    setAdminEmail(result.email);
    if (typeof window !== "undefined") {
      window.dispatchEvent(new CustomEvent("rdt_admin_email_updated", { detail: result.email }));
    }
  }
  return result;
}

export async function requestPasswordReset(email: string) {
  return await fetchApi<{ success: boolean; message: string; resetToken?: string }>(
    "/auth/forgot-password",
    {
      method: "POST",
      body: JSON.stringify({ email }),
      throwOnError: true,
    },
  );
}

export async function resetPasswordWithToken(token: string, newPassword: string) {
  return await fetchApi<{ success: boolean; message: string }>("/auth/reset-password", {
    method: "POST",
    body: JSON.stringify({ token, newPassword }),
    throwOnError: true,
  });
}

// Image File Upload Helper (Admin)
export async function uploadImage(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    if (file.size > 5 * 1024 * 1024) {
      return reject(new Error("Image exceeds 5MB maximum file size limit."));
    }

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
          reject(new Error("Upload server failed to return asset URL."));
        }
      } catch (err) {
        reject(err instanceof Error ? err : new Error("Failed to upload image file."));
      }
    };
    reader.onerror = (err) => reject(err);
    reader.readAsDataURL(file);
  });
}

// Payment Receipt Upload Helper (Public Student Form)
export async function uploadPaymentReceipt(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    if (file.size > 2.5 * 1024 * 1024) {
      return reject(new Error("Receipt screenshot exceeds 2.5MB maximum file size limit."));
    }

    const reader = new FileReader();
    reader.onload = async () => {
      try {
        const base64Data = reader.result as string;
        const res = await fetchApi<{ success: boolean; url: string }>("/upload-receipt", {
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
          reject(new Error("Upload failed. Please ensure file is a valid JPG, PNG, WebP, or PDF."));
        }
      } catch (err) {
        reject(err instanceof Error ? err : new Error("Failed to upload payment receipt."));
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
let cachedCourses: any[] | null = null;

export function getCachedCourses(): any[] | null {
  if (cachedCourses) return cachedCourses;
  if (typeof window !== "undefined") {
    try {
      const raw = localStorage.getItem("rdt_db_courses");
      if (raw) {
        cachedCourses = JSON.parse(raw);
        return cachedCourses;
      }
    } catch {}
  }
  return null;
}

export async function getCourses() {
  try {
    const data = await fetchApi<any[]>("/courses");
    if (Array.isArray(data)) {
      cachedCourses = data;
      if (typeof window !== "undefined") {
        try {
          localStorage.setItem("rdt_db_courses", JSON.stringify(data));
        } catch {}
      }
      return data;
    }
  } catch (err) {
    console.warn("[getCourses] Failed to fetch fresh courses:", err);
  }
  return getCachedCourses() || [];
}

export async function createCourse(course: any) {
  const res = await fetchApi("/courses", {
    method: "POST",
    body: JSON.stringify(course),
  });
  if (typeof window !== "undefined") {
    try {
      localStorage.removeItem("rdt_db_courses");
    } catch {}
    window.dispatchEvent(new CustomEvent("courses-updated"));
  }
  return res;
}

export async function updateCourse(id: string | number, course: any) {
  const res = await fetchApi(`/courses/${id}`, {
    method: "PUT",
    body: JSON.stringify(course),
  });
  if (typeof window !== "undefined") {
    try {
      localStorage.removeItem("rdt_db_courses");
    } catch {}
    window.dispatchEvent(new CustomEvent("courses-updated"));
  }
  return res;
}

export async function deleteCourse(id: string | number) {
  const res = await fetchApi(`/courses/${id}`, {
    method: "DELETE",
  });
  if (typeof window !== "undefined") {
    try {
      localStorage.removeItem("rdt_db_courses");
    } catch {}
    window.dispatchEvent(new CustomEvent("courses-updated"));
  }
  return res;
}

export async function reorderCourses(orders: { id: string | number; sortOrder: number }[]) {
  const res = await fetchApi("/courses/reorder", {
    method: "POST",
    body: JSON.stringify({ orders }),
  });
  if (typeof window !== "undefined") {
    try {
      localStorage.removeItem("rdt_db_courses");
    } catch {}
    window.dispatchEvent(new CustomEvent("courses-updated"));
  }
  return res;
}

// 3. Certificates API
export async function getCertificates() {
  const data = await fetchApi<any[]>("/certificates");
  return data;
}

export async function claimCertificate(cert: {
  name: string;
  email: string;
  school?: string;
  track?: string;
  course_name?: string;
  certificate_id?: string;
  organization?: string;
  role?: string;
  department?: string;
}): Promise<any> {
  return await fetchApi<any>("/certificates/claim", {
    method: "POST",
    body: JSON.stringify(cert),
  });
}

export async function deleteCertificate(id: number | string) {
  return await fetchApi(`/certificates/${id}`, {
    method: "DELETE",
  });
}

export async function verifyCertificate(query: string) {
  return await fetchApi<{
    id: number | string;
    name: string;
    email: string;
    school?: string;
    track?: string;
    courseName?: string;
    certificateId?: string;
    organization?: string;
    role?: string;
    department?: string;
    completedAt?: string;
    issuedAt?: string;
    issuer?: string;
    status?: string;
    verificationUrl?: string;
  }>(`/certificates/verify/${encodeURIComponent(query.trim())}`, {
    throwOnError: false,
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
let cachedSettings: Record<string, string> | null = null;

export function getCachedSettings(): Record<string, string> | null {
  if (cachedSettings) return cachedSettings;
  if (typeof window !== "undefined") {
    try {
      const raw = localStorage.getItem("rdt_db_settings");
      if (raw) {
        cachedSettings = JSON.parse(raw);
        return cachedSettings;
      }
    } catch {}
  }
  return null;
}

export async function getSettings() {
  try {
    const data = await fetchApi<Record<string, string>>("/settings");
    if (data && typeof data === "object") {
      cachedSettings = data;
      if (typeof window !== "undefined") {
        try {
          localStorage.setItem("rdt_db_settings", JSON.stringify(data));
        } catch {}
      }
      return data;
    }
  } catch (err) {
    console.warn("[getSettings] Failed to fetch fresh settings:", err);
  }
  return getCachedSettings();
}

export async function getAdminSettings() {
  const data = await fetchApi<Record<string, string>>("/settings/all");
  if (data && typeof data === "object") {
    cachedSettings = data;
    return data;
  }
  return getSettings();
}

export async function updateSettings(settings: Record<string, string>) {
  const result = await fetchApi("/settings", {
    method: "POST",
    body: JSON.stringify(settings),
  });

  if (typeof window !== "undefined") {
    try {
      const current = getCachedSettings() || {};
      const updated = { ...current, ...settings };
      cachedSettings = updated;
      localStorage.setItem("rdt_db_settings", JSON.stringify(updated));
      window.dispatchEvent(new CustomEvent("rdt_settings_updated", { detail: updated }));
    } catch {}
  }

  return result;
}

export interface SystemInfoData {
  nodeVersion: string;
  platform: string;
  uptimeSeconds: number;
  memoryRssMb: number;
  memoryHeapMb: number;
  database: {
    type: string;
    databaseName: string;
    host: string;
    port: number;
    status: string;
    tables: {
      courses: number;
      certificates: number;
      contacts: number;
      subscriptions: number;
      ai_leads: number;
      settings: number;
    };
  };
  uploads: {
    fileCount: number;
    sizeMb: number;
  };
}

export async function getSystemInfo(): Promise<SystemInfoData | null> {
  return await fetchApi<SystemInfoData>("/admin/system-info");
}

export async function downloadDatabaseBackup() {
  const token = getToken();

  const response = await fetch("/api/admin/export-db", {
    headers: {
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    },
  });

  if (!response.ok) {
    throw new Error("Failed to download database backup.");
  }

  const blob = await response.blob();
  const url = window.URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = `reddot-db-backup-${new Date().toISOString().slice(0, 10)}.json`;
  document.body.appendChild(a);
  a.click();
  a.remove();
  window.URL.revokeObjectURL(url);
}

// 7. AI Leads & Verifications API
export async function getAiLeads(): Promise<any[]> {
  const data = await fetchApi<any[]>("/ai-leads");
  if (Array.isArray(data)) return data;
  return [];
}

export async function createAiLead(lead: any) {
  try {
    if (typeof window !== "undefined") {
      const raw = localStorage.getItem("rdt_ai_payment_leads");
      const existing = raw ? JSON.parse(raw) : [];
      localStorage.setItem(
        "rdt_ai_payment_leads",
        JSON.stringify([lead, ...existing.filter((l: any) => l.id !== lead.id)]),
      );
    }
  } catch {}
  return await fetchApi("/ai-leads", {
    method: "POST",
    body: JSON.stringify(lead),
  });
}

export async function updateAiLead(id: string, updates: any) {
  try {
    if (typeof window !== "undefined") {
      const raw = localStorage.getItem("rdt_ai_payment_leads");
      const existing = raw ? JSON.parse(raw) : [];
      const updated = existing.map((l: any) => (l.id === id ? { ...l, ...updates } : l));
      localStorage.setItem("rdt_ai_payment_leads", JSON.stringify(updated));
    }
  } catch {}
  return await fetchApi(`/ai-leads/${id}`, {
    method: "PUT",
    body: JSON.stringify(updates),
  });
}

export async function deleteAiLead(id: string) {
  try {
    if (typeof window !== "undefined") {
      const raw = localStorage.getItem("rdt_ai_payment_leads");
      const existing = raw ? JSON.parse(raw) : [];
      localStorage.setItem(
        "rdt_ai_payment_leads",
        JSON.stringify(existing.filter((l: any) => l.id !== id)),
      );
    }
  } catch {}
  return await fetchApi(`/ai-leads/${id}`, {
    method: "DELETE",
  });
}

// 8. AI Course Access Verification & Live Status Check
export async function verifyAiAccessCode(
  track: string,
  code: string,
): Promise<{
  success: boolean;
  valid: boolean;
  lead?: {
    id: string;
    name: string;
    email: string;
    org?: string;
    track: string;
  };
  error?: string;
}> {
  try {
    const res = await fetchApi<{
      success: boolean;
      valid: boolean;
      lead?: any;
      error?: string;
    }>("/ai-access/verify-code", {
      method: "POST",
      body: JSON.stringify({ track, code }),
    });
    return res || { success: false, valid: false, error: "Empty response from server." };
  } catch (err: any) {
    return {
      success: false,
      valid: false,
      error: err?.message || "Failed to verify access code with server.",
    };
  }
}

export async function checkAiAccessStatus(
  track: string,
  code: string,
): Promise<{
  success: boolean;
  active: boolean;
  lead?: {
    id: string;
    name: string;
    email: string;
    org?: string;
    track: string;
  };
  message?: string;
}> {
  try {
    const res = await fetchApi<{
      success: boolean;
      active: boolean;
      lead?: any;
      message?: string;
    }>(
      `/ai-access/check-status?track=${encodeURIComponent(track)}&code=${encodeURIComponent(code)}`,
    );
    return res || { success: false, active: false, message: "Empty response from server." };
  } catch (err: any) {
    return {
      success: false,
      active: false,
      message: err?.message || "Network error checking access status.",
    };
  }
}

// 9. Protected AI Course Delivery API (Server-Side Content Gating)
export async function fetchAiLesson(
  track: string,
  lessonId: string,
  accessCode?: string,
): Promise<{
  success: boolean;
  isFree?: boolean;
  verified?: boolean;
  locked?: boolean;
  data?: any;
  manifest?: any;
  error?: string;
} | null> {
  const params = new URLSearchParams({
    track,
    lessonId,
  });
  if (accessCode) {
    params.set("code", accessCode);
  }
  return await fetchApi<{
    success: boolean;
    isFree?: boolean;
    verified?: boolean;
    locked?: boolean;
    data?: any;
    manifest?: any;
    error?: string;
  }>(`/ai-courses/lesson?${params.toString()}`);
}

export async function fetchAiTrack(
  track: string,
  accessCode?: string,
): Promise<{
  success: boolean;
  unlocked: boolean;
  data?: any[];
  error?: string;
} | null> {
  const params = new URLSearchParams({
    track,
  });
  if (accessCode) {
    params.set("code", accessCode);
  }
  return await fetchApi<{
    success: boolean;
    unlocked: boolean;
    data?: any[];
    error?: string;
  }>(`/ai-courses/track?${params.toString()}`);
}
