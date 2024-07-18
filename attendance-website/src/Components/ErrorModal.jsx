import React, { useEffect } from 'react';
import Modal from 'react-modal';
import { FaExclamationCircle } from 'react-icons/fa';

const ErrorModal = ({ isOpen, onClose }) => {
  useEffect(() => {
    if (isOpen) {
      const timer = setTimeout(onClose, 3000); // Close modal after 3 seconds
      return () => clearTimeout(timer);
    }
  }, [isOpen, onClose]);

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onClose}
      contentLabel="Error Modal"
      className="error-modal"
      overlayClassName="error-modal-overlay"
      shouldCloseOnOverlayClick={false}
    >
      <div className="error-content">
        <FaExclamationCircle size={50} className="error-icon" />
        <h2>ແຈ້ງເຕືອນ</h2>
        <p>ເບີໂທ ເເລະ ລະຫັດຜ່ານບໍ່ຖືກຕ້ອງ</p>
      </div>
    </Modal>
  );
};

export default ErrorModal;
