import { AppNotification, NotificationFilter } from "./types";
import { mockNotifications } from "../mockData"; /* Simulated delay to mimic network request */
const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));
export class NotificationService {
  private notifications: AppNotification[] = [...mockNotifications];
  private listeners: ((notifications: AppNotification[]) => void)[] = [];
  /* In a real app, this would connect to a WebSocket or SSE */ subscribe(
    listener: (notifications: AppNotification[]) => void,
  ) {
    this.listeners.push(listener);
    listener(this.notifications);
    /* Emit immediately */ return () => {
      this.listeners = this.listeners.filter((l) => l !== listener);
    };
  }
  private notifyListeners() {
    this.listeners.forEach((listener) => listener([...this.notifications]));
  }
  async getNotifications(
    filter: NotificationFilter = "all",
  ): Promise<AppNotification[]> {
    await delay(300);
    /* Simulate network latency */ let filtered = this.notifications;
    if (filter === "unread") {
      filtered = filtered.filter((n) => !n.isRead);
    } else if (filter !== "all") {
      filtered = filtered.filter((n) => n.type === filter);
    }
    return [...filtered].sort(
      (a, b) =>
        new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
    );
  }
  async markAsRead(id: string): Promise<void> {
    await delay(100);
    this.notifications = this.notifications.map((n) =>
      n.id === id ? { ...n, isRead: true } : n,
    );
    this.notifyListeners();
  }
  async markAllAsRead(): Promise<void> {
    await delay(200);
    this.notifications = this.notifications.map((n) => ({
      ...n,
      isRead: true,
    }));
    this.notifyListeners();
  }
  async getUnreadCount(): Promise<number> {
    /* In a real app, you might fetch this lightweight count separately */ return this.notifications.filter(
      (n) => !n.isRead,
    ).length;
  }
}
export const notificationService = new NotificationService();
