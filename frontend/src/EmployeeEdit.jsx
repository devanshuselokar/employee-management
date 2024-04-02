import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';

function EmployeeEdit() {
	const [data, setData] = useState({
		name: '',
		email: '',
		address: '',
		project: '',
		Gender: '',
		// DateOfJoining: '',
		// DateOfBirth: '',
		Gender:'',
		role: '',	
	})
	const navigate = useNavigate()
	
	const {id} = useParams();

	useEffect(()=> {
		axios.get('http://localhost:8075/get/'+id)
		.then(res => {
			setData({...data, name: res.data.Result[0].name,
				email: res.data.Result[0].email,
				address: res.data.Result[0].address,
				project: res.data.Result[0].project,
				// DateOfJoining: res.data.Result[0].DateOfJoining,
				// DateOfBirth: res.data.Result[0].DateOfBirth,
				Gender: res.data.Result[0].Gender,
				role: res.data.Result[0].role,
				
			})
		})
		.catch(err =>console.log(err));
	}, [])

	const handleSubmit = (event) => {
		event.preventDefault();
		axios.put('http://localhost:8075/update/'+id, data)
		.then(res => {
			if(res.data.Status === "Success") {
				navigate('/employee')
			}
		})
		.catch(err => console.log(err));
	}
  return (
    <div className='d-flex flex-column align-items-center pt-4'>
			<h2>Update Employee</h2>
			<form class="row g-3 w-50" onSubmit={handleSubmit}>
			<div class="col-12">
					<label for="inputName" class="form-label">Name</label>
					<input type="text" class="form-control" id="inputName" placeholder='Enter Name' autoComplete='off'
					onChange={e => setData({...data, name: e.target.value})} value={data.name}/>
				</div>
				<div class="col-12">
					<label for="inputEmail4" class="form-label">Email</label>
					<input type="email" class="form-control" id="inputEmail4" placeholder='Enter Email' autoComplete='off'
					onChange={e => setData({...data, email: e.target.value})} value={data.email}/>
				</div>
				<div class="col-12">
					<label for="inputAddress" class="form-label">Address</label>
					<input type="text" class="form-control" id="inputAddress" placeholder="1234 Main St" autoComplete='off'
					onChange={e => setData({...data, address: e.target.value})} value={data.address}/>
				</div>
				<div class="col-12">
					<label for="inputproject" class="form-label">Project</label>
					<input type="text" class="form-control" id="inputSalary" placeholder="Enter project name" autoComplete='off'
					onChange={e => setData({...data, project: e.target.value})} value={data.project}/>
				</div>
				{/* <div class="col-12">
					<label for="inputDateOfJoining" class="form-label">Date Of Joining</label>
					<input type="date" class="form-control" id="inputDateOfJoining" placeholder="" autoComplete='off'
					onChange={e => setData({...data, DateOfJoining: e.target.value})} value={data.DateOfJoining}/>
				</div> */}
				{/* <div class="col-12">
					<label for="inputDateOfJoining" class="form-label">Date Of Joining</label>
					<input type="date" class="form-control" id="inputDateOfJoining" placeholder="" autoComplete='off'
					onChange={e => setData({...data, DateOfJoining: e.target.value})} value={data.DateOfJoining}/>
				</div> */}
				

				{/* <div class="col-12">
					<label for="inputDateOfBirth" class="form-label">Date Of Birth</label>
					<input type="date"  class="form-control" id="inputDateOfBirth" placeholder="" autoComplete='off'
					 onChange={e => setData({...data, DateOfBirth: e.target.value})} value= {data.DateOfBirth}/>   
					  "<?php echo $newdate = date('Y-m-d',strtotime{$DateOfBirth}); ?>" 
				</div> */}
				{/* <div class="col-12">
					<label for="inputDateOfBirth" class="form-label">Date Of Birth</label>
					<input type="text"  class="form-control" id="inputDateOfBirth" placeholder="" autoComplete='off'
					 onChange={e => setData({...data, DateOfBirth: e.target.value})} value= {data.DateOfBirth}/>   
					  "<?php echo $newdate = date('Y-m-d',strtotime{$DateOfBirth}); ?>" 
				</div> */}
				<div class="col-12">
					<label for="inputGender" class="form-label">Gender</label>
					<input type="text" class="form-control" id="inputGender" placeholder="" autoComplete='off'
					onChange={e => setData({...data, gender: e.target.value})} value={data.gender}/>
				</div>
				<div class="col-12">
					<label for="inputRole" class="form-label">Role</label>
					<input type="text" class="form-control" id="inputRole" placeholder="" autoComplete='off'
					onChange={e => setData({...data, role: e.target.value})} value={data.role}/>
				</div>
				
				

				<div class="col-12">
					<button type="submit" class="btn btn-primary">Update</button>
				</div>
			</form>
		</div>
  )
}

export default EmployeeEdit