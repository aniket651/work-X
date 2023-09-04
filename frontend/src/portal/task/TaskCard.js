import React from 'react';
import './TaskCard.css';
import api from '../../api';

const TaskCard = (props) => {


    const changePendingStatus = async(e)=>{
        e.preventDefault();
        // console.log(e);

        //send post request to the login endpoint
        try {
            const res = await api.patch("/tasks/"+props.taskId,{
                "status":"in-progress"
            })
            // console.log(res.data);
            if(res.status === 200){
                // console.log("status:200, inside changePendingStatus, calling changeCompArray");
                const newArray = props.compArray;
                const ind = newArray.findIndex((item)=>item.id===res.data.id);
                newArray[ind].status = res.data.status;
                props.changeCompArray(newArray);
                alert("the Status of the Task has changed! Refresh to see the changes");
            }
            
        } catch (error) {
            alert(error);
            // console.log(error);
        }
    }

    const changeProgressStatus = async(e)=>{
        e.preventDefault();
        // console.log(e);

        //send post request to the login endpoint
        try {
            // let url = "/tasks/"+props.taskId;
            // console.log(url);
            const res = await api.patch("/tasks/"+props.taskId,{
                "status":"completed"
            })
            // console.log(res.data);
            if(res.status === 200){
                // console.log("status:200, inside changeProgressStatus, calling changeCompArray");
                const newArray = props.compArray;
                const ind = newArray.findIndex((item)=>item.id===res.data.id);
                newArray[ind].status = res.data.status;
                props.changeCompArray(newArray);
                alert("the Status of the Task has changed! Refresh to see the changes");
            }
            
        } catch (error) {
            alert(error);
            // console.log(error);
        }
    }

    const changeCompletedStatus = async(e)=>{
        e.preventDefault();
        // console.log(e);

        //send post request to the login endpoint
        try {
            const res = await api.patch("/tasks/"+props.taskId,{
                "status":"in-progress"
            })
            // console.log(res.data);
            if(res.status === 200){
                // console.log("status:200, inside changeCompletedStatus, calling changeCompArray");
                const newArray = props.compArray;
                const ind = newArray.findIndex((item)=>item.id===res.data.id);
                newArray[ind].status = res.data.status;
                props.changeCompArray(newArray);
                alert("the Status of the Task has changed! Refresh to see the changes");
            }
            
        } catch (error) {
            alert(error);
            // console.log(error);
        }
    }



    return (
        <div className="task-card">
            <div className="task-name">{props.compArray.filter((item) => item._id === props.taskId)[0].name}</div>
            <div className="task-project"><span>Project Id: </span>{props.compArray.filter((item) => item._id === props.taskId)[0].project}</div>
            <hr></hr>
            <p className="task-description"><span>Description: </span>{props.compArray.filter((item) => item._id === props.taskId)[0].description}</p>
            <p className="task-deadline"><span>Deadline: </span>{props.compArray.filter((item) => item._id === props.taskId)[0].deadline}</p>
            {props.compArray.filter((item) => item._id === props.taskId)[0].status === "pending" ? <input className="change-button" type='submit' onClick={changePendingStatus} id='pendingbutton' value='move to In-Progress' aria-label='click here to login' /> : null}
            {props.compArray.filter((item) => item._id === props.taskId)[0].status === "in-progress" ? <input className="change-button" type='submit' onClick={changeProgressStatus} id='progressbutton' value='move to completed' aria-label='click here to login' /> : null}
            {props.compArray.filter((item) => item._id === props.taskId)[0].status === "completed" ? <input className="change-button" type='submit' onClick={changeCompletedStatus} id='completedbutton' value='move to In-Progress' aria-label='click here to login' /> : null}

        </div>
    );
};

export default TaskCard;