import React, { useState } from 'react'
// import { Form } from 'react-router-dom'
import api from '../../api';
import "./CreateProjectForm.css"


const CreateProjectForm = () => {
    const [name, setName] = useState("");
    const [aim, setAim] = useState("");
    const [deadline, setDeadline] = useState("");


    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const btnPointer = document.querySelector('#createProject-btn');
            btnPointer.innerHTML = 'Please wait..';
            btnPointer.setAttribute('disabled', true);

            const res = await api.post("/projects", {
                "name": name,
                "aim": aim,
                "deadline": deadline
            })
            if (res.status === 201) {
                // console.log(res.data);
                btnPointer.innerHTML = ' Create Project ';
                btnPointer.removeAttribute('disabled');
                alert("the Project is Created!!")
            }
        } catch (error) {
            // btnPointer.innerHTML = ' Create Project ';
            // btnPointer.removeAttribute('disabled');
            alert(error);
            // console.log(error);
        }

    }



    return (
        <>
            <div className='form-heading'>
                Create Project Form
            </div>
            <div className='grid-body'>
                <div className='form-div'>
                    <form onSubmit={handleSubmit}>
                        <label htmlFor='project-name'>name of project: </label>
                        <input id='project-name' required onChange={(e) => setName(e.target.value)} />
                        <br />
                        <label htmlFor='project-aim'>Aim of project: </label>
                        <input id='project-aim' required onChange={(e) => setAim(e.target.value)} />
                        <br />
                        <label htmlFor='project-deadline'>deadline of project: </label>
                        <input id='project-deadline' type='date' required onChange={(e) => setDeadline(e.target.value)} />
                        <br />
                        <button id="createProject-btn" type='submit'> Create Project </button>
                    </form>
                </div>
            </div>
        </>
    )
}

export default CreateProjectForm