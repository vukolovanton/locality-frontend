import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import useDebounce from "src/utils/useDebounce";
import { currentUserSelector } from "src/state/auth/login/loginSlice";
import { LocalityDto } from "src/interfaces/LocalityDto";

export const useJoinLocality = () => {
  const history = useHistory();
  const currentUser = useSelector(currentUserSelector);
  const [selectedLocalityId, setSelectedLocalityId] = useState("");
  const [searchText, setSearchText] = useState<string>("");
  const [resultList, setResultList] = useState<Array<LocalityDto>>([]);
  const [errorMessage, setErrorMessage] = useState<string>("");

  const debouncedSearchText = useDebounce(searchText, 500);

  useEffect(() => {
    if (searchText !== "") {
      handleSubmitSearchForm();
    } else {
      setResultList([]);
      setSelectedLocalityId("");
    }
  }, [debouncedSearchText]);

  const handleSearchTextChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchText(e.target.value);
  };

  const handleLocalityIdSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedLocalityId(e.target.value);
  };

  const handleSubmitSearchForm = async () => {
    const response = await fetch(
      `${process.env.REACT_APP_LOCAL_ENVIRONMENT_PREFIX}/api/locality?` +
        new URLSearchParams({ searchText: searchText }),
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          "Access-Control-Allow-Origin": "http://localhost:3000",
          Authorization: `Bearer ${currentUser.token}`,
        },
      }
    );

    const data = await response.json();
    setResultList(data);
  };

  const handleJoinLocality = async () => {
    const response = await fetch(
      `${process.env.REACT_APP_LOCAL_ENVIRONMENT_PREFIX}/api/v1/user`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          "Access-Control-Allow-Origin": "http://localhost:3000",
          Authorization: `Bearer ${currentUser.token}`,
        },
        body: JSON.stringify({
          userId: currentUser.id,
          localityId: selectedLocalityId,
        }),
      }
    );

    if (response.status === 200) {
      history.push("/login");
    } else {
      setErrorMessage("Can't join locality. Please try again.");
    }
  };

  return {
    handleLocalityIdSelect,
    handleSearchTextChange,
    handleJoinLocality,
    resultList,
    searchText,
    selectedLocalityId,
    errorMessage,
  };
};
