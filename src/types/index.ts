// ── Auth ─────────────────────────────────────────────────────────────
export type UserRole = "seeker" | "recruiter";

export interface User {
  id: string;
  email: string;
  full_name: string;
  role: UserRole;
  avatar_url?: string;
  is_verified: boolean;
  created_at: string;
}

export interface AuthState {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
}

// ── Profile ──────────────────────────────────────────────────────────
export interface SeekerProfile {
  user_id: string;
  headline?: string;
  location?: string;
  phone?: string;
  linkedin_url?: string;
  github_url?: string;
  portfolio_url?: string;
  summary?: string;
  skills: string[];
  experience: WorkExperience[];
  education: Education[];
  resume_text?: string;
  ats_score?: number;
  profile_strength: number;
}

export interface WorkExperience {
  title: string;
  company: string;
  start: string;
  end?: string;
  current?: boolean;
  description?: string;
}

export interface Education {
  degree: string;
  institution: string;
  year: string;
  gpa?: string;
}

export interface RecruiterProfile {
  user_id: string;
  company_name: string;
  company_size?: string;
  industry?: string;
  company_website?: string;
  company_logo_url?: string;
}

// ── Jobs ─────────────────────────────────────────────────────────────
export type JobType = "full-time" | "part-time" | "contract" | "remote";
export type ExperienceLevel = "entry" | "mid" | "senior" | "lead";
export type JobStatus = "active" | "closed" | "draft";

export interface Job {
  id: string;
  recruiter_id: string;
  title: string;
  company: string;
  location: string;
  job_type: JobType;
  experience_level: ExperienceLevel;
  description: string;
  requirements: string;
  required_skills: string[];
  salary_min?: number;
  salary_max?: number;
  status: JobStatus;
  applicant_count: number;
  created_at: string;
  updated_at: string;
  expires_at?: string;
  // Computed for seeker
  ai_match_score?: number;
  is_saved?: boolean;
}

// ── Applications ─────────────────────────────────────────────────────
export type ApplicationStatus =
  "applied" | "screening" | "interview" | "selected" | "rejected";

export interface Application {
  id: string;
  job_id: string;
  seeker_id: string;
  job?: Job;
  status: ApplicationStatus;
  ai_score: number;
  ai_recommendation: "Interview" | "Consider" | "Reject";
  analysis_id?: string;
  recruiter_notes?: string;
  applied_at: string;
  updated_at: string;
}

// ── Analysis ─────────────────────────────────────────────────────────
export interface ScoreBreakdown {
  overall: number;
  skills: number;
  experience: number;
  education: number;
}

export interface CompetencyItem {
  category: string;
  candidateScore: number;
  requiredScore: number;
  gap: string;
}

export interface SkillBreakdownItem {
  skill: string;
  status: "MATCH" | "CLOSE" | "GAP";
  candidateLevel: number;
  requiredLevel: number;
}

export interface CriticalGap {
  skill: string;
  classification: "Critical" | "Secondary";
  detail: string;
}

export interface ActionPlanItem {
  skill: string;
  timeEstimate: string;
  difficulty: "Easy" | "Medium" | "Hard";
  impact: "Low" | "Medium" | "High";
}

export interface RadarDataPoint {
  subject: string;
  A: number;
  B: number;
  fullMark: number;
}

export interface Analysis {
  id: string;
  resume_id?: string;
  seeker_id: string;
  job_id?: string;
  job_title?: string;
  score: number;
  statusLabel: string;
  recommendation: "Interview" | "Consider" | "Reject";
  confidenceScore: number;
  scores: ScoreBreakdown;
  competencyAnalysis: CompetencyItem[];
  skillBreakdown: SkillBreakdownItem[];
  matchingSkills: string[];
  criticalGaps: CriticalGap[];
  strengths: string[];
  weaknesses: string[];
  actionPlan: ActionPlanItem[];
  explanation: string;
  radarData: RadarDataPoint[];
  skillGaps: string[];
  created_at: string;
}

// ── Notifications ───────────────────────────────────────────────────
export type NotificationType =
  "application_update" | "job_match" | "learning_reminder" | "system";

export interface Notification {
  id: string;
  user_id: string;
  type: NotificationType;
  title: string;
  message: string;
  is_read: boolean;
  link?: string;
  created_at: string;
}

// ── Learning ─────────────────────────────────────────────────────────
export type ResourceCategory =
  | "course"
  | "documentation"
  | "youtube"
  | "certification"
  | "roadmap"
  | "practice";

export interface LearningResource {
  id: string;
  title: string;
  category: ResourceCategory;
  skill_tags: string[];
  url: string;
  provider: string;
  difficulty: "beginner" | "intermediate" | "advanced";
  is_free: boolean;
  thumbnail_url?: string;
}

// ── Dashboard Stats ─────────────────────────────────────────────────
export interface SeekerDashboardStats {
  ats_score: number;
  profile_strength: number;
  total_applications: number;
  interviews_count: number;
  saved_jobs_count: number;
  analyses_count: number;
}

export interface RecruiterDashboardStats {
  active_jobs: number;
  total_applicants: number;
  interviews_scheduled: number;
  hires_count: number;
  avg_match_score: number;
}

// ── Pagination ───────────────────────────────────────────────────────
export interface PaginatedResponse<T> {
  data: T[];
  total: number;
  page: number;
  per_page: number;
  total_pages: number;
}

// ── API ──────────────────────────────────────────────────────────────
export interface ApiError {
  message: string;
  errorType: string;
  timestamp: string;
}
