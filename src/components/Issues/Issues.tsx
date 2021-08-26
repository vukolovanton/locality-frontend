import React from "react";
import { useIssues } from "src/hooks/issues/useIssues";
import SectionPageLayout from "src/components/shared/SectionPageLayout";
import RecentIssues from "./RecentIssues";
import AllIssues from "./AllIssues";

const Issues: React.FC = () => {
  const {
    recentIssues,
    allIssues,
    filterStatus,
    setFilterStatus,
    currentPage,
    handlePaginationClick,
  } = useIssues();

  return (
    <SectionPageLayout isShrinked>
      <RecentIssues issues={recentIssues} />
      <AllIssues
        issues={allIssues}
        filterStatus={filterStatus}
        setFilterStatus={setFilterStatus}
        currentPage={currentPage}
        handlePaginationClick={handlePaginationClick}
      />
    </SectionPageLayout>
  );
};

export default Issues;
