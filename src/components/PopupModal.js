import React from "react";
import Modal from 'react-modal';

Modal.setAppElement('#root'); // Specify the root element of your app

function PopupModal({ isOpen, onClose, children }) {
    return (
      <Modal
        isOpen={isOpen}
        onRequestClose={onClose}
        contentLabel="Popup Modal"
      >
        <button onClick={onClose}>Close</button>
        {children}
      </Modal>
    );
  }
  export default PopupModal;