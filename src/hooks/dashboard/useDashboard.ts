import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  announcementsStatsSelector,
  fetchAllStats,
  issuesStatsSelector,
} from "src/state/dashboard/dashboardSlice";
import { currentUserSelector } from "src/state/auth/login/loginSlice";

export const useDashboard = () => {
  const dispatch = useDispatch();
  const currentUser = useSelector(currentUserSelector);

  const issueStats = useSelector(issuesStatsSelector);
  const announcementsStats = useSelector(announcementsStatsSelector);

  useEffect(() => {
    dispatch(fetchAllStats(currentUser.localityId));
  }, []);

  return {
    issueStats,
    announcementsStats,
  };
};
