"use client";

import { useEffect } from "react";
import { CheckCircle, AlertCircle, X } from "lucide-react";

interface ToastProps {
  message: string;
  type?: "success" | "error";
  visible: boolean;
  onClose: () => void;
}

export function Toast({ message, type = "success", visible, onClose }: ToastProps) {
  useEffect(() => {
    if (visible) {
      const timer = setTimeout(onClose, 3000);
      return () => clearTimeout(timer);
    }
  }, [visible, onClose]);

  if (!visible) return null;

  const isSuccess = type === "success";

  return (
    <div className="fixed bottom-6 right-6 z-[60]" role="status" aria-live="polite">
      <div
        className={`flex items-center gap-3 px-4 py-3 rounded-xl shadow-lg border ${
          isSuccess
            ? "bg-green-500/10 border-green-500/30 text-green-600 dark:text-green-400"
            : "bg-red-500/10 border-red-500/30 text-red-600 dark:text-red-400"
        }`}
      >
        {isSuccess ? <CheckCircle className="w-5 h-5" /> : <AlertCircle className="w-5 h-5" />}
        <span className="text-sm font-medium">{message}</span>
        <button onClick={onClose} className="ml-2 p-0.5 rounded hover:bg-black/10" aria-label="Dismiss">
          <X className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}
