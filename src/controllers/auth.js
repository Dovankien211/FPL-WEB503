import User from "../models/user";
import bcryptjs from "bcryptjs";

export const signup = async (req, res) => {
    try {
        const { name, email, password } = req.body;
        const hashedPassword = await bcryptjs.hash(password, 10);

        const user = await User.create({ name, email, password: hashedPassword });
        return res.status(201).json({
            success: true,
            message: "Đăng ký thành công",
            user,
        });
    } catch (error) {
        res.status(400).json({ error: "Lỗi khi đăng ký", message: error.message });
    }
};
