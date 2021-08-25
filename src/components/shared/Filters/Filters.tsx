import React from "react";
import { IssueStatuses } from "src/interfaces/IssueStatuses";
import styles from "../../Issues/styles.module.scss";
import { AnnouncementsStatuses } from "src/interfaces/AnnouncementsStatuses";

interface FiltersProps {
  filterStatus: IssueStatuses | AnnouncementsStatuses;
  setFilterStatus: (status: any) => void;
  config: Array<{ value: string; title: string }>;
}

const Filters: React.FC<FiltersProps> = ({
  config,
  filterStatus,
  setFilterStatus,
}) => {
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
