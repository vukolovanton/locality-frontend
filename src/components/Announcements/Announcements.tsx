import React from "react";
import { useAnnouncements } from "src/hooks/announcements/useAnnouncements";
import SectionPageLayout from "src/components/shared/SectionPageLayout";
import CreateNewAnnouncement from "./CreateNewAnnouncement";
import Pinned from "./Pinned";
import AllAnnouncements from "./AllAnnouncements";
import SearchAnnouncement from "./SearchAnnouncement";

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
        <SearchAnnouncement />
      </div>
    </SectionPageLayout>
  );
};

export default Announcements;
