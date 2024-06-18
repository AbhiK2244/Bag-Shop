import ownerModel from "../models/owner-model.js";
import bcrypt from "bcrypt";
import generateToken from "../utils/generateToken.js";

const saltRound = 10;

const registerOwner = async (req, res) => {
    try{
        let {email, password} = req.body;
        //checking if owner has already registered or not
        let owner = await ownerModel.find();
        if(owner.length > 0){
            req.flash("error", "You don't have permission to register.");
            return res.redirect("/owners");
        }

        //generating the hash and registering the owner to database
        bcrypt.genSalt(saltRound, (err, salt) => {
            if(err) console.log(err.message);
            else
            {
                bcrypt.hash(password, salt, async (err, hash) => {
                    if(err) return res.send(err.message);
                    else
                    {
                        let owner = await ownerModel.create({
                            email,
                            password: hash,
                        });

                        let ownertoken = generateToken(owner);
                        res.cookie("ownertoken", ownertoken); //client ke browser pe cookie set hoga
                        res.redirect("/admin");
                    }
                })
            }
        })
        // res.send(owner);
    } catch(err) {
        res.send(err.message);
    }
};

const loginOwner = async (req, res) => {
    try{

        const {email, password} = req.body;
        
        let owner = await ownerModel.findOne({email : email});
        
        if(owner)
        {
            bcrypt.compare(password, owner.password, (err, valid) => {
                if(err) console.log("error comparing password");
                
                if(valid)
                {
                    let ownertoken = generateToken(owner);
                    res.cookie("ownertoken", ownertoken);
                    res.redirect("/admin");
                }
                else {
                    console.log(owner);
                    req.flash("error", "incorrect passowrd")
                    return res.redirect("/owners/login"); 
                }
            })
        }
        else {
            req.flash("error","User not found!")
            res.redirect("/owners/login");
        }
    } catch(err){
        res.send(err.message);
    }
    
};

const logoutOwner = (req, res) => {
    res.cookie("ownertoken", "");
    res.redirect("/");
}
export {registerOwner, loginOwner, logoutOwner};