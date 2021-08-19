import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  announcementsSelector,
  fetchAllAnnouncements,
} from "src/state/announcements/announcementsSlice";
import { currentUserSelector } from "src/state/auth/login/loginSlice";
import { PAGINATION_LIMIT } from "src/interfaces/constants";

export const useAnnouncements = () => {
  const dispatch = useDispatch();
  const currentUser = useSelector(currentUserSelector);
  const announcements = useSelector(announcementsSelector);

  useEffect(() => {
    dispatch(
      fetchAllAnnouncements(currentUser.localityId, PAGINATION_LIMIT, 1)
    );
  }, []);

  return {
    announcements,
  };
};
