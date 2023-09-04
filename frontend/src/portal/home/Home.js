import React from 'react';
import { Container } from 'react-bootstrap';
import "./Home.css"
import { useNavigate } from 'react-router-dom';


const Home = () => {
    const navigate = useNavigate();

    const visitLogin = (e)=>{
        localStorage.clear();
        navigate('/auth/login');
    }

    const visitRegister = (e)=>{
        localStorage.clear();
        navigate('/auth/register');
    }

    return (
        <div className='body'>
            <div className='welcome'>Welcome to</div>
            <div className='brand-name'>WorkX</div>
            <div className='subheading'>a next generation work managent web app that enables collaboration on small scale projects effortlessly! </div>
            <div className='next-step'>
                <div className='get-started'>get Started</div>
                <div className='buttons-div'>
                    <button className='login' onClick={visitLogin}>Login</button>
                    <button className='register' onClick={visitRegister}>New here?</button>
                </div>
            </div>
        </div>
    )
}
export default Home;