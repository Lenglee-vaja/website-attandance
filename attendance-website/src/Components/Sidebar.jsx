import { Link } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { IoSchoolOutline } from "react-icons/io5";
const Sidebar = () => {
  const { pathname } = useLocation();
  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("userData");
    window.location.reload();
  };
  const isActive = (path) => pathname === path || pathname.startsWith(path);

  return (
    <aside className="sidebar-container">
      <div>
        <div className="logo">
       <h3>  <IoSchoolOutline size={40}  color="white" /></h3> <h3>ລະບົບບັນທືກລາຍຊື່</h3>
        </div>
        <nav className="nav-sidebar">
          {navDatas.map((data) => (
            <Link
              key={data.id}
              to={data.link}
              className={`nav-link ${isActive(data.link) ? "active" : ""}`}
            >
              <div>{data.icon}</div>
              <div>{data.name}</div>
            </Link>
          ))}
        </nav>
      </div>
      <div className="logout-container">
        <div className="logout" onClick={handleLogout}>
          <i className="fs-4 bi-power ms-2"></i> <span>ອອກຈາກລະບົບ</span>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;

const navDatas = [
  {
    id: 1,
    name: "ລາຍງານ",
    link: "/dashboard",
    icon: <i className="fs-4 bi-speedometer2 ms-2"></i>,
  },
  {
    id: 2,
    name: "ລາຍຊື່ນັກສືກສາ",
    link: "/employee",
    icon: <i className="fs-4 bi-people ms-2"></i>,
  },
  {
    id: 3,
    name: "ສ້າງຫ້ອງ",
    link: "/category",
    icon: <i className="fs-4 bi-columns ms-2"></i>,
  },
  {
    id: 4,
    name: "ໂປຣໄຟລ",
    link: "/profile",
    icon: <i className="fs-4 bi-person ms-2"></i>,
  },
];
