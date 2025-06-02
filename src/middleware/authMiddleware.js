import jwt from "jsonwebtoken";
import User from "../models/user";

export const verifyJWT = async (req, res, next) => {
    try {
        const token = req.headers.authorization.split(" ")[1];
        if (!token) return res.status(401).json({ message: "Access Denied" });
        const decoded = jwt.verify(token, "123456");
        const user = await User.findById(decoded.id);
        req.user = user;
        next();
    } catch (error) {
        return res.status(401).json({
            message: "Bạn chưa đăng nhập!",
        });
    }
};
export const restrictTo = (...roles) => {
    return (req, res, next) => {
        if (!roles.includes(req.user.role)) {
            return res.status(403).json({ message: "Access Denied" });
        }
        next();
    };
};
