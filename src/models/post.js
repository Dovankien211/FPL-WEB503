import mongoose from "mongoose";
const postSchema = new mongoose.Schema({
    title: {type: String, required: true},
    content: {type: String, required: true},
    author: {type: String, required: true},
    createAt: {type: Date, default: Date.now},
});
export default mongoose.model("Post", postSchema);