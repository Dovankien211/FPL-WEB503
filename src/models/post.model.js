import mongoose from "mongoose";

const postSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: [true, "Vui lòng nhập tiêu đề"],
            minlength: [3, "Tiêu đề phải có ít nhất 3 ký tự"],
            maxlength: [100, "Tiêu đề không được vượt quá 100 ký tự"],
        },
        content: {
            type: String,
            required: [true, "Vui lòng nhập nội dung"],
        },
    },
    { timestamps: true, versionKey: false }
);

const Post = mongoose.model("Post", postSchema);
export default Post;
