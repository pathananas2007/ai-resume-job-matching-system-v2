import React, { useState } from "react";
import { motion } from "motion/react";
import {
  CheckCircle,
  AlertTriangle,
  XCircle,
  Download,
  TrendingUp,
  Award,
  Target,
  User,
  BookOpen,
  Briefcase,
  ArrowRight,
  Clock,
  Zap,
  Star,
  ChevronRight,
  FileText,
  BarChart2,
} from "lucide-react";
import {
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
  PieChart,
  Pie,
  Cell,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";
import { cn } from "../../../../lib/utils"; /* ── Types ───────────────────────────────────────────────────────────────────── */
interface ReportData {
  resumeName: string;
  analysisDate: string;
  version: string;
  atsScore: number;
  resumeStrength: number;
  jobMatchPotential: number;
  profileCompleteness: number;
  skills: {
    technical: string[];
    soft: string[];
    tools: string[];
    languages: string[];
  };
  missingSkills: { high: string[]; medium: string[]; low: string[] };
  strengths: { title: string; detail: string }[];
  improvements: {
    title: string;
    detail: string;
    impact: "High" | "Medium" | "Low";
  }[];
  atsBreakdown: { category: string; score: number }[];
  careerRoles: {
    title: string;
    match: number;
    description: string;
    skills: string[];
  }[];
  learningRecs: {
    skill: string;
    reason: string;
    type: string;
    difficulty: string;
  }[];
  radarData: { subject: string; score: number; fullMark: number }[];
  sectionDist: { name: string; value: number }[];
  skillCategoryBreakdown: { name: string; value: number }[];
  jobCompatibility: {
    role: string;
    match: number;
    required: string[];
    missing: string[];
  }[];
  actionPlan: {
    immediate: { action: string; impact: string }[];
    shortTerm: { action: string; timeline: string }[];
    longTerm: { action: string; outcome: string }[];
  };
} /* ── Sample data (replace with real analysis output) ─────────────────────────── */
const SAMPLE_DATA: ReportData = {
  resumeName: "Arjun_Mehta_Resume_2025.pdf",
  analysisDate: "July 1, 2025",
  version: "v1.0",
  atsScore: 78,
  resumeStrength: 72,
  jobMatchPotential: 84,
  profileCompleteness: 68,
  skills: {
    technical: [
      "React",
      "TypeScript",
      "Node.js",
      "Python",
      "SQL",
      "REST APIs",
      "Git",
    ],
    soft: [
      "Communication",
      "Problem Solving",
      "Team Collaboration",
      "Adaptability",
    ],
    tools: ["VS Code", "Figma", "Postman", "Docker", "GitHub Actions"],
    languages: ["English", "Hindi"],
  },
  missingSkills: {
    high: ["System Design", "AWS / Cloud", "Kubernetes"],
    medium: ["GraphQL", "Redis", "CI/CD Pipelines"],
    low: ["Terraform", "Kafka", "gRPC"],
  },
  strengths: [
    {
      title: "Strong Technical Skills Section",
      detail:
        "Your skills section is well-organized and covers relevant technologies for your target roles.",
    },
    {
      title: "Relevant Project Experience",
      detail:
        "Projects demonstrate practical application of skills with clear descriptions of technologies used.",
    },
    {
      title: "Clear Contact Information",
      detail:
        "Contact details are complete and professionally formatted at the top of the resume.",
    },
    {
      title: "Consistent Formatting",
      detail:
        "Resume uses consistent fonts, spacing, and bullet point style throughout.",
    },
  ],
  improvements: [
    {
      title: "Add Quantified Achievements",
      detail:
        'Replace generic descriptions with measurable outcomes. E.g., "Reduced load time by 40%" instead of "Improved performance".',
      impact: "High",
    },
    {
      title: "Include More Keywords",
      detail:
        'Add industry-standard keywords like "microservices", "agile", "CI/CD" to improve ATS matching.',
      impact: "High",
    },
    {
      title: "Strengthen Summary Section",
      detail:
        "Your professional summary is brief. Expand it to highlight your unique value proposition in 3-4 sentences.",
      impact: "Medium",
    },
    {
      title: "Add Certifications",
      detail:
        "Relevant certifications (AWS, Google Cloud, etc.) would strengthen your profile significantly.",
      impact: "Medium",
    },
  ],
  atsBreakdown: [
    { category: "Keywords", score: 72 },
    { category: "Formatting", score: 88 },
    { category: "Experience", score: 76 },
    { category: "Projects", score: 82 },
    { category: "Education", score: 90 },
    { category: "Skills", score: 78 },
  ],
  careerRoles: [
    {
      title: "Senior Frontend Engineer",
      match: 91,
      description: "Strong alignment with your React and TypeScript expertise.",
      skills: ["React", "TypeScript", "CSS", "Testing"],
    },
    {
      title: "Full Stack Developer",
      match: 84,
      description: "Good fit given your Node.js and database experience.",
      skills: ["Node.js", "React", "SQL", "APIs"],
    },
    {
      title: "Software Engineer",
      match: 79,
      description: "Broad match across your technical skill set.",
      skills: ["Python", "Git", "APIs", "SQL"],
    },
  ],
  learningRecs: [
    {
      skill: "System Design",
      reason:
        "Required for senior roles and listed in 8 of your target job descriptions.",
      type: "Book",
      difficulty: "Advanced",
    },
    {
      skill: "AWS Fundamentals",
      reason: "Cloud skills are expected in most modern engineering roles.",
      type: "Certification",
      difficulty: "Intermediate",
    },
    {
      skill: "GraphQL",
      reason: "Increasingly common in full-stack roles alongside REST APIs.",
      type: "Course",
      difficulty: "Intermediate",
    },
    {
      skill: "Docker & Kubernetes",
      reason: "DevOps knowledge significantly expands your role eligibility.",
      type: "Course",
      difficulty: "Intermediate",
    },
  ],
  radarData: [
    { subject: "Frontend", score: 9, fullMark: 10 },
    { subject: "Backend", score: 7, fullMark: 10 },
    { subject: "DevOps", score: 4, fullMark: 10 },
    { subject: "System Design", score: 5, fullMark: 10 },
    { subject: "Testing", score: 7, fullMark: 10 },
    { subject: "Communication", score: 8, fullMark: 10 },
  ],
  sectionDist: [
    { name: "Experience", value: 35 },
    { name: "Skills", value: 20 },
    { name: "Projects", value: 25 },
    { name: "Education", value: 12 },
    { name: "Summary", value: 8 },
  ],
  skillCategoryBreakdown: [
    { name: "Technical", value: 7 },
    { name: "Soft Skills", value: 4 },
    { name: "Tools", value: 5 },
    { name: "Languages", value: 2 },
  ],
  jobCompatibility: [
    {
      role: "Senior Frontend Engineer",
      match: 91,
      required: ["React", "TypeScript", "Testing", "CSS"],
      missing: ["Design Systems", "Performance Optimization"],
    },
    {
      role: "Full Stack Developer",
      match: 84,
      required: ["Node.js", "React", "SQL", "APIs"],
      missing: ["GraphQL", "Redis"],
    },
    {
      role: "Software Engineer",
      match: 79,
      required: ["Python", "Git", "APIs"],
      missing: ["System Design", "Cloud"],
    },
  ],
  actionPlan: {
    immediate: [
      {
        action: "Add 3-5 quantified achievements to your experience section",
        impact: "Increases ATS score by ~8 points",
      },
      {
        action: "Include keywords: microservices, agile, CI/CD, scalable",
        impact: "Improves keyword match rate",
      },
      {
        action: "Expand professional summary to 3-4 sentences",
        impact: "Better first impression for recruiters",
      },
    ],
    shortTerm: [
      {
        action: "Complete AWS Cloud Practitioner certification",
        timeline: "4-6 weeks",
      },
      {
        action: "Build a project using GraphQL and Apollo",
        timeline: "2-3 weeks",
      },
      { action: "Add a dedicated certifications section", timeline: "1 week" },
    ],
    longTerm: [
      {
        action: "Study system design fundamentals and practice mock interviews",
        outcome: "Qualify for senior engineering roles",
      },
      {
        action: "Contribute to open source projects in your tech stack",
        outcome: "Strengthen portfolio and visibility",
      },
      {
        action: "Pursue AWS Solutions Architect certification",
        outcome: "Expand into cloud and backend architecture roles",
      },
    ],
  },
};
const PIE_COLORS = ["#0d1b2a", "#06B6D4", "#7C3AED", "#22C55E", "#F59E0B"];
const SKILL_COLORS = ["#0d1b2a", "#06B6D4", "#7C3AED", "#22C55E"];
