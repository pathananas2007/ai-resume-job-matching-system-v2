import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "motion/react";
import {
  Eye,
  EyeOff,
  Loader2,
  ArrowRight,
  User,
  Briefcase,
  Check,
  CheckCircle2,
  AlertCircle,
} from "lucide-react";
import { useAuthStore } from "../../store/authStore";
import { useToast } from "../../components/ui/Toast";
import { cn } from "../../lib/utils";
import type { UserRole, User as AppUser } from "../../types";
import { ElevaraLogoMark } from "../../components/ui/ElevaraLogo";
import { authApi } from "../../services/api/authApi";
import { userApi } from "../../services/api/userApi";
export default function RegisterPage() {
  const navigate = useNavigate();
  const { setUser, setLoading, isLoading } = useAuthStore();
  const { toast } = useToast();
  const [step, setStep] = useState<1 | 2>(1);
  const [role, setRole] = useState<UserRole | null>(null);
  const [showPw, setShowPw] = useState(false);
  const [touched, setTouched] = useState<Record<string, boolean>>({});
  const [validationState, setValidationState] = useState<
    Record<string, "valid" | "error" | null>
  >({});
  const [form, setForm] = useState({
    full_name: "",
    email: "",
    password: "",
    confirm_password: "",
    company_name: "",
    agree: false,
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  /* Validation regex */ const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const validateFullName = (name: string): string | null => {
    if (!name.trim()) return "Full name is required.";
    return null;
  };
  const validateEmail = (email: string): string | null => {
    if (!email.trim()) return "Email is required.";
    if (!emailRegex.test(email)) return "Enter a valid email address.";
    return null;
  };
  const validatePassword = (password: string): string | null => {
    if (!password) return "Password is required.";
    if (password.length < 8) return "Password must be at least 8 characters.";
    return null;
  };
  const validatePasswordMatch = (
    pwd: string,
    confirm: string,
  ): string | null => {
    if (pwd !== confirm) return "Passwords do not match.";
    return null;
  };
  const validateCompanyName = (name: string): string | null => {
    if (role === "recruiter" && !name.trim())
      return "Company name is required.";
    return null;
  };
  const handleFieldChange = (field: string, value: any) => {
    setForm((p) => ({ ...p, [field]: value }));
    if (touched[field]) {
      updateFieldValidation(field, value);
    }
  };
  const updateFieldValidation = (field: string, value: any) => {
    let error: string | null = null;
    switch (field) {
      case "full_name":
        error = validateFullName(value);
        break;
      case "email":
        error = validateEmail(value);
        break;
      case "password":
        error = validatePassword(value);
        break;
      case "confirm_password":
        error = validatePasswordMatch(form.password, value);
        break;
      case "company_name":
        error = validateCompanyName(value);
        break;
    }
    setErrors((p) => ({ ...p, [field]: error || undefined }));
    setValidationState((p) => ({
      ...p,
      [field]: error ? "error" : value && !error ? "valid" : null,
    }));
  };
  const handleFieldBlur = (field: string) => {
    setTouched((p) => ({ ...p, [field]: true }));
    updateFieldValidation(field, form[field as keyof typeof form]);
  };
  const validateStep1 = () => {
    if (!role) {
      toast("Please select your role", "warning");
      return false;
    }
    return true;
  };
  const validateStep2 = () => {
    const e: Record<string, string> = {};
    const nameError = validateFullName(form.full_name);
    const emailError = validateEmail(form.email);
    const passwordError = validatePassword(form.password);
    const confirmError = validatePasswordMatch(
      form.password,
      form.confirm_password,
    );
    const companyError = validateCompanyName(form.company_name);
    if (nameError) e.full_name = nameError;
    if (emailError) e.email = emailError;
    if (passwordError) e.password = passwordError;
    if (confirmError) e.confirm_password = confirmError;
    if (companyError) e.company_name = companyError;
    if (!form.agree) e.agree = "You must accept the terms.";
    setErrors(e);
    setValidationState({
      full_name: nameError ? "error" : "valid",
      email: emailError ? "error" : "valid",
      password: passwordError ? "error" : "valid",
      confirm_password: confirmError ? "error" : "valid",
      company_name: companyError ? "error" : "valid",
    });
    return Object.keys(e).length === 0;
  };
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateStep2()) return;
    setLoading(true);
    setErrors({});
    /* Clear previous errors */ try {
      /* 1. Register with backend */ const tokenResponse =
        await authApi.register({
          full_name: form.full_name,
          email: form.email,
          password: form.password,
          role: role || "seeker",
        });
      /* 2. Store token in authStore IMMEDIATELY so subsequent API calls use it */ const {
        setUser: setUserInStore,
      } = useAuthStore.getState();
      setUserInStore(
        {
          id: "",
          email: "",
          full_name: "",
          role: role || "seeker",
          is_verified: true,
          created_at: "",
        },
        tokenResponse.access_token,
      );
      /* 3. Fetch the authenticated user's data (now with token available in authStore) */ const userResponse =
        await userApi.getMe();
      /* 4. Transform API user to app User type */ const appUser: AppUser = {
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
        `Welcome, ${appUser.full_name}!`,
        "success",
        "Account created successfully",
      );
      /* 6. Navigate to appropriate dashboard based on backend role */ navigate(
        appUser.role === "recruiter"
          ? "/recruiter/dashboard"
          : "/seeker/dashboard",
      );
    } catch (err: any) {
      console.error("Registration error:", err);
      /* Log for debugging */ /* Map backend errors to clean messages */ let errorMessage =
        "Unable to create account. Please try again.";
      if (
        err?.error?.code === "NETWORK_ERROR" ||
        err?.message?.includes("network") ||
        err?.message?.includes("fetch")
      ) {
        errorMessage = "Unable to connect to the server. Please try again.";
      } else if (err?.error?.message?.includes("already")) {
        errorMessage = "An account with this email already exists.";
      } else if (err?.error?.message?.includes("email")) {
        errorMessage = "Invalid email address.";
      } else if (err?.error?.message?.includes("password")) {
        errorMessage = "Password does not meet requirements.";
      }
      setErrors({ submit: errorMessage });
      toast(errorMessage, "error");
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="min-h-screen bg-[#0f172a] flex items-center justify-center p-6 md:p-8 relative overflow-hidden">
      {/* Animated background */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Radial glows */}
        <motion.div animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.5, 0.3] }} transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }} className="absolute top-[-20%] left-[-10%] w-[600px] h-[600px] rounded-full" style={{ background: "radial-gradient(circle, rgba(37,99,235,0.2) 0%, transparent 70%)" }} />
        <motion.div animate={{ scale: [1.2, 1, 1.2], opacity: [0.2, 0.4, 0.2] }} transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay: 2 }} className="absolute bottom-[-20%] right-[-10%] w-[500px] h-[500px] rounded-full" style={{ background: "radial-gradient(circle, rgba(6,182,212,0.15) 0%, transparent 70%)" }} />
        <motion.div animate={{ scale: [1, 1.3, 1], opacity: [0.15, 0.3, 0.15] }} transition={{ duration: 12, repeat: Infinity, ease: "easeInOut", delay: 4 }} className="absolute top-[40%] right-[10%] w-[400px] h-[400px] rounded-full" style={{ background: "radial-gradient(circle, rgba(37,99,235,0.15) 0%, transparent 70%)" }} />
        {/* Mesh grid */}
        <div className="absolute inset-0 opacity-[0.04]" style={{ backgroundImage: "linear-gradient(rgba(99,179,237,1) 1px, transparent 1px), linear-gradient(90deg, rgba(99,179,237,1) 1px, transparent 1px)", backgroundSize: "60px 60px" }} />
        {/* Floating particles */}
        {[...Array(12)].map((_, i) => (
          <motion.div key={i} className="absolute rounded-full"
            style={{ width: 2 + (i % 3), height: 2 + (i % 3), left: `${8 + i * 7}%`, top: `${10 + (i * 13) % 80}%`, background: i % 2 === 0 ? "rgba(37,99,235,0.7)" : "rgba(6,182,212,0.7)" }}
            animate={{ y: [0, -20, 0], opacity: [0.4, 0.8, 0.4] }}
            transition={{ duration: 5 + i * 0.6, repeat: Infinity, ease: "easeInOut", delay: i * 0.4 }}
          />
        ))}
      </div>
      {" "}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-2xl"
      >
        {" "}
        {/* Header */}{" "}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.4 }}
          className="flex items-center gap-3 mb-10"
        >
          {" "}
          <ElevaraLogoMark size={36} />{" "}
          <span className="text-2xl font-bold text-white">
            Elevara
          </span>{" "}
        </motion.div>{" "}
        {/* Progress indicator */}{" "}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.05, duration: 0.4 }}
          className="flex items-center gap-3 mb-10"
        >
          {" "}
          {[1, 2].map((s) => (
            <div key={s} className="flex items-center gap-3 flex-1">
              {" "}
              <motion.div
                layout
                className={cn(
                  "w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold shrink-0 transition-all duration-300",
                  step > s
                    ? "bg-[#22C55E] text-white shadow-lg shadow-green-200"
                    : step === s
                      ? "bg-gradient-to-br from-[#2563EB] to-[#1D4ED8] text-white shadow-lg shadow-blue-200"
                      : "bg-[#E2E8F0] text-slate-500",
                )}
              >
                {" "}
                {step > s ? <Check className="w-5 h-5" /> : s}{" "}
              </motion.div>{" "}
              <span
                className={cn(
                  "text-sm font-semibold transition-colors duration-200",
                  step >= s ? "text-white" : "text-slate-500",
                )}
              >
                {" "}
                {s === 1 ? "Select role" : "Your details"}{" "}
              </span>{" "}
              {s < 2 && (
                <div
                  className={cn(
                    "flex-1 h-1 rounded-full transition-colors duration-300",
                    step > s ? "bg-[#22C55E]" : "bg-slate-600",
                  )}
                />
              )}{" "}
            </div>
          ))}{" "}
        </motion.div>{" "}
        {/* Card container */}{" "}
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1, duration: 0.4 }}
          className="bg-slate-800 rounded-2xl shadow-xl border border-slate-700 p-8 md:p-10"
        >
          {" "}
          <AnimatePresence mode="wait">
            {" "}
            {step === 1 ? (
              <motion.div
                key="step1"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                transition={{ duration: 0.3 }}
                className="space-y-8"
              >
                {" "}
                <div>
                  {" "}
                  <h1 className="text-3xl font-bold text-white">
                    I am a...
                  </h1>{" "}
                  <p className="text-slate-400 mt-2 text-base font-light">
                    Choose your role to get started
                  </p>{" "}
                </div>{" "}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {" "}
                  {[
                    {
                      value: "seeker" as UserRole,
                      icon: User,
                      title: "Job Seeker",
                      desc: "Find jobs, analyze your resume, grow your skills",
                      color: "from-blue-500 to-cyan-500",
                    },
                    {
                      value: "recruiter" as UserRole,
                      icon: Briefcase,
                      title: "Recruiter",
                      desc: "Post jobs, rank candidates, streamline hiring",
                      color: "from-cyan-500 to-teal-500",
                    },
                  ].map((opt) => (
                    <motion.button
                      key={opt.value}
                      type="button"
                      onClick={() => setRole(opt.value)}
                      whileHover={{ y: -4 }}
                      whileTap={{ scale: 0.98 }}
                      className={cn(
                        "p-6 rounded-2xl border-2 text-left transition-all duration-300 relative overflow-hidden group",
                        role === opt.value
                          ? "border-blue-500 bg-blue-500/10 shadow-lg shadow-blue-900/40"
                          : "border-slate-600 bg-slate-700 hover:border-blue-500 hover:shadow-lg hover:shadow-blue-900/30",
                      )}
                    >
                      {" "}
                      {/* Gradient background for selected state */}{" "}
                      {role === opt.value && (
                        <div
                          className={cn(
                            "absolute inset-0 opacity-5 bg-gradient-to-br",
                            opt.color,
                          )}
                        />
                      )}{" "}
                      <div className="relative z-10 space-y-3">
                        {" "}
                        <motion.div
                          animate={
                            role === opt.value
                              ? { scale: 1.1, rotate: 5 }
                              : { scale: 1, rotate: 0 }
                          }
                          className={cn(
                            "w-12 h-12 rounded-xl flex items-center justify-center transition-all",
                            role === opt.value
                              ? `bg-gradient-to-br ${opt.color}`
                              : "bg-slate-700 group-hover:bg-blue-500/10",
                          )}
                        >
                          {" "}
                          <opt.icon
                            className={cn(
                              "w-6 h-6 transition-colors",
                              role === opt.value
                                ? "text-white"
                                : "text-slate-400 group-hover:text-[#2563EB]",
                            )}
                          />{" "}
                        </motion.div>{" "}
                        <p
                          className={cn(
                            "font-bold text-base transition-colors",
                            role === opt.value
                              ? "text-[#2563EB]"
                              : "text-white",
                          )}
                        >
                          {" "}
                          {opt.title}{" "}
                        </p>{" "}
                        <p className="text-sm text-slate-400 leading-snug">
                          {opt.desc}
                        </p>{" "}
                      </div>{" "}
                    </motion.button>
                  ))}{" "}
                </div>{" "}
                <motion.button
                  type="button"
                  onClick={() => {
                    if (validateStep1()) setStep(2);
                  }}
                  whileHover={{ y: -2 }}
                  whileTap={{ scale: 0.98 }}
                  className="btn-primary btn-lg w-full flex items-center justify-center gap-2 font-bold rounded-xl bg-gradient-to-r from-[#2563EB] to-[#1D4ED8] hover:shadow-lg hover:shadow-blue-200 transition-all"
                >
                  {" "}
                  Continue <ArrowRight className="w-5 h-5" />{" "}
                </motion.button>{" "}
              </motion.div>
            ) : (
              <motion.form
                key="step2"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                onSubmit={handleSubmit}
                className="space-y-6"
                noValidate
              >
                {" "}
                <div className="flex items-center justify-between">
                  {" "}
                  <div>
                    {" "}
                    <h1 className="text-3xl font-bold text-white">
                      Create your account
                    </h1>{" "}
                    <p className="text-slate-400 mt-2 text-base font-light">
                      {" "}
                      Registering as a{" "}
                      <span className="font-semibold text-[#2563EB] capitalize">
                        {role}
                      </span>{" "}
                    </p>{" "}
                  </div>{" "}
                  <motion.button
                    type="button"
                    onClick={() => setStep(1)}
                    className="text-xs text-[#2563EB] hover:text-[#1D4ED8] font-bold hover:underline transition-colors"
                    whileHover={{ x: -2 }}
                  >
                    {" "}
                    Change{" "}
                  </motion.button>{" "}
                </div>{" "}
                {/* Submit error */}{" "}
                {errors.submit && (
                  <motion.div
                    initial={{ opacity: 0, y: -8 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="p-4 bg-[#FEF2F2] border border-[#FECACA] rounded-xl flex items-start gap-3"
                  >
                    {" "}
                    <AlertCircle className="w-5 h-5 text-[#DC2626] flex-shrink-0 mt-0.5" />{" "}
                    <p className="text-[#991B1B] text-sm font-medium">
                      {errors.submit}
                    </p>{" "}
                  </motion.div>
                )}{" "}
                {/* Full name */}{" "}
                <div className="space-y-2">
                  {" "}
                  <label
                    htmlFor="full_name"
                    className="label text-slate-300 text-sm font-semibold text-white"
                  >
                    Full name
                  </label>{" "}
                  <div className="relative">
                    {" "}
                    <input
                      id="full_name"
                      type="text"
                      placeholder="Jane Smith"
                      className={cn(
                        "input input-lg w-full bg-slate-700 border-slate-600 text-white placeholder:text-slate-400 transition-all duration-200 rounded-xl",
                        validationState.full_name === "error" &&
                          "input-error border-[#EF4444] bg-[#FEF2F2]",
                        validationState.full_name === "valid" &&
                          "border-[#22C55E] bg-[#F0FDF4]",
                        !validationState.full_name && "border-[#E2E8F0]",
                        isLoading && "opacity-70",
                      )}
                      value={form.full_name}
                      onChange={(e) =>
                        handleFieldChange("full_name", e.target.value)
                      }
                      onBlur={() => handleFieldBlur("full_name")}
                      disabled={isLoading}
                    />{" "}
                    {validationState.full_name === "error" && (
                      <AlertCircle className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#EF4444]" />
                    )}{" "}
                    {validationState.full_name === "valid" && (
                      <CheckCircle2 className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#22C55E]" />
                    )}{" "}
                  </div>{" "}
                  {errors.full_name && (
                    <motion.p
                      initial={{ opacity: 0, y: -4 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="text-sm text-[#EF4444] font-medium flex items-center gap-1.5"
                    >
                      {" "}
                      <AlertCircle className="w-3.5 h-3.5" />{" "}
                      {errors.full_name}{" "}
                    </motion.p>
                  )}{" "}
                </div>{" "}
                {/* Email */}{" "}
                <div className="space-y-2">
                  {" "}
                  <label
                    htmlFor="reg-email"
                    className="label text-slate-300 text-sm font-semibold text-white"
                  >
                    Email address
                  </label>{" "}
                  <div className="relative">
                    {" "}
                    <input
                      id="reg-email"
                      type="email"
                      placeholder="you@example.com"
                      className={cn(
                        "input input-lg w-full bg-slate-700 border-slate-600 text-white placeholder:text-slate-400 transition-all duration-200 rounded-xl",
                        validationState.email === "error" &&
                          "input-error border-[#EF4444] bg-[#FEF2F2]",
                        validationState.email === "valid" &&
                          "border-[#22C55E] bg-[#F0FDF4]",
                        !validationState.email && "border-[#E2E8F0]",
                        isLoading && "opacity-70",
                      )}
                      value={form.email}
                      onChange={(e) =>
                        handleFieldChange("email", e.target.value)
                      }
                      onBlur={() => handleFieldBlur("email")}
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
                      <AlertCircle className="w-3.5 h-3.5" />{" "}
                      {errors.email}{" "}
                    </motion.p>
                  )}{" "}
                </div>{" "}
                {/* Company name for recruiter */}{" "}
                {role === "recruiter" && (
                  <div className="space-y-2">
                    {" "}
                    <label
                      htmlFor="company_name"
                      className="label text-slate-300 text-sm font-semibold text-white"
                    >
                      Company name
                    </label>{" "}
                    <div className="relative">
                      {" "}
                      <input
                        id="company_name"
                        type="text"
                        placeholder="Acme Corp"
                        className={cn(
                          "input input-lg w-full bg-slate-700 border-slate-600 text-white placeholder:text-slate-400 transition-all duration-200 rounded-xl",
                          validationState.company_name === "error" &&
                            "input-error border-[#EF4444] bg-[#FEF2F2]",
                          validationState.company_name === "valid" &&
                            "border-[#22C55E] bg-[#F0FDF4]",
                          !validationState.company_name && "border-[#E2E8F0]",
                          isLoading && "opacity-70",
                        )}
                        value={form.company_name}
                        onChange={(e) =>
                          handleFieldChange("company_name", e.target.value)
                        }
                        onBlur={() => handleFieldBlur("company_name")}
                        disabled={isLoading}
                      />{" "}
                      {validationState.company_name === "error" && (
                        <AlertCircle className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#EF4444]" />
                      )}{" "}
                      {validationState.company_name === "valid" && (
                        <CheckCircle2 className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#22C55E]" />
                      )}{" "}
                    </div>{" "}
                    {errors.company_name && (
                      <motion.p
                        initial={{ opacity: 0, y: -4 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-sm text-[#EF4444] font-medium flex items-center gap-1.5"
                      >
                        {" "}
                        <AlertCircle className="w-3.5 h-3.5" />{" "}
                        {errors.company_name}{" "}
                      </motion.p>
                    )}{" "}
                  </div>
                )}{" "}
                {/* Password */}{" "}
                <div className="space-y-2">
                  {" "}
                  <label
                    htmlFor="reg-password"
                    className="label text-slate-300 text-sm font-semibold text-white"
                  >
                    Password
                  </label>{" "}
                  <div className="relative">
                    {" "}
                    <input
                      id="reg-password"
                      type={showPw ? "text" : "password"}
                      placeholder="Min. 8 characters"
                      className={cn(
                        "input input-lg w-full bg-slate-700 border-slate-600 text-white placeholder:text-slate-400 pr-14 transition-all duration-200 rounded-xl",
                        validationState.password === "error" &&
                          "input-error border-[#EF4444] bg-[#FEF2F2]",
                        validationState.password === "valid" &&
                          "border-[#22C55E] bg-[#F0FDF4]",
                        !validationState.password && "border-[#E2E8F0]",
                        isLoading && "opacity-70",
                      )}
                      value={form.password}
                      onChange={(e) =>
                        handleFieldChange("password", e.target.value)
                      }
                      onBlur={() => handleFieldBlur("password")}
                      disabled={isLoading}
                    />{" "}
                    <motion.button
                      type="button"
                      onClick={() => setShowPw((v) => !v)}
                      className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-500 hover:text-slate-400 transition-colors p-1 hover:bg-slate-700 rounded-lg"
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
                      <AlertCircle className="w-3.5 h-3.5" />{" "}
                      {errors.password}{" "}
                    </motion.p>
                  )}{" "}
                </div>{" "}
                {/* Confirm password */}{" "}
                <div className="space-y-2">
                  {" "}
                  <label
                    htmlFor="confirm_password"
                    className="label text-slate-300 text-sm font-semibold text-white"
                  >
                    Confirm password
                  </label>{" "}
                  <div className="relative">
                    {" "}
                    <input
                      id="confirm_password"
                      type="password"
                      placeholder="Repeat password"
                      className={cn(
                        "input input-lg w-full bg-slate-700 border-slate-600 text-white placeholder:text-slate-400 transition-all duration-200 rounded-xl",
                        validationState.confirm_password === "error" &&
                          "input-error border-[#EF4444] bg-[#FEF2F2]",
                        validationState.confirm_password === "valid" &&
                          "border-[#22C55E] bg-[#F0FDF4]",
                        !validationState.confirm_password && "border-[#E2E8F0]",
                        isLoading && "opacity-70",
                      )}
                      value={form.confirm_password}
                      onChange={(e) =>
                        handleFieldChange("confirm_password", e.target.value)
                      }
                      onBlur={() => handleFieldBlur("confirm_password")}
                      disabled={isLoading}
                    />{" "}
                    {validationState.confirm_password === "error" && (
                      <AlertCircle className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#EF4444]" />
                    )}{" "}
                    {validationState.confirm_password === "valid" && (
                      <CheckCircle2 className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#22C55E]" />
                    )}{" "}
                  </div>{" "}
                  {errors.confirm_password && (
                    <motion.p
                      initial={{ opacity: 0, y: -4 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="text-sm text-[#EF4444] font-medium flex items-center gap-1.5"
                    >
                      {" "}
                      <AlertCircle className="w-3.5 h-3.5" />{" "}
                      {errors.confirm_password}{" "}
                    </motion.p>
                  )}{" "}
                </div>{" "}
                {/* Terms checkbox */}{" "}
                <motion.label
                  className="flex items-start gap-3 cursor-pointer hover:opacity-80 transition-opacity py-1"
                  whileHover={{ x: 2 }}
                >
                  {" "}
                  <input
                    type="checkbox"
                    className="mt-1 w-5 h-5 rounded border-[#E2E8F0] text-[#2563EB] accent-[#2563EB] cursor-pointer transition-transform hover:scale-110"
                    checked={form.agree}
                    onChange={(e) =>
                      handleFieldChange("agree", e.target.checked)
                    }
                    disabled={isLoading}
                  />{" "}
                  <span className="text-sm text-slate-400 font-medium leading-relaxed">
                    {" "}
                    I agree to the{" "}
                    <a className="text-[#2563EB] hover:underline cursor-pointer font-semibold">
                      {" "}
                      Terms of Service{" "}
                    </a>{" "}
                    and{" "}
                    <a className="text-[#2563EB] hover:underline cursor-pointer font-semibold">
                      {" "}
                      Privacy Policy{" "}
                    </a>{" "}
                  </span>{" "}
                </motion.label>{" "}
                {errors.agree && (
                  <motion.p
                    initial={{ opacity: 0, y: -4 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-sm text-[#EF4444] font-medium flex items-center gap-1.5"
                  >
                    {" "}
                    <AlertCircle className="w-3.5 h-3.5" /> {errors.agree}{" "}
                  </motion.p>
                )}{" "}
                {/* Submit button */}{" "}
                <motion.button
                  type="submit"
                  disabled={isLoading || !form.agree}
                  whileHover={
                    !isLoading && form.agree ? { y: -2, scale: 1.01 } : {}
                  }
                  whileTap={!isLoading && form.agree ? { scale: 0.98 } : {}}
                  className={cn(
                    "btn-primary btn-lg w-full flex items-center justify-center gap-2 font-bold rounded-xl transition-all duration-200 relative overflow-hidden",
                    isLoading && "opacity-90 cursor-not-allowed",
                    !isLoading &&
                      form.agree &&
                      "hover:shadow-lg hover:shadow-blue-200 bg-gradient-to-r from-[#2563EB] to-[#1D4ED8]",
                    !form.agree && "opacity-50 cursor-not-allowed bg-gray-400",
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
                      <span>Creating account...</span>{" "}
                    </>
                  ) : (
                    <>
                      {" "}
                      <span>Create account</span>{" "}
                      <motion.div
                        animate={{ x: [0, 3, 0] }}
                        transition={{ duration: 2, repeat: Infinity, delay: 1 }}
                      >
                        {" "}
                        <ArrowRight className="w-5 h-5" />{" "}
                      </motion.div>{" "}
                    </>
                  )}{" "}
                </motion.button>{" "}
              </motion.form>
            )}{" "}
          </AnimatePresence>{" "}
        </motion.div>{" "}
        {/* Sign in link */}{" "}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.4 }}
          className="text-center text-sm text-slate-400 mt-8"
        >
          {" "}
          Already have an account?{" "}
          <Link
            to="/login"
            className="text-[#2563EB] font-bold hover:text-[#1D4ED8] hover:underline transition-colors"
          >
            {" "}
            Sign in{" "}
          </Link>{" "}
        </motion.p>{" "}
      </motion.div>{" "}
    </div>
  );
}
