import React from "react";
import IssuePreview from "src/components/shared/IssuePreview";
import { IssuesModel } from "src/interfaces/IssuesModel";

import styles from "../styles.module.scss";

interface RecentIssuesProps {
  issues: Array<IssuesModel>;
}

const RecentIssues: React.FC<RecentIssuesProps> = ({ issues }) => {
  return (
    <section>
      <h3>Recently added</h3>
      <div className={styles.issuesContainer}>
        {issues.map((issue) => (
          <IssuePreview issue={issue} key={issue.id} />
        ))}
      </div>
    </section>
  );
};

export default RecentIssues;
