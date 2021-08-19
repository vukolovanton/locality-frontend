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
  const [currentPage, setCurrentPage] = useState<number>(1);

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

  const handleExpandRowClick = () => {
    setIsShowAllRowExpanded((value) => !value);
  };

  useEffect(() => {
    dispatch(fetchRecentIssues(currentUser.localityId, "createdAt", 4));
  }, []);

  useEffect(() => {
    if (isShowAllRowExpanded) {
      dispatch(
        fetchAllIssues(currentUser.localityId, filterStatus, 4, currentPage)
      );
    }
  }, [isShowAllRowExpanded, filterStatus, currentPage]);

  return {
    recentIssues,
    allIssues,
    isShowAllRowExpanded,
    handleExpandRowClick,
    filterStatus,
    setFilterStatus,
    currentPage,
    handlePaginationClick,
  };
};
