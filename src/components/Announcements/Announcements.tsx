import React from "react";
import { useAnnouncements } from "src/hooks/announcements/useAnnouncements";
import SectionPageLayout from "src/components/shared/SectionPageLayout";
import CreateNewAnnouncement from "./CreateNewAnnouncement";
import Pinned from "./Pinned";
import AllAnnouncements from "./AllAnnouncements";

const Announcements: React.FC = () => {
  const {
    pinnedAnnouncements,
    allAnnouncements,
    filterStatus,
    setFilterStatus,
    handlePaginationClick,
    currentPage,
  } = useAnnouncements();

  return (
    <SectionPageLayout>
      <div>
        <Pinned announcements={pinnedAnnouncements} />
        <AllAnnouncements
          announcements={allAnnouncements}
          filterStatus={filterStatus}
          setFilterStatus={setFilterStatus}
          currentPage={currentPage}
          handlePaginationClick={handlePaginationClick}
        />
      </div>

      <div>
        <CreateNewAnnouncement />
      </div>
    </SectionPageLayout>
  );
};

export default Announcements;
