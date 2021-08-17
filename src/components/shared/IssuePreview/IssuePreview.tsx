import { IssuesModel } from "src/interfaces/IssuesModel";
import React from "react";

interface IssuePreviewProps {
  issue: IssuesModel;
}

const IssuePreview: React.FC<IssuePreviewProps> = ({ issue }) => {
  return (
    <div>
      <div />
      <span>{issue.title}</span>
      <span>{issue.createdAt}</span>
      <span>{issue.status}</span>
    </div>
  );
};

export default IssuePreview;
