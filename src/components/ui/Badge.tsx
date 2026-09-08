import { cn } from "../../lib/utils";
type BadgeVariant =
  "blue" | "cyan" | "green" | "amber" | "red" | "slate" | "purple";
interface BadgeProps {
  variant?: BadgeVariant;
  children: React.ReactNode;
  className?: string;
  dot?: boolean;
}
const VARIANTS: Record<BadgeVariant, string> = {
  blue: "badge-blue",
  cyan: "badge-cyan",
  green: "badge-green",
  amber: "badge-amber",
  red: "badge-red",
  slate: "badge-slate",
  purple: "badge-purple",
};
export function Badge({
  variant = "slate",
  children,
  className,
  dot,
}: BadgeProps) {
  return (
    <span className={cn(VARIANTS[variant], className)}>
      {" "}
      {dot && (
        <span className="w-1.5 h-1.5 rounded-full bg-current opacity-70" />
      )}{" "}
      {children}{" "}
    </span>
  );
} /* Convenience wrappers for application status */
export function StatusBadge({ status }: { status: string }) {
  const map: Record<string, { variant: BadgeVariant; label: string }> = {
    applied: { variant: "blue", label: "Applied" },
    screening: { variant: "amber", label: "Screening" },
    interview: { variant: "purple", label: "Interview" },
    selected: { variant: "green", label: "Selected" },
    rejected: { variant: "red", label: "Rejected" },
    active: { variant: "green", label: "Active" },
    closed: { variant: "slate", label: "Closed" },
    draft: { variant: "amber", label: "Draft" },
  };
  const cfg = map[status] ?? {
    variant: "slate" as BadgeVariant,
    label: status,
  };
  return (
    <Badge variant={cfg.variant} dot>
      {cfg.label}
    </Badge>
  );
}
export function RecommendationBadge({ rec }: { rec: string }) {
  const map: Record<string, BadgeVariant> = {
    Interview: "green",
    Consider: "amber",
    Reject: "red",
  };
  return <Badge variant={map[rec] ?? "slate"}>{rec}</Badge>;
}
