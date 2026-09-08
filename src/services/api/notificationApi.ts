import { apiClient } from '../../lib/api/client';
import type {
  ApiNotification,
  ApiNotificationListResponse,
  ApiNotificationSearchParams,
  ApiNotificationCounts,
} from '../../types/api';

function buildQueryString(params: ApiNotificationSearchParams): string {
  const searchParams = new URLSearchParams();
  for (const [key, value] of Object.entries(params)) {
    if (value === undefined || value === null) continue;
    searchParams.set(key, String(value));
  }
  const qs = searchParams.toString();
  return qs ? `?${qs}` : '';
}

export const notificationApi = {
  /**
   * List notifications for the current user.
   * Maps to GET /notifications
   */
  listNotifications: async (
    params: ApiNotificationSearchParams = {}
  ): Promise<ApiNotificationListResponse> => {
    const qs = buildQueryString(params);
    return apiClient<ApiNotificationListResponse>(`/notifications${qs}`);
  },

  /**
   * Mark a single notification as read.
   * Maps to PATCH /notifications/{id}/read
   */
  markAsRead: async (id: string): Promise<ApiNotification> => {
    return apiClient<ApiNotification>(`/notifications/${id}/read`, {
      method: 'PATCH',
    });
  },

  /**
   * Mark all unread notifications as read.
   * Maps to POST /notifications/read-all
   */
  markAllAsRead: async (): Promise<{ updated: number }> => {
    return apiClient<{ updated: number }>('/notifications/read-all', {
      method: 'POST',
    });
  },

  /**
   * Get the unread count for the current user.
   * Maps to GET /notifications/unread-count
   */
  getUnreadCount: async (): Promise<{ count: number }> => {
    return apiClient<{ count: number }>('/notifications/unread-count');
  },

  /**
   * Get detailed notification counts for the current user.
   * Maps to GET /notifications/counts
   */
  getNotificationCounts: async (): Promise<ApiNotificationCounts> => {
    return apiClient<ApiNotificationCounts>('/notifications/counts');
  },

  /**
   * Delete a notification.
   * Maps to DELETE /notifications/{id}
   */
  deleteNotification: async (id: string): Promise<void> => {
    return apiClient<void>(`/notifications/${id}`, {
      method: 'DELETE',
    });
  },
};
