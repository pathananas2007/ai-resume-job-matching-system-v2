/** * @license * SPDX-License-Identifier: Apache-2.0 */ import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  LogOut,
  User as UserIcon,
  FileText,
  Zap,
  BarChart,
  Sparkles,
} from "lucide-react";
import { cn } from "../../lib/utils";
interface LandingProps {
  onLogin: () => void;
}
export function Landing({ onLogin }: LandingProps) {
  const [isDemoOpen, setIsDemoOpen] = useState(false);
  return (
    <div className="min-h-screen bg-white flex flex-col font-sans">
      {" "}
      {/* Nav */}{" "}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md h-20 border-b border-slate-100">
        {" "}
        <div className="max-w-7xl mx-auto h-full px-6 md:px-12 flex items-center justify-between">
          {" "}
          <div className="flex items-center gap-8 md:gap-12">
            {" "}
            <div className="flex items-center gap-3">
              {" "}
              <div className="bg-indigo-600 w-8 h-8 flex items-center justify-center">
                {" "}
                <div className="w-4 h-4 bg-white" />{" "}
              </div>{" "}
              <span className="text-xl font-black tracking-tighter text-slate-900 uppercase">
                {" "}
                FITSCORE<span className="text-indigo-600">/AI</span>{" "}
              </span>{" "}
            </div>{" "}
            <div className="hidden md:flex items-center gap-8">
              {" "}
              <a
                href="#product"
                className="text-xs font-bold uppercase tracking-widest text-slate-500 hover:text-indigo-600 transition-colors"
              >
                Product
              </a>{" "}
              <a
                href="#how"
                className="text-xs font-bold uppercase tracking-widest text-slate-500 hover:text-indigo-600 transition-colors"
              >
                How it works
              </a>{" "}
              <a
                href="#teams"
                className="text-xs font-bold uppercase tracking-widest text-slate-500 hover:text-indigo-600 transition-colors"
              >
                For Teams
              </a>{" "}
            </div>{" "}
          </div>{" "}
          <button onClick={onLogin} className="modern-btn-primary h-12 px-8">
            Sign in Γåù
          </button>{" "}
        </div>{" "}
      </nav>{" "}
      {/* Hero */}{" "}
      <section
        id="product"
        className="pt-40 pb-32 px-6 md:px-12 border-b border-slate-100 relative overflow-hidden"
      >
        {" "}
        <div className="max-w-7xl mx-auto flex flex-col lg:flex-row gap-20 items-center">
          {" "}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="lg:w-2/3 space-y-12"
          >
            {" "}
            <h1 className="hero-text text-slate-900">
              {" "}
              Resume <span className="text-indigo-600">meets</span> <br /> job
              description. <br />{" "}
              <span className="text-brand-red">Objectively.</span>{" "}
            </h1>{" "}
            <p className="text-xl md:text-2xl text-slate-500 font-medium leading-relaxed max-w-xl">
              {" "}
              An AI analyzer that parses resumes, maps them to job requirements,
              and surfaces the exact skill gaps ΓÇö for both candidates and
              recruiters.{" "}
            </p>{" "}
            <div className="flex flex-wrap gap-4 md:gap-6 pt-6">
              {" "}
              <button
                onClick={onLogin}
                className="modern-btn-primary h-14 md:h-16 px-8 md:px-12 text-base md:text-lg"
              >
                {" "}
                Start free with Google Γåù{" "}
              </button>{" "}
              <button
                onClick={() => setIsDemoOpen(true)}
                className="modern-btn-secondary h-14 md:h-16 px-8 md:px-12 text-base md:text-lg"
              >
                {" "}
                See it in action{" "}
              </button>{" "}
            </div>{" "}
          </motion.div>{" "}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, rotate: -2 }}
            animate={{ opacity: 1, scale: 1, rotate: 0 }}
            transition={{
              duration: 0.8,
              delay: 0.2,
              type: "spring",
              stiffness: 120,
            }}
            whileHover={{
              y: -8,
              rotate: 1,
              boxShadow: "0 40px 80px -20px rgba(99,102,241,0.25)",
            }}
            className="lg:w-1/3 hidden lg:block"
          >
            {" "}
            <div className="modern-card p-10 bg-white relative shadow-2xl shadow-indigo-100 border border-indigo-50">
              {" "}
              <div className="section-label">Live Analysis</div>{" "}
              <div className="flex items-center gap-6 mb-8">
                {" "}
                <div className="relative w-24 h-24 flex items-center justify-center shrink-0">
                  {" "}
                  <svg
                    viewBox="0 0 80 80"
                    className="absolute inset-0 w-full h-full -rotate-90"
                  >
                    {" "}
                    <circle
                      cx="40"
                      cy="40"
                      r="34"
                      fill="none"
                      stroke="#e0e7ff"
                      strokeWidth="6"
                    />{" "}
                    <circle
                      cx="40"
                      cy="40"
                      r="34"
                      fill="none"
                      stroke="#6366f1"
                      strokeWidth="6"
                      strokeLinecap="round"
                      strokeDasharray={`${2 * Math.PI * 34}`}
                      strokeDashoffset={`${2 * Math.PI * 34 * (1 - 0.87)}`}
                    />{" "}
                  </svg>{" "}
                  <div className="text-center z-10">
                    {" "}
                    <div className="text-2xl font-black text-indigo-600 leading-none">
                      87
                    </div>{" "}
                    <div className="text-[8px] font-bold text-slate-400">
                      /100
                    </div>{" "}
                  </div>{" "}
                </div>{" "}
                <div>
                  {" "}
                  <div className="text-xs font-black text-slate-900 uppercase tracking-widest mb-1">
                    Strong Match
                  </div>{" "}
                  <div className="px-2 py-1 bg-emerald-50 text-emerald-700 text-[9px] font-black uppercase tracking-widest border border-emerald-200 inline-block">
                    Γ£ô Recommend Interview
                  </div>{" "}
                </div>{" "}
              </div>{" "}
              <div className="space-y-3 mb-8">
                {" "}
                {[
                  { label: "Skills", val: 91, color: "bg-indigo-500" },
                  { label: "Experience", val: 84, color: "bg-violet-500" },
                  { label: "Education", val: 78, color: "bg-sky-500" },
                ].map(({ label, val, color }) => (
                  <div key={label} className="space-y-1">
                    {" "}
                    <div className="flex justify-between text-[9px] font-bold uppercase tracking-widest text-slate-400">
                      {" "}
                      <span>{label}</span>
                      <span className="text-slate-700">{val}%</span>{" "}
                    </div>{" "}
                    <div className="h-1.5 bg-slate-100 overflow-hidden">
                      {" "}
                      <div
                        className={`h-full ${color}`}
                        style={{ width: `${val}%` }}
                      />{" "}
                    </div>{" "}
                  </div>
                ))}{" "}
              </div>{" "}
              <div className="border-t border-slate-100 pt-6 space-y-2">
                {" "}
                <div className="section-label">Powered by</div>{" "}
                <div className="space-y-1.5 font-medium text-sm">
                  {" "}
                  <p className="text-slate-400">ΓåÆ Claude Sonnet 4.5</p>{" "}
                  <p className="text-slate-400">ΓåÆ GPT-4o</p>{" "}
                  <p className="text-slate-900 font-bold">
                    ΓåÆ Gemini 2.0 Flash ΓùÅ
                  </p>{" "}
                </div>{" "}
              </div>{" "}
            </div>{" "}
          </motion.div>{" "}
        </div>{" "}
      </section>{" "}
      {/* Demo Modal */}{" "}
      <AnimatePresence>
        {" "}
        {isDemoOpen && (
          <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-md z-[100] flex items-center justify-center p-6 lg:p-12">
            {" "}
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="bg-white modern-card w-full max-w-6xl max-h-full overflow-hidden flex flex-col shadow-2xl"
            >
              {" "}
              <div className="p-8 border-b border-slate-100 flex justify-between items-center bg-white">
                {" "}
                <div className="space-y-1">
                  {" "}
                  <div className="section-label">Platform Demo</div>{" "}
                  <h2 className="text-3xl font-black text-slate-900">
                    Product Walkthrough
                  </h2>{" "}
                </div>{" "}
                <button
                  onClick={() => setIsDemoOpen(false)}
                  aria-label="Close demo"
                  className="modern-btn-secondary p-2"
                >
                  {" "}
                  <LogOut className="w-6 h-6 rotate-180" />{" "}
                </button>{" "}
              </div>{" "}
              <div className="flex-1 overflow-y-auto p-8 md:p-12 bg-slate-50 space-y-20">
                {" "}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
                  {" "}
                  <div className="space-y-6">
                    {" "}
                    <div className="section-label text-indigo-600">
                      Step 01 / Deployment
                    </div>{" "}
                    <h3 className="text-4xl md:text-5xl font-black text-slate-900 leading-tight">
                      Define the mission.
                    </h3>{" "}
                    <p className="text-lg md:text-xl text-slate-500 font-medium leading-relaxed">
                      {" "}
                      Recruiters deploy job blueprints with specific technical
                      parameters. Candidates upload resumes to create their
                      identity vector.{" "}
                    </p>{" "}
                  </div>{" "}
                  <div className="modern-card p-4 bg-white border-2 border-indigo-600 shadow-xl">
                    {" "}
                    <div className="h-48 md:h-64 bg-slate-100 flex items-center justify-center text-slate-400 font-black uppercase tracking-widest italic text-center text-sm">
                      {" "}
                      [ Dashboard Mockup ]{" "}
                    </div>{" "}
                  </div>{" "}
                </div>{" "}
                <div className="py-16 md:py-20 text-center space-y-8 md:space-y-12">
                  {" "}
                  <h4 className="text-4xl md:text-5xl font-black text-slate-900">
                    Ready to build your team?
                  </h4>{" "}
                  <button
                    onClick={onLogin}
                    className="modern-btn-primary h-14 md:h-16 px-10 md:px-12 text-lg md:text-xl"
                  >
                    Get Started Γåù
                  </button>{" "}
                </div>{" "}
              </div>{" "}
            </motion.div>{" "}
          </div>
        )}{" "}
      </AnimatePresence>{" "}
      {/* Teams Section */}{" "}
      <section
        id="teams"
        className="py-24 md:py-32 px-6 md:px-12 border-b border-slate-100"
      >
        {" "}
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-16 md:gap-32">
          {" "}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="space-y-10"
          >
            {" "}
            <div className="section-label">For Candidates</div>{" "}
            <h2 className="text-4xl md:text-6xl font-black text-slate-900 leading-tight">
              Know where you stand, before you apply.
            </h2>{" "}
            <div className="space-y-8">
              {" "}
              {[
                {
                  icon: Zap,
                  t: "Upload resume (PDF or paste) ΓÇö AI parses your profile in seconds.",
                },
                {
                  icon: BarChart,
                  t: "Paste any job description and get an honest fit score.",
                },
                {
                  icon: Sparkles,
                  t: "Get a prioritized roadmap to close the skill gap.",
                },
              ].map((f, i) => (
                <div key={i} className="flex gap-4 items-start">
                  {" "}
                  <f.icon className="w-6 h-6 text-indigo-600 shrink-0" />{" "}
                  <p className="text-lg font-medium text-slate-500 leading-snug">
                    {f.t}
                  </p>{" "}
                </div>
              ))}{" "}
            </div>{" "}
            <button
              onClick={onLogin}
              className="text-indigo-600 font-bold border-b-2 border-indigo-600 pb-1"
            >
              I'm a job seeker Γåù
            </button>{" "}
          </motion.div>{" "}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="space-y-10"
          >
            {" "}
            <div className="section-label">For Teams & Recruiters</div>{" "}
            <h2 className="text-4xl md:text-6xl font-black text-slate-900 leading-tight">
              Stop reading 500 resumes. Rank them.
            </h2>{" "}
            <div className="space-y-8">
              {" "}
              {[
                {
                  icon: UserIcon,
                  t: "Post a JD once. Score every candidate on the same rubric.",
                },
                {
                  icon: FileText,
                  t: "See match %, matching skills, missing skills, and summary.",
                },
                { icon: Zap, t: "Choose the LLM that fits your workflow." },
              ].map((f, i) => (
                <div key={i} className="flex gap-4 items-start">
                  {" "}
                  <f.icon className="w-6 h-6 text-brand-red shrink-0" />{" "}
                  <p className="text-lg font-medium text-slate-500 leading-snug">
                    {f.t}
                  </p>{" "}
                </div>
              ))}{" "}
            </div>{" "}
            <button
              onClick={onLogin}
              className="text-brand-red font-bold border-b-2 border-brand-red pb-1"
            >
              Enter Recruiter Command Center Γåù
            </button>{" "}
          </motion.div>{" "}
        </div>{" "}
      </section>{" "}
      {/* Capabilities */}{" "}
      <section className="py-24 md:py-32 px-6 md:px-12 border-b border-slate-100">
        {" "}
        <div className="max-w-7xl mx-auto space-y-16 md:space-y-20">
          {" "}
          <div className="section-label">002 / CAPABILITIES</div>{" "}
          <h2 className="text-4xl md:text-6xl font-black text-slate-900 leading-tight">
            Four moves. One decision engine.
          </h2>{" "}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {" "}
            {[
              {
                id: "01",
                t: "Parse",
                d: "Extract skills, experience, seniority, education ΓÇö structured, searchable.",
              },
              {
                id: "02",
                t: "Match",
                d: "Score any candidate against any JD with a transparent rubric.",
              },
              {
                id: "03",
                t: "Visualize",
                d: "Radar charts expose competency gaps at a glance.",
              },
              {
                id: "04",
                t: "Coach",
                d: "Get actionable recommendations to close the gaps ΓÇö fast.",
              },
              {
                id: "05",
                t: "Rank",
                d: "Recruiters get a sorted shortlist, scored on identical criteria.",
              },
            ].map((s, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                whileHover={{
                  y: -12,
                  borderColor: "#6366f1",
                  boxShadow: "0 24px 48px -12px rgba(99,102,241,0.2)",
                }}
                className={cn(
                  "modern-card p-10 h-64 flex flex-col justify-between group cursor-default transition-all",
                  i === 0 && "bg-indigo-50/20",
                )}
              >
                {" "}
                <span className="section-label">{s.id}</span>{" "}
                <div>
                  {" "}
                  <h4 className="text-3xl font-black text-slate-900 mb-2 group-hover:text-indigo-600 transition-colors">
                    {s.t}
                  </h4>{" "}
                  <p className="text-slate-500 font-medium leading-snug">
                    {s.d}
                  </p>{" "}
                </div>{" "}
              </motion.div>
            ))}{" "}
          </div>{" "}
        </div>{" "}
      </section>{" "}
      {/* Process */}{" "}
      <section
        id="how"
        className="py-24 md:py-32 px-6 md:px-12 border-b border-slate-100"
      >
        {" "}
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-16 md:gap-20 items-center">
          {" "}
          <div className="lg:col-span-4 space-y-10">
            {" "}
            <div className="section-label">003 / PROCESS</div>{" "}
            <h2 className="text-4xl md:text-6xl font-black text-slate-900 leading-[0.9]">
              Minutes, not <br />
              meetings.
            </h2>{" "}
          </div>{" "}
          <div className="lg:col-span-8">
            {" "}
            <div className="divide-y divide-slate-100 border-t border-slate-100">
              {" "}
              {[
                {
                  id: "01",
                  t: "Upload",
                  d: "Drop a PDF or paste resume text. Same for JDs.",
                },
                {
                  id: "02",
                  t: "Select Model",
                  d: "Claude Sonnet 3.5 ΓÇó GPT-4o ΓÇó Gemini 1.5 Flash ΓÇö your choice.",
                },
                {
                  id: "03",
                  t: "Analyze",
                  d: "The engine returns a score, gaps, strengths and a visual radar.",
                },
                {
                  id: "04",
                  t: "Act",
                  d: "Close the gaps. Shortlist candidates. Ship decisions.",
                },
              ].map((p, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  className="py-10 md:py-12 grid grid-cols-1 md:grid-cols-12 gap-6 md:gap-8 items-center group cursor-default"
                >
                  {" "}
                  <span className="md:col-span-1 text-[10px] font-bold text-slate-300 group-hover:text-indigo-600 transition-colors tabular-nums">
                    {p.id}
                  </span>{" "}
                  <h4 className="md:col-span-4 text-2xl md:text-3xl font-black text-slate-900 group-hover:text-indigo-600 transition-colors">
                    {p.t}
                  </h4>{" "}
                  <p className="md:col-span-7 text-base md:text-lg font-medium text-slate-500 leading-snug">
                    {p.d}
                  </p>{" "}
                </motion.div>
              ))}{" "}
            </div>{" "}
          </div>{" "}
        </div>{" "}
      </section>{" "}
      {/* CTA */}{" "}
      <section className="py-32 md:py-40 px-6 md:px-12 text-center space-y-10 md:space-y-12">
        {" "}
        <h2 className="hero-text text-slate-900">
          Put the <span className="text-indigo-600">math</span> behind your next
          hire.
        </h2>{" "}
        <button
          onClick={onLogin}
          className="modern-btn-primary h-16 md:h-20 px-12 md:px-16 text-lg md:text-xl"
        >
          Continue with Google Γåù
        </button>{" "}
      </section>{" "}
      <footer className="py-12 border-t border-slate-100 px-6 md:px-12 flex justify-between items-center text-slate-400">
        {" "}
        <p className="text-[10px] font-bold uppercase tracking-widest">
          ┬⌐ FITSCORE/AI ΓÇó 2026
        </p>{" "}
        <p className="text-[10px] font-bold uppercase tracking-widest">
          Intelligent Hiring Assistant
        </p>{" "}
      </footer>{" "}
    </div>
  );
}
