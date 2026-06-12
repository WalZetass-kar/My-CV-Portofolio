"use client";

import { Modal } from "./Modal";
import { AlertTriangle } from "lucide-react";

interface ConfirmDialogProps {
  open: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title?: string;
  message: string;
}

export function ConfirmDialog({ open, onClose, onConfirm, title = "Confirm Delete", message }: ConfirmDialogProps) {
  return (
    <Modal open={open} onClose={onClose} title={title} maxWidth="max-w-sm">
      <div className="flex items-start gap-3">
        <div className="w-10 h-10 rounded-full bg-red-500/10 flex items-center justify-center shrink-0">
          <AlertTriangle className="w-5 h-5 text-red-500" />
        </div>
        <p className="text-sm text-muted">{message}</p>
      </div>
      <div className="flex gap-3 pt-2">
        <button
          onClick={onClose}
          className="flex-1 px-4 py-2.5 rounded-lg border border-border text-foreground font-medium hover:bg-surface transition-colors"
        >
          Cancel
        </button>
        <button
          onClick={() => { onConfirm(); onClose(); }}
          className="flex-1 px-4 py-2.5 rounded-lg bg-red-500 text-white font-medium hover:bg-red-600 transition-colors"
        >
          Delete
        </button>
      </div>
    </Modal>
  );
}
