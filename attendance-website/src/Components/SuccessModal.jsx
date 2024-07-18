import React, { useEffect } from 'react';
import Modal from 'react-modal';
import { FaCheckCircle } from 'react-icons/fa';

const SuccessModal = ({ isOpen, onClose }) => {
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
      contentLabel="Success Modal"
      className="success-modal"
      overlayClassName="success-modal-overlay"
      shouldCloseOnOverlayClick={false}
    >
      <div className="success-content">
        <FaCheckCircle size={50} className="checkmark" />
        <h2>ດີຫຼາຍ</h2>
        <p>ການບັນທືກລາຍຊື່ຂອງທ່ານໄດ້ສຳເລັດເເລ້ວ</p>
      </div>
    </Modal>
  );
};

export default SuccessModal;
