import React, { useState } from "react";
import { PersonalizedBanner } from "./sections/PersonalizedBanner";
import { LearningTabs, TabId } from "./layout/LearningTabs";
import { DiscoverTab } from "./tabs/DiscoverTab";
import { RoadmapsTab } from "./tabs/RoadmapsTab";
import { SkillGapsTab } from "./tabs/SkillGapsTab";
import { SavedTab } from "./tabs/SavedTab";
import { TopMissingSkillsWidget } from "./widgets/TopMissingSkillsWidget";
import { CareerPathRecommendationsWidget } from "./widgets/CareerPathRecommendationsWidget";
import { LearningProgress } from "./widgets/LearningProgress";
import { LearningStreakWidget } from "./widgets/LearningStreakWidget";
import {
  mockResources,
  mockRoadmaps,
  mockSkillGaps,
  mockCareers,
} from "./mockData";
export function LearningHubPage() {
  const [activeTab, setActiveTab] = useState<TabId>("discover");
  const [savedResourceIds, setSavedResourceIds] = useState<Set<string>>(
    new Set(["2"]),
  );
  const handleBookmark = (id: string) => {
    setSavedResourceIds((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(id)) newSet.delete(id);
      else newSet.add(id);
      return newSet;
    });
  };
  const allResources = mockResources.map((r) => ({
    ...r,
    saved: savedResourceIds.has(r.id),
  }));
  const savedResourcesList = allResources.filter((r) => r.saved);
  /* Deriving some simple data for the banner */ const targetCareer =
    mockCareers[0];
  const missingSkills = mockSkillGaps.map((g) => g.targetSkill).slice(0, 3);
  return (
    <div className="container mx-auto max-w-7xl px-4 md:px-8 py-8 space-y-8 animate-in fade-in duration-500">
      {" "}
      <div className="mb-2">
        {" "}
        <h1 className="text-2xl font-bold text-slate-900 dark:text-white mb-2">
          Learning Hub
        </h1>{" "}
        <p className="text-slate-500 dark:text-slate-400">
          Curated resources to close your skill gaps and grow professionally
        </p>{" "}
      </div>{" "}
      <PersonalizedBanner
        careerGoal={targetCareer.title}
        missingSkills={missingSkills}
        learningFocus="System Architecture & Scalability"
        onViewRoadmap={() => setActiveTab("roadmaps")}
        onViewSkillGaps={() => setActiveTab("skill-gaps")}
        isDemoData={true}
      />{" "}
      <LearningTabs activeTab={activeTab} onChange={setActiveTab} />{" "}
      <div className="pt-4 flex flex-col lg:flex-row gap-8">
        {" "}
        {/* Mobile: Widgets appear BEFORE resources. So we can use flex order to re-arrange. */}{" "}
        {/* On desktop: Widgets are on the right (order-2), main content is left (order-1). */}{" "}
        {/* Wait, the user specifically said "Mobile: Banner -> Tabs -> Widgets -> Resources" */}{" "}
        <div className="w-full lg:w-[70%] order-2 lg:order-1">
          {" "}
          {activeTab === "discover" && (
            <DiscoverTab resources={allResources} onBookmark={handleBookmark} />
          )}{" "}
          {activeTab === "roadmaps" && <RoadmapsTab roadmaps={mockRoadmaps} />}{" "}
          {activeTab === "skill-gaps" && (
            <SkillGapsTab skillGaps={mockSkillGaps} />
          )}{" "}
          {activeTab === "saved" && (
            <SavedTab
              savedResources={savedResourcesList}
              onBookmark={handleBookmark}
              onBrowseClick={() => setActiveTab("discover")}
            />
          )}{" "}
        </div>{" "}
        {/* Sidebar Widgets (only visible on Discover Tab, or always?) */}{" "}
        {/* The user didn't specify to hide them on other tabs, but usually sidebar is global or discover specific. Let's show it globally or just for discover. I'll show it globally for a "Platform" feel. */}{" "}
        <div className="w-full lg:w-[30%] order-1 lg:order-2 space-y-6">
          {" "}
          <LearningStreakWidget />{" "}
          <TopMissingSkillsWidget skills={missingSkills} />{" "}
          <CareerPathRecommendationsWidget careers={mockCareers} />{" "}
          <LearningProgress completed={8} inProgress={3} planned={12} />{" "}
        </div>{" "}
      </div>{" "}
    </div>
  );
}
