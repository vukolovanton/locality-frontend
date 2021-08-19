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
import { PAGINATION_LIMIT } from "src/interfaces/constants";

export const useFetchIssues = () => {
  const dispatch = useDispatch();
  const currentUser = useSelector(currentUserSelector);
  const recentIssues = useSelector(recentIssuesSelector);
  const allIssues = useSelector(allIssuesSelector);

  const [currentPage, setCurrentPage] = useState<number>(1);
  const [filterStatus, setFilterStatus] = useState<IssueStatuses>(
    IssueStatuses.IN_PROGRESS
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

  // Fetch items for 'Recently added' section
  useEffect(() => {
    dispatch(fetchRecentIssues(currentUser.localityId, "createdAt", 4));
  }, []);
  // Fetch items for 'All issues' section
  useEffect(() => {
    dispatch(
      fetchAllIssues(
        currentUser.localityId,
        filterStatus,
        PAGINATION_LIMIT,
        currentPage
      )
    );
  }, [filterStatus, currentPage]);

  return {
    recentIssues,
    allIssues,
    filterStatus,
    setFilterStatus,
    currentPage,
    handlePaginationClick,
  };
};
