import express from "express";
import cookieParser from "cookie-parser";
import path from "path";
import db from "./config/mongoose-connection.js";
import ownersRouter from "./routes/ownersRouter.js"
import usersRouter from "./routes/usersRouter.js"
import productsRouter from "./routes/productsRouter.js"
import indexRouter from "./routes/index.js"
import env from "dotenv";
import expressSession from "express-session";
import flash from "connect-flash";

const app = express();
const port = 3000;

env.config();


app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(cookieParser());
app.use(
    expressSession({
        resave: false,
        saveUninitialized: false,
        secret: process.env.EXPRESS_SESSION_SECRET
    })
);
app.use(flash()); 

app.use(express.static("public"));
app.set("view engine", "ejs");

app.use("/", indexRouter);
app.use("/owners", ownersRouter);
app.use("/users", usersRouter);
app.use("/products", productsRouter);

// console.log(process.env.NODE_ENV)


app.listen(port, ()=> {
    console.log("app listening to the port " + port);
})

