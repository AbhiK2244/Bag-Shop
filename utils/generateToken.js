import jwt from "jsonwebtoken";
import env from "dotenv";

env.config();

const generateToken = (user) => {
    return jwt.sign({ email: user.email, id: user._id }, process.env.JWT_KEY, {expiresIn: "2h"});
}

export default generateToken;