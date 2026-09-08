import React, {
  createContext,
  useContext,
  useState,
  useCallback,
  useRef,
} from "react";
import { motion, AnimatePresence } from "motion/react";
import { CheckCircle, XCircle, Info, AlertTriangle, X } from "lucide-react";
import { cn } from "../../lib/utils";
export type ToastType = "success" | "error" | "info" | "warning";
export interface Toast {
  id: string;
  message: string;
  type: ToastType;
  title?: string;
}
interface ToastContextValue {
  toasts: Toast[];
  toast: (message: string, type?: ToastType, title?: string) => void;
  dismiss: (id: string) => void;
}
const ToastContext = createContext<ToastContextValue | null>(null);
const ICONS: Record<ToastType, React.ReactNode> = {
  success: <CheckCircle className="w-4 h-4 shrink-0" />,
  error: <XCircle className="w-4 h-4 shrink-0" />,
  info: <Info className="w-4 h-4 shrink-0" />,
  warning: <AlertTriangle className="w-4 h-4 shrink-0" />,
};
const STYLES: Record<ToastType, string> = {
  success: "bg-white border-l-4 border-l-[#22C55E] text-[#1E293B]",
  error: "bg-white border-l-4 border-l-[#EF4444] text-[#1E293B]",
  info: "bg-white border-l-4 border-l-[#0d1b2a] text-[#1E293B]",
  warning: "bg-white border-l-4 border-l-[#F59E0B] text-[#1E293B]",
};
const ICON_COLORS: Record<ToastType, string> = {
  success: "text-[#22C55E]",
  error: "text-[#EF4444]",
  info: "text-[#0d1b2a]",
  warning: "text-[#F59E0B]",
};
export function ToastProvider({ children }: { children: React.ReactNode }) {
  const [toasts, setToasts] = useState<Toast[]>([]);
  const timers = useRef<Map<string, ReturnType<typeof setTimeout>>>(new Map());
  const dismiss = useCallback((id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
    const t = timers.current.get(id);
    if (t) {
      clearTimeout(t);
      timers.current.delete(id);
    }
  }, []);
  const toast = useCallback(
    (message: string, type: ToastType = "info", title?: string) => {
      const id = `toast-${Date.now()}-${Math.random().toString(36).slice(2, 6)}`;
      setToasts((prev) => [...prev, { id, message, type, title }]);
      const timer = setTimeout(() => dismiss(id), 4500);
      timers.current.set(id, timer);
    },
    [dismiss],
  );
  return (
    <ToastContext.Provider value={{ toasts, toast, dismiss }}>
      {" "}
      {children}{" "}
      <div
        aria-live="polite"
        className="fixed bottom-6 right-6 z-[9999] flex flex-col gap-2 pointer-events-none"
        style={{ maxWidth: 380 }}
      >
        {" "}
        <AnimatePresence initial={false}>
          {" "}
          {toasts.map((t) => (
            <motion.div
              key={t.id}
              initial={{ opacity: 0, y: 16, scale: 0.96 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 8, scale: 0.96 }}
              transition={{ duration: 0.2, ease: "easeOut" }}
              className={cn(
                "pointer-events-auto flex items-start gap-3 px-4 py-3.5",
                "rounded-xl shadow-lg border border-[#E2E8F0] min-w-[300px]",
                STYLES[t.type],
              )}
            >
              {" "}
              <span className={cn("mt-0.5", ICON_COLORS[t.type])}>
                {ICONS[t.type]}
              </span>{" "}
              <div className="flex-1 min-w-0">
                {" "}
                {t.title && (
                  <p className="text-sm font-semibold mb-0.5">{t.title}</p>
                )}{" "}
                <p className="text-sm text-[#475569] leading-snug">
                  {t.message}
                </p>{" "}
              </div>{" "}
              <button
                onClick={() => dismiss(t.id)}
                aria-label="Dismiss"
                className="mt-0.5 p-0.5 text-[#94A3B8] hover:text-[#475569] transition-colors shrink-0"
              >
                {" "}
                <X className="w-3.5 h-3.5" />{" "}
              </button>{" "}
            </motion.div>
          ))}{" "}
        </AnimatePresence>{" "}
      </div>{" "}
    </ToastContext.Provider>
  );
}
export function useToast() {
  const ctx = useContext(ToastContext);
  if (!ctx) throw new Error("useToast must be used within ToastProvider");
  return ctx;
}
