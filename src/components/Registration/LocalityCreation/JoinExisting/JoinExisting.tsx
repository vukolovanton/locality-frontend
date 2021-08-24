import React from "react";
import { useJoinLocality } from "src/hooks/locality/useJoinLocality";
import styles from "src/components/Registration/styles.module.scss";
import SearchPreview from "./SearchPreview";

const JoinExisting: React.FC = () => {
  const {
    handleLocalityIdSelect,
    handleSubmitSearchForm,
    handleSearchTextChange,
    handleJoinLocality,
    resultList,
    searchText,
    errorMessage,
  } = useJoinLocality();

  return (
    <div>
      <span className="error">{errorMessage}</span>
      <form method="GET" onSubmit={handleSubmitSearchForm}>
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
          <button type="submit" className="btn" disabled={searchText === ""}>
            Search
          </button>
        </fieldset>
      </form>
      <div className={styles.previewItemsContainer}>
        {resultList.map((locality) => (
          <SearchPreview
            locality={locality}
            key={locality.id}
            handleLocalityIdSelect={handleLocalityIdSelect}
          />
        ))}
      </div>
      <button onClick={handleJoinLocality}>Join</button>
    </div>
  );
};

export default JoinExisting;
