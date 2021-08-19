import React, { FormEvent, useState } from "react";
import ModalWindow from "src/components/shared/ModalWindow";
import InputContainer from "../InputContainer";

interface CreateNewItemProps {
  title: string;
  errorMessage: string;
  handleSubmitForm: (e: FormEvent) => void | Promise<void>;
  children: React.ReactNode;
}

const CreateNew: React.FC<CreateNewItemProps> = ({
  title,
  errorMessage,
  handleSubmitForm,
  children,
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      <button onClick={() => handleOpenModal()} className="primary">
        Create new
      </button>
      <ModalWindow
        isModalOpen={isModalOpen}
        handleCloseModal={handleCloseModal}
        title={title}
      >
        {errorMessage && <span className="error">{errorMessage}</span>}
        <InputContainer
          legend="Create report"
          handleSubmitForm={handleSubmitForm}
        >
          {children}
        </InputContainer>
      </ModalWindow>
    </>
  );
};

export default CreateNew;
