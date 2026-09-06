export type DifficultyLevel = "Beginner" | "Intermediate" | "Advanced";
export type ResourceType =
  | "Course"
  | "Documentation"
  | "Video"
  | "Certification"
  | "Practice"
  | "Book"
  | "YouTube";
export type PriorityLevel = "High" | "Medium" | "Low";
export interface LearningResource {
  id: string;
  title: string;
  provider: string;
  type: ResourceType;
  difficulty: DifficultyLevel;
  duration: string;
  url: string;
  category?: string;
  free?: boolean;
  recommendedReason?: string;
  description?: string;
  skillTags?: string[];
  relatedCareerPaths?: string[];
  relatedSkills?: string[];
}
export interface SavedResource extends LearningResource {
  savedAt?: string;
  saved?: boolean;
} /* Alias for backwards compatibility or just use LearningResource */
export type Resource = LearningResource;
export interface SkillGap {
  id: string;
  targetSkill: string;
  currentLevel: number;
  requiredLevel: number;
  priority: PriorityLevel;
  relatedResources: LearningResource[];
}
export interface CareerPath {
  id: string;
  title: string;
  matchScore: number;
  salaryRange: string;
  requiredSkills: string[];
}
export interface Roadmap {
  id: string;
  name: string;
  description: string;
  skills: string[];
  color: string;
  difficulty?: DifficultyLevel;
  progress?: number;
  estimatedTime?: string;
  learningSequence?: string[];
  recommendedResources?: LearningResource[];
} /* Alias for backwards compatibility */
export type LearningRoadmapCategory = Roadmap;
export interface RecommendedSkill {
  id: string;
  name: string;
  priority: PriorityLevel;
  difficulty: DifficultyLevel;
  relatedCareers: string[];
}
