import React from "react";
import { PieChart, Pie, Cell, Tooltip } from "recharts";

interface PieChartGraphProps {
  data: Array<{
    name: string;
    value: number;
    color: string;
  }>;
}

const PieChartGraph: React.FC<PieChartGraphProps> = ({ data }) => {
  return (
    <>
      <PieChart width={200} height={200}>
        <Pie
          data={data}
          cx="50%"
          cy="50%"
          innerRadius={30}
          outerRadius={80}
          dataKey="value"
        >
          {data.map((entry, index) => (
            <Cell
              key={`cell-${index}`}
              fill={entry.color}
              stroke={entry.color}
            />
          ))}
        </Pie>
        <Tooltip
          allowEscapeViewBox={{ x: true, y: false }}
          contentStyle={{ padding: "10px 20px" }}
        />
      </PieChart>
    </>
  );
};

export default PieChartGraph;
