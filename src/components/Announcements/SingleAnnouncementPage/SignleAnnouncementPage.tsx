import React, { useMemo } from "react";
import logo from "src/assets/default.png";
import { USER_FACING_ANNOUNCEMENTS_STATUSES } from "src/interfaces/AnnouncementsStatuses";
import ModalWindow from "src/components/shared/ModalWindow";
import NotFound from "src/components/shared/NotFound";
import SingleItemPageLayout from "src/components/shared/SingleItemPageLayout";
import Loader from "src/components/shared/Loader";
import { useSingleAnnouncement } from "src/hooks/announcements/useSingleAnnouncement";
import Controls from "./Controls";

const SingleAnnouncementPage: React.FC = () => {
  const {
    announcement,
    handleAnnouncementStatusChange,
    handleAnnouncementPinnedChange,
    handleModalOpen,
    loading,
    isModalOpen,
  } = useSingleAnnouncement();

  const renderImage = useMemo(() => {
    return (
      <img
        onClick={handleModalOpen}
        src={announcement.imageUrl || logo}
        alt={announcement.title}
        style={{
          cursor: isModalOpen ? "zoom-out" : "zoom-in",
        }}
        width="600"
        height="300"
      />
    );
  }, [announcement.imageUrl]);

  if (loading) {
    return <Loader />;
  }

  if (announcement.id === 0) {
    return <NotFound />;
  }

  return (
    <SingleItemPageLayout
      title={announcement.title}
      date={announcement.createdAt}
      status={USER_FACING_ANNOUNCEMENTS_STATUSES[announcement.status]}
    >
      <Controls
        status={announcement.status}
        isPinned={announcement.isPinned}
        handleAnnouncementStatusChange={handleAnnouncementStatusChange}
        handleAnnouncementPinnedChange={handleAnnouncementPinnedChange}
      />

      <div>{renderImage}</div>
      <p>{announcement.description}</p>
      {isModalOpen && (
        <ModalWindow
          isModalOpen={isModalOpen}
          handleCloseModal={handleModalOpen}
        >
          {renderImage}
        </ModalWindow>
      )}
    </SingleItemPageLayout>
  );
};

export default React.memo(SingleAnnouncementPage);
