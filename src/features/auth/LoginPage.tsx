import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "motion/react";
import {
  Eye,
  EyeOff,
  Loader2,
  ArrowRight,
  CheckCircle2,
  AlertCircle,
  Lock,
} from "lucide-react";
import { ElevaraLogoMark } from "../../components/ui/ElevaraLogo";
import { useAuthStore } from "../../store/authStore";
import { useToast } from "../../components/ui/Toast";
import { authApi } from "../../services/api/authApi";
import { userApi } from "../../services/api/userApi";
import { cn } from "../../lib/utils";
import type { User } from "../../types";
export default function LoginPage() {
  const navigate = useNavigate();
  const { setUser, setLoading, isLoading } = useAuthStore();
  const { toast } = useToast();
  const [form, setForm] = useState({
    email: "",
    password: "",
    remember: false,
  });
  const [showPw, setShowPw] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [touched, setTouched] = useState<Record<string, boolean>>({});
  const [validationState, setValidationState] = useState<
    Record<string, "valid" | "error" | null>
  >({});
  /* Real-time email validation */ const emailRegex =
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const validateEmail = (email: string): string | null => {
    if (!email.trim()) return "Email is required.";
    if (!emailRegex.test(email)) return "Enter a valid email address.";
    return null;
  };
  const validatePassword = (password: string): string | null => {
    if (!password) return "Password is required.";
    return null;
  };
  const handleEmailChange = (value: string) => {
    setForm((p) => ({ ...p, email: value }));
    if (touched.email) {
      const error = validateEmail(value);
      setErrors((p) => ({ ...p, email: error || undefined }));
      setValidationState((p) => ({
        ...p,
        email: error ? "error" : value && !error ? "valid" : null,
      }));
    }
  };
  const handlePasswordChange = (value: string) => {
    setForm((p) => ({ ...p, password: value }));
    if (touched.password) {
      const error = validatePassword(value);
      setErrors((p) => ({ ...p, password: error || undefined }));
      setValidationState((p) => ({
        ...p,
        password: error ? "error" : value && !error ? "valid" : null,
      }));
    }
  };
  const handleEmailBlur = () => {
    setTouched((p) => ({ ...p, email: true }));
    const error = validateEmail(form.email);
    setErrors((p) => ({ ...p, email: error || undefined }));
    setValidationState((p) => ({
      ...p,
      email: error ? "error" : form.email && !error ? "valid" : null,
    }));
  };
  const handlePasswordBlur = () => {
    setTouched((p) => ({ ...p, password: true }));
    const error = validatePassword(form.password);
    setErrors((p) => ({ ...p, password: error || undefined }));
    setValidationState((p) => ({
      ...p,
      password: error ? "error" : form.password && !error ? "valid" : null,
    }));
  };
  const validate = (): boolean => {
    const emailError = validateEmail(form.email);
    const passwordError = validatePassword(form.password);
    const newErrors: Record<string, string> = {};
    if (emailError) newErrors.email = emailError;
    if (passwordError) newErrors.password = passwordError;
    setErrors(newErrors);
    setValidationState({
      email: emailError ? "error" : "valid",
      password: passwordError ? "error" : "valid",
    });
    return Object.keys(newErrors).length === 0;
  };
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    setLoading(true);
    setErrors({});
    /* Clear any previous errors */ try {
      /* 1. Authenticate with backend */ const tokenResponse =
        await authApi.login(form.email, form.password);
      /* 2. Store token in authStore IMMEDIATELY so subsequent API calls use it */ const {
        setUser: setUserInStore,
      } = useAuthStore.getState();
      setUserInStore(
        {
          id: "",
          email: "",
          full_name: "",
          role: "seeker",
          is_verified: true,
          created_at: "",
        },
        tokenResponse.access_token,
      );
      /* 3. Fetch the authenticated user's data (now with token available in authStore) */ const userResponse =
        await userApi.getMe();
      /* 4. Transform API user to app User type */ const appUser: User = {
        id: userResponse.id || userResponse._id || "",
        email: userResponse.email,
        full_name: userResponse.full_name || userResponse.name || "",
        role: (userResponse.role?.toLowerCase() === "recruiter"
          ? "recruiter"
          : "seeker") as "seeker" | "recruiter",
        is_verified: true,
        created_at: userResponse.created_at || new Date().toISOString(),
      };
      /* 5. Update with real user data */ setUser(
        appUser,
        tokenResponse.access_token,
      );
      toast(
        `Welcome back, ${appUser.full_name}!`,
        "success",
        "Sign in successful",
      );
      /* 6. Navigate to appropriate dashboard based on backend role */ navigate(
        appUser.role === "recruiter"
          ? "/recruiter/dashboard"
          : "/seeker/dashboard",
      );
    } catch (err: any) {
      console.error("Login error:", err);
      /* Log for debugging */ /* Determine error type and show appropriate clean message */ let errorMessage =
        "Unable to sign in. Please try again.";
      if (
        err?.error?.code === "NETWORK_ERROR" ||
        err?.message?.includes("network") ||
        err?.message?.includes("fetch")
      ) {
        errorMessage = "Unable to connect to the server. Please try again.";
      } else if (
        err?.error?.message?.includes("Incorrect") ||
        err?.error?.code === "400"
      ) {
        errorMessage = "Incorrect email or password.";
      } else if (
        err?.error?.message?.includes("email") &&
        err?.error?.message?.includes("password")
      ) {
        errorMessage = "Incorrect email or password.";
      }
      setErrors({ submit: errorMessage });
      toast(errorMessage, "error", "Sign in failed");
    } finally {
      setLoading(false);
    }
  };
  const handleDemoSeeker = async () => {
    try {
      setLoading(true);
      const tokenResponse = await authApi.login(
        "test@example.com",
        "password123",
      );
      /* Store token FIRST so userApi.getMe() can use it */ const {
        setUser: setUserInStore,
      } = useAuthStore.getState();
      setUserInStore(
        {
          id: "",
          email: "",
          full_name: "",
          role: "seeker",
          is_verified: true,
          created_at: "",
        },
        tokenResponse.access_token,
      );
      const userResponse = await userApi.getMe();
      const appUser: User = {
        id: userResponse.id || userResponse._id || "",
        email: userResponse.email,
        full_name: userResponse.full_name || userResponse.name || "",
        role: (userResponse.role?.toLowerCase() === "recruiter"
          ? "recruiter"
          : "seeker") as "seeker" | "recruiter",
        is_verified: true,
        created_at: userResponse.created_at || new Date().toISOString(),
      };
      setUser(appUser, tokenResponse.access_token);
      navigate("/seeker/dashboard");
    } catch (error) {
      toast("Demo login failed", "error");
    } finally {
      setLoading(false);
    }
  };
  const handleDemoRecruiter = async () => {
    try {
      setLoading(true);
      const tokenResponse = await authApi.login(
        "recruiter@example.com",
        "recruiter123",
      );
      /* Store token FIRST so userApi.getMe() can use it */ const {
        setUser: setUserInStore,
      } = useAuthStore.getState();
      setUserInStore(
        {
          id: "",
          email: "",
          full_name: "",
          role: "recruiter",
          is_verified: true,
          created_at: "",
        },
        tokenResponse.access_token,
      );
      const userResponse = await userApi.getMe();
      const appUser: User = {
        id: userResponse.id || userResponse._id || "",
        email: userResponse.email,
        full_name: userResponse.full_name || userResponse.name || "",
        role: (userResponse.role?.toLowerCase() === "recruiter"
          ? "recruiter"
          : "seeker") as "seeker" | "recruiter",
        is_verified: true,
        created_at: userResponse.created_at || new Date().toISOString(),
      };
      setUser(appUser, tokenResponse.access_token);
      navigate("/recruiter/dashboard");
    } catch (error) {
      toast("Demo login failed", "error");
    } finally {
      setLoading(false);
    }
  };
  const handleGoogleOAuth = async () => {
    try {
      const { auth_url } = await authApi.getGoogleAuthUrl();
      /* Redirect to Google authorization page */ window.location.href =
        auth_url;
    } catch (err: any) {
      console.error("Google OAuth error:", err);
      if (
        err?.error?.status === 503 ||
        err?.error?.message?.includes("not configured")
      ) {
        toast("Google sign-in is not configured yet", "info");
      } else {
        toast(
          "Google sign-in could not be completed. Please try again.",
          "error",
        );
      }
    }
  };
  const handleGitHubOAuth = async () => {
    try {
      const { auth_url } = await authApi.getGitHubAuthUrl();
      /* Redirect to GitHub authorization page */ window.location.href =
        auth_url;
    } catch (err: any) {
      console.error("GitHub OAuth error:", err);
      if (
        err?.error?.status === 503 ||
        err?.error?.message?.includes("not configured")
      ) {
        toast("GitHub sign-in is not configured yet", "info");
      } else {
        toast(
          "GitHub sign-in could not be completed. Please try again.",
          "error",
        );
      }
    }
  };
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#2563EB] via-[#1D4ED8] to-[#1E40AF] flex overflow-hidden">
      {" "}
      {/* Left panel ΓÇö premium AI branding with enhanced animations */}{" "}
      <div className="hidden lg:flex lg:w-[480px] xl:w-[560px] bg-gradient-to-br from-[#2563EB] via-[#1D4ED8] to-[#1E40AF] flex-col justify-between p-12 shrink-0 relative overflow-hidden">
        {" "}
        {/* Enhanced animated AI background */}{" "}
        <div className="absolute inset-0 opacity-20">
          {" "}
          {/* Soft radial glow base */}{" "}
          <motion.div
            animate={{ scale: [1, 1.3, 1], opacity: [0.3, 0.6, 0.3] }}
            transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
            className="absolute top-1/3 left-1/3 w-96 h-96 bg-cyan-400 rounded-full mix-blend-multiply filter blur-3xl"
          />{" "}
          <motion.div
            animate={{ scale: [1.3, 1, 1.3], opacity: [0.2, 0.5, 0.2] }}
            transition={{
              duration: 15,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 2,
            }}
            className="absolute bottom-1/3 right-1/3 w-80 h-80 bg-blue-300 rounded-full mix-blend-multiply filter blur-3xl"
          />{" "}
          {/* Floating AI particles */}{" "}
          {Array.from({ length: 8 }).map((_, i) => (
            <motion.div
              key={i}
              animate={{
                y: [0, -30, 0],
                x: [0, Math.sin(i) * 20, 0],
                opacity: [0.3, 0.8, 0.3],
              }}
              transition={{
                duration: 8 + i * 0.8,
                repeat: Infinity,
                ease: "easeInOut",
                delay: i * 0.7,
              }}
              className="absolute w-1 h-1 bg-cyan-200 rounded-full"
              style={{ left: `${20 + i * 8}%`, top: `${30 + i * 5}%` }}
            />
          ))}{" "}
          {/* Subtle geometric grid */}{" "}
          <div className="absolute inset-0 opacity-10">
            {" "}
            <div
              className="w-full h-full"
              style={{
                backgroundImage: `                  linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px),                  linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)                `,
                backgroundSize: "60px 60px",
              }}
            />{" "}
          </div>{" "}
        </div>{" "}
        {/* Content */}{" "}
        <div className="relative z-10">
          {" "}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="flex items-center gap-3 mb-16"
          >
            {" "}
            <ElevaraLogoMark size={40} />{" "}
            <span className="text-2xl font-bold text-white tracking-tight">
              Elevara
            </span>{" "}
          </motion.div>{" "}
        </div>{" "}
        <div className="relative z-10 space-y-10">
          {" "}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.6 }}
          >
            {" "}
            <h2 className="text-5xl font-bold text-white leading-tight tracking-tight">
              {" "}
              Your career
              <br />
              growth starts
              <br />
              here.{" "}
            </h2>{" "}
            <p className="text-blue-100 mt-8 text-lg leading-relaxed font-light">
              {" "}
              AI-powered resume analysis, intelligent job matching, and
              personalized skill development ΓÇö all in one platform.{" "}
            </p>{" "}
          </motion.div>{" "}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.6 }}
            className="grid grid-cols-2 gap-4"
          >
            {" "}
            {[
              {
                icon: "≡ƒºá",
                label: "AI-Powered\nAnalysis",
                desc: "Advanced resume insights",
              },
              {
                icon: "≡ƒÄ»",
                label: "Smart Job\nMatching",
                desc: "Perfect role discovery",
              },
              {
                icon: "≡ƒôè",
                label: "Skill Gap\nDetection",
                desc: "Growth opportunities",
              },
              {
                icon: "≡ƒôê",
                label: "Career\nAnalytics",
                desc: "Progress tracking",
              },
            ].map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.35 + i * 0.08, duration: 0.5 }}
                className="group bg-white/10 backdrop-blur-md rounded-2xl p-5 border border-white/20 hover:bg-white/20 hover:border-white/30 transition-all duration-300 cursor-default hover:shadow-lg hover:shadow-white/10"
              >
                {" "}
                <motion.div
                  className="text-3xl mb-3 group-hover:scale-110 transition-transform duration-300"
                  whileHover={{ rotateY: 15, scale: 1.1 }}
                >
                  {" "}
                  {item.icon}{" "}
                </motion.div>{" "}
                <div className="text-blue-50 text-sm font-medium whitespace-pre-line leading-tight mb-1">
                  {item.label}
                </div>{" "}
                <div className="text-blue-200 text-xs opacity-80">
                  {item.desc}
                </div>{" "}
              </motion.div>
            ))}{" "}
          </motion.div>{" "}
        </div>{" "}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="relative z-10"
        >
          {" "}
          <p className="text-blue-200 text-xs font-medium tracking-wide">
            ┬⌐ 2026 Elevara. All rights reserved.
          </p>{" "}
        </motion.div>{" "}
      </div>{" "}
      {/* Right panel ΓÇö enhanced form */}{" "}
      <div className="flex-1 flex items-center justify-center p-4 md:p-6 bg-gradient-to-br from-[#2563EB]/80 via-[#1D4ED8]/80 to-[#1E40AF]/80 backdrop-blur-sm">
        {" "}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="w-full max-w-md bg-white rounded-2xl p-6 shadow-2xl"
        >
          {" "}
          {/* Mobile logo */}{" "}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.4 }}
            className="flex items-center gap-3 mb-2 lg:hidden"
          >
            {" "}
            <ElevaraLogoMark size={32} />{" "}
            <span className="text-2xl font-bold text-[#1E293B]">
              Elevara
            </span>{" "}
          </motion.div>{" "}
          {/* Header */}{" "}
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1, duration: 0.4 }}
            className="mb-5"
          >
            {" "}
            <h1 className="text-3xl font-bold text-[#1E293B] tracking-tight">
              Welcome back
            </h1>{" "}
            <p className="text-[#64748B] mt-1.5 text-sm font-light leading-snug">
              Sign in to your account to continue your journey
            </p>{" "}
          </motion.div>{" "}
          {/* Main error message */}{" "}
          {errors.submit && (
            <motion.div
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-4 p-3 bg-[#FEF2F2] border border-[#FECACA] rounded-lg flex items-start gap-3"
            >
              {" "}
              <AlertCircle className="w-4 h-4 text-[#DC2626] flex-shrink-0 mt-0.5" />{" "}
              <p className="text-[#991B1B] text-xs font-medium">
                {errors.submit}
              </p>{" "}
            </motion.div>
          )}{" "}
          <motion.form
            onSubmit={handleSubmit}
            className="space-y-4"
            noValidate
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.15, duration: 0.4 }}
          >
            {" "}
            {/* Email Field */}{" "}
            <div className="space-y-1.5">
              {" "}
              <label
                htmlFor="email"
                className="label text-xs font-semibold text-[#1E293B]"
              >
                Email address
              </label>{" "}
              <div className="relative">
                {" "}
                <input
                  id="email"
                  type="email"
                  autoComplete="email"
                  placeholder="you@example.com"
                  className={cn(
                    "input input-lg w-full transition-all duration-200 rounded-xl",
                    validationState.email === "error" &&
                      "input-error border-[#EF4444] bg-[#FEF2F2]",
                    validationState.email === "valid" &&
                      "border-[#22C55E] bg-[#F0FDF4]",
                    !validationState.email && "border-[#E2E8F0]",
                    isLoading && "opacity-70",
                  )}
                  value={form.email}
                  onChange={(e) => handleEmailChange(e.target.value)}
                  onBlur={handleEmailBlur}
                  disabled={isLoading}
                />{" "}
                {validationState.email === "error" && (
                  <AlertCircle className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#EF4444]" />
                )}{" "}
                {validationState.email === "valid" && (
                  <CheckCircle2 className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#22C55E]" />
                )}{" "}
              </div>{" "}
              {errors.email && (
                <motion.p
                  initial={{ opacity: 0, y: -4 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-sm text-[#EF4444] font-medium flex items-center gap-1.5"
                >
                  {" "}
                  <AlertCircle className="w-3.5 h-3.5" /> {errors.email}{" "}
                </motion.p>
              )}{" "}
            </div>{" "}
            {/* Password Field */}{" "}
            <div className="space-y-1.5">
              {" "}
              <div className="flex items-center justify-between">
                {" "}
                <label
                  htmlFor="password"
                  className="label text-xs font-semibold text-[#1E293B] mb-0"
                >
                  Password
                </label>{" "}
                <Link
                  to="/forgot-password"
                  className="text-xs text-[#2563EB] hover:text-[#1D4ED8] hover:underline font-semibold transition-colors"
                >
                  {" "}
                  Forgot?{" "}
                </Link>{" "}
              </div>{" "}
              <div className="relative">
                {" "}
                <input
                  id="password"
                  type={showPw ? "text" : "password"}
                  autoComplete="current-password"
                  placeholder="ΓÇóΓÇóΓÇóΓÇóΓÇóΓÇóΓÇóΓÇó"
                  className={cn(
                    "input input-lg w-full pr-14 transition-all duration-200 rounded-xl",
                    validationState.password === "error" &&
                      "input-error border-[#EF4444] bg-[#FEF2F2]",
                    validationState.password === "valid" &&
                      "border-[#22C55E] bg-[#F0FDF4]",
                    !validationState.password && "border-[#E2E8F0]",
                    isLoading && "opacity-70",
                  )}
                  value={form.password}
                  onChange={(e) => handlePasswordChange(e.target.value)}
                  onBlur={handlePasswordBlur}
                  disabled={isLoading}
                />{" "}
                <motion.button
                  type="button"
                  onClick={() => setShowPw((v) => !v)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-[#94A3B8] hover:text-[#64748B] transition-colors p-1 hover:bg-[#F5F7FA] rounded-lg"
                  aria-label={showPw ? "Hide password" : "Show password"}
                  tabIndex={-1}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {" "}
                  {showPw ? (
                    <EyeOff className="w-5 h-5" />
                  ) : (
                    <Eye className="w-5 h-5" />
                  )}{" "}
                </motion.button>{" "}
                {validationState.password === "error" && (
                  <AlertCircle className="absolute right-14 top-1/2 -translate-y-1/2 w-5 h-5 text-[#EF4444]" />
                )}{" "}
                {validationState.password === "valid" && (
                  <CheckCircle2 className="absolute right-14 top-1/2 -translate-y-1/2 w-5 h-5 text-[#22C55E]" />
                )}{" "}
              </div>{" "}
              {errors.password && (
                <motion.p
                  initial={{ opacity: 0, y: -4 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-sm text-[#EF4444] font-medium flex items-center gap-1.5"
                >
                  {" "}
                  <AlertCircle className="w-3.5 h-3.5" /> {errors.password}{" "}
                </motion.p>
              )}{" "}
            </div>{" "}
            {/* Remember me */}{" "}
            <motion.label
              className="flex items-center gap-3 cursor-pointer hover:opacity-80 transition-opacity py-0.5"
              whileHover={{ x: 2 }}
            >
              {" "}
              <input
                type="checkbox"
                className="w-4 h-4 rounded border-[#E2E8F0] text-[#2563EB] accent-[#2563EB] cursor-pointer transition-transform hover:scale-110"
                checked={form.remember}
                onChange={(e) =>
                  setForm((p) => ({ ...p, remember: e.target.checked }))
                }
                disabled={isLoading}
              />{" "}
              <span className="text-xs text-[#475569] font-medium">
                Keep me signed in
              </span>{" "}
            </motion.label>{" "}
            {/* Sign in button with enhanced states */}{" "}
            <motion.button
              type="submit"
              disabled={isLoading || !form.email || !form.password}
              whileHover={
                !isLoading && form.email && form.password
                  ? { y: -2, scale: 1.01 }
                  : {}
              }
              whileTap={
                !isLoading && form.email && form.password ? { scale: 0.98 } : {}
              }
              className={cn(
                "btn-primary btn-lg w-full flex items-center justify-center gap-2.5 font-semibold rounded-xl transition-all duration-200 relative overflow-hidden",
                isLoading && "opacity-90 cursor-not-allowed",
                !isLoading &&
                  form.email &&
                  form.password &&
                  "hover:shadow-lg hover:shadow-blue-200 bg-gradient-to-r from-[#2563EB] to-[#1D4ED8]",
                (!form.email || !form.password) &&
                  "opacity-50 cursor-not-allowed bg-gray-400",
              )}
            >
              {" "}
              {isLoading ? (
                <>
                  {" "}
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{
                      duration: 1,
                      repeat: Infinity,
                      ease: "linear",
                    }}
                  >
                    {" "}
                    <Loader2 className="w-5 h-5" />{" "}
                  </motion.div>{" "}
                  <span>Signing in...</span>{" "}
                </>
              ) : (
                <>
                  {" "}
                  <Lock className="w-5 h-5" /> <span>Sign in to Elevara</span>{" "}
                  <motion.div
                    animate={{ x: [0, 3, 0] }}
                    transition={{ duration: 2, repeat: Infinity, delay: 1 }}
                  >
                    {" "}
                    <ArrowRight className="w-5 h-5" />{" "}
                  </motion.div>{" "}
                </>
              )}{" "}
              {/* Hover gradient overlay */}{" "}
              {!isLoading && form.email && form.password && (
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-[#1D4ED8] to-[#1E40AF] opacity-0"
                  whileHover={{ opacity: 1 }}
                  transition={{ duration: 0.2 }}
                />
              )}{" "}
            </motion.button>{" "}
          </motion.form>{" "}
          {/* Divider */}{" "}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.4 }}
            className="flex items-center gap-3 my-5"
          >
            {" "}
            <div className="flex-1 h-px bg-gradient-to-r from-[#E2E8F0] to-transparent" />{" "}
            <span className="text-xs text-[#94A3B8] font-semibold uppercase tracking-widest">
              or continue with
            </span>{" "}
            <div className="flex-1 h-px bg-gradient-to-l from-[#E2E8F0] to-transparent" />{" "}
          </motion.div>{" "}
          {/* OAuth Buttons */}{" "}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.25, duration: 0.4 }}
            className="grid grid-cols-2 gap-2"
          >
            {" "}
            {/* Google Button */}{" "}
            <motion.button
              type="button"
              whileHover={{ y: -2 }}
              whileTap={{ scale: 0.98 }}
              onClick={handleGoogleOAuth}
              className="btn-secondary btn-lg w-full relative flex items-center justify-center gap-2 rounded-xl font-medium bg-white border border-[#E5E7EB] text-[#1E293B] hover:bg-[#F9FAFB] transition-all"
            >
              {" "}
              <svg className="w-4 h-4" viewBox="0 0 24 24">
                {" "}
                <path
                  fill="#4285F4"
                  d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                />{" "}
                <path
                  fill="#34A853"
                  d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                />{" "}
                <path
                  fill="#FBBC05"
                  d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                />{" "}
                <path
                  fill="#EA4335"
                  d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                />{" "}
              </svg>{" "}
              <span className="text-xs font-semibold">Google</span>{" "}
            </motion.button>{" "}
            {/* GitHub Button */}{" "}
            <motion.button
              type="button"
              whileHover={{ y: -2 }}
              whileTap={{ scale: 0.98 }}
              onClick={handleGitHubOAuth}
              className="btn-secondary btn-lg w-full relative flex items-center justify-center gap-2 rounded-xl font-medium bg-white border border-[#E5E7EB] text-[#1E293B] hover:bg-[#F9FAFB] transition-all"
            >
              {" "}
              <svg className="w-4 h-4 fill-[#1E293B]" viewBox="0 0 24 24">
                {" "}
                <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v 3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />{" "}
              </svg>{" "}
              <span className="text-xs font-semibold">GitHub</span>{" "}
            </motion.button>{" "}
          </motion.div>{" "}
          {/* Sign up link */}{" "}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.4 }}
            className="text-center text-xs text-[#64748B] mt-4"
          >
            {" "}
            Don't have an account?{" "}
            <Link
              to="/register"
              className="text-[#2563EB] font-bold hover:text-[#1D4ED8] hover:underline transition-colors"
            >
              {" "}
              Create one free{" "}
            </Link>{" "}
          </motion.p>{" "}
          {/* Premium demo section */}{" "}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.35, duration: 0.4 }}
            className="mt-4 p-4 bg-gradient-to-br from-[#EFF6FF] via-[#F0F4F8] to-[#ECFEFF] rounded-xl border border-[#BFDBFE] hover:border-[#2563EB] transition-all duration-300 hover:shadow-lg hover:shadow-blue-100"
          >
            {" "}
            <p className="text-xs font-bold text-[#0C4A6E] uppercase tracking-widest mb-3 text-center">
              Quick Demo
            </p>{" "}
            <div className="grid grid-cols-2 gap-2">
              {" "}
              <motion.button
                type="button"
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                onClick={handleDemoSeeker}
                className="px-3 py-2 bg-gradient-to-br from-[#3B82F6] to-[#2563EB] text-white text-xs font-bold rounded-lg hover:shadow-lg hover:shadow-blue-300 transition-all duration-200 tracking-wide"
              >
                {" "}
                Seeker Demo{" "}
              </motion.button>{" "}
              <motion.button
                type="button"
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                onClick={handleDemoRecruiter}
                className="px-3 py-2 bg-gradient-to-br from-[#06B6D4] to-[#0891B2] text-white text-xs font-bold rounded-lg hover:shadow-lg hover:shadow-cyan-300 transition-all duration-200 tracking-wide"
              >
                {" "}
                Recruiter Demo{" "}
              </motion.button>{" "}
            </div>{" "}
          </motion.div>{" "}
        </motion.div>{" "}
      </div>{" "}
    </div>
  );
}
