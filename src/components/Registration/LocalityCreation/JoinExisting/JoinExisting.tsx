import React from "react";
import { useJoinLocality } from "src/hooks/locality/useJoinLocality";
import styles from "src/components/Registration/styles.module.scss";
import SearchPreview from "./SearchPreview";

const JoinExisting: React.FC = () => {
  const {
    handleLocalityIdSelect,
    handleSearchTextChange,
    handleJoinLocality,
    resultList,
    searchText,
    selectedLocalityId,
    errorMessage,
  } = useJoinLocality();

  return (
    <>
      <span className="error">{errorMessage}</span>
      <form method="GET">
        <fieldset>
          <legend>Find your Locality</legend>
          <input
            id={searchText}
            type="text"
            required={true}
            value={searchText}
            className="input-field"
            onChange={handleSearchTextChange}
            placeholder="Start typing locality name"
          />
          <div className={styles.previewItemsContainer}>
            {resultList.map((locality) => (
              <SearchPreview
                locality={locality}
                key={locality.id}
                handleLocalityIdSelect={handleLocalityIdSelect}
              />
            ))}
          </div>
          <button
            onClick={handleJoinLocality}
            disabled={!selectedLocalityId}
            style={{ margin: "2rem auto 0 auto" }}
            className="primary"
          >
            Join
          </button>
        </fieldset>
      </form>
    </>
  );
};

export default JoinExisting;
