import React from "react";
import {
  IssueStatuses,
  USER_FACING_ISSUES_STATUS,
} from "src/interfaces/IssueStatuses";
import styles from "../../styles.module.scss";

interface FiltersProps {
  filterStatus: IssueStatuses;
  setFilterStatus: (status: IssueStatuses) => void;
}

const config = [
  {
    value: IssueStatuses.PENDING,
    title: USER_FACING_ISSUES_STATUS[IssueStatuses.PENDING],
  },
  {
    value: IssueStatuses.IN_PROGRESS,
    title: USER_FACING_ISSUES_STATUS[IssueStatuses.IN_PROGRESS],
  },
  {
    value: IssueStatuses.RESOLVED,
    title: USER_FACING_ISSUES_STATUS[IssueStatuses.RESOLVED],
  },
  {
    value: IssueStatuses.REJECTED,
    title: USER_FACING_ISSUES_STATUS[IssueStatuses.REJECTED],
  },
];

const Filters: React.FC<FiltersProps> = ({ filterStatus, setFilterStatus }) => {
  return (
    <div className={styles.filtersContainer}>
      {config.map((button) => (
        <button
          className={filterStatus === button.value ? "primary" : ""}
          key={button.value}
          value={button.value}
          onClick={() => {
            setFilterStatus(button.value);
          }}
        >
          {button.title}
        </button>
      ))}
    </div>
  );
};

export default Filters;
