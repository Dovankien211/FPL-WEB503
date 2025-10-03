import jwt from "jsonwebtoken";
import User from "../models/user.model";

export const verifyJWT = async (req, res, next) => {
    const token = req.headers.authorization?.split(" ")[1];
    if (!token) {
        return res.status(401).json({ error: "Không có token" });
    }
    const decoded = jwt.verify(token, "123456");
    const user = await User.findById(decoded.id);
    req.user = user;
    next();
};
export const restrictTo = (...roles) => {
    // ...roles => ["admin", "staff"]
    return (req, res, next) => {
        console.log("restrictTo", req.user);
        if (!roles.includes(req.user.role)) {
            return res.status(403).json({ message: "Mày không có quyền, cút!" });
        }
        next();
    };
};
