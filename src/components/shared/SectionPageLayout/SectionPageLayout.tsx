import React from "react";
import styles from "./styles.module.scss";

interface SectionPageLayoutProps {
  children: React.ReactNode;
}

const SectionPageLayout: React.FC<SectionPageLayoutProps> = ({ children }) => {
  return <section className={styles.mainLayout}>{children}</section>;
};

export default SectionPageLayout;
