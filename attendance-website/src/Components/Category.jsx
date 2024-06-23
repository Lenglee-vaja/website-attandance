import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import { IoSearchOutline } from "react-icons/io5";
import CustomTable from './CustomTable'
import InputField from './InputField'

const Category = () => {
  const [search, setSearch] = useState("")
  const [category, setCategory] = useState([])
  const categorytest = [
    {
      classCode: "Fns234566",
      subject:"ຄະນິດສາດ",
      className:"4CS1",
      classHour:"2",
      classDate:"ວັນສຸກ 2022-12-12"
    },
    {
      classCode: "Fns987654",
      subject:"ເຄມີ",
      className:"3CS1",
      classHour:"1",
      classDate:"ວັນອັງຄານ 2022-12-12"
    }
  ]
  useEffect(() => {
    axios.get("http://localhost:3000/category")
    .then(result => {
      if(result.data.status){
        setCategory(result.data.result)
      }else{
        alert(result.data.Error)
      }
    }).catch(err => console.log(err))
  })
  return (
    <div className='px-5 mt-3'>
       <div className='d-flex justify-content-between align-content-center'>
       <div className='mt-10' style={{width:"20rem"}}>
            <InputField
               label={"ຄົ້ນຫາ"}
                 id="name"
                value={search}
                type={"text"}
                name={"name"}
                placeholder={"ຄົ້ນຫາ ...."}
                icon={<IoSearchOutline />}                
                onChange={(e) => setSearch(e.target.value)}
            />
        </div>
        <div style={{display:'flex',justifyContent:'center',alignItems:'center'}}>
            <Link to={"/category/add_category"} className="btn btn-primary p-2" style={{width:"10rem"}}>ເພີ່ມຫ້ອງ</Link>
        </div>
       </div>
        <div className='mt-1'>
            <CustomTable header={["ລະຫັດຫ້ອງ", "ຊື່ວິຊາ", "ຫ້ອງ", "ຊົ່ວໂມງ", "ວັນທີ"]}>
                {categorytest?.map((item) => (
                    <tr  key={item.classCode}>
                        <td>{item.classCode}</td>
                        <td>{item.subject}</td>
                        <td>{item.className}</td>
                        <td>{item.classHour}</td>
                        <td>{item.classDate}</td>
                    </tr>
                ))}
            </CustomTable>
        </div>
    </div>
  )
}

export default Category