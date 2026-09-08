import { cn } from "../../lib/utils";
interface SkeletonBlockProps {
  className?: string;
}
function SkeletonBlock({ className }: SkeletonBlockProps) {
  return <div className={cn("skeleton rounded-none", className)} />;
} /* ΓöÇΓöÇ SkeletonJobCard ΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇ */
export function SkeletonJobCard() {
  return (
    <div className="modern-card p-8 bg-white">
      {" "}
      {/* Top row: icon area + delete button area */}{" "}
      <div className="flex items-start justify-between mb-6">
        {" "}
        <SkeletonBlock className="w-10 h-10" />{" "}
        <SkeletonBlock className="w-8 h-8" />{" "}
      </div>{" "}
      {/* Title */} <SkeletonBlock className="h-6 w-3/4 mb-3" />{" "}
      {/* Subtitle */} <SkeletonBlock className="h-3 w-1/2 mb-6" />{" "}
      {/* Body lines */}{" "}
      <div className="space-y-2 mb-6">
        {" "}
        <SkeletonBlock className="h-3 w-full" />{" "}
        <SkeletonBlock className="h-3 w-5/6" />{" "}
        <SkeletonBlock className="h-3 w-4/6" />{" "}
      </div>{" "}
      {/* Bottom buttons */}{" "}
      <div className="flex gap-3">
        {" "}
        <SkeletonBlock className="h-10 flex-1" />{" "}
        <SkeletonBlock className="h-10 flex-1" />{" "}
      </div>{" "}
    </div>
  );
} /* ΓöÇΓöÇ SkeletonAnalysisRow ΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇ */
export function SkeletonAnalysisRow() {
  return (
    <div className="modern-card p-6 flex items-center gap-6">
      {" "}
      {/* Left square */} <SkeletonBlock className="w-16 h-16 shrink-0" />{" "}
      {/* Right text lines */}{" "}
      <div className="flex flex-col gap-2 flex-1">
        {" "}
        <SkeletonBlock className="h-4 w-48" />{" "}
        <SkeletonBlock className="h-3 w-32" />{" "}
      </div>{" "}
    </div>
  );
}
