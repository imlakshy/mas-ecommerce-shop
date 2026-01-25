"use client";
import { createPortal } from "react-dom";

export default function Modal({ children }) {
  if (typeof window === "undefined") return null;

  return createPortal(
    <div className="fixed inset-0 z-[9999] bg-black/50 flex items-center justify-center">
      {children}
    </div>,
    document.body
  );
}
