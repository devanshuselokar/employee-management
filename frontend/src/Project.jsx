import React from 'react'
import './ProjectDetails.css';

const Project = ({ project }) => {
  return (
    <div className="project-details">
    <h1>Project Details</h1>
    <p><strong>Title:</strong> Coach Management System</p>
    <p><strong>Description:</strong> 
A Coach Management System is a software application or platform designed to streamline and enhance the management of coaching services, whether it's for sports, business, personal development, or any other field. This system assists in automating administrative tasks, facilitating communication, and organizing various aspects related to coaching</p>
    <p><strong>Owner:</strong> Jay Shah</p>
    <p><strong>Start Date:</strong> 17-01-2023 </p>
    <p><strong>End Date:</strong> 20-12-2023</p>
    </div>
  )
}

export default Project
