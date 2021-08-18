import React from "react";
import {
  ISSUE_STATUSES_CONFIG,
  IssueStatuses,
} from "src/interfaces/IssueStatuses";
import styles from "../../styles.module.scss";

interface FiltersProps {
  filterStatus: IssueStatuses;
  setFilterStatus: (status: IssueStatuses) => void;
}

const Filters: React.FC<FiltersProps> = ({ filterStatus, setFilterStatus }) => {
  return (
    <div className={styles.filtersContainer}>
      {ISSUE_STATUSES_CONFIG.map((button) => (
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
