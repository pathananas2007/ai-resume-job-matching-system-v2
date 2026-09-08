/** * @license * SPDX-License-Identifier: Apache-2.0 */ import { User } from "firebase/auth";
import { UserProfile } from "../../types/index";
import { motion } from "motion/react";
import { LogOut, User as UserIcon } from "lucide-react";
interface NavbarProps {
  user: User;
  profile: UserProfile;
  onLogout: () => void;
}
export function Navbar({ user, profile, onLogout }: NavbarProps) {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white/90 backdrop-blur-md border-b border-slate-100 h-16 shadow-sm">
      {" "}
      <div className="max-w-7xl mx-auto h-full px-6 flex items-center justify-between">
        {" "}
        <div className="flex items-center gap-8">
          {" "}
          <motion.div
            initial={{ opacity: 0, x: -16 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="flex items-center gap-2.5"
          >
            {" "}
            <motion.div
              whileHover={{ scale: 1.12, rotate: 6 }}
              transition={{ type: "spring", stiffness: 300 }}
              className="bg-indigo-600 w-7 h-7 flex items-center justify-center"
            >
              {" "}
              <div className="w-3.5 h-3.5 bg-white" />{" "}
            </motion.div>{" "}
            <span className="text-base font-black tracking-tighter text-slate-900 uppercase">
              {" "}
              FITSCORE<span className="text-indigo-600">/AI</span>{" "}
            </span>{" "}
          </motion.div>{" "}
          <div className="hidden md:flex items-center gap-1.5 bg-slate-50 border border-slate-100 px-3 py-1.5">
            {" "}
            <span
              className={`w-1.5 h-1.5 rounded-full ${profile.role === "recruiter" ? "bg-brand-red" : "bg-indigo-500"}`}
            />{" "}
            <span className="text-[9px] font-black uppercase tracking-[0.25em] text-slate-500">
              {" "}
              {profile.role === "recruiter" ? "Recruiter" : "Job Seeker"}{" "}
            </span>{" "}
          </div>{" "}
        </div>{" "}
        <div className="flex items-center gap-4">
          {" "}
          <motion.div
            initial={{ opacity: 0, x: 16 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="flex items-center gap-3"
          >
            {" "}
            <div className="text-right hidden sm:block">
              {" "}
              <p className="text-sm font-bold text-slate-900 leading-tight">
                {user.displayName || profile.displayName || "User"}
              </p>{" "}
              <p className="text-[9px] font-bold text-slate-400 uppercase tracking-[0.2em]">
                {user.email}
              </p>{" "}
            </div>{" "}
            {user.photoURL ? (
              <motion.img
                whileHover={{ scale: 1.08 }}
                referrerPolicy="no-referrer"
                src={user.photoURL}
                alt={user.displayName || "User avatar"}
                className="w-9 h-9 rounded-full border-2 border-slate-100"
              />
            ) : (
              <div className="w-9 h-9 rounded-full bg-indigo-50 border border-indigo-100 flex items-center justify-center text-indigo-400">
                {" "}
                <UserIcon className="w-4 h-4" />{" "}
              </div>
            )}{" "}
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={onLogout}
              aria-label="Sign out"
              className="p-2 text-slate-300 hover:text-red-500 hover:bg-red-50 transition-colors"
            >
              {" "}
              <LogOut className="w-4 h-4" />{" "}
            </motion.button>{" "}
          </motion.div>{" "}
        </div>{" "}
      </div>{" "}
    </nav>
  );
}
