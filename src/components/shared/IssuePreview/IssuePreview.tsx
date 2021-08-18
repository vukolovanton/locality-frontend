import React from "react";
import { Link } from "react-router-dom";
import { IssuesModel } from "src/interfaces/IssuesModel";
import { USER_FACING_ISSUES_STATUS } from "src/interfaces/IssueStatuses";
import logo from "src/assets/default.png";
import { formatDate } from "src/utils/helpers";
import styles from "./styles.module.scss";

interface IssuePreviewProps {
  issue: IssuesModel;
}

const IssuePreview: React.FC<IssuePreviewProps> = ({ issue }) => {
  return (
    <div>
      <div className={styles.box}>
        <img
          src={issue.imageUrl || logo}
          alt={issue.title}
          className={styles.image}
          width="600"
          height="400"
        />
      </div>
      <Link
        to={{
          pathname: `/issues/${issue.id}`,
          state: issue,
        }}
      >
        <span className={styles.title}>{issue.title}</span>
      </Link>
      <div className={styles.info}>
        <span>{USER_FACING_ISSUES_STATUS[issue.status]}</span>
        <span>{formatDate(issue.createdAt)}</span>
      </div>
    </div>
  );
};

export default IssuePreview;
