import React, { useRef, useEffect, useState } from "react";
import { Howl } from "howler";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import { API } from "../constants/api";
import { useNavigate } from "react-router-dom";
const Frame = ({userInfo, setOpenWebCamModal}) => {
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const [capturedImages, setCapturedImages] = useState([]);
  const navigate = useNavigate();
  useEffect(() => {
    const startVideo = async () => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({
          video: {},
        });
        videoRef.current.srcObject = stream;
        videoRef.current.play();
        playSound("center"); // Play center sound after starting video
      } catch (error) {
        console.error("Error starting video:", error);
      }
    };

    startVideo();
  }, []);

  useEffect(() => {
    if (capturedImages.length === 3) {
      sendImagesToAPI();
    }
  }, [capturedImages]);

  useEffect(() => {
    const captureInterval = setInterval(() => {
      captureImage();
    }, 4000); // Capture image every 4 seconds

    return () => clearInterval(captureInterval);
  }, [capturedImages]);

  const playSound = (type) => {
    let sound;
    switch (type) {
      case "center":
        sound = new Howl({ src: ["/sounds/center.mp3"] });
        break;
      case "left":
        sound = new Howl({ src: ["/sounds/left.mp3"] });
        break;
      case "right":
        sound = new Howl({ src: ["/sounds/right.mp3"] });
        break;
      case "good":
        sound = new Howl({ src: ["/sounds/good.mp3"] });
        break;
      default:
        break;
    }
    if (sound) sound.play();
  };

  const captureImage = async () => {
    if (capturedImages.length < 3) {
      canvasRef.current
        .getContext("2d")
        .drawImage(
          videoRef.current,
          0,
          0,
          canvasRef.current.width,
          canvasRef.current.height
        );
      const dataUri = canvasRef.current.toDataURL("image/jpeg");
      const blob = await fetch(dataUri).then((res) => res.blob());
      const file = new File([blob], `image_${capturedImages.length + 1}.jpeg`, {
        type: "image/jpeg",
      });
      setCapturedImages((prevImages) => [...prevImages, file]);

      // Play "good" sound after capturing image
      playSound("good");

      // Play the transformation sound after a delay to avoid overlap with "good" sound
      setTimeout(() => {
        switch (capturedImages.length) {
          case 0:
            playSound("right");
            break;
          case 1:
            playSound("left");
            break;
          default:
            break;
        }
      }, 1000); // Adjust the delay as needed
    }
  };

  const sendImagesToAPI = async () => {
    try {
      const formData = new FormData();
      capturedImages.forEach((image) => {
        formData.append("files", image);
      });
      const response = await axios.post(
        `${API}/upload_frames`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      if (response.status === 200){
        const session_Id = response.data.data
        const data = {
          session_id: session_Id,
          ...userInfo
        }
        const responseRegister = await axios.post(`${API}/student/register`, data)
        console.log("responseRegister", responseRegister)
        if (responseRegister.status === 200) {
          localStorage.setItem("token", responseRegister.data.token);
          localStorage.setItem("userData", JSON.stringify(responseRegister.data.data));
          setOpenWebCamModal(false)
          window.location.reload()
        }

      }
    } catch (error) {
      console.error("Error sending images to API:", error);
    }
  };

  return (
    <div className="form-container">
      <div className="login-form d-flex justify-content-center align-items-center">
        <h5 className="card-title">ລົງທະບຽນໃບໜ້າຂອງທ່ານ</h5>

        <div className="card-body">
          <video
            ref={videoRef}
            className="img-fluid mb-3"
            style={{
              maxWidth: "100%",
              width: "100%",
              height: "100%",
              borderRadius: "10px",
            }}
          />

          <canvas ref={canvasRef} style={{ display: "none" }} />
        </div>
      </div>
    </div>
  );
};

export default Frame;
