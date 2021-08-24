import { useSelector } from "react-redux";
import { currentUserSelector } from "../../state/auth/login/loginSlice";
import React, { FormEvent, useState } from "react";
import { LocalityDto } from "../../interfaces/LocalityDto";
import { useHistory } from "react-router-dom";

export const useJoinLocality = () => {
  const history = useHistory();
  const currentUser = useSelector(currentUserSelector);
  const [selectedLocalityId, setSelectedLocalityId] = useState("");
  const [searchText, setSearchText] = useState<string>("");
  const [resultList, setResultList] = useState<Array<LocalityDto>>([]);
  const [errorMessage, setErrorMessage] = useState<string>("");

  const handleSearchTextChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchText(e.target.value);
  };

  const handleLocalityIdSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedLocalityId(e.target.value);
  };

  const handleSubmitSearchForm = async (e: FormEvent) => {
    e.preventDefault();

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
      setErrorMessage("Can't join to locality. Please try again.");
    }
  };

  return {
    handleLocalityIdSelect,
    handleSubmitSearchForm,
    handleSearchTextChange,
    handleJoinLocality,
    resultList,
    searchText,
    errorMessage,
  };
};
