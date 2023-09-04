import React from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import api from '../../api';
import ReactLoading from "react-loading";
import SuperTaskCard from './SuperTaskCard';
import "./ProjectPage.css"


const ProjectPage = (props) => {
  const [showConfirm, setShowConfirm] = useState(false);
  const { projectId } = useParams();
  const [projectDetails, setProjectDetails] = useState({});
  const [taskList, setTaskList] = useState([]);
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();

  useEffect(() => {
    // console.log("fetching data for the Project!! ")
    fetchProject();
    // console.log("fetched data for the Project!! ")
  }, [])


  const fetchProject = async () => {
    try {
      console.log(`project id is : ${projectId}`)
      const res = await api.get(`/projects/${projectId}`)
      setLoading(false);
      // console.log(res.data);
      if (res.status === 200) {
        console.log(res.data);
        setProjectDetails(res.data);
        setTaskList(res.data.tasks);
      }

    } catch (error) {
      alert(error);
      // console.log(error);
    }
  }

  const handleCreateTask = (e) => {
    navigate(`/createTask/${projectId}`);
  }

  const handleDeleteProject = async (e) => {
    try {

      const response = await api.delete(`/projects/${projectId}`);
      // console.log(response.data);
      setShowConfirm(false);
      if (response.status === 200) {
        alert("the Project is deleted !! refresh to see changes")
      }
    } catch (error) {
      setShowConfirm(false);
      alert(error);
      // console.log(error);
    }
  }

  const handleCancelDelete = (e) => {
    setShowConfirm(false);
  }

  const handleDeleteClick = (e) => {
    setShowConfirm(true);
  }

  const handleEditProject = (e) => {
    localStorage.setItem('project-name', projectDetails.name);
    localStorage.setItem('project-deadline', projectDetails.deadline.substring(0, 10));
    localStorage.setItem('project-aim', projectDetails.aim);
    // localStorage.setItem('task-name', props.task.name);

    navigate(`/editProject/${projectId}`);
  }





  return (
    loading === true ? (<ReactLoading type="bars" color="#682e8b"
      height={100} width={50} />) : (

      <div className='project-page'>
        {/* <div>ProjectPage</div> */}
        <div className='project-name-div'><span className='project-name'>{projectDetails.name}</span></div>
        <div className='project-aim-div'>{projectDetails.aim}</div>
        {/* <div>deadline: {projectDetails.deadline}</div> */}
        <div className='button-div'>
          <button className='createTaskButton' onClick={handleCreateTask}>Create New Task</button>
          <button className='EditProjectButton' onClick={handleEditProject}>Edit Project</button>
          <button className='DeleteProjectButton' onClick={handleDeleteClick}>Delete Project</button>
          {showConfirm && (
            <div className='delete-confirmation'>
              <p>Are you sure you want to delete?</p>
              <button onClick={handleDeleteProject}>Yes</button>
              <button onClick={handleCancelDelete}>No</button>
            </div>
          )}
        </div>

        <div className='task-grid'>
          {taskList.map((item, index) => (
            <SuperTaskCard key={index} projectId={projectId} task={item} />
          ))}
        </div>
      </div>
    )
  )
}

export default ProjectPage