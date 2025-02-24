import "./style.css";
import { FC } from "react";
import ReactModal from "react-modal";

const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
  },
};
ReactModal.setAppElement("#root");

type ModalProps = {
  title: string;
  modalIsOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  afterOpenModal?: ReactModal.OnAfterOpenCallback;
  children: React.ReactNode;
};

const Modal: FC<ModalProps> = ({
  title,
  modalIsOpen,
  setIsOpen,
  afterOpenModal,
  children,
}) => {
  return (
    <div>
      <ReactModal
        isOpen={modalIsOpen}
        onAfterOpen={afterOpenModal}
        onRequestClose={() => setIsOpen(false)}
        contentLabel="modal_label"
        style={customStyles}
      >
        <div className="block">
          <h2>{title}</h2>
          <button className="close_btn" onClick={() => setIsOpen(false)}>
            &#x2715;
          </button>
        </div>
        {children}
      </ReactModal>
    </div>
  );
};

export default Modal;
