export interface Course {
  id: number | string;
  name: string;
  slug?: string;
  description: string;
  longDescription?: string;
  thumbnail: string;
  bannerImage?: string;
  instructorName: string;
  instructorImage?: string;
  instructorTitle?: string;
  instructorDetail?: string;
  duration: string;
  startDate?: string;
  delivery?: "online" | "physical" | string;
  mode?: string;
  language?: string;
  skillLevel?: "beginner" | "intermediate" | "advanced" | string;
  category?: string;
  certification?: string;
  price?: string | number;
  curriculum?: string;
  requirements?: string;
  modules?: {
    title: string;
    lessons: string[];
  }[];
}

export interface PecpBatch {
  id: string;
  title: string;
  startDate: string;
  duration: string;
  status: "Open" | "Upcoming" | "Closed";
  spotsLeft?: number;
}

export interface ContactFormData {
  fullName: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
}
