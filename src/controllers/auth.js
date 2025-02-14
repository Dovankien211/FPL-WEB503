import User from "../models/user";
import Joi from "joi";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
const signupSchema = Joi.object({
    username: Joi.string().min(3),
    email: Joi.string().email().trim().required(),
    phone: Joi.number(),
    password: Joi.string().required().min(6),
    confirmPassword: Joi.string().required().min(6).valid(Joi.ref("password")),
});
const signinSchema = Joi.object({
    email: Joi.string().email().trim().required(),
    password: Joi.string().required().min(6),
});
export const signup = async (req, res) => {
    try {
        const { error, value } = signupSchema.validate(req.body, {
            abortEarly: false,
        });
        if (error) {
            const errors = error.details.map((err) => err.message);
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
        return res.status(201).json({
            message: "Đăng ký thành công",
            user,
        });
    } catch (error) {
        return res.status(400).json({
            messages: error.message,
        });
    }
};
export const signin = async (req, res) => {
    try {
        const { error, value } = signinSchema.validate(req.body, {
            abortEarly: false,
        });
        if (error) {
            const errors = error.details.map((err) => err.message);
            return res.status(400).json(errors);
        }
        const user = await User.findOne({ email: value.email });
        if (!user) {
            return res.status(400).json({
                message: "Tài khoản không tồn tại",
            });
        }
        const isMatchPassword = await bcrypt.compare(value.password, user.password);
        if (!isMatchPassword) {
            return res.status(400).json({
                message: "Sai mật khẩu",
            });
        }
        const token = jwt.sign({ id: user._id }, "123456", { expiresIn: "1h" });
        console.log("token", token);
        user.password = undefined;
        return res.status(200).json({
            message: "Đăng nhập thành công",
            user,
            token,
        });
    } catch (error) {}
};
/**
 * Bước 1: Sử dụng Joi để validate đầu vào
 *  - username: string, minLength = 3
 *  - email: string, required, email, trim
 *  - password: string, minLength = 6, required
 *  - confirmPassword: string, required, minLength = 6, ref: password
 *  - phone: number
 *  - trả về nhiều lỗi
 * Bước 2: Kiểm tra email nếu email đã tồn tại, trả về lỗi
 * Bước 3: Nếu email chưa tồn tại, tạo user mới
 *  - Mã hóa mật khẩu trước khi lưu vào database ( sử dụng thư viện bcryptjs )
 * Bước 4: Trả về thông tin user đã tạo
 *  - Trả về id, email, username ( + token )
 *  - Không được trả về mật khẩu
 */

/**
 * B1: Validate dữ liệu đầu vào : signinSchema
 * B2: Kiểm tra email nếu email không tồn tại, trả về lỗi
 * B3: Nếu tồn tại thì so sánh mật khẩu client gửi lên và mật khẩu trong db có khớp không?
 *  - bcrypt.compare(password, user.password)
 * B4: Nếu không khớp, trả về lỗi
 * B5: trả về client thông tin user: username, email, role, token
 *
 */
