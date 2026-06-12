"use client";

import { useState, useRef } from "react";
import { Upload, Image as ImageIcon, FileText, X } from "lucide-react";

interface FileUploadProps {
  value: string;
  onChange: (url: string) => void;
  accept?: string;
  label?: string;
}

export function FileUpload({ value, onChange, accept = "image/*,.pdf", label = "Upload Image / PDF" }: FileUploadProps) {
  const [uploading, setUploading] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleUpload = async (file: File) => {
    setUploading(true);
    const formData = new FormData();
    formData.append("file", file);

    const res = await fetch("/api/upload", { method: "POST", body: formData });
    if (res.ok) {
      const { url } = await res.json();
      onChange(url);
    }
    setUploading(false);
  };

  const isImage = value && (value.match(/\.(jpg|jpeg|png|gif|webp|svg)$/i) || value.startsWith("/uploads/"));

  return (
    <div>
      <label className="block text-sm font-medium text-foreground mb-1">{label}</label>

      {value && (
        <div className="mb-2 relative inline-block">
          {isImage ? (
            <img src={value} alt="Preview" className="w-32 h-20 object-cover rounded-lg border border-border" />
          ) : (
            <div className="flex items-center gap-2 p-2 rounded-lg bg-surface border border-border">
              <FileText className="w-4 h-4 text-muted" />
              <span className="text-xs text-muted truncate max-w-[150px]">{value}</span>
            </div>
          )}
          <button
            type="button"
            onClick={() => onChange("")}
            className="absolute -top-2 -right-2 w-5 h-5 bg-red-500 text-white rounded-full flex items-center justify-center"
          >
            <X className="w-3 h-3" />
          </button>
        </div>
      )}

      <input
        ref={inputRef}
        type="file"
        accept={accept}
        onChange={(e) => {
          const file = e.target.files?.[0];
          if (file) handleUpload(file);
        }}
        className="hidden"
      />

      <button
        type="button"
        onClick={() => inputRef.current?.click()}
        disabled={uploading}
        className="flex items-center gap-2 px-4 py-2 rounded-lg border border-border text-sm text-muted hover:bg-surface hover:text-foreground transition-colors disabled:opacity-50"
      >
        {uploading ? (
          <>
            <Upload className="w-4 h-4 animate-pulse" />
            Uploading...
          </>
        ) : (
          <>
            <ImageIcon className="w-4 h-4" />
            {value ? "Change File" : label}
          </>
        )}
      </button>
    </div>
  );
}
