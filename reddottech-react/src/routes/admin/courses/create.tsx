import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { AdminLayout } from "@/components/admin/AdminLayout";
import { useState } from "react";
import { toast } from "sonner";
import { createCourse } from "@/lib/api";

export const Route = createFileRoute("/admin/courses/create")({
  head: () => ({
    meta: [{ title: "Create Course | Red Dot Admin" }],
  }),
  component: AdminCreateCoursePage,
});

function AdminCreateCoursePage() {
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [instructorName, setInstructorName] = useState("");
  const [price, setPrice] = useState("250.00");
  const [duration, setDuration] = useState("6 weeks");
  const [delivery, setDelivery] = useState<"online" | "physical">("online");
  const [mode, setMode] = useState("Instructor-led");
  const [language, setLanguage] = useState("English");
  const [skillLevel, setSkillLevel] = useState("beginner");
  const [description, setDescription] = useState("");
  const [curriculum, setCurriculum] = useState("");
  const [requirements, setRequirements] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name) {
      toast.error("Please enter a course title.");
      return;
    }

    setIsSubmitting(true);
    try {
      await createCourse({
        name,
        instructorName,
        price: Number(price) || 0,
        duration,
        delivery,
        mode,
        language,
        skillLevel,
        description,
        curriculum,
        requirements,
        status: "published",
      });
      toast.success("Course created and saved to SQLite database!");
      navigate({ to: "/admin/courses" });
    } catch (err) {
      toast.error("Failed to save course to database.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <AdminLayout title="Add New Course">
      <div className="max-w-4xl mx-auto bg-white rounded-2xl p-8 border border-slate-200 shadow-sm space-y-6">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Course Name *</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="e.g. Executive Artificial Intelligence"
                required
                className="w-full rounded-xl border border-slate-300 px-4 py-2.5 text-xs bg-slate-50 focus:outline-none focus:border-[var(--brand-red)]"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Instructor Name</label>
              <input
                type="text"
                value={instructorName}
                onChange={(e) => setInstructorName(e.target.value)}
                placeholder="e.g. Tony Swaim, PMP"
                className="w-full rounded-xl border border-slate-300 px-4 py-2.5 text-xs bg-slate-50 focus:outline-none focus:border-[var(--brand-red)]"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                Course Price ($)
              </label>
              <input
                type="text"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                placeholder="e.g. 250.00"
                className="w-full rounded-xl border border-slate-300 px-4 py-2.5 text-xs bg-slate-50 focus:outline-none focus:border-[var(--brand-red)]"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Duration</label>
              <input
                type="text"
                value={duration}
                onChange={(e) => setDuration(e.target.value)}
                placeholder="e.g. 6 weeks"
                className="w-full rounded-xl border border-slate-300 px-4 py-2.5 text-xs bg-slate-50 focus:outline-none focus:border-[var(--brand-red)]"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Delivery Mode</label>
              <select
                value={delivery}
                onChange={(e) => setDelivery(e.target.value as "online" | "physical")}
                className="w-full rounded-xl border border-slate-300 px-4 py-2.5 text-xs bg-slate-50 focus:outline-none focus:border-[var(--brand-red)]"
              >
                <option value="online">Online</option>
                <option value="physical">Physical / In-Person</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Skill Level</label>
              <select
                value={skillLevel}
                onChange={(e) => setSkillLevel(e.target.value)}
                className="w-full rounded-xl border border-slate-300 px-4 py-2.5 text-xs bg-slate-50 focus:outline-none focus:border-[var(--brand-red)]"
              >
                <option value="beginner">Beginner</option>
                <option value="intermediate">Intermediate</option>
                <option value="advanced">Advanced</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">
              Short & Long Description
            </label>
            <textarea
              rows={4}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Detailed course overview..."
              className="w-full rounded-xl border border-slate-300 px-4 py-2.5 text-xs bg-slate-50 focus:outline-none focus:border-[var(--brand-red)]"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">
              Curriculum & Syllabus Lessons
            </label>
            <textarea
              rows={4}
              value={curriculum}
              onChange={(e) => setCurriculum(e.target.value)}
              placeholder="Lesson 1 - Introduction..."
              className="w-full rounded-xl border border-slate-300 px-4 py-2.5 text-xs bg-slate-50 focus:outline-none focus:border-[var(--brand-red)]"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">
              Course Requirements & Prerequisites
            </label>
            <textarea
              rows={3}
              value={requirements}
              onChange={(e) => setRequirements(e.target.value)}
              placeholder="Hardware / software prerequisites..."
              className="w-full rounded-xl border border-slate-300 px-4 py-2.5 text-xs bg-slate-50 focus:outline-none focus:border-[var(--brand-red)]"
            />
          </div>

          <div className="flex justify-end gap-3 pt-4 border-t border-slate-100">
            <button
              type="button"
              onClick={() => navigate({ to: "/admin/courses" })}
              className="rounded-xl border border-slate-300 px-6 py-2.5 text-xs font-semibold text-slate-700 hover:bg-slate-50"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="rounded-xl bg-[var(--brand-red)] px-6 py-2.5 text-xs font-bold text-white shadow-md hover:bg-red-700"
            >
              Save Course
            </button>
          </div>
        </form>
      </div>
    </AdminLayout>
  );
}
