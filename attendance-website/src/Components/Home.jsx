import axios from "axios";
import * as XLSX from "xlsx";
import React, { useEffect, useRef, useState } from "react";
import { API } from "../constants/api";
import CustomTable from "./CustomTable";
import { formatHoursMinutes, formatDate } from "./FormatTime";
import InputField from "./InputField";
import { IoSearchOutline } from "react-icons/io5";
import { IoIosRefresh } from "react-icons/io";
import LoadingPopUp from "./Loading";
import { Chart } from "chart.js/auto";
import ChartDataLabels from "chartjs-plugin-datalabels";
import { BsPeople } from "react-icons/bs";
import { IoPersonOutline } from "react-icons/io5";
import { SiGoogleclassroom } from "react-icons/si";

const Home = () => {
  const [attendancesTotal, setAttendancesTotal] = useState(0);
  const [studentTotal, setStudentTotal] = useState(0);
  const [classRoom, setClassRoom] = useState({});
  const [students, setStudents] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const chartRef = useRef(null);
  const chartInstance = useRef(null);
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
      // classRoomData();
      studentRecords();
    }
  }, [search]);
  useEffect(() => {
    if (chartInstance.current) {
      chartInstance.current.destroy();
    }
    const myChartRef = chartRef.current.getContext("2d");
    chartInstance.current = new Chart(myChartRef, {
      type: "pie",
      data: {
        labels: ["ນັກສຶກສາທັງໝົດ", "ນັກສຶກສາຂາດ", "ນັກສຶກສາມາ"],
        datasets: [
          {
            data: [
              studentTotal,
              studentTotal - attendancesTotal,
              attendancesTotal,
            ],
            // data: [10, 20, 20],
            backgroundColor: ["#4169E1", "#FF6347", "#32CD32"],
            borderWidth: 0, // Disable the border
          },
        ],
      },
      options: {
        plugins: {
          legend: {
            display: false,
          },
          datalabels: {
            formatter: (value, ctx) => {
              // Access the data array from the chart context
              const dataArr = ctx.chart.data.datasets[0].data;

              // Find the index of the current value
              const index = ctx.dataIndex;

              // Get the value corresponding to the current index
              const currentValue = dataArr[index];

              // Return the formatted string with "ຄົນ" appended
              return `${currentValue} ຄົນ`;
            },
            color: "#fff",
            font: {
              weight: "bold",
              size: 14,
            },
          },
        },
      },
      plugins: [ChartDataLabels], // Add the plugin to the chart instance
    });
    return () => {
      if (chartInstance.current) {
        chartInstance.current.destroy();
      }
    };
  }, [studentTotal, attendancesTotal]);

  const getClassList = async () => {
    try {
      setIsLoading(true);
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
    } finally {
      setIsLoading(false);
    }
  };

  //ດຶງລາຍລະອຽດການເຂົ້າຮຽນທັງຂາດ ເເລະ ມາຮຽນ
  const studentRecords = () => {
    setIsLoading(true);
    axios
      .get(`${API}/attendances?search=${search}`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      })
      .then((result) => {
        if (result.status === 200) {
          console.log("attendances=====>", result.data.data);
          setStudents(result.data.data);
          setIsLoading(false);
        } else {
          alert(result.data.Error);
        }
      });
  };

  //ນັບຈຳນວນນັກສຶກສາທີ່ເຂົ້າຮຽນ
  const attendancesCount = () => {
    setIsLoading(true);
    axios
      .get(`${API}/attendance/count?search=${search}`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      })
      .then((result) => {
        if (result.status === 200) {
          setAttendancesTotal(result.data.data);
          setIsLoading(false);
        }
      });
  };

  //ນັບຈຳນວນນັກສຶກສາທັງໝົດຕາມເເຕ່ລະຫ້ອງ
  const studentCount = () => {
    setIsLoading(true);
    axios
      .get(`${API}/class/${search}`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      })
      .then((result) => {
        if (result.status === 200) {
          // Update the state with the class data
          setClassRoom(result.data.data);

          // Extract class name from result data
          const className = result.data.data.class_name;

          // Make the second request once the classRoom state has been updated
          return axios.get(`${API}/student/count?search=${className}`, {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          });
        } else {
          alert(result.data.Error);
        }
      })
      .then((result) => {
        if (result && result.status === 200) {
          setStudentTotal(result.data.data);
          setIsLoading(false);
        }
      })
      .catch((error) => {
        console.error("Error fetching student count data:", error);
        alert("An error occurred while fetching student data.");
      });
  };

  const handleSearch = () => {
    attendancesCount();
    studentCount();
    // classRoomData();
    studentRecords();
  };
  const handleExportToExcel = (data) => {
    if (!data) return alert("No data to export");
    console.log("data=====>", data);
    const excelData = data?.map((item) => [
      item?.student_code,
      item?.fullname,
      item?.phone,
      item?.class_name,
      formatHoursMinutes(item?.time),
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
      {isLoading && <LoadingPopUp />}
      <div style={{ display: "flex", gap: "10px", alignItems: "center" }}>
        <div className="search-box" style={{ width: "20rem" }}>
          <InputField
            label={"ຄົ້ນຫາດ້ວຍລະຫັດຫ້ອງ"}
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
            onMouseEnter={(e) =>
              (e.currentTarget.style.background = "rgb(220, 220, 220)")
            }
            onMouseLeave={(e) => (e.currentTarget.style.background = "#ffffff")}
          >
            <IoIosRefresh size={30} color="rgb(1,96,210)" />
          </button>
        </div>
      </div>

      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          width: "100%",
          marginTop: "2rem",
        }}
      >
        <div
          style={{
            width: "40%",
            height: "200px",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            // backgroundColor: "#DCDCDC",
          }}
        >
          <canvas
            ref={chartRef}
            // style={{ width: "50px", height: "20px" }}
          ></canvas>
        </div>
        <div style={{ width: "60%", display: "flex", flexDirection: "column" }}>
          <h3 style={{ textAlign: "center" }}>
            ລາຍງານຂໍ້ມູນການເຂົ້າຮຽນຂອງນັກສຶກສາ
          </h3>
          <div
            style={{
              display: "flex",
              gap: "5rem",
              marginTop: "1rem",
              marginLeft: "2rem",
            }}
          >
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
                gap: "0.5rem",
              }}
            >
              <span>
                <BsPeople
                  size={50}
                  className="icon"
                  style={{ color: "var(--main-color)" }}
                />
              </span>
              <div>{studentTotal}</div>
              <div>ນັກສຶກສາທັງໝົດ</div>
            </div>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
                gap: "0.5rem",
              }}
            >
              <span>
                <IoPersonOutline
                  size={50}
                  className="icon"
                  style={{ color: "green" }}
                />
              </span>
              <div>{attendancesTotal}</div>
              <div>ນັກສຶກສາເຂົ້າຮຽນ</div>
            </div>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
                gap: "0.5rem",
              }}
            >
              <span>
                <IoPersonOutline
                  size={50}
                  className="icon"
                  style={{ color: "#FF6347" }}
                />
              </span>
              <div>{studentTotal - attendancesTotal}</div>
              <div>ນັກສຶກສາຂາດຮຽນ</div>
            </div>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
                gap: "0.5rem",
              }}
            >
              <span>
                <SiGoogleclassroom
                  size={50}
                  className="icon"
                  style={{ color: "#808080" }}
                />
              </span>
              <div>{classRoom?.class_name}</div>
              <div>ຊື່ຫ້ອງຮຽນ</div>
            </div>
          </div>
        </div>
        {/* <div className="p-3 d-flex justify-content-around mt-3">
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
            <div style={{ display: "flex", gap: "3rem" }}>
              <h5>ຊື່ຫ້ອງ:</h5>
              <h5>{classRoom?.class_name}</h5>
            </div>
          </div>
        </div> */}
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
          <div
            style={{
              width: "80%",
              display: "flex",
              alignItems: "center",
              gap: "2rem",
            }}
          >
            <div>
              <h3>ຂໍ້ມູນນັກສຶກສາທີ່ເຂົ້າຮຽນ</h3>
            </div>
            {/* <div style={{ width: "10rem",marginTop:'-1rem' }}>
              <SelectDropDown
                label="ນັກສຶກສາ"
                value={""} //your state
                options={["ມາຮຽນ", "ຂາດຮຽນ"]}
                //  onChange={(e) => setClassName(e.target.value)}
                placeholder={"ເລືອກນັກສຶກສາ"}
              />
            </div>
            <div style={{ width: "10rem" }}>
              <InputField
                label={"ເວລາ"}
                id="name"
                value={time} //your state
                type={"time"}
                name={"name"}
                placeholder={"ປ້ອນນັກສືກສາ ..."}
                 onChange={(e) => setTime(e.target.value)}
              />
            </div> */}
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
              "ເວລາ",
              "ວັນທີ",
            ]}
            style={{ tableLayout: "fixed", width: "100%" }}
          >
            {students?.map((item, index) => {
              const dateTime = formatHoursMinutes(item.time);
              const date = formatDate(item.time);
              return (
                <tr key={index}>
                  <td style={{ width: "20%" }}>{item.student_code}</td>
                  <td style={{ width: "20%" }}>{item.fullname}</td>
                  <td style={{ width: "15%" }}>{item.phone}</td>
                  <td style={{ width: "15%" }}>{item.class_name}</td>
                  <td style={{ width: "15%" }}>{dateTime}</td>
                  <td style={{ width: "30%" }}>{date}</td>
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
