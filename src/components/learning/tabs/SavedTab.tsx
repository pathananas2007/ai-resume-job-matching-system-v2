import React from "react";
import { SectionContainer } from "../layout/SectionContainer";
import { ResourceCard } from "../cards/ResourceCard";
import { Bookmark } from "lucide-react";
import { Resource } from "../types";
interface SavedTabProps {
  savedResources: Resource[];
  onBookmark: (id: string) => void;
  onBrowseClick?: () => void;
}
export function SavedTab({
  savedResources,
  onBookmark,
  onBrowseClick,
}: SavedTabProps) {
  const savedCourses = savedResources.filter(
    (r) => r.type === "Course" || r.type === "YouTube",
  );
  const savedCertifications = savedResources.filter(
    (r) => r.type === "Certification",
  );
  const savedOther = savedResources.filter(
    (r) =>
      r.type !== "Course" && r.type !== "YouTube" && r.type !== "Certification",
  );
  return (
    <div className="animate-in fade-in duration-500">
      {" "}
      <div className="space-y-12">
        {" "}
        {savedResources.length === 0 ? (
          <SectionContainer
            title="Saved Resources"
            description="Your bookmarked learning materials."
          >
            {" "}
            <div className="flex flex-col items-center justify-center py-20 bg-white dark:bg-slate-900 rounded-3xl border border-dashed border-slate-300 dark:border-slate-800 shadow-sm">
              {" "}
              <div className="mb-4 rounded-full bg-slate-100 p-4 dark:bg-slate-800">
                {" "}
                <Bookmark className="h-8 w-8 text-slate-400 dark:text-slate-500" />{" "}
              </div>{" "}
              <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2">
                No Saved Resources Yet
              </h3>{" "}
              <p className="text-slate-500 dark:text-slate-400 mb-6 text-center max-w-sm">
                {" "}
                Start exploring learning resources and save them here for quick
                access later.{" "}
              </p>{" "}
              <button
                onClick={onBrowseClick}
                className="rounded-xl bg-blue-600 px-6 py-3 font-semibold text-white transition-colors hover:bg-blue-700"
              >
                {" "}
                Browse Resources{" "}
              </button>{" "}
            </div>{" "}
          </SectionContainer>
        ) : (
          <>
            {" "}
            {savedCourses.length > 0 && (
              <SectionContainer title="Saved Courses">
                {" "}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {" "}
                  {savedCourses.map((resource) => (
                    <ResourceCard
                      key={resource.id}
                      resource={resource}
                      onBookmark={onBookmark}
                    />
                  ))}{" "}
                </div>{" "}
              </SectionContainer>
            )}{" "}
            {savedCertifications.length > 0 && (
              <SectionContainer title="Saved Certifications">
                {" "}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {" "}
                  {savedCertifications.map((resource) => (
                    <ResourceCard
                      key={resource.id}
                      resource={resource}
                      onBookmark={onBookmark}
                    />
                  ))}{" "}
                </div>{" "}
              </SectionContainer>
            )}{" "}
            {savedOther.length > 0 && (
              <SectionContainer title="Bookmarked Content">
                {" "}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {" "}
                  {savedOther.map((resource) => (
                    <ResourceCard
                      key={resource.id}
                      resource={resource}
                      onBookmark={onBookmark}
                    />
                  ))}{" "}
                </div>{" "}
              </SectionContainer>
            )}{" "}
          </>
        )}{" "}
        {savedResources.length > 0 && (
          <div className="mt-8 flex justify-center">
            {" "}
            <button className="rounded-xl border border-slate-200 bg-white px-6 py-3 font-semibold text-slate-700 transition-colors hover:bg-slate-50 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-300 dark:hover:bg-slate-700">
              {" "}
              View All Saved Resources{" "}
            </button>{" "}
          </div>
        )}{" "}
      </div>{" "}
    </div>
  );
}
