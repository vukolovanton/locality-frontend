import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  allAnnouncementsSelector,
  fetchAllAnnouncements,
  fetchPinnedAnnouncements,
  pinnedAnnouncementsSelector,
} from "src/state/announcements/announcementsSlice";
import { currentUserSelector } from "src/state/auth/login/loginSlice";
import { PAGINATION_LIMIT } from "src/interfaces/constants";
import { AnnouncementsStatuses } from "src/interfaces/AnnouncementsStatuses";

export const useAnnouncements = () => {
  const dispatch = useDispatch();
  const currentUser = useSelector(currentUserSelector);
  const allAnnouncements = useSelector(allAnnouncementsSelector);
  const pinnedAnnouncements = useSelector(pinnedAnnouncementsSelector);

  const [currentPage, setCurrentPage] = useState<number>(1);
  const [filterStatus, setFilterStatus] = useState<AnnouncementsStatuses>(
    AnnouncementsStatuses.ACTIVE
  );

  const handlePaginationClick = (type: string) => {
    switch (type) {
      case "PREV":
        setCurrentPage((value: number) => value - 1);
        break;
      case "NEXT":
        setCurrentPage((value: number) => value + 1);
        break;
    }
  };

  // Fetch all announcements
  useEffect(() => {
    dispatch(
      fetchAllAnnouncements(
        currentUser.localityId,
        filterStatus,
        PAGINATION_LIMIT,
        currentPage
      )
    );
  }, [currentPage, filterStatus]);

  // Fetch pinned announcements
  useEffect(() => {
    dispatch(
      fetchPinnedAnnouncements(currentUser.localityId, PAGINATION_LIMIT, 1)
    );
  }, []);

  return {
    allAnnouncements,
    pinnedAnnouncements,
    filterStatus,
    setFilterStatus,
    currentPage,
    handlePaginationClick,
  };
};
