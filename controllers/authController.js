import userModel from "../models/user-model.js";
import bcrypt from "bcrypt";
import generateToken from "../utils/generateToken.js";

const saltRound = 10;

const registerUser = async (req, res) => {
    try{
        let {fullname, email, password} = req.body;

        //checking if user has already registered or not
        let user = await userModel.findOne({email: email});
        if(user){
            req.flash("error", "You already have registered. Please login!");
            return res.redirect("/");
        }

        //generating the hash and registering the user to database
        bcrypt.genSalt(saltRound, (err, salt) => {
            if(err) console.log(err.message);
            else
            {
                bcrypt.hash(password, salt, async (err, hash) => {
                    if(err) return res.send(err.message);
                    else
                    {
                        let user = await userModel.create({
                            fullname,
                            email,
                            password: hash,
                        });

                        let token = generateToken(user);
                        res.cookie("token", token); //client ke browser pe cookie set hoga
                        res.send("user created successfully");
                    }
                })
            }
        })
        // res.send(user);
    } catch(err) {
        res.send(err.message);
    }
};

const loginUser = async (req, res) => {
    try{

        const {email, password} = req.body;
        
        let user = await userModel.findOne({email : email});
        
        if(user)
        {
            bcrypt.compare(password, user.password, (err, valid) => {
                if(err) console.log("error comparing password");
                
                if(valid)
                {
                    let token = generateToken(user);
                    res.cookie("token", token);
                    res.redirect("/shop");
                }
                else {
                    req.flash("error", "incorrect passowrd")
                    return res.redirect("/"); 
                }
            })
        }
        else {
            req.flash("error","User not fount!")
            return res.status(404).send("User Not Found!");
        }
    } catch(err){
        res.send(err.message);
    }
    
};

const logoutUser = (req, res) => {
    res.cookie("token", "");
    res.redirect("/");
}
export {registerUser, loginUser, logoutUser};