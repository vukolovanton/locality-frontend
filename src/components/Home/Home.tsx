import React from "react";
import { useFetchLocality } from "src/hooks/locality/useFetchLocality";
import Dashboard from "./Dashboard";
import { useSelector } from "react-redux";
import { usersStatsSelector } from "src/state/dashboard/dashboardSlice";
import styles from "src/components/Home/styles.module.scss";

const Home: React.FC = () => {
  const { locality, user } = useFetchLocality();
  const usersStats = useSelector(usersStatsSelector);

  return (
    <div className="page-layout">
      <div className={styles.title}>
        <h1>{locality.title}</h1>
        <span>{usersStats.TOTAL_USERS} people in this locality</span>
      </div>

      <h2>Welcome home, {user.username}</h2>
      <Dashboard />
    </div>
  );
};

export default Home;
