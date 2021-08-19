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
  currentPage: number;
  handlePaginationClick: (type: string) => void;
}

const AllIssues: React.FC<AllIssuesProps> = ({
  issues,
  handleExpandRowClick,
  isShowAllRowExpanded,
  filterStatus,
  setFilterStatus,
  currentPage,
  handlePaginationClick,
}) => {
  return (
    <section>
      <h3 onClick={handleExpandRowClick} className={styles.allIssuesTitle}>
        All issues {isShowAllRowExpanded ? "↥" : "↧"}
      </h3>
      {isShowAllRowExpanded && (
        <div>
          <button
            disabled={currentPage === 1}
            onClick={() => handlePaginationClick("PREV")}
          >
            Prev
          </button>
          <button onClick={() => handlePaginationClick("NEXT")}>Next</button>
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
