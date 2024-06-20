import axios from 'axios'
import React, { useEffect, useState } from 'react'

const Home = () => {
  const [adminTotal, setAdminTotal] = useState(0)
  const [employeeTotal, setemployeeTotal] = useState(0)
  const [salaryTotal, setSalaryTotal] = useState("")
  const [admins, setAdmins] = useState([])

  useEffect(() => {
    adminCount();
    employeeCount();
    salaryCount();
    AdminRecords();
  }, [])

  const AdminRecords = () => {
    axios.get('http://localhost:3000/auth/admin_records')
    .then(result => {
      if(result.data.Status) {
        setAdmins(result.data.Result)
      } else {
         alert(result.data.Error)
      }
    })
  }
  const adminCount = () => {
    axios.get('http://localhost:3000/auth/admin_count')
    .then(result => {
      if(result.data.Status) {
        setAdminTotal(result.data.Result[0].admin)
      }
    })
  }
  const employeeCount = () => {
    axios.get('http://localhost:3000/auth/employee_count')
    .then(result => {
      if(result.data.Status) {
        setemployeeTotal(result.data.Result[0].employee)
      }
    })
  }
  const salaryCount = () => {
    axios.get('http://localhost:3000/auth/salary_count')
    .then(result => {
      if(result.data.Status) {
        setSalaryTotal(result.data.Result[0].salaryOFEmp)
      } else {
        alert(result.data.Error)
      }
    })
  }
  return (
    <div>
      <div className='p-3 d-flex justify-content-around mt-3'>
        <div className='px-3 pt-2 pb-3 border shadow-sm w-25'>
          <div className='text-center pb-1'>
            <h4>ນັກສືກສາທັງໝົດ</h4>
          </div>
          <hr />
          <div className='d-flex justify-content-between'>
            <h5>ຈຳນວນ:</h5>
            <h5>{adminTotal}</h5>
            <h5>ຄົນ</h5>
          </div>
        </div>
        <div className='px-3 pt-2 pb-3 border shadow-sm w-25'>
          <div className='text-center pb-1'>
            <h4>ນັກສືກສາທີ່ຂາດຮຽນ</h4>
          </div>
          <hr />
          <div className='d-flex justify-content-between'>
            <h5>ຈຳນວນ:</h5>
            <h5>{employeeTotal}</h5>
            <h5>ຄົນ</h5>
          </div>
        </div>
        <div className='px-3 pt-2 pb-3 border shadow-sm w-25'>
          <div className='text-center pb-1'>
            <h4>ຫ້ອງຮຽນ</h4>
          </div>
          <hr />
          <div className='d-flex justify-content-between'>
            <h5>ຊື່ຫ້ອງ:</h5>
            <h5>{salaryTotal}</h5>
          </div>
        </div>
      </div>
      <div className='mt-4 px-5 pt-3'>
        <h3>ລາຍການນັກສືກສາ</h3>
        <table className='table'>
          <thead>
            <tr>
              <th>ລະຫັດນັກສືກສາ</th>
              <th>ຮູບ</th>
              <th>ຊື່</th>
              <th>ນາມສະກຸນ</th>
              <th>ອີເມວ</th>
              <th>ເບີໂທ</th>
              <th>ຈັດການ</th>
            </tr>
          </thead>
          <tbody>
            {
              admins.map(a => (
                <tr>
                  <td>{a.email}</td>
                  <td>
                  <button
                    className="btn btn-info btn-sm me-2">
                    Edit
                  </button>
                  <button
                    className="btn btn-warning btn-sm" >
                    Delete
                  </button>
                  </td>
                </tr>
              ))
            }
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default Home