import express from "express";
import {registerUser, loginUser, logoutUser} from "../controllers/authController.js";


const app = express();
const saltRound = 10;

const router = express.Router();

router.get("/", (req, res) => {
    res.send("inside users router")
})

router.post("/register", registerUser);

router.post("/login", loginUser);

router.get("/logout", logoutUser);


export default router;
































// import userModel from "../models/user-model.js";
// import bcrypt from "bcrypt";
// import jwt from "jsonwebtoken";
// import generateToken from "../utils/generateToken.js";



// (req, res) => {
//     try{
//         let {fullname, email, password} = req.body;

//         bcrypt.genSalt(saltRound, (err, salt) => {
//             if(err) console.log(err.message);
//             else
//             {
//                 bcrypt.hash(password, salt, async (err, hash) => {
//                     if(err) return res.send(err.message);
//                     else
//                     {
//                         let user = await userModel.create({
//                             fullname,
//                             email,
//                             password: hash,
//                         });

//                         let token = generateToken(user);
//                         res.cookie("token", token); //client ke browser be cookie set hoga
//                         res.send("user created successfully");
//                     }
//                 })
//             }
//         })


//         // res.send(user);
//     } catch(err) {
//         res.send(err.message);
//     }
// }