import { useState, useRef } from "react";
import { UploadCloud, Image as ImageIcon, X, Loader2, Link2, CheckCircle2 } from "lucide-react";
import { uploadImage } from "@/lib/api";
import { toast } from "sonner";

interface ImageUploadFieldProps {
  label: string;
  value: string;
  onChange: (url: string) => void;
  placeholder?: string;
  aspectRatio?: "16/9" | "square" | "video" | "banner";
}

export function ImageUploadField({
  label,
  value,
  onChange,
  placeholder = "/images/courses/...",
  aspectRatio = "16/9",
}: ImageUploadFieldProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [showUrlInput, setShowUrlInput] = useState(false);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Validate size (< 10MB)
    if (file.size > 10 * 1024 * 1024) {
      toast.error("Image file is too large. Please select an image under 10MB.");
      return;
    }

    setIsUploading(true);
    try {
      const url = await uploadImage(file);
      onChange(url);
      toast.success(`Image "${file.name}" uploaded successfully!`);
    } catch (err) {
      toast.error("Failed to upload image.");
    } finally {
      setIsUploading(false);
      if (fileInputRef.current) fileInputRef.current.value = "";
    }
  };

  const handleRemove = () => {
    onChange("");
  };

  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between">
        <label className="block text-xs font-bold text-slate-700">{label}</label>
        <button
          type="button"
          onClick={() => setShowUrlInput(!showUrlInput)}
          className="text-[11px] font-semibold text-slate-400 hover:text-slate-700 flex items-center gap-1 transition-colors cursor-pointer"
        >
          <Link2 className="h-3 w-3" />
          <span>{showUrlInput ? "Hide Direct URL" : "Edit URL Directly"}</span>
        </button>
      </div>

      {/* Hidden File Input */}
      <input
        id={`upload_${label.toLowerCase().replace(/\s+/g, "_")}`}
        name={`upload_${label.toLowerCase().replace(/\s+/g, "_")}`}
        ref={fileInputRef}
        type="file"
        accept="image/png,image/jpeg,image/jpg,image/webp,image/svg+xml"
        onChange={handleFileChange}
        className="hidden"
      />

      {/* Direct URL Input if toggled */}
      {showUrlInput && (
        <input
          id={`url_${label.toLowerCase().replace(/\s+/g, "_")}`}
          name={`url_${label.toLowerCase().replace(/\s+/g, "_")}`}
          type="text"
          value={value || ""}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder || "Enter image URL (https://... or /uploads/...)"}
          className="w-full rounded-xl border border-slate-300 p-2.5 text-xs font-semibold text-slate-900 bg-white focus:border-brand-red focus:outline-none"
        />
      )}

      {/* Image Preview / Upload Box */}
      {value ? (
        <div className="relative rounded-2xl overflow-hidden border border-slate-200 bg-slate-900/5 group shadow-xs">
          <div className={`w-full relative ${aspectRatio === "banner" ? "h-36 sm:h-44" : "h-32 sm:h-36"}`}>
            <img
              src={value}
              alt={label}
              className="w-full h-full object-cover"
              onError={(e) => {
                (e.target as HTMLImageElement).src = "/images/courses/course-ai.jpg";
              }}
            />
            <div className="absolute inset-0 bg-slate-950/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-3 backdrop-blur-xs">
              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                disabled={isUploading}
                className="inline-flex items-center gap-1.5 rounded-xl bg-white px-3.5 py-2 text-xs font-bold text-slate-900 shadow-md hover:bg-slate-100 transition-all cursor-pointer"
              >
                <UploadCloud className="h-3.5 w-3.5 text-brand-red" />
                <span>Replace Image</span>
              </button>
              <button
                type="button"
                onClick={handleRemove}
                className="inline-flex items-center gap-1.5 rounded-xl bg-rose-600 px-3.5 py-2 text-xs font-bold text-white shadow-md hover:bg-rose-700 transition-all cursor-pointer"
              >
                <X className="h-3.5 w-3.5" />
                <span>Remove</span>
              </button>
            </div>
          </div>
          <div className="p-2.5 bg-white border-t border-slate-100 flex items-center justify-between text-[11px]">
            <span className="truncate text-slate-500 font-mono max-w-[260px]">{value}</span>
            <span className="inline-flex items-center gap-1 text-emerald-600 font-bold">
              <CheckCircle2 className="h-3 w-3" />
              Attached
            </span>
          </div>
        </div>
      ) : (
        <div
          onClick={() => fileInputRef.current?.click()}
          className="border-2 border-dashed border-slate-300 hover:border-brand-red rounded-2xl p-5 text-center bg-slate-50/70 hover:bg-white transition-all cursor-pointer flex flex-col items-center justify-center gap-2 group"
        >
          <div className="h-10 w-10 rounded-xl bg-slate-200/80 group-hover:bg-brand-red/10 text-slate-500 group-hover:text-brand-red flex items-center justify-center transition-colors">
            {isUploading ? (
              <Loader2 className="h-5 w-5 animate-spin text-brand-red" />
            ) : (
              <UploadCloud className="h-5 w-5" />
            )}
          </div>
          <div>
            <p className="text-xs font-bold text-slate-800">
              {isUploading ? "Uploading file..." : `Click to Upload ${label}`}
            </p>
            <p className="text-[10px] text-slate-400 font-medium mt-0.5">
              PNG, JPG, WEBP or SVG (Max 10MB)
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
