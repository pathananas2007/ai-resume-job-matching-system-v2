import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Menu, Bell, Search, ChevronDown, User, Settings } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { useAuthStore } from "../../store/authStore";
import { useNotificationStore } from "../../features/notifications/useNotificationStore";
import { formatDistanceToNow } from "date-fns";
import { cn } from "../../lib/utils";
import { useEffect } from "react";
interface TopbarProps {
  onMobileMenuOpen: () => void;
}
export function Topbar({ onMobileMenuOpen }: TopbarProps) {
  const { user, logout } = useAuthStore();
  const {
    notifications,
    fetchNotifications,
    markAllAsRead,
    initializeRealTime,
    markAsRead,
  } = useNotificationStore();
  const navigate = useNavigate();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [notifOpen, setNotifOpen] = useState(false);
  useEffect(() => {
    fetchNotifications();
    const unsubscribe = initializeRealTime();
    return () => unsubscribe();
  }, [fetchNotifications, initializeRealTime]);
  const unreadCount = notifications.filter((n) => !n.isRead).length;
  const handleLogout = () => {
    logout();
    navigate("/login");
  };
  const basePath = user?.role === "recruiter" ? "/recruiter" : "/seeker";
  return (
    <header className="h-16 bg-white border-b border-[#E2E8F0] flex items-center px-4 md:px-6 gap-4 shrink-0 sticky top-0 z-30">
      {" "}
      {/* Mobile menu button */}{" "}
      <button
        onClick={onMobileMenuOpen}
        className="lg:hidden p-2 text-[#64748B] hover:text-[#1E293B] hover:bg-[#F5F7FA] rounded-lg transition-colors"
        aria-label="Open menu"
      >
        {" "}
        <Menu className="w-5 h-5" />{" "}
      </button>{" "}
      {/* Search bar */}{" "}
      <div className="flex-1 max-w-md hidden md:flex items-center gap-2 h-9 px-3 bg-[#F5F7FA] border border-[#E2E8F0] rounded-lg text-sm text-[#94A3B8]">
        {" "}
        <Search className="w-4 h-4 shrink-0" />{" "}
        <span>Search jobs, candidates...</span>{" "}
      </div>{" "}
      <div className="flex-1 lg:flex-none" /> {/* Notifications */}{" "}
      <div className="relative">
        {" "}
        <button
          onClick={() => {
            setNotifOpen((v) => !v);
            setDropdownOpen(false);
          }}
          className="relative p-2 text-[#64748B] hover:text-[#1E293B] hover:bg-[#F5F7FA] rounded-lg transition-colors"
          aria-label="Notifications"
        >
          {" "}
          <Bell className="w-5 h-5" /> {/* Unread dot */}{" "}
          {unreadCount > 0 && (
            <span className="absolute top-1.5 right-1.5 flex h-4 w-4 items-center justify-center rounded-full bg-blue-600 text-[10px] font-bold text-white border-2 border-white">
              {" "}
              {unreadCount > 9 ? "9+" : unreadCount}{" "}
            </span>
          )}{" "}
        </button>{" "}
        <AnimatePresence>
          {" "}
          {notifOpen && (
            <motion.div
              initial={{ opacity: 0, y: 8, scale: 0.97 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 8, scale: 0.97 }}
              transition={{ duration: 0.15 }}
              className="absolute right-0 top-full mt-2 w-80 card shadow-xl z-50 overflow-hidden"
            >
              {" "}
              <div className="px-4 py-3 border-b border-[#E2E8F0] flex items-center justify-between">
                {" "}
                <span className="text-sm font-semibold text-[#1E293B]">
                  Notifications
                </span>{" "}
                <div className="flex items-center gap-3">
                  {" "}
                  {unreadCount > 0 && (
                    <button
                      onClick={markAllAsRead}
                      className="text-xs text-[#2563EB] hover:underline"
                    >
                      Mark all read
                    </button>
                  )}{" "}
                  <button
                    onClick={() => {
                      navigate(`${basePath}/notifications/settings`);
                      setNotifOpen(false);
                    }}
                    className="text-[#64748B] hover:text-[#1E293B] transition-colors"
                    title="Notification Settings"
                  >
                    {" "}
                    <Settings className="w-4 h-4" />{" "}
                  </button>{" "}
                </div>{" "}
              </div>{" "}
              <div className="divide-y divide-[#F1F5F9] max-h-80 overflow-y-auto">
                {" "}
                {notifications.length === 0 ? (
                  <div className="px-4 py-6 text-center text-sm text-[#64748B]">
                    No notifications yet.
                  </div>
                ) : (
                  notifications.slice(0, 5).map((n) => (
                    <div
                      key={n.id}
                      onClick={() => {
                        if (!n.isRead) markAsRead(n.id);
                        if (n.actionUrl) {
                          navigate(n.actionUrl);
                          setNotifOpen(false);
                        }
                      }}
                      className={cn(
                        "px-4 py-3 hover:bg-[#F8FAFC] cursor-pointer transition-colors",
                        !n.isRead && "bg-[#EFF6FF]/40",
                      )}
                    >
                      {" "}
                      <div className="flex items-start gap-2.5">
                        {" "}
                        {!n.isRead ? (
                          <span className="w-2 h-2 rounded-full bg-[#2563EB] mt-1.5 shrink-0" />
                        ) : (
                          <span className="w-2 h-2 mt-1.5 shrink-0" />
                        )}{" "}
                        <div className="flex-1 min-w-0">
                          {" "}
                          <p className="text-sm font-medium text-[#1E293B] leading-snug">
                            {n.title}
                          </p>{" "}
                          <p className="text-xs text-[#64748B] mt-0.5 leading-snug truncate">
                            {n.message}
                          </p>{" "}
                          <p className="text-xs text-[#94A3B8] mt-1">
                            {" "}
                            {formatDistanceToNow(new Date(n.createdAt), {
                              addSuffix: true,
                            })}{" "}
                          </p>{" "}
                        </div>{" "}
                      </div>{" "}
                    </div>
                  ))
                )}{" "}
              </div>{" "}
              <div className="px-4 py-2.5 border-t border-[#E2E8F0] text-center">
                {" "}
                <button
                  onClick={() => {
                    navigate(`${basePath}/notifications`);
                    setNotifOpen(false);
                  }}
                  className="text-xs text-[#2563EB] hover:underline font-medium"
                >
                  {" "}
                  View all notifications{" "}
                </button>{" "}
              </div>{" "}
            </motion.div>
          )}{" "}
        </AnimatePresence>{" "}
      </div>{" "}
      {/* User menu */}{" "}
      <div className="relative">
        {" "}
        <button
          onClick={() => {
            setDropdownOpen((v) => !v);
            setNotifOpen(false);
          }}
          className="flex items-center gap-2.5 pl-2 pr-3 py-1.5 rounded-lg hover:bg-[#F5F7FA] transition-colors"
        >
          {" "}
          {user?.avatar_url ? (
            <img
              src={user.avatar_url}
              alt=""
              className="w-8 h-8 rounded-full object-cover"
              referrerPolicy="no-referrer"
            />
          ) : (
            <div className="w-8 h-8 rounded-full bg-[#EFF6FF] border border-[#BFDBFE] flex items-center justify-center">
              {" "}
              <User className="w-4 h-4 text-[#2563EB]" />{" "}
            </div>
          )}{" "}
          <div className="hidden sm:block text-left">
            {" "}
            <p className="text-sm font-medium text-[#1E293B] leading-tight">
              {user?.full_name || "User"}
            </p>{" "}
            <p className="text-xs text-[#64748B] capitalize">
              {user?.role}
            </p>{" "}
          </div>{" "}
          <ChevronDown
            className={cn(
              "w-4 h-4 text-[#94A3B8] transition-transform",
              dropdownOpen && "rotate-180",
            )}
          />{" "}
        </button>{" "}
        <AnimatePresence>
          {" "}
          {dropdownOpen && (
            <motion.div
              initial={{ opacity: 0, y: 8, scale: 0.97 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 8, scale: 0.97 }}
              transition={{ duration: 0.15 }}
              className="absolute right-0 top-full mt-2 w-52 card shadow-xl z-50 py-1 overflow-hidden"
            >
              {" "}
              <div className="px-4 py-3 border-b border-[#F1F5F9]">
                {" "}
                <p className="text-sm font-semibold text-[#1E293B]">
                  {user?.full_name}
                </p>{" "}
                <p className="text-xs text-[#64748B] truncate">
                  {user?.email}
                </p>{" "}
              </div>{" "}
              {[
                { label: "My Profile", path: `${basePath}/profile` },
                { label: "Settings", path: `${basePath}/settings` },
              ].map((item) => (
                <button
                  key={item.path}
                  onClick={() => {
                    navigate(item.path);
                    setDropdownOpen(false);
                  }}
                  className="w-full text-left px-4 py-2.5 text-sm text-[#475569] hover:bg-[#F5F7FA] hover:text-[#1E293B] transition-colors"
                >
                  {" "}
                  {item.label}{" "}
                </button>
              ))}{" "}
              <div className="border-t border-[#F1F5F9] mt-1">
                {" "}
                <button
                  onClick={handleLogout}
                  className="w-full text-left px-4 py-2.5 text-sm text-[#EF4444] hover:bg-red-50 transition-colors"
                >
                  {" "}
                  Sign out{" "}
                </button>{" "}
              </div>{" "}
            </motion.div>
          )}{" "}
        </AnimatePresence>{" "}
      </div>{" "}
      {/* Click outside to close */}{" "}
      {(dropdownOpen || notifOpen) && (
        <div
          className="fixed inset-0 z-40"
          onClick={() => {
            setDropdownOpen(false);
            setNotifOpen(false);
          }}
        />
      )}{" "}
    </header>
  );
}
