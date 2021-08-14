import React from "react";
import "./styles.scss";
import { useLocation } from "react-router-dom";

const Title: React.FC = () => {
  const location = useLocation();
  const isSecondStep = location.pathname.includes("locality") ? "active" : "";

  return (
    <div>
      <h3>Welcome to Locality!</h3>
      <div className="steps-container">
        <span className="circle active">1</span>
        <hr />
        <span className={"circle " + isSecondStep}>2</span>
      </div>
    </div>
  );
};

export default Title;
