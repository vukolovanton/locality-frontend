import React from "react";
import PreviewItem from "src/components/shared/IssuePreview";
import { IssuesModel } from "src/interfaces/IssuesModel";
import { IssueStatuses } from "src/interfaces/IssueStatuses";
import { PAGINATION_LIMIT } from "src/interfaces/constants";

import styles from "../styles.module.scss";
import Filters from "./Filters";

interface AllIssuesProps {
  issues: Array<IssuesModel>;
  filterStatus: IssueStatuses;
  setFilterStatus: (status: IssueStatuses) => void;
  currentPage: number;
  handlePaginationClick: (type: string) => void;
}

const AllIssues: React.FC<AllIssuesProps> = ({
  issues,
  filterStatus,
  setFilterStatus,
  currentPage,
  handlePaginationClick,
}) => {
  return (
    <section>
      <h2 className={styles.allIssuesTitle}>All issues</h2>
      <div>
        <Filters
          filterStatus={filterStatus}
          setFilterStatus={setFilterStatus}
        />
        <div className={styles.issuesContainer}>
          {issues.map((issue) => (
            <PreviewItem item={issue} key={issue.id} path="/issues" />
          ))}
        </div>

        <button
          disabled={currentPage === 1}
          onClick={() => handlePaginationClick("PREV")}
        >
          Prev
        </button>
        <button
          disabled={issues.length < PAGINATION_LIMIT}
          onClick={() => handlePaginationClick("NEXT")}
        >
          Next
        </button>
      </div>
    </section>
  );
};

export default AllIssues;
