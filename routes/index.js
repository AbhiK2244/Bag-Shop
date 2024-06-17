import express from "express";
import isLoggedIn from "../middlewares/isLoggedIn.js";
import productModel from "../models/product-model.js";

const router = express.Router();

router.get("/", (req, res) => {
    let error = req.flash("error");
    res.render("index", {error});
});

router.get("/shop", isLoggedIn, async (req, res) => {
    try{
        const products = await productModel.find();
        res.render("shop", {products});
    } catch(err) {
        res.send(err.message);
    }
});

router.get("/logout", isLoggedIn, (req, res) => {
    res.render("shop", {products: []});
});

export default router;