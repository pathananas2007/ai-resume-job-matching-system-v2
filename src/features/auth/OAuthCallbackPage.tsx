import { useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useAuthStore } from "../../store/authStore";
import { useToast } from "../../components/ui/Toast";
import { userApi } from "../../services/api/userApi";
import type { User } from "../../types";
export default function OAuthCallbackPage() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { setUser, setLoading } = useAuthStore();
  const { toast } = useToast();
  useEffect(() => {
    const handleCallback = async () => {
      setLoading(true);
      try {
        const token = searchParams.get("token");
        const provider = searchParams.get("provider");
        if (!token) {
          throw new Error("No authentication token received");
        }
        /* Store token in authStore immediately */ const {
          setUser: setUserInStore,
        } = useAuthStore.getState();
        setUserInStore(
          {
            id: "",
            email: "",
            full_name: "",
            role: "seeker",
            is_verified: true,
            created_at: "",
          },
          token,
        );
        /* Fetch authenticated user's data */ const userResponse =
          await userApi.getMe();
        /* Transform API user to app User type */ const appUser: User = {
          id: userResponse.id || userResponse._id || "",
          email: userResponse.email,
          full_name: userResponse.full_name || userResponse.name || "",
          role: (userResponse.role?.toLowerCase() === "recruiter"
            ? "recruiter"
            : "seeker") as "seeker" | "recruiter",
          is_verified: true,
          created_at: userResponse.created_at || new Date().toISOString(),
        };
        /* Update with real user data */ setUser(appUser, token);
        toast(
          `Welcome, ${appUser.full_name}!`,
          "success",
          `Signed in with ${provider}`,
        );
        /* Navigate to appropriate dashboard */ navigate(
          appUser.role === "recruiter"
            ? "/recruiter/dashboard"
            : "/seeker/dashboard",
        );
      } catch (err: any) {
        console.error("OAuth callback error:", err);
        let errorMessage = "Sign in could not be completed. Please try again.";
        if (
          err?.error?.code === "NETWORK_ERROR" ||
          err?.message?.includes("network") ||
          err?.message?.includes("fetch")
        ) {
          errorMessage = "Unable to connect to the server. Please try again.";
        }
        toast(errorMessage, "error");
        navigate("/login");
      } finally {
        setLoading(false);
      }
    };
    handleCallback();
  }, [searchParams, navigate, setUser, setLoading, toast]);
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#F8FAFC] via-[#F5F7FA] to-[#EFF2F5] flex items-center justify-center">
      {" "}
      <div className="text-center">
        {" "}
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#2563EB] mx-auto mb-4"></div>{" "}
        <p className="text-[#64748B] text-lg">Completing sign in...</p>{" "}
      </div>{" "}
    </div>
  );
}
