import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
// import { Form } from 'react-router-dom'
import api from '../../api';

// import "./CreateProjectForm.css"


const Register = () => {
  const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    // const [deadline, setDeadline] = useState("");
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await api.post("/auth/register", {
                "username": username,
                "password": password
            })
            if (res.status === 201) {
                // console.log(res.data);
                alert("Your Profile is Created!!")
                setTimeout(() => {
                  navigate('/auth/login');
                }, 500);
            }
        } catch (error) {
            alert(error);
            console.log(error);
        }

    }



    return (
        <>
            <div className='form-heading'>
                Registration Form
            </div>
            <div className='grid-body'>
                <div className='form-div'>
                    <form onSubmit={handleSubmit}>
                        <label htmlFor='username'>Username </label>
                        <input id='username' required onChange={(e) => setUsername(e.target.value)} />
                        <br />
                        <label htmlFor='password'>Password </label>
                        <input id='password' required onChange={(e) => setPassword(e.target.value)} />
                        <br />
                        <button type='submit'> Register </button>
                    </form>
                </div>
            </div>
        </>
    )
}

export default Register


