import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./Components/Login";
import Dashboard from "./Components/Dashboard";
import Home from "./Components/Home";
import Employee from "./Components/Employee";
import Category from "./Components/Category";
import Profile from "./Components/Profile";
import AddCategory from "./Components/AddCategory";
import AddEmployee from "./Components/AddEmployee";
import EditEmployee from "./Components/EditEmployee";
import Frame from "./Components/Frame";
import Layout from "./Components/Layout";
import Main from "./Components/Main";
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout><Main /></Layout>} />
        {/* <Route path="/register" element={<Layout><Register/></Layout>} /> */}
        <Route path="/login" element={<Login />}></Route>
        <Route path="/frame" element={<Frame />}></Route>
        <Route path="/dashboard" element={<Dashboard />}>
          <Route path="" element={<Home />}></Route>
          <Route path="/dashboard/employee" element={<Employee />}></Route>
          <Route path="/dashboard/add_employee" element={<AddEmployee />}></Route>
          <Route path='/dashboard/edit_employee/:id' element={<EditEmployee />}></Route>
          <Route path="/dashboard/category" element={<Category />}></Route>
          <Route path="/dashboard/add_category" element={<AddCategory />}></Route>
          <Route path="/dashboard/profile" element={<Profile />}></Route>
        </Route>
         
      </Routes>
    </BrowserRouter>
  );
}

export default App;
