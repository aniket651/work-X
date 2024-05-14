import React, { useEffect ,useState } from 'react'
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
    // const [userName,setUserName] = useState("");
    const [userSuggestions, setUserSuggestions] = useState([]);
    const [suggestionSelected, setSuggestionSelected] = useState(false);


    useEffect(() => {
        // console.log("assignTaskChange ran")
        if ((assigned_to.length === 0) || suggestionSelected===true) setUserSuggestions([]);
        else getSuggestions(assigned_to);
    }, [assigned_to,suggestionSelected])


    const handleSubmit = async(e) =>{
        e.preventDefault();
        try {
            const btnPointer = document.querySelector('#editTask-btn');
            btnPointer.innerHTML = 'Please wait..';
            btnPointer.setAttribute('disabled', true);
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
            if(assigned_to===""){
                setAssigned_to(localStorage.getItem("task-assigned_to"));
            }
            const res = await api.patch(`/projects/${projectId}/${taskId}`, {
                "name": name,
                "description": description,
                "deadline": deadline,
                "assigned_to": assigned_to
            })
            if(res.status === 200){
                btnPointer.innerHTML = ' Edit Task ';
                btnPointer.removeAttribute('disabled');
                alert("the Task is Edited!!")
            }
        } catch (error) {
            alert(error);
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
        setAssigned_to(userNameSelected);
        // console.log(userNameSelected);
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
                <input id='task-deadline' type='date'  onChange={(e) => setDeadline(e.target.value)}/>
                <br /> 
                <label htmlFor='task-assigned_to'>Assign task to: </label>
                <input id='task-assigned_to' value={assigned_to} onChange={(e) => {
                    setSuggestionSelected(false);
                    setAssigned_to(e.target.value);
                }} />
                {(!suggestionSelected) && (
                            <ul className='TaskFormUL'>
                                {userSuggestions.map((suggestion) => (
                                    <li className='TaskFormLI' key={suggestion.id} onClick={(e) => selectSuggestion(e, suggestion.username)}>{suggestion.username}</li>
                                ))}
                            </ul>
                        )}
                <br /> 
                {/* <label htmlFor='task-deadline'>deadline of task: </label>
                <input id='task-deadline' type='date' required onChange={(e) => setDeadline(e.target.value)}/>
                <br />  */}
                
                <button id="editTask-btn" type='submit'> Edit Task </button>
            </form>
        </div>
    </div>
    </>
  )
}

export default EditTaskForm