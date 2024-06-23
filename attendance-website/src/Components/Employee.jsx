import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Style.css";
import CustomTable from "./CustomTable";
import InputField from './InputField'
import { IoSearchOutline } from "react-icons/io5";

const Employee = () => {
  const [search, setSearch] = useState("")
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
      <div className="mt-3">
           <CustomTable header={["ຊື່ຜູ້ໃຊ້", "ຮູບພາບ", "ອີເມວ", "ທີ່ຢູ່", "ລາຍລະອຽດ", "ລາຍການ"]}>
               {employee.map((item, index) => (
                   <tr key={index}>
                       <td>
                           {item.name}
                       </td>
                       <td>
                           <img
                               src={`https://ps.w.org/user-avatar-reloaded/assets/icon-256x256.png?rev=2540745`}
                               alt={item.name}
                               width={30}
                               height={30}  
                           />
                       </td>  
                       <td>{item.email}</td>
                       <td>{item.address}</td>
                       <td>{item.salary}</td>
                       <td>{item.category_id}</td>
                   </tr>
               ))}
           </CustomTable>
      </div>
    </div>
  );
};

export default Employee;
