// const React = require('react');
// const Login = require('./Login');
// const {BrowserRouter, Routes, Route} = require('react-router-dom');
// const Dashboard = require('./Dashboard');
// const Employee = require('./Employee');
// const Profile = require('./Profile');
// const Home = require('./Home');
// const AddEmployee = require('./AddEmployee');
// const EmployeeEdit = require('./EmployeeEdit');

import React, { startTransition } from "react"
import Login from "./Login"
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import Dashboard from "./Dashboard"
import Employee from "./Employee"
import Profile from "./Project"
import Home from "./Home"
import AddEmployee from "./AddEmployee"
import EmployeeEdit from "./EmployeeEdit"
import Start from "./Start"
import EmployeeDetail from "./EmployeeDetail"
import EmployeeLogin from "./EmployeeLogin"


function App() {
  return (
    <BrowserRouter>
  <Routes>
    <Route path='/' element={<Dashboard />}>
      <Route path='' element={<Home />}></Route>
      <Route path='/employee' element={<Employee />}></Route>
      <Route path='/profile' element={<Profile />}></Route>
      <Route path='/create' element={<AddEmployee />}></Route>
      <Route path='/employeeEdit/:id' element={<EmployeeEdit />}></Route>
    </Route>
    <Route path='/login' element={<Login />}></Route>
    <Route path='/start' element={<Start />}></Route>
    <Route path='/employeeLogin' element={<EmployeeLogin />}></Route>
    <Route path='/employeedetail/:id' element={<EmployeeDetail />}></Route>
  </Routes>
 </BrowserRouter>
  )
}
export default App
