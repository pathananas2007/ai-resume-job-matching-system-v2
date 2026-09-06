import React from "react";
import { useNotificationStore } from "../useNotificationStore";
import { Bell, CheckCircle2, AlertCircle, Calendar } from "lucide-react";
import { isToday, isThisWeek, isThisMonth } from "date-fns";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
export function NotificationSidebar() {
  const notifications = useNotificationStore((state) => state.notifications);
  const stats = React.useMemo(() => {
    const now = new Date();
    let unread = 0;
    let read = 0;
    let important = 0;
    let today = 0;
    let thisWeek = 0;
    let thisMonth = 0;
    notifications.forEach((n) => {
      const date = new Date(n.createdAt);
      if (!n.isRead) unread++;
      if (n.isRead) read++;
      if (n.priority === "high") important++;
      if (isToday(date)) today++;
      if (isThisWeek(date)) thisWeek++;
      if (isThisMonth(date)) thisMonth++;
    });
    return { unread, read, important, today, thisWeek, thisMonth };
  }, [notifications]);
  return (
    <div className="space-y-6">
      {" "}
      <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 p-5 shadow-sm">
        {" "}
        <h3 className="text-sm font-semibold text-slate-900 dark:text-white mb-4 uppercase tracking-wider">
          {" "}
          Summary{" "}
        </h3>{" "}
        <div className="space-y-3">
          {" "}
          <StatRow
            icon={<Bell className="w-4 h-4 text-blue-500" />}
            label="Unread"
            count={stats.unread}
          />{" "}
          <StatRow
            icon={<CheckCircle2 className="w-4 h-4 text-emerald-500" />}
            label="Read"
            count={stats.read}
          />{" "}
          <StatRow
            icon={<AlertCircle className="w-4 h-4 text-amber-500" />}
            label="Important"
            count={stats.important}
          />{" "}
        </div>{" "}
      </div>{" "}
      <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 p-5 shadow-sm">
        {" "}
        <h3 className="text-sm font-semibold text-slate-900 dark:text-white mb-4 uppercase tracking-wider">
          {" "}
          Timeline{" "}
        </h3>{" "}
        <div className="space-y-3">
          {" "}
          <StatRow
            icon={<Calendar className="w-4 h-4 text-slate-400" />}
            label="Today"
            count={stats.today}
          />{" "}
          <StatRow
            icon={<Calendar className="w-4 h-4 text-slate-400" />}
            label="This Week"
            count={stats.thisWeek}
          />{" "}
          <StatRow
            icon={<Calendar className="w-4 h-4 text-slate-400" />}
            label="This Month"
            count={stats.thisMonth}
          />{" "}
        </div>{" "}
      </div>{" "}
    </div>
  );
}
function StatRow({
  icon,
  label,
  count,
}: {
  icon: React.ReactNode;
  label: string;
  count: number;
}) {
  return (
    <div className="flex items-center justify-between text-sm">
      {" "}
      <div className="flex items-center gap-2.5 text-slate-600 dark:text-slate-400">
        {" "}
        {icon} <span>{label}</span>{" "}
      </div>{" "}
      <span
        className={cn(
          "font-medium",
          count > 0
            ? "text-slate-900 dark:text-white"
            : "text-slate-400 dark:text-slate-500",
        )}
      >
        {" "}
        {count}{" "}
      </span>{" "}
    </div>
  );
}
