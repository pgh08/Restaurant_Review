import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import RestaurantService from "../services/restaurant.js";
import jwt_decode from 'jwt-decode';

function Login(props) {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const navigate = useNavigate();

    const handleOnchageEmail = (e) => {
        let email = e.target.value;
        setEmail(email);
    }

    const handleOnchagePassword = (e) => {
        let password = e.target.value;
        setPassword(password);
    }

    async function loginUser(event) {
        event.preventDefault();

        const data = await RestaurantService.loginUser(email, password);

        if(data.userToken){

            // Storing JWT token.
            localStorage.setItem('token', data.userToken);
            const token = localStorage.getItem('token');
            const user = jwt_decode(token);

            props.handleLogin(user.email, user.name);
            props.showAlert(data.msg, data.status);
            navigate('/');
        }
        else{
            props.showAlert(data.msg, data.status);
        }
    }

    const loginStyle = {
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        height: "80vh",
        boxSizing: "border-box"
    }

    return (
        <>
            <form style={loginStyle}>
                <h1 style={{ fontSize: "1.7rem", fontWeight: "bolder" }}>New User please Register</h1>
                <Link type="button" className="btn btn-primary btn-sm mt-2 mb-5" to="/restaurants/register">Register</Link>
                <p>OR</p>
                <h1 className="mb-5" style={{ fontSize: "2.7rem", fontWeight: "bolder" }}>Login</h1>
                <div className="mb-3">
                    <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
                    <input type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" onChange={handleOnchageEmail} />
                </div>
                <div className="mb-3">
                    <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
                    <input type="password" className="form-control" id="exampleInputPassword1" onChange={handleOnchagePassword} />
                </div>
                <button type="submit" className="btn btn-primary" onClick={loginUser}>Login</button>
            </form>
        </>
    );
}

export default Login;