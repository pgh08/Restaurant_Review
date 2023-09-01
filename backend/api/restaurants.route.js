import express from "express";
import restaurantsCtrl from "./restaurants.controller.js";
import ReviewsCtrl from "./reviews.controller.js";
import UserController from "./UserController.js";

const router = express.Router();

// Restaurants Route.

router.route("/").get(restaurantsCtrl.apiGetRestaurants);
router.route("/id/:id").get(restaurantsCtrl.apiGetRestaurantById);
router.route("/cuisines").get(restaurantsCtrl.apiGetRestaurantCuisines);

// Review Routes.
router
    .route("/review")
    .post(ReviewsCtrl.apiPostReview)
    .put(ReviewsCtrl.apiUpdateReview)
    .delete(ReviewsCtrl.apiDeleteReview);

// Registration Routes.
router
    .route("/register")
    .post(UserController.apiRegisterUser);

// Login Routes.
router
    .route("/login")
    .post(UserController.apiLoginUser);

// Dashboard.
router.route("/dashboard").post(UserController.apiUserDashboard);

export default router;