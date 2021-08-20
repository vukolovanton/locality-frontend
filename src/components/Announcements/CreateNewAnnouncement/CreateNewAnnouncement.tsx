import React from "react";
import InputField from "src/components/shared/InputField";
import ImageUpload from "src/components/shared/ImageUpload";
import CreateNew from "src/components/shared/CreateNew";
import { useAnnouncementsCreation } from "../../../hooks/announcements/useAnnouncementsCreation";

const CreateNewAnnouncement: React.FC = () => {
  const {
    announcementCreationState,
    errorMessage,
    handleStateChange,
    handleSubmitCreateAnnouncementForm,
    setImageUrl,
  } = useAnnouncementsCreation();

  return (
    <div>
      <CreateNew
        title="Create new announcement"
        handleSubmitForm={handleSubmitCreateAnnouncementForm}
        errorMessage={errorMessage}
      >
        <InputField
          value={announcementCreationState.title}
          handleValueChange={handleStateChange}
          title="Title"
          id="title"
        />
        <label htmlFor="description">Description</label>
        <div className="text-input-field">
          <textarea
            rows={5}
            id="description"
            name="Description"
            required={true}
            onChange={(e) => handleStateChange("description", e.target.value)}
            value={announcementCreationState.description}
            placeholder="Put announcement text here"
          />
        </div>
        <ImageUpload setImageUrl={setImageUrl} />
      </CreateNew>
    </div>
  );
};

export default CreateNewAnnouncement;
