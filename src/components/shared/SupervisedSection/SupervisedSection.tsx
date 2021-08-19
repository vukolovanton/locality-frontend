import React from "react";
import styles from "./styles.module.scss";

interface SupervisedSectionProps {
  title: string;
  children: React.ReactNode;
}

const SupervisedSection: React.FC<SupervisedSectionProps> = ({
  title,
  children,
}) => {
  return (
    <section className={styles.section}>
      <h3>{title}</h3>
      <div className="grid-container">{children}</div>
    </section>
  );
};

export default SupervisedSection;
