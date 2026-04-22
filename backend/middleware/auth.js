import User from "../models/userModel.js";
import jwt from "jsonwebtoken";

const JWT_SECRET = 'enter_your_jwt_secret';

export default async function authMiddleware(req, res, next) {
    //grab the token
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
        return res.status(401).json({
            success: false,
            message: "Not authorize or token missing."
        });
    }

    const token = authHeader.split(" ")[1];

    // to varify the token
    try {
        const payload = jwt.verify(token, JWT_SECRET);
        const user = await User.findById(payload.id).select("-password");

        if (!user) {
            return res.status(400).json({
                success: false,
                message: "User not found."
            });
        }

        req.user = user;
        next();
    } catch (err) {
        console.log(err);
        return res.status(500).json({
            success: false,
            message: "Token invalid or expired."
        });
    }

}