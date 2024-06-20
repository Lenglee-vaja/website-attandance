import React, { useState } from "react";
import "./Style.css";
import { useNavigate } from "react-router-dom";
import "bootstrap-icons/font/bootstrap-icons.css";
import axios from "axios";

const Login = () => {
  const [values, setValues] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  //----------------------with api

  // axios.defaults.withCredentials = true;//for cookie
  // const handleSubmit =(event)=>{
  //     event.preventDefault
  //     axios.post("url", values)
  //     .then(result=>{
  //         if (result.data.loginStatus){
  //             console.log(result)
  //         navigate()
  //         }else{
  //             setError(result.data.message)
  //         }
  //     })
  //     .catch(err=>console.log(err))
  // }
  //-----------------------ui
  const handleSubmit = (event) => {
    event.preventDefault;
    navigate("/dashboard");
  };
  return (
    <div className="d-flex justify-content-center align-items-center vh-100 loginPage">
      <div className="p-3 rounded-3 w-25 border loginForm">
        <h3 className="text-center">ລະບົບບັນທືກລາຍຊື່</h3>
        <div className="text-danger">{error && error}</div>
        <form onSubmit={handleSubmit} className='font-family: "Phetsarath_OT"'>
          <div className="mb-3">
            <label htmlFor="email">ອີເມວ</label>
            
            <input
              type="email"
              name="email"
              autoComplete="off"
              placeholder="ປ້ອນອີເມວ"
              onChange={(e) => setValues({ ...values, email: e.target.value })}
              className="form-control rounded-0"
            />
          </div>
          <div className="mb-3">
            <label htmlFor="password">ລະຫັດຜ່ານ</label>
            <input
              type="password"
              name="password"
              placeholder="ປ້ອນລະຫັດຜ່ານ"
              onChange={(e) =>
                setValues({ ...values, password: e.target.value })
              }
              className="form-control rounded-0"
            />
          </div>
          <button className="btn btn-success w-100 rounded-0 mb-2">
            ເຂົ້າສູ່ລະບົບ
          </button>
          <div className="mb-1">
            <input type="checkbox" name="tick" id="tick" className="me-2" />
            <label htmlFor="checkbox">ຍອມຮັບເງື່ອນໄຂທັງໝົດ</label>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
