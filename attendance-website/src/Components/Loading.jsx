import React from "react";

const LoadingPopUp = () => {
  return (
    <div className="loading-container" style={{ background: "rgba(1, 2, 0, 0.4)", zIndex: "99999" }}>
      <div className="loading-card">
        <div className="loading-navbar"></div>
        <div className="loading-body">
          <span className="loader"></span>
        </div>
      </div>
    </div>
  );
};

export default LoadingPopUp;
