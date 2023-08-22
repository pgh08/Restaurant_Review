import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

export default function Navbar(props){
    return(
    <nav className="navbar navbar-expand-lg bg-dark navbar-dark h4">
        <div className="container-fluid">
            <Link className="navbar-brand" to="/restaurants">{props.title}</Link>
            <div className="collapse navbar-collapse" id="navbarNav">
                <ul className="navbar-nav">
                    <li className="nav-item">
                        <Link className="nav-link active" aria-current="page" to="/restaurants">Restaurants</Link>
                    </li>
                    <li className="nav-item">
                        {props.user ? (
                            <Link className="nav-link" onClick={props.logout} style={{cursor: 'pointer'}}>Logout {props.user.name}</Link>
                        ) : (<Link className="nav-link" to={'/login'}>Login</Link>)}
                    </li>
                </ul>
            </div>
        </div>
    </nav>
    );
}

Navbar.prototype = {
    title: PropTypes.string.isRequired,
  };