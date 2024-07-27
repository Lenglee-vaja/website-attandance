import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Style.css";
import CustomTable from "./CustomTable";
import InputField from "./InputField";
import { IoSearchOutline } from "react-icons/io5";
import { API } from "../constants/api";
import LoadingPopUp from "./Loading"; // Make sure you have a LoadingPopUp component

const Employee = () => {
  const [search, setSearch] = useState("");
  const [employee, setEmployee] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const token = localStorage.getItem("token");

  const fetchEmployees = async () => {
    setIsLoading(true); // Set loading state to true before starting the fetch
    setError(null); // Reset error state
    try {
      const response = await axios.get(`${API}/students`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        params: { search },
      });

      if (response.status === 200) {
        setEmployee(response.data.data);
      } else {
        setError(response.data.Error || "An error occurred"); // Set error message
      }
    } catch (error) {
      setError("Failed to fetch employees"); // Handle fetch error
    } finally {
      setIsLoading(false); // Set loading state to false after fetch is complete
    }
  };

  useEffect(() => {
    fetchEmployees();
  }, [search]);

  return (
    <div className="px-5 mt-3">
      {isLoading && <LoadingPopUp />} {/* Show loading indicator when loading */}
      {error && <div className="alert alert-danger">{error}</div>} {/* Show error message if any */}
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
          {employee.map((item) => (
            <tr key={item._id}> {/* Use item._id as key for better uniqueness */}
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
