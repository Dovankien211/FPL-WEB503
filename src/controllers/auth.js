import User from "../models/user";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export const signup = async (req, res) => {
    try {
        // lấy dữ liệu từ client (name, email, password) gửi lên => req.body
        const { name, email, password } = req.body;
        // mã hóa mật khẩu => bcryptjs
        const hashedPassword = await bcrypt.hash(password, 10);
        // lưu dữ liệu vào database => User
        const user = await User.create({ name, email, password: hashedPassword });
        user.password = undefined;
        // trả về client thông tin user sau khi đăng ký thành công
        return res.status(201).json({
            message: "Đăng ký thành công",
            user,
        });
    } catch (error) {
        return res.status(400).json({ error: "Lỗi khi đăng ký", message: error.message });
    }
};

export const signin = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email }).select("+password");
        if (!user) {
            return res.status(400).json({
                message: "Email không tồn tại",
            });
        }
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch)
            return res.status(400).json({
                message: "Mật khẩu không đúng!",
            });
        const token = jwt.sign({ id: user._id }, "123456", { expiresIn: "1h" });
        return res.status(200).json({
            message: "Đăng nhập thành công",
            token,
        });
    } catch (error) {
        return res.status(400).json({ error: "Lỗi khi đăng nhập", message: error.message });
    }
};
