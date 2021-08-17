import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllIssues, issuesSelector } from "src/state/issues/issuesSlice";
import { currentUserSelector } from "src/state/auth/login/loginSlice";

export const useFetchIssues = () => {
  const dispatch = useDispatch();
  const currentUser = useSelector(currentUserSelector);
  const issues = useSelector(issuesSelector);

  useEffect(() => {
    dispatch(fetchAllIssues(currentUser.localityId, "createdAt", 3));
  }, []);

  return {
    issues,
  };
};
