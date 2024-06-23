import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import SelectDropDown from "./SelectDropDown";
import InputField from "./InputField";

const AddCategory = () => {
  const [subject, setSubject] = useState();
  const [className, setClassName] = useState();

  //     const [category, setCategory] = useState()
  //     const navigate = useNavigate()
  //     const handleSubmit = (e) =>{
  //         e.preventDefault()
  //         axios.post("http://localhost:3000/category", {category})
  //         .then(result=>{
  //             if(result.data.status){
  //                 navigate('/dashboard/category')
  //             }else{
  //                 alert(result.data.Error)
  //             }
  //         })
  //         .catch(err=>console.log(err))
  //     }
  //   return (
  //     <div className='d-flex justify-content-center align-items-center h-75'>
  //         <div className='p-3 rounded-3 w-25 border'>
  //             <h2>Add Category</h2>
  //             <form onSubmit={handleSubmit}>
  //                 <div className='mb-3'>
  //                     <label htmlFor="category"><strong>Category:</strong></label>
  //                     <input type="text" name="category" placeholder ="Enter Category"
  //                     onChange={(e) => setCategory(e.target.value)} className='form-control rounded-0'/>
  //                 </div>
  //                 <button className='btn btn-success w-100 rounded-0 mb-2'>Add Category</button>
  //             </form>
  //         </div>
  //     </div>
  //   )
  const [_class, set_Class] = useState({
    classCode: "",
    subject: "",
    classHour: "",
    category_id: "",
  });
  const [category, setCategory] = useState([]);
  const classHours = [
    {
      name: "ຊົ່ວໂມງ 1",
    },
    {
      name: "ຊົ່ວໂມງ 2",
    },
    {
      name: "ຊົ່ວໂມງ 3",
    },
    {
      name: "ຊົ່ວໂມງ 4",
    },
  ];
  const navigate = useNavigate();
  useEffect(() => {
    axios
      .get("http://localhost:3000/category")
      .then((result) => {
        if (result.data.status) {
          setCategory(result.data.result);
        } else {
          alert(result.data.Error);
        }
      })
      .catch((err) => console.log(err));
  }, []);
  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("classCode", _class.classCode);
    formData.append("subject", _class.subject);
    formData.append("classHour", _class.classHour);
    formData.append("category_id", _class.category_id);

    axios
      .post("http://localhost:3000/auth/add_employee", formData)
      .then((result) => {
        if (result.data.Status) {
          navigate("/dashboard/employee");
        } else {
          alert(result.data.Error);
        }
      })
      .catch((err) => console.log(err));
  };
  return (
    <div className="d-flex justify-content-center align-items-center" style={{height:"100vh"}}>
      <div className="login-form"  style={{padding:"50px"}}>
        <h3 className="text-center">ສ້າງຫ້ອງຮຽນ</h3>
        <form className="row g-1 " onSubmit={handleSubmit}>
          <div className="col-12 mt-3">
            <SelectDropDown 
             label="ຫ້ອງຮຽນ"
             options={["CPR", "CW", "CS"]}
             onChange={(e) => setClassName(e.target.value)}
             placeholder={"1CS1"}
             />
          </div>
           <div className="col-12 mt-3">
           <InputField 
              label="ຊື່ຫ້ອງຮຽນ"
              type="text"
              value={subject}
              name="subject"
              onChange={(e) => setSubject(e.target.value)}
            />
           </div>
          <div className="col-12">
            <div className='font-family: "Phetsarath_OT"'>
              <label htmlFor="classHour" className="form-label" style={{fontWeight:"bold"}}>
                ຊົ່ວໂມງຮຽນ
              </label>
              <div className="d-flex justify-content-between">
                {classHours.map((c) => {
                  console.log("c======>", c);
                  return (
                    <div key={c.id} className="form-check form-check-inline">
                      <input
                        className="form-check-input"
                        type="radio"
                        name="classHour"
                        id={`classHour_${c.id}`}
                        value={c.id}
                        onChange={(e) =>
                          set_Class({ ..._class, category_id: e.target.value })
                        }
                      />
                      <label
                        className="form-check-label "
                        htmlFor={`classHour_${c.id}`}
                      >
                        {c.name}
                      </label>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          <div className="col-12 mt-5">
            <button type="submit" className="btn btn-primary w-100 p-2">
              ເພີ່ມ
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddCategory;
