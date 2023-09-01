import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import UsersDAO from "../dao/UserDAO.js";

export default class UserController{
    static async apiRegisterUser(req, res){
        try{
            const hashedUserPassword = await bcrypt.hash(req.body.password, 10);
            const userName = req.body.name;
            const userEmail = req.body.email;
            const newDate = new Date();
            
            const registerResponse = await UsersDAO.registerUser(userName, userEmail, hashedUserPassword, '', '', newDate);

            if(registerResponse.status){
                return res.json({status: 'success', msg: 'User registration successful'});
            }
            else{
                return res.json({status: 'danger', msg: 'User already exists please login'});
            }
        }
        catch(e){
            console.log(`Registration api failed : ${e}`);
            return res.status(500).json({error: e.message});
        }
    }

    static async apiLoginUser(req, res){
        try{
            const userEmail = req.body.email;

            const loginResponse = await UsersDAO.loginUser(userEmail);
    
            if(!loginResponse){
                return res.json({status: 'danger', msg: "User not found please register", userToken: null});
            }
    
            // Validation of Hashed Password.
            const isValidPassword = await bcrypt.compare(req.body.password, loginResponse.password);
    
            // JWT sign.
            if(isValidPassword){
                const token = jwt.sign({
                    name: loginResponse.name,
                    email: loginResponse.email
                }, process.env.JWT_SECRET_KEY);
    
                return res.json({status: 'success', msg: 'Logged in successfully', userToken: token});
            }
            else{
                return res.json({status: 'danger', msg: 'Please enter the valid password', userToken: null});
            }
        }
        catch(e){
            console.log(`Login api failed : ${e}`);
            return res.status(500).json({error: e.messgage})
        }
    }

    static async apiUserDashboard(req, res){
        try{
            const userEmail = req.body.email;

            const dashboardResponse = await UsersDAO.dashboard(userEmail);

            if(dashboardResponse){
                return res.json({status: 'success', reviewArray: dashboardResponse.dashboard, msg: 'Your reviews are found'});
            }
            else{
                return res.json({status: 'danger', msg: "You don't have any reviews yet"});
            }
        }
        catch(e){
            console.log(`Dashboard api failed : ${e}`);
            return res.status(500).json({error: e.message});
        }
    }
}