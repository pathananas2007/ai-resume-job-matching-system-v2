/**
 * Profile Suggestions - AI-generated profile enhancements from resume analysis
 * These are suggestions for the user to review and selectively accept.
 * User remains authoritative over their profile data.
 */
export interface ProfileSuggestion {
  field:
    | "name"
    | "headline"
    | "summary"
    | "skills"
    | "education"
    | "experience"
    | "projects"
    | "certifications";
  currentValue: any;
  suggestedValue: any;
  confidence: number; // 0-100
  reason: string;
  source: "resume_analysis" | "ai_enhancement";
}

export interface ProfileSuggestionsData {
  resumeId: string;
  resumeName: string;
  generatedAt: string;
  suggestions: ProfileSuggestion[];
  totalSuggestions: number;
  acceptedCount: number;
}

export interface ProfileSuggestionReview {
  field: string;
  suggestedValue: any;
  isAccepted: boolean;
  userModified: boolean; // User manually edited instead of accepting suggestion
}
