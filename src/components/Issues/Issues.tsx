import React from "react";
import { useFetchIssues } from "src/hooks/issues/useFetchIssues";

import RecentIssues from "./RecentIssues";
import Reports from "./Reports";
import AllIssues from "./AllIssues";
import CreateNewIssue from "./CreateNewIssue";
import styles from "./styles.module.scss";

const Issues: React.FC = () => {
  const {
    recentIssues,
    allIssues,
    isShowAllRowExpanded,
    handleExpandRowClick,
    filterStatus,
    setFilterStatus,
    currentPage,
    handlePaginationClick,
  } = useFetchIssues();

  return (
    <section className={styles.mainLayout}>
      <div>
        <RecentIssues issues={recentIssues} />
        <AllIssues
          issues={allIssues}
          isShowAllRowExpanded={isShowAllRowExpanded}
          handleExpandRowClick={handleExpandRowClick}
          filterStatus={filterStatus}
          setFilterStatus={setFilterStatus}
          currentPage={currentPage}
          handlePaginationClick={handlePaginationClick}
        />
      </div>

      <div>
        <CreateNewIssue />
        <Reports />
      </div>
    </section>
  );
};

export default Issues;
