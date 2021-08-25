import React from "react";
import Modal from "react-modal";
import styles from "./styles.module.scss";

interface ModalWindowProps {
  handleCloseModal: () => void;
  isModalOpen: boolean;
  title?: string;
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
        className={styles.modal}
        overlayClassName={styles.overlay}
      >
        <div className={styles.titleContainer}>
          <h2>{title}</h2>
          <button onClick={handleCloseModal}>close</button>
        </div>
        {children}
      </Modal>
    </>
  );
};

Modal.setAppElement("#root");
export default React.memo(ModalWindow);
