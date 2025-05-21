import mongoose from "mongoose";

const postSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: [true, "Tiêu đề bắt buộc phải có!"],
        },
        content: {
            type: String,
            required: [true, "Nội dung bắt buộc phải có!"],
        },
    },
    {
        timestamps: true,
        versionKey: false,
    }
);

const Post = mongoose.model("Post", postSchema);
export default Post;
