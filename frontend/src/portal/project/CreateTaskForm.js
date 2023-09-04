import React, { useState } from 'react'
// import { Form } from 'react-router-dom'
import api from '../../api';
import { useParams } from 'react-router-dom';

import "./CreateTaskForm.css"

const CreateTaskForm = () => {
    const { projectId } = useParams();
    const [name,setName] = useState("");
    const [description,setDescription] = useState("");
    const [deadline,setDeadline] = useState("");
    const [assigned_to,setAssigned_to] = useState("");
    const [userName,setUserName] = useState("");

    const handleSubmit = async(e) =>{
        e.preventDefault();
        try {

            // const response = await api.get(`/user/getUserId/${userName}`);
            // console.log(response.data);

            const res = await api.post(`/projects/${projectId}`, {
                "name": name,
                "description": description,
                "deadline": deadline,
                "assigned_to": userName
            })
            if(res.status === 201){
                // console.log(res.data);
                alert("the Task is Created!!")
            }
        } catch (error) {
            alert(error);
            console.log(error);
        }
        
    }



  return (
    <>
        <div className='form-heading'>
            Create Task Form
        </div>
        <div className='grid-body'>
            <div className='form-div'>
                <form onSubmit={handleSubmit}>
                    <label htmlFor='task-name'>name of task: </label>
                    <input id='task-name' required onChange={(e) => setName(e.target.value)} />
                    <br /> 
                    <label htmlFor='task-description'>description of task: </label>
                    <input id='task-description' required onChange={(e) => setDescription(e.target.value)} />
                    <br /> 
                    <label htmlFor='task-deadline'>deadline of task: </label>
                    <input id='task-deadline' type='date' required onChange={(e) => setDeadline(e.target.value)}/>
                    <br /> 
                    <label htmlFor='task-assigned_to'>Assign task to: </label>
                    <input id='task-assigned_to' required onChange={(e) => setUserName(e.target.value)} />
                    <br /> 
                    {/* <label htmlFor='task-deadline'>deadline of task: </label>
                    <input id='task-deadline' type='date' required onChange={(e) => setDeadline(e.target.value)}/>
                    <br />  */}
                    
                    <button type='submit'> Create Task </button>
                </form>
            </div>
        </div>
    </>
  )
}

export default CreateTaskForm