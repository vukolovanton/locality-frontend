import React, { FormEvent, useState } from "react";
import { useSelector } from "react-redux";
import { currentUserSelector } from "src/state/auth/login/loginSlice";
import { api } from "src/utils/api";
import { AnnouncementsModel } from "src/interfaces/AnnouncementsModel";
import SearchResults from "./SearchResults";
import styles from "./styles.module.scss";

const SearchAnnouncement: React.FC = () => {
  const currentUser = useSelector(currentUserSelector);
  const [searchText, setSearchText] = useState<string>("");
  const [resultList, setResultList] =
    useState<Array<AnnouncementsModel> | null>(null);

  const handleSearchTextChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (value === "") {
      setResultList(null);
    }
    setSearchText(e.target.value);
  };

  const handleSubmitSearchForm = async (e: FormEvent) => {
    e.preventDefault();

    const response = await api.getRequest("/announcements", {
      localityId: currentUser.localityId,
      searchText: searchText,
    });
    const data = await response.json();
    setResultList(data);
  };

  return (
    <div className={styles.container}>
      <form method="GET" onSubmit={handleSubmitSearchForm}>
        <label htmlFor="searchText">Search announcement by title</label>
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

      <SearchResults searchResults={resultList} />
    </div>
  );
};

export default SearchAnnouncement;
