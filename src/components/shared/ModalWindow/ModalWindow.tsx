import React from "react";
import Modal from "react-modal";

interface ModalWindowProps {
  handleCloseModal: () => void;
  isModalOpen: boolean;
}

const ModalWindow: React.FC<ModalWindowProps> = ({
  isModalOpen,
  handleCloseModal,
}) => {
  return (
    <>
      <Modal
        isOpen={isModalOpen}
        onRequestClose={handleCloseModal}
        contentLabel="Example Modal"
      >
        <h2>Hello</h2>
        <button onClick={handleCloseModal}>close</button>
        <div>I am a modal</div>
        <form>
          <input />
          <button>tab navigation</button>
          <button>stays</button>
          <button>inside</button>
          <button>the modal</button>
        </form>
      </Modal>
    </>
  );
};

export default ModalWindow;
