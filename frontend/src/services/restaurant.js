import http from '../http-common.js';

class RestaurantDataService{
    getAll(page = 0){
        return http.get(`?page=${page}`);
    }

    get(id){
        return http.get(`/id/${id}`);
    }

    find(query, by = "name", page = 0){
        return http.get(`?${by}=${query} & page=${page}`);
    }

    createReview(data){
        return fetch(`https://restaurantreview-50ic.onrender.com/api/v1/restaurants/review/`,{
            method: "POST",
            body: JSON.stringify(data),
            headers: {
                "content-type": "application/json"
            }
        });
    }

    updateReview(data){
        return fetch(`https://restaurantreview-50ic.onrender.com/api/v1/restaurants/review/`,{
            method: "PUT",
            body: JSON.stringify(data),
            headers: {
                "content-type": "application/json"
            }
        });
    }

    deleteReview(id, userId){
        fetch(`https://restaurantreview-50ic.onrender.com/api/v1/restaurants/review?id=${id}`,{
            method: "DELETE",
            body: JSON.stringify({
                user_id: userId
            }),
            headers: {
                "content-type": "application/json"
            }
        });
    }

    getCuisines(){
        return http.get(`/cuisines`);
    }
}

let RestaurantService = new RestaurantDataService();

export default RestaurantService;

