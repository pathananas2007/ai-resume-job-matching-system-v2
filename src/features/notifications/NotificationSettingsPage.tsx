import React, { useState } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft, Save } from "lucide-react";
import { motion } from "motion/react";
export default function NotificationSettingsPage() {
  const [settings, setSettings] = useState({
    emailNotifications: true,
    pushNotifications: true,
    learningReminders: false,
    jobAlerts: true,
    applicationUpdates: true,
  });
  const [isSaving, setIsSaving] = useState(false);
  const handleToggle = (key: keyof typeof settings) => {
    setSettings((prev) => ({ ...prev, [key]: !prev[key] }));
  };
  const handleSave = async () => {
    setIsSaving(true);
    /* Simulate API call */ await new Promise((resolve) =>
      setTimeout(resolve, 800),
    );
    setIsSaving(false);
  };
  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {" "}
      <div className="mb-8">
        {" "}
        <Link
          to="/seeker/notifications"
          className="inline-flex items-center text-sm font-medium text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white mb-4"
        >
          {" "}
          <ArrowLeft className="w-4 h-4 mr-1" /> Back to Notifications{" "}
        </Link>{" "}
        <h1 className="text-2xl font-bold text-slate-900 dark:text-white">
          {" "}
          Notification Settings{" "}
        </h1>{" "}
        <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
          {" "}
          Manage how and when you receive updates.{" "}
        </p>{" "}
      </div>{" "}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl overflow-hidden shadow-sm"
      >
        {" "}
        <div className="p-6 border-b border-slate-200 dark:border-slate-800">
          {" "}
          <h2 className="text-lg font-semibold text-slate-900 dark:text-white mb-4">
            {" "}
            Delivery Methods{" "}
          </h2>{" "}
          <div className="space-y-6">
            {" "}
            <ToggleOption
              title="Email Notifications"
              description="Receive notifications directly to your inbox."
              checked={settings.emailNotifications}
              onChange={() => handleToggle("emailNotifications")}
            />{" "}
            <ToggleOption
              title="Push Notifications"
              description="Receive browser notifications when you're online."
              checked={settings.pushNotifications}
              onChange={() => handleToggle("pushNotifications")}
            />{" "}
          </div>{" "}
        </div>{" "}
        <div className="p-6">
          {" "}
          <h2 className="text-lg font-semibold text-slate-900 dark:text-white mb-4">
            {" "}
            Notification Types{" "}
          </h2>{" "}
          <div className="space-y-6">
            {" "}
            <ToggleOption
              title="Application Updates"
              description="Get notified when your job applications move to the next stage."
              checked={settings.applicationUpdates}
              onChange={() => handleToggle("applicationUpdates")}
            />{" "}
            <ToggleOption
              title="Job Alerts"
              description="Receive alerts for new jobs that match your profile."
              checked={settings.jobAlerts}
              onChange={() => handleToggle("jobAlerts")}
            />{" "}
            <ToggleOption
              title="Learning Reminders"
              description="Get weekly reminders to stay on track with your roadmap."
              checked={settings.learningReminders}
              onChange={() => handleToggle("learningReminders")}
            />{" "}
          </div>{" "}
        </div>{" "}
        <div className="p-6 bg-slate-50 dark:bg-slate-800/50 border-t border-slate-200 dark:border-slate-800 flex justify-end">
          {" "}
          <button
            onClick={handleSave}
            disabled={isSaving}
            className="flex items-center gap-2 px-5 py-2.5 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-70"
          >
            {" "}
            {isSaving ? (
              <span className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
            ) : (
              <Save className="w-5 h-5" />
            )}{" "}
            Save Preferences{" "}
          </button>{" "}
        </div>{" "}
      </motion.div>{" "}
    </div>
  );
}
function ToggleOption({
  title,
  description,
  checked,
  onChange,
}: {
  title: string;
  description: string;
  checked: boolean;
  onChange: () => void;
}) {
  return (
    <div className="flex items-start justify-between">
      {" "}
      <div>
        {" "}
        <h3 className="text-sm font-medium text-slate-900 dark:text-white">
          {title}
        </h3>{" "}
        <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
          {description}
        </p>{" "}
      </div>{" "}
      <button
        type="button"
        role="switch"
        aria-checked={checked}
        onClick={onChange}
        className={`relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-offset-2 dark:focus:ring-offset-slate-900 ${checked ? "bg-blue-600" : "bg-slate-200 dark:bg-slate-700"}`}
      >
        {" "}
        <span
          aria-hidden="true"
          className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${checked ? "translate-x-5" : "translate-x-0"}`}
        />{" "}
      </button>{" "}
    </div>
  );
}
