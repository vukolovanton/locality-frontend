import { IssueStatuses } from "./IssueStatuses";

export interface IssuesDto {
  title: string;
  description: string;
  imageUrl: string;
  status: IssueStatuses;
  userId: number;
  localityId: number;
}
