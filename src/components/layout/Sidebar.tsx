import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "motion/react";
import {
  LayoutDashboard,
  FileText,
  Briefcase,
  BookOpen,
  BarChart2,
  User,
  Settings,
  LogOut,
  ChevronLeft,
  Users,
  TrendingUp,
  Bell,
  X,
} from "lucide-react";
import { ElevaraLogoMark } from "../ui/ElevaraLogo";
import { cn } from "../../lib/utils";
import { useAuthStore } from "../../store/authStore";
interface SidebarProps {
  collapsed: boolean;
  onCollapse: (v: boolean) => void;
  mobileOpen: boolean;
  onMobileClose: () => void;
}
interface NavItem {
  label: string;
  to: string;
  icon: React.ElementType;
}
const SEEKER_NAV: NavItem[] = [
  { label: "Dashboard", to: "/seeker/dashboard", icon: LayoutDashboard },
  { label: "Resume", to: "/seeker/resume", icon: FileText },
  { label: "Jobs", to: "/seeker/jobs", icon: Briefcase },
  { label: "Applications", to: "/seeker/applications", icon: TrendingUp },
  { label: "Skill Gap", to: "/seeker/skills", icon: BarChart2 },
  { label: "Learning Hub", to: "/seeker/learning", icon: BookOpen },
  { label: "Analytics", to: "/seeker/analytics", icon: BarChart2 },
];
const RECRUITER_NAV: NavItem[] = [
  { label: "Dashboard", to: "/recruiter/dashboard", icon: LayoutDashboard },
  { label: "Job Management", to: "/recruiter/jobs", icon: Briefcase },
  { label: "Candidates", to: "/recruiter/candidates", icon: Users },
  { label: "AI Rankings", to: "/recruiter/rankings", icon: BarChart2 },
  { label: "Applicant Tracking", to: "/recruiter/pipeline", icon: TrendingUp },
  { label: "Analytics", to: "/recruiter/analytics", icon: BarChart2 },
];
const BOTTOM_NAV: NavItem[] = [
  { label: "Profile", to: "profile", icon: User },
  { label: "Settings", to: "settings", icon: Settings },
];
function ElevaraLogo({ collapsed }: { collapsed: boolean }) {
  return (
    <div className="flex items-center gap-2.5 px-4 h-16 border-b border-[#E2E8F0] shrink-0">
      {" "}
      <div className="shrink-0">
        {" "}
        <ElevaraLogoMark size={30} />{" "}
      </div>{" "}
      <AnimatePresence>
        {" "}
        {!collapsed && (
          <motion.span
            initial={{ opacity: 0, width: 0 }}
            animate={{ opacity: 1, width: "auto" }}
            exit={{ opacity: 0, width: 0 }}
            transition={{ duration: 0.2 }}
            className="text-lg font-bold text-[#1E293B] tracking-tight overflow-hidden whitespace-nowrap"
          >
            {" "}
            Elevara{" "}
          </motion.span>
        )}{" "}
      </AnimatePresence>{" "}
    </div>
  );
}
function NavItemLink({
  item,
  collapsed,
}: {
  item: NavItem;
  collapsed: boolean;
  [key: string]: unknown;
}) {
  return (
    <NavLink
      to={item.to}
      className={({ isActive }) =>
        cn(isActive ? "sidebar-link-active" : "sidebar-link", "relative group")
      }
      title={collapsed ? item.label : undefined}
    >
      {" "}
      <item.icon
        className="w-4.5 h-4.5 shrink-0"
        style={{ width: 18, height: 18 }}
      />{" "}
      <AnimatePresence>
        {" "}
        {!collapsed && (
          <motion.span
            initial={{ opacity: 0, width: 0 }}
            animate={{ opacity: 1, width: "auto" }}
            exit={{ opacity: 0, width: 0 }}
            transition={{ duration: 0.18 }}
            className="overflow-hidden whitespace-nowrap text-sm"
          >
            {" "}
            {item.label}{" "}
          </motion.span>
        )}{" "}
      </AnimatePresence>{" "}
      {/* Tooltip when collapsed */}{" "}
      {collapsed && (
        <div className="absolute left-full ml-2 px-2.5 py-1.5 bg-[#1E293B] text-white text-xs rounded-lg                        opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity whitespace-nowrap z-50">
          {" "}
          {item.label}{" "}
        </div>
      )}{" "}
    </NavLink>
  );
}
function SidebarContent({
  collapsed,
  onCollapse,
}: {
  collapsed: boolean;
  onCollapse: (v: boolean) => void;
}) {
  const { user, logout } = useAuthStore();
  const navigate = useNavigate();
  const nav = user?.role === "recruiter" ? RECRUITER_NAV : SEEKER_NAV;
  const basePath = user?.role === "recruiter" ? "/recruiter" : "/seeker";
  const handleLogout = () => {
    logout();
    navigate("/login");
  };
  return (
    <div className="flex flex-col h-full bg-white border-r border-[#E2E8F0]">
      {" "}
      <ElevaraLogo collapsed={collapsed} /> {/* Main nav */}{" "}
      <nav className="flex-1 overflow-y-auto px-3 py-4 space-y-0.5">
        {" "}
        {nav.map((item) => (
          <NavItemLink key={item.to} item={item} collapsed={collapsed} />
        ))}{" "}
      </nav>{" "}
      {/* Bottom nav */}{" "}
      <div className="px-3 py-3 border-t border-[#E2E8F0] space-y-0.5">
        {" "}
        {BOTTOM_NAV.map((item) => (
          <NavItemLink
            key={item.to}
            item={{ ...item, to: `${basePath}/${item.to}` }}
            collapsed={collapsed}
          />
        ))}{" "}
        <button
          onClick={handleLogout}
          className={cn(
            "sidebar-link w-full text-left text-[#EF4444] hover:bg-red-50 hover:text-[#DC2626]",
          )}
          title={collapsed ? "Sign out" : undefined}
        >
          {" "}
          <LogOut style={{ width: 18, height: 18 }} className="shrink-0" />{" "}
          <AnimatePresence>
            {" "}
            {!collapsed && (
              <motion.span
                initial={{ opacity: 0, width: 0 }}
                animate={{ opacity: 1, width: "auto" }}
                exit={{ opacity: 0, width: 0 }}
                transition={{ duration: 0.18 }}
                className="overflow-hidden whitespace-nowrap text-sm"
              >
                {" "}
                Sign out{" "}
              </motion.span>
            )}{" "}
          </AnimatePresence>{" "}
        </button>{" "}
      </div>{" "}
      {/* Collapse toggle */}{" "}
      <button
        onClick={() => onCollapse(!collapsed)}
        className="hidden lg:flex items-center justify-center h-10 border-t border-[#E2E8F0]                   text-[#94A3B8] hover:text-[#0d1b2a] hover:bg-[#F5F7FA] transition-colors"
        aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"}
      >
        {" "}
        <motion.div
          animate={{ rotate: collapsed ? 180 : 0 }}
          transition={{ duration: 0.2 }}
        >
          {" "}
          <ChevronLeft className="w-4 h-4" />{" "}
        </motion.div>{" "}
      </button>{" "}
    </div>
  );
}
export function Sidebar({
  collapsed,
  onCollapse,
  mobileOpen,
  onMobileClose,
}: SidebarProps) {
  const sidebarWidth = collapsed ? 64 : 240;
  return (
    <>
      {" "}
      {/* Desktop sidebar */}{" "}
      <motion.aside
        animate={{ width: sidebarWidth }}
        transition={{ duration: 0.2, ease: "easeInOut" }}
        className="hidden lg:flex flex-col h-screen sticky top-0 shrink-0 overflow-hidden"
        style={{ width: sidebarWidth }}
      >
        {" "}
        <SidebarContent collapsed={collapsed} onCollapse={onCollapse} />{" "}
      </motion.aside>{" "}
      {/* Mobile overlay */}{" "}
      <AnimatePresence>
        {" "}
        {mobileOpen && (
          <>
            {" "}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/40 z-40 lg:hidden"
              onClick={onMobileClose}
            />{" "}
            <motion.aside
              initial={{ x: -240 }}
              animate={{ x: 0 }}
              exit={{ x: -240 }}
              transition={{ duration: 0.25, ease: "easeOut" }}
              className="fixed left-0 top-0 h-full w-60 z-50 lg:hidden"
            >
              {" "}
              <SidebarContent collapsed={false} onCollapse={() => {}} />{" "}
              <button
                onClick={onMobileClose}
                className="absolute top-4 right-4 p-1.5 text-[#64748B] hover:text-[#1E293B]"
                aria-label="Close menu"
              >
                {" "}
                <X className="w-5 h-5" />{" "}
              </button>{" "}
            </motion.aside>{" "}
          </>
        )}{" "}
      </AnimatePresence>{" "}
    </>
  );
}
