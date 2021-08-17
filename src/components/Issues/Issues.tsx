import React from "react";
import RecentlyAdded from "./RecentlyAdded";
import Reports from "./Reports";
import AllIssues from "./AllIssues";
import CreateNewIssue from "./CreateNewIssue";

const Issues: React.FC = () => {
  return (
    <section>
      <CreateNewIssue />
      <RecentlyAdded />
      <Reports />
      <AllIssues />
    </section>
  );
};

export default Issues;
