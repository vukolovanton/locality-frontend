import React from "react";
import { useDashboard } from "src/hooks/dashboard/useDashboard";
import IssuesChart from "./IssuesChart";
import AnnouncementsChart from "./AnnouncementsChart";
import styles from "src/components/Home/styles.module.scss";

const Dashboard: React.FC = () => {
  const { issueStats, announcementsStats } = useDashboard();

  return (
    <section className={styles.dashboardSection}>
      <IssuesChart stats={issueStats} />
      <AnnouncementsChart stats={announcementsStats} />
    </section>
  );
};

export default Dashboard;
