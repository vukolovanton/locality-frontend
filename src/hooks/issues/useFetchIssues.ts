import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  allIssuesSelector,
  fetchAllIssues,
  fetchRecentIssues,
  recentIssuesSelector,
} from "src/state/issues/issuesSlice";
import { currentUserSelector } from "src/state/auth/login/loginSlice";
import { IssueStatuses } from "../../interfaces/IssueStatuses";

export const useFetchIssues = () => {
  const dispatch = useDispatch();
  const currentUser = useSelector(currentUserSelector);
  const recentIssues = useSelector(recentIssuesSelector);
  const allIssues = useSelector(allIssuesSelector);

  const [isShowAllRowExpanded, setIsShowAllRowExpanded] =
    useState<boolean>(false);

  const handleExpandRowClick = () => {
    setIsShowAllRowExpanded((value) => !value);
  };

  useEffect(() => {
    dispatch(fetchRecentIssues(currentUser.localityId, "createdAt", 4));
  }, []);

  useEffect(() => {
    console.log(allIssues, "allIssues");
    if (isShowAllRowExpanded) {
      dispatch(fetchAllIssues(currentUser.localityId, IssueStatuses.PENDING));
    }
  }, [isShowAllRowExpanded]);

  return {
    recentIssues,
    allIssues,
    isShowAllRowExpanded,
    handleExpandRowClick,
  };
};
