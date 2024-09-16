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
            const btnPointer = document.querySelector('#editProject-btn');
            btnPointer.innerHTML = 'Please wait..';
            btnPointer.setAttribute('disabled', true);
            // const response = await api.get(`/user/getUserId/${userName}`);
            // console.log(response.data);
            if(name==""){
                console.log(localStorage.getItem("project-name"));
                setName(localStorage.getItem("project-name"));
            }
            if(aim==""){
                console.log(localStorage.getItem("project-aim"));

                setAim(localStorage.getItem("project-aim"));
            }
            if(deadline===null){
                console.log(localStorage.getItem("project-deadline"));

                setDeadline(localStorage.getItem("project-deadline"));
            }
            const res = await api.patch(`/projects/${projectId}`, {
                "name": name,
                "aim": aim,
                "deadline": deadline
            })
            if(res.status === 200){
                // console.log(res.data);
                btnPointer.innerHTML = ' Edit Project ';
                btnPointer.removeAttribute('disabled');
                alert("the Project is Edited!!")
                // localStorage.removeItem("project-assigned_to");
                // localStorage.removeItem("project-aim")
                // localStorage.removeItem("project-name")
                // localStorage.removeItem("project-deadline")
            }
        } catch (error) {
            // btnPointer.innerHTML = ' Edit Project ';
            // btnPointer.removeAttribute('disabled');
            alert(error.response.data.error);
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
                    
                    <button id="editProject-btn" type='submit'> Edit Project </button>
                </form>
            </div>
        </div>
    </>
  )
}

export default EditProjectForm