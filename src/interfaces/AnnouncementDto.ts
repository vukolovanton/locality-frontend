import { AnnouncementsStatuses } from "./AnnouncementsStatuses";

export interface AnnouncementDto {
  title: string;
  description: string;
  imageUrl: string;
  status: AnnouncementsStatuses;
  isPinned: boolean;
  userId: number;
  localityId: number;
}
