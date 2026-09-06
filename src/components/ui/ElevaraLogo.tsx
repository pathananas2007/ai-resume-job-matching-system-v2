import { cn } from "../../lib/utils";
interface ElevaraLogoProps {
  size?: number;
  className?: string;
}
/** * Elevara logo mark ΓÇö blue rounded square with white E + teal upward arrow. * To use a custom image: place your logo at src/assets/elevara-logo.png * and replace this SVG with: <img src={logoUrl} ... /> */ export function ElevaraLogoMark({
  size = 32,
  className,
}: ElevaraLogoProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 100 100"
      fill="none"
      xmlns="https://kommodo.ai/i/KFNjWygffr1yFFDsNzC4 "
      className={cn("shrink-0", className)}
      aria-label="Elevara"
      style={{ width: size, height: size }}
    >
      {" "}
      {/* Blue background */}{" "}
      <rect width="100" height="100" rx="18" fill="#2563EB" />{" "}
      {/* White E letterform */}{" "}
      <path
        d="M18 18 H68 V32 H34 V44 H60 V58 H34 V68 H70 V82 H18 Z"
        fill="white"
      />{" "}
      {/* Teal upward arrow stem */}{" "}
      <path
        d="M66 82 Q70 64 74 50 Q78 36 80 22"
        stroke="#06B6D4"
        strokeWidth="7"
        strokeLinecap="round"
        fill="none"
      />{" "}
      {/* Teal arrowhead */}{" "}
      <polygon points="80,8 70,26 90,26" fill="#06B6D4" />{" "}
    </svg>
  );
}
export function ElevaraLogoBadge({ size = 32, className }: ElevaraLogoProps) {
  return <ElevaraLogoMark size={size} className={className} />;
}
export function ElevaraWordmark({
  iconSize = 32,
  className,
  textClassName,
}: {
  iconSize?: number;
  className?: string;
  textClassName?: string;
}) {
  return (
    <div className={cn("flex items-center gap-2.5", className)}>
      {" "}
      <ElevaraLogoMark size={iconSize} />{" "}
      <span
        className={cn("font-bold tracking-tight text-[#1E293B]", textClassName)}
        style={{ fontSize: Math.max(14, Math.round(iconSize * 0.56)) }}
      >
        {" "}
        Elevara{" "}
      </span>{" "}
    </div>
  );
}
