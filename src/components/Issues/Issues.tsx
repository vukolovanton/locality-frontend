import React from "react";
import RecentlyAdded from "./RecentlyAdded";
import Reports from "./Reports";
import AllIssues from "./AllIssues";
import CreateNewIssue from "./CreateNewIssue";
import styles from "./styles.module.scss";

const Issues: React.FC = () => {
  return (
    <section className={styles.mainLayout}>
      <div>
        <RecentlyAdded />
        <AllIssues />
      </div>

      <div>
        <CreateNewIssue />
        <Reports />
      </div>
    </section>
  );
};

export default Issues;
