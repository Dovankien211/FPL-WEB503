import User from "../models/user.model";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";

export const signup = async (req, res) => {
    const { name, email, password } = req.body;
    try {
        const existUser = await User.findOne({ email });
        if (existUser) {
            return res.status(400).json({
                message: "Tài khoản đã tồn tại!",
            });
        }
        const hashedPassword = await bcryptjs.hash(password, 10);
        const user = await User.create({ name, email, password: hashedPassword });
        user.password = undefined;
        return res.status(201).json({
            message: "User created successfully",
            user,
        });
    } catch (error) {
        return res.status(500).json({
            message: error.message,
        });
    }
};
export const signin = async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(401).json({
                message: "Tài khoản không tồn tại!",
            });
        }

        const isMatchPassword = await bcryptjs.compare(password, user.password);
        if (!isMatchPassword) {
            return res.status(400).json({
                message: "Mật khẩu không chính xác!",
            });
        }
        const token = jwt.sign({ id: user._id }, "123456", { expiresIn: "1h" });
        user.password = undefined;
        return res.json({
            token,
            user,
        });
    } catch (error) {}
};
