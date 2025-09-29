import User from "../models/user.model";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";

export const signup = async (req, res) => {
    try {
        const { name, email, password, phone, role, addresses, avatar } = req.body;
        // validate
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ error: "Email đã tồn tại" });
        }
        const hashedPassword = await bcryptjs.hash(password, 10);
        const user = await User.create({
            name,
            email,
            password: hashedPassword,
            phone,
            role,
            addresses,
            avatar,
        });

        user.password = undefined;

        return res.status(201).json(user);
    } catch (error) {
        return res.status(400).json({ error: error.message });
    }
};

export const signin = async (req, res) => {
    try {
        const { email, password } = req.body;
        // validate
        const user = await User.findOne({ email }).select("+password");
        if (!user) {
            return res.status(400).json({ error: "Tài khoản không tồn tại" });
        }
        const isMatch = await bcryptjs.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ error: "Mật khẩu không chính xác" });
        }
        const token = jwt.sign({ id: user._id }, "123456", { expiresIn: "1h" });

        user.password = undefined;

        return res.status(201).json({
            token,
            user,
        });
    } catch (error) {
        return res.status(400).json({ error: error.message });
    }
};
