import User from "../models/user.model";
import bcryptjs from "bcryptjs";

export const signup = async (req, res) => {
    const { name, email, password } = req.body;
    try {
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
    try {
    } catch (error) {}
};
