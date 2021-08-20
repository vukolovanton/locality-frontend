import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useLocation } from "react-router-dom";
import logo from "src/assets/default.png";
import {
  USER_FACING_ANNOUNCEMENTS_STATUSES,
  ANNOUNCEMENTS_STATUSES_CONFIG,
} from "src/interfaces/AnnouncementsStatuses";
import ModalWindow from "src/components/shared/ModalWindow";
import { AnnouncementsModel } from "src/interfaces/AnnouncementsModel";
import NotFound from "src/components/shared/NotFound";
import SingleItemPageLayout from "src/components/shared/SingleItemPageLayout";
import { patchAnnouncement } from "src/state/announcements/announcementsSlice";

const SingleAnnouncementPage: React.FC = () => {
  const dispatch = useDispatch();
  const location = useLocation<AnnouncementsModel>();
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  // TODO: fetch issue from backend
  if (!location.state) {
    return <NotFound />;
  }
  const announcement: AnnouncementsModel = location.state;
  const handleAnnouncementStatusChange = (
    e: React.ChangeEvent<HTMLSelectElement>
  ) => {
    dispatch(patchAnnouncement(announcement.id, "status", e.target.value));
  };

  const renderImage = () => {
    return (
      <img
        onClick={() => setIsModalOpen((value) => !value)}
        src={announcement.imageUrl || logo}
        alt={announcement.title}
        style={{
          cursor: isModalOpen ? "zoom-out" : "zoom-in",
        }}
        width="600"
        height="300"
      />
    );
  };

  return (
    <SingleItemPageLayout
      title={announcement.title}
      date={announcement.createdAt}
      status={USER_FACING_ANNOUNCEMENTS_STATUSES[announcement.status]}
    >
      <label htmlFor="options">
        Change status:
        <select
          name="options"
          id="options"
          required
          onChange={handleAnnouncementStatusChange}
        >
          {ANNOUNCEMENTS_STATUSES_CONFIG.map((c) => (
            <option value={c.value} key={c.value}>
              {c.title}
            </option>
          ))}
        </select>
      </label>

      <div>{renderImage()}</div>
      <p>{announcement.description}</p>
      <ModalWindow
        isModalOpen={isModalOpen}
        handleCloseModal={() => setIsModalOpen(false)}
      >
        {renderImage()}
      </ModalWindow>
    </SingleItemPageLayout>
  );
};

export default SingleAnnouncementPage;
