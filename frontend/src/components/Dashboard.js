import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import RestaurantService from "../services/restaurant.js";

function Dashboard(props) {

    const [reviewCount, setReviewCount] = useState(0);
    const [reviews, setReviews] = useState([]);

    useEffect(() => {
        RestaurantService.userDashboard(props.userEmail)
            .then((response) => {
                if (response) {
                    setReviews(response.reviewArray);
                    setReviewCount(response.reviewArray.length);
                    props.showAlert(response.msg, response.status);
                }
                else {
                    setReviewCount(0);
                    props.showAlert(response.msg, response.status);
                }
            })
            .catch((err) => {
                console.log('Fetching user info failed');
            });

    },[]);

    const paragraphStyle = {
        fontSize: "1.4rem"
    };

    return (
        <>
            {props.userName ?
                (<div className="container" style={{width: "100%"}}>
                    <div className="d-flex align-items-center justify-content-between" style={{ height: "20vh", width: "100%" }}>
                        <div className="d-flex flex-column fs-5">
                            <p className="my-1"><strong>User Name: </strong> {props.userName}</p>
                            <p className="my-1"><strong>User Email: </strong>{props.userEmail}</p>
                            <p><strong>Review Count: </strong> {reviewCount}</p>
                        </div>
                    </div>
                    <hr className="mb-4" style={{height: "10px", backgroundColor: "black", borderRadius: "10px"}}/>
                    <h2>Your Reviews</h2>
                    <div className="row">
                        {reviewCount > 0 ? (
                                reviews.map((review, index) => {
                                    return(
                                        <div className="col-lg-4 pb-1" key={index} style={paragraphStyle}>
                                            <div className="card">
                                                <div className="card-body">
                                                    <p className="card-text">
                                                       <strong>Review: </strong>{review.text}<br/>
                                                        <strong>User: </strong>{review.name}<br/>
                                                        <strong>Date: </strong>{review.date}
                                                    </p>
                                                    <Link type="button" className="btn btn-primary col-lg-8" to={'/restaurants/' + review.restaurant_id} >View reviews on this restaurant</Link>   
                                                </div>
                                            </div>
                                        </div>
                                    );
                                })
                            ) : (
                                <div className="d-flex justify-content-center align-items-center" style={{height: "40vh", color: "grey"}}>
                                    You haven't added any review to the restaurant yet.
                                </div>
                            )
                        }
                    </div>
                </div>)
                :
                (<div className="container d-flex flex-column align-items-center mt-5">
                    <p className="fs-2 fw-bold">Please Login</p>
                    <Link type="submit" className="btn btn-primary fs-4" to={'/restaurants/login'}>Login</Link>
                </div>)}
        </>
    );
}

export default Dashboard;