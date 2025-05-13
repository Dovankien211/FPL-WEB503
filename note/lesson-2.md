# Buổi 2: Thực hành xây dựng API Node.js/Express – Hiểu về Request/Response & CRUD với dữ liệu giả

## Mục tiêu

-   Tự tay khởi tạo dự án Node.js/Express, cấu hình Babel, tổ chức code khoa học.
-   Hiểu rõ khái niệm Request và Response trong Express, biết cách lấy dữ liệu từ server và trả kết quả về client.
-   Thực hành CRUD với mảng dữ liệu giả, sử dụng các hàm JavaScript như `map`, `filter`, `find`, spread operator (`...`).

---

## 1. Thực hành ôn tập bài 1 (Checklist)

-   [ ] Khởi tạo thư mục dự án mới (ví dụ: `WD20104-API`)
-   [ ] Khởi tạo Node.js project với `pnpm init -y`
-   [ ] Cài đặt các thư viện: express, mongoose, cors, bcryptjs, jsonwebtoken, dotenv, morgan
-   [ ] Cài đặt Babel và nodemon cho môi trường phát triển
-   [ ] Tạo file `.babelrc` cấu hình preset-env
-   [ ] Tạo cấu trúc thư mục như sau:
    ```
    src/
      app.js
      routers/
        index.js
        posts.js
    .babelrc
    .env
    .gitignore
    ```
-   [ ] Viết mã nguồn cho `src/app.js` để khởi tạo server Express, sử dụng dotenv, import router
-   [ ] Viết mã nguồn cho `src/routers/index.js` và `src/routers/posts.js` (tách router như bài 1)
-   [ ] Chạy thử dự án với `pnpm run dev` và kiểm tra endpoint `/api/posts` bằng Postman

---

## 2. Tổng quan về Request và Response trong Express

Trước khi thực hành CRUD, các em cần hiểu rõ hai khái niệm quan trọng khi làm việc với API:

**Request (Yêu cầu):** Là thông tin mà client (trình duyệt, Postman, ứng dụng di động...) gửi lên server. Trong Express, đối tượng này là `req`.

-   Một số thuộc tính thường dùng:

    -   `req.body`: Dữ liệu gửi lên từ client (thường dùng với POST, PUT)
    -   `req.params`: Tham số động trên URL (ví dụ: `/posts/:id`)
    -   `req.query`: Tham số truy vấn trên URL (ví dụ: `/posts?search=abc`)

    **Response (Phản hồi):** Là thông tin mà server trả về cho client. Trong Express, đối tượng này là `res`.

-   Một số phương thức thường dùng:
    -   `res.json(data)`: Trả về dữ liệu dạng JSON
    -   `res.send(data)`: Trả về dữ liệu dạng text hoặc HTML
    -   `res.status(code)`: Thiết lập mã trạng thái HTTP (ví dụ: 200, 404, 500...)

#### Ví dụ minh họa:

```js
// GET /hello?name=Teo
router.get("/hello", (req, res) => {
    const name = req.query.name || "bạn";
    res.send(`Xin chào, ${name}!`);
});

// GET /posts/123
router.get("/posts/:id", (req, res) => {
    const id = req.params.id;
    res.json({ id, message: "Chi tiết bài viết" });
});

// POST /posts (body: { title, content })
router.post("/posts", (req, res) => {
    const { title, content } = req.body;
    res.json({ title, content, message: "Đã nhận dữ liệu từ client" });
});
```

---

## 3.Thực hành CRUD với mảng fake và các hàm JS

Trong giai đoạn đầu học Node.js/Express, hãy thực hành CRUD (Create, Read, Update, Delete) với một mảng dữ liệu giả (fake array) trong file code, sử dụng các hàm JavaScript như `map`, `filter`, `find`, spread operator (`...`).

-   Giúp hiểu rõ bản chất thao tác dữ liệu (thêm, sửa, xóa, tìm kiếm) trước khi làm việc với database thật.
-   Không cần cài đặt database phức tạp, tập trung vào luồng xử lý API.
-   Khi chuyển sang database (MongoDB, MySQL...), chỉ cần thay các thao tác mảng bằng thao tác với DB.

**Yêu cầu:**

-   [ ] Thêm endpoint mới: `GET /api/posts/:id` trả về chi tiết một bài viết (dữ liệu mẫu tự tạo)
-   [ ] Thêm endpoint `POST /api/posts` để thêm bài viết mới (dữ liệu lưu tạm trong mảng)
-   [ ] Thêm endpoint `DELETE /api/posts/:id` để xóa bài viết
-   [ ] Thêm endpoint `PUT /api/posts/:id` để cập nhật bài viết

> **Lưu ý:** Đây là dữ liệu tạm thời, chỉ dùng để học và test API.

#### Ví dụ minh họa:

```js
let posts = [
    { id: 1, title: "Bài viết 1", content: "Nội dung 1" },
    { id: 2, title: "Bài viết 2", content: "Nội dung 2" },
];

// GET all
router.get("/", (req, res) => res.json(posts));

// GET by id
router.get("/:id", (req, res) => {
    const post = posts.find((p) => p.id == req.params.id);
    res.json(post || {});
});

// POST
router.post("/", (req, res) => {
    const newPost = { id: Date.now(), ...req.body };
    posts.push(newPost);
    res.json(newPost);
});

// DELETE
router.delete("/:id", (req, res) => {
    posts = posts.filter((p) => p.id != req.params.id);
    res.json({ success: true });
});
```

## 3. Gợi ý thực hiện

-   Có thể sử dụng ChatGPT để sinh ra mảng dữ liệu bài viết mẫu (title, content, author, id, ...), sau đó copy vào file code.
-   Có thể tham khảo lại code mẫu ở buổi 1 hoặc tài liệu chính thức của Express.
-   Nếu gặp lỗi, hãy đọc kỹ thông báo lỗi, thử tìm kiếm trên Google hoặc hỏi bạn bè/thầy giáo.
-   Đặt tên biến, hàm, file rõ ràng, dễ hiểu.
-   Sau khi hoàn thành, chụp màn hình kết quả test API trên Postman để nộp bài.

---

## 4. Đánh giá

-   Hoàn thành checklist cơ bản: 7 điểm
-   Làm thêm phần nâng cao: tối đa 3 điểm thưởng
-   Đặt câu hỏi, thảo luận, chia sẻ kinh nghiệm: cộng điểm tích cực

---

Chúc các em thực hành vui vẻ, chủ động sáng tạo và biết tận dụng AI để tăng hiệu quả học tập! 🚀
