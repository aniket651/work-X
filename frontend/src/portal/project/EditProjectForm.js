import React, { useState } from 'react'
// import { Form } from 'react-router-dom'
import api from '../../api';
import { useParams } from 'react-router-dom';

import "./EditProjectForm.css"

const EditProjectForm = () => {
    const { projectId } = useParams();
    const [name,setName] = useState("");
    const [aim,setAim] = useState("");
    const [deadline,setDeadline] = useState();

    const handleSubmit = async(e) =>{
        e.preventDefault();
        try {

            // const response = await api.get(`/user/getUserId/${userName}`);
            // console.log(response.data);
            if(name===""){
                setName(localStorage.getItem("project-name"));
            }
            if(aim===""){
                setAim(localStorage.getItem("project-aim"));
            }
            if(deadline===null){
                setDeadline(localStorage.getItem("project-deadline"));
            }
            const res = await api.patch(`/projects/${projectId}`, {
                "name": name,
                "aim": aim,
                "deadline": deadline
            })
            if(res.status === 200){
                // console.log(res.data);
                alert("the Project is Edited!!")
                // localStorage.removeItem("project-assigned_to");
                // localStorage.removeItem("project-aim")
                // localStorage.removeItem("project-name")
                // localStorage.removeItem("project-deadline")
            }
        } catch (error) {
            alert(error);
            // console.log(error);
        }
        
    }



  return (
    <>
        <div className='form-heading'>
            Edit Project Form
        </div>
        <div className='grid-body'>
            <div className='form-div'>
                <form onSubmit={handleSubmit}>
                    <label htmlFor='project-name'>name of project: </label>
                    <input id='project-name' onChange={(e) => setName(e.target.value)} />
                    <br /> 
                    <label htmlFor='project-aim'>aim of project: </label>
                    <input id='project-aim' onChange={(e) => setAim(e.target.value)} />
                    <br /> 
                    <label htmlFor='project-deadline'>deadline of project: </label>
                    <input id='project-deadline' type='date' onChange={(e) => setDeadline(e.target.value)}/>
                    <br /> 
                    {/* <label htmlFor='project-deadline'>deadline of project: </label>
                    <input id='project-deadline' type='date' required onChange={(e) => setDeadline(e.target.value)}/>
                    <br />  */}
                    
                    <button type='submit'> Edit Project </button>
                </form>
            </div>
        </div>
    </>
  )
}

export default EditProjectForm