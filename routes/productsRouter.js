import express from "express";
import upload from "../config/multer-config.js";
import productModel from "../models/product-model.js";

const app = express();

const router = express.Router();

//image comes from the form and make sure the name attribute must match tha value given here i.e image
router.post("/create", upload.single("image"), async (req, res) => {
  try {
    const {name, price, discount, bgcolor, panelcolor, textcolor } =
      req.body;

    const product = await productModel.create({
      image: req.file.buffer,
      name,
      price,
      discount,
      bgcolor,
      panelcolor,
      textcolor,
    });
    req.flash("success", "product added successfully!")
    res.redirect("/owners/admin")
  } catch (err) {
    res.send(err.message);
  }

});

export default router;
