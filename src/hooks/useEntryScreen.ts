import { useState, useEffect } from 'react';

const ENTRY_SCREEN_SESSION_KEY = 'elevara-entry-seen';

/**
 * Hook to manage entry screen visibility.
 * Uses sessionStorage to prevent repeating the entry screen during the same session.
 * Does NOT persist across sessions or affect authentication.
 */
export function useEntryScreen() {
  const [shouldShowEntry, setShouldShowEntry] = useState(true);

  useEffect(() => {
    /* Check if entry screen was already shown in this session */ const alreadySeen = sessionStorage.getItem(ENTRY_SCREEN_SESSION_KEY);
    if (alreadySeen) {
      setShouldShowEntry(false);
    }
  }, []);

  const markEntrySeen = () => {
    sessionStorage.setItem(ENTRY_SCREEN_SESSION_KEY, 'true');
    setShouldShowEntry(false);
  };

  return {
    shouldShowEntry,
    markEntrySeen,
  };
}
