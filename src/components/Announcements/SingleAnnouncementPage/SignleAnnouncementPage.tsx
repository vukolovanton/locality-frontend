import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
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
import {
  announcementsStateSelector,
  getSingleAnnouncement,
  patchAnnouncement,
  singleAnnouncementsSelector,
} from "src/state/announcements/announcementsSlice";
import { currentUserSelector } from "src/state/auth/login/loginSlice";
import Loader from "src/components/shared/Loader";

const SingleAnnouncementPage: React.FC = () => {
  const dispatch = useDispatch();
  const location = useLocation<AnnouncementsModel>();
  const currentUser = useSelector(currentUserSelector);
  const announcement = useSelector(singleAnnouncementsSelector);
  const { loading } = useSelector(announcementsStateSelector);

  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  const urlId = location.pathname.split("/")[2] || 0;

  useEffect(() => {
    dispatch(getSingleAnnouncement(currentUser.localityId, Number(urlId)));
  }, []);

  if (loading) {
    return <Loader />;
  }

  if (announcement.id === 0) {
    return <NotFound />;
  }

  const handleAnnouncementStatusChange = (
    e: React.ChangeEvent<HTMLSelectElement>
  ) => {
    dispatch(patchAnnouncement(announcement.id, "status", e.target.value));
  };

  const handleAnnouncementPinnedChange = () => {
    dispatch(
      patchAnnouncement(announcement.id, "isPinned", !announcement.isPinned)
    );
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
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "2fr 1fr",
          alignItems: "center",
          justifyItems: "start",
        }}
      >
        <div>
          <label htmlFor="options">Change status:</label>
          <select
            name="options"
            id="options"
            required
            value={announcement.status}
            onChange={handleAnnouncementStatusChange}
          >
            {ANNOUNCEMENTS_STATUSES_CONFIG.map((c) => (
              <option value={c.value} key={c.value}>
                {c.title}
              </option>
            ))}
          </select>
        </div>

        <div
          className="checkbox"
          style={{
            justifySelf: "end",
          }}
        >
          <input
            type="checkbox"
            name="isPinned"
            id="isPinned"
            checked={announcement.isPinned}
            onChange={handleAnnouncementPinnedChange}
          />
          <label htmlFor="isPinned">
            <i className="material-icons">bookmark_border</i>
          </label>
        </div>
      </div>

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
