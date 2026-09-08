import { apiClient } from '../../lib/api/client';
import type { ApiUser } from '../../types/api';

export const userApi = {
  getMe: async (): Promise<ApiUser> => {
    return apiClient<ApiUser>('/users/me');
  },

  updateProfile: async (data: any): Promise<ApiUser> => {
    return apiClient<ApiUser>('/users/me', {
      method: 'PATCH',
      data,
    });
  },

  updateAppearance: async (data: {
    theme: string;
    accentColor: string;
    compactMode: boolean;
  }): Promise<ApiUser> => {
    return apiClient<ApiUser>('/users/me/appearance', {
      method: 'PATCH',
      data,
    });
  },
};
