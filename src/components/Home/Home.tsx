import React from "react";
import { useFetchLocality } from "src/hooks/locality/useFetchLocality";
import { useDashboard } from "src/hooks/dashboard/useDashboard";

const Home: React.FC = () => {
  const { locality } = useFetchLocality();
  const { usersStats } = useDashboard();
  console.log(usersStats, "issueStats");

  return (
    <div>
      <h1>{locality.title}</h1>
    </div>
  );
};

export default Home;
