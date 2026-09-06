import React from "react";
import { Link } from "react-router-dom";
import { motion } from "motion/react";
import {
  FileText,
  Briefcase,
  BookOpen,
  Target,
  Shield,
  Circle,
  ArrowRight,
} from "lucide-react";
import { AppNotification } from "../types";
import { useNotificationStore } from "../useNotificationStore";
import { formatDistanceToNow } from "date-fns";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
const typeIcons = {
  resume: <FileText className="h-5 w-5" />,
  application: <Briefcase className="h-5 w-5" />,
  learning: <BookOpen className="h-5 w-5" />,
  job: <Target className="h-5 w-5" />,
  system: <Shield className="h-5 w-5" />,
};
const priorityStyles = {
  low: "bg-slate-50 text-slate-600 dark:bg-slate-800 dark:text-slate-400",
  medium: "bg-blue-50 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400",
  high: "bg-amber-50 text-amber-600 dark:bg-amber-900/30 dark:text-amber-400",
};
const priorityBadgeStyles = {
  low: "bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-400",
  medium: "bg-blue-100 text-blue-700 dark:bg-blue-900/50 dark:text-blue-300",
  high: "bg-amber-100 text-amber-700 dark:bg-amber-900/50 dark:text-amber-300",
};
export function NotificationCard({
  notification,
}: {
  notification: AppNotification;
}) {
  const markAsRead = useNotificationStore((state) => state.markAsRead);
  const handleClick = () => {
    if (!notification.isRead) {
      markAsRead(notification.id);
    }
  };
  return (
    <motion.div
      whileHover={{ y: -2 }}
      className={cn(
        "group relative flex flex-col sm:flex-row sm:items-start gap-4 rounded-xl p-5 transition-all border",
        notification.isRead
          ? "bg-white border-slate-200 dark:bg-slate-900 dark:border-slate-800"
          : "bg-blue-50/50 border-blue-200 shadow-sm dark:bg-blue-900/10 dark:border-blue-900/50",
      )}
      onClick={handleClick}
    >
      {" "}
      {!notification.isRead && (
        <>
          {" "}
          <div className="absolute top-0 bottom-0 left-0 w-1 bg-blue-600 dark:bg-blue-500 rounded-l-xl" />{" "}
          <div className="absolute top-5 right-5 h-2.5 w-2.5 rounded-full bg-blue-600 dark:bg-blue-500 shadow-sm shadow-blue-200 dark:shadow-blue-900/50" />{" "}
        </>
      )}{" "}
      <div
        className={cn(
          "flex h-10 w-10 shrink-0 items-center justify-center rounded-full mt-0.5",
          priorityStyles[notification.priority],
        )}
      >
        {" "}
        {typeIcons[notification.type]}{" "}
      </div>{" "}
      <div className="flex-1 min-w-0 pr-6 sm:pr-8">
        {" "}
        <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-3 mb-1">
          {" "}
          <h3
            className={cn(
              "text-base font-semibold truncate",
              notification.isRead
                ? "text-slate-900 dark:text-slate-200"
                : "text-slate-900 dark:text-white",
            )}
          >
            {" "}
            {notification.title}{" "}
          </h3>{" "}
          <div className="flex items-center gap-2">
            {" "}
            <span
              className={cn(
                "text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wide",
                priorityBadgeStyles[notification.priority],
              )}
            >
              {" "}
              {notification.priority}{" "}
            </span>{" "}
            <span className="text-xs font-medium text-slate-500 dark:text-slate-400 whitespace-nowrap">
              {" "}
              {formatDistanceToNow(new Date(notification.createdAt), {
                addSuffix: true,
              })}{" "}
            </span>{" "}
          </div>{" "}
        </div>{" "}
        <p
          className={cn(
            "text-sm mb-4 leading-relaxed",
            notification.isRead
              ? "text-slate-600 dark:text-slate-400"
              : "text-slate-700 dark:text-slate-300",
          )}
        >
          {" "}
          {notification.message}{" "}
        </p>{" "}
        {notification.actionUrl && notification.actionLabel && (
          <Link
            to={notification.actionUrl}
            className="inline-flex items-center text-sm font-semibold text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300 transition-colors"
          >
            {" "}
            {notification.actionLabel}{" "}
            <ArrowRight className="ml-1.5 h-4 w-4" />{" "}
          </Link>
        )}{" "}
      </div>{" "}
    </motion.div>
  );
}
