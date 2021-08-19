export enum AnnouncementsStatuses {
  ACTIVE = "ACTIVE",
  CLOSED = "CLOSED",
}

export const USER_FACING_ANNOUNCEMENTS_STATUSES: any = {
  [AnnouncementsStatuses.ACTIVE]: "Active",
  [AnnouncementsStatuses.CLOSED]: "Closed",
};

export const ANNOUNCEMENTS_STATUSES_CONFIG = [
  {
    value: AnnouncementsStatuses.ACTIVE,
    title: USER_FACING_ANNOUNCEMENTS_STATUSES[AnnouncementsStatuses.ACTIVE],
  },
  {
    value: AnnouncementsStatuses.CLOSED,
    title: USER_FACING_ANNOUNCEMENTS_STATUSES[AnnouncementsStatuses.CLOSED],
  },
];
