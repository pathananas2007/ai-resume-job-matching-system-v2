import React, { useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { useNotificationStore } from "./useNotificationStore";
import { NotificationCard } from "./components/NotificationCard";
import { NotificationFilters } from "./components/NotificationFilters";
import { NotificationSidebar } from "./components/NotificationSidebar";
import { Bell, Check, RefreshCw, Settings, Inbox, Search } from "lucide-react";
import { isToday, isYesterday } from "date-fns";
import { Link } from "react-router-dom";
export default function NotificationsPage() {
  const {
    notifications,
    filter,
    isLoading,
    error,
    fetchNotifications,
    markAllAsRead,
    initializeRealTime,
    searchQuery,
    setSearchQuery,
  } = useNotificationStore();
  useEffect(() => {
    fetchNotifications();
    const unsubscribe = initializeRealTime();
    return () => unsubscribe();
  }, [fetchNotifications, initializeRealTime]);
  const unreadCount = notifications.filter((n) => !n.isRead).length;
  const today = notifications.filter((n) => isToday(new Date(n.createdAt)));
  const yesterday = notifications.filter((n) =>
    isYesterday(new Date(n.createdAt)),
  );
  const earlier = notifications.filter(
    (n) =>
      !isToday(new Date(n.createdAt)) && !isYesterday(new Date(n.createdAt)),
  );
  const getEmptyStateMessage = () => {
    switch (filter) {
      case "job":
        return "No Job Notifications Yet";
      case "learning":
        return "No Learning Notifications Yet";
      case "application":
        return "No Application Updates Yet";
      case "resume":
        return "No Resume Analysis Updates Yet";
      case "unread":
        return "You're all caught up!";
      default:
        return "No notifications yet";
    }
  };
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {" "}
      {/* Header */}{" "}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
        {" "}
        <div className="flex items-center gap-3">
          {" "}
          <div className="p-2.5 bg-blue-100 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400 rounded-xl relative">
            {" "}
            <Bell className="w-6 h-6" />{" "}
            {unreadCount > 0 && (
              <span className="absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-blue-600 text-[10px] font-bold text-white border-2 border-white dark:border-slate-900">
                {" "}
                {unreadCount > 9 ? "9+" : unreadCount}{" "}
              </span>
            )}{" "}
          </div>{" "}
          <div>
            {" "}
            <h1 className="text-2xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
              {" "}
              Notifications{" "}
              {unreadCount > 0 && (
                <span className="bg-blue-600 text-white text-xs px-2 py-0.5 rounded-full font-medium">
                  {" "}
                  {unreadCount} new{" "}
                </span>
              )}{" "}
            </h1>{" "}
            <p className="text-sm text-slate-500 dark:text-slate-400">
              {" "}
              Stay updated with your career progress{" "}
            </p>{" "}
          </div>{" "}
        </div>{" "}
        <div className="flex items-center gap-2">
          {" "}
          <button
            onClick={() => fetchNotifications()}
            className="p-2 text-slate-500 hover:text-slate-700 hover:bg-slate-100 dark:text-slate-400 dark:hover:text-slate-300 dark:hover:bg-slate-800 rounded-lg transition-colors"
            title="Refresh"
          >
            {" "}
            <RefreshCw
              className={`w-5 h-5 ${isLoading ? "animate-spin" : ""}`}
            />{" "}
          </button>{" "}
          <button
            onClick={markAllAsRead}
            disabled={unreadCount === 0}
            className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-slate-700 bg-white border border-slate-300 rounded-lg hover:bg-slate-50 dark:bg-slate-800 dark:border-slate-700 dark:text-slate-300 dark:hover:bg-slate-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {" "}
            <Check className="w-4 h-4" /> Mark all read{" "}
          </button>{" "}
          <Link
            to="/seeker/notifications/settings"
            className="p-2 text-slate-500 hover:text-slate-700 hover:bg-slate-100 dark:text-slate-400 dark:hover:text-slate-300 dark:hover:bg-slate-800 rounded-lg transition-colors"
            title="Settings"
          >
            {" "}
            <Settings className="w-5 h-5" />{" "}
          </Link>{" "}
        </div>{" "}
      </div>{" "}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {" "}
        <div className="lg:col-span-3 space-y-6">
          {" "}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            {" "}
            <NotificationFilters />{" "}
            <div className="relative w-full sm:w-64">
              {" "}
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />{" "}
              <input
                type="text"
                placeholder="Search notifications..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-9 pr-4 py-2 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all dark:text-white"
              />{" "}
            </div>{" "}
          </div>{" "}
          <div className="space-y-4">
            {" "}
            {error && !isLoading ? (
              <div className="flex flex-col items-center justify-center py-16 px-4 bg-red-50 dark:bg-red-900/10 border border-red-200 dark:border-red-900/50 rounded-xl">
                {" "}
                <div className="w-16 h-16 bg-red-100 dark:bg-red-900/30 rounded-full flex items-center justify-center mb-4">
                  {" "}
                  <RefreshCw className="w-8 h-8 text-red-500" />{" "}
                </div>{" "}
                <h3 className="text-lg font-semibold text-red-700 dark:text-red-400 mb-2">
                  {" "}
                  Error Loading Notifications{" "}
                </h3>{" "}
                <p className="text-red-600 dark:text-red-500 text-center max-w-sm mb-6">
                  {" "}
                  {error}{" "}
                </p>{" "}
                <button
                  onClick={() => fetchNotifications()}
                  className="px-6 py-2 bg-red-600 hover:bg-red-700 text-white font-medium rounded-lg transition-colors"
                >
                  {" "}
                  Try Again{" "}
                </button>{" "}
              </div>
            ) : isLoading && notifications.length === 0 ? (
              <div className="flex justify-center py-12">
                {" "}
                <RefreshCw className="w-8 h-8 text-slate-300 animate-spin" />{" "}
              </div>
            ) : notifications.length > 0 ? (
              <div className="space-y-8">
                {" "}
                {today.length > 0 && (
                  <div className="space-y-4">
                    {" "}
                    <h3 className="text-sm font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider ml-1">
                      Today
                    </h3>{" "}
                    <AnimatePresence mode="popLayout">
                      {" "}
                      {today.map((notification) => (
                        <NotificationCard
                          key={notification.id}
                          notification={notification}
                        />
                      ))}{" "}
                    </AnimatePresence>{" "}
                  </div>
                )}{" "}
                {yesterday.length > 0 && (
                  <div className="space-y-4">
                    {" "}
                    <h3 className="text-sm font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider ml-1">
                      Yesterday
                    </h3>{" "}
                    <AnimatePresence mode="popLayout">
                      {" "}
                      {yesterday.map((notification) => (
                        <NotificationCard
                          key={notification.id}
                          notification={notification}
                        />
                      ))}{" "}
                    </AnimatePresence>{" "}
                  </div>
                )}{" "}
                {earlier.length > 0 && (
                  <div className="space-y-4">
                    {" "}
                    <h3 className="text-sm font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider ml-1">
                      Earlier
                    </h3>{" "}
                    <AnimatePresence mode="popLayout">
                      {" "}
                      {earlier.map((notification) => (
                        <NotificationCard
                          key={notification.id}
                          notification={notification}
                        />
                      ))}{" "}
                    </AnimatePresence>{" "}
                  </div>
                )}{" "}
              </div>
            ) : (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="flex flex-col items-center justify-center py-16 px-4 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl"
              >
                {" "}
                <div className="w-16 h-16 bg-slate-100 dark:bg-slate-800 rounded-full flex items-center justify-center mb-4">
                  {" "}
                  <Inbox className="w-8 h-8 text-slate-400" />{" "}
                </div>{" "}
                <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-2">
                  {" "}
                  {getEmptyStateMessage()}{" "}
                </h3>{" "}
                <p className="text-slate-500 dark:text-slate-400 text-center max-w-sm">
                  {" "}
                  We'll notify you when something important happens.{" "}
                </p>{" "}
              </motion.div>
            )}{" "}
          </div>{" "}
        </div>{" "}
        <div className="lg:col-span-1">
          {" "}
          <div className="sticky top-24">
            {" "}
            <NotificationSidebar />{" "}
          </div>{" "}
        </div>{" "}
      </div>{" "}
    </div>
  );
}
