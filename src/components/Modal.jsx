import { IoCloseCircle } from "react-icons/io5";
import styles from "./Modal.module.css";

function Modal({
  title,
  message,
  confirmText = "تأیید",
  cancelText = "انصراف",
  onConfirm,
  onCancel,
}) {
  return (
    <div className={styles.container}>
      <span className={styles.close} onClick={onCancel}>
        <IoCloseCircle color="#8dae95" fontSize="2.2rem" />
      </span>
      <div className={styles.modal_content}>
        <h3>{title}</h3>
        <h4>{message}</h4>
        <div className={styles.buttons}>
          <button className="success" onClick={onConfirm}>
            {confirmText}
          </button>
          <button className="warning" onClick={onCancel}>
            {cancelText}
          </button>
        </div>
      </div>
    </div>
  );
}

export default Modal;
