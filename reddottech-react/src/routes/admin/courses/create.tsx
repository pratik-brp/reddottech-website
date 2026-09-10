import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { AdminLayout } from "@/components/admin/AdminLayout";
import { RichTextEditor } from "@/components/admin/RichTextEditor";
import { ImageUploadField } from "@/components/admin/ImageUploadField";
import { useState } from "react";
import { toast } from "sonner";
import { createCourse } from "@/lib/api";
import { requireAdminRoute } from "@/lib/auth";

export const Route = createFileRoute("/admin/courses/create")({
  beforeLoad: requireAdminRoute,
  head: () => ({
    meta: [{ title: "Create Course | Red Dot Admin" }],
  }),
  component: AdminCreateCoursePage,
});

const POPULAR_CATEGORIES = [
  "Artificial Intelligence",
  "Programming & Software",
  "Web Development",
  "Digital Marketing",
  "Project Management",
  "Executive & Leadership",
  "Analytics & Data",
  "Quality Management",
];

function AdminCreateCoursePage() {
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [category, setCategory] = useState("Web Development");
  const [instructorName, setInstructorName] = useState("");
  const [instructorTitle, setInstructorTitle] = useState("Faculty Lead");
  const [instructorDetail, setInstructorDetail] = useState("");
  const [price, setPrice] = useState("250.00");
  const [startDate, setStartDate] = useState("Rolling Admission");
  const [duration, setDuration] = useState("6 weeks");
  const [delivery, setDelivery] = useState<"online" | "physical">("online");
  const [mode, setMode] = useState("Instructor-led");
  const [language, setLanguage] = useState("English");
  const [skillLevel, setSkillLevel] = useState("beginner");
  const [certification, setCertification] = useState("PECP");
  const [status, setStatus] = useState("published");
  const [sortOrder, setSortOrder] = useState("0");
  const [thumbnail, setThumbnail] = useState("");
  const [bannerImage, setBannerImage] = useState("");
  const [instructorImage, setInstructorImage] = useState("");
  const [description, setDescription] = useState("");
  const [requirements, setRequirements] = useState("");
  const [curriculum, setCurriculum] = useState("");
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
        category,
        instructorName,
        instructorTitle,
        instructorImage,
        instructorDetail,
        price: Number(price) || 0,
        startDate,
        duration,
        delivery,
        mode,
        language,
        skillLevel,
        certification,
        status,
        sortOrder: Number(sortOrder) || 0,
        thumbnail,
        bannerImage,
        description,
        requirements,
        curriculum,
      });
      toast.success("Course created and saved successfully to database!");
      navigate({ to: "/admin/courses" });
    } catch (err) {
      toast.error("Failed to save course to database.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <AdminLayout title="Add New Course" mobileTitle="New Course">
      <div className="max-w-4xl mx-auto bg-white rounded-2xl sm:rounded-3xl p-4 sm:p-10 border border-slate-200 shadow-xl space-y-5 sm:space-y-7">
        <div className="border-b border-slate-100 pb-3 sm:pb-4">
          <h2 className="text-lg sm:text-xl font-extrabold text-slate-900">Create New Course</h2>
          <p className="text-xs text-slate-500 font-medium mt-0.5 sm:mt-1">
            Add a new professional certification module or cohort program to the catalog.
          </p>
        </div>

        <form
          onSubmit={handleSubmit}
          className="space-y-5 sm:space-y-7 text-xs font-semibold text-slate-700"
        >
          {/* 1. General Info */}
          <div className="space-y-4">
            <h4 className="text-xs font-black uppercase tracking-wider text-brand-red flex items-center gap-2">
              <span className="h-2 w-2 rounded-full bg-brand-red" />
              General &amp; Pricing Information
            </h4>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
              <div className="sm:col-span-2">
                <label
                  htmlFor="create_course_name"
                  className="block text-xs font-bold text-slate-700 mb-1.5"
                >
                  Course Name <span className="text-brand-red">*</span>
                </label>
                <input
                  id="create_course_name"
                  name="course_name"
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="e.g. Introduction to Business Analytics"
                  className="w-full rounded-xl border border-slate-300 p-2.5 text-xs font-semibold text-slate-900 bg-slate-50/70 focus:bg-white focus:border-brand-red focus:outline-none"
                />
              </div>

              <div>
                <label
                  htmlFor="create_course_category"
                  className="block text-xs font-bold text-slate-700 mb-1.5"
                >
                  Category
                </label>
                <input
                  id="create_course_category"
                  name="category"
                  type="text"
                  list="create-category-suggestions"
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  placeholder="e.g. Web Development"
                  className="w-full rounded-xl border border-slate-300 p-2.5 text-xs font-semibold text-slate-900 bg-slate-50/70 focus:bg-white focus:border-brand-red focus:outline-none"
                />
                <datalist id="create-category-suggestions">
                  {POPULAR_CATEGORIES.map((cat) => (
                    <option key={cat} value={cat} />
                  ))}
                </datalist>
              </div>

              <div>
                <label
                  htmlFor="create_instructor_name"
                  className="block text-xs font-bold text-slate-700 mb-1.5"
                >
                  Instructor Name
                </label>
                <input
                  id="create_instructor_name"
                  name="instructor_name"
                  type="text"
                  value={instructorName}
                  onChange={(e) => setInstructorName(e.target.value)}
                  placeholder="e.g. Matt Crabtree, CFP ®"
                  className="w-full rounded-xl border border-slate-300 p-2.5 text-xs font-semibold text-slate-900 bg-slate-50/70 focus:bg-white focus:border-brand-red focus:outline-none"
                />
              </div>

              <div>
                <label
                  htmlFor="create_instructor_title"
                  className="block text-xs font-bold text-slate-700 mb-1.5"
                >
                  Instructor Title
                </label>
                <input
                  id="create_instructor_title"
                  name="instructor_title"
                  type="text"
                  value={instructorTitle}
                  onChange={(e) => setInstructorTitle(e.target.value)}
                  placeholder="e.g. Certified Financial Planner ™"
                  className="w-full rounded-xl border border-slate-300 p-2.5 text-xs font-semibold text-slate-900 bg-slate-50/70 focus:bg-white focus:border-brand-red focus:outline-none"
                />
              </div>

              <div>
                <label
                  htmlFor="create_course_price"
                  className="block text-xs font-bold text-slate-700 mb-1.5"
                >
                  Price ($ USD / NPR)
                </label>
                <input
                  id="create_course_price"
                  name="price"
                  type="number"
                  step="0.01"
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                  placeholder="e.g. 250.00"
                  className="w-full rounded-xl border border-slate-300 p-2.5 text-xs font-semibold text-slate-900 bg-slate-50/70 focus:bg-white focus:border-brand-red focus:outline-none"
                />
              </div>

              <div>
                <label
                  htmlFor="create_start_date"
                  className="block text-xs font-bold text-slate-700 mb-1.5"
                >
                  Start Date
                </label>
                <input
                  id="create_start_date"
                  name="start_date"
                  type="text"
                  value={startDate}
                  onChange={(e) => setStartDate(e.target.value)}
                  placeholder="e.g. Rolling Admission / Nov 15, 2026"
                  className="w-full rounded-xl border border-slate-300 p-2.5 text-xs font-semibold text-slate-900 bg-slate-50/70 focus:bg-white focus:border-brand-red focus:outline-none"
                />
              </div>

              <div>
                <label
                  htmlFor="create_duration"
                  className="block text-xs font-bold text-slate-700 mb-1.5"
                >
                  Duration
                </label>
                <input
                  id="create_duration"
                  name="duration"
                  type="text"
                  value={duration}
                  onChange={(e) => setDuration(e.target.value)}
                  placeholder="e.g. 6 weeks / 24 Hours"
                  className="w-full rounded-xl border border-slate-300 p-2.5 text-xs font-semibold text-slate-900 bg-slate-50/70 focus:bg-white focus:border-brand-red focus:outline-none"
                />
              </div>

              <div>
                <label
                  htmlFor="create_sort_order"
                  className="block text-xs font-bold text-slate-700 mb-1.5"
                >
                  Display Sequence (# Order)
                </label>
                <input
                  id="create_sort_order"
                  name="sort_order"
                  type="number"
                  value={sortOrder}
                  onChange={(e) => setSortOrder(e.target.value)}
                  placeholder="0 (automatic next position)"
                  className="w-full rounded-xl border border-slate-300 p-2.5 text-xs font-semibold text-slate-900 bg-slate-50/70 focus:bg-white focus:border-brand-red focus:outline-none"
                />
              </div>
            </div>
          </div>

          {/* 2. Format & Classification */}
          <div className="space-y-4 pt-2 border-t border-slate-100">
            <h4 className="text-xs font-black uppercase tracking-wider text-slate-600 flex items-center gap-2">
              <span className="h-2 w-2 rounded-full bg-slate-400" />
              Format, Mode &amp; Classification
            </h4>

            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-3.5">
              <div>
                <label
                  htmlFor="create_delivery"
                  className="block text-xs font-bold text-slate-700 mb-1.5"
                >
                  Delivery Mode
                </label>
                <select
                  id="create_delivery"
                  name="delivery"
                  value={delivery}
                  onChange={(e) => setDelivery(e.target.value as "online" | "physical")}
                  className="w-full rounded-xl border border-slate-300 p-2.5 text-xs font-semibold text-slate-900 bg-slate-50/70 focus:bg-white focus:border-brand-red focus:outline-none"
                >
                  <option value="online">Online</option>
                  <option value="physical">Physical</option>
                </select>
              </div>

              <div>
                <label
                  htmlFor="create_mode"
                  className="block text-xs font-bold text-slate-700 mb-1.5"
                >
                  Mode
                </label>
                <input
                  id="create_mode"
                  name="mode"
                  type="text"
                  value={mode}
                  onChange={(e) => setMode(e.target.value)}
                  placeholder="e.g. Instructor-led"
                  className="w-full rounded-xl border border-slate-300 p-2.5 text-xs font-semibold text-slate-900 bg-slate-50/70 focus:bg-white focus:border-brand-red focus:outline-none"
                />
              </div>

              <div>
                <label
                  htmlFor="create_language"
                  className="block text-xs font-bold text-slate-700 mb-1.5"
                >
                  Language
                </label>
                <input
                  id="create_language"
                  name="language"
                  type="text"
                  value={language}
                  onChange={(e) => setLanguage(e.target.value)}
                  placeholder="e.g. English"
                  className="w-full rounded-xl border border-slate-300 p-2.5 text-xs font-semibold text-slate-900 bg-slate-50/70 focus:bg-white focus:border-brand-red focus:outline-none"
                />
              </div>

              <div>
                <label
                  htmlFor="create_certification"
                  className="block text-xs font-bold text-slate-700 mb-1.5"
                >
                  Certification
                </label>
                <input
                  id="create_certification"
                  name="certification"
                  type="text"
                  value={certification}
                  onChange={(e) => setCertification(e.target.value)}
                  placeholder="PECP / Reddot"
                  className="w-full rounded-xl border border-slate-300 p-2.5 text-xs font-semibold text-slate-900 bg-slate-50/70 focus:bg-white focus:border-brand-red focus:outline-none"
                />
              </div>

              <div>
                <label
                  htmlFor="create_skillLevel"
                  className="block text-xs font-bold text-slate-700 mb-1.5"
                >
                  Skill Level
                </label>
                <select
                  id="create_skillLevel"
                  name="skillLevel"
                  value={skillLevel}
                  onChange={(e) => setSkillLevel(e.target.value)}
                  className="w-full rounded-xl border border-slate-300 p-2.5 text-xs font-semibold text-slate-900 bg-slate-50/70 focus:bg-white focus:border-brand-red focus:outline-none"
                >
                  <option value="beginner">Beginner</option>
                  <option value="intermediate">Intermediate</option>
                  <option value="advanced">Advanced</option>
                </select>
              </div>

              <div>
                <label
                  htmlFor="create_status"
                  className="block text-xs font-bold text-slate-700 mb-1.5"
                >
                  Status
                </label>
                <select
                  id="create_status"
                  name="status"
                  value={status}
                  onChange={(e) => setStatus(e.target.value)}
                  className="w-full rounded-xl border border-slate-300 p-2.5 text-xs font-semibold text-slate-900 bg-slate-50/70 focus:bg-white focus:border-brand-red focus:outline-none"
                >
                  <option value="published">Published</option>
                  <option value="draft">Draft</option>
                </select>
              </div>
            </div>
          </div>

          {/* 3. Media & Visuals (Direct Device Upload & Database Save) */}
          <div className="space-y-4 pt-2 border-t border-slate-100">
            <div className="flex items-center justify-between">
              <h4 className="text-xs font-black uppercase tracking-wider text-slate-700 flex items-center gap-2">
                <span className="h-2 w-2 rounded-full bg-brand-red" />
                Media &amp; Visual Assets (Direct Upload &amp; Database Storage)
              </h4>
              <span className="text-[11px] text-slate-400 font-medium">
                Uploads save automatically to MySQL
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
              <ImageUploadField
                label="Course Thumbnail Image"
                value={thumbnail}
                onChange={setThumbnail}
                placeholder="https://... or /uploads/thumbnail.jpg"
                aspectRatio="16/9"
                description="Displays on course cards, listings & catalog"
              />

              <ImageUploadField
                label="Course Hero Banner Image"
                value={bannerImage}
                onChange={setBannerImage}
                placeholder="https://... or /uploads/banner.jpg"
                aspectRatio="banner"
                description="Hero panoramic header on course details page"
              />

              <ImageUploadField
                label="Instructor Avatar Photo"
                value={instructorImage}
                onChange={setInstructorImage}
                placeholder="https://... or /uploads/instructor.jpg"
                aspectRatio="square"
                description="Lead faculty portrait headshot"
              />
            </div>
          </div>

          {/* 4. Full Content & Rich Text WYSIWYG Editors */}
          <div className="space-y-6 pt-2 border-t border-slate-100">
            <h4 className="text-xs font-black uppercase tracking-wider text-slate-600 flex items-center gap-2">
              <span className="h-2 w-2 rounded-full bg-slate-400" />
              Detailed Course Content &amp; Rich Text WYSIWYG Editors
            </h4>

            <RichTextEditor
              label="Description"
              value={description}
              onChange={setDescription}
              placeholder="Give yourself an employment advantage by developing analytical skills..."
              minHeight="140px"
            />

            <RichTextEditor
              label="Instructor Detail"
              value={instructorDetail}
              onChange={setInstructorDetail}
              placeholder="Matt Crabtree, CFP ®, earned his Bachelor of Science in Business..."
              minHeight="180px"
            />

            <RichTextEditor
              label="Requirements"
              value={requirements}
              onChange={setRequirements}
              placeholder="Hardware Requirements:&#10;→This course can be taken on either a PC, Mac, or Chromebook..."
              minHeight="180px"
            />

            <RichTextEditor
              label="Curriculum"
              value={curriculum}
              onChange={setCurriculum}
              placeholder="Lesson 1 – Problem Solving and Decision-Making: ...&#10;Lesson 2 – Introduction to Probability: ..."
              minHeight="220px"
            />
          </div>

          <div className="flex justify-end gap-3 pt-5 border-t border-slate-100">
            <button
              type="button"
              onClick={() => navigate({ to: "/admin/courses" })}
              className="rounded-xl border border-slate-300 px-6 py-2.5 text-xs font-bold text-slate-700 hover:bg-slate-100 transition-colors cursor-pointer"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="inline-flex items-center gap-2 rounded-xl bg-brand-red hover:bg-red-700 text-white font-extrabold text-xs tracking-wider uppercase px-7 py-2.5 shadow-md hover:shadow-lg transition-all duration-200 disabled:opacity-60 cursor-pointer"
            >
              <span>{isSubmitting ? "CREATING..." : "CREATE COURSE"}</span>
            </button>
          </div>
        </form>
      </div>
    </AdminLayout>
  );
}
