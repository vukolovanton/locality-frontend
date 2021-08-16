import { FormEvent, useState } from "react";
import { useDispatch } from "react-redux";

import { validateObjectValues } from "src/utils/helpers";
import { postNewIssue } from "../../state/issues/issuesSlice";

const initialIssueCreationState = {
  title: "",
  description: "",
};

export const useIssueCreation = () => {
  const dispatch = useDispatch();

  const [errorMessage, setErrorMessage] = useState<string>("");
  const [issueCreationState, setIssueCreationState] = useState(
    initialIssueCreationState
  );

  const handleStateChange = (key: string, value: string) => {
    setIssueCreationState({ ...issueCreationState, [key]: value });
  };

  const handleSubmitCreateIssueForm = async (e: FormEvent) => {
    e.preventDefault();
    // Make sure all values in there
    const isValid = validateObjectValues(issueCreationState, setErrorMessage);

    if (isValid) {
      // Call issues creation API
      dispatch(postNewIssue(issueCreationState));
      // Clean up
      setIssueCreationState(initialIssueCreationState);
    }
  };

  return {
    issueCreationState,
    errorMessage,
    handleStateChange,
    handleSubmitCreateIssueForm,
  };
};
