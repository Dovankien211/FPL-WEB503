import bcrypt from "bcryptjs";
import User from "../models/user.js";

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
