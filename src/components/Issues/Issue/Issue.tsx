import React, { useState } from "react";
import { IssuesModel } from "src/interfaces/IssuesModel";
import { useLocation } from "react-router-dom";
import NotFound from "src/components/shared/NotFound";
import ModalWindow from "src/components/shared/ModalWindow";
import logo from "src/assets/default.png";
import styles from "./styles.module.scss";

const Issue: React.FC = () => {
  const location = useLocation<IssuesModel>();
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  if (!location.state) {
    return <NotFound />;
  }
  const issue = location.state;

  const renderImage = () => {
    return (
      <img
        onClick={() => setIsModalOpen((value) => !value)}
        src={issue.imageUrl || logo}
        alt={issue.title}
        width="600"
        height="300"
      />
    );
  };

  return (
    <section className={styles.container}>
      <h1>{issue.title}</h1>
      <div>{renderImage()}</div>
      <p>{issue.description}</p>
      <ModalWindow
        isModalOpen={isModalOpen}
        handleCloseModal={() => setIsModalOpen(false)}
      >
        {renderImage()}
      </ModalWindow>
    </section>
  );
};

export default Issue;
