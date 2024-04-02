import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import axios from 'axios';

function EmployeeDetail() {
    const {id} = useParams();
    const navigate = useNavigate()
    const[employee, setEmployee] = useState([])
    useEffect(() => {
        axios.get('http://localhost:8075/get/'+id)
        .then(res => setEmployee ( res.data.Result[0]))
        .catch(err => console.log(err));
    })
    const handleLogout = () => {
		axios.get('http://localhost:8075/logout')
		.then(res => {
			navigate('/start')
		}).catch(err => console.log(err));
	}

  return (
    
          <div>
        <div className='d-flex justify-content-center flex-column align-items-center mt-3'>
            <img src={`http://localhost:8075/images/`+employee.image} alt="" className='empImg'/>
            <div className='d-flex align-items-center flex-column mt-5'>
                <h3>Name: {employee.name}</h3>
                <h3>Email: {employee.email}</h3>
                <h3>Project: {employee.project}</h3>
                <h3>Gender: {employee.Gender}</h3>
                {/* <h3>Date of joining: {employee.DateOfJoining}</h3>
                <h3>Date of Birth: {employee.DateOfBirth}</h3> */}
                <h3>Role: {employee.role}</h3>
                
                
                

            </div>
            <div>
                <button className='btn btn-primary me-2'>Edit</button>
                <button className='btn btn-danger' onClick={handleLogout}>Logout</button>
            </div>
        </div>
    </div>
    
  )
}

export default EmployeeDetail
