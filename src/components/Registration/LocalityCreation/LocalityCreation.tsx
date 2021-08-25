import React, { useState } from "react";
import styles from "src/components/Registration/styles.module.scss";
import CreateNew from "./CreateNew";
import JoinExisting from "./JoinExisting";
import Title from "../Title";

const LocalityCreation: React.FC = () => {
  const [activeTab, setActiveTab] = useState<string>("new");

  const renderTab = () => {
    switch (activeTab) {
      case "new": {
        return <CreateNew />;
      }
      case "existing": {
        return <JoinExisting />;
      }
    }
    return null;
  };

  return (
    <section className={styles.container}>
      <Title />

      <div className={styles.tabButtonsContainer}>
        <button
          onClick={() => setActiveTab("new")}
          className={activeTab === "new" ? "secondary" : ""}
        >
          Create New
        </button>
        <button
          onClick={() => setActiveTab("existing")}
          className={activeTab === "existing" ? "secondary" : ""}
        >
          Join To Existing
        </button>
      </div>
      {renderTab()}
    </section>
  );
};

export default LocalityCreation;
