import React from "react";
import { IssueStatsModel } from "src/interfaces/dashboard/IssueStatsModel";
import PieChartGraph from "src/components/shared/PieChartGraph";
import styles from "src/components/Home/styles.module.scss";

interface IssuesChartProps {
  stats: IssueStatsModel;
}

const IssuesChart: React.FC<IssuesChartProps> = ({ stats }) => {
  const data = [
    {
      name: "In Progress",
      value: stats.IN_PROGRESS,
      color: "#B3E283",
    },
    {
      name: "Pending",
      value: stats.PENDING,
      color: "#F3C583",
    },
    {
      name: "Resolved",
      value: stats.RESOLVED,
      color: "#FFBB28",
    },
    {
      name: "Rejected",
      value: stats.REJECTED,
      color: "#E99497",
    },
  ];

  return (
    <div className={styles.container}>
      <div>
        <h3>Issues</h3>
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

export default IssuesChart;
