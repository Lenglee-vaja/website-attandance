

// import { IoCameraOutline } from "react-icons/io5";
// import { BsPersonBoundingBox } from "react-icons/bs";
// import { SiGoogleclassroom } from "react-icons/si";
// import { BsCalendar2Date } from "react-icons/bs";
// import { MdQrCodeScanner } from "react-icons/md";
// import { GrCloudSoftware } from "react-icons/gr";
// import { CiTimer } from "react-icons/ci";
// import { GiTimeTrap } from "react-icons/gi";
// import React, { useState, useEffect, useRef } from "react";
// import { API } from "../constants/api";
// import axios from "axios";
// import SuccessModal from "./SuccessModal";
// import { useNavigate, useSearchParams, useLocation} from "react-router-dom";
// import formatDateTime from "./FormatTime";

// const Detect = () => {
//   const [cameraOpen, setCameraOpen] = useState(false);
//   const [successModalOpen, setSuccessModalOpen] = useState(false);
//   const videoRef = useRef(null);
//   const canvasRef = useRef(null);
//   const navigate = useNavigate();
//   const userData = localStorage.getItem("userData");
//   const user = JSON.parse(userData);
//   const [location, setLocation] = useState({ latitude: null, longitude: null });
//   console.log(user)
//   const {classData} = useLocation().state || {};
//   console.log("data",classData);

//   const getLocation = () => {
//     if (navigator.geolocation) {
//       navigator.geolocation.getCurrentPosition(
//         (position) => {
//           setLocation({
//             latitude: position.coords.latitude.toString(),
//             longitude: position.coords.longitude.toString(),
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

//   useEffect(() => {
//     const startVideo = async () => {
//       try {
//         const stream = await navigator.mediaDevices.getUserMedia({
//           video: {},
//         });
//         videoRef.current.srcObject = stream;
//         videoRef.current.play();
//       } catch (error) {
//         console.error("Error starting video:", error);
//       }
//     };

//     if (cameraOpen) {
//       startVideo();
//     }
//   }, [cameraOpen]);

//   useEffect(() => {
//     const captureInterval = setInterval(() => {
//       if (cameraOpen) {
//         captureAndSendImage();
//       }
//     }, 2000);

//     return () => clearInterval(captureInterval);
//   }, [cameraOpen]);

//   const stopVideo = () => {
//     const stream = videoRef.current.srcObject;
//     const tracks = stream.getTracks();

//     tracks.forEach((track) => {
//       track.stop();
//     });

//     videoRef.current.srcObject = null;
//   };

//   const captureAndSendImage = async () => {
//     try {
//       if (canvasRef.current && videoRef.current) {
//         const context = canvasRef.current.getContext("2d");
//         context.drawImage(
//           videoRef.current,
//           0,
//           0,
//           canvasRef.current.width,
//           canvasRef.current.height
//         );
//         const dataUri = canvasRef.current.toDataURL("image/jpeg");
//         const blob = await fetch(dataUri).then((res) => res.blob());
//         const file = new File([blob], `image_${new Date().getTime()}.jpeg`, {
//           type: "image/jpeg",
//         });

//         await sendImageToAPI(file);
//       }
//     } catch (error) {
//       console.error("Error capturing and sending image:", error);
//     }
//   };

//   const sendImageToAPI = async (image) => {
//     try {
//       const formData = new FormData();
//       formData.append("files", image);

//       const response = await axios.post(`${API}/detect`, formData, {
//         headers: {
//           "Content-Type": "multipart/form-data",
//         },
//       });
//       if (response.data.data === "Known") {
//         stopVideo();
//         setCameraOpen(false);
//         setSuccessModalOpen(true);

        
//         setTimeout(() => {
//             navigate("/")
//         }, 3000)
        
        

//       }
//     } catch (error) {
//       console.error("Error sending image to API:", error);
//     }
//   };

//   return (
//     <div className="detect-section">
//       <div className="detect-container">
//         {!cameraOpen ? (
//           <div className="detect-left">
//             <div className="detect-icon">
//               <IoCameraOutline size={30} className="icon" />
//             </div>
//             <div className="title">ເປີດກ້ອງຂອງທ່ານພື່ອບັນທຶກລາຍຊື່</div>
//             <div className="button-container">
//               <button
//                 className="btn"
//                 onClick={() => setCameraOpen(!cameraOpen)}
//               >
//                 ເປີດກ້ອງ
//               </button>
//             </div>
//           </div>
//         ) : (
//           <div
//             className="detect-left"
//             style={{
//               padding: 0,
//               border: "none",
//               borderRadius: "1rem",
//               overflow: "hidden",
//             }}
//           >
//             {cameraOpen && (
//               <div className="camera-container">
//                 <video
//                   ref={videoRef}
//                   className="camera-video"
//                   style={{ width: "100%" }}
//                 />
//                 <canvas ref={canvasRef} style={{ display: "none" }} />
//               </div>
//             )}
//           </div>
//         )}
//         <div className="detect-right">
//           <h3>ລາຍລະອຽດຂອງການບັນທືກລາຍຊື່</h3>
//           <div className="detect-content">
//             <span>
//               <BsPersonBoundingBox
//                 size={25}
//                 className="icon"
//                 style={{ color: "var(--main-color)" }}
//               />
//             </span>
//             <div>ສະບາຍດີ {user.fullname}</div>
//           </div>
//           <div className="detect-content">
//             <span>
//               <SiGoogleclassroom
//                 size={25}
//                 className="icon"
//                 style={{ color: "var(--main-color)" }}
//               />
//             </span>
//             <div>ອາຈານ {classData.teacher_fullname} ຫ້ອງ:&ensp;{classData.class_name}</div>
//           </div>
//           <div className="detect-content">
//             <span>
//               <BsCalendar2Date
//                 size={25}
//                 className="icon"
//                 style={{ color: "var(--main-color)" }}
//               />
//             </span>
//             <div>{formatDateTime(classData.time)}</div>
//           </div>
//           <div className="detect-content">
//             <span>
//               <MdQrCodeScanner
//                 size={25}
//                 className="icon"
//                 style={{ color: "var(--main-color)" }}
//               />
//             </span>
//             <div>ລະຫັດຫ້ອງ:&ensp; {classData.class_code}</div>
//           </div>
//           <div className="detect-content">
//             <span>
//               <GrCloudSoftware
//                 size={25}
//                 className="icon"
//                 style={{ color: "var(--main-color)" }}
//               />
//             </span>
//             <div>ວິຊາ: &ensp; {classData.subject}</div>
//           </div>
//           <div className="detect-content">
//             <span>
//               <GiTimeTrap
//                 size={25}
//                 className="icon"
//                 style={{ color: "var(--main-color)" }}
//               />
//             </span>
//             <div>ຊົ່ວໂມງທີ່:&ensp; {classData.class_hour}</div>
//           </div>
//         </div>
//       </div>
//       <SuccessModal isOpen={successModalOpen} onClose={() => setSuccessModalOpen(false)} />
//     </div>
//   );
// };

// export default Detect;









import { IoCameraOutline } from "react-icons/io5";
import { BsPersonBoundingBox } from "react-icons/bs";
import { SiGoogleclassroom } from "react-icons/si";
import { BsCalendar2Date } from "react-icons/bs";
import { MdQrCodeScanner } from "react-icons/md";
import { GrCloudSoftware } from "react-icons/gr";
import { GiTimeTrap } from "react-icons/gi";
import React, { useState, useEffect, useRef } from "react";
import { API } from "../constants/api";
import axios from "axios";
import SuccessModal from "./SuccessModal";
import { useNavigate, useLocation } from "react-router-dom";
import formatDateTime from "./FormatTime";

const Detect = () => {
  const [cameraOpen, setCameraOpen] = useState(false);
  const [successModalOpen, setSuccessModalOpen] = useState(false);
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const navigate = useNavigate();
  const userData = localStorage.getItem("userData");
  const user = JSON.parse(userData);
  const { classData } = useLocation().state || {};
  const [location, setLocation] = useState({ latitude: null, longitude: null });
  const [isError, setIsError] = useState(false);

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

  useEffect(() => {
    getLocation();
  }, []);

  const checkLocationAndOpenCamera = async () => {
    try {
       const data = {
        teacher_lat: classData.teacher_lat,
        teacher_long: classData.teacher_long,
        student_lat: location.latitude,
        student_long: location.longitude,
       }
       console.log({data})
      const response = await axios.post(`${API}/check_location`, data);
      console.log("response ===>", response.data.data.status);
      if (response.data.data.status === "in_range") {
        setCameraOpen(true);
      } else {
        setIsError(true);
      }
    } catch (error) {
      console.error("Error checking location:", error);
    }
  };

  const startCamera = () => {
    if (location.latitude && location.longitude) {
      console.log("location", location);
      checkLocationAndOpenCamera();
    } else {
      alert("Location information not available.");
    }
  };

  useEffect(() => {
    const startVideo = async () => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({
          video: {},
        });
        videoRef.current.srcObject = stream;
        videoRef.current.play();
      } catch (error) {
        console.error("Error starting video:", error);
      }
    };

    if (cameraOpen) {
      startVideo();
    }
  }, [cameraOpen]);

  useEffect(() => {
    const captureInterval = setInterval(() => {
      if (cameraOpen) {
        captureAndSendImage();
      }
    }, 2000);

    return () => clearInterval(captureInterval);
  }, [cameraOpen]);

  const stopVideo = () => {
    const stream = videoRef.current.srcObject;
    const tracks = stream.getTracks();

    tracks.forEach((track) => {
      track.stop();
    });

    videoRef.current.srcObject = null;
  };

  const captureAndSendImage = async () => {
    try {
      if (canvasRef.current && videoRef.current) {
        const context = canvasRef.current.getContext("2d");
        context.drawImage(
          videoRef.current,
          0,
          0,
          canvasRef.current.width,
          canvasRef.current.height
        );
        const dataUri = canvasRef.current.toDataURL("image/jpeg");
        const blob = await fetch(dataUri).then((res) => res.blob());
        const file = new File([blob], `image_${new Date().getTime()}.jpeg`, {
          type: "image/jpeg",
        });

        await sendImageToAPI(file);
      }
    } catch (error) {
      console.error("Error capturing and sending image:", error);
    }
  };

  const sendImageToAPI = async (image) => {
    try {
      const formData = new FormData();
      formData.append("files", image);

      const response = await axios.post(`${API}/detect`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
        params: {
          class_code: classData.class_code
        }
      });

      if (response.data.data === "Known") {
        stopVideo();
        setCameraOpen(false);
        setSuccessModalOpen(true);

        setTimeout(() => {
          navigate("/");
        }, 3000);
      }
    } catch (error) {
      console.error("Error sending image to API:", error);
    }
  };

  return (
    <div className="detect-section">
      <div className="detect-container">
        {!cameraOpen ? (
          <div>
            <div className="detect-left">
            <div className="detect-icon">
              <IoCameraOutline size={30} className="icon" />
            </div>
            <div className="title">ເປີດກ້ອງຂອງທ່ານພື່ອບັນທຶກລາຍຊື່</div>
            <div className="button-container">
              <button className="btn" onClick={startCamera}>
                ເປີດກ້ອງ
              </button>
            </div>  
          </div>
          {isError && (
            <div className="error-message" style={{ color: "red",  textAlign: "center", paddingTop: "1rem"}}>
              ບໍ່ສາມາດບັນທືກລາຍຊື່ນອກຫ້ອງຮຽນໄດ້
            </div>
          )}
          </div>
          
        ) : (
          <div
            className="detect-left"
            style={{
              padding: 0,
              border: "none",
              borderRadius: "1rem",
              overflow: "hidden",
            }}
          >
            {cameraOpen && (
              <div className="camera-container">
                <video
                  ref={videoRef}
                  className="camera-video"
                  style={{ width: "100%" }}
                />
                <canvas ref={canvasRef} style={{ display: "none" }} />
              </div>
            )}
          </div>
        )}
        <div className="detect-right">
          <h3>ລາຍລະອຽດຂອງການບັນທືກລາຍຊື່</h3>
          <div className="detect-content">
            <span>
              <BsPersonBoundingBox
                size={25}
                className="icon"
                style={{ color: "var(--main-color)" }}
              />
            </span>
            <div>ສະບາຍດີ {user.fullname}</div>
          </div>
          <div className="detect-content">
            <span>
              <SiGoogleclassroom
                size={25}
                className="icon"
                style={{ color: "var(--main-color)" }}
              />
            </span>
            <div>
              ອາຈານ {classData.teacher_fullname} ຫ້ອງ:&ensp;{classData.class_name}
            </div>
          </div>
          <div className="detect-content">
            <span>
              <BsCalendar2Date
                size={25}
                className="icon"
                style={{ color: "var(--main-color)" }}
              />
            </span>
            <div>{formatDateTime(classData.time)}</div>
          </div>
          <div className="detect-content">
            <span>
              <MdQrCodeScanner
                size={25}
                className="icon"
                style={{ color: "var(--main-color)" }}
              />
            </span>
            <div>ລະຫັດຫ້ອງ:&ensp; {classData.class_code}</div>
          </div>
          <div className="detect-content">
            <span>
              <GrCloudSoftware
                size={25}
                className="icon"
                style={{ color: "var(--main-color)" }}
              />
            </span>
            <div>ວິຊາ: &ensp; {classData.subject}</div>
          </div>
          <div className="detect-content">
            <span>
              <GiTimeTrap
                size={25}
                className="icon"
                style={{ color: "var(--main-color)" }}
              />
            </span>
            <div>ຊົ່ວໂມງທີ່:&ensp; {classData.class_hour}</div>
          </div>
        </div>
      </div>
      <SuccessModal
        isOpen={successModalOpen}
        onClose={() => setSuccessModalOpen(false)}
      />
    </div>
  );
};
 
export default Detect;