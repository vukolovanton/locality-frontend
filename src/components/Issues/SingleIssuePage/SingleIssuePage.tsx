import React, { useEffect, useState } from "react";
import { IssuesModel } from "src/interfaces/IssuesModel";
import { useLocation } from "react-router-dom";
import NotFound from "src/components/shared/NotFound";
import ModalWindow from "src/components/shared/ModalWindow";
import logo from "src/assets/default.png";
import {
  ISSUE_STATUSES_CONFIG,
  USER_FACING_ISSUES_STATUS,
} from "src/interfaces/IssueStatuses";
import { useDispatch, useSelector } from "react-redux";
import {
  clearSingleIssueState,
  fetchSingleIssue,
  issuesStateSelector,
  patchIssue,
  singleIssueSelector,
} from "src/state/issues/issuesSlice";
import SingleItemPageLayout from "src/components/shared/SingleItemPageLayout";
import Loader from "src/components/shared/Loader";
import { currentUserSelector } from "src/state/auth/login/loginSlice";
import { Roles } from "src/interfaces/roles";

const SingleIssuePage: React.FC = () => {
  const dispatch = useDispatch();
  const location = useLocation<IssuesModel>();
  const issue = useSelector(singleIssueSelector);
  const { isFetching } = useSelector(issuesStateSelector);
  const currentUser = useSelector(currentUserSelector);

  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  const urlId = location.pathname.split("/")[2] || 0;

  useEffect(() => {
    dispatch(fetchSingleIssue(Number(urlId)));
    return () => {
      dispatch(clearSingleIssueState());
    };
  }, []);

  if (isFetching) {
    return <Loader />;
  }

  // Only default reducer issue has id = 0
  if (issue.id === 0) {
    return <NotFound />;
  }

  console.log(currentUser);

  const handleIssueStatusChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    dispatch(patchIssue(issue.id, "status", e.target.value));
  };

  const renderImage = () => {
    return (
      <img
        onClick={() => setIsModalOpen((value) => !value)}
        src={issue.imageUrl || logo}
        alt={issue.title}
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
      title={issue.title}
      date={issue.createdAt}
      status={USER_FACING_ISSUES_STATUS[issue.status]}
    >
      {currentUser.role !== Roles.USER ? (
        <label htmlFor="options">
          Change status:
          <select
            name="options"
            id="options"
            required
            value={issue.status}
            onChange={handleIssueStatusChange}
          >
            {ISSUE_STATUSES_CONFIG.map((c) => (
              <option value={c.value} key={c.value}>
                {c.title}
              </option>
            ))}
          </select>
        </label>
      ) : null}

      <div>{renderImage()}</div>
      <p>{issue.description}</p>
      <ModalWindow
        isModalOpen={isModalOpen}
        handleCloseModal={() => setIsModalOpen(false)}
      >
        {renderImage()}
      </ModalWindow>
    </SingleItemPageLayout>
  );
};

export default SingleIssuePage;
