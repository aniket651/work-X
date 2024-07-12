import axios from "axios";
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
// import { Form } from 'react-router-dom'
import api from '../../api';

import "./Login.css"


const Login = () => {
  const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    // const [deadline, setDeadline] = useState("");
    // const navigate = useNavigate();

    const navigate = useNavigate();
    const submitLoginForm = (event) => {
        event.preventDefault();
        const formElement = document.querySelector('#loginForm');
        const formData = new FormData(formElement);
        const formDataJSON = Object.fromEntries(formData);
        const btnPointer = document.querySelector('#login-btn');
        btnPointer.innerHTML = 'Please wait..';
        btnPointer.setAttribute('disabled', true);
        api.post('/auth/login', formDataJSON).then((response) => {
            btnPointer.innerHTML = 'Login';
            btnPointer.removeAttribute('disabled');
            const data = response.data;
            const token = data.token;
            if (!token) {
                alert('Unable to login. Please try after some time.');
                return;
            }
            localStorage.clear();
            localStorage.setItem('user-token', token);
            setTimeout(() => {
                navigate('/projects');
            }, 500);
        }).catch((error) => {
            btnPointer.innerHTML = 'Login';
            btnPointer.removeAttribute('disabled');
            console.log(error);
            alert(error.response.data.error);
        });
    }



    return (
        <>
            <div className='form-heading'>
                Login Form
            </div>
            <div className='grid-body'>
                <div className='form-div'>
                    <form id="loginForm" onSubmit={submitLoginForm}>
                        <label htmlFor='username'>Username </label>
                        <input id='username' name="username" required pattern="^\S*$" title="No spaces allowed" />
                        <br />
                        <label htmlFor='password'>Password </label>
                        <input id='password' name="password" required  />
                        <br />
                        <button id="login-btn" type='submit'> Login </button>
                    </form>
                </div>
            </div>
        </>
    )
}

export default Login


