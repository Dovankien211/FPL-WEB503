import User from "../models/user";
import bcrypt from "bcryptjs";

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
        res.status(400).json({ error: "Lỗi khi đăng ký", message: error.message });
    }
};
