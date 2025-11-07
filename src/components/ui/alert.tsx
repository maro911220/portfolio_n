"use client";
import { createPortal } from "react-dom";
import { AnimatePresence, motion } from "motion/react";
import type { AlertProps, AlertStyle } from "@/types/ui";

// 타입별 스타일
const ALERT_STYLES: Record<string, AlertStyle> = {
  success: {
    container: "bg-green-50 border-green-200",
    text: "text-green-700",
  },
  error: {
    container: "bg-red-50 border-red-200",
    text: "text-red-700",
  },
  info: {
    container: "bg-blue-50 border-blue-200",
    text: "text-blue-700",
  },
  idle: {
    container: "bg-blue-50 border-blue-200",
    text: "text-blue-700",
  },
};

// Alert
export default function Alert({ visible, type = "info", text }: AlertProps) {
  const style = ALERT_STYLES[type];

  return createPortal(
    <AnimatePresence>
      {visible && (
        <motion.div
          role="alert"
          aria-live="polite"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 20 }}
          transition={{ duration: 0.3 }}
          className={`fixed z-50 top-20 left-1/2 -translate-x-1/2 p-4 border rounded-md shadow-lg ${style.container}`}
        >
          <p className={`font-medium ${style.text}`}>{text}</p>
        </motion.div>
      )}
    </AnimatePresence>,
    document.body
  );
}
