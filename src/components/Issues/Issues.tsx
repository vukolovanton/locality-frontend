import React from "react";
import { useIssues } from "src/hooks/issues/useIssues";
import SectionPageLayout from "src/components/shared/SectionPageLayout";
import RecentIssues from "./RecentIssues";
import Reports from "./Reports";
import AllIssues from "./AllIssues";
import CreateNewIssue from "./CreateNewIssue";

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
    <SectionPageLayout>
      <div>
        <RecentIssues issues={recentIssues} />
        <AllIssues
          issues={allIssues}
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
    </SectionPageLayout>
  );
};

export default Issues;
