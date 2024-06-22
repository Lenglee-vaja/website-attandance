
import { Link, useNavigate } from "react-router-dom";
import { Formik } from "formik";
import InputField from "./InputField";
import { FaPhone } from "react-icons/fa6";
import { CiLock } from "react-icons/ci";
import { TbPhoneCall } from "react-icons/tb";


const LoginForm = ({ onClose, animated, setOpenRegisterModal,setOpenLoginModal  }) => {
  const handleLogin = (values) => {
    console.log("values:::", values);
    // try{ 
    //     const response = fetch("http://localhost:3000/auth/login", {
    //       method: "POST",
    //       headers: {
    //         "Content-Type": "application/json",
    //       },
    //       body: JSON.stringify(values),
    //     });
    //     const data = response.json();
    //     console.log(data);
    // }
    // catch(err){console.log(err)}
  }  
  const handleCloseModal = (e) => {
    if (e.target === e.currentTarget) {
     onClose();
    }
  };
  const handleRegister = () => {
    setOpenLoginModal(false);
    setOpenRegisterModal(true);
  }
  return (
    <>
      <div className="form-container" onClick={handleCloseModal}>
        <Formik
          initialValues={{
            phoneNumber: "",
            password: "",
          }}
          validate={(values) => {
            const errors = {};
            if(!values.phoneNumber){
               errors.phoneNumber = "ກະລຸນາປ້ອນເບີໂທລະສັບ";
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
                animation: `${animated ? "scaleUp" : "scaleDown"} 0.4s ease-in-out`,
              }}
            >
             <div style={{width:'100%',display:'flex',justifyContent:'center', marginBottom:'1rem'}}> <h3>
                ຂໍ້ມູນເຂົ້າສູ່ລະບົບ
              </h3></div>
              <div style={{width:'100%'}}>
              <InputField
                label={"ເບີໂທ"}
                id="phoneNumber"
                name="phoneNumber"
                type="text"
                placeholder="ປ້ອນເບີໂທ"
                value={values.phoneNumber}
                errors={errors.phoneNumber}
                touched={touched.phoneNumber}
                onChange={handleChange}
                onBlur={handleBlur}
                icon={<TbPhoneCall size={20} />}
              />
              </div>
             <div style={{width:'100%'}}>
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
                icon={<CiLock size={20}/>}
              />
             </div>
              <button className="btn" type="submit">ເຂົ້າລະບົບ</button>
              <div style={{ display: "flex", justifyContent: "start" ,marginTop:'5px'}}>
               <div> <p>ຖ້າຍັງບໍ່ມີບັນຊີ ?</p></div><div style={{marginLeft:'10px'}}><Link to={"/"} onClick={handleRegister}>ລົງທະບຽນ</Link></div>
              </div>
            </form>
          )}
        </Formik>
      </div>
      {/* <SuccessPopUp  /> */}
    </>
  );
};

export default LoginForm

