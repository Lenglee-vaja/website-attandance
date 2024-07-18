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
import PrivateRoute from "./Components/PrivateRoute";
import Manual from "./Components/Manual";
import UserProfile from "./Components/UserProfile";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout><Main /></Layout>} />
        <Route path="/detect/:id" element={<Layout><Detect /></Layout>} />
        {/* <Route path="/detect/:classCode" element={
          <PrivateRoute allowedRoles={["student"]} component={() => <Layout><Detect /></Layout>} />
        } /> */}
        <Route path="/manual" element={<Layout><Manual /></Layout>} />
        <Route path="/about" element={<Layout><About /></Layout>} />
        <Route path="/tool" element={<Layout><Tool /></Layout>} />
        <Route path="/userprofile" element={<Layout><UserProfile/></Layout>} />
        <Route path="/login" element={<Login />} />
        <Route path="/frame" element={<Frame />} />
        
        <Route path="/dashboard" element={
          <PrivateRoute allowedRoles={["teacher"]} component={() => <Dashboard><Home /></Dashboard>} />
        } />

        <Route path="/employee" element={
          <PrivateRoute allowedRoles={["teacher"]} component={() => <Dashboard><Employee /></Dashboard>} />
        } />
        
        <Route path="/employee/add_employee" element={
          <PrivateRoute allowedRoles={["teacher"]} component={() => <Dashboard><AddEmployee/></Dashboard>} />
        } />
        
        <Route path="/employee/edit_employee/:id" element={
          <PrivateRoute allowedRoles={["teacher"]} component={() => <Dashboard><EditEmployee/></Dashboard>} />
        } />
        
        <Route path="/category" element={
          <PrivateRoute allowedRoles={["teacher"]} component={() => <Dashboard><Category /></Dashboard>} />
        } />
        
        <Route path="/category/add_category" element={
          <PrivateRoute allowedRoles={["teacher"]} component={() => <Dashboard><AddCategory/></Dashboard>} />
        } />
        
        <Route path="/profile" element={
          <PrivateRoute allowedRoles={["teacher"]} component={() => <Dashboard><Profile/></Dashboard>} />
        } />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
