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

export const ISSUE_STATUSES_CONFIG = [
  {
    value: IssueStatuses.PENDING,
    title: USER_FACING_ISSUES_STATUS[IssueStatuses.PENDING],
  },
  {
    value: IssueStatuses.IN_PROGRESS,
    title: USER_FACING_ISSUES_STATUS[IssueStatuses.IN_PROGRESS],
  },
  {
    value: IssueStatuses.RESOLVED,
    title: USER_FACING_ISSUES_STATUS[IssueStatuses.RESOLVED],
  },
  {
    value: IssueStatuses.REJECTED,
    title: USER_FACING_ISSUES_STATUS[IssueStatuses.REJECTED],
  },
];
