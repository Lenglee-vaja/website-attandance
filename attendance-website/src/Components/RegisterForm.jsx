import { Link } from "react-router-dom";
import { Formik } from "formik";
import axios from "axios";
import InputField from "./InputField";
import RoleCheckBox from "./RoleCheckBox";
import { BsFillPersonVcardFill } from "react-icons/bs";
import { GoPerson } from "react-icons/go";
import { TbPhoneCall } from "react-icons/tb";
import { SiGoogleclassroom } from "react-icons/si";
import { CiLock } from "react-icons/ci";
import { API } from "../constants/api";
import { useNavigate } from "react-router-dom";



const RegisterForm = ({
  onClose,
  animated,
  setOpenRegisterModal,
  setOpenWebCamModal,
  setUserInfo,
}) => {
  const navigate = useNavigate();


  const handleCloseModal = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };
  const handleRegister = async(values) => {
    setUserInfo(values);
    if (values?.role === "student") {
      setOpenRegisterModal(false);
      setOpenWebCamModal(true);
    } else {
      try {
        const response = await axios.post(`${API}/teacher/register`, values);
        console.log("response", response);
        if (response.status === 200) {
          setOpenRegisterModal(false);
          localStorage.setItem("token", response.data.token);
          localStorage.setItem("userData", JSON.stringify(response.data.data));
          navigate("/dashboard");
        }
      } catch (error) {
        console.log(error);
      }
    }
  };
  return (
    <>
      <div className="form-container" onClick={handleCloseModal}>
        <Formik
          initialValues={{
            role: "student",
            student_code: "",
            fullname: "",
            phone: "",
            password: "",
            class_name: "",
          }}
          validate={(values) => {
            const errors = {};
            if (`${values.role}` === "student") {
              if (!values.class_name) {
                errors.class_name = "ກະລຸນາປ້ອນຫ້ອງ";
              }
              if (!values.student_code) {
                errors.student_code = "ກະລຸນາປ້ອນລະຫັດນັກສືກສາ";
              }
            }
            if (!values.fullname) {
              errors.fullname = "ກະລຸນາປ້ອນຊື່";
            }
            if (!values.phone) {
              errors.phone = "ກະລຸນາປ້ອນເບີໂທ";
            }
            if (!values.password) {
              errors.password = "ກະລຸນາປ້ອນລະຫັດຜ່ານ";
            }
            return errors;
          }}
          onSubmit={(values) => {
            handleRegister(values);
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
                animation: `${
                  animated ? "scaleUp" : "scaleDown"
                } 0.4s ease-in-out`,
              }}
            >
              <div
                style={{
                  width: "100%",
                  display: "flex",
                  justifyContent: "center",
                  marginBottom: "1rem",
                }}
              >
                {" "}
                <h3>ຂໍ້ມູນລົງທະບຽນ</h3>
              </div>
              <div>
                <RoleCheckBox
                  value={values.role}
                  onChange={handleChange}
                  label="ສິດນຳໃຊ້ລະບົບ"
                  name="role"
                />
              </div>
              <div style={{ width: "100%" }}>
                {values.role === "student" && (
                  <InputField
                    label={"ລະຫັດນັກສືກສາ"}
                    id="student_code"
                    name="student_code"
                    type="text"
                    placeholder="FNS0020"
                    value={values.student_code}
                    errors={errors.student_code}
                    touched={touched.student_code}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    icon={<BsFillPersonVcardFill size={20} />}
                  />
                )}
                <InputField
                  label={"ຊື່ ເເລະ ນາມສະກຸນ"}
                  id="fullname"
                  name="fullname"
                  type="text"
                  placeholder="ປ້ອນຊື່ ເເລະ ນາມສະກຸນ"
                  value={values.fullname}
                  errors={errors.fullname}
                  touched={touched.fullname}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  icon={<GoPerson size={20} />}
                />
              </div>
              <div style={{ width: "100%" }}>
                <InputField
                  label={"ເບີໂທ"}
                  id="phone"
                  name="phone"
                  type="text"
                  placeholder={"ປ້ອນເບີໂທ"}
                  value={values.phone}
                  errors={errors.phone}
                  touched={touched.phone}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  icon={<TbPhoneCall size={20} />}
                />
              </div>
              {values.role === "student" && (
                <div style={{ width: "100%" }}>
                  <InputField
                    label={"ຫ້ອງຮຽນ"}
                    id="class_name"
                    name="class_name"
                    type="text"
                    placeholder="1CS1"
                    value={values.class_name}
                    errors={errors.class_name}
                    touched={touched.class_name}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    icon={<SiGoogleclassroom size={20} />}
                  />
                </div>
              )}
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
              <button className="btn">ລົງທະບຽນ</button>
            </form>
          )}
        </Formik>
      </div>
      {/* <SuccessPopUp  /> */}
    </>
  );
};

export default RegisterForm;
