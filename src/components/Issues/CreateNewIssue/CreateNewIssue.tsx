import React from "react";
import ModalWindow from "src/components/shared/ModalWindow";

const CreateNewIssue: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = React.useState(false);

  function handleOpenModal() {
    setIsModalOpen(true);
  }

  function handleCloseModal() {
    setIsModalOpen(false);
  }

  return (
    <div>
      <button onClick={() => handleOpenModal()}>Create new</button>
      <ModalWindow
        isModalOpen={isModalOpen}
        handleCloseModal={handleCloseModal}
      />
    </div>
  );
};

export default CreateNewIssue;
