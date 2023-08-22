import express from "express";
import cors from "cors";
import restaurants from "./api/restaurants.route.js";

const app = express();

// Using the middlewares.
app.use(cors());
app.use(express.json());

// Routing the page.
app.use("/api/v1/restaurants", restaurants);
app.use("*", (req, res) => res.status(404).json({error : "Page not found"}));

export default app;