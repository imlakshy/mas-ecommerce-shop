"use client";
import { createPortal } from "react-dom";

export default function CartConfrim({ children }) {
  if (typeof window === "undefined") return null;

  return createPortal(
    <div className="fixed inset-0 z-[9999] pointer-events-none">
      {children}
    </div>,
    document.body
  );
}
