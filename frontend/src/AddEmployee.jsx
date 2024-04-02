import React, { useState } from 'react'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
//const axios = require('axios');


function AddEmployee() {
    
const [data, setData] = useState({
    name:'',
    email:'',
    password:'',
    address:'',
	project: '',
    image:'',
     //DateOfJoining: '',
	// DateOfBirth: '',
    gender: '',
	role: ''
    
})
const navigate  = useNavigate()

const handelSubmit  = (event)=>{
    event.preventDefault();
    const formdata = new FormData();
    formdata.append("name", data.name);
    formdata.append("email", data.email);
    formdata.append("password", data.password);
    formdata.append("address", data.address);
    formdata.append("project", data.project);
    formdata.append("image", data.image);
    // formdata.append("Date of Joining", data.DateOfJoining);
    // formdata.append("Date of Birth", data.DateOfBirth);
    formdata.append("gender", data.gender);
	formdata.append("role", data.role);
    
    axios.post('http://localhost:8075/create',formdata)
    .then(res => {
      navigate('/employee')
    })
    .catch(err => console.log(err));

}
  return (
		<div className='d-flex flex-column align-items-center pt-4'>
			<h2>Add Employee</h2>
			<form class="row g-3 w-50" onSubmit={handelSubmit} >
			<div class="col-12">
					<label htmlFor="inputName" class="form-label">Name</label>
					<input type="text" class="form-control" id="inputName" placeholder='Enter Name' autoComplete='off'
					onChange={e => setData({...data, name: e.target.value})}/>
				</div>
				<div class="col-12">
					<label htmlFor="inputEmail4" class="form-label">Email</label>
					<input type="email" class="form-control" id="inputEmail4" placeholder='Enter Email' autoComplete='off'
					onChange={e => setData({...data, email: e.target.value})}/>
				</div>
				<div class="col-12">
					<label htmlFor="inputPassword4" class="form-label">Password</label>
					<input type="password" class="form-control" id="inputPassword4" placeholder='Enter Password'
					 onChange={e => setData({...data, password: e.target.value})}/>
				</div>
				<div class="col-12">
					<label htmlFor="inputAddress" class="form-label">Address</label>
					<input type="text" class="form-control" id="inputAddress" placeholder="1234 Main St" autoComplete='off'
					onChange={e => setData({...data, address: e.target.value})}/>
				</div>
				<div class="col-12">
					<label htmlFor="inputProject" class="form-label">Project</label>
					<input type="text" class="form-control" id="inputProject" placeholder="Enter Project Name" autoComplete='off'
					onChange={e => setData({...data, project: e.target.value})}/>
				</div>
				<div class="col-12 mb-3">
					<label class="form-label" for="inputGroupFile01">Image</label>
					<input type="file" class="form-control" id="inputGroupFile01"
					onChange={e => setData({...data, image: e.target.files[0]})}/>
				</div>
				{/* <div class="col-12">
					<label for="inputDateOfJoining" class="form-label">Date Of Joining</label>
					<input type="date" class="form-control" id="inputDateOfJoining" placeholder="" autoComplete='off'
					onChange={e => setData({...data, DateOfJoining: e.target.value})} />
				</div> */}
				{/* <div class="col-12">
					<label for="inputDateOfJoining" class="form-label">Date Of Joining</label>
					<input type="text" class="form-control" id="inputDateOfJoining" placeholder="" autoComplete='off'
					onChange={e => setData({...data, DateOfJoining: e.target.value})} />
				</div> */}
				{/* <div class="col-12">
					<label for="inputDateOfBirth" class="form-label">Date Of Birth</label>
					<input type="date" class="form-control" id="inputDateOfBirth" placeholder="" autoComplete='off'
					onChange={e => setData({...data, DateOfBirth: e.target.value})}/>
				</div> */}
				{/* <div class="col-12">
					<label for="inputDateOfBirth" class="form-label">Date Of Birth</label>
					<input type="text" class="form-control" id="inputDateOfBirth" placeholder="" autoComplete='off'
					onChange={e => setData({...data, DateOfBirth: e.target.value})}/>
				</div> */}
				<div class="col-12">
					<label htmlFor="inputGender" class="form-label">Gender</label>
					<select className='form-select' name="gender" id="inputGender">
						<option value="">Select gender</option>
						<option value="male">Male</option>
						<option value="female">Female</option>
						<option value="other">Others</option>
					</select>
					{/* <input type="text" class="form-control" id="inputGender" placeholder="" autoComplete='off'
					onChange={e => setData({...data, gender: e.target.value})} /> */}
				</div>
				<div class="col-12">
					<label htmlFor="inputRole" class="form-label">Role</label>
					<input type="text" class="form-control" id="inputRole" placeholder="" autoComplete='off'
					onChange={e => setData({...data, role: e.target.value})} />
				</div>
				

				
				<div class="col-12">
					<button type="submit" class="btn btn-primary">Create</button>
				</div>
			</form>
		</div>

 
  )
}

export default AddEmployee
