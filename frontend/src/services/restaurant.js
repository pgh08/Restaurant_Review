import http from '../http-common.js';

class RestaurantDataService{
    async getAll(page){
        const response = await fetch(`http://localhost:5000/api/v1/restaurants?page=${page}`,{
            method: 'GET',
            headers:{
                'Content-Type': 'application/json'
            },
        });

        return await response.json();
    }

    async get(id){
        return http.get(`/id/${id}`);
    }

    async find(query, by = "name", page = 0){
        const response = await fetch(`http://localhost:5000/api/v1/restaurants?${by}=${query}&page=${page}`,{
            method: 'GET',
            headers:{
                'Content-Type': 'applicatoin/json'
            },
        });

        return await response.json();
    }

    async createReview(restaurantId, review, userEmail, userName){
        const response = await fetch(`http://localhost:5000/api/v1/restaurants/review/`,{
            method: "POST",
            body: JSON.stringify({
                restaurant_id: restaurantId,
                text: review,
                email: userEmail,
                name: userName
            }),
            headers: {
                "Content-Type": "application/json"
            }
        });

        return await response.json();
    }

    async updateReview(reviewId, review, userEmail){
        const response = await fetch(`http://localhost:5000/api/v1/restaurants/review/`,{
            method: "PUT",
            body: JSON.stringify({
                review_id: reviewId,
                text: review,
                email: userEmail
            }),
            headers: {
                "Content-Type": "application/json"
            }
        });
        return await response.json();
    }

    async deleteReview(id, userEmail){
        const response = await fetch(`http://localhost:5000/api/v1/restaurants/review?id=${id}`,{
            method: "DELETE",
            body: JSON.stringify({
                email: userEmail
            }),
            headers: {
                "Content-Type": "application/json"
            }
        });
        return await response.json();
    }

    getCuisines(){
        return http.get(`/cuisines`);
    }

    async loginUser(userEmail, password){
        const response = await fetch('http://localhost:5000/api/v1/restaurants/login', {
            method: 'POST',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                email: userEmail,
                password: password
            })
        });

        return await response.json();
    }

    async registerUser(userName, userEmail, password){
        const response = await fetch('http://localhost:5000/api/v1/restaurants/register', {
            method: 'POST',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                name: userName,
                email: userEmail,
                password: password
            })
        });

        return await response.json();
    }
    
    async userDashboard(userEmail){
        const response = await fetch('http://localhost:5000/api/v1/restaurants/dashboard', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                email: userEmail
            })
        });
        return await response.json();
    }
}

let RestaurantService = new RestaurantDataService();

export default RestaurantService;

