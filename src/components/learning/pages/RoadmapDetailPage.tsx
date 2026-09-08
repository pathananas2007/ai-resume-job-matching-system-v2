import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import { motion } from "motion/react";
import {
  ArrowLeft,
  Clock,
  Map,
  Target,
  BookOpen,
  CheckCircle,
} from "lucide-react";
import { mockRoadmaps } from "../mockData";
import { ResourceCard } from "../cards/ResourceCard";
export function RoadmapDetailPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  /* Use mock data since we don't have a real backend yet */ const roadmap =
    mockRoadmaps.find((r) => r.id === id);
  if (!roadmap) {
    return (
      <div className="flex h-64 flex-col items-center justify-center space-y-4">
        {" "}
        <Map className="h-12 w-12 text-slate-300 dark:text-slate-600" />{" "}
        <h2 className="text-xl font-semibold text-slate-700 dark:text-slate-300">
          Roadmap not found
        </h2>{" "}
        <button
          onClick={() => navigate("/seeker/learning")}
          className="text-[#1e3a8a] hover:underline"
        >
          {" "}
          Return to Learning Hub{" "}
        </button>{" "}
      </div>
    );
  }
  return (
    <div className="mx-auto max-w-5xl px-4 py-8 md:px-8 space-y-8 animate-in fade-in duration-500">
      {" "}
      <button
        onClick={() => navigate("/seeker/learning")}
        className="flex items-center text-sm font-medium text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white transition-colors"
      >
        {" "}
        <ArrowLeft className="mr-2 h-4 w-4" /> Back to Learning Hub{" "}
      </button>{" "}
      <div className="overflow-hidden rounded-2xl bg-white shadow-sm border border-slate-100 dark:bg-slate-900 dark:border-slate-800">
        {" "}
        <div
          className="h-3 w-full"
          style={{ backgroundColor: roadmap.color }}
        />{" "}
        <div className="p-8">
          {" "}
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-8">
            {" "}
            <div className="flex items-center gap-4">
              {" "}
              <div
                className="flex h-16 w-16 shrink-0 items-center justify-center rounded-xl"
                style={{
                  backgroundColor: `${roadmap.color}15`,
                  color: roadmap.color,
                }}
              >
                {" "}
                <Map className="h-8 w-8" />{" "}
              </div>{" "}
              <div>
                {" "}
                <h1 className="text-3xl font-bold text-slate-900 dark:text-white mb-2">
                  {roadmap.name}
                </h1>{" "}
                <p className="text-lg text-slate-600 dark:text-slate-400">
                  {roadmap.description}
                </p>{" "}
              </div>{" "}
            </div>{" "}
            <div className="flex items-center gap-4 shrink-0">
              {" "}
              <div className="flex flex-col items-end">
                {" "}
                <span className="text-sm font-medium text-slate-500 dark:text-slate-400">
                  Progress
                </span>{" "}
                <span className="text-2xl font-bold text-slate-900 dark:text-white">
                  {roadmap.progress || 0}%
                </span>{" "}
              </div>{" "}
              <div className="h-16 w-16 rounded-full border-4 border-slate-100 dark:border-slate-800 flex items-center justify-center relative overflow-hidden">
                {" "}
                <div
                  className="absolute bottom-0 w-full bg-blue-500 opacity-20 transition-all duration-1000"
                  style={{
                    height: `${roadmap.progress || 0}%`,
                    backgroundColor: roadmap.color,
                  }}
                />{" "}
                <Target className="h-6 w-6 text-slate-700 dark:text-slate-300 relative z-10" />{" "}
              </div>{" "}
            </div>{" "}
          </div>{" "}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {" "}
            <div className="rounded-xl bg-slate-50 p-6 dark:bg-slate-800/50">
              {" "}
              <div className="flex items-center gap-3 mb-4">
                {" "}
                <Clock className="h-5 w-5 text-blue-500" />{" "}
                <h3 className="font-semibold text-slate-900 dark:text-white">
                  Estimated Time
                </h3>{" "}
              </div>{" "}
              <p className="text-slate-700 dark:text-slate-300">
                {roadmap.estimatedTime || "Self-paced"}
              </p>{" "}
            </div>{" "}
            <div className="rounded-xl bg-slate-50 p-6 dark:bg-slate-800/50 md:col-span-2">
              {" "}
              <div className="flex items-center gap-3 mb-4">
                {" "}
                <CheckCircle className="h-5 w-5 text-emerald-500" />{" "}
                <h3 className="font-semibold text-slate-900 dark:text-white">
                  Required Skills
                </h3>{" "}
              </div>{" "}
              <div className="flex flex-wrap gap-2">
                {" "}
                {roadmap.skills.map((skill, idx) => (
                  <span
                    key={idx}
                    className="rounded-lg bg-white border border-slate-200 px-3 py-1.5 text-sm font-medium text-slate-700 shadow-sm dark:bg-slate-800 dark:border-slate-700 dark:text-slate-300"
                  >
                    {" "}
                    {skill}{" "}
                  </span>
                ))}{" "}
              </div>{" "}
            </div>{" "}
          </div>{" "}
        </div>{" "}
      </div>{" "}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {" "}
        <div className="lg:col-span-2 space-y-6">
          {" "}
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
            {" "}
            <Target className="h-6 w-6 text-indigo-500" /> Learning
            Sequence{" "}
          </h2>{" "}
          <div className="relative border-l-2 border-slate-200 dark:border-slate-800 ml-4 space-y-8 pb-4">
            {" "}
            {roadmap.learningSequence ? (
              roadmap.learningSequence.map((step, idx) => (
                <div key={idx} className="relative pl-8">
                  {" "}
                  <div
                    className="absolute -left-[11px] top-1 h-5 w-5 rounded-full border-4 border-white bg-indigo-500 dark:border-slate-950"
                    style={{ backgroundColor: roadmap.color }}
                  />{" "}
                  <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-1">
                    Step {idx + 1}: {step}
                  </h3>{" "}
                  <p className="text-slate-600 dark:text-slate-400">
                    Complete recommended courses and projects related to{" "}
                    {step.toLowerCase()} to advance.
                  </p>{" "}
                </div>
              ))
            ) : (
              <div className="pl-8 text-slate-500 dark:text-slate-400">
                {" "}
                No specific sequence defined yet.{" "}
              </div>
            )}{" "}
          </div>{" "}
        </div>{" "}
        <div className="space-y-6">
          {" "}
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
            {" "}
            <BookOpen className="h-6 w-6 text-blue-500" /> Recommended
            Resources{" "}
          </h2>{" "}
          <div className="flex flex-col gap-4">
            {" "}
            {roadmap.recommendedResources &&
            roadmap.recommendedResources.length > 0 ? (
              roadmap.recommendedResources.map((resource) => (
                <ResourceCard
                  key={resource.id}
                  resource={resource}
                  onBookmark={() => {}}
                />
              ))
            ) : (
              <div className="rounded-xl border border-dashed border-slate-300 p-8 text-center dark:border-slate-700">
                {" "}
                <p className="text-slate-500 dark:text-slate-400">
                  No specific resources recommended yet.
                </p>{" "}
              </div>
            )}{" "}
          </div>{" "}
        </div>{" "}
      </div>{" "}
    </div>
  );
}
