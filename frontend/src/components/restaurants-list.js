import React from 'react';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import RestaurantService from '../services/restaurant.js';

function RestaurantsList(props) {

    const [restaurants, setRestaurants] = useState([]);
    const [searchName, setSearchName] = useState("");
    const [searchZip, setSearchZip] = useState("");
    const [searchCuisine, setSearchCuisine] = useState("");
    const [cuisines, setCuisine] = useState(["All Cuisines"]);
    const [nextState, setNextState] = useState(false);
    const [pageCount, setPageCount] = useState(1);

    const onChangeSearchName = e => {
        const searchName = e.target.value;
        setSearchName(searchName);
        setPageCount(1);
    };


    const onChangeSearchZip = e => {
        const searchZip = e.target.value;
        setSearchZip(searchZip);
        setPageCount(1);
    };


    const onChangeSearchCuisine = e => {
        const searchCuisine = e.target.value;
        setSearchCuisine(searchCuisine);
        setPageCount(1);
    };

    const retrieveRestaurants = (pageCount) => {
        RestaurantService.getAll(pageCount)
            .then(response => {
                setRestaurants(response.restaurants);
        
                if (response.total_results === 18) {
                    setNextState(true);
                }
            })
            .catch(e => {
                console.log(e);
            });
        }

    const retrieveCuisines = () => {
        RestaurantService.getCuisines()
            .then(response => {
                setCuisine(["All Cuisines"].concat(response.data));
            })
            .catch(e => {
                console.log(e);
            });
    }
    
    const refreshList = (pageCount) => {
        retrieveRestaurants(pageCount);
    };

    const find = (query, by) => {
        RestaurantService.find(query, by, pageCount)
            .then(response => {
                setRestaurants(response.restaurants);
                if(response.total_results < 18){
                    setNextState(false);
                }  
                else{
                    setNextState(true);
                }        
            })
            .catch(e => {
                console.log(e);
            });
    }

    const findByName = (pageCount) => {
        find(searchName, "name", pageCount);
    };

    const findByZip = (pageCount) => {
        find(searchZip, "zipcode", pageCount);
    };

    const findByCuisine = (pageCount) => {
        if (searchCuisine === "All Cuisines") {
            refreshList();
        }
        else {
            find(searchCuisine, "cuisine", pageCount);
        }
    };
    
    const reducePageCount = () => {
        if (pageCount > 1) {
            setPageCount(pageCount - 1);
        }
    }
    
    const increasePageCount = () => {
        if (nextState) {
            setPageCount(pageCount + 1);
        }
    }

    useEffect(() => {
        if(searchName){
            findByName(pageCount);
        }
        else if(searchZip){
            findByZip(pageCount);
        }
        else if(searchCuisine && searchCuisine !== "All Cuisines"){
            findByCuisine(pageCount);
        }
        else{
            retrieveRestaurants(pageCount);
            retrieveCuisines();
        }
    },[pageCount]);

    return (
        <div>
            <div className="row pb-1 d-flex justify-content-around mb-4">

                <div className="input-group col-lg-4 w-25">
                    <input type="text" className="form-control" placeholder="Search by name" value={searchName} onChange={onChangeSearchName} />
                    <div className="input-group-append">
                        <button className="btn btn-outline-secondary" type="button" onClick={findByName}>
                            Search
                        </button>
                    </div>
                </div>

                <div className="input-group col-lg-4 w-25">
                    <input type="text" className="form-control" placeholder="Search by zipcode" value={searchZip} onChange={onChangeSearchZip} />
                    <div className="input-group-append">
                        <button className="btn btn-outline-secondary" type="button" onClick={findByZip}>
                            Search
                        </button>
                    </div>
                </div>

                <div className="input-group col-lg-4 w-25">
                    <select className="form-select" aria-label="Default select example" onChange={onChangeSearchCuisine}>
                        {
                            cuisines.map((cuisine) => {
                                return (
                                    <option value={cuisine}>{cuisine.substring(0, 20)}</option>
                                );
                            })
                        }
                    </select>
                    <div className="input-group-append">
                        <button className="btn btn-outline-secondary" type="button" onClick={findByCuisine}>
                            Search
                        </button>
                    </div>
                </div>
            </div>

            <div className="row">
                {restaurants.map((restaurant) => {
                    const address = `${restaurant.address.building}, ${restaurant.address.street}, ${restaurant.address.zipcode}`;
                    return (
                        <div className="col-lg-4 pb-2">
                            <div className="card">
                                <div className="card-body">
                                    <h5 className="card-title">{restaurant.name}</h5>
                                    <p className="card-text">
                                        <strong>Cuisine: </strong>{restaurant.cuisine}<br />
                                        <strong>Address: </strong>{address}
                                    </p>
                                    <div className="row">
                                        <Link to={"/restaurants/" + restaurant._id} className="btn btn-primary col-lg-5 mx-1 mb-1" onClick={props.updateReviewId(null)}>
                                            View Review
                                        </Link>
                                        <a target="_blank" href={"https://www.google.com/maps/place/" + address} className="btn btn-primary col-lg-5 mx-1 mb-1" rel="noreferrer">
                                            View Map
                                        </a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>

            <div className='d-flex justify-content-center mt-2 mb-4'>
                <button type="button" className="btn btn-primary mx-3" disabled={pageCount === 1} onClick={reducePageCount}>Previous</button>
                <button type="button" className="btn btn-primary mx-3" disabled={!nextState} onClick={increasePageCount}>Next</button>
            </div>
        </div>
    );
}

export default RestaurantsList;