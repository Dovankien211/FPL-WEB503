import bcrypt from "bcryptjs";
import User from "../models/user";
import jwt from "jsonwebtoken";

export const signup = async (req, res) => {
    const { name, email, password, phone, role } = req.body;

    try {
        // Mã hóa mật khẩu
        const hashedPassword = await bcrypt.hash(password, 10);

        // Lưu người dùng vào cơ sở dữ liệu
        const user = await User.create({ name, email, password: hashedPassword, phone, role });

        res.status(201).json({ message: "User registered successfully", data: user });
    } catch (err) {
        res.status(400).json({ message: "Error registering user", error: err.message });
    }
};

export const signin = async (req, res) => {
    const { email, password } = req.body;

    try {
        // Tìm người dùng
        const user = await User.findOne({ email }).select("+password");
        if (!user) return res.status(401).json({ message: "Email không tồn tại!" });

        // Kiểm tra mật khẩu
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) return res.status(401).json({ message: "Sai mật khẩu!" });

        // Tạo JWT
        const token = jwt.sign({ email: user.email, role: user.role }, "123456", {
            expiresIn: "1h",
        });

        res.json({ token });
    } catch (err) {
        res.status(400).json({ message: "Error logging in", error: err.message });
    }
};
