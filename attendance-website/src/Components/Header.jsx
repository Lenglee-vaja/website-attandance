import { useState } from "react";

import { Link, useLocation } from "react-router-dom";
import { FaRegCircleUser } from "react-icons/fa6";
import { IoSchoolOutline } from "react-icons/io5";

import LoginForm from "./LoginFrom";
import RegisterForm from "./RegisterForm";
import Frame from "./Frame";
// import Frame from "./Frame";
const Header = () => {
  // const navigate = useNavigate()
  const [openLoginModal, setOpenLoginModal] = useState(false);
  const [openRegisterModal, setOpenRegisterModal] = useState(false);
  const [openWebCamModal, setOpenWebCamModal] = useState(false);
  const location = useLocation();
  const active = location.pathname;
 console.log('openRegisterModal:',openRegisterModal)

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
      <div className="header-right" onClick={() => setOpenLoginModal(true)}>
        <span className="icon">
          <FaRegCircleUser size={30} color="white" />
        </span>
      </div>
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
          setOpenWebCamModal={setOpenWebCamModal}
          setOpenRegisterModal={setOpenRegisterModal}
          setOpenLoginModal={setOpenLoginModal}
          animated={[openRegisterModal]}
          onClose={() => setOpenRegisterModal(false)}
        />
      )}
      {openWebCamModal && !openLoginModal && !openRegisterModal && (
        <Frame
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
    name: "Home",
    link: "/",
  },
  {
    id: 2,
    name: "detect",
    link: "/detect",
  },
  {
    id: 3,
    name: "My logs",
    link: "/mylogs",
  },
  {
    id: 3,
    name: "Log in",
    link: "/login",
  },
];
