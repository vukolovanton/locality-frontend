import React from "react";
import { useFetchIssues } from "src/hooks/issues/useFetchIssues";
import IssuePreview from "src/components/shared/IssuePreview";

const AllIssues: React.FC = () => {
  const { issues } = useFetchIssues();
  return (
    <section>
      {issues.map((issue) => (
        <IssuePreview issue={issue} key={issue.id} />
      ))}
    </section>
  );
};

export default AllIssues;
