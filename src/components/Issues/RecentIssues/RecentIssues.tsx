import React from "react";
import SupervisedSection from "src/components/shared/SupervisedSection";
import PreviewItem from "src/components/shared/PreviewItem";
import { IssuesModel } from "src/interfaces/IssuesModel";

interface RecentIssuesProps {
  issues: Array<IssuesModel>;
}

const RecentIssues: React.FC<RecentIssuesProps> = ({ issues }) => {
  return (
    <div>
      <SupervisedSection title="Recent issues">
        {issues.map((issue) => (
          <PreviewItem item={issue} key={issue.id} path="/issues" />
        ))}
      </SupervisedSection>
    </div>
  );
};

export default RecentIssues;
