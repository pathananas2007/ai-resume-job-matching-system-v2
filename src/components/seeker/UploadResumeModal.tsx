/** * @license * SPDX-License-Identifier: Apache-2.0 */ import React, {
  useState,
} from "react";
import { User } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import { db } from "../../lib/firebase";
import { extractTextFromPDF } from "../../lib/pdfParser";
import { parseResumeWithAI } from "../../services/geminiService";
import { UserProfile } from "../../types/index";
import { useToast } from "../../hooks/useToast";
import { motion } from "motion/react";
import { FileText, Loader2, CheckCircle, X, Upload } from "lucide-react";
import { cn } from "../../lib/utils";
interface UploadResumeModalProps {
  user: User;
  profile: UserProfile;
  onClose: () => void;
  onProfileUpdate?: (p: UserProfile) => void;
  customTitle?: string;
}
export default function UploadResumeModal({
  user,
  profile,
  onClose,
  onProfileUpdate,
  customTitle,
}: UploadResumeModalProps) {
  const { showToast } = useToast();
  const [isUploading, setIsUploading] = useState(false);
  const [activeTab, setActiveTab] = useState<"pdf" | "paste">("pdf");
  const [pastedText, setPastedText] = useState("");
  const [uploadError, setUploadError] = useState<string | null>(null);
  const [uploadSuccess, setUploadSuccess] = useState(false);
  const [selectedFileName, setSelectedFileName] = useState<string | null>(null);
  const [parseProgress, setParseProgress] = useState<string>("");
  const saveToFirestore = async (text: string) => {
    setParseProgress("Extracting skills with AI...");
    const parsedData = await parseResumeWithAI(text);
    setParseProgress("Saving to your profile...");
    const updatedProfile: UserProfile = {
      ...profile,
      resumeText: text,
      skills: parsedData.skills,
    };
    await setDoc(doc(db, "profiles", user.uid), updatedProfile, {
      merge: true,
    });
    onProfileUpdate?.(updatedProfile);
  };
  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (!file.name.toLowerCase().endsWith(".pdf")) {
      setUploadError("Only PDF files are supported.");
      return;
    }
    setSelectedFileName(file.name);
    setUploadError(null);
    setIsUploading(true);
    setParseProgress("Reading PDF...");
    try {
      const text = await extractTextFromPDF(file);
      if (!text || text.trim().length === 0) {
        setUploadError("Could not extract text. Try the Paste tab.");
        setIsUploading(false);
        setParseProgress("");
        return;
      }
      await saveToFirestore(text);
      setUploadSuccess(true);
      showToast("Resume uploaded successfully", "success");
      setTimeout(onClose, 1500);
    } catch (err: any) {
      setUploadError(err.message || "An unexpected error occurred.");
      showToast("Upload failed", "error");
    } finally {
      setIsUploading(false);
      setParseProgress("");
    }
  };
  const handlePasteParse = async () => {
    if (pastedText.trim().length < 50) return;
    setUploadError(null);
    setIsUploading(true);
    setParseProgress("Parsing resume text...");
    try {
      await saveToFirestore(pastedText.trim());
      setUploadSuccess(true);
      showToast("Resume saved successfully", "success");
      setTimeout(onClose, 1500);
    } catch (err: any) {
      setUploadError(err.message || "An unexpected error occurred.");
      showToast("Failed to save resume", "error");
    } finally {
      setIsUploading(false);
      setParseProgress("");
    }
  };
  return (
    <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-[300] flex items-center justify-center p-6">
      {" "}
      <motion.div
        initial={{ opacity: 0, scale: 0.96, y: 16 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.96, y: 16 }}
        transition={{ duration: 0.2 }}
        className="modern-card p-8 md:p-12 bg-white max-w-2xl w-full relative"
      >
        {" "}
        <button
          onClick={onClose}
          aria-label="Close upload modal"
          className="absolute top-6 right-6 text-slate-400 hover:text-slate-700 transition-colors"
        >
          {" "}
          <X size={20} />{" "}
        </button>{" "}
        <div className="mb-8">
          {" "}
          <p className="section-label mb-2">Identity Vector</p>{" "}
          <h2 className="text-4xl md:text-5xl font-black text-slate-900 leading-none mb-3">
            {" "}
            {customTitle || "Upload Resume"}{" "}
          </h2>{" "}
          <p className="text-slate-500 text-sm font-medium">
            {" "}
            Your resume is parsed by AI to extract skills and build your
            profile.{" "}
          </p>{" "}
        </div>{" "}
        <div className="flex bg-slate-100 p-1 mb-6">
          {" "}
          {(["pdf", "paste"] as const).map((tab) => (
            <button
              key={tab}
              onClick={() => {
                setActiveTab(tab);
                setUploadError(null);
              }}
              className={cn(
                "flex-1 py-2.5 px-4 text-[10px] font-bold uppercase tracking-widest transition-all",
                activeTab === tab
                  ? "bg-white shadow-sm border border-slate-100 text-slate-900"
                  : "text-slate-400 hover:text-slate-600",
              )}
            >
              {" "}
              {tab === "pdf" ? "≡ƒôä PDF Upload" : "Γ£Å∩╕Å Paste Text"}{" "}
            </button>
          ))}{" "}
        </div>{" "}
        {activeTab === "pdf" && (
          <label
            className={cn(
              "flex h-52 flex-col items-center justify-center gap-3 border-2 border-dashed cursor-pointer transition-colors",
              uploadSuccess
                ? "border-emerald-400 bg-emerald-50"
                : isUploading
                  ? "border-indigo-300 bg-indigo-50/40"
                  : selectedFileName
                    ? "border-indigo-400 bg-indigo-50/30"
                    : "border-slate-200 hover:border-indigo-400 hover:bg-indigo-50/20",
            )}
          >
            {" "}
            {isUploading ? (
              <>
                {" "}
                <Loader2
                  size={32}
                  className="text-indigo-600 animate-spin"
                />{" "}
                <span className="text-indigo-600 font-bold uppercase tracking-widest text-xs">
                  {parseProgress}
                </span>{" "}
              </>
            ) : uploadSuccess ? (
              <>
                {" "}
                <CheckCircle size={32} className="text-emerald-500" />{" "}
                <span className="text-emerald-600 font-black uppercase tracking-widest text-xs">
                  Resume synced!
                </span>{" "}
              </>
            ) : selectedFileName ? (
              <>
                {" "}
                <FileText size={32} className="text-indigo-600" />{" "}
                <span className="text-slate-700 font-bold text-sm truncate max-w-xs">
                  {selectedFileName}
                </span>{" "}
              </>
            ) : (
              <>
                {" "}
                <Upload size={32} className="text-slate-400" />{" "}
                <span className="text-slate-600 font-bold text-sm">
                  Drop PDF here or click to browse
                </span>{" "}
                <span className="text-slate-400 text-[10px] uppercase tracking-widest">
                  PDF files only
                </span>{" "}
              </>
            )}{" "}
            <input
              type="file"
              accept=".pdf"
              className="hidden"
              onChange={handleFileUpload}
              disabled={isUploading || uploadSuccess}
              aria-label="Upload PDF resume"
            />{" "}
          </label>
        )}{" "}
        {activeTab === "paste" && (
          <div className="flex flex-col gap-3">
            {" "}
            <textarea
              value={pastedText}
              onChange={(e) => setPastedText(e.target.value)}
              placeholder="Paste your resume text here..."
              disabled={isUploading || uploadSuccess}
              aria-label="Resume text"
              className="h-48 p-4 bg-slate-50 border border-slate-200 focus:border-indigo-500 focus:outline-none resize-none text-sm text-slate-700 transition-colors w-full font-medium"
            />{" "}
            <p className="text-[10px] text-slate-400 uppercase tracking-widest">
              {pastedText.length} characters
            </p>{" "}
            <button
              onClick={handlePasteParse}
              disabled={isUploading || pastedText.trim().length < 50}
              className="modern-btn-primary w-full flex items-center justify-center gap-2"
            >
              {" "}
              {isUploading ? (
                <>
                  <Loader2 size={16} className="animate-spin" />
                  <span>{parseProgress || "Processing..."}</span>
                </>
              ) : (
                <span>Parse &amp; Save Resume</span>
              )}{" "}
            </button>{" "}
          </div>
        )}{" "}
        {uploadError && (
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-4 p-4 bg-red-50 border border-red-200 text-red-600 text-xs font-bold uppercase tracking-widest"
          >
            {" "}
            ΓÜá {uploadError}{" "}
          </motion.div>
        )}{" "}
      </motion.div>{" "}
    </div>
  );
}
