import React from "react";
import Modal from "react-modal";
import "./styles.scss";

interface ModalWindowProps {
  handleCloseModal: () => void;
  isModalOpen: boolean;
  title: string;
  children: React.ReactNode;
}

const ModalWindow: React.FC<ModalWindowProps> = ({
  isModalOpen,
  handleCloseModal,
  title,
  children,
}) => {
  return (
    <>
      <Modal
        isOpen={isModalOpen}
        onRequestClose={handleCloseModal}
        contentLabel="Example Modal"
        className="modal"
        overlayClassName="overlay"
      >
        <h2>{title}</h2>
        <button onClick={handleCloseModal}>close</button>
        {children}
      </Modal>
    </>
  );
};

Modal.setAppElement("#root");
export default ModalWindow;
