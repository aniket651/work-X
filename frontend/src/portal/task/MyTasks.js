import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import ReactLoading from "react-loading";

import api from '../../api';
import './MyTasks.css'
import TaskCard from './TaskCard';

const MyTasks = (props) => {
  const [compArray,setCompArray] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  

  useEffect(()=>{
    // console.log("fetching data for TaskList !! ")
    const fetchData =async()=>{
      try {
  
        const res = await api.get("/tasks")
        setLoading(false);
        // console.log(res.data);
        if(res.status === 200){
            // console.log("status:200, setting fetched Task list to compArray");
            setCompArray(res.data);
        }
        
      } catch (error) {
        alert(error);
        // console.log(error);
      }
    }
    fetchData();
    // console.log("fetched data for TaskList !! "+compArray)

  }, [])



  const changeCompArray = (newArray)=>{
    setCompArray(newArray);
  }


  const pendingTasks = compArray.filter((item) => item.status === 'pending');
  const inProgressTasks = compArray.filter((item) => item.status === 'in-progress');
  const completedTasks = compArray.filter((item) => item.status === 'completed');
  
  return (
    loading===false ? 
    (
      <div className='Task-List grid-container'>
        <div className='Pending-List category'>
          <div className='task-category'>Pending Tasks</div>
          {pendingTasks.map((item, index) => (
            <TaskCard key={index} taskId={item._id} compArray={compArray} changeCompArray={changeCompArray}/>
          ))}
        </div>
        <div className='Progress-List category'>
          <div className='task-category'>In Progress Tasks</div>
          {inProgressTasks.map((item, index) => (
            <TaskCard key={index} taskId={item._id} compArray={compArray} changeCompArray={changeCompArray} />
          ))}
        </div>
        <div className='Completed-List category'>
          <div className='task-category'>Completed Tasks</div>
          {completedTasks.map((item, index) => (
            <TaskCard key={index} taskId={item._id} compArray={compArray} changeCompArray={changeCompArray} />
          ))}
        </div>
      </div>
    ) : (<ReactLoading type="bars" color="#682e8b"
    height={100} width={50} />)
  )
}

export default MyTasks