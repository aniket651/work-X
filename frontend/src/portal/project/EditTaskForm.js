import React, { useState } from 'react'
// import { Form } from 'react-router-dom'
import api from '../../api';
import { useParams } from 'react-router-dom';
import "./EditTaskForm.css"


const EditTaskForm = () => {
    const { projectId, taskId } = useParams();
    const [name,setName] = useState("");
    const [description,setDescription] = useState("");
    const [deadline,setDeadline] = useState();
    const [assigned_to,setAssigned_to] = useState("");
    const [userName,setUserName] = useState("");

    const handleSubmit = async(e) =>{
        e.preventDefault();
        try {

            // const response = await api.get(`/user/getUserId/${userName}`);
            // console.log(response.data);
            if(name===""){
                setName(localStorage.getItem("task-name"));
            }
            if(description===""){
                setDescription(localStorage.getItem("task-description"));
            }
            if(deadline===null){
                setDeadline(localStorage.getItem("task-deadline"));
            }
            if(userName===""){
                setAssigned_to(localStorage.getItem("task-assigned_to"));
            }
            else{
                const response = await api.get(`/user/getUserId/${userName}`);
                // console.log(response.data);
                setAssigned_to(response.data.userId);
            }
            const res = await api.patch(`/projects/${projectId}/${taskId}`, {
                "name": name,
                "description": description,
                "deadline": deadline,
                "assigned_to": assigned_to
            })
            if(res.status === 200){
                // console.log(res.data);
                alert("the Task is Edited!!")
                // localStorage.removeItem("task-assigned_to");
                // localStorage.removeItem("task-description")
                // localStorage.removeItem("task-name")
                // localStorage.removeItem("task-deadline")
            }
        } catch (error) {
            alert(error);
            // console.log(error);
        }
        
    }



  return (
    <>
    <div className='form-heading'>
            Edit Task Form
    </div>
    <div className='grid-body'>

        <div className='form-div'>
            <form onSubmit={handleSubmit}>
                <label htmlFor='task-name'>name of task: </label>
                <input id='task-name' onChange={(e) => setName(e.target.value)} />
                <br /> 
                <label htmlFor='task-description'>description of task: </label>
                <input id='task-description' onChange={(e) => setDescription(e.target.value)} />
                <br /> 
                <label htmlFor='task-deadline'>deadline of task: </label>
                <input id='task-deadline' type='date' value={localStorage.getItem("task-deadline")} onChange={(e) => setDeadline(e.target.value)}/>
                <br /> 
                <label htmlFor='task-assigned_to'>Assign task to: </label>
                <input id='task-assigned_to' onChange={(e) => setUserName(e.target.value)} />
                <br /> 
                {/* <label htmlFor='task-deadline'>deadline of task: </label>
                <input id='task-deadline' type='date' required onChange={(e) => setDeadline(e.target.value)}/>
                <br />  */}
                
                <button type='submit'> Edit Task </button>
            </form>
        </div>
    </div>
    </>
  )
}

export default EditTaskForm