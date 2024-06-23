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
import About from "./Components/About";
import Tool from "./Components/Tool";
import Detect from "./Components/Detect";
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout><Main /></Layout>} />
        <Route path="/detect" element={<Layout><Detect /></Layout>} />
        <Route path="/about" element={<Layout><About /></Layout>} />
        <Route path="/tool" element={<Layout><Tool /></Layout>} />

        {/* <Route path="/register" element={<Layout><Register/></Layout>} /> */}
        <Route path="/login" element={<Login />}></Route>
        <Route path="/frame" element={<Frame />}></Route>
         <Route path="/dashboard" element={<Dashboard><Home /></Dashboard>} />
         <Route path="/employee" element={<Dashboard><Employee /></Dashboard>} />
         <Route path="/employee/add_employee" element={<Dashboard><AddEmployee/></Dashboard>} />
         <Route path="/employee/edit_employee/:id" element={<Dashboard><EditEmployee/></Dashboard>} />
         <Route path="/category" element={<Dashboard><Category /></Dashboard>} />
         <Route path="/category/add_category" element={<Dashboard><AddCategory/></Dashboard>} />
         <Route path="/profile" element={<Dashboard><Profile/></Dashboard>} />
        
         
      </Routes>
    </BrowserRouter>
  );
}

export default App;
