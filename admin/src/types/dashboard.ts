import type { User } from "./user";

export interface DashboardStats {
  totalUsers: number;
  pendingUsers: number;
  approvedUsers: number;
  rejectedUsers: number;
  recentUsers: User[];
}