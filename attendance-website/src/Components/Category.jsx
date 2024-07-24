import React, { useEffect, useState } from "react";
import { Link,useNavigate } from "react-router-dom";
import axios from "axios";
import { IoSearchOutline } from "react-icons/io5";
import CustomTable from "./CustomTable";
import InputField from "./InputField";
import { API } from "../constants/api";
import formatDateTime from "./FormatTime";

const Category = () => {
  const navigate = useNavigate();
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState([]);
  console.log("category=====>", category);
  const token = localStorage.getItem("token");

  const fetchClasses = async () => {
    try {
      const response = await axios.get(`${API}/classes`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        params: { search },
      });

      if (response.status === 200) {
        console.log("data=====>", response.data.data);
        setCategory(response.data.data);
      } else {
        alert(response.data.Error);
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchClasses();
  }, [search]); // Fetch classes when search changes


  const handleNavigate = (item) =>{
    navigate("/category/add_category",{state:{category:item}});
  }
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
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Link
            to={"/category/add_category"}
            className="btn btn-primary p-2"
            style={{ width: "10rem" }}
          >
            ສ້າງຫ້ອງ
          </Link>
        </div>
      </div>
      <div className="mt-1">
        <CustomTable
          header={["ລະຫັດຫ້ອງ", "ຊື່ວິຊາ", "ຫ້ອງ", "ຊົ່ວໂມງ", "ວັນທີ","ຈັດການ"]}
          style={{ tableLayout: "fixed", width: "100%" }} // Set table layout and width
        >
          {category?.map((item) => {
            const dateTime = formatDateTime(item.time); // Assuming formatDateTime is a function to format the date/time
            return (
              <tr key={item._id}>
                <td style={{ width: "20%" }}>{item.class_code}</td>{" "}
                <td style={{ width: "20%" }}>{item.subject}</td>
                <td style={{ width: "15%" }}>{item.class_name}</td>
                <td style={{ width: "15%" }}>{item.class_hour}</td>
                <td style={{ width: "30%" }}>{dateTime}</td>{" "}
                <td ><button className="btn  p-1" style={{ width: "5rem",background:"#88D66C",color:"white" }} onClick={() => handleNavigate(item)}>ເປີດຄືນ</button></td>
                {/* Use dateTime here */}
              </tr>
            );
          })}
        </CustomTable>
      </div>
    </div>
  );
};

export default Category;
