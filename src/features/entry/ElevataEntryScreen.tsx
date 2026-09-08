import React, { useState, useEffect } from "react";
import { motion } from "motion/react";
import { ArrowRight, FileText, Zap, Target, TrendingUp } from "lucide-react";
interface ElevataEntryScreenProps {
  onEnter: () => void;
}
/** * BACKGROUND LAYERS ΓÇö Premium AI/SaaS Atmosphere * THREE visible layers: Ambient Glows, Flowing Light Trails, Floating AI Particles * LEFT and RIGHT sides are VISIBLY animated, CENTER is clean for logo */ function BackgroundAtmosphere({
  prefersReducedMotion = false,
}: {
  prefersReducedMotion?: boolean;
}) {
  /* Left side particles */ const leftParticles = Array.from(
    { length: 15 },
    (_, i) => ({
      id: i,
      top: `${10 + (i % 9) * 10}%`,
      left: `${2 + (i % 3) * 8}%`,
      size: 1 + Math.random() * 1.5,
    }),
  );
  /* Right side particles */ const rightParticles = Array.from(
    { length: 15 },
    (_, i) => ({
      id: i,
      top: `${12 + (i % 9) * 10}%`,
      right: `${2 + (i % 3) * 8}%`,
      size: 1 + Math.random() * 1.5,
    }),
  );
  return (
    <>
      {" "}
      {/* Base gradient - white background */}{" "}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "linear-gradient(135deg, #0f172a 0%, #0d1b3e 50%, #0f172a 100%)",
        }}
      />{" "}
      {/* LAYER 1: AMBIENT GLOWS - Breathing - Visible on white */}{" "}
      <motion.div
        animate={{ opacity: [0.35, 0.65, 0.35] }}
        transition={{ duration: 12, repeat: Infinity, repeatType: "loop" }}
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 180% 120% at 50% 50%, rgba(37, 99, 235, 0.15) 0%, transparent 65%)",
        }}
      />{" "}
      <motion.div
        animate={{ opacity: [0.3, 0.6, 0.3] }}
        transition={{
          duration: 14,
          repeat: Infinity,
          repeatType: "loop",
          delay: 1,
        }}
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 150% 100% at 50% 35%, rgba(6, 182, 212, 0.12) 0%, transparent 55%)",
        }}
      />{" "}
      {/* LEFT edge blue glow - drifting - visible on white */}{" "}
      <motion.div
        animate={{
          opacity: prefersReducedMotion ? 0.15 : [0.25, 0.5, 0.25],
          x: prefersReducedMotion ? 0 : [-30, 20, -30],
        }}
        transition={{ duration: 16, repeat: Infinity, repeatType: "loop" }}
        className="absolute left-0 top-1/4 w-96 h-96 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 150% 120% at 100% 50%, rgba(37, 99, 235, 0.18) 0%, transparent 70%)",
        }}
      />{" "}
      {/* RIGHT edge cyan glow - drifting - visible on white */}{" "}
      <motion.div
        animate={{
          opacity: prefersReducedMotion ? 0.12 : [0.2, 0.48, 0.2],
          x: prefersReducedMotion ? 0 : [30, -20, 30],
        }}
        transition={{
          duration: 18,
          repeat: Infinity,
          repeatType: "loop",
          delay: 2,
        }}
        className="absolute right-0 bottom-1/4 w-96 h-96 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 150% 120% at 0% 50%, rgba(6, 182, 212, 0.14) 0%, transparent 70%)",
        }}
      />{" "}
      {/* LAYER 2: FLOWING LIGHT TRAILS - SVG Curved Paths - HIGHLY VISIBLE */}{" "}
      {/* LEFT TRAIL 1 */}{" "}
      <motion.svg
        className="absolute pointer-events-none overflow-visible"
        style={{ left: "-200px", top: "5%", width: "400px", height: "300px" }}
        animate={{
          opacity: prefersReducedMotion ? 0 : [0.3, 0.6, 0.3],
          x: prefersReducedMotion ? 0 : [0, 120, 0],
        }}
        transition={{ duration: 14, repeat: Infinity, repeatType: "loop" }}
      >
        {" "}
        <defs>
          {" "}
          <linearGradient id="trailL1" x1="0%" y1="0%" x2="100%" y2="0%">
            {" "}
            <stop offset="0%" stopColor="#2563EB" stopOpacity="0.5" />{" "}
            <stop offset="100%" stopColor="#2563EB" stopOpacity="0" />{" "}
          </linearGradient>{" "}
        </defs>{" "}
        <path
          d="M 50 50 Q 150 100 250 180"
          stroke="url(#trailL1)"
          strokeWidth="24"
          fill="none"
          strokeLinecap="round"
        />{" "}
      </motion.svg>{" "}
      {/* LEFT TRAIL 2 */}{" "}
      <motion.svg
        className="absolute pointer-events-none overflow-visible"
        style={{ left: "-200px", top: "40%", width: "400px", height: "250px" }}
        animate={{
          opacity: prefersReducedMotion ? 0 : [0.25, 0.55, 0.25],
          x: prefersReducedMotion ? 0 : [0, 130, 0],
        }}
        transition={{
          duration: 16,
          repeat: Infinity,
          repeatType: "loop",
          delay: 2,
        }}
      >
        {" "}
        <defs>
          {" "}
          <linearGradient id="trailL2" x1="0%" y1="0%" x2="100%" y2="0%">
            {" "}
            <stop offset="0%" stopColor="#2563EB" stopOpacity="0.45" />{" "}
            <stop offset="100%" stopColor="#2563EB" stopOpacity="0" />{" "}
          </linearGradient>{" "}
        </defs>{" "}
        <path
          d="M 30 120 Q 140 100 280 80"
          stroke="url(#trailL2)"
          strokeWidth="22"
          fill="none"
          strokeLinecap="round"
        />{" "}
      </motion.svg>{" "}
      {/* LEFT TRAIL 3 */}{" "}
      <motion.svg
        className="absolute pointer-events-none overflow-visible"
        style={{
          left: "-200px",
          bottom: "5%",
          width: "400px",
          height: "280px",
        }}
        animate={{
          opacity: prefersReducedMotion ? 0 : [0.28, 0.58, 0.28],
          x: prefersReducedMotion ? 0 : [0, 110, 0],
        }}
        transition={{
          duration: 15,
          repeat: Infinity,
          repeatType: "loop",
          delay: 3,
        }}
      >
        {" "}
        <defs>
          {" "}
          <linearGradient id="trailL3" x1="0%" y1="0%" x2="100%" y2="0%">
            {" "}
            <stop offset="0%" stopColor="#2563EB" stopOpacity="0.48" />{" "}
            <stop offset="100%" stopColor="#2563EB" stopOpacity="0" />{" "}
          </linearGradient>{" "}
        </defs>{" "}
        <path
          d="M 60 240 Q 150 180 260 100"
          stroke="url(#trailL3)"
          strokeWidth="26"
          fill="none"
          strokeLinecap="round"
        />{" "}
      </motion.svg>{" "}
      {/* RIGHT TRAIL 1 */}{" "}
      <motion.svg
        className="absolute pointer-events-none overflow-visible"
        style={{ right: "-200px", top: "8%", width: "400px", height: "320px" }}
        animate={{
          opacity: prefersReducedMotion ? 0 : [0.32, 0.62, 0.32],
          x: prefersReducedMotion ? 0 : [0, -120, 0],
        }}
        transition={{
          duration: 15,
          repeat: Infinity,
          repeatType: "loop",
          delay: 1,
        }}
      >
        {" "}
        <defs>
          {" "}
          <linearGradient id="trailR1" x1="100%" y1="0%" x2="0%" y2="0%">
            {" "}
            <stop offset="0%" stopColor="#06B6D4" stopOpacity="0.52" />{" "}
            <stop offset="100%" stopColor="#06B6D4" stopOpacity="0" />{" "}
          </linearGradient>{" "}
        </defs>{" "}
        <path
          d="M 350 60 Q 240 110 100 200"
          stroke="url(#trailR1)"
          strokeWidth="24"
          fill="none"
          strokeLinecap="round"
        />{" "}
      </motion.svg>{" "}
      {/* RIGHT TRAIL 2 */}{" "}
      <motion.svg
        className="absolute pointer-events-none overflow-visible"
        style={{ right: "-200px", top: "42%", width: "400px", height: "240px" }}
        animate={{
          opacity: prefersReducedMotion ? 0 : [0.27, 0.57, 0.27],
          x: prefersReducedMotion ? 0 : [0, -125, 0],
        }}
        transition={{
          duration: 17,
          repeat: Infinity,
          repeatType: "loop",
          delay: 2.5,
        }}
      >
        {" "}
        <defs>
          {" "}
          <linearGradient id="trailR2" x1="100%" y1="0%" x2="0%" y2="0%">
            {" "}
            <stop offset="0%" stopColor="#06B6D4" stopOpacity="0.46" />{" "}
            <stop offset="100%" stopColor="#06B6D4" stopOpacity="0" />{" "}
          </linearGradient>{" "}
        </defs>{" "}
        <path
          d="M 370 110 Q 250 90 80 70"
          stroke="url(#trailR2)"
          strokeWidth="22"
          fill="none"
          strokeLinecap="round"
        />{" "}
      </motion.svg>{" "}
      {/* RIGHT TRAIL 3 */}{" "}
      <motion.svg
        className="absolute pointer-events-none overflow-visible"
        style={{
          right: "-200px",
          bottom: "8%",
          width: "400px",
          height: "300px",
        }}
        animate={{
          opacity: prefersReducedMotion ? 0 : [0.3, 0.6, 0.3],
          x: prefersReducedMotion ? 0 : [0, -115, 0],
        }}
        transition={{
          duration: 16,
          repeat: Infinity,
          repeatType: "loop",
          delay: 3.5,
        }}
      >
        {" "}
        <defs>
          {" "}
          <linearGradient id="trailR3" x1="100%" y1="0%" x2="0%" y2="0%">
            {" "}
            <stop offset="0%" stopColor="#06B6D4" stopOpacity="0.50" />{" "}
            <stop offset="100%" stopColor="#06B6D4" stopOpacity="0" />{" "}
          </linearGradient>{" "}
        </defs>{" "}
        <path
          d="M 340 250 Q 230 180 110 80"
          stroke="url(#trailR3)"
          strokeWidth="26"
          fill="none"
          strokeLinecap="round"
        />{" "}
      </motion.svg>{" "}
      {/* LAYER 3: FLOATING AI PARTICLES - HIGHLY VISIBLE */}{" "}
      {/* LEFT PARTICLES */}{" "}
      {leftParticles.map((p) => (
        <motion.div
          key={`left-${p.id}`}
          className="absolute rounded-full pointer-events-none shadow-lg"
          style={{
            top: p.top,
            left: p.left,
            width: p.size * 1.5,
            height: p.size * 1.5,
            background: p.id % 2 === 0 ? "#3B82F6" : "#60A5FA",
            boxShadow: `0 0 ${8 + (p.id % 3)}px rgba(59, 130, 246, 0.6)`,
          }}
          animate={{
            opacity: prefersReducedMotion ? 0 : [0.6, 0.95, 0.6],
            x: prefersReducedMotion ? 0 : [0, 40, 0],
            y: prefersReducedMotion ? 0 : [0, -25, 0],
          }}
          transition={{
            duration: 8 + p.id,
            repeat: Infinity,
            repeatType: "loop",
            delay: p.id * 0.3,
            ease: "easeInOut",
          }}
        />
      ))}{" "}
      {/* RIGHT PARTICLES */}{" "}
      {rightParticles.map((p) => (
        <motion.div
          key={`right-${p.id}`}
          className="absolute rounded-full pointer-events-none shadow-lg"
          style={{
            top: p.top,
            right: p.right,
            width: p.size * 1.5,
            height: p.size * 1.5,
            background: p.id % 2 === 0 ? "#06B6D4" : "#67E8F9",
            boxShadow: `0 0 ${8 + (p.id % 3)}px rgba(6, 182, 212, 0.6)`,
          }}
          animate={{
            opacity: prefersReducedMotion ? 0 : [0.6, 0.95, 0.6],
            x: prefersReducedMotion ? 0 : [0, -40, 0],
            y: prefersReducedMotion ? 0 : [0, -25, 0],
          }}
          transition={{
            duration: 7 + p.id,
            repeat: Infinity,
            repeatType: "loop",
            delay: p.id * 0.35,
            ease: "easeInOut",
          }}
        />
      ))}{" "}
      {/* BOTTOM ATMOSPHERE - More visible on white */}{" "}
      <motion.div
        animate={{ opacity: [0.12, 0.25, 0.12] }}
        transition={{ duration: 16, repeat: Infinity, repeatType: "loop" }}
        className="absolute bottom-0 left-0 right-0 h-1/3 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 200% 100% at 50% 100%, rgba(6, 182, 212, 0.12) 0%, transparent 70%)",
        }}
      />{" "}
      <div
        className="absolute bottom-0 left-0 right-0 h-1/3 pointer-events-none opacity-60"
        style={{
          background: `            linear-gradient(90deg, rgba(37, 99, 235, 0.06) 1px, transparent 1px),            linear-gradient(rgba(37, 99, 235, 0.06) 1px, transparent 1px)          `,
          backgroundSize: "80px 80px",
        }}
      />{" "}
    </>
  );
}
/** * STEP 1: Logo Mark - Hero Element * Custom animated logo: * 1. Shows E (blue square + white E) first * 2. Then animates arrow separately with bottom-to-top growth */ function LogoHero({
  logoSize,
  prefersReducedMotion = false,
}: {
  logoSize: number;
  prefersReducedMotion?: boolean;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: prefersReducedMotion ? 1 : 0.85 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: prefersReducedMotion ? 0 : 0.7, ease: "easeOut" }}
      className="flex justify-center"
      style={{ width: logoSize, height: logoSize }}
    >
      {" "}
      <svg
        viewBox="0 0 100 100"
        xmlns="http://www.w3.org/2000/svg"
        style={{
          width: "100%",
          height: "100%",
          display: "block",
          overflow: "visible",
        }}
      >
        {" "}
        {/* Blue background square */}{" "}
        <rect width="100" height="100" rx="18" fill="#2563EB" />{" "}
        {/* White E letterform */}{" "}
        <path
          d="M18 18 H68 V32 H34 V44 H60 V58 H34 V68 H70 V82 H18 Z"
          fill="white"
        />{" "}
        {/* Cyan upward arrow - animates separately after E settles */}{" "}
        <motion.g
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{
            duration: prefersReducedMotion ? 0 : 0.5,
            delay: prefersReducedMotion ? 0 : 0.7,
            ease: "easeOut",
          }}
        >
          {" "}
          {/* Arrow stem with bottom-to-top growth animation */}{" "}
          <motion.path
            d="M66 82 Q70 64 74 50 Q78 36 80 22"
            stroke="#06B6D4"
            strokeWidth="7"
            strokeLinecap="round"
            fill="none"
            strokeDasharray={prefersReducedMotion ? "none" : "60"}
            strokeDashoffset={prefersReducedMotion ? 0 : 60}
            animate={prefersReducedMotion ? {} : { strokeDashoffset: 0 }}
            transition={{
              duration: prefersReducedMotion ? 0 : 0.6,
              delay: prefersReducedMotion ? 0 : 0.7,
              ease: "easeInOut",
            }}
          />{" "}
          {/* Arrowhead */}{" "}
          <polygon points="80,8 70,26 90,26" fill="#06B6D4" />{" "}
        </motion.g>{" "}
      </svg>{" "}
    </motion.div>
  );
}
/** * STEP 3: Wordmark - "Elevara" * Appears after logo settles */ function WordmarkText({
  prefersReducedMotion = false,
}: {
  prefersReducedMotion?: boolean;
}) {
  const letters = "Elevara".split("");
  return (
    <h1
      className="text-center font-black text-white tracking-tight leading-none"
      style={{ fontSize: "clamp(32px, 10vw, 64px)" }}
    >
      {" "}
      {letters.map((letter, idx) => (
        <motion.span
          key={idx}
          initial={{ opacity: 0, y: prefersReducedMotion ? 0 : 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            duration: prefersReducedMotion ? 0 : 0.12,
            delay: prefersReducedMotion ? 0 : 1.4 + idx * 0.08,
            ease: "easeOut",
          }}
        >
          {" "}
          {letter}{" "}
        </motion.span>
      ))}{" "}
    </h1>
  );
}
/** * STEP 4: Tagline */ function TaglineText({
  prefersReducedMotion = false,
}: {
  prefersReducedMotion?: boolean;
}) {
  return (
    <motion.p
      initial={{ opacity: 0, y: prefersReducedMotion ? 0 : 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        duration: prefersReducedMotion ? 0 : 0.4,
        delay: prefersReducedMotion ? 0 : 2.1,
        ease: "easeOut",
      }}
      className="text-center text-slate-300 leading-relaxed"
      style={{ fontSize: "clamp(14px, 3.5vw, 18px)", maxWidth: "32rem" }}
    >
      {" "}
      <span className="text-white font-bold">
        AI-powered career growth,
      </span>{" "}
      <br />{" "}
      <span className="text-white font-bold">built around you.</span>{" "}
    </motion.p>
  );
}
/** * STEP 5: Career Flow Icons */ function CareerFlowIcons({
  prefersReducedMotion = false,
}: {
  prefersReducedMotion?: boolean;
}) {
  const stages = [
    { icon: FileText, color: "#2563EB" },
    { icon: Zap, color: "#06B6D4" },
    { icon: Target, color: "#2563EB" },
    { icon: TrendingUp, color: "#06B6D4" },
  ];
  return (
    <motion.div
      initial={{ opacity: 0, y: prefersReducedMotion ? 0 : 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        duration: prefersReducedMotion ? 0 : 0.3,
        delay: prefersReducedMotion ? 0 : 2.5,
        ease: "easeOut",
      }}
      className="flex items-center justify-center gap-3 flex-wrap md:flex-nowrap"
    >
      {" "}
      {stages.map((stage, idx) => {
        const Icon = stage.icon;
        return (
          <React.Fragment key={idx}>
            {" "}
            <motion.div
              initial={{ opacity: 0, scale: prefersReducedMotion ? 1 : 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{
                duration: 0.25,
                delay: prefersReducedMotion ? 0 : 2.5 + idx * 0.12,
                ease: "easeOut",
              }}
              className="p-2.5 rounded-lg flex items-center justify-center hover:scale-110 transition-transform"
              style={{
                backgroundColor: `${stage.color}15`,
                border: `1.5px solid ${stage.color}30`,
              }}
            >
              {" "}
              <Icon
                className="w-4 h-4"
                style={{ color: stage.color }}
                strokeWidth={1.5}
              />{" "}
            </motion.div>{" "}
            {idx < stages.length - 1 && (
              <motion.div
                initial={{ scaleX: prefersReducedMotion ? 1 : 0, opacity: 0 }}
                animate={{ scaleX: 1, opacity: 1 }}
                transition={{
                  duration: 0.15,
                  delay: prefersReducedMotion ? 0 : 2.6 + idx * 0.12,
                  ease: "easeOut",
                }}
                className="hidden md:block w-2 h-0.5 origin-left"
                style={{
                  background: `linear-gradient(90deg, ${stage.color}40, transparent)`,
                }}
              />
            )}{" "}
          </React.Fragment>
        );
      })}{" "}
    </motion.div>
  );
}
/** * STEP 6: Enter Button - Final Element */ function EnterButton({
  onClick,
  prefersReducedMotion = false,
}: {
  onClick: () => void;
  prefersReducedMotion?: boolean;
}) {
  return (
    <motion.button
      onClick={onClick}
      initial={{ opacity: 0, y: prefersReducedMotion ? 0 : 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        duration: prefersReducedMotion ? 0 : 0.4,
        delay: prefersReducedMotion ? 0 : 3.0,
        ease: "easeOut",
      }}
      whileHover={
        prefersReducedMotion
          ? {}
          : { y: -3, boxShadow: "0 16px 32px rgba(37, 99, 235, 0.25)" }
      }
      whileTap={prefersReducedMotion ? {} : { scale: 0.97 }}
      className="inline-flex items-center justify-center gap-2 px-7 py-3 md:px-9 md:py-3.5 bg-[#2563EB] text-white font-bold rounded-lg hover:bg-[#1D4ED8] transition-colors duration-150 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#2563EB] focus-visible:ring-offset-2 shadow-lg"
      style={{ fontSize: "clamp(13px, 2.5vw, 15px)" }}
    >
      {" "}
      Enter Elevara{" "}
      <motion.div
        animate={prefersReducedMotion ? {} : { x: [0, 3, 0] }}
        transition={{ duration: 1.8, repeat: Infinity, repeatType: "loop" }}
      >
        {" "}
        <ArrowRight className="w-4 h-4" strokeWidth={2} />{" "}
      </motion.div>{" "}
    </motion.button>
  );
}
/** * MAIN COMPONENT: ElevataEntryScreen * Full-screen splash with sequential reveal animation */ export default function ElevataEntryScreen({
  onEnter,
}: ElevataEntryScreenProps) {
  const [isExiting, setIsExiting] = useState(false);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);
  const [logoSize, setLogoSize] = useState(280);
  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    setPrefersReducedMotion(mediaQuery.matches);
    const handleChange = (e: MediaQueryListEvent) => {
      setPrefersReducedMotion(e.matches);
    };
    mediaQuery.addEventListener("change", handleChange);
    return () => mediaQuery.removeEventListener("change", handleChange);
  }, []);
  useEffect(() => {
    const updateLogoSize = () => {
      const width = window.innerWidth;
      const newSize = Math.min(280, Math.max(150, width * 0.2));
      setLogoSize(newSize);
    };
    updateLogoSize();
    window.addEventListener("resize", updateLogoSize);
    return () => window.removeEventListener("resize", updateLogoSize);
  }, []);
  const handleEnter = () => {
    setIsExiting(true);
    setTimeout(onEnter, 400);
  };
  return (
    <motion.div
      initial={{ opacity: 1 }}
      animate={{ opacity: isExiting ? 0 : 1 }}
      transition={{ duration: 0.4, ease: "easeInOut" }}
      className="fixed inset-0 z-[9999] overflow-hidden flex flex-col items-center justify-center"
      style={{ width: "100%", height: "100dvh", minHeight: "100dvh" }}
    >
      {" "}
      {/* ΓöÇΓöÇ BACKGROUND LAYERS */}{" "}
      <BackgroundAtmosphere prefersReducedMotion={prefersReducedMotion} />{" "}
      {/* ΓöÇΓöÇ MAIN CONTENT */}{" "}
      <div
        className="relative z-10 flex flex-col items-center gap-5 md:gap-7 lg:gap-8 px-6 md:px-8 w-full max-w-2xl"
        style={{ pointerEvents: "auto" }}
      >
        {" "}
        {/* Logo Hero - STEP 1 */}{" "}
        <LogoHero
          logoSize={logoSize}
          prefersReducedMotion={prefersReducedMotion}
        />{" "}
        {/* Wordmark - STEP 3 */}{" "}
        <WordmarkText prefersReducedMotion={prefersReducedMotion} />{" "}
        {/* Tagline - STEP 4 */}{" "}
        <TaglineText prefersReducedMotion={prefersReducedMotion} />{" "}
        {/* Career Flow - STEP 5 */}{" "}
        <CareerFlowIcons prefersReducedMotion={prefersReducedMotion} />{" "}
        {/* Enter Button - STEP 6 */}{" "}
        <div className="pt-2 md:pt-4">
          {" "}
          <EnterButton
            onClick={handleEnter}
            prefersReducedMotion={prefersReducedMotion}
          />{" "}
        </div>{" "}
      </div>{" "}
    </motion.div>
  );
}
