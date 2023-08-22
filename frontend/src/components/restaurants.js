import React,{ useState, useEffect } from "react";
import RestaurantService from "../services/restaurant.js"
import { Link, useParams } from "react-router-dom";

const Restaurants = (props) => {

    const params = useParams();

    const initialRestaurantState = {
        id: null,
        name: "",
        address: {},
        cuisine: "",
        reviews: []
    };

    const [restaurant, setRestaurant] = useState(initialRestaurantState);

    const getRestaurant = (id) => {
        RestaurantService.get(id)
        .then(response => {
            console.log(response.data);
            setRestaurant(response.data.restaurant);
        })
        .catch(e => {
            console.log(e);
        });
    };

    useEffect(() => {
        getRestaurant(params.id);
    }, [params.id]);

    const deleteReview = (reviewId, index) => {
        RestaurantService.deleteReview(reviewId, props.user.id)
        .then(response => {
            setRestaurant((prevState) => {
                prevState.reviews.splice(index, 1);
                return({
                    ...prevState
                })
            })
        })
        .catch(e => {
            console.log(e);
        });
    };

    const paragraphStyle = {
        fontSize: "1.4rem"
    };

    return(
        <div>
            {restaurant ? (
                <div className="container">
                    <h5 style={{fontSize: "2rem", fontWeight: "bolder"}}>{restaurant.name}</h5>
                    <p style={paragraphStyle}>
                        <strong>Cuisine: </strong>{restaurant.cuisine}<br/>
                        <strong>Address: </strong>{restaurant.address.building},{restaurant.address.street},{restaurant.address.zipcode}
                    </p>
                    <Link to={"/restaurants/"+params.id+"/review"} className="btn btn-primary">
                        Add Review
                    </Link>
                    <h4 className="mt-3" style={{fontWeight: "bold"}}>Reviews</h4>
                    <div className="row">
                        {restaurant.reviews.length > 0 ? (
                            restaurant.reviews.map((review, index) => {
                                return(
                                    <div className="col-lg-4 pb-1" key={index} style={paragraphStyle}>
                                        <div className="card">
                                            <div className="card-body">
                                                <p className="card-text">
                                                    {review.text}<br/>
                                                    <strong>User: </strong>{review.name}<br/>
                                                    <strong>Date: </strong>{review.date}
                                                </p>
                                                {props.user && props.user.id === review.user_id && 
                                                    <div className="row">
                                                        <Link onClick={() => deleteReview(review._id, index)} className="btn btn-primary col-lg-5 mx-1 mb-1">Delete</Link>
                                                        <Link to={"/restaurants/" + params.id + "/review"} state={{currentReview: review}} className="btn btn-primary col-lg-5 mx-1 mb-1">Edit</Link>
                                                    </div>
                                                }
                                            </div>
                                        </div>
                                    </div>
                                );
                            })
                        ) : (
                            <div className="col-sm-4">
                                <p style={paragraphStyle}>No reviews yet.</p>
                            </div>
                        )}
                    </div>
                </div>
            ) : (
                <div>
                    <br/>
                    <p style={paragraphStyle}>No restaurants selected.</p>
                </div>
            )}
        </div>
    );
};

export default Restaurants;