import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Style.css";

const Employee = () => {
  // const [employee, setEmployee] = useState([]);
  // const navigate = useNavigate();
  // useEffect(() => {
  //   axios
  //     .get("http://localhost:3000/auth/employee")
  //     .then((result) => {
  //       if (result.data.Status) {
  //         setEmployee(result.data.Result);
  //       } else {
  //         alert(result.data.Error);
  //       }
  //     })
  //     .catch((err) => console.log(err));
  // }, []);
  const employee = [
    {
      name: "ເລັ່ງລີ",
      image: "sourav.png",
      email: "lengleevaja@gmail.com",
      address: "ນາຊົມ",
      salary: "4cs1",
      category_id: "sourav",
    },
    {
      name: "ເລັ່ງລີ",
      image: "sourav.png",
      email: "lengleevaja@gmail.com",
      address: "ນາຊົມ",
      salary: "4cs1",
      category_id: "sourav",
    }
  ]
  const handleDelete = (id) =>{
    axios.delete(`http://localhost:3000/auth/delete_employee/${id}`)
    .then(result=>{
        if(result.data.status){
            window.location.reload()
        }else{
            alert(result.data.Error)
        }
    })
    .catch(err=>console.log(err))
  }
  return (
    <div className="px-5 mt-3">
      <div className="d-flex justify-content-center">
        <h3>ລາຍການຜູ້ໃຊ້</h3>
      </div>
      <Link to="/employee/add_employee" className="btn btn-success">
        ເພີ່ມຜູ້ໃຊ້
      </Link>
      <div className="mt-3">
        <table className="table">
          <thead>
            <tr>
              <th>ຊື່</th>
              <th>ຮູບ</th>
              <th>ອີເມວ</th>
              <th>ທີ່ຢູ່</th>
              <th>ຫ້ອງ</th>
              <th>ໃຊ້ງານ</th>
            </tr>
          </thead>
          <tbody>
            {employee.map((e)=>(
              <tr>
                <td>{e.name}</td>
                <td>
                  <img
                  //  src="{`http://localhost:3000/Images/` + e.image}"
                  src="http://localhost:5173/Images/employeems.jpeg"
                   className="employee_image"
                   />
                </td>
                <td>{e.email}</td>
                <td>{e.address}</td>
                <td>{e.salary}</td>
                <td>
                  <Link
                  to={`/dashboard/edit_employee/` + e.id}
                  className="btn btn-info btn-sm me-2">
                    ເເກ້ໄຂ
                  </Link>
                  <button
                  className="btn btn-warning btn-sm"
                  onClick={() => handleDelete(e.id)}
                  >
                    ລືບ
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Employee;
