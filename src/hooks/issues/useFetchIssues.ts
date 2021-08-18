import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  allIssuesSelector,
  fetchAllIssues,
  fetchRecentIssues,
  recentIssuesSelector,
} from "src/state/issues/issuesSlice";
import { currentUserSelector } from "src/state/auth/login/loginSlice";
import { IssueStatuses } from "src/interfaces/IssueStatuses";

export const useFetchIssues = () => {
  const dispatch = useDispatch();
  const currentUser = useSelector(currentUserSelector);
  const recentIssues = useSelector(recentIssuesSelector);
  const allIssues = useSelector(allIssuesSelector);

  const [isShowAllRowExpanded, setIsShowAllRowExpanded] =
    useState<boolean>(false);
  const [filterStatus, setFilterStatus] = useState<IssueStatuses>(
    IssueStatuses.IN_PROGRESS
  );

  const handleExpandRowClick = () => {
    setIsShowAllRowExpanded((value) => !value);
  };

  useEffect(() => {
    dispatch(fetchRecentIssues(currentUser.localityId, "createdAt", 4));
  }, []);

  useEffect(() => {
    if (isShowAllRowExpanded) {
      dispatch(fetchAllIssues(currentUser.localityId, filterStatus));
    }
  }, [isShowAllRowExpanded, filterStatus]);

  return {
    recentIssues,
    allIssues,
    isShowAllRowExpanded,
    handleExpandRowClick,
    filterStatus,
    setFilterStatus,
  };
};
