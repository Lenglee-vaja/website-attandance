import axios from "axios";
import * as XLSX from "xlsx";
import React, { useEffect, useState } from "react";
import { API } from "../constants/api";
import CustomTable from "./CustomTable";
import formatDateTime from "./FormatTime";
import InputField from "./InputField";
import { IoSearchOutline } from "react-icons/io5";
import { IoIosRefresh } from "react-icons/io";
import SelectDropDown from "./SelectDropDown";

const Home = () => {
  const [attendancesTotal, setAttendancesTotal] = useState(0);
  const [studentTotal, setStudentTotal] = useState(0);
  const [classRoom, setClassRoom] = useState({});
  const [students, setStudents] = useState([]);
  // const [classList, setClassList] = useState([]);
  const [search, setSearch] = useState("");
  console.log("search =====++>", search);
  const token = localStorage.getItem("token");
  useEffect(() => {
    getClassList();
  }, []);

  useEffect(() => {
    if (search) {
      attendancesCount();
      studentCount();
      classRoomData();
      studentRecords();
    }
  }, [search]);

  const getClassList = async () => {
    try {
      const reponse = await axios.get(`${API}/classes`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      if (reponse.status === 200) {
        const initailClass = reponse.data.data[0].class_code;
        setSearch(initailClass);
      }
    } catch (error) {
      console.log(error);
    }
  };
  const studentRecords = () => {
    axios
      .get(`${API}/attendances`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      })
      .then((result) => {
        console.log("result student data=========+>", result);
        if (result.status === 200) {
          setStudents(result.data.data);
        } else {
          alert(result.data.Error);
        }
      });
  };
  const attendancesCount = () => {
    axios
      .get(`${API}/attendance/count?search=${search}`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      })
      .then((result) => {
        console.log("result attendances data=========+>", result);
        if (result.status === 200) {
          setAttendancesTotal(result.data.data);
        }
      });
  };
  const studentCount = () => {
    axios
      .get(`${API}/student/count?search=${search}`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      })
      .then((result) => {
        console.log("result student count data=========+>", result);
        if (result.status === 200) {
          setStudentTotal(result.data.data);
        }
      });
  };
  const classRoomData = () => {
    axios
      .get(`${API}/class/${search}`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      })
      .then((result) => {
        console.log("result class data=========+>", result);
        if (result.status === 200) {
          setClassRoom(result.data.data);
        } else {
          alert(result.data.Error);
        }
      });
  };
  // const handleKeyDown = async (e) => {
  //   if (e.key === 'Enter') {
  //     e.preventDefault();
  //     try {
  //       console.log("search data ==========>", search)
  //     } catch (error) {
  //       console.error('Error sending search query:', error);
  //     }
  //   }
  // }
  const handleSearch = () => {
    console.log("search data ==========>", search);
  };
  const handleExportToExcel = (data) => {
    if (!data) return alert("No data to export");
    console.log("data=====>", data);
    const excelData = data?.map((item) => [
      item?.student_code,
      item?.fullname,
      item?.phone,
      item?.class_name,
      formatDateTime(item?.time),
    ]);
    const header = [
      "ລະຫັດນັກສືກສາ",
      "ຊື່ ເເລະ ນາມສະກຸນ",
      "ເບີໂທ",
      "ຫ້ອງ",
      "ເວລາເຂົ້າຮຽນ",
    ];
    const workbook = XLSX.utils.book_new();
    const worksheet = XLSX.utils.aoa_to_sheet([header, ...excelData]);
    XLSX.utils.book_append_sheet(workbook, worksheet, "ຈໍານວນນັກສືກສາ");
    XLSX.writeFile(workbook, "ຈໍານວນນັກສືກສາ.xlsx");
  };
  return (
    <div>
      <div style={{ display: "flex", gap: "10px", alignItems: "center" }}>
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
        <div
          style={{ display: "flex", alignItems: "end", marginTop: "1.4rem" }}
        >
          <button
            style={{
              border: "none",
              background: "none",
              padding: "5px",
              cursor: "pointer",
            }}
            onClick={handleSearch}
          >
            <IoIosRefresh size={30} color="rgb(1,96,210)" />
          </button>
        </div>
      </div>
      <div className="p-3 d-flex justify-content-around mt-3">
        <div className="px-3 pt-2 pb-3 border shadow-sm w-25">
          <div className="text-center pb-1">
            <h4>ນັກສຶກສາທັງໝົດ</h4>
          </div>
          <hr />
          <div className="d-flex justify-content-between">
            <h5>ຈຳນວນ:</h5>
            <h5>{studentTotal}</h5>
            <h5>ຄົນ</h5>
          </div>
        </div>
        <div className="px-3 pt-2 pb-3 border shadow-sm w-25">
          <div className="text-center pb-1">
            <h4>ນັກສືກສາທີ່ເຂົ້າຮຽນ</h4>
          </div>
          <hr />
          <div className="d-flex justify-content-between">
            <h5>ຈຳນວນ:</h5>
            <h5>{attendancesTotal}</h5>
            <h5>ຄົນ</h5>
          </div>
        </div>
        <div className="px-3 pt-2 pb-3 border shadow-sm w-25">
          <div className="text-center pb-1">
            <h4>ຫ້ອງຮຽນ</h4>
          </div>
          <hr />
          <div className="d-flex justify-content-between">
            <h5>ຊື່ຫ້ອງ:</h5>
            <h5>{classRoom.class_name}</h5>
          </div>
        </div>
      </div>
      <div className="mt-4 px-5 pt-3">
        <div
          style={{
            width: "100%",
            padding: "10px",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <div style={{ width: "80%", display: "flex", alignItems: "center",gap:'2rem' }}>
            <div>
              <h3>ລາຍການນັກສືກສາ</h3>
            </div>
            <div style={{ width: "10rem",marginTop:'-1rem' }}>
              <SelectDropDown
                label="ຫ້ອງຮຽນ"
                value={""} //your state
                options={["ມາຮຽນ", "ຂາດຮຽນ"]}
                //  onChange={(e) => setClassName(e.target.value)}
                placeholder={"ເລືອກຫ້ອງຮຽນ"}
              />
            </div>
            <div style={{ width: "10rem" }}>
              <InputField
                label={"ເວລາ"}
                id="name"
                value={search} //your state
                type={"time"}
                name={"name"}
                placeholder={"ປ້ອນນັກສືກສາ ..."}
                //  onChange={(e) => setSearch(e.target.value)}
              />
            </div>
          </div>
          <div>
            <button
              className="btn btn-success p-2"
              onClick={() => handleExportToExcel(students)}
            >
              Excel export
            </button>
          </div>
        </div>
        <div className="mt-3">
          <CustomTable
            header={[
              "ລະຫັດນັກສືກສາ",
              "ຊື່ ເເລະ ນາມສະກຸນ",
              "ເບີໂທ",
              "ຫ້ອງ",
              "ເວລາເຂົ້າຮຽນ",
            ]}
            style={{ tableLayout: "fixed", width: "100%" }}
          >
            {students?.map((item, index) => {
              const dateTime = formatDateTime(item.time);
              return (
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
  );
};

export default Home;
