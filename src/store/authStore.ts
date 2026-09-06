import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { User } from "../types";
interface AuthStore {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  _hasHydrated: boolean;
  setUser: (user: User, token: string) => void;
  setLoading: (loading: boolean) => void;
  logout: () => void;
  updateUser: (partial: Partial<User>) => void;
  setHasHydrated: (v: boolean) => void;
}
export const useAuthStore = create<AuthStore>()(
  persist(
    (set) => ({
      user: null,
      token: null,
      isAuthenticated: false,
      isLoading: false,
      _hasHydrated: false,
      setUser: (user, token) =>
        set({ user, token, isAuthenticated: true, isLoading: false }),
      setLoading: (isLoading) => set({ isLoading }),
      logout: () => {
        /* Clear storage and state */ set({
          user: null,
          token: null,
          isAuthenticated: false,
          isLoading: false,
        }); /* Optionally: clear all app data, sessions, etc. */
      },
      updateUser: (partial) =>
        set((state) => ({
          user: state.user ? { ...state.user, ...partial } : null,
        })),
      setHasHydrated: (v) => set({ _hasHydrated: v }),
    }),
    {
      name: "elevara-auth",
      partialize: (state) => ({
        user: state.user,
        token: state.token,
        isAuthenticated: state.isAuthenticated,
      }),
      onRehydrateStorage: () => (state) => {
        state?.setHasHydrated(true);
      },
    },
  ),
);
