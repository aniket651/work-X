import './App.css';
import React, { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import PortalNavbar from "./portal/navbar/PortalNavbar";
function App() {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const checkUserToken = () => {
        const userToken = localStorage.getItem('user-token');
        if (!userToken || userToken === 'undefined') {
            setIsLoggedIn(false);
        }
        setIsLoggedIn(true);
    }
    useEffect(() => {
        checkUserToken();
    }, [isLoggedIn]);
 
    return (
        <React.Fragment>
            <div className='App'>
            {isLoggedIn && <PortalNavbar />}
            <Outlet />
            </div>
        </React.Fragment>
    );
}
export default App;