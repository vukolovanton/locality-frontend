import React, { FormEvent } from "react";
import ModalWindow from "src/components/shared/ModalWindow";
import InputContainer from "../InputContainer";

interface CreateNewItemProps {
  isModalOpen: boolean;
  handleModalState: () => void;
  title: string;
  errorMessage: string;
  handleSubmitForm: (e: FormEvent) => void | Promise<void>;
  children: React.ReactNode;
}

const CreateNew: React.FC<CreateNewItemProps> = ({
  isModalOpen,
  handleModalState,
  title,
  errorMessage,
  handleSubmitForm,
  children,
}) => {
  return (
    <>
      <button onClick={handleModalState} className="primary">
        Create new
      </button>
      <ModalWindow
        isModalOpen={isModalOpen}
        handleCloseModal={handleModalState}
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
