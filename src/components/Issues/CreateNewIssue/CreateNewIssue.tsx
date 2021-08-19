import React from "react";
import InputField from "src/components/shared/InputField";
import { useIssueCreation } from "src/hooks/issues/useIssueCreation";
import ImageUpload from "src/components/shared/ImageUpload";
import CreateNew from "src/components/shared/CreateNew";
import "./styles.scss";

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
        title={"Submit a new issue"}
        errorMessage={errorMessage}
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
        <ImageUpload setImageUrl={setImageUrl} />
      </CreateNew>
    </div>
  );
};

export default CreateNewIssue;
