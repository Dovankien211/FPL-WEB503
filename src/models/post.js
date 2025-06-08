import mongoose from "mongoose";

const postSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: true,
        },
        content: {
            type: String,
            required: true,
        },
    },
    { timestamps: true, versionKey: false }
);
const Post = mongoose.model("Post", postSchema);
export default Post;

/**
🔸 Bài 1: Quản lý Bài viết và Bình luận

Yêu cầu:
	•	Mỗi bài viết có tiêu đề, nội dung, tác giả.
	•	Một bài có nhiều bình luận (người viết, nội dung, thời gian).

Câu hỏi:
	1.	Em chọn nhúng hay tham chiếu bình luận vào bài viết?
	2.	Nếu một bài có hàng ngàn bình luận thì xử lý thế nào?
⸻





🔸 Bài 2: Hệ thống Học trực tuyến

Yêu cầu:
	•	Mỗi học viên có thể đăng ký nhiều khóa học.
	•	Mỗi khóa học có thể có nhiều học viên.
	•	Mỗi khóa có giảng viên phụ trách.

Câu hỏi:
	1.	Xác định loại quan hệ giữa Học viên – Khóa học? n - n
	2.	Em chọn thiết kế lưu studentIds trong Course hay courseIds trong Student?
    Student {
        _id
        name
        email
    }
    Course {
        _id
        name
        description
        teacherId: Ref Teacher
    }

    StudentCourse {
        _id: ObjectId
        studentId: [ObjectId]
        courseId: [ObjectId]
    }
	3.	Cách tốt nhất để lưu giảng viên của khóa học?

Mục tiêu:
	•	Nhận biết Many-to-Many
	•	Biết khi nào nên có bảng trung gian (Enrollment)




🔸 Bài 3: Ứng dụng Đặt vé xem phim

Yêu cầu:
	•	Quản lý phim(Movie), suất chiếu(Showtime), người dùng(User).
	•	Người dùng đặt vé (gồm suất chiếu, ghế ngồi).

Câu hỏi:
	1.	Một suất chiếu có nhiều vé → lưu vé(Ticket) trong suất chiếu(Showtime) hay tách riêng?
	2.	Cần lấy danh sách ghế đã đặt → em truy vấn như nào?
	3.	Quan hệ giữa Booking(Ticket) – Showtime là gì?

Mục tiêu:
	•	Hiểu 1-n (Showtime – Booking)
	•	Tránh nhúng khi dữ liệu động, thường xuyên thay đổi


    🔸 Bài 4: Sản phẩm và Đánh giá

Yêu cầu:
	•	Người dùng có thể đánh giá sản phẩm
	•	Mỗi đánh giá có điểm số, nội dung, ngày đánh giá

Câu hỏi:
	1.	Nếu một sản phẩm có 10.000 lượt đánh giá, có nên nhúng không?
	2.	Nếu muốn truy vấn top sản phẩm theo đánh giá → cách thiết kế?

Mục tiêu:
	•	So sánh nhúng vs tham chiếu trong 1-rất nhiều
 */
