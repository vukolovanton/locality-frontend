import { FormEvent, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { validateObjectValues } from "src/utils/helpers";
import { postNewIssue } from "src/state/issues/issuesSlice";
import { currentUserSelector } from "src/state/auth/login/loginSlice";
import { IssueStatuses } from "src/interfaces/IssueStatuses";

const initialIssueCreationState = {
  title: "",
  description: "",
};

export const useIssueCreation = () => {
  const dispatch = useDispatch();
  const currentUser = useSelector(currentUserSelector);

  const [imageUrl, setImageUrl] = useState<string>("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [issueCreationState, setIssueCreationState] = useState(
    initialIssueCreationState
  );

  const handleModalState = () => {
    setIsModalOpen((value) => !value);
  };

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
          imageUrl: imageUrl,
          status: IssueStatuses.PENDING,
          userId: currentUser.id,
          localityId: currentUser.localityId,
        })
      );
      // Clean up
      setIssueCreationState(initialIssueCreationState);
    }
  };

  return {
    issueCreationState,
    errorMessage,
    handleStateChange,
    handleSubmitCreateIssueForm,
    setImageUrl,
    isModalOpen,
    handleModalState,
  };
};
