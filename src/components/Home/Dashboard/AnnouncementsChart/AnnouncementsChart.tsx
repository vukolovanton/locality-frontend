import React from "react";
import PieChartGraph from "src/components/shared/PieChartGraph";
import { AnnouncementsStatsModel } from "src/interfaces/dashboard/AnnouncementsStatsModel";
import styles from "src/components/Home/styles.module.scss";

interface AnnouncementsChartProps {
  stats: AnnouncementsStatsModel;
}

const AnnouncementsChart: React.FC<AnnouncementsChartProps> = ({ stats }) => {
  const data = [
    {
      name: "In Progress",
      value: stats.ACTIVE,
      color: "#F6A9A9",
    },
    {
      name: "Pending",
      value: stats.CLOSED,
      color: "#B6C9F0",
    },
  ];

  return (
    <div className={styles.container}>
      <div>
        <h3>Announcements</h3>
        <div className={styles.itemsContainer}>
          {data.map((item) => (
            <div className={styles.item} key={item.name}>
              <span>{item.name}:</span>
              <span>{item.value}</span>
            </div>
          ))}
        </div>
      </div>

      <PieChartGraph data={data} />
    </div>
  );
};

export default AnnouncementsChart;
