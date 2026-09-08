import { cn } from "../../lib/utils";
import type { LucideIcon } from "lucide-react";
interface EmptyStateProps {
  icon: LucideIcon;
  title: string;
  description?: string;
  action?: React.ReactNode;
  className?: string;
}
export function EmptyState({
  icon: Icon,
  title,
  description,
  action,
  className,
}: EmptyStateProps) {
  return (
    <div
      className={cn(
        "flex flex-col items-center justify-center py-16 px-6 text-center",
        className,
      )}
    >
      {" "}
      <div className="w-14 h-14 rounded-2xl bg-[#F5F7FA] border border-[#E2E8F0] flex items-center justify-center mb-4">
        {" "}
        <Icon className="w-6 h-6 text-[#94A3B8]" />{" "}
      </div>{" "}
      <h3 className="text-base font-semibold text-[#1E293B] mb-1">{title}</h3>{" "}
      {description && (
        <p className="text-sm text-[#64748B] max-w-xs leading-relaxed">
          {description}
        </p>
      )}{" "}
      {action && <div className="mt-5">{action}</div>}{" "}
    </div>
  );
}
