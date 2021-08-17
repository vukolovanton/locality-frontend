import React from "react";
import { useFetchIssues } from "src/hooks/issues/useFetchIssues";
import IssuePreview from "src/components/shared/IssuePreview";
import styles from "./styles.module.scss";

const AllIssues: React.FC = () => {
  const { issues } = useFetchIssues();
  return (
    <section>
      <h3>All issues</h3>
      <div className={styles.issuesContainer}>
        {issues.map((issue) => (
          <IssuePreview issue={issue} key={issue.id} />
        ))}
      </div>
    </section>
  );
};

export default AllIssues;
