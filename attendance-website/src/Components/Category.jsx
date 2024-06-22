import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'

const Category = () => {
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
        <div className='d-flex justify-content-center'>
            <h3>ລາຍການຫ້ອງທີ່ຖືກສ້າງ</h3>
        </div>
        <Link to="/category/add_category" className='btn btn-success'>ສ້າງຫ້ອງ</Link>
        <div className='mt-3'>
          <table className='table'>
            <thead>
              <tr>
                <th>ລະຫັດຫ້ອງ</th>
                <th>ວິຊາ</th>
                <th>ຫ້ອງ</th>
                <th>ຊົ່ວໂມງ</th>
                <th>ວັນທີ</th>
              </tr>
            </thead>
            <tbody>
              {
                categorytest.map(c =>(
                  <tr>
                    <td>{c.classCode}</td>
                    <td>{c.subject}</td>
                    <td>{c.className}</td>
                    <td>{c.classHour}</td>
                    <td>{c.classDate}</td>
                  </tr>
                ))
              }
            </tbody>
          </table>
        </div>
    </div>
  )
}

export default Category