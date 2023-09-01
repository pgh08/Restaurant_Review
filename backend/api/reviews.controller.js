import UsersDAO from "../dao/UserDAO.js";
import ReviewsDAO from "../dao/reviewsDAO.js";

export default class ReviewsController{
    static async apiPostReview(req, res, next){
        try{
            const restaurantId = req.body.restaurant_id;
            const review = req.body.text;
            const userEmail = req.body.email;
            const userName = req.body.name;
            const date = new Date();

            const reviewPresent = await UsersDAO.checkReviewPresent(userEmail, restaurantId);

            if(reviewPresent.status){
                const ReviewResponse = await ReviewsDAO.addReview(
                    restaurantId,
                    userEmail,
                    review,
                    date,
                    userName
                );
                return res.json({status: 'success', msg: 'Your review is successfully added'});
            }
            else{
                reviewPresent.status = 'danger';
                return res.json(reviewPresent);
            }
        }
        catch(e){
            return res.status(500).json({msg: 'Review Addition api failed', error: e.message});
        }
    }

    static async apiUpdateReview(req, res, next){
        try{
            const reviewId = req.body.review_id;
            const text = req.body.text;
            const userEmail = req.body.email;
            const date = new Date();
            
            const reviewResponse = await ReviewsDAO.updateReview(
                reviewId,
                userEmail,
                text,
                date
            );

            var {error} = reviewResponse;
            if(error){
                res.status(400).json({error});
            }

            if(reviewResponse.modifiedCount === 0){
                throw new Error(
                    "Unable to update review - user may not be original poster"
                )
            }

            res.json({status: "success", msg: "Your review is successfully updated"});
        }
        catch(e){
            res.status(500).json({error: e.message});
        }
    }

    static async apiDeleteReview(req, res, next){
        try{
            const reviewId = req.query.id;
            const userEmail = req.body.email;

            const reviewResponse = await ReviewsDAO.deleteReview(
                reviewId,
                userEmail
            );

            res.json({status: "success", msg: "Review deleted Successfully"});
        }
        catch(e){
            res.status(500).json({error: e.message});
        }
    }
}