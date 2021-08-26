import React from "react";
import { Link } from "react-router-dom";
import { AnnouncementsModel } from "src/interfaces/AnnouncementsModel";
import styles from "../styles.module.scss";

interface SearchResultsProps {
  searchResults: Array<AnnouncementsModel> | null;
}

const SearchResults: React.FC<SearchResultsProps> = ({ searchResults }) => {
  if (!searchResults) {
    return null;
  }

  return (
    <div className={styles.container}>
      {searchResults.length > 0 ? (
        searchResults.map((item) => (
          <div key={item.id}>
            <Link to={`/announcements/${item.id}`}>
              <span className={styles.title}>{item.title}</span>
            </Link>
            <p className={styles.description}>{item.description}</p>
          </div>
        ))
      ) : (
        <span>No results</span>
      )}
    </div>
  );
};

export default SearchResults;
