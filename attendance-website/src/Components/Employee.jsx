import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Style.css";
import CustomTable from "./CustomTable";
import InputField from "./InputField";
import { IoSearchOutline } from "react-icons/io5";
import { API } from "../constants/api";

const Employee = () => {
  const [search, setSearch] = useState("");
  const [employee, setEmployee] = useState([]);
  const token = localStorage.getItem("token");
  const fetchClasses = async () => {
    try {
      const response = await axios.get(`${API}/students`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        params: { search },
      });

      if (response.status === 200) {
        console.log("data=====>", response.data.data);
        setEmployee(response.data.data);
      } else {
        alert(response.data.Error);
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchClasses();
  }, [search]);
  return (
    <div className="px-5 mt-3">
      <div className="d-flex justify-content-between align-content-center">
        <div className="mt-10" style={{ width: "20rem" }}>
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
      </div>
      <div className="mt-3">
        <CustomTable
          header={["ລະຫັດນັກສືກສາ", "ຊື່ ເເລະ ນາມສະກຸນ", "ເບີໂທ", "ຫ້ອງ"]}
          style={{ tableLayout: "fixed", width: "100%" }}
        >
          {employee.map((item, index) => (
            <tr key={index}>
              <td style={{ width: "20%" }}>{item.student_code}</td>
              <td style={{ width: "20%" }}>{item.fullname}</td>
              <td style={{ width: "20%" }}>{item.phone}</td>
              <td style={{ width: "20%" }}>{item.class_name}</td>
            </tr>
          ))}
        </CustomTable>
      </div>
    </div>
  );
};

export default Employee;
