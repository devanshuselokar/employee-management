import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

function Employee() {
  const [data, setData] = useState([])

  useEffect(()=> {
    axios.get('https://employee-management-backend-cmh4.onrender.com/getEmployee')
    .then(res => {
      if(res.data.Status === "Success") {
        setData(res.data.Result);
      } else {
        alert("Error")
      }
    })
    .catch(err => console.log(err));
  }, [])

  const handleDelete = (id) => {
    axios.delete('https://employee-management-backend-cmh4.onrender.com/delete/'+id)
    .then(res => {
      if(res.data.Status === "Success") {
        window.location.reload(true);
      } else {
        alert("Error")
      }
    })
    .catch(err => console.log(err));
  }

  

  return (
    <div className='px-5 py-3'>
      <div className='d-flex justify-content-center mt-2'>
        <h3>Employee List</h3>
      </div>
      <Link to="/create" className='btn btn-success'>Add Employee</Link>
      <div className='mt-3'>
        <table className='table'>
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Address</th>
              <th>Project</th>
              <th>Image</th>
              {/* <th>Date Of Joinng</th>
              <th>Date Of Birth</th> */}
              <th>Gender</th>
              <th>Role</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {data.map((employee, index) => {
              return <tr key={index}>
                  <td>{employee.name}</td>
                  <td>{employee.email}</td>
                  <td>{employee.address}</td>
                  <td>{employee.project}</td>
                  <td>{
                    <img src={`https://employee-management-backend-cmh4.onrender.com/images/`+employee.image} alt="Employee Images" className='employee_image'/>
                    }</td>
                  {/* <td>{employee.DateOfJoining}</td>
                  <td>{employee.DateOfBirth}</td> */}
                  <td>{employee.gender}</td>
                  <td>{employee.role}</td>
                  <td>
                    <Link to={`/employeeEdit/`+employee.id} className='btn btn-primary btn-sm me-2'>edit</Link>
                    <button onClick={e => handleDelete(employee.id)} className='btn btn-sm btn-danger'>delete</button>
                  </td>
              </tr>
            })}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default Employee
