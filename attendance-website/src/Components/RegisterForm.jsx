
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
                errors.classRoom = "Required classRoom"
              }
              if(!values.studentId){
                errors.studentId = "Required studentId"
              }
            }
            if(!values.userName){
              errors.userName = "Required Name"
            }
            if(!values.phoneNumber){
              errors.phoneNumber = "Required phone Number"
            }
            if (!values.password) {
              errors.password = "Required password";
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
                Register Form
              </h3></div>
               <div>
                  <RoleCheckBox value={values.role} onChange={handleChange} label="Role" name="role"/>
               </div>
              <div style={{width:'100%'}}>
              {values.role === "student" && (
                 <InputField
                 label={"Student Id"}
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
                label={"User Name"}
                id="userName"
                name="userName"
                type="text"
                placeholder="Your Name"
                value={values.userName}
                errors={errors.userName}
                touched={touched.userName}
                onChange={handleChange}
                onBlur={handleBlur}
              />
              </div>
              <div style={{width:'100%'}}>
              <InputField
                label={"Phone Number"}
                id="phoneNumber"
                name="phoneNumber"
                type="text"
                placeholder={"phoneNumber"}
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
                   label={"Class Room"}
                  id="classRoom"
                  name="classRoom"
                  type="text"
                  placeholder="Cs001"
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
                 label={"Password"}
                id="password"
                name="password"
                type="password"
                placeholder="Password"
                value={values.password}
                errors={errors.password}
                touched={touched.password}
                onChange={handleChange}
                onBlur={handleBlur}
              />
             </div>
              <button className="btn">Register</button>
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

