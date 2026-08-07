import { createServerFn } from "@tanstack/react-start";
import {
  getAllCourses,
  getCourseBySlug,
  createContactMessage,
  createSubscription,
  createCertificate,
  getCertificateById,
  getSettingsMap,
  ContactInput,
} from "@/lib/db";

export const fetchCoursesFn = createServerFn({ method: "GET" }).handler(async () => {
  try {
    return getAllCourses();
  } catch (err) {
    console.error("Error fetching courses from SQLite:", err);
    return [];
  }
});

export const fetchCourseBySlugFn = createServerFn({ method: "GET" })
  .validator((slug: string) => slug)
  .handler(async ({ data }) => {
    try {
      return getCourseBySlug(data);
    } catch (err) {
      console.error("Error fetching course detail from SQLite:", err);
      return null;
    }
  });

export const submitContactFn = createServerFn({ method: "POST" })
  .validator((input: ContactInput) => input)
  .handler(async ({ data }) => {
    try {
      const result = createContactMessage(data);
      return { success: true, id: Number(result.lastInsertRowid) };
    } catch (err) {
      console.error("Error inserting contact into SQLite:", err);
      return { success: false, error: "Failed to save message" };
    }
  });

export const submitSubscribeFn = createServerFn({ method: "POST" })
  .validator((email: string) => email)
  .handler(async ({ data }) => {
    try {
      createSubscription(data);
      return { success: true };
    } catch (err) {
      console.error("Error inserting subscription into SQLite:", err);
      return { success: false, error: "Failed to subscribe" };
    }
  });

export const issueCertificateFn = createServerFn({ method: "POST" })
  .validator((data: { name: string; email: string; school: string }) => data)
  .handler(async ({ data }) => {
    try {
      const result = createCertificate(data.name, data.email, data.school);
      return { success: true, id: Number(result.lastInsertRowid) };
    } catch (err) {
      console.error("Error issuing certificate in SQLite:", err);
      return { success: false, error: "Failed to generate certificate" };
    }
  });

export const fetchSettingsFn = createServerFn({ method: "GET" }).handler(async () => {
  try {
    return getSettingsMap();
  } catch (err) {
    console.error("Error fetching settings from SQLite:", err);
    return {};
  }
});
