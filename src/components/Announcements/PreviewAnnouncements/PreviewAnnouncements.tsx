import React from "react";
import { useAnnouncements } from "src/hooks/announcements/useAnnouncements";
import PinnedAnnouncements from "../PinnedAnnouncements";
import AllAnnouncements from "../AllAnnouncements";

const PreviewAnnouncements: React.FC = () => {
  const {
    pinnedAnnouncements,
    allAnnouncements,
    filterStatus,
    setFilterStatus,
    handlePaginationClick,
    currentPage,
  } = useAnnouncements();

  return (
    <div>
      <PinnedAnnouncements announcements={pinnedAnnouncements} />
      <AllAnnouncements
        announcements={allAnnouncements}
        filterStatus={filterStatus}
        setFilterStatus={setFilterStatus}
        currentPage={currentPage}
        handlePaginationClick={handlePaginationClick}
      />
    </div>
  );
};

export default PreviewAnnouncements;
