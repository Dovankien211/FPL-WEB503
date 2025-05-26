# 🎯 Assignment 2 – Backend API Development with Node.js & MongoDB

## Dự án: Quản lý thư viện (Library Management System)

**Nhóm:** [Tên nhóm]  
**Thành viên:** [Tên thành viên 1], [Tên thành viên 2], [Tên thành viên 3]

---

## 📌 Mục tiêu

Xây dựng một hệ thống backend RESTful API bằng **Node.js + Express + MongoDB**, phục vụ quản lý thư viện nhỏ với các chức năng:

-   Đăng ký / Đăng nhập / Phân quyền người dùng
-   Quản lý sách và mượn/trả sách
-   Tìm kiếm sách theo tên, thể loại, tác giả
-   Tài liệu hóa API bằng Postman
-   Làm việc nhóm trong 2 tuần và thuyết trình bảo vệ

---

## 🔧 Yêu cầu kỹ thuật

-   **Node.js + Express**: Xây dựng server
-   **MongoDB (Mongoose ODM)**: Lưu trữ dữ liệu
-   **JWT**: Authentication & phân quyền
-   **Joi**: Validate input
-   **Bcrypt**: Mã hóa mật khẩu
-   **Postman**: Tài liệu hóa API với mô tả chi tiết từng endpoint
-   Tối thiểu 2 role: `admin`, `user`
-   CRUD đầy đủ trên ít nhất 3 bảng chính
-   Logic hợp lý, khuyến khích sáng tạo

---

## 📚 Chủ đề: Quản lý thư viện (Library Management System)

### ✅ Chức năng chính

-   Quản lý đầu sách: Thêm/sửa/xóa sách (tên sách, mô tả, năm xuất bản, nhà xuất bản, tác giả)
-   Quản lý người dùng (vai trò: admin và user)
-   Ghi nhận việc mượn sách: Ai mượn, sách nào, ngày mượn, ngày trả dự kiến, trạng thái đã trả hay chưa
-   Tìm kiếm sách theo tên, thể loại hoặc tác giả

---

## 📁 Cấu trúc database

### User

```js
{
  name: String,
  email: String,
  password: String,
  role: { type: String, enum: ['admin', 'user'] }
}
```

### Book

```js
{
  title: String,
  description: String,
  author: String,
  publisher: String,
  yearPublished: Number,
  category: String
}
```

### BorrowRecord

```js
{
  userId: ObjectId,
  bookId: ObjectId,
  borrowDate: Date,
  returnDate: Date,
  isReturned: Boolean
}
```

---

## 🔐 Phân quyền

| Chức năng                       | Admin | User |
| ------------------------------- | :---: | :--: |
| Đăng ký / Đăng nhập             |  ✅   |  ✅  |
| Xem danh sách sách              |  ✅   |  ✅  |
| Thêm / Sửa / Xóa sách           |  ✅   |  ❌  |
| Tìm kiếm sách theo tên/thể loại |  ✅   |  ✅  |
| Xem lịch sử mượn sách của mình  |  ❌   |  ✅  |
| Xem tất cả lịch sử mượn sách    |  ✅   |  ❌  |
| Tạo mới phiếu mượn sách         |  ❌   |  ✅  |
| Cập nhật trạng thái trả sách    |  ✅   |  ❌  |
| Xem thông tin cá nhân           |  ✅   |  ✅  |
| Cập nhật thông tin cá nhân      |  ✅   |  ✅  |

---

## 🛠️ Cách chạy dự án

1. **Clone repo**
    ```bash
    git clone https://github.com/[your-username]/library-management-system.git
    cd library-management-system
    ```
2. **Cài đặt dependencies**
    ```bash
    npm install
    ```
3. **Tạo file .env từ .env.example**
    ```env
    PORT=3000
    MONGO_URI=mongodb://localhost/librarydb
    JWT_SECRET=your_jwt_secret_key
    ```
4. **Chạy server**
    ```bash
    npm start
    ```
    API sẽ chạy tại: [http://localhost:3000](http://localhost:3000)

---

## 📄 Tài liệu API

Tài liệu Postman được chia rõ theo các nhóm endpoint:

-   **Auth**: `/api/auth/register`, `/api/auth/login`
-   **Books**: `/api/books`, `/api/books/:id`
-   **Borrow Records**: `/api/borrow`, `/api/borrow/:id`
-   **Users (chỉ admin)**: `/api/users`

> 🔗 **Link Postman Collection**: https://www.postman.com/collections/xxxxxx

---

## 👥 Phân chia công việc nhóm

-   **Nguyễn Văn A**: Xây dựng auth, middleware, user controller
-   **Trần Thị B**: Phát triển book controller, schema, validation
-   **Lê Văn C**: Triển khai borrow record, test API, tài liệu Postman

---

## 📊 Tiêu chí đánh giá

| Tiêu chí                                | Tỷ lệ |
| --------------------------------------- | :---: |
| Đầy đủ tính năng, đúng yêu cầu kỹ thuật |  40%  |
| Giao diện Postman rõ ràng, demo tốt     |  20%  |
| Code sạch, có tổ chức, logic hợp lý     |  20%  |
| Trình bày bảo vệ, teamwork, hiểu bài    |  20%  |

---

## 📞 Liên hệ

Nếu bạn cần hỗ trợ hoặc muốn xem demo trực tiếp, vui lòng liên hệ qua:

-   Email: yourgroup@email.com
-   GitHub: https://github.com/your-username
