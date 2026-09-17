import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { User } from "../types";
import { auth } from "../config/firebase";
import { onAuthStateChanged } from "firebase/auth";
import { apiClient } from "../lib/api/client";

interface AuthStore {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  _hasHydrated: boolean;
  setUser: (user: User | null) => void;
  setLoading: (loading: boolean) => void;
  logout: () => void;
  updateUser: (partial: Partial<User>) => void;
  setHasHydrated: (v: boolean) => void;
  initFirebaseAuth: () => void;
}

export const useAuthStore = create<AuthStore>()(
  persist(
    (set, get) => ({
      user: null,
      isAuthenticated: false,
      isLoading: true, // Start loading while Firebase checks auth state
      _hasHydrated: false,
      setUser: (user) =>
        set({ user, isAuthenticated: !!user, isLoading: false }),
      setLoading: (isLoading) => set({ isLoading }),
      logout: () => {
        auth.signOut();
        set({
          user: null,
          isAuthenticated: false,
          isLoading: false,
        });
      },
      updateUser: (partial) =>
        set((state) => ({
          user: state.user ? { ...state.user, ...partial } : null,
        })),
      setHasHydrated: (v) => set({ _hasHydrated: v }),
      initFirebaseAuth: () => {
        onAuthStateChanged(auth, async (firebaseUser) => {
          if (firebaseUser) {
            try {
              // Fetch user profile from backend
              const userProfile = await apiClient<any>('/auth/me');
              // Transform backend response to frontend User type
              const user: User = {
                id: userProfile.id || '',
                email: userProfile.email || firebaseUser.email || '',
                full_name: userProfile.full_name || userProfile.name || firebaseUser.displayName || '',
                role: (userProfile.role?.toLowerCase() === 'recruiter' ? 'recruiter' : 'seeker') as 'seeker' | 'recruiter',
                is_verified: userProfile.is_verified ?? true,
                created_at: userProfile.created_at || new Date().toISOString(),
              };
              set({ user, isAuthenticated: true, isLoading: false });
            } catch (error) {
              console.error("Failed to fetch user profile", error);
              // User is authenticated in Firebase but not in backend yet (new registration)
              // Set basic info from Firebase user
              const basicUser: User = {
                id: firebaseUser.uid,
                email: firebaseUser.email || '',
                full_name: firebaseUser.displayName || '',
                role: 'seeker',
                is_verified: firebaseUser.emailVerified,
                created_at: new Date().toISOString(),
              };
              set({ user: basicUser, isAuthenticated: true, isLoading: false });
            }
          } else {
            set({ user: null, isAuthenticated: false, isLoading: false });
          }
        });
      }
    }),
    {
      name: "elevara-auth",
      partialize: (state) => ({
        user: state.user,
        isAuthenticated: state.isAuthenticated,
      }),
      onRehydrateStorage: () => (state) => {
        state?.setHasHydrated(true);
      },
    },
  ),
);

