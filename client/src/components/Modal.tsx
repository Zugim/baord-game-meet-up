import { ReactNode } from "react";

// styles
import "./Modal.css";

type ModalProps = {
  currentModal: ReactNode | null;
  setCurrentModal: React.Dispatch<React.SetStateAction<ReactNode>>;
};

// handles displaying a modal popup when the user intacts with main page elements
//const Modal = ({ currentModal, setCurrentModal }: ModalProps) => {
const Modal = ({ currentModal, setCurrentModal }: ModalProps) => {
  return (
    <div className="modal">
      <div className="content">
        {currentModal}
        <button
          className="close-btn"
          onClick={() => {
            setCurrentModal(null);
          }}
        >
          X
        </button>
      </div>
    </div>
  );
};

export default Modal;
