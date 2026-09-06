import { motion } from "motion/react";
import { cn } from "../../lib/utils";
interface ProgressBarProps {
  value: number;
  max?: number;
  color?: string;
  className?: string;
  label?: string;
  showValue?: boolean;
}
export function ProgressBar({
  value,
  max = 100,
  color,
  className,
  label,
  showValue = false,
}: ProgressBarProps) {
  const percentage = Math.max(0, Math.min(100, (value / max) * 100));
  return (
    <div className={cn("w-full", className)}>
      {" "}
      {(label || showValue) && (
        <div className="flex items-center justify-between mb-1">
          {" "}
          {label && (
            <span className="text-[9px] font-bold uppercase tracking-widest text-slate-400">
              {" "}
              {label}{" "}
            </span>
          )}{" "}
          {showValue && (
            <span className="text-[9px] font-bold uppercase tracking-widest text-slate-400">
              {" "}
              {value}/{max}{" "}
            </span>
          )}{" "}
        </div>
      )}{" "}
      <div className="w-full h-2 bg-slate-100 overflow-hidden">
        {" "}
        <motion.div
          className={cn("h-full", color ?? "bg-indigo-500")}
          initial={{ width: "0%" }}
          animate={{ width: `${percentage}%` }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        />{" "}
      </div>{" "}
    </div>
  );
}
