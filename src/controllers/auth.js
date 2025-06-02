import bcrypt from "bcryptjs";
import User from "../models/user.js";
import jwt from "jsonwebtoken";

export const signup = async (req, res) => {
    const { name, email, password } = req.body;
    try {
        // Mã hóa mật khẩu
        const hashedPassword = await bcrypt.hash(password, 10);
        // Lưu người dùng vào cơ sở dữ liệu
        const user = await User.create({ name, email, password: hashedPassword });
        res.status(201).json({ message: "Đăng ký tài khoản thành công", data: user });
    } catch (err) {
        res.status(400).json({ message: "Đăng ký tài khoản thất bại", error: err.message });
    }
};
export const signin = async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await User.findOne({ email }).select("+password");
        if (!user) {
            return res.status(400).json({
                message: "Tài khoản không tồn tại!",
            });
        }
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({
                message: "Mật khẩu không đúng",
            });
        }

        const token = jwt.sign({ id: user._id }, "123456", { expiresIn: "5m" });
        user.password = undefined;
        res.status(200).json({ token, data: user });
    } catch (err) {
        res.status(400).json({ message: "Đăng ký tài khoản thất bại", error: err.message });
    }
};
