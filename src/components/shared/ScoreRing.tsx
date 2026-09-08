import { motion } from "motion/react";
import { cn } from "../../lib/utils";
interface ScoreRingProps {
  score: number;
  size?: number;
  strokeWidth?: number;
  className?: string;
}
export function ScoreRing({
  score,
  size = 120,
  strokeWidth = 8,
  className,
}: ScoreRingProps) {
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const clampedScore = Math.max(0, Math.min(100, score));
  const targetOffset = circumference - (clampedScore / 100) * circumference;
  const progressColor =
    clampedScore >= 75 ? "#6366f1" : clampedScore >= 50 ? "#f59e0b" : "#ef4444";
  const cx = size / 2;
  const cy = size / 2;
  return (
    <div
      className={cn(
        "inline-flex items-center justify-center relative",
        className,
      )}
      style={{ width: size, height: size }}
    >
      {" "}
      <svg
        width={size}
        height={size}
        style={{ transform: "rotate(-90deg)", position: "absolute", inset: 0 }}
      >
        {" "}
        {/* Background ring */}{" "}
        <circle
          cx={cx}
          cy={cy}
          r={radius}
          fill="none"
          stroke="#e0e7ff"
          strokeWidth={strokeWidth}
        />{" "}
        {/* Progress ring */}{" "}
        <motion.circle
          cx={cx}
          cy={cy}
          r={radius}
          fill="none"
          stroke={progressColor}
          strokeWidth={strokeWidth}
          strokeLinecap="butt"
          strokeDasharray={circumference}
          initial={{ strokeDashoffset: circumference }}
          animate={{ strokeDashoffset: targetOffset }}
          transition={{ duration: 1.2, ease: "easeOut" }}
        />{" "}
      </svg>{" "}
      {/* Center text */}{" "}
      <div className="flex flex-col items-center justify-center z-10">
        {" "}
        <span
          className="font-black tabular-nums leading-none"
          style={{ fontSize: size * 0.25, color: progressColor }}
        >
          {" "}
          {clampedScore}{" "}
        </span>{" "}
        <span
          className="font-bold text-slate-400 uppercase tracking-widest leading-none mt-0.5"
          style={{ fontSize: size * 0.09 }}
        >
          {" "}
          /100{" "}
        </span>{" "}
      </div>{" "}
    </div>
  );
}
