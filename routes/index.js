import express from "express";
import isLoggedIn from "../middlewares/isLoggedIn.js";
import isOwnerLoggedIn from "../middlewares/isOwnerLoggedIn.js";
import productModel from "../models/product-model.js";
import userModel from "../models/user-model.js";

const router = express.Router();

router.get("/", (req, res) => {
    let error = req.flash("error");
    res.render("index", {error, loggedin: false});
});

router.get("/shop", isLoggedIn, async (req, res) => {
    try{
        const products = await productModel.find();
        let success = req.flash("success");
        res.render("shop", {products, success});
    } catch(err) {
        res.send(err.message);
    }
});

router.get("/cart", isLoggedIn, async (req, res) => {
    try{
        let user = await userModel.findOne({email: req.user.email}).populate("cart");

        const bill = Number(user.cart[0].price) + 20 - Number(user.cart[0].discount);

        res.render("cart", {user, bill});
    } catch(err) {
        res.send(err.message);
    }
});

router.get("/addtocart/:productId", isLoggedIn, async (req, res) => {
    // res.send(req.params.id);
    try{
        let user = await userModel.findOne({email: req.user.email});
        user.cart.push(req.params.productId);
        await user.save();
        req.flash("success", "Added to cart")
        res.redirect("/shop");
    } catch(err)
    {
        res.send(err.message);
    }
});

router.get("/logout", isLoggedIn, (req, res) => {
    res.render("shop", {products: []});
});

router.get("/admin", isOwnerLoggedIn, (req, res) => {
    let success = req.flash("success");
  res.render("createproducts", { success });
})

export default router;