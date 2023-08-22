import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function Login(props){

    const navigate = useNavigate();

    const initalUserState = {
        name: "",
        id: ""
    };

    const [user, setUser] = useState(initalUserState);

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setUser({...user, [name]: value});
    }

    const login = () => {
        props.login(user);
        navigate("/");
    }

    return(
        <div className="submit-form">
            <div>
                <div className="form-group my-3 mx-5">
                    <label htmlFor="user">Username</label>
                    <input type="text" className="form-control" id="name" required value={user.name} onChange={handleInputChange} name="name"/>
                </div>

                <div className="form-group my-3 mx-5">
                    <label htmlFor="id">ID</label>
                    <input type="text" className="form-control" id="id" required value={user.id} onChange={handleInputChange} name="id"/>
                </div>

                <button className="btn btn-success my-3 mx-5" onClick={login}>Login</button>

            </div>
        </div>
    );
}

export default Login;