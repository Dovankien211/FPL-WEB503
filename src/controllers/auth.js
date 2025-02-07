import Joi from "joi";
import bcrypt from "bcryptjs";
import User from "../models/user";

const userSchema = Joi.object({
    username: Joi.string().required().min(6),
    email: Joi.string().required().email().trim(),
    password: Joi.string().required().min(6),
    confirmPassword: Joi.string().required().valid(Joi.ref("password")),
});

export const signup = async (req, res) => {
    try {
        const { error, value } = userSchema.validate(req.body, {
            abortEarly: false,
            convert: false,
        });
        if (error) {
            const errors = error.details.map((error) => error.message);
            return res.status(400).json(errors);
        }
        const existUser = await User.findOne({ email: value.email });
        if (existUser) {
            return res.status(400).json({
                message: "Tài khoản đã tồn tại",
            });
        }

        const hashedPassword = await bcrypt.hash(value.password, 10);
        const user = await User.create({ ...value, password: hashedPassword });
        user.password = undefined;
        return res.status(201).json(user);
    } catch (error) {
        return res.status(500).json({
            message: error.message,
        });
    }
};
/**
 * B1: Lấy thông tin từ req.body: username, email, password
 *     - Kiểm tra username: required, string, min: 6
 *     - Kiểm tra email: required, string, email
 *     - Kiểm tra password: required, string, min: 6
 *     - Confirm password: required, string, min: 6, trùng với password
 * B2: Kiểm tra email đã tồn tại chưa
 * B3: Nếu có thì trả về lỗi email đã tồn tại
 * B4: Nếu chưa thì tạo mới user với thông tin từ req.body
 *     - Mã hóa password từ req.body
 *     - Lưu thông tin vào database
 */
