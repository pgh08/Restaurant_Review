import mongoose from 'mongoose';
import model from '../models/Data.model.js';

const User = model.User;
const reivews = model.reviews;

const generate = mongoose.mongo;

export default class UsersDAO{
    static async registerUser(userName, userEmail, hashedUserPassword, reviewId = '', restaurantId = '', newDate){
        try{
            const registerDoc = {
                name: userName,
                email: userEmail,
                password: hashedUserPassword,
                date: newDate,
            };
            
            const data = await User.create(registerDoc);
            
            if(data){
                return {status: true};
            }
        }
        catch(err){
            return {status: false, error: "User already exists"};
        }
    }

    static async loginUser(userEmail){
        try{
            const loginDoc = {
                email: userEmail
            };

            return await User.findOne(loginDoc);
        }
        catch(e){
            console.error(`Unable to login user : ${e}`);
            return {error: e};
        }
    }

    static async addReviewIdAndRestaurantId(userEmail, reviewId, restaurantId){
        try{
            const data = await User.updateOne(
                {email: userEmail},
                {
                    $push:{
                        reviewsArray:{
                            $each:[
                                {
                                    review_id: reviewId,
                                    restaurant_id: restaurantId
                                }
                            ]
                        }
                    }
                }
            );

            return data;
        }
        catch(e){
            console.error(`Unable to add reviews and restraurants to user : ${e}`);
            return {error: e};
        }
    }

    static async deleteReviewIdAndRestaurantId(userEmail, reviewId){
        try{
            const data = await User.updateOne(
                {email: userEmail},
                {$pull: {reviewsArray: {review_id: reviewId}}}
            );
        }
        catch(e){
            console.error(`Unable to remove reviewId and restaurantId within user : ${e}`);
            return {error: e};
        }
    }

    static async checkReviewPresent(userEmail, restaurantId){
        try{
            const data = await User.findOne(
                {
                    email: userEmail,
                    reviewsArray: {
                        $elemMatch: { 
                            restaurant_id: restaurantId
                        }
                    }
                }
            );
            if(data){
                return {status: false, msg: 'You have already added review earlier please edit the review', reviewId: data.reviewsArray[0].review_id};
            }
            else{
                return {status: true};
            }
        }
        catch(e){
            console.error(`Unable to check whether the review is already present : ${e}`);
            return {error: e};
        }
    }

    static async dashboard(userEmail){
        try{
            const pipeline = [
                {
                    $match: {
                        "email": userEmail
                    }
                },
                {
                    $lookup:{
                        from: 'reviews',
                        let:{
                            "email": userEmail
                        },

                        pipeline: [
                            {
                                $match:{
                                    $expr:{
                                        $eq:['$email', "$$email"]
                                    }
                                }
                            },
                            {
                                $sort:{
                                    date: -1
                                }
                            }
                        ],
                        as: 'dashboard'
                    }
                },
                {
                    $addFields: {
                        dashboard: '$dashboard'
                    }
                }
            ];

            const data = await User.aggregate(pipeline);

            return data[0];
        }
        catch(e){
            console.error(`Unable to lookup the database for your reviews : ${e}`);
            return {error: e};
        }
    }
}