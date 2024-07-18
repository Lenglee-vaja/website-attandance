import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Link, useLocation } from "react-router-dom";
import { FaRegCircleUser } from "react-icons/fa6";
import { IoSchoolOutline } from "react-icons/io5";
import { AiOutlineLogout } from "react-icons/ai";
import LoginForm from "./LoginFrom";
import RegisterForm from "./RegisterForm";
import Frame from "./Frame";
// import Frame from "./Frame";
const Header = () => {
  const navigate = useNavigate();
  // const navigate = useNavigate()
  const [openLoginModal, setOpenLoginModal] = useState(false);
  const [openRegisterModal, setOpenRegisterModal] = useState(false);
  const [openWebCamModal, setOpenWebCamModal] = useState(false);
  const [openProfileModal, setOpenProfileModal] = useState(false);
  const [userInfo, setUserInfo] = useState({});
  const [userName, setUserName] = useState(""); // State to hold username
  const location = useLocation();
  const active = location.pathname;
  const token = localStorage.getItem("token");

  useEffect(() => {
    if (token) {
      const userData = JSON.parse(localStorage.getItem("userData"));
      setUserName(userData.fullname); 
    } else {
      setUserName("");
    }
  }, []); 
 
  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("userData");
    setUserName("");
    window.location.reload();
  };

  return (
    <header style={{ background: "var(--main-color)" }}>
      <div className="header-left">
        <span className="logo text-white">
          <IoSchoolOutline size={40} />
        </span>
      </div>
      <div className="header-center">
        <nav className="header-nav">
          {navData.map((item) => (
            <Link
              to={item.link}
              key={item.id}
              className={`nav-item ${active === item.link ? "active" : ""}`}
            >
              {item.name}
            </Link>
          ))}
        </nav>
      </div>
      {!token ? (
         <div className="header-right" >
         <span className="icon" onClick={() => setOpenLoginModal(true)}>
           <FaRegCircleUser size={30} color="white" />
         </span>
       </div> 
      ) : (
        <div>
          <div className="header-right" style={{position: "relative"}} onClick={() => setOpenProfileModal(!openProfileModal)}>
         <span className="icon">
           <FaRegCircleUser size={30} color="white" />
         </span>
         <span className="username">{userName}</span>
         {openProfileModal && 
           <div style={{position: "absolute",width:"10rem", top: "2.7rem", left: 0,background:"white", padding: 10,borderRadius:'12px',display:"flex", flexDirection:"column", gap:'1rem'}}>
               <div style={{display:"flex", gap:'8px', alignItems:"center",cursor:"pointer"}} onClick={() => navigate("/userprofile")}>
                   <span><FaRegCircleUser size={20} /></span> <span>ໂປຣໄຟ</span>
               </div>
               <div style={{display:"flex", gap:'8px', alignItems:"center",cursor:"pointer"}} onClick={handleLogout}>
                    <span><AiOutlineLogout size={20} /> </span><span>ອອກຈາກລະບົບ</span>
               </div>
           </div>}
         </div> 
        </div>
      )}
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
  
    </header>
  );
};
export default Header;
const navData = [
  {
    id: 1,
    name: "ໜ້າຫຼັກ",
    link: "/",
  },
  {
    id: 2,
    name: "ຄູ່ມືການນຳໃຊ້",
    link: "/manual",
  },
  {
    id: 3,
    name: "ເຄື່ອງມື",
    link: "/tool",
  },
  {
    id: 3,
    name: "ກ່ຽວກັບພວກເຮົາ",
    link: "/about",
  },
];
