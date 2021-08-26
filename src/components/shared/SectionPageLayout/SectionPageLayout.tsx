import React from "react";
import styles from "./styles.module.scss";

interface SectionPageLayoutProps {
  children: React.ReactNode;
  isShrinked?: boolean;
}

const SectionPageLayout: React.FC<SectionPageLayoutProps> = ({
  children,
  isShrinked = false,
}) => {
  return (
    <section
      className={isShrinked ? styles.shrinkedMainLayout : styles.mainLayout}
    >
      {children}
    </section>
  );
};

export default SectionPageLayout;
