import React from "react";
import IssuePreview from "src/components/shared/IssuePreview";
import { IssuesModel } from "src/interfaces/IssuesModel";

import styles from "../styles.module.scss";
import Filters from "./Filters";
import { IssueStatuses } from "../../../interfaces/IssueStatuses";

interface AllIssuesProps {
  issues: Array<IssuesModel>;
  handleExpandRowClick: () => void;
  isShowAllRowExpanded: boolean;
  filterStatus: IssueStatuses;
  setFilterStatus: (status: IssueStatuses) => void;
}

const AllIssues: React.FC<AllIssuesProps> = ({
  issues,
  handleExpandRowClick,
  isShowAllRowExpanded,
  filterStatus,
  setFilterStatus,
}) => {
  return (
    <section>
      <h3 onClick={handleExpandRowClick} className={styles.allIssuesTitle}>
        All issues {isShowAllRowExpanded ? "↥" : "↧"}
      </h3>
      {isShowAllRowExpanded && (
        <div>
          <Filters
            filterStatus={filterStatus}
            setFilterStatus={setFilterStatus}
          />
          <div className={styles.issuesContainer}>
            {issues.map((issue) => (
              <IssuePreview issue={issue} key={issue.id} />
            ))}
          </div>
        </div>
      )}
    </section>
  );
};

export default AllIssues;
