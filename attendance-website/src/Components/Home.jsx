import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { API } from '../constants/api'
import CustomTable from "./CustomTable";
import formatDateTime from './FormatTime';
import InputField from "./InputField";
import { IoSearchOutline } from "react-icons/io5";


const Home = () => {
  const [attendancesTotal, setAttendancesTotal] = useState(0)
  const [studentTotal, setStudentTotal] = useState(0)
  const [classRoom, setClassRoom] = useState({})
  const [students, setStudents] = useState([])
  const [search, setSearch] = useState("");
  console.log("search =====++>", search)
  const token = localStorage.getItem("token");

  useEffect(() => {
    attendancesCount();
    studentCount();
    classRoomData();
    studentRecords();
  }, [])

  const studentRecords = () => {
    axios.get(`${API}/attendances`,{
      headers:{
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`
      }
    })
    .then(result => {
      console.log("result student data=========+>", result)
      if(result.status === 200) {
        setStudents(result.data.data)
      } else {
         alert(result.data.Error)
      }
    })
  }
  const attendancesCount = () => {
    axios.get(`${API}/attendance/count`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    })
    .then(result => {
      console.log("result attendances data=========+>", result)
      if(result.status === 200) {
        setAttendancesTotal(result.data.data)
      }
    })
  }
  const studentCount = () => {
    axios.get(`${API}/student/count`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    })
    .then(result => {
      console.log("result student count data=========+>", result)
      if(result.status === 200) {
        setStudentTotal(result.data.data)
      }
    })
  }
  const classRoomData = () => {
    axios.get(`${API}/class/FNS6303340`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      }
    })
    .then(result => {
      console.log("result class data=========+>", result)
      if(result.status === 200) {
        setClassRoom(result.data.data)
      } else {
        alert(result.data.Error)
      }
    })
  }
  const handleKeyDown = async (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      try {
        console.log("search data ==========>", search)
      } catch (error) {
        console.error('Error sending search query:', error);
      }
    }
  }
  return (
    <div>
      <div className="search-box" style={{ width: "20rem" }}>
          <InputField
            label={"ຄົ້ນຫາ"}
            id="name"
            value={search}
            type={"text"}
            name={"name"}
            placeholder={"ປ້ອນລະຫ້ອງຮຽນ ..."}
            icon={<IoSearchOutline />}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
      <div className='p-3 d-flex justify-content-around mt-3'>
        <div className='px-3 pt-2 pb-3 border shadow-sm w-25'>
          <div className='text-center pb-1'>
            <h4>ນັກສຶກສາທັງໝົດ</h4>
          </div>
          <hr />
          <div className='d-flex justify-content-between'>
            <h5>ຈຳນວນ:</h5>
            <h5>{studentTotal}</h5>
            <h5>ຄົນ</h5>
          </div>
        </div>
        <div className='px-3 pt-2 pb-3 border shadow-sm w-25'>
          <div className='text-center pb-1'>
            <h4>ນັກສືກສາທີ່ເຂົ້າຮຽນ</h4>
          </div>
          <hr />
          <div className='d-flex justify-content-between'>
            <h5>ຈຳນວນ:</h5>
            <h5>{attendancesTotal}</h5>
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
            <h5>{classRoom.class_name}</h5>
          </div>
        </div>
      </div>
      <div className='mt-4 px-5 pt-3'>
        <h3>ລາຍການນັກສືກສາ</h3>
        <div className="mt-3">
        <CustomTable
          header={["ລະຫັດນັກສືກສາ", "ຊື່ ເເລະ ນາມສະກຸນ", "ເບີໂທ", "ຫ້ອງ", "ເວລາເຂົ້າຮຽນ"]}
          style={{ tableLayout: "fixed", width: "100%" }}
        >
          {students?.map((item, index) => {
            const dateTime = formatDateTime(item.time);
            return(
              <tr key={index}>
              <td style={{ width: "20%" }}>{item.student_code}</td>
              <td style={{ width: "20%" }}>{item.fullname}</td>
              <td style={{ width: "20%" }}>{item.phone}</td>
              <td style={{ width: "20%" }}>{item.class_name}</td>
              <td style={{ width: "20%" }}>{dateTime}</td>
            </tr>
             );
          })}
        </CustomTable>
      </div>
      </div>
    </div>
  )
}

export default Home