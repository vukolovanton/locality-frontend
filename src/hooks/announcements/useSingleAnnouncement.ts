import React, { ChangeEvent, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import { AnnouncementsModel } from "src/interfaces/AnnouncementsModel";
import { currentUserSelector } from "src/state/auth/login/loginSlice";
import {
  announcementsStateSelector,
  getSingleAnnouncement,
  patchAnnouncement,
  singleAnnouncementsSelector,
} from "src/state/announcements/announcementsSlice";

export const useSingleAnnouncement = () => {
  const dispatch = useDispatch();
  const location = useLocation<AnnouncementsModel>();
  const currentUser = useSelector(currentUserSelector);
  const announcement = useSelector(singleAnnouncementsSelector);
  const { loading } = useSelector(announcementsStateSelector);

  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  const urlId = location.pathname.split("/")[2] || 0;

  const handleAnnouncementStatusChange = (
    e: React.ChangeEvent<HTMLSelectElement>
  ) => {
    dispatch(patchAnnouncement(announcement.id, "status", e.target.value));
  };

  const handleModalOpen = () => {
    setIsModalOpen((value) => !value);
  };

  const handleAnnouncementPinnedChange = (e: ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    dispatch(
      patchAnnouncement(announcement.id, "isPinned", !announcement.isPinned)
    );
  };

  useEffect(() => {
    dispatch(getSingleAnnouncement(currentUser.localityId, Number(urlId)));
  }, []);

  return {
    announcement,
    handleAnnouncementStatusChange,
    handleAnnouncementPinnedChange,
    handleModalOpen,
    loading,
    isModalOpen,
  };
};
