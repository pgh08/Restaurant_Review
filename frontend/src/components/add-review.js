import React, {useState} from "react";
import RestaurantService from "../services/restaurant.js";
import { Link, useLocation, useParams } from "react-router-dom";

function AddReview(props){

    const textStyle = {
        fontSize: "1.3rem",
        fontWeight: "bold",
        display: "flex",
        justifyContent: "center",
    };

    const params = useParams();
    const location = useLocation();
    
    let initialReviewState = "";
    
    let editing = false;

    if(location.state && location.state.currentReview){
        editing = true;
        initialReviewState = location.state.currentReview.text;
    }
    
    const [review, setReview] = useState(initialReviewState);
    const [submitted, setSubmitted] = useState(false);

    const handleInputChange = (event) => {
        setReview(event.target.value);
    }

    const saveReview = () =>{
        var data = {
            text: review,
            name: props.user.name,
            user_id: props.user.id,
            restaurant_id: params.id
        }

        if(editing){
            data.review_id = location.state.currentReview._id;
            RestaurantService.updateReview(data)
            .then((response) => {
                setSubmitted(true);
                console.log(response.data);
            })
            .catch((e) => {
                console.log(e);
            });
        }
        else{
            RestaurantService.createReview(data)
            .then((response) => {
                setSubmitted(true);
                console.log(response.data);
            })
            .catch((e) => {
                console.log(e);
            });
        }
    }

    return(
        <div className="container">
            {props.user ? (
                <div className="submit-form">
                    { submitted ? (
                        <div>
                            <h4>You submitted successfully</h4>
                            <Link to={"/restaurants/" + params.id} className="btn btn-success">
                                Back to Restaurant
                            </Link>
                        </div>
                    ) : (
                        <div>
                            <div className="form-control">
                                <label htmlFor="description">{editing ? "Edit " : "Create "}Review</label>
                                <input type="text" className="form-control mt-2" id="text" required value={review} onChange={handleInputChange} name="text"/>
                            </div>
                            <button onClick={saveReview} className=" btn btn-success my-3">Submit</button>
                        </div>
                    )}
                </div>
            ) : (
                <div style={textStyle}>
                    Please Login
                </div>
            )}
        </div>
    );
}

export default AddReview;