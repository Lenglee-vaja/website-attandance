import { Link, useNavigate } from "react-router-dom";
import { Formik } from "formik";
import InputField from "./InputField";
import { CiLock } from "react-icons/ci";
import { VscError } from "react-icons/vsc";
import { TbPhoneCall } from "react-icons/tb";
import axios from "axios";
import { API } from "../constants/api";
import { useState } from "react";
import LoadingPopUp from "./Loading";

const LoginForm = ({
  onClose,
  animated,
  setOpenRegisterModal,
  setOpenLoginModal,
}) => {
  const navigate = useNavigate();
  const [isError, setIsError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const handleLogin = async (values) => {
    try {
      setIsLoading(true);
      const response = await axios.post(`${API}/login`, values);
      console.log("response", response);
      if (response.status === 200) {
        setIsError(null);
        setOpenLoginModal(false);
        setOpenRegisterModal(false);
        localStorage.setItem("token", response.data.data.token);
        localStorage.setItem(
          "userData",
          JSON.stringify(response.data.data.user)
        );
        if (response.data.data.user.role === "student") {
          navigate("/");
          window.location.reload();
        } else {
          navigate("/dashboard");
        }
      }
    } catch (error) {
      console.log("error", error);
      setIsError("ເບີໂທ ເເລະ ລະຫັດຜ່ານຂອງທ່ານບໍ່ຖຶກຕ້ອງ");
    } finally {
      setIsLoading(false);
    }
  };
  const handleCloseModal = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };
  const handleRegister = () => {
    setOpenLoginModal(false);
    setOpenRegisterModal(true);
  };
  return (
    <>
      <div className="form-container" onClick={handleCloseModal}>
        <Formik
          initialValues={{
            phone: "",
            password: "",
          }}
          validate={(values) => {
            const errors = {};
            if (!values.phone) {
              errors.phone = "ກະລຸນາປ້ອນເບີໂທລະສັບ";
            }
            if (!values.password) {
              errors.password = "ກະລຸນາປ້ອນລະຫັດຜ່ານ";
            }
            return errors;
          }}
          onSubmit={(values) => {
            handleLogin(values);
          }}
        >
          {({
            values,
            errors,
            touched,
            handleBlur,
            handleChange,
            handleSubmit,
          }) => (
            <form
              onSubmit={handleSubmit}
              className="login-form"
              style={{
                animation: `${
                  animated ? "scaleUp" : "scaleDown"
                } 0.4s ease-in-out`,
              }}
            >
              <div
                style={{
                  width: "100%",
                  display: "flex",
                  alignItems: "center",
                  flexDirection: "column",
                }}
              >
                <h3>ຂໍ້ມູນເຂົ້າສູ່ລະບົບ</h3>
                <div></div>
                {isError && (
                  <div
                    className="error"
                    style={{
                      width: "100%",
                      display: "flex",
                      alignItems: "center",
                      color: "red",
                      gap: '0.5rem'
                    }}
                  >
                    <div>
                      <VscError size={20} color="red" />
                    </div>
                    <div>{isError}</div>
                  </div>
                )}
              </div>
              <div style={{ width: "100%" }}>
                <InputField
                  label={"ເບີໂທ"}
                  id="phone"
                  name="phone"
                  type="text"
                  placeholder="ປ້ອນເບີໂທ"
                  value={values.phone}
                  errors={errors.phone}
                  touched={touched.phone}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  icon={<TbPhoneCall size={20} />}
                />
              </div>
              <div style={{ width: "100%" }}>
                <InputField
                  label={"ລະຫັດຜ່ານ"}
                  id="password"
                  name="password"
                  type="password"
                  placeholder="ປ້ອນລະຫັດຜ່ານ"
                  value={values.password}
                  errors={errors.password}
                  touched={touched.password}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  icon={<CiLock size={20} />}
                />
              </div>
              <button className="btn" type="submit">
                ເຂົ້າລະບົບ
              </button>
              <div
                style={{
                  display: "flex",
                  justifyContent: "start",
                  marginTop: "5px",
                }}
              >
                <div>
                  {" "}
                  <p>ຖ້າຍັງບໍ່ມີບັນຊີ ?</p>
                </div>
                <div style={{ marginLeft: "10px" }}>
                  <Link to={"/"} onClick={handleRegister}>
                    ລົງທະບຽນ
                  </Link>
                </div>
              </div>
            </form>
          )}
        </Formik>
      </div>
      {isLoading && <LoadingPopUp />}
      {/* <SuccessPopUp  /> */}
    </>
  );
};

export default LoginForm;

// import React, { useState } from "react";
// import { Link, useNavigate } from "react-router-dom";
// import { Formik } from "formik";
// import InputField from "./InputField";
// import { CiLock } from "react-icons/ci";
// import { TbPhoneCall } from "react-icons/tb";
// import axios from "axios";
// import { API } from "../constants/api";
// import ErrorModal from "./ErrorModal"; // Import the ErrorModal component

// const LoginForm = ({ onClose, animated, setOpenRegisterModal, setOpenLoginModal }) => {
//   const navigate = useNavigate();
//   const [showErrorModal, setShowErrorModal] = useState(false); // State to manage error modal visibility

//   const handleLogin = async (values) => {
//     try {
//       const response = await axios.post(`${API}/login`, values);
//       if (response.status === 200) {
//         setOpenLoginModal(false);
//         setOpenRegisterModal(false);
//         localStorage.setItem("token", response.data.data.token);
//         localStorage.setItem("userData", JSON.stringify(response.data.data.user));
//         if (response.data.data.user.role === "student") {
//           navigate("/");
//         } else {
//           navigate("/dashboard");
//         }
//       }
//     } catch (error) {
//       console.log("error", error);
//       setShowErrorModal(true); // Show error modal on login error
//     }
//   };

//   const handleCloseModal = (e) => {
//     if (e.target === e.currentTarget) {
//       onClose();
//     }
//   };

//   const handleRegister = () => {
//     setOpenLoginModal(false);
//     setOpenRegisterModal(true);
//   };

//   const closeErrorModal = () => {
//     setShowErrorModal(false);
//   };

//   return (
//     <>
//       <div className="form-container" onClick={handleCloseModal}>
//         <Formik
//           initialValues={{
//             phone: "",
//             password: "",
//           }}
//           validate={(values) => {
//             const errors = {};
//             if (!values.phone) {
//               errors.phone = "ກະລຸນາປ້ອນເບີໂທລະສັບ";
//             }
//             if (!values.password) {
//               errors.password = "ກະລຸນາປ້ອນລະຫັດຜ່ານ";
//             }
//             return errors;
//           }}
//           onSubmit={(values) => {
//             handleLogin(values);
//           }}
//         >
//           {({
//             values,
//             errors,
//             touched,
//             handleBlur,
//             handleChange,
//             handleSubmit,
//           }) => (
//             <form
//               onSubmit={handleSubmit}
//               className="login-form"
//               style={{
//                 animation: `${animated ? "scaleUp" : "scaleDown"} 0.4s ease-in-out`,
//               }}
//             >
//               <div style={{ width: '100%', display: 'flex', justifyContent: 'center', marginBottom: '1rem' }}>
//                 <h3>ຂໍ້ມູນເຂົ້າສູ່ລະບົບ</h3>
//               </div>
//               <div style={{ width: '100%' }}>
//                 <InputField
//                   label={"ເບີໂທ"}
//                   id="phone"
//                   name="phone"
//                   type="text"
//                   placeholder="ປ້ອນເບີໂທ"
//                   value={values.phone}
//                   errors={errors.phone}
//                   touched={touched.phone}
//                   onChange={handleChange}
//                   onBlur={handleBlur}
//                   icon={<TbPhoneCall size={20} />}
//                 />
//               </div>
//               <div style={{ width: '100%' }}>
//                 <InputField
//                   label={"ລະຫັດຜ່ານ"}
//                   id="password"
//                   name="password"
//                   type="password"
//                   placeholder="ປ້ອນລະຫັດຜ່ານ"
//                   value={values.password}
//                   errors={errors.password}
//                   touched={touched.password}
//                   onChange={handleChange}
//                   onBlur={handleBlur}
//                   icon={<CiLock size={20} />}
//                 />
//               </div>
//               <button className="btn" type="submit">ເຂົ້າລະບົບ</button>
//               <div style={{ display: "flex", justifyContent: "start", marginTop: '5px' }}>
//                 <div><p>ຖ້າຍັງບໍ່ມີບັນຊີ ?</p></div>
//                 <div style={{ marginLeft: '10px' }}><Link to={"/"} onClick={handleRegister}>ລົງທະບຽນ</Link></div>
//               </div>
//             </form>
//           )}
//         </Formik>
//       </div>
//       <ErrorModal isOpen={showErrorModal} onClose={closeErrorModal} /> {/* Render the ErrorModal */}
//     </>
//   );
// };

// export default LoginForm;
