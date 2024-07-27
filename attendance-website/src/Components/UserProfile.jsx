import {useState}from 'react'
import { Formik } from 'formik'
import InputField from './InputField'
import { Link, useNavigate } from "react-router-dom";
import { CiLock } from "react-icons/ci";
import { VscError } from "react-icons/vsc";
import { TbPhoneCall } from "react-icons/tb";
import axios from "axios";
import { API } from "../constants/api";


const UserProfile = () => {
    const [isError, setIsError] = useState(null);
    const userData = localStorage.getItem("userData");
    const user = JSON.parse(userData);
    const handleUpdate = async (values) => {
      try {
        
      } catch (error) {
        
      }
    }
  return (
    <div style={{display:'grid', placeItems:'center', height: "90vh" ,width:'100%',background:'transparent'}}>
      <div>
        <h3>ຂໍ້ມູນນັກສຶກສາ</h3>
      </div>
        <div style={{ background: "white", padding: "1rem"}}>
        <Formik
          initialValues={{
            student_code: user.student_code || "",
            class_name: user.class_name || "",
            fullname: user.fullname || "",
            phone: user.phone || "",
          }}
          validate={(values) => {
            const errors = {};
            if (!values.phone) {
              errors.phone = "ກະລຸນາປ້ອນເບີໂທລະສັບ";
            }
          
            return errors;
          }}
          onSubmit={(values) => {
            handleUpdate(values);
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
            >
              <div
                style={{
                  width: "100%",
                  display: "flex",
                  alignItems: "center",
                  flexDirection: "column",
                }}
              >
                {/* <h3>ຂໍ້ມູນຂ້ອຍ</h3> */}
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
                  label={"ລະຫັດນັກສຶກສາ"}
                  id="student_code"
                  name="student_code"
                  type="text"
                  placeholder="ປ້ອນລະຫັດນັກສືກສາ"
                  value={values.student_code}
                  errors={errors.student_code}
                  touched={touched.student_code}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  icon={<TbPhoneCall size={20} />}
                />
              </div>
              <div style={{ width: "100%" }}>
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
                  icon={<TbPhoneCall size={20} />}
                />
              </div>
              <div style={{ width: "100%" }}>
                <InputField
                  label={"ຫ້ອງຮຽນ"}
                  id="class_name"
                  name="class_name"
                  type="text"
                  placeholder="class name"
                  value={values.class_name}
                  errors={errors.class_name}
                  touched={touched.class_name}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  icon={<TbPhoneCall size={20} />}
                />
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
              <button className="btn" type="submit" style={{ width: "100%" ,padding:"12px 0",borderRadius:'6px',border:"none",background:"var(--main-color)",color:"white",fontWeight:'600',cursor:"pointer"}}>
                ເເກ້ໄຂຂໍ້ມູນ
              </button>
            </form>
          )}
        </Formik>
        </div>
    </div>
  )
}

export default UserProfile