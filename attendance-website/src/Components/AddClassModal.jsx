import React from "react";
import Modal from "react-modal";
import { MdQrCodeScanner } from "react-icons/md";
import { SiGoogleclassroom } from "react-icons/si";
import { HiOutlineAcademicCap } from "react-icons/hi";
import { GiSandsOfTime } from "react-icons/gi";
import { CiTimer } from "react-icons/ci";
import { useNavigate } from "react-router-dom";
import {formatDateTime} from "./FormatTime";

// import "./Style.css";

const ModalComponent = ({ isOpen, closeModal, data }) => {
  console.log("data in modal ==========>", data);
  const navigate = useNavigate();
  const timeCreateClass = formatDateTime(data.time)
  const handleCopyAndClose = () => {
    navigator.clipboard
      .writeText(data.class_code)
      .then(() => {
        closeModal();
        navigate("/category")

      })
      .catch((err) => {
        console.error("Failed to copy: ", err);
      });
  };

  return (
    <Modal
      className="Modal"
      overlayClassName="Overlay"
      isOpen={isOpen}
      onRequestClose={closeModal}
    >
      <div className="modal-content">
        <h2>ລາຍລະອຽດຫ້ອງທີ່ທ່ານສ້າງ</h2>
        <p><MdQrCodeScanner size={20} color="#ff5733" /><strong>ລະຫັດຫ້ອງ:</strong>{data.class_code}</p>
        <p><SiGoogleclassroom size={20} color="#33aaff"/><strong>ຫ້ອງ:</strong>{data.class_name}</p>
        <p><HiOutlineAcademicCap size={20} color="#33cc33"/><strong>ວິຊາ:</strong>{data.subject}</p>
        <p><GiSandsOfTime size={20} color="#ffcc00"/><strong>ຊົ່ວໂມງ:</strong>{data.class_hour}</p>
        <p><CiTimer size={20} color="#ff33cc" /><strong>ເວລາສ້າງຫ້ອງ:</strong>{timeCreateClass}</p>

        <div className="modal-container">
          <button onClick={handleCopyAndClose}>ສຳເນົາລະຫັດຫ້ອງ</button>
        </div>
      </div>
    </Modal>
  );
};

export default ModalComponent;
