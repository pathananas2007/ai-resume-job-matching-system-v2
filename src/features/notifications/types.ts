export type NotificationType =
  "resume" | "application" | "learning" | "job" | "system";
export type NotificationPriority = "low" | "medium" | "high";
export interface AppNotification {
  id: string;
  userId: string;
  title: string;
  message: string;
  type: NotificationType;
  priority: NotificationPriority;
  isRead: boolean;
  createdAt: string;
  actionUrl?: string;
  actionLabel?: string;
}
export type NotificationFilter = "all" | NotificationType | "unread";
