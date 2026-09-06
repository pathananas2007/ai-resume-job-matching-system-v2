/* Standard API Error */
export interface ApiError {
  code: string;
  message: string;
  details?: any;
}

/* Standard API Response Wrapper */
export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: ApiError;
}

/* Map backend user schema to frontend */
export interface ApiUser {
  _id?: string;
  id?: string;
  email: string;
  full_name?: string;
  name?: string;
  role: string;
  is_active?: boolean;
  profile?: ApiUserProfile;
  created_at: string;
}

export interface ApiUserProfile {
  headline?: string;
  bio?: string;
  location?: string;
  skills?: string[];
  experience_years?: number;
}

/* ─── Resume API Types ─────────────────────────────────────── */
export type ResumeStatus = 'ACTIVE' | 'ARCHIVED';
export type ResumeAnalysisStatus = 'NOT_ANALYZED' | 'PENDING' | 'COMPLETED' | 'FAILED';

export interface ApiResume {
  _id: string;
  user_id: string;
  file_name: string;
  file_type: string;
  file_size: number;
  status: ResumeStatus;
  analysis_status: ResumeAnalysisStatus;
  analysis_id: string | null;
  uploaded_at: string;
  updated_at: string;
}

export interface ApiResumeListResponse {
  items: ApiResume[];
  page: number;
  page_size: number;
  total: number;
  total_pages: number;
}

export interface ApiResumeUploadResponse {
  message: string;
  resume_id: string;
}

export interface ApiResumeUpdate {
  file_name?: string;
  status?: ResumeStatus;
}

/* ─── Job API Types ────────────────────────────────────────── */
/** Mirrors backend JobResponse schema (snake_case) */
export interface ApiJob {
  _id: string;
  recruiter_id: string;
  company_name: string;
  title: string;
  description: string;
  location: string;
  work_mode: string;
  employment_type: string;
  experience_level: string;
  salary_min: number | null;
  salary_max: number | null;
  currency: string;
  skills: string[];
  industry: string;
  company_size: string | null;
  benefits: string[];
  application_deadline: string | null;
  is_active: boolean;
  created_at: string;
  updated_at: string;
  deactivated_at: string | null;
}

/** Mirrors backend JobListResponse */
export interface ApiJobListResponse {
  items: ApiJob[];
  page: number;
  page_size: number;
  total: number;
  total_pages: number;
}

/** Mirrors backend JobSearchParams as query params */
export interface ApiJobSearchParams {
  title?: string;
  company_name?: string;
  location?: string;
  work_mode?: string;
  employment_type?: string;
  experience_level?: string;
  industry?: string;
  skills?: string[];
  min_salary?: number;
  max_salary?: number;
  is_active?: boolean;
  posted_after?: string;
  posted_before?: string;
  page?: number;
  page_size?: number;
}

/** Mirrors backend JobCreate */
export interface ApiJobCreate {
  company_name: string;
  title: string;
  description: string;
  location: string;
  work_mode: string;
  employment_type: string;
  experience_level: string;
  salary_min?: number;
  salary_max?: number;
  currency?: string;
  skills?: string[];
  industry: string;
  company_size?: string;
  benefits?: string[];
  application_deadline?: string;
}

/** Mirrors backend JobUpdate */
export interface ApiJobUpdate {
  company_name?: string;
  title?: string;
  description?: string;
  location?: string;
  work_mode?: string;
  employment_type?: string;
  experience_level?: string;
  salary_min?: number;
  salary_max?: number;
  currency?: string;
  skills?: string[];
  industry?: string;
  company_size?: string;
  benefits?: string[];
  application_deadline?: string;
  is_active?: boolean;
}

/* ─── Application API Types ────────────────────────────────── */
/** Mirrors backend ApplicationStatus enum */
export type ApplicationStatus =
  | 'APPLIED'
  | 'UNDER_REVIEW'
  | 'SHORTLISTED'
  | 'INTERVIEW_SCHEDULED'
  | 'FINAL_ROUND'
  | 'SELECTED'
  | 'REJECTED'
  | 'WITHDRAWN';

/** Mirrors backend ApplicationResponse — recruiter_notes deliberately excluded */
export interface ApiApplication {
  _id: string;
  job_id: string;
  applicant_id: string;
  recruiter_id: string;
  status: ApplicationStatus;
  resume_id: string | null;
  cover_note: string | null;
  applicant_notes: string | null;
  match_score: number | null; // null until AI computes it
  interview_date: string | null;
  interview_time: string | null;
  interview_mode: string | null;
  interview_link: string | null;
  withdrawn_at: string | null;
  created_at: string;
  updated_at: string;
}

/** Mirrors backend ApplicationListResponse */
export interface ApiApplicationListResponse {
  items: ApiApplication[];
  page: number;
  page_size: number;
  total: number;
  total_pages: number;
}

/** Mirrors backend ApplicationCreate — applicant_id/recruiter_id are derived server-side */
export interface ApiApplicationCreate {
  job_id: string;
  resume_id?: string;
  cover_note?: string;
}

/** Mirrors backend ApplicationStatusUpdate */
export interface ApiApplicationStatusUpdate {
  status: ApplicationStatus;
}

/** Mirrors backend ApplicationInterviewUpdate */
export interface ApiApplicationInterviewUpdate {
  interview_date?: string;
  interview_time?: string;
  interview_mode?: string;
  interview_link?: string;
}

/** Mirrors backend ApplicationNotesUpdate */
export interface ApiApplicationNotesUpdate {
  applicant_notes?: string;
}

/** Query params for GET /applications */
export interface ApiApplicationSearchParams {
  status?: ApplicationStatus;
  job_id?: string;
  page?: number;
  page_size?: number;
}

/* ─── Notification API Types ───────────────────────────────── */
export type ApiNotificationType =
  | 'RESUME'
  | 'APPLICATION'
  | 'LEARNING'
  | 'JOB'
  | 'INTERVIEW'
  | 'SYSTEM';

export interface ApiNotification {
  _id: string;
  user_id: string;
  type: ApiNotificationType;
  title: string;
  message: string;
  is_read: boolean;
  is_important: boolean;
  action_url: string | null;
  metadata: Record<string, any> | null;
  created_at: string;
  updated_at: string;
}

export interface ApiNotificationListResponse {
  items: ApiNotification[];
  page: number;
  page_size: number;
  total: number;
  total_pages: number;
}

export interface ApiNotificationSearchParams {
  type?: ApiNotificationType;
  is_read?: boolean;
  is_important?: boolean;
  created_after?: string;
  created_before?: string;
  page?: number;
  page_size?: number;
  sort?: string;
}

export interface ApiNotificationCounts {
  total: number;
  unread: number;
  read: number;
  important: number;
}

/* ─── Resume Analysis API Types ────────────────────────────── */
export interface ApiPersonalInfo {
  name: string | null;
  email: string | null;
  phone: string | null;
  location: string | null;
  linkedin: string | null;
  github: string | null;
  portfolio: string | null;
}

export interface ApiExtractedSkills {
  technical: string[];
  soft: string[];
  tools: string[];
  frameworks: string[];
  databases: string[];
  cloud: string[];
}

export interface ApiExperienceEntry {
  role: string;
  company: string;
  duration: string | null;
  years: number | null;
  description: string | null;
  skills_used: string[];
}

export interface ApiEducationEntry {
  degree: string;
  institution: string;
  field_of_study: string | null;
  graduation_year: number | null;
  gpa: number | null;
}

export interface ApiProjectEntry {
  name: string;
  description: string | null;
  skills_used: string[];
  url: string | null;
}

export interface ApiCertificationEntry {
  name: string;
  issuer: string | null;
  year: number | null;
  url: string | null;
}

export interface ApiSkillGapItem {
  skill: string;
  importance: 'high' | 'medium' | 'low';
  reason: string | null;
}

export type ApiOverallGrade = 'A+' | 'A' | 'B+' | 'B' | 'C+' | 'C' | 'D' | 'F';

export interface ApiAnalysisResult {
  analysis_id: string;
  resume_id: string;
  provider: 'gemini' | 'mock';
  analyzed_at: string;
  ats_score: number;
  overall_grade: ApiOverallGrade;
  personal_info: ApiPersonalInfo;
  skills: ApiExtractedSkills;
  experience: ApiExperienceEntry[];
  education: ApiEducationEntry[];
  projects: ApiProjectEntry[];
  certifications: ApiCertificationEntry[];
  skill_gaps: ApiSkillGapItem[];
  recommendations: string[];
  summary: string | null;
  analysis_version: string;
}

export interface ApiLearningRecommendation {
  id: string;
  title: string;
  provider: string;
  url: string;
  reason: string;
  resource_available: boolean;
}

export interface ApiSkillGapAnalysis {
  resume_id: string;
  target_job_id: string | null;
  matched_skills: string[];
  missing_skills: string[];
  skill_gaps: ApiSkillGapItem[];
  learning_recommendations: ApiLearningRecommendation[];
}

export interface ApiJobMatchResult {
  resume_id: string;
  job_id: string;
  match_score: number;
  matching_skills: string[];
  missing_skills: string[];
  explanation: string;
  learning_recommendations: ApiLearningRecommendation[];
}
