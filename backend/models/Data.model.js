import { Int32 } from "mongodb";
import mongoose, { Schema } from "mongoose";

const userSchema = new mongoose.Schema(
    {
        name: {type: String, required: true},
        email: {type: String, required: true, unique: true},
        password: {type: String, required: true},
        reviewsArray: [{
            review_id: {type: String},
            restaurant_id: {type: String},
            _id: false
        }],
        date: {type: Date, required: true}
    },
    {
        collection: 'User-Data'
    }
);

const User = mongoose.model('User-Data', userSchema);

const reviewsSchema = new mongoose.Schema(
    {
        email: {type: String, required: true},
        text: {type: String, required: true},
        date: {type: Date, required: true},
        restaurant_id: {type: String, required: true},
        name: {type: String, required: true}
    },
    {
        collection: 'reviews'
    }
);

const reviews = mongoose.model('reviews', reviewsSchema);

const restaurants = await mongoose.model('restaurants', mongoose.Schema({},{strict: false}), 'restaurants');

export default {
    User,
    reviews,
    restaurants
}