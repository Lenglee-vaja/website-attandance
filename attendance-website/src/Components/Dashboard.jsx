import { useEffect, useState } from "react";
import {  Outlet, useNavigate, useLocation } from "react-router-dom";
import "bootstrap-icons/font/bootstrap-icons.css";
import axios from "axios";
import Sidebar from "./Sidebar";
import { getPageName } from "../helper";

const Dashboard = ({children}) => {
  const location = useLocation();
  const [pageName, setPageName] = useState(null);

  useEffect(() => {
   getTitleFromLocation();
  }, [location.pathname]);

  const getTitleFromLocation = async () => {
    try {
      const pageName = await getPageName(location.pathname);
      setPageName(pageName);
    } catch (error) {
      console.log(error);
    }
  };



  return (
    <div className="container-fluid">
      <div className="row flex-nowrap">
         <Sidebar />
        <div className="col p-0 m-0">
          <div className="p-2 d-flex justify-content-start shadow">
            <h5>{pageName? pageName :"Dashboard"}</h5>
          </div>
         {children}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;

{/* <li className="w-100" onClick={handleLogout}>
                <Link className="nav-link px-0 align-middle text-white">
                  <i className="fs-4 bi-power ms-2"></i>
                  <span className="ms-2 d-none d-sm-inline">ອອກຈາກລະບົບ</span>
                </Link>
              </li> */}