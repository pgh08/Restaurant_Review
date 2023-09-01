import reviewModel from '../models/Data.model.js';
import UsersDAO from './UserDAO.js';
import mongoose from 'mongoose';

const generate = mongoose.mongo;
const reviews = reviewModel.reviews;

export default class ReviewsDAO{
    static async addReview(restaurantId, userEmail, review, date, userName){
        try{
            const reviewDoc = {
                email: userEmail,
                text: review,
                date: date,
                restaurant_id: restaurantId,
                name: userName
            };

            const reviewData = await reviews.create(reviewDoc);
            
            return await UsersDAO.addReviewIdAndRestaurantId(userEmail, reviewData._id.toString(), restaurantId)
        }
        catch(e){
            console.error(`Unable to post review: ${e}`);
            return {error: e};
        }
    }

    static async updateReview(reviewId, userEmail, text, date){
        try{
            const updateResponse = await reviews.updateOne(
                {email: userEmail, _id: new generate.ObjectId(reviewId)},
                {$set: {text: text, date: date}}
            );

            return updateResponse;
        }
        catch(e){
            console.error(`Unable to update review: ${e}`);
            return {error: e};
        }
    }

    static async deleteReview(reviewId, userEmail){
        try{
            const deleteResponse = await reviews.deleteOne({
                _id: new generate.ObjectId(reviewId),
                email: userEmail 
            })
            
            const deleteFromUser = await UsersDAO.deleteReviewIdAndRestaurantId(userEmail, reviewId);

            return deleteResponse && deleteFromUser;
        }
        catch(e){
            console.error(`Unable to delete review: ${e}`);
            return {error: e};
        }
    }
}