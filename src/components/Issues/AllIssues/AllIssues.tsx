import React from "react";
import IssuePreview from "src/components/shared/IssuePreview";
import { IssuesModel } from "src/interfaces/IssuesModel";

import styles from "../styles.module.scss";

interface AllIssuesProps {
  issues: Array<IssuesModel>;
  handleExpandRowClick: () => void;
  isShowAllRowExpanded: boolean;
}

const AllIssues: React.FC<AllIssuesProps> = ({
  issues,
  handleExpandRowClick,
  isShowAllRowExpanded,
}) => {
  return (
    <section>
      <h3 onClick={handleExpandRowClick} className={styles.allIssuesTitle}>
        All issues {isShowAllRowExpanded ? "↥" : "↧"}
      </h3>
      {isShowAllRowExpanded && (
        <div className={styles.issuesContainer}>
          {issues.map((issue) => (
            <IssuePreview issue={issue} key={issue.id} />
          ))}
        </div>
      )}
    </section>
  );
};

export default AllIssues;
