import React from "react";
import InputField from "src/components/shared/InputField";
import InputTextareaField from "src/components/shared/InputTextareaField";
import ImageUpload from "src/components/shared/ImageUpload";
import CreateNew from "src/components/shared/CreateNew";
import { useAnnouncementsCreation } from "src/hooks/announcements/useAnnouncementsCreation";
import styles from "src/components/Announcements/styles.module.scss";

const CreateNewAnnouncement: React.FC = () => {
  const {
    announcementCreationState,
    errorMessage,
    handleStateChange,
    handleSubmitCreateAnnouncementForm,
    setImageUrl,
    isModalOpen,
    handleModalState,
  } = useAnnouncementsCreation();

  return (
    <div className={styles.buttonContainer}>
      <CreateNew
        title="Create new announcement"
        handleSubmitForm={handleSubmitCreateAnnouncementForm}
        errorMessage={errorMessage}
        isModalOpen={isModalOpen}
        handleModalState={handleModalState}
      >
        <InputField
          value={announcementCreationState.title}
          handleValueChange={handleStateChange}
          title="Title"
          id="title"
        />
        <InputTextareaField
          handleValueChange={handleStateChange}
          value={announcementCreationState.description}
          id="description"
          label="Description"
          placeholder="Put announcement text here"
        />
        <ImageUpload setImageUrl={setImageUrl} />
      </CreateNew>
    </div>
  );
};

export default CreateNewAnnouncement;
