import express from "express";
import ownerModel from "../models/owner-model.js";

// ./ means current directory and ../ means parent directory

const app = express();

const router = express.Router();

if(process.env.NODE_ENV === "development")
{
    router.post("/create", async (req, res) => {
        let owners = await ownerModel.find();
        console.log(owners);
        if(owners.length > 0){
            return res.status(503).send("You don't have permission to create a new owner.");
        }
        
        let {fullname, email, password} = req.body;
        let createdOwner = await ownerModel.create({
            fullname,
            email,
            password,
        })
        res.status(201).send(createdOwner);
    })

}


router.get("/admin", (req, res) => {
    let success = req.flash("success");
    res.render("createproducts",{success})
})

export default router;