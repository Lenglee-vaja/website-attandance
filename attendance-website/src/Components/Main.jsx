import { useNavigate } from "react-router-dom";
import { HiCamera } from "react-icons/hi2";
import searchImage from "../../public/Images/search-logo.jpg";
import { useEffect, useState } from "react";
import { API } from "../constants/api";
import axios from "axios";
import RegisterForm from "./RegisterForm";
import LoginForm from "./LoginFrom";
import Frame from "./Frame";

const Main = () => {
  const navigate = useNavigate();
  const [classCode, setClassCode] = useState("");
  const [openLoginModal, setOpenLoginModal] = useState(false);
  const [openRegisterModal, setOpenRegisterModal] = useState(false);
  const [openWebCamModal, setOpenWebCamModal] = useState(false);
  const [userInfo, setUserInfo] = useState({});
  const [isError, setIsError] = useState({"notFound": "", "invalidClass": ""});
  const token = localStorage.getItem("token");
  const userData = localStorage.getItem("userData");

  const handleSearch = async () => {
    if (!token) {
      setOpenLoginModal(true);
      return;
    }

    try {
      console.log({ classCode });
      const response = await axios.get(`${API}/class/${classCode}`);
      const user = JSON.parse(userData);
      // if (response.data.code === 200) {
      //     navigate(`/detect/${classCode}`,{state: {classData: response.data.data}});
      // }
      console.log("response", response.data);
      if (response.data.code === 200 && user.class_name === response.data.data.class_name)  {
        navigate(`/detect/${classCode}`,{state: {classData: response.data.data}});
      } else if (response.data.code === 200) {
        setIsError(({...isError, "invalidClass": "ບໍ່ສາມາດບັນທືກລາຍຊື່ຕ່າງຫ້ອງໄດ້"}));
      }else{
        setIsError(({...isError, "notFound": "ບໍ່ພົບຫ້ອງຮຽນນີ້"}));
      }
    } catch (error) {
      console.error("Error detecting class code:", error);
      alert("An error occurred. Please try again.");
    }
  };

  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      handleSearch();
    }
  };
  return (
    <main className="main-section">
      <div className="left">
        <div>
        <div className="search-section">
          <div className="icon-section">
            <HiCamera size={30} className="icon" />
          </div>
          <input
            placeholder=" ປ້ອນລະຫັດຫ້ອງຮຽນ"
            value={classCode}
            onChange={(e) => setClassCode(e.target.value)}
            onKeyPress={handleKeyPress}
          />
          <div className="search" onClick={handleSearch}>
            <img src={searchImage} alt="search-logo" />
          </div>
        </div>
         <div style={{width: "100%",marginTop:"12px",paddingLeft:'17%'}}>
                 {isError.invalidClass && <p style={{color: "red",fontSize:"16px"}}>{isError.invalidClass}</p>}
                 {isError.notFound && <p style={{color: "red",fontSize:"16px"}}>{isError.notFound}</p>}
         </div>
        </div>
        <h2>ເວັບໄຊທ໌ບັນທືກລາຍຊື່ດ້ວຍການຈື່ຈຳໃບໜ້າ</h2>
        <p>
          &emsp;ເປັນລະບົບທີ່ພັດທະນາຂື້ນມາເພື່ອເຮັດໃຫ້ການບັນທືກລາຍຊື່ຄົນເຂົ້າຫ້ອງຮຽນຂອງອາຈານໃຫ້ມີຄວາມງ່າຍຂື້ນ,
          ມີຄວາມຖືກຕ້ອງ, ປະຫຍັດເວລາ ເເລະ
          ທັນສະໄໝ່ດ້ວຍການນຳໃຊ້ເຕັກນິກການຈື່ຈຳໃບໜ້າ.
        </p>
      </div>
      <div className="right">
        <img src="https://pimeyes.com/build/assets/hero-section-c91d8914.svg" />
      </div>
      <div>
        {openLoginModal && (
          <LoginForm
            setOpenRegisterModal={setOpenRegisterModal}
            setOpenLoginModal={setOpenLoginModal}
            animated={[openLoginModal]}
            onClose={() => setOpenLoginModal(false)}
          />
        )}
        {openRegisterModal && !openLoginModal && (
          <RegisterForm
            setUserInfo={setUserInfo}
            setOpenWebCamModal={setOpenWebCamModal}
            setOpenRegisterModal={setOpenRegisterModal}
            setOpenLoginModal={setOpenLoginModal}
            animated={[openRegisterModal]}
            onClose={() => setOpenRegisterModal(false)}
          />
        )}
        {openWebCamModal && !openLoginModal && !openRegisterModal && (
          <Frame
            setUserInfo={setUserInfo}
            userInfo={userInfo}
            setOpenWebCamModal={setOpenWebCamModal}
            setOpenRegisterModal={setOpenRegisterModal}
            animated={[openRegisterModal]}
            onClose={() => setOpenRegisterModal(false)}
          />
        )}
      </div>
    </main>
  );
};

export default Main;
