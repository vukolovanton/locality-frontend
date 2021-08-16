import React from "react";
import ModalWindow from "src/components/shared/ModalWindow";
import InputField from "src/components/shared/InputField";
import InputContainer from "src/components/shared/InputContainer";
import { useIssueCreation } from "src/hooks/issues/useIssueCreation";
import "./styles.scss";

const CreateNewIssue: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = React.useState(false);

  const {
    issueCreationState,
    errorMessage,
    handleStateChange,
    handleSubmitCreateIssueForm,
  } = useIssueCreation();

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div>
      <button onClick={() => handleOpenModal()}>Create new</button>
      {errorMessage && <span className="error">{errorMessage}</span>}
      <ModalWindow
        isModalOpen={isModalOpen}
        handleCloseModal={handleCloseModal}
        title="Submit a new issue"
      >
        <InputContainer
          legend="Create report"
          handleSubmitForm={handleSubmitCreateIssueForm}
        >
          <InputField
            value={issueCreationState.title}
            handleValueChange={handleStateChange}
            title="Title"
            id="title"
          />
          <label htmlFor="description">Description</label>

          <div className="grow-wrap">
            <textarea
              rows={5}
              id="description"
              name="Description"
              required={true}
              onChange={(e) => handleStateChange("description", e.target.value)}
              value={issueCreationState.description}
              placeholder="Describe an issue you want to share"
            />
          </div>
        </InputContainer>
      </ModalWindow>
    </div>
  );
};

export default CreateNewIssue;
