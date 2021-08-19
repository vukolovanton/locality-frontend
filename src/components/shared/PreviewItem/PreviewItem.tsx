import React from "react";
import { Link } from "react-router-dom";
import { IssuesModel } from "src/interfaces/IssuesModel";
import { USER_FACING_ISSUES_STATUS } from "src/interfaces/IssueStatuses";
import logo from "src/assets/default.png";
import { formatDate } from "src/utils/helpers";
import { AnnouncementsModel } from "src/interfaces/AnnouncementsModel";
import { USER_FACING_ANNOUNCEMENTS_STATUSES } from "src/interfaces/AnnouncementsStatuses";
import styles from "./styles.module.scss";

interface PreviewItemProps {
  item: IssuesModel | AnnouncementsModel;
  path: string;
}

const PreviewItem: React.FC<PreviewItemProps> = ({ item, path }) => {
  return (
    <div>
      <div className={styles.box}>
        <img
          src={item.imageUrl || logo}
          alt={item.title}
          className={styles.image}
          width="600"
          height="400"
        />
      </div>
      <Link
        to={{
          pathname: `${path}/${item.id}`,
          state: item,
        }}
      >
        <span className={styles.title}>{item.title}</span>
      </Link>
      <div className={styles.info}>
        <span>
          {USER_FACING_ISSUES_STATUS[item.status] ||
            USER_FACING_ANNOUNCEMENTS_STATUSES[item.status]}
        </span>
        <span>{formatDate(item.createdAt)}</span>
      </div>
    </div>
  );
};

export default PreviewItem;
