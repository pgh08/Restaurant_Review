import React, {useState} from "react";
import RestaurantService from "../services/restaurant.js";
import { Link, useLocation, useNavigate, useParams } from "react-router-dom";

function AddReview(props){

    const [submitted, setSubmitted] = useState(false);

    const params = useParams();
    const location = useLocation();
    const navigate = useNavigate();
    
    let initialReviewState = "";
    let editing = false;

    if(location.state && location.state.currentReview){
        editing = true;
    }
    
    const [review, setReview] = useState(initialReviewState);
    
    const handleInputChange = (event) => {
        setReview(event.target.value);
    }

    const saveReview = () =>{
        if(editing){
            const review_id = location.state.currentReview;
            RestaurantService.updateReview(review_id, review, props.userEmail)
            .then((response) => {
                setSubmitted(true);
                props.showAlert(response.msg, response.status);
            })
            .catch((e) => {
                console.log(e);
            });
        }
        else{
            RestaurantService.createReview(params.id, review, props.userEmail, props.userName)
            .then((response) => {
                if(response.status === 'danger'){
                    props.updateReviewId(response.reviewId);
                    props.showAlert(response.msg, response.status);
                    navigate(-1);
                }
                else{
                    setSubmitted(true);
                    props.showAlert(response.msg, response.status);
                }
            })
            .catch((e) => {
                console.log(e);
            });
        }
    }

    return(
        <div className="container">
            {props.userName ? (
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
                <div className="container d-flex flex-column align-items-center mt-5">
                    <p className="fs-2 fw-bold">Please Login</p>
                    <Link type="submit" className="btn btn-primary fs-4" to={'/restaurants/login'}>Login</Link>
                </div>
            )}
        </div>
    );
}

export default AddReview;