import { FormEvent, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { validateObjectValues } from "src/utils/helpers";
import { currentUserSelector } from "src/state/auth/login/loginSlice";
import { AnnouncementsStatuses } from "src/interfaces/AnnouncementsStatuses";
import { postNewAnnouncement } from "src/state/announcements/announcementsSlice";

const initialAnnouncementCreationState = {
  title: "",
  description: "",
};

export const useAnnouncementsCreation = () => {
  const dispatch = useDispatch();
  const currentUser = useSelector(currentUserSelector);

  const [imageUrl, setImageUrl] = useState<string>("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [announcementCreationState, setAnnouncementCreationState] = useState(
    initialAnnouncementCreationState
  );

  const handleModalState = () => {
    setIsModalOpen((value) => !value);
  };

  const handleStateChange = (key: string, value: string) => {
    setAnnouncementCreationState({
      ...announcementCreationState,
      [key]: value,
    });
  };

  const handleSubmitCreateAnnouncementForm = async (e: FormEvent) => {
    e.preventDefault();
    // Make sure all values in there
    const isValid = validateObjectValues(
      announcementCreationState,
      setErrorMessage
    );

    if (isValid) {
      // Call issues creation API
      dispatch(
        postNewAnnouncement({
          ...announcementCreationState,
          imageUrl: imageUrl,
          isPinned: false,
          status: AnnouncementsStatuses.ACTIVE,
          userId: currentUser.id,
          localityId: currentUser.localityId,
        })
      );
      // Clean up
      setAnnouncementCreationState(initialAnnouncementCreationState);
      handleModalState();
    }
  };

  return {
    announcementCreationState,
    errorMessage,
    handleStateChange,
    handleSubmitCreateAnnouncementForm,
    setImageUrl,
    isModalOpen,
    handleModalState,
  };
};
