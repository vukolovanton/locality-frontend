import { FormEvent, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { validateObjectValues } from "src/utils/helpers";
import { postNewIssue } from "../../state/issues/issuesSlice";
import { currentUserSelector } from "../../state/auth/login/loginSlice";
import { IssueStatuses } from "../../interfaces/IssueStatuses";

const initialIssueCreationState = {
  title: "",
  description: "",
};

export const useIssueCreation = (onClose: () => void) => {
  const dispatch = useDispatch();
  const currentUser = useSelector(currentUserSelector);

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
      dispatch(
        postNewIssue({
          ...issueCreationState,
          imageUrl: "",
          status: IssueStatuses.PENDING,
          userId: currentUser.id,
          localityId: currentUser.localityId,
        })
      );
      // Clean up
      setIssueCreationState(initialIssueCreationState);
      onClose();
    }
  };

  return {
    issueCreationState,
    errorMessage,
    handleStateChange,
    handleSubmitCreateIssueForm,
  };
};
