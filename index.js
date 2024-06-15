import express from "express";
import cookieParser from "cookie-parser";
import path from "path";
import db from "./config/mongoose-connection.js";
import ownersRouter from "./routes/ownersRouter.js"
import usersRouter from "./routes/usersRouter.js"
import productsRouter from "./routes/productsRouter.js"

const app = express();
const port = 3000;

app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(cookieParser());
app.use(express.static("public"));
app.set("view engine", "ejs");

app.use("/owners", ownersRouter);
app.use("/users", usersRouter);
app.use("/products", productsRouter);

app.get("/", (req, res) => {
    res.send("hello");
})

app.listen(port, ()=> {
    console.log("app listening to the port " + port);
})



