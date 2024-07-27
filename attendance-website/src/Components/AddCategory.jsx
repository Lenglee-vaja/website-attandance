// import axios from "axios";
// import React, { useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";
// import SelectDropDown from "./SelectDropDown";
// import InputField from "./InputField";
// import { SiGoogleclassroom } from "react-icons/si";
// import { HiOutlineAcademicCap } from "react-icons/hi";
// import { API } from "../constants/api";
// import ModalComponent from "./AddClassModal";

// const AddCategory = () => {
//   const [subject, setSubject] = useState("");
//   const [className, setClassName] = useState("");
//   const [classHour, setClassHour] = useState("");
//   const [location, setLocation] = useState({ latitude: null, longitude: null });
//   const [isOpen, setIsOpen] = useState(false);
//   const [modalData, setModalData] = useState({});
//   const classHours = [
//     {
//       id: 1,
//       name: "ຊົ່ວໂມງ 1",
//     },
//     {
//       id: 2,
//       name: "ຊົ່ວໂມງ 2",
//     },
//     {
//       id: 3,
//       name: "ຊົ່ວໂມງ 3",
//     },
//     {
//       id: 4,
//       name: "ຊົ່ວໂມງ 4",
//     },
//   ];
//   const getLocation = () => {
//     if (navigator.geolocation) {
//       navigator.geolocation.getCurrentPosition(
//         (position) => {
//           setLocation({
//             latitude: position.coords.latitude,
//             longitude: position.coords.longitude
//           });
//         },
//         (error) => {
//           console.error(error);
//         }
//       );
//     } else {
//       console.error("Geolocation is not supported by this browser.");
//     }
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     const data = {
//       class_name: className,
//       subject: subject,
//       class_hour: classHour,
//     };

//     const token = localStorage.getItem("token");
//     console.log("data=====>", data);
//     await axios
//       .post(`${API}/add_class`, data, {
//         headers: {
//           "Content-Type": "application/json",
//           Authorization: `Bearer ${token}`,
//         },
//       })
//       .then((result) => {
//         if (result.status === 200) {
//           setModalData(result.data.data); // Save response data for modal
//           setIsOpen(true); // Open modal on success

//           // navigate("/category");
//         } else {
//           alert(result.data.Error);
//         }
//       })
//       .catch((err) => console.log(err));
//   };

//   return (
//     <div
//       className="d-flex justify-content-center align-items-start p-5"
//       style={{ height: "100vh" }}
//     >
//       <div className="login-form" style={{ padding: "50px" }}>
//         <form className="row g-1 " onSubmit={handleSubmit}>
//           <div className="col-12 mt-3">
//             <SelectDropDown
//               label="ຫ້ອງຮຽນ"
//               options={["1CS1", "2CS1", "3CS1", "4CS1"]}
//               onChange={(e) => setClassName(e.target.value)}
//               placeholder={"1CS1"}
//               icon={<SiGoogleclassroom size={20} />}
//             />
//           </div>
//           <div className="col-12 mt-3">
//             <InputField
//               label="ຊື່ວິຊາ"
//               type="text"
//               value={subject}
//               name="subject"
//               placeholder={"ປ້ອນຊື່ວິຊາ"}
//               onChange={(e) => setSubject(e.target.value)}
//               icon={<HiOutlineAcademicCap size={20} />}
//             />
//           </div>
//           <div className="col-12">
//             <label htmlFor="classHour" className="form-label">
//               ຊົ່ວໂມງຮຽນ
//             </label>
//             <div className="grid-container">
//               {classHours.map((c) => (
//                 <div key={c.id} className="grid-item">
//                   <input
//                     className="form-check-input"
//                     type="radio"
//                     name="classHour"
//                     id={`classHour_${c.id}`}
//                     value={c.id}
//                     onChange={(e) => setClassHour(e.target.value)}
//                   />
//                   <label
//                     className="form-check-label"
//                     htmlFor={`classHour_${c.id}`}
//                   >
//                     {c.name}
//                   </label>
//                 </div>
//               ))}
//             </div>
//           </div>

//           <div className="col-12 mt-3">
//             <button type="submit" className="btn btn-primary w-100 p-2">
//               ສ້າງຫ້ອງ
//             </button>
//           </div>
//         </form>
//         <ModalComponent
//         isOpen={isOpen}
//         closeModal={() => setIsOpen(false)}
//         data={modalData}
//       />
//       </div>
//       {/* Modal Popup */}

//     </div>
//   );
// };

// export default AddCategory;

import axios from "axios";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import SelectDropDown from "./SelectDropDown";
import InputField from "./InputField";
import { SiGoogleclassroom } from "react-icons/si";
import { CiLocationOff } from "react-icons/ci";
import { CiLocationOn } from "react-icons/ci";
import { HiOutlineAcademicCap } from "react-icons/hi";
import { API } from "../constants/api";
import ModalComponent from "./AddClassModal";

const AddCategory = () => {
  const locationNav = useLocation();
  const category = locationNav.state?.category;
  const [subject, setSubject] = useState("");
  const [className, setClassName] = useState("");
  const [classHour, setClassHour] = useState("");
  const [location, setLocation] = useState({ latitude: null, longitude: null });
  const [isOpen, setIsOpen] = useState(false);
  const [modalData, setModalData] = useState({});

  console.log("category:::::::::::", category);
  console.log("classHour:::::::::::", classHour);

  const classHours = [
    {
      id: 1,
      name: "ຊົ່ວໂມງ 1",
    },
    {
      id: 2,
      name: "ຊົ່ວໂມງ 2",
    },
    {
      id: 3,
      name: "ຊົ່ວໂມງ 3",
    },
    {
      id: 4,
      name: "ຊົ່ວໂມງ 4",
    },
  ];

  useEffect(() => {
    getLocation();
  }, []);

  useEffect(() => {
    if (category) {
      setClassName(category.class_name);
      setSubject(category.subject);
      setClassHour(category.class_hour);
    }
  }, [category]);

  const getLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setLocation({
            latitude: position.coords.latitude.toString(),
            longitude: position.coords.longitude.toString(),
          });
        },
        (error) => {
          console.error(error);
        }
      );
    } else {
      console.error("Geolocation is not supported by this browser.");
    }
  };
  console.log("location", location);
  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = {
      class_name: className,
      subject: subject,
      class_hour: classHour,
      teacher_lat: location.latitude,
      teacher_long: location.longitude,
    };

    const token = localStorage.getItem("token");
    console.log("data=====>", data);
    await axios
      .post(`${API}/add_class`, data, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      })
      .then((result) => {
        if (result.status === 200) {
          setModalData(result.data.data); // Save response data for modal
          setIsOpen(true); // Open modal on success

          // navigate("/category");
        } else {
          alert(result.data.Error);
        }
      })
      .catch((err) => console.log(err));
  };

  return (
    <div
      className="d-flex justify-content-center align-items-start p-5"
      style={{ height: "100vh" }}
    >
      <div className="login-form" style={{ padding: "45px" }}>
        {location.latitude === null ? (
          <div style={{ color: "red" }}>
            <span style={{ marginRight: "8px" }}>
              <CiLocationOff size={24} />
            </span>{" "}
            <span>ກຳລັງຄົ້ນຫາຕຳເເໜ່ງປັດຈຸບັນ...</span>
          </div>
        ) : (
          <div style={{ color: "green" }}>
            <span style={{ marginRight: "8px" }}>
              <CiLocationOn size={24} />
            </span>{" "}
            <span>ບັນທືກຕຳເເໜ່ງທີ່ທ່ານຈະສ້າງຫ້ອງສຳເລັດ</span>
          </div>
        )}
        <form className="row g-1 " onSubmit={handleSubmit}>
          <div className="col-12 mt-3">
            <SelectDropDown
              label="ຫ້ອງຮຽນ"
              value={className}
              options={[
                "1CS1",
                "1CS2",
                "2CS1",
                "2CS2",
                "3CS1",
                "3CS2",
                "4CS1",
                "4CS2",
              ]}
              onChange={(e) => setClassName(e.target.value)}
              placeholder={"ເລືອກຫ້ອງຮຽນ"}
              icon={<SiGoogleclassroom size={20} />}
            />
          </div>
          <div className="col-12 mt-3">
            <InputField
              label="ຊື່ວິຊາ"
              type="text"
              value={subject}
              name="subject"
              placeholder={"ປ້ອນຊື່ວິຊາ"}
              onChange={(e) => setSubject(e.target.value)}
              icon={<HiOutlineAcademicCap size={20} />}
            />
          </div>
          <div className="col-12">
            <label htmlFor="classHour" className="form-label">
              ຊົ່ວໂມງຮຽນ
            </label>
            <div className="grid-container">
              {classHours.map((c) => (
                <div key={c.id} className="grid-item">
                  <input
                    className="form-check-input"
                    type="radio"
                    name="classHour"
                    id={`classHour_${c?.id}`}
                    value={c.id}
                    checked={classHour === c.id.toString()}
                    onChange={(e) => setClassHour(e.target.value)}
                  />
                  <label
                    className="form-check-label"
                    htmlFor={`classHour_${c.id}`}
                  >
                    {c.name}
                  </label>
                </div>
              ))}
            </div>
          </div>

          <div className="col-12 mt-3">
            <button type="submit" className="btn btn-primary w-100 p-2">
              ສ້າງຫ້ອງ
            </button>
          </div>
        </form>
        <ModalComponent
          isOpen={isOpen}
          closeModal={() => setIsOpen(false)}
          data={modalData}
        />
      </div>
    </div>
  );
};

export default AddCategory;
