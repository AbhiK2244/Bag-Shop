import mongoose from "mongoose";
import debug from "debug";
import config from "config";
const dbgr = debug("development:mongoose");  //new

mongoose.connect(`${config.get("MONGOOSE_URI")}/scatch`).then(() => {
    dbgr("database connected successfully");
}).catch((err)=>{
    dbgr("Error:  " + err);
});

export default mongoose.connection;