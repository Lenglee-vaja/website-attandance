import { useNavigate } from "react-router-dom";
import { HiCamera } from "react-icons/hi2";
import searchImage  from '../../public/Images/search-logo.jpg'
const Main = () => {
  const navigate = useNavigate();
  const handleNavigate = () => {
    navigate("/detect")
  }
  return (
    <main className='main-section'>
         <div className='left'>
          <div className='search-section'>
              <div className="icon-section" onClick={handleNavigate}>
                <HiCamera size={30} className="icon"/>
              </div>
              <input placeholder=' ປ້ອນລະຫັດຫ້ອງຮຽນ' />
              <div className="search">
                  <img src={searchImage} alt="search-logo" />
              </div>
          </div>
            <h2>ລະບົບບັນທືກລາຍຊື່ດ້ວຍການຈື່ຈຳໃບໜ້າ</h2>
            <p>&emsp;ເປັນລະບົບທີ່ພັດທະນາຂື້ນມາເພື່ອເຮັດໃຫ້ການບັນທືກລາຍຊື່ຄົນເຂົ້າຫ້ອງຮຽນຂອງອາຈານໃຫ້ມີຄວາມງ່າຍຂື້ນ, ມີຄວາມຖືກຕ້ອງ, ປະຫຍັດເວລາ ເເລະ ທັນສະໄໝ່ດ້ວຍການນຳໃຊ້ເຕັກນິກການຈື່ຈຳໃບໜ້າ.</p>
         </div>
         <div className='right'>
              <img src='https://pimeyes.com/build/assets/hero-section-c91d8914.svg' />
         </div>
    </main>
  )
}

export default Main