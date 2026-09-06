import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  ArrowLeft,
  BookOpen,
  Clock,
  Tag,
  Briefcase,
  Play,
  Bookmark,
  BookmarkCheck,
  ExternalLink,
  Target,
} from "lucide-react";
import { mockResources } from "../mockData";
export function ResourceDetailPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const resource = mockResources.find((r) => r.id === id);
  const [isSaved, setIsSaved] = useState(resource?.saved || false);
  if (!resource) {
    return (
      <div className="flex h-64 flex-col items-center justify-center space-y-4">
        {" "}
        <BookOpen className="h-12 w-12 text-slate-300 dark:text-slate-600" />{" "}
        <h2 className="text-xl font-semibold text-slate-700 dark:text-slate-300">
          Resource not found
        </h2>{" "}
        <button
          onClick={() => navigate("/seeker/learning")}
          className="text-blue-600 hover:underline"
        >
          {" "}
          Return to Learning Hub{" "}
        </button>{" "}
      </div>
    );
  }
  const handleSave = () => {
    setIsSaved(!isSaved); /* In a real app, make API call here */
  };
  return (
    <div className="mx-auto max-w-4xl px-4 py-8 md:px-8 space-y-8 animate-in fade-in duration-500">
      {" "}
      <button
        onClick={() => navigate(-1)}
        className="flex items-center text-sm font-medium text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white transition-colors"
      >
        {" "}
        <ArrowLeft className="mr-2 h-4 w-4" /> Back{" "}
      </button>{" "}
      <div className="overflow-hidden rounded-2xl bg-white shadow-sm border border-slate-100 dark:bg-slate-900 dark:border-slate-800">
        {" "}
        <div className="p-8 md:p-10">
          {" "}
          <div className="flex flex-col md:flex-row md:items-start justify-between gap-6 mb-8">
            {" "}
            <div className="space-y-4 max-w-2xl">
              {" "}
              <div className="flex flex-wrap items-center gap-3">
                {" "}
                <span className="rounded-full bg-blue-50 px-3 py-1 text-xs font-semibold text-blue-700 dark:bg-blue-500/10 dark:text-blue-400">
                  {" "}
                  {resource.type}{" "}
                </span>{" "}
                {resource.free && (
                  <span className="rounded-full bg-emerald-50 px-3 py-1 text-xs font-semibold text-emerald-700 dark:bg-emerald-500/10 dark:text-emerald-400">
                    {" "}
                    Free{" "}
                  </span>
                )}{" "}
                <span className="text-sm font-medium text-slate-500 dark:text-slate-400">
                  {" "}
                  By {resource.provider}{" "}
                </span>{" "}
              </div>{" "}
              <h1 className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white leading-tight">
                {" "}
                {resource.title}{" "}
              </h1>{" "}
              <p className="text-lg text-slate-600 dark:text-slate-400 leading-relaxed">
                {" "}
                {resource.description ||
                  "No detailed description available for this resource."}{" "}
              </p>{" "}
            </div>{" "}
            <div className="flex flex-col gap-3 shrink-0 w-full md:w-auto">
              {" "}
              <button className="flex w-full md:w-auto items-center justify-center gap-2 rounded-xl bg-blue-600 px-6 py-3 font-semibold text-white transition-colors hover:bg-blue-700">
                {" "}
                <Play className="h-5 w-5" /> Start Learning{" "}
              </button>{" "}
              <button
                onClick={handleSave}
                className={`flex w-full md:w-auto items-center justify-center gap-2 rounded-xl border px-6 py-3 font-semibold transition-colors ${isSaved ? "border-blue-200 bg-blue-50 text-blue-700 hover:bg-blue-100 dark:border-blue-900/50 dark:bg-blue-900/20 dark:text-blue-400 dark:hover:bg-blue-900/40" : "border-slate-200 bg-white text-slate-700 hover:bg-slate-50 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-300 dark:hover:bg-slate-700"}`}
              >
                {" "}
                {isSaved ? (
                  <BookmarkCheck className="h-5 w-5" />
                ) : (
                  <Bookmark className="h-5 w-5" />
                )}{" "}
                {isSaved ? "Saved to Library" : "Save Resource"}{" "}
              </button>{" "}
            </div>{" "}
          </div>{" "}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 py-6 border-y border-slate-100 dark:border-slate-800 mb-8">
            {" "}
            <div className="space-y-1">
              {" "}
              <span className="flex items-center text-sm font-medium text-slate-500 dark:text-slate-400">
                {" "}
                <Clock className="mr-1.5 h-4 w-4" /> Duration{" "}
              </span>{" "}
              <p className="font-semibold text-slate-900 dark:text-white">
                {resource.duration}
              </p>{" "}
            </div>{" "}
            <div className="space-y-1">
              {" "}
              <span className="flex items-center text-sm font-medium text-slate-500 dark:text-slate-400">
                {" "}
                <Target className="mr-1.5 h-4 w-4" /> Difficulty{" "}
              </span>{" "}
              <p className="font-semibold text-slate-900 dark:text-white">
                {resource.difficulty}
              </p>{" "}
            </div>{" "}
            <div className="space-y-1 col-span-2">
              {" "}
              <span className="flex items-center text-sm font-medium text-slate-500 dark:text-slate-400">
                {" "}
                <ExternalLink className="mr-1.5 h-4 w-4" /> Original Source{" "}
              </span>{" "}
              <a
                href={resource.url}
                target="_blank"
                rel="noreferrer"
                className="font-semibold text-blue-600 hover:underline dark:text-blue-400 block truncate"
              >
                {" "}
                {resource.provider} External Link{" "}
              </a>{" "}
            </div>{" "}
          </div>{" "}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {" "}
            <div className="space-y-4">
              {" "}
              <h3 className="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
                {" "}
                <Tag className="h-5 w-5 text-indigo-500" /> Skills Covered{" "}
              </h3>{" "}
              <div className="flex flex-wrap gap-2">
                {" "}
                {resource.skillTags ? (
                  resource.skillTags.map((skill, idx) => (
                    <span
                      key={idx}
                      className="rounded-lg bg-slate-100 px-3 py-1.5 text-sm font-medium text-slate-700 dark:bg-slate-800 dark:text-slate-300"
                    >
                      {" "}
                      {skill}{" "}
                    </span>
                  ))
                ) : (
                  <span className="text-slate-500 dark:text-slate-400">
                    No specific skills tagged.
                  </span>
                )}{" "}
              </div>{" "}
              {resource.relatedSkills && resource.relatedSkills.length > 0 && (
                <div className="pt-2">
                  {" "}
                  <h4 className="text-sm font-semibold text-slate-500 dark:text-slate-400 mb-2">
                    Related Skills:
                  </h4>{" "}
                  <p className="text-slate-700 dark:text-slate-300 text-sm">
                    {" "}
                    {resource.relatedSkills.join(", ")}{" "}
                  </p>{" "}
                </div>
              )}{" "}
            </div>{" "}
            <div className="space-y-4">
              {" "}
              <h3 className="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
                {" "}
                <Briefcase className="h-5 w-5 text-emerald-500" /> Related
                Career Paths{" "}
              </h3>{" "}
              <ul className="space-y-2">
                {" "}
                {resource.relatedCareerPaths ? (
                  resource.relatedCareerPaths.map((path, idx) => (
                    <li
                      key={idx}
                      className="flex items-center text-slate-700 dark:text-slate-300"
                    >
                      {" "}
                      <div className="h-1.5 w-1.5 rounded-full bg-emerald-500 mr-2" />{" "}
                      {path}{" "}
                    </li>
                  ))
                ) : (
                  <li className="text-slate-500 dark:text-slate-400">
                    Applicable universally.
                  </li>
                )}{" "}
              </ul>{" "}
            </div>{" "}
          </div>{" "}
        </div>{" "}
      </div>{" "}
    </div>
  );
}
