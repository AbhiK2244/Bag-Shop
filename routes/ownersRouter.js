import express from "express";
import ownerModel from "../models/owner-model.js";
import { registerOwner, loginOwner, logoutOwner } from "../controllers/ownerAuthController.js";
import flash from "connect-flash";


// ./ means current directory and ../ means parent directory

const app = express();
const saltRound = 10;

const router = express.Router();


router.get("/", (req, res) => {
    let error = req.flash("error");
    res.render("owner-login", {error, mode: "Register", status: "inline"});
});

router.get("/login", (req, res) => {
    let error = req.flash("error");
    res.render("owner-login", {error, mode: "Login", status: "hidden"});
});

router.post("/create", registerOwner);

router.post("/authorization", loginOwner);


router.post("/admin", (req, res) => {
  let success = req.flash("success");
  res.render("createproducts", { success });
});

router.get("/logout", logoutOwner)

export default router;

// router.post("/create", async (req, res) => {
//   let owners = await ownerModel.find();
//   console.log(owners);
//   if (owners.length > 0) {
//     return res
//       .status(503)
//       .send("You don't have permission to create a new owner.");
//   }

//   let { fullname, email, password } = req.body;
//   let createdOwner = await ownerModel.create({
//     fullname,
//     email,
//     password,
//   });
//   res.status(201).send(createdOwner);
// });