import React from 'react'
import styles from "../../assets/css/payment.module.css"
import ReactDOM from 'react-dom';

const Modal = ({ isOpen, onClose, children }) => {
  if (!isOpen) return null;

  return ReactDOM.createPortal(
    <div className={styles["modal-overlay"]}>
      <div className={styles["modal-content"]}>
        {children}
      </div>
    </div>,
    document.getElementById('modal-root') 
  )
};

export default Modal;
