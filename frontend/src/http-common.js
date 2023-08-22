import axios from 'axios';

export default axios.create({
    baseURL: "https://restaurantreview-50ic.onrender.com/api/v1/restaurants/",
    headers: { "Content-type": "applicaton/json"}
});