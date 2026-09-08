import { cn } from "../../lib/utils";
interface SkeletonProps {
  className?: string;
  [key: string]: unknown;
}
export function Skeleton({ className }: SkeletonProps) {
  return <div className={cn("skeleton", className)} aria-hidden="true" />;
}
export function SkeletonCard() {
  return (
    <div className="card p-6 space-y-4">
      {" "}
      <div className="flex items-center gap-3">
        {" "}
        <Skeleton className="w-10 h-10 rounded-lg" />{" "}
        <div className="flex-1 space-y-2">
          {" "}
          <Skeleton className="h-4 w-3/4" />{" "}
          <Skeleton className="h-3 w-1/2" />{" "}
        </div>{" "}
      </div>{" "}
      <Skeleton className="h-3 w-full" /> <Skeleton className="h-3 w-5/6" />{" "}
      <Skeleton className="h-3 w-4/6" />{" "}
    </div>
  );
}
export function SkeletonStatCard() {
  return (
    <div className="card p-6 space-y-3">
      {" "}
      <Skeleton className="h-3 w-24" /> <Skeleton className="h-8 w-16" />{" "}
      <Skeleton className="h-3 w-32" />{" "}
    </div>
  );
}
export function SkeletonTableRow() {
  return (
    <div className="flex items-center gap-4 px-4 py-3 border-b border-[#F1F5F9]">
      {" "}
      <Skeleton className="w-8 h-8 rounded-full shrink-0" />{" "}
      <Skeleton className="h-4 flex-1" /> <Skeleton className="h-4 w-24" />{" "}
      <Skeleton className="h-6 w-16 rounded-full" />{" "}
    </div>
  );
}
