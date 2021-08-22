import { AnnouncementsStatuses } from "./AnnouncementsStatuses";

export interface AnnouncementsModel {
  id: number;
  title: string;
  description: string;
  imageUrl: string;
  isPinned: boolean;
  status: AnnouncementsStatuses;
  createdAt: string;
  username: string;
  email: string;
}
