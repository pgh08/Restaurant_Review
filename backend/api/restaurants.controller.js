import RestaurantsDAO from "../dao/restaurantsDAO.js";

export default class RestaurantsController{
    static async apiGetRestaurants(req, res, next){
        const restaurantsPerPage = 18;
        const page = req.query.page ? parseInt(req.query.page, 10) : 1;

        let filters = {};
        if(req.query.cuisine){
            filters.cuisine = req.query.cuisine;
        }
        else if(req.query.zipcode){
            filters.zipcode = req.query.zipcode;
        }
        else if(req.query.name){
            filters.name = req.query.name;
        }
        
        const data = await RestaurantsDAO.getRestaurants(filters, page-1, restaurantsPerPage);
        
        let response = {
            restaurants: data.restaurantsList,
            page: page,
            filters: filters,
            entries_per_page: restaurantsPerPage,
            total_results: data.totalNumRestaurants
        }
        res.json(response);
    }

    static async apiGetRestaurantById(req, res, next){
        try{
            let id = req.params.id || {};
            let restaurant = await RestaurantsDAO.getRestaurantByID(id);

            if(!restaurant){
                res.status(404).json({error: "Not found"});
                return;
            }
            res.json({restaurant});
        }
        catch(e){
            console.log(`api failed, ${e}`);
            res.status(500).json({error: e});
        }
    }

    static async apiGetRestaurantCuisines(req, res, next){
        try{
            let cuisines = await RestaurantsDAO.getCuisines();
            res.json(cuisines);
        }
        catch(e){
            console.log(`api failed, ${e}`);
            res.status(500).json({error: e});
        }
    }
}