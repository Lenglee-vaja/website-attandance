
import { FaFacebook } from "react-icons/fa";
import { AiFillTikTok } from "react-icons/ai";
import { FaInstagramSquare } from "react-icons/fa";


const Footer = () => {
  return (
    <footer className=" bg-dark">
        <div className="footer-top">
        <div className='left'>
            <h2>Logo</h2>
        </div>
        <div className="right">
            <span><FaFacebook size={28}/></span>
            <span>< AiFillTikTok size={28}/></span>
            <span><FaInstagramSquare size={28}/></span>
        </div>
        </div>
        <div className="footer-bottom">
            <p>Copyright © 2022. All Rights Reserved.</p>
        </div>
    </footer>
  )
}

export default Footer