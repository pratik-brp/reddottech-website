import { useState, useRef, DragEvent } from "react";
import { UploadCloud, X, Loader2, Link2, CheckCircle2, FolderOpen } from "lucide-react";
import { uploadImage } from "@/lib/api";
import { toast } from "sonner";

interface ImageUploadFieldProps {
  label: string;
  value: string;
  onChange: (url: string) => void;
  placeholder?: string;
  aspectRatio?: "16/9" | "square" | "video" | "banner";
  description?: string;
}

export function ImageUploadField({
  label,
  value,
  onChange,
  placeholder = "/images/courses/...",
  aspectRatio = "16/9",
  description,
}: ImageUploadFieldProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [showUrlInput, setShowUrlInput] = useState(false);

  const processFile = async (file: File) => {
    if (!file) return;

    // Validate type
    if (!file.type.startsWith("image/")) {
      toast.error("Invalid file format. Please upload an image file (PNG, JPG, WEBP, or SVG).");
      return;
    }

    // Validate size (< 15MB)
    if (file.size > 15 * 1024 * 1024) {
      toast.error("Image file is too large. Please select an image under 15MB.");
      return;
    }

    setIsUploading(true);
    const toastId = toast.loading(`Uploading ${file.name}...`);

    try {
      const url = await uploadImage(file);
      onChange(url);
      toast.success(`${label} uploaded and attached!`, { id: toastId });
    } catch (err) {
      const msg = err instanceof Error ? err.message : "Failed to upload image. Please try again.";
      toast.error(msg, { id: toastId });
    } finally {
      setIsUploading(false);
      if (fileInputRef.current) fileInputRef.current.value = "";
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) processFile(file);
  };

  const handleDragOver = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  };

  const handleDragLeave = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  };

  const handleDrop = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);

    const file = e.dataTransfer.files?.[0];
    if (file) processFile(file);
  };

  const handleRemove = () => {
    onChange("");
    toast.info(`${label} removed`);
  };

  const inputId = `upload_${label.toLowerCase().replace(/[^a-z0-9]/g, "_")}`;

  return (
    <div className="space-y-2">
      {/* Header with Title & URL Toggle */}
      <div className="flex items-center justify-between">
        <div>
          <label htmlFor={inputId} className="block text-xs font-bold text-slate-800">
            {label}
          </label>
          {description && <p className="text-[11px] text-slate-500">{description}</p>}
        </div>
        <button
          type="button"
          onClick={() => setShowUrlInput(!showUrlInput)}
          className="text-[11px] font-semibold text-slate-400 hover:text-slate-700 flex items-center gap-1 transition-colors cursor-pointer"
        >
          <Link2 className="h-3 w-3" />
          <span>{showUrlInput ? "Hide Custom URL" : "Enter Direct URL"}</span>
        </button>
      </div>

      {/* Hidden File Input */}
      <input
        id={inputId}
        name={inputId}
        ref={fileInputRef}
        type="file"
        accept="image/png,image/jpeg,image/jpg,image/webp,image/svg+xml,image/gif"
        onChange={handleFileChange}
        className="hidden"
      />

      {/* Optional Direct URL Input */}
      {showUrlInput && (
        <div className="relative">
          <input
            id={`url_${inputId}`}
            name={`url_${inputId}`}
            type="text"
            value={value || ""}
            onChange={(e) => onChange(e.target.value)}
            placeholder={placeholder || "https://... or /uploads/..."}
            className="w-full rounded-xl border border-slate-300 px-3 py-2 text-xs font-semibold text-slate-900 bg-white focus:border-brand-red focus:outline-none shadow-2xs"
          />
          {value && (
            <button
              type="button"
              onClick={() => onChange("")}
              className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
            >
              <X className="h-3.5 w-3.5" />
            </button>
          )}
        </div>
      )}

      {/* Image Preview or Dropzone */}
      {value ? (
        <div className="relative rounded-2xl overflow-hidden border border-slate-200 bg-slate-950/5 group shadow-xs">
          <div
            className={`w-full relative bg-slate-900 ${
              aspectRatio === "banner"
                ? "h-36 sm:h-44"
                : aspectRatio === "square"
                  ? "h-32 sm:h-40 aspect-square"
                  : "h-32 sm:h-38"
            }`}
          >
            <img
              src={value}
              alt={label}
              className="w-full h-full object-cover"
              onError={(e) => {
                (e.target as HTMLImageElement).src = "/images/courses/course-ai.jpg";
              }}
            />

            {/* Hover / Active Overlay Controls */}
            <div className="absolute inset-0 bg-slate-950/60 opacity-0 group-hover:opacity-100 sm:group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2 sm:gap-3 backdrop-blur-xs p-2">
              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                disabled={isUploading}
                className="inline-flex items-center gap-1.5 rounded-xl bg-white px-3 py-2 text-xs font-bold text-slate-900 shadow-md hover:bg-slate-100 transition-all cursor-pointer"
              >
                {isUploading ? (
                  <Loader2 className="h-3.5 w-3.5 animate-spin text-brand-red" />
                ) : (
                  <UploadCloud className="h-3.5 w-3.5 text-brand-red" />
                )}
                <span>Upload New</span>
              </button>

              <button
                type="button"
                onClick={handleRemove}
                className="inline-flex items-center gap-1.5 rounded-xl bg-rose-600 px-3 py-2 text-xs font-bold text-white shadow-md hover:bg-rose-700 transition-all cursor-pointer"
              >
                <X className="h-3.5 w-3.5" />
                <span>Remove</span>
              </button>
            </div>
          </div>

          {/* Footer Metadata */}
          <div className="px-3 py-2 bg-white border-t border-slate-100 flex items-center justify-between text-[11px]">
            <span className="truncate text-slate-500 font-mono max-w-[200px] sm:max-w-[300px]">
              {value}
            </span>
            <span className="inline-flex items-center gap-1 text-emerald-600 font-bold shrink-0">
              <CheckCircle2 className="h-3 w-3" />
              Saved in DB
            </span>
          </div>
        </div>
      ) : (
        /* Dropzone & Device Upload Area */
        <div
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          onClick={() => fileInputRef.current?.click()}
          className={`border-2 border-dashed rounded-2xl p-5 sm:p-6 text-center transition-all cursor-pointer flex flex-col items-center justify-center gap-3 group ${
            isDragging
              ? "border-brand-red bg-brand-red/5 scale-[1.01]"
              : "border-slate-300 hover:border-brand-red bg-slate-50/70 hover:bg-white"
          }`}
        >
          <div
            className={`h-12 w-12 rounded-2xl flex items-center justify-center transition-all shadow-2xs ${
              isDragging
                ? "bg-brand-red text-white scale-110"
                : "bg-white group-hover:bg-brand-red/10 text-slate-500 group-hover:text-brand-red border border-slate-200 group-hover:border-brand-red/30"
            }`}
          >
            {isUploading ? (
              <Loader2 className="h-6 w-6 animate-spin text-brand-red" />
            ) : (
              <UploadCloud className="h-6 w-6" />
            )}
          </div>

          <div className="space-y-1">
            <p className="text-xs sm:text-sm font-bold text-slate-800">
              {isUploading ? (
                <span className="text-brand-red">Uploading &amp; Processing Image...</span>
              ) : isDragging ? (
                <span className="text-brand-red">Drop Image File Here</span>
              ) : (
                <>
                  <span className="text-brand-red underline underline-offset-2">
                    Click to browse device
                  </span>{" "}
                  or drag &amp; drop here
                </>
              )}
            </p>
            <p className="text-[10px] sm:text-[11px] text-slate-400 font-medium">
              PNG, JPG, WEBP, SVG or GIF • Max 15MB • Uploads directly to server &amp; database
            </p>
          </div>

          <button
            type="button"
            disabled={isUploading}
            className="inline-flex items-center gap-1.5 rounded-xl bg-slate-900 group-hover:bg-brand-red text-white px-3.5 py-1.5 text-xs font-bold transition-colors cursor-pointer shadow-xs pointer-events-none"
          >
            <FolderOpen className="h-3.5 w-3.5" />
            <span>Select from Device</span>
          </button>
        </div>
      )}
    </div>
  );
}
