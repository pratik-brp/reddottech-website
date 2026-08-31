import {
  Undo,
  Redo,
  Bold,
  Italic,
  Underline,
  Link as LinkIcon,
  List,
  ListOrdered,
  Quote,
  Table as TableIcon,
  Video,
  Code,
  ChevronDown,
  RemoveFormatting,
} from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { sanitizeHtml } from "@/lib/sanitize";

interface RichTextEditorProps {
  label?: string;
  value: string;
  onChange: (val: string) => void;
  placeholder?: string;
  minHeight?: string;
}

export function RichTextEditor({
  label,
  value,
  onChange,
  placeholder = "Write content here...",
  minHeight = "160px",
}: RichTextEditorProps) {
  const editorRef = useRef<HTMLDivElement>(null);
  const [isCodeView, setIsCodeView] = useState(false);
  const [selectedFormat, setSelectedFormat] = useState("p");

  // Sync external value to contentEditable div only when not actively typing/matching
  useEffect(() => {
    if (editorRef.current && !isCodeView) {
      if (editorRef.current.innerHTML !== value) {
        editorRef.current.innerHTML = sanitizeHtml(value || "");
      }
    }
  }, [value, isCodeView]);

  const handleInput = () => {
    if (editorRef.current) {
      onChange(editorRef.current.innerHTML);
    }
  };

  const exec = (command: string, arg?: string) => {
    if (isCodeView) return;
    document.execCommand(command, false, arg);
    handleInput();
    if (editorRef.current) {
      editorRef.current.focus();
    }
  };

  const handleFormatChange = (tag: string) => {
    setSelectedFormat(tag);
    if (isCodeView) return;
    if (tag === "p") {
      exec("formatBlock", "<p>");
    } else if (tag.startsWith("h")) {
      exec("formatBlock", `<${tag}>`);
    } else if (tag === "blockquote") {
      exec("formatBlock", "<blockquote>");
    } else if (tag === "pre") {
      exec("formatBlock", "<pre>");
    }
  };

  const handleInsertLink = () => {
    if (isCodeView) return;
    const url = prompt("Enter URL (e.g. https://...):", "https://");
    if (url && url !== "https://") {
      exec("createLink", url);
    }
  };

  const handleInsertTable = () => {
    if (isCodeView) return;
    const tableHtml = `
      <table class="w-full border-collapse border border-slate-300 my-3 text-xs">
        <thead>
          <tr class="bg-slate-100">
            <th class="border border-slate-300 p-2 font-bold">Header 1</th>
            <th class="border border-slate-300 p-2 font-bold">Header 2</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td class="border border-slate-300 p-2">Item 1</td>
            <td class="border border-slate-300 p-2">Details 1</td>
          </tr>
          <tr>
            <td class="border border-slate-300 p-2">Item 2</td>
            <td class="border border-slate-300 p-2">Details 2</td>
          </tr>
        </tbody>
      </table>
    `;
    exec("insertHTML", tableHtml);
  };

  const handleInsertMedia = () => {
    if (isCodeView) return;
    const mediaUrl = prompt("Enter Video or Image URL:", "https://");
    if (mediaUrl && mediaUrl !== "https://") {
      if (
        mediaUrl.includes("youtube.com") ||
        mediaUrl.includes("youtu.be") ||
        mediaUrl.includes("vimeo.com")
      ) {
        const videoHtml = `
          <div class="my-3 aspect-video w-full rounded-xl overflow-hidden shadow-md">
            <iframe src="${mediaUrl}" class="w-full h-full" allowfullscreen></iframe>
          </div>
        `;
        exec("insertHTML", videoHtml);
      } else {
        exec("insertImage", mediaUrl);
      }
    }
  };

  return (
    <div className="space-y-1.5 w-full">
      {label && (
        <div className="flex items-center justify-between">
          <label className="block text-xs font-bold text-slate-700">{label}</label>
          <button
            type="button"
            onClick={() => setIsCodeView(!isCodeView)}
            className={`text-[11px] font-semibold flex items-center gap-1 transition-colors px-2 py-0.5 rounded cursor-pointer ${
              isCodeView
                ? "bg-brand-red text-white"
                : "text-slate-400 hover:text-slate-700 bg-slate-100 hover:bg-slate-200"
            }`}
          >
            <Code className="h-3 w-3" />
            <span>{isCodeView ? "Visual WYSIWYG" : "HTML Source"}</span>
          </button>
        </div>
      )}

      {/* Main Editor Container */}
      <div className="rounded-xl border border-slate-300 bg-white shadow-xs overflow-hidden focus-within:border-brand-red focus-within:ring-2 focus-within:ring-brand-red/15 transition-all">
        {/* Top WYSIWYG Toolbar */}
        <div className="flex flex-wrap items-center gap-0.5 sm:gap-1 p-1.5 bg-slate-50 border-b border-slate-200 text-slate-600 select-none">
          {/* Undo / Redo */}
          <button
            type="button"
            onClick={() => exec("undo")}
            className="p-1.5 rounded-lg hover:bg-slate-200 hover:text-slate-900 transition-colors cursor-pointer"
            title="Undo"
          >
            <Undo className="h-4 w-4" />
          </button>
          <button
            type="button"
            onClick={() => exec("redo")}
            className="p-1.5 rounded-lg hover:bg-slate-200 hover:text-slate-900 transition-colors cursor-pointer"
            title="Redo"
          >
            <Redo className="h-4 w-4" />
          </button>

          <div className="h-4 w-[1px] bg-slate-300 mx-1" />

          {/* Paragraph / Heading Dropdown */}
          <div className="relative inline-flex items-center">
            <select
              value={selectedFormat}
              onChange={(e) => handleFormatChange(e.target.value)}
              className="appearance-none bg-white border border-slate-300 rounded-lg pl-2.5 pr-7 py-1 text-xs font-semibold text-slate-700 hover:border-slate-400 focus:outline-none cursor-pointer"
            >
              <option value="p">Paragraph</option>
              <option value="h1">Heading 1</option>
              <option value="h2">Heading 2</option>
              <option value="h3">Heading 3</option>
              <option value="h4">Heading 4</option>
              <option value="blockquote">Quote</option>
              <option value="pre">Code / Pre</option>
            </select>
            <ChevronDown className="pointer-events-none absolute right-2 h-3.5 w-3.5 text-slate-400" />
          </div>

          <div className="h-4 w-[1px] bg-slate-300 mx-1" />

          {/* Bold & Italic & Underline */}
          <button
            type="button"
            onClick={() => exec("bold")}
            className="p-1.5 rounded-lg hover:bg-slate-200 hover:text-slate-900 font-bold transition-colors cursor-pointer"
            title="Bold (Ctrl+B)"
          >
            <Bold className="h-4 w-4" />
          </button>
          <button
            type="button"
            onClick={() => exec("italic")}
            className="p-1.5 rounded-lg hover:bg-slate-200 hover:text-slate-900 italic transition-colors cursor-pointer"
            title="Italic (Ctrl+I)"
          >
            <Italic className="h-4 w-4" />
          </button>
          <button
            type="button"
            onClick={() => exec("underline")}
            className="p-1.5 rounded-lg hover:bg-slate-200 hover:text-slate-900 transition-colors cursor-pointer"
            title="Underline"
          >
            <Underline className="h-4 w-4" />
          </button>

          <div className="h-4 w-[1px] bg-slate-300 mx-1" />

          {/* Link */}
          <button
            type="button"
            onClick={handleInsertLink}
            className="p-1.5 rounded-lg hover:bg-slate-200 hover:text-slate-900 transition-colors cursor-pointer"
            title="Insert Link"
          >
            <LinkIcon className="h-4 w-4" />
          </button>

          {/* Lists */}
          <button
            type="button"
            onClick={() => exec("insertUnorderedList")}
            className="p-1.5 rounded-lg hover:bg-slate-200 hover:text-slate-900 transition-colors cursor-pointer"
            title="Bullet List"
          >
            <List className="h-4 w-4" />
          </button>
          <button
            type="button"
            onClick={() => exec("insertOrderedList")}
            className="p-1.5 rounded-lg hover:bg-slate-200 hover:text-slate-900 transition-colors cursor-pointer"
            title="Numbered List"
          >
            <ListOrdered className="h-4 w-4" />
          </button>

          {/* Quote */}
          <button
            type="button"
            onClick={() => exec("formatBlock", "<blockquote>")}
            className="p-1.5 rounded-lg hover:bg-slate-200 hover:text-slate-900 transition-colors cursor-pointer"
            title="Blockquote"
          >
            <Quote className="h-4 w-4" />
          </button>

          <div className="h-4 w-[1px] bg-slate-300 mx-1" />

          {/* Table */}
          <button
            type="button"
            onClick={handleInsertTable}
            className="p-1.5 rounded-lg hover:bg-slate-200 hover:text-slate-900 transition-colors cursor-pointer"
            title="Insert Table"
          >
            <TableIcon className="h-4 w-4" />
          </button>

          {/* Media / Video */}
          <button
            type="button"
            onClick={handleInsertMedia}
            className="p-1.5 rounded-lg hover:bg-slate-200 hover:text-slate-900 transition-colors cursor-pointer"
            title="Insert Media / Video"
          >
            <Video className="h-4 w-4" />
          </button>

          {/* Clear Formatting */}
          <button
            type="button"
            onClick={() => exec("removeFormat")}
            className="p-1.5 rounded-lg hover:bg-slate-200 hover:text-slate-900 transition-colors cursor-pointer ml-auto"
            title="Clear Formatting"
          >
            <RemoveFormatting className="h-4 w-4" />
          </button>
        </div>

        {/* Editor Body */}
        {isCodeView ? (
          <textarea
            value={value}
            onChange={(e) => onChange(e.target.value)}
            style={{ minHeight }}
            className="w-full p-4 font-mono text-xs text-slate-900 bg-slate-900/5 focus:outline-none resize-y leading-relaxed"
            placeholder="Edit raw HTML..."
          />
        ) : (
          <div
            ref={editorRef}
            contentEditable
            onInput={handleInput}
            onBlur={handleInput}
            style={{ minHeight }}
            data-placeholder={placeholder}
            className="p-4 text-xs sm:text-sm text-slate-800 focus:outline-none prose prose-sm max-w-none empty:before:content-[attr(data-placeholder)] empty:before:text-slate-400 overflow-y-auto leading-relaxed"
          />
        )}
      </div>
    </div>
  );
}
