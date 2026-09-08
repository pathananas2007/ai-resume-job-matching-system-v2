import React, { useState } from "react";
import { Search } from "lucide-react";
import { ResourceCard } from "../cards/ResourceCard";
import { Resource } from "../types";
interface DiscoverTabProps {
  resources: Resource[];
  onBookmark: (id: string) => void;
}
export function DiscoverTab({ resources, onBookmark }: DiscoverTabProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedFormat, setSelectedFormat] = useState("All");
  const [selectedDifficulty, setSelectedDifficulty] = useState("All");
  const formats = ["All", ...Array.from(new Set(resources.map((r) => r.type)))];
  const difficulties = [
    "All",
    ...Array.from(new Set(resources.map((r) => r.difficulty))),
  ];
  const filteredResources = resources.filter((resource) => {
    const matchesSearch =
      resource.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      resource.provider.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (resource.category &&
        resource.category.toLowerCase().includes(searchQuery.toLowerCase()));
    const matchesFormat =
      selectedFormat === "All" || resource.type === selectedFormat;
    const matchesDifficulty =
      selectedDifficulty === "All" ||
      resource.difficulty === selectedDifficulty;
    return matchesSearch && matchesFormat && matchesDifficulty;
  });
  const recommendedResources = resources.filter((r) => r.recommendedReason);
  const otherResources = filteredResources.filter((r) => !r.recommendedReason);
  return (
    <div className="animate-in fade-in duration-500 space-y-12">
      {" "}
      {/* Recommended For You Section */}{" "}
      {searchQuery === "" &&
        selectedFormat === "All" &&
        selectedDifficulty === "All" &&
        recommendedResources.length > 0 && (
          <div className="space-y-6">
            {" "}
            <h2 className="text-xl font-bold text-slate-900 dark:text-white">
              Recommended For You
            </h2>{" "}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {" "}
              {recommendedResources.map((resource) => (
                <ResourceCard key={resource.id} resource={resource} />
              ))}{" "}
            </div>{" "}
          </div>
        )}{" "}
      {/* All Resources Section */}{" "}
      <div className="space-y-6">
        {" "}
        <h2 className="text-xl font-bold text-slate-900 dark:text-white">
          All Resources
        </h2>{" "}
        {/* Search and Filters */}{" "}
        <div className="flex flex-wrap gap-4">
          {" "}
          <div className="relative flex-1 min-w-[280px]">
            {" "}
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400" />{" "}
            <input
              type="text"
              placeholder="Search resources..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 dark:text-white"
            />{" "}
          </div>{" "}
          <select
            value={selectedFormat}
            onChange={(e) => setSelectedFormat(e.target.value)}
            className="px-4 py-2 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-lg text-sm focus:outline-none text-slate-700 dark:text-slate-300 min-w-[120px]"
          >
            {" "}
            {formats.map((format) => (
              <option key={format} value={format}>
                {format}
              </option>
            ))}{" "}
          </select>{" "}
          <select
            value={selectedDifficulty}
            onChange={(e) => setSelectedDifficulty(e.target.value)}
            className="px-4 py-2 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-lg text-sm focus:outline-none text-slate-700 dark:text-slate-300 min-w-[120px]"
          >
            {" "}
            {difficulties.map((diff) => (
              <option key={diff} value={diff}>
                {diff}
              </option>
            ))}{" "}
          </select>{" "}
        </div>{" "}
        {/* Resource Grid */}{" "}
        {filteredResources.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {" "}
            {(searchQuery === "" &&
            selectedFormat === "All" &&
            selectedDifficulty === "All"
              ? otherResources
              : filteredResources
            ).map((resource) => (
              <ResourceCard key={resource.id} resource={resource} />
            ))}{" "}
          </div>
        ) : (
          <div className="text-center py-12">
            {" "}
            <p className="text-slate-500 dark:text-slate-400">
              No resources found matching your search criteria.
            </p>{" "}
          </div>
        )}{" "}
      </div>{" "}
    </div>
  );
}
