const API_BASE_URL = (import.meta.env.VITE_API_BASE_URL as string) || "http://localhost:5000/api";

export async function fetchApi<T>(endpoint: string, options?: RequestInit): Promise<T | null> {
  try {
    const res = await fetch(`${API_BASE_URL}${endpoint}`, {
      headers: {
        "Content-Type": "application/json",
      },
      ...options,
    });

    if (!res.ok) {
      throw new Error(`API Error: ${res.statusText} (${res.status})`);
    }

    const data = await res.json();
    return data.data !== undefined ? data.data : data;
  } catch (err) {
    // Reads can gracefully fall back to static/empty data. Writes must not fail
    // silently, otherwise the UI reports success for data that was never saved.
    if (options?.method && options.method !== "GET") {
      throw err;
    }
    console.warn(`[SQLite API Fallback] ${endpoint}:`, err);
    return null;
  }
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
      contactsCount: 14,
      subscriptionsCount: 42,
      certificatesCount: 9,
      coursesCount: 3,
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

export async function updateCourse(id: string, course: any) {
  return await fetchApi(`/courses/${id}`, {
    method: "PUT",
    body: JSON.stringify(course),
  });
}

export async function deleteCourse(id: string) {
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
