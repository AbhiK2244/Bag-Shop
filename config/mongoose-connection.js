import mongoose from "mongoose";

mongoose.connect("mongodb://127.0.0.1:27017/scatch").then(() => {
    console.log("database connected successfully");
}).catch((err)=>{
    console.log("Error:  " + err);
});

export default mongoose.connection;