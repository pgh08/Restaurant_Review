import mongoose from "mongoose";
import restaurantsModel from '../models/Data.model.js';

const restaurants = restaurantsModel.restaurants;
const generate = mongoose.mongo;

export default class RestaurantsDAO{
    static async getRestaurants(filters = null, page = 0, restaurantsPerPage = 20) {
        let query = {};

        if(filters){
            if("name" in filters){
                let temp = filters["name"].trim();
                query = {$text: {$search: temp}};
            }
            else if("cuisine" in filters){
                let temp = filters["cuisine"].trim();
                query = {"cuisine": {$eq: temp}};
            }
            else if("zipcode" in filters){
                let temp = filters["zipcode"].trim();
                query = {"address.zipcode": {$eq: temp}};
            }
        }

        try{
            let restaurantsList = [];

            await restaurants.find(query).limit(restaurantsPerPage).skip(page*restaurantsPerPage)
            .then((res) => {
                res.forEach(element => {
                   restaurantsList.push(element); 
                });
            })
            .catch((err) => {
                console.error(`error : ${err}`);
            })

            const totalNumRestaurants = restaurantsList.length;

            return {restaurantsList, totalNumRestaurants};
        }
        catch(e){
            console.error(`Unable to fetch and query restaurants : ${e}`);
            return {restaurantsList: {}, totalNumRestaurants: 0};
        }
    }

    static async getRestaurantByID(id){
        try{
            const pipeline = [
                {
                    $match: {
                        _id: new generate.ObjectId(id),
                    },
                },
                {
                    $lookup: {
                        from: "reviews",
                        let: {
                            id: id,
                        },

                        pipeline: [
                            {
                                $match: {
                                    $expr: {
                                        $eq: ["$restaurant_id", id],
                                    },
                                },
                            },
                            {
                                $sort: {
                                    date: -1,
                                },
                            },
                        ],
                        as: "reviews",
                    },
                },
                {
                    $addFields: {
                        reviews: "$reviews",
                    },
                },
            ];
            
            const dataArray = await restaurants.aggregate(pipeline);

            return dataArray[0];
        }
        catch(e){
            console.error(`Something went wrong in getRestaurantID: ${e}`);
            throw e;
        }
    }

    static async getCuisines(){
        let cuisines = [];
        try{
            cuisines = await restaurants.distinct("cuisine");
            return cuisines;
        }
        catch(e){
            console.error(`Unable to get cuisines: ${e}`);
        }
    }
}

