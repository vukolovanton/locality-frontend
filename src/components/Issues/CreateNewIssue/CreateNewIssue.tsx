import React from "react";
import InputField from "src/components/shared/InputField";
import { useIssueCreation } from "src/hooks/issues/useIssueCreation";
import ImageUpload from "src/components/shared/ImageUpload";
import CreateNew from "src/components/shared/CreateNew";
import InputTextareaField from "src/components/shared/InputTextareaField";

const CreateNewIssue: React.FC = () => {
  const {
    issueCreationState,
    errorMessage,
    handleStateChange,
    handleSubmitCreateIssueForm,
    setImageUrl,
  } = useIssueCreation();

  return (
    <div>
      <CreateNew
        title="Submit a new issue"
        errorMessage={errorMessage}
        handleSubmitForm={handleSubmitCreateIssueForm}
      >
        <InputField
          value={issueCreationState.title}
          handleValueChange={handleStateChange}
          title="Title"
          id="title"
        />
        <InputTextareaField
          handleValueChange={handleStateChange}
          value={issueCreationState.description}
          id="description"
          label="Description"
          placeholder="Describe an issue you want to share"
        />
        <ImageUpload setImageUrl={setImageUrl} />
      </CreateNew>
    </div>
  );
};

export default CreateNewIssue;
