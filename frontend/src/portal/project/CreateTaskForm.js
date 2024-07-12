import React, { useEffect,useState } from 'react'
// import { Form } from 'react-router-dom'
import api from '../../api';
import { useParams } from 'react-router-dom';

import "./CreateTaskForm.css"

const CreateTaskForm = () => {
    const { projectId } = useParams();
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [deadline, setDeadline] = useState("");
    const [assigned_to, setAssigned_to] = useState("");
    const [userName, setUserName] = useState("");
    const [userSuggestions, setUserSuggestions] = useState([]);
    const [suggestionSelected, setSuggestionSelected] = useState(false);
    const [task_assigned_to, setTask_Assigned_To] = useState("");
    
    useEffect(() => {
        // console.log("assignTaskChange ran")
        if ((task_assigned_to.length === 0) || suggestionSelected===true) setUserSuggestions([]);
        else getSuggestions(task_assigned_to);
    }, [task_assigned_to,suggestionSelected])
    
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const btnPointer = document.querySelector('#creteTask-btn');
            btnPointer.innerHTML = 'Please wait..';
            btnPointer.setAttribute('disabled', true);
            // const response = await api.get(`/user/getUserId/${userName}`);
            // console.log(response.data);

            const res = await api.post(`/projects/${projectId}`, {
                "name": name,
                "description": description,
                "deadline": deadline,
                "assigned_to": task_assigned_to
            })
            if (res.status === 201) {
                // console.log(res.data);
                btnPointer.innerHTML = ' Create Task ';
                btnPointer.removeAttribute('disabled');
                alert("the Task is Created!!")
            }
        } catch (error) {
            alert(error.response.data.error);
            console.log(error);
        }

    }




    const getSuggestions = async (e) => {
        try {
            const res = await api.get(`/suggestion/user/${e}`);
            // console.log(res.data);
            setUserSuggestions(res.data);
        } catch (error) {
            alert(error);
            console.log(error);
        }

    }

    const selectSuggestion = (e, userNameSelected) => {

        // console.log("select process start")
        setSuggestionSelected(true);
        setUserSuggestions([]);
        setTask_Assigned_To(userNameSelected);
        // console.log(userNameSelected);
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
                        <input id='task-deadline' type='date' required onChange={(e) => setDeadline(e.target.value)} />
                        <br />
                        <label htmlFor='task-assigned_to'>Assign task to: </label>
                        <input id='task-assigned_to' type="text" value={task_assigned_to} required onChange={(e) => {
                            setSuggestionSelected(false);
                            setTask_Assigned_To(e.target.value);
                        }} />
                        {(!suggestionSelected) && (
                            <ul className='TaskFormUL'>
                                {userSuggestions.map((suggestion) => (
                                    <li className='TaskFormLI' key={suggestion.id} onClick={(e) => selectSuggestion(e, suggestion.username)}>{suggestion.username}</li>
                                ))}
                            </ul>
                        )}

                        <br />

                        <button id="creteTask-btn" type='submit'> Create Task </button>
                    </form>
                </div>
            </div>
        </>
    )
}

export default CreateTaskForm