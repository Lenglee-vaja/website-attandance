
import { Link, useNavigate } from "react-router-dom";
import { Formik } from "formik";
import InputField from "./InputField";
import RoleCheckBox from "./RoleCheckBox";


const RegisterForm = ({ onClose, animated, setOpenRegisterModal,setOpenWebCamModal  }) => {
  const handleCloseModal = (e) => {
    if (e.target === e.currentTarget) {
     onClose();
    }
  };
  // const handleLogin  =() =>{
  //  setOpenRegisterModal(false);
  //  setOpenLoginModal(true);
  // }
  const handleRegister =(values) =>{
    console.log('new data::',values)
   if(values?.role === "student"){
    setOpenRegisterModal(false);
    setOpenWebCamModal(true)
   }
  }
  return (
    <>
      <div className="form-container" onClick={handleCloseModal}>
        <Formik
          initialValues={{
            role:"student",
            studentId:"",
            userName: "",
            phoneNumber: "",
            password: "",
            classRoom:"",
          }}
          validate={(values) => {
            const errors = {};
            if(`${values.role}` === "student"){
              if(!values.classRoom){
                errors.classRoom = "ກະລຸນາປ້ອນຫ້ອງ"
              }
              if(!values.studentId){
                errors.studentId = "ກະລຸນາປ້ອນລະຫັດນັກສືກສາ"
              }
            }
            if(!values.userName){
              errors.userName = "ກະລຸນາປ້ອນຊື່"
            }
            if(!values.phoneNumber){
              errors.phoneNumber = "ກະລຸນາປ້ອນເບີໂທ"
            }
            if (!values.password) {
              errors.password = "ກະລຸນາປ້ອນລະຫັດຜ່ານ";
            }
            return errors;
          }}
          onSubmit={(values) => {
            handleRegister(values)
            // console.log(values);
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
                ຂໍ້ມູນລົງທະບຽນ
              </h3></div>
               <div>
                  <RoleCheckBox value={values.role} onChange={handleChange} label="ສິດນຳໃຊ້ລະບົບ" name="role"/>
               </div>
              <div style={{width:'100%'}}>
              {values.role === "student" && (
                 <InputField
                 label={"ລະຫັດນັກສືກສາ"}
                 id="studentId"
                 name="studentId"
                 type="text"
                 placeholder="FNS0020"
                 value={values.studentId}
                 errors={errors.studentId}
                 touched={touched.studentId}
                 onChange={handleChange}
                 onBlur={handleBlur}
               />
              )}
              <InputField
                label={"ຊື່ ເເລະ ນາມສະກຸນ"}
                id="userName"
                name="userName"
                type="text"
                placeholder="ປ້ອນຊື່"
                value={values.userName}
                errors={errors.userName}
                touched={touched.userName}
                onChange={handleChange}
                onBlur={handleBlur}
              />
              </div>
              <div style={{width:'100%'}}>
              <InputField
                label={"ເບີໂທ"}
                id="phoneNumber"
                name="phoneNumber"
                type="text"
                placeholder={"ປ້ອນເບີໂທ"}
                value={values.phoneNumber}
                errors={errors.phoneNumber}
                touched={touched.phoneNumber}
                onChange={handleChange}
                onBlur={handleBlur}
              />
              </div>
             {values.role === "student" && (
                <div style={{width:'100%'}}>
                <InputField
                   label={"ຫ້ອງຮຽນ"}
                  id="classRoom"
                  name="classRoom"
                  type="text"
                  placeholder="1CS1"
                  value={values.classRoom}
                  errors={errors.classRoom}
                  touched={touched.classRoom}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
                </div>
             )}
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
              />
             </div>
              <button className="btn">ລົງທະບຽນ</button>
              {/* <div style={{ display: "flex", justifyContent: "start" ,marginTop:'5px'}}>
               <div> <p>Already have Account ?</p></div><div style={{marginLeft:'10px'}}><Link to={"/"} onClick={handleLogin}>login here</Link></div>
              </div> */}
            </form>
          )}
        </Formik>
      </div>
      {/* <SuccessPopUp  /> */}
    </>
  );
};


export default RegisterForm

