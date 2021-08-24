import React, { useState } from "react";
import CreateNew from "./CreateNew";
import ChooseExisting from "./ChooseExisting";
import styles from "src/components/Registration/styles.module.scss";

const LocalityCreation: React.FC = () => {
  const [activeTab, setActiveTab] = useState<string>("new");

  const renderTab = () => {
    switch (activeTab) {
      case "new": {
        return <CreateNew />;
      }
      case "existing": {
        return <ChooseExisting />;
      }
    }
    return null;
  };

  return (
    <section className={styles.container}>
      <button
        onClick={() => setActiveTab("new")}
        className={activeTab === "new" ? "primary" : ""}
      >
        Create New
      </button>
      <button
        onClick={() => setActiveTab("existing")}
        className={activeTab === "existing" ? "primary" : ""}
      >
        Join to existing
      </button>
      {renderTab()}
    </section>
  );
};

export default LocalityCreation;
