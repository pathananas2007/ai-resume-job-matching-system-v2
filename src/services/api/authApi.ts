import { apiClient } from "../../lib/api/client";
import { ApiUser } from "../../types/api"; /* Note: Using standard FastAPI token response format */
export interface TokenResponse {
  access_token: string;
  token_type: string;
}
export const authApi = {
  /* Login expects form data as per OAuth2PasswordRequestForm standard in FastAPI */ login:
    async (email: string, password: string): Promise<TokenResponse> => {
      const formData = new FormData();
      formData.append("username", email);
      /* FastAPI OAuth2 uses 'username' field */ formData.append(
        "password",
        password,
      );
      return apiClient<TokenResponse>("/auth/login", { data: formData });
    },
  register: async (data: any): Promise<TokenResponse> => {
    /* Convert frontend role names to backend Role enum values */ const roleMap: Record<
      string,
      string
    > = { seeker: "JOB_SEEKER", recruiter: "RECRUITER" };
    return apiClient<TokenResponse>("/auth/register", {
      data: {
        full_name: data.full_name,
        email: data.email,
        password: data.password,
        role: roleMap[data.role?.toLowerCase()] || "JOB_SEEKER",
      },
    });
  },
  /* Get Google OAuth authorization URL */ getGoogleAuthUrl: async (): Promise<{
    auth_url: string;
    state: string;
  }> => {
    return apiClient<{ auth_url: string; state: string }>(
      "/auth/oauth/google/authorize",
    );
  },
  /* Get GitHub OAuth authorization URL */ getGitHubAuthUrl: async (): Promise<{
    auth_url: string;
    state: string;
  }> => {
    return apiClient<{ auth_url: string; state: string }>(
      "/auth/oauth/github/authorize",
    );
  },
};
