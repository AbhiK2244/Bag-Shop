import jwt from "jsonwebtoken";
import ownerModel from "../models/owner-model.js";



//work of this middleware is to authenticate the owner if it is already registered in the database or not
//whether they are authorized to visit shop page or not
const isOwnerLoggedIn = async (req, res, next) => {

    if(!req.cookies.ownertoken)
    {
        req.flash("error", "you need to login first");
        return res.redirect("/owners");
    }

    try{
        let decoded = jwt.verify(req.cookies.ownertoken, process.env.JWT_KEY);
        let owner = await ownerModel.findOne({email: decoded.email}).select("-password");   //select owner's all data except her/his password

        req.owner = owner;    // req me owner naam ki property assign karke owner ke value rakhdega
        next();
    } catch(err) { 
        req.flash("error", "something went wrong");
        res.redirect("/owners");
    }

}

export default isOwnerLoggedIn;