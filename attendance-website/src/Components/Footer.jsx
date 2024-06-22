
import { SiPreact } from "react-icons/si";
import { FaPython } from "react-icons/fa";
import { SiFastapi } from "react-icons/si";
import { SiMongodb } from "react-icons/si";
import { SiPostman } from "react-icons/si";
import { SiNumpy } from "react-icons/si";


const Footer = () => {
  return (
    <footer className=" bg-dark">
      <div className="footer-top">
        <div className="left">
          <span>
            <img src="./public/images/ມຊ.png" alt="image" className="footer-image"/>
          </span>
          <h2>ມະຫາວິທະຍາໄລເເຫ່ງຊາດ</h2>
        </div>
        <div className="right">
          <span>
            <SiPreact size={28} />
          </span>
          <span>
            <FaPython size={28} />
          </span>
          <span>
            <SiFastapi size={28} />
          </span>
          <span>
            <SiMongodb size={28} />
          </span>
          <span>
            <SiPostman size={28} />
          </span>
          <span>
            <SiNumpy size={28} />
          </span>
        </div>
      </div>
      <div className="footer-bottom">
        <p>Copyright © 2022. All Rights Reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
