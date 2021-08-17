export enum IssueStatuses {
  PENDING = "PENDING",
  IN_PROGRESS = "IN_PROGRESS",
  RESOLVED = "RESOLVED",
  REJECTED = "REJECTED",
}

export const USER_FACING_ISSUES_STATUS: any = {
  [IssueStatuses.PENDING]: "Pending",
  [IssueStatuses.IN_PROGRESS]: "In Progress",
  [IssueStatuses.RESOLVED]: "Resolved",
  [IssueStatuses.REJECTED]: "Rejected",
};
