import React from "react";
import { AnnouncementsModel } from "src/interfaces/AnnouncementsModel";
import styles from "../styles.module.scss";

interface SearchResultsProps {
  searchResults: Array<AnnouncementsModel>;
}

const SearchResults: React.FC<SearchResultsProps> = ({ searchResults }) => {
  if (!searchResults) {
    return null;
  }

  return (
    <div className={styles.container}>
      {searchResults.map((item) => (
        <div key={item.id}>
          <span className={styles.title}>{item.title}</span>
          <p className={styles.description}>{item.description}</p>
        </div>
      ))}
    </div>
  );
};

export default SearchResults;
