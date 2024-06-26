import mongoose from "mongoose";

const userSchema = mongoose.Schema({
    fullname : {
        type: String,
        minLength: 3,
        trim: true,
    },
    email : String,
    password: String,
    cart: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "products",
    }],
    orders: {
        type: Array,
        default: [],
    },
    contact: Number,
    picture: String,
});

export default mongoose.model("user", userSchema);