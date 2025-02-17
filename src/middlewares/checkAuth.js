import jwt from "jsonwebtoken";
import User from "../models/user";
export const checkAuth = async (req, res, next) => {
    const token = req.header("Authorization")?.replace("Bearer ", "");
    if (!token) {
        return res.status(401).json({ message: "Không có token, quyền truy cập bị từ chối" });
    }
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECERT_KEY);
        if (!decoded) {
            return res.status(401).json({ message: "Token không hợp lệ" });
        }
        const user = await User.findById(decoded.id).select("-password");
        if (user.roles !== "admin") {
            return res.status(401).json({ message: "Bạn không có quyền truy cập" });
        }

        req.user = user;
        next();
    } catch (error) {
        return res.status(401).json({ message: error.message });
    }
};
