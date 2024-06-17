import jwt from "jsonwebtoken";
import userModel from "../models/user-model.js";



//work of this middleware is to authenticate the user if it is already registered in the database or not
//whether they are authorized to visit shop page or not
const isLoggedIn = async (req, res, next) => {

    if(!req.cookies.token)
    {
        req.flash("error", "you need to login first");
        return res.redirect("/");
    }

    try{
        let decoded = jwt.verify(req.cookies.token, process.env.JWT_KEY);
        let user = await userModel.findOne({email: decoded.email}).select("-password");   //select user's all data except her/his password

        req.user = user;    // req me user naam ki property assign karke user ke value rakhdega
        next();
    } catch(err) { 
        req.flash("error", "something went wrong");
        res.redirect("/");
    }

}

export default isLoggedIn;