import React from "react";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
interface SectionContainerProps {
  title: string;
  description?: string;
  children: React.ReactNode;
  className?: string;
  headerAction?: React.ReactNode;
}
export function SectionContainer({
  title,
  description,
  children,
  className,
  headerAction,
}: SectionContainerProps) {
  return (
    <section
      className={cn(
        "rounded-2xl bg-[#F5F7FA] dark:bg-slate-900/50 p-6 md:p-8",
        className,
      )}
    >
      {" "}
      <div className="mb-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        {" "}
        <div>
          {" "}
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white">
            {title}
          </h2>{" "}
          {description && (
            <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
              {description}
            </p>
          )}{" "}
        </div>{" "}
        {headerAction && <div>{headerAction}</div>}{" "}
      </div>{" "}
      <div>{children}</div>{" "}
    </section>
  );
}
