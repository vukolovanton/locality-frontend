import React from "react";
import { useJoinLocality } from "src/hooks/locality/useJoinLocality";
import styles from "src/components/Registration/styles.module.scss";
import SearchLocalityPreview from "../SearchLocalityPreview";

const ChooseExisting: React.FC = () => {
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
        <label htmlFor="searchText">Find your Locality</label>
        <input
          id={searchText}
          type="text"
          required={true}
          value={searchText}
          className="input-field"
          onChange={handleSearchTextChange}
        />
        <button type="submit" className="btn" disabled={searchText === ""}>
          Search
        </button>
      </form>
      <div className={styles.previewItemsContainer}>
        {resultList.map((locality) => (
          <SearchLocalityPreview
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

export default ChooseExisting;
