import React from "react";
import "./Auth.css"
import { Outlet } from "react-router-dom";
import AuthNavbar from "./navbar/AuthNavbar";
const Auth = () => {
    return (
        <React.Fragment>
            <div className="AuthPage">
                <AuthNavbar />
                <Outlet />
            </div>
        </React.Fragment>
    );
}
export default Auth;