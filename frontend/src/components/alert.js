import React from "react";

function Alert(props){
    return(
        props.alert && <div className={`alert alert-${props.alert.typ}`} role="alert">
            {props.alert.msg}
      </div>
      
    );
}

export default Alert;