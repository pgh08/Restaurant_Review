import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import RestaurantService from "../services/restaurant";

function Register(props) {

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const handleOnchageName = (e) => {
    let name = e.target.value;
    setName(name);
  } 

  const handleOnchageEmail = (e) => {
    let email = e.target.value;
    setEmail(email);
  }

  const handleOnchagePassword = (e) => {
    let password = e.target.value;
    setPassword(password);
  }

  const registerStyle = {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    height: "80vh",
    boxSizing: "border-box"
  }

  const widthStyle = {
    width: "300px"
  }

  const registerUser = async (event) => {
    event.preventDefault();

    const response = await RestaurantService.registerUser(name, email, password);

    if (response.status === "success") {
      props.showAlert(response.msg, response.status);
      navigate('/restaurants/login');  
    }
    else {
      props.showAlert(response.msg, response.status);
    }
  }

  return (
    <div style={registerStyle}>
      <h1 style={{ fontSize: "2.7rem", fontWeight: "bolder" }}>Sign Up</h1>
      <div className="form-floating mb-4" style={widthStyle}>
        <input type="text" className="form-control" id="floatingname" placeholder="username" value={name} onChange={handleOnchageName} />
        <label htmlFor="floatingname">Username</label>
      </div>
      <div className="form-floating mb-4" style={widthStyle}>
        <input type="email" className="form-control" id="floatingInput" placeholder="name@example.com" value={email} onChange={handleOnchageEmail} />
        <label htmlFor="floatingInput">Email address</label>
      </div>
      <div className="form-floating mb-4" style={widthStyle}>
        <input type="password" className="form-control" id="floatingPassword" placeholder="Password" value={password} onChange={handleOnchagePassword} />
        <label htmlFor="floatingPassword">Password</label>
      </div>
      <button type="button" className="btn btn-primary btn-lg" onClick={registerUser}>Register</button>
    </div>
  );
}

export default Register;