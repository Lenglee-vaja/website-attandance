import { FaHouseUser } from "react-icons/fa";
import { IoCameraOutline } from "react-icons/io5";
import { FaFileWord } from "react-icons/fa";
import { BsPersonBoundingBox } from "react-icons/bs";
import { SiGoogleclassroom } from "react-icons/si";
import { BsCalendar2Date } from "react-icons/bs";
import { CiTimer } from "react-icons/ci";
import { GiTimeTrap } from "react-icons/gi";
const Detect = () => {
  return (
   <div className="detect-section">
       <div className='detect-container'> 
        <div className='detect-left'>
            <div className="detect-icon">
               <IoCameraOutline size={30} className="icon"/>
            </div>
            <div className="title">
            ເປີດກ້ອງຂອງທ່ານພື່ອບັນທຶກລາຍຊື່
            </div>
            <div className="button-container">
               <button className="btn">ເປີດກ້ອງ</button>
            </div>
        </div>
        <div className='detect-right'>
            <h3>ລາຍລະອຽດຂອງການບັນທືກລາຍຊື່</h3>
            <div className="detect-content">
                <span><BsPersonBoundingBox  size={25}  className="icon"  style={{color: "var(--main-color)"}}/></span><div>ສະບາຍດີ <strong>ທ້າວ ເລັ່ງລີ ວາຈາ</strong></div>
            </div>
            <div className="detect-content">
                <span><SiGoogleclassroom  size={25}  className="icon"  style={{color: "var(--main-color)"}}/></span><div>ອາຈານ ຈັນທະສິດ ຫ້ອງ:&ensp;4CS1</div>
            </div>
            <div className="detect-content">
                <span><BsCalendar2Date  size={25}  className="icon"  style={{color: "var(--main-color)"}}/></span><div>ວັນຈັນ,&ensp; ວັນທີ 13 ຕຸລາ 2022</div>
            </div>
            <div className="detect-content">
                <span><CiTimer  size={25}  className="icon"  style={{color: "var(--main-color)"}}/></span><div>ເວລາ:&ensp; 12:00-14:00,&ensp; ລະຫັດຫ້ອງ: &ensp;FNS125432</div>
            </div>
            <div className="detect-content">
                <span><GiTimeTrap  size={25}  className="icon"  style={{color: "var(--main-color)"}}/></span><div>ຊົ່ວໂມງທີ່:&ensp; 2</div>
            </div>
        </div>
    </div>
   </div>
  )
}

export default Detect