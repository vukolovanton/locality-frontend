import React from "react";
import { useFetchLocality } from "src/hooks/locality/useFetchLocality";

const Home: React.FC = () => {
  const { locality } = useFetchLocality();

  return (
    <div>
      <h1>{locality.title}</h1>
    </div>
  );
};

export default Home;
