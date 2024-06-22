import { FaHouseUser } from "react-icons/fa";
import { IoCameraOutline } from "react-icons/io5";
import { FaFileWord } from "react-icons/fa";
const Detect = () => {
  return (
   <div className="detect-section">
       <div className='detect-container'> 
        <div className='detect-left'>
            <div className="detect-icon">
               <IoCameraOutline size={30} className="icon"/>
            </div>
            <div className="title">
            ເປີດກ້ອງເພື່ອບັນທຶກເຂົ້າຫ້ອງ
            </div>
            <div className="button-container">
               <button className="btn">Open Camera</button>
            </div>
        </div>
        <div className='detect-right'>
            <h3>ເປີດກ້ອງເພື່ອບັນທຶກເຂົ້າຫ້ອງ</h3>
            <div className="detect-content">
                <span><FaFileWord  size={25}  className="icon"  style={{color: "var(--main-color)"}}/></span><div>Lorem ipsum, dolor sit amet consectetur ?</div>
            </div>
            <div className="detect-content">
                <span><FaFileWord  size={25}  className="icon"  style={{color: "var(--main-color)"}}/></span><div>Lorem ipsum, dolor sit amet consectetur ?</div>
            </div>
            <div className="detect-content">
                <span><FaFileWord  size={25}  className="icon"  style={{color: "var(--main-color)"}}/></span><div>Lorem ipsum, dolor sit amet consectetur ?</div>
            </div>
            <div className="detect-content">
                <span><FaFileWord  size={25}  className="icon"  style={{color: "var(--main-color)"}}/></span><div>Lorem ipsum, dolor sit amet consectetur ?</div>
            </div>
            <div className="detect-content">
                <span><FaFileWord  size={25}  className="icon"  style={{color: "var(--main-color)"}}/></span><div>Lorem ipsum, dolor sit amet consectetur ?</div>
            </div>
        </div>
    </div>
   </div>
  )
}

export default Detect