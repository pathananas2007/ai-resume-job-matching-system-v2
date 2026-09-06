import { cn } from "../../lib/utils";
type BadgeType =
  "recommendation" | "skill-status" | "gap-severity" | "difficulty" | "impact";
interface BadgeProps {
  type: BadgeType;
  value: string;
  className?: string;
}
const BASE_CLASSES =
  "text-[9px] font-black uppercase tracking-wider px-2 py-0.5 border rounded-sm inline-block";
function getVariantClasses(type: BadgeType, value: string): string {
  switch (type) {
    case "recommendation":
      if (value === "Interview") return "rec-interview";
      if (value === "Consider") return "rec-consider";
      if (value === "Reject") return "rec-reject";
      return "";
    case "skill-status":
      if (value === "MATCH")
        return "bg-emerald-50 text-emerald-700 border-emerald-200";
      if (value === "CLOSE")
        return "bg-amber-50 text-amber-700 border-amber-200";
      if (value === "GAP") return "bg-red-50 text-red-700 border-red-200";
      return "";
    case "gap-severity":
      if (value === "Critical") return "bg-red-50 text-red-700 border-red-200";
      if (value === "Secondary")
        return "bg-amber-50 text-amber-700 border-amber-200";
      return "";
    case "difficulty":
      if (value === "Easy")
        return "bg-emerald-50 text-emerald-700 border-emerald-200";
      if (value === "Medium")
        return "bg-amber-50 text-amber-700 border-amber-200";
      if (value === "Hard") return "bg-red-50 text-red-700 border-red-200";
      return "";
    case "impact":
      if (value === "High")
        return "bg-indigo-50 text-indigo-700 border-indigo-200";
      if (value === "Medium")
        return "bg-violet-50 text-violet-700 border-violet-200";
      if (value === "Low") return "bg-slate-50 text-slate-500 border-slate-200";
      return "";
    default:
      return "";
  }
}
export function Badge({ type, value, className }: BadgeProps) {
  const variantClasses = getVariantClasses(type, value);
  return (
    <span className={cn(BASE_CLASSES, variantClasses, className)}>
      {" "}
      {value}{" "}
    </span>
  );
}
