import React, { useState } from "react";
import { IssuesModel } from "src/interfaces/IssuesModel";
import { useLocation } from "react-router-dom";
import NotFound from "src/components/shared/NotFound";
import ModalWindow from "src/components/shared/ModalWindow";
import logo from "src/assets/default.png";
import { formatDate } from "src/utils/helpers";
import {
  ISSUE_STATUSES_CONFIG,
  USER_FACING_ISSUES_STATUS,
} from "src/interfaces/IssueStatuses";
import styles from "./styles.module.scss";
import { useDispatch } from "react-redux";
import { patchIssue } from "../../../state/issues/issuesSlice";

const Issue: React.FC = () => {
  const dispatch = useDispatch();
  const location = useLocation<IssuesModel>();
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  // TODO: fetch issue from backend
  if (!location.state) {
    return <NotFound />;
  }
  const issue = location.state;
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
    <section className={styles.container}>
      <h1>{issue.title}</h1>
      <span>{formatDate(issue.createdAt)}</span>
      <span>{USER_FACING_ISSUES_STATUS[issue.status]}</span>
      <label htmlFor="options">
        Change status:
        <select
          name="options"
          id="options"
          required
          onChange={handleIssueStatusChange}
        >
          {ISSUE_STATUSES_CONFIG.map((c) => (
            <option value={c.value} key={c.value}>
              {c.title}
            </option>
          ))}
        </select>
      </label>

      <div>{renderImage()}</div>
      <p>{issue.description}</p>
      <ModalWindow
        isModalOpen={isModalOpen}
        handleCloseModal={() => setIsModalOpen(false)}
      >
        {renderImage()}
      </ModalWindow>
    </section>
  );
};

export default Issue;
