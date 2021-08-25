import React from "react";
import { formatDate } from "src/utils/helpers";
import styles from "./styles.module.scss";

interface SingleItemPageLayoutProps {
  children: React.ReactNode;
  title: string;
  date: string;
  status: string;
}

const SingleItemPageLayout: React.FC<SingleItemPageLayoutProps> = ({
  title,
  date,
  status,
  children,
}) => {
  return (
    <section className={styles.container}>
      <div className={styles.header}>
        <h1>{title}</h1>
        <div>
          <span>{formatDate(date)}</span>
          <span>{status}</span>
        </div>
      </div>
      {children}
    </section>
  );
};

export default SingleItemPageLayout;
