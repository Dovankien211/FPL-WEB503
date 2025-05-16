# Buổi 3: Thực hành CRUD với mảng dữ liệu giả trong Node.js/Express

## Mục tiêu

-   Hiểu rõ cách thực hiện các thao tác CRUD (Create, Read, Update, Delete) với dữ liệu giả.
-   Thực hành viết các endpoint API cơ bản.
-   Làm quen với cách xử lý lỗi và phản hồi trạng thái HTTP.
-   Chuẩn bị nền tảng để làm việc với cơ sở dữ liệu thực tế.

---

## 1. Yêu cầu thực hành

### Tạo mảng dữ liệu giả

Tạo một mảng dữ liệu giả để lưu trữ các bài viết. Mỗi bài viết có các thuộc tính sau:

-   `id`: số nguyên, định danh duy nhất.
-   `title`: chuỗi, tiêu đề bài viết.
-   `content`: chuỗi, nội dung bài viết.

Ví dụ:

```js
let posts = [
    { id: 1, title: "Bài viết 1", content: "Nội dung bài viết 1" },
    { id: 2, title: "Bài viết 2", content: "Nội dung bài viết 2" },
];
```

---

### Các endpoint cần thực hiện

1. **GET /api/posts**  
   Trả về danh sách tất cả bài viết.

2. **GET /api/posts/:id**  
   Trả về chi tiết bài viết theo `id`. Trả về 404 nếu không tìm thấy.

3. **POST /api/posts**  
   Thêm bài viết mới. Dữ liệu gửi lên từ client qua `req.body`.

4. **PUT /api/posts/:id**  
   Cập nhật bài viết theo `id`. Trả về 404 nếu không tìm thấy.

5. **DELETE /api/posts/:id**  
   Xóa bài viết theo `id`. Trả về 404 nếu không tìm thấy.

---

## 2. Hướng dẫn thực hành

### Khởi tạo router

**src/routers/posts.js**

```javascript
// filepath: /Users/ken/Folders/Training/FPL-WEB503/src/routers/posts.js
import express from "express";

const router = express.Router();

let posts = [
    { id: 1, title: "Bài viết 1", content: "Nội dung bài viết 1" },
    { id: 2, title: "Bài viết 2", content: "Nội dung bài viết 2" },
];

// GET /api/posts - Lấy danh sách bài viết
router.get("/", (req, res) => {
    res.json(posts);
});

// GET /api/posts/:id - Lấy chi tiết bài viết
router.get("/:id", (req, res) => {
    const post = posts.find((p) => p.id == req.params.id);
    if (!post) return res.status(404).json({ error: "Post not found" });
    res.json(post);
});

// POST /api/posts - Thêm bài viết mới
router.post("/", (req, res) => {
    const { title, content } = req.body;
    const newPost = { id: Date.now(), title, content };
    posts.push(newPost);
    res.status(201).json(newPost);
});

// PUT /api/posts/:id - Cập nhật bài viết
router.put("/:id", (req, res) => {
    const post = posts.find((p) => p.id == req.params.id);
    if (!post) return res.status(404).json({ error: "Post not found" });

    const { title, content } = req.body;
    post.title = title || post.title;
    post.content = content || post.content;

    res.json(post);
});

// DELETE /api/posts/:id - Xóa bài viết
router.delete("/:id", (req, res) => {
    const index = posts.findIndex((p) => p.id == req.params.id);
    if (index === -1) return res.status(404).json({ error: "Post not found" });

    posts.splice(index, 1);
    res.json({ success: true });
});

export default router;
```

---

### Tích hợp router vào ứng dụng

**src/app.js**

```javascript
// filepath: /Users/ken/Folders/Training/FPL-WEB503/src/app.js
import express from "express";
import dotenv from "dotenv";
import postsRouter from "./routers/posts";

dotenv.config();
const app = express();

app.use(express.json()); // Middleware để parse JSON
app.use("/api/posts", postsRouter);

app.listen(process.env.PORT, () => {
    console.log(`Server is running on port ${process.env.PORT}`);
});
```

---

## 3. Bài tập thực hành

1. **Xử lý lỗi:**

    - Trả về 400 nếu dữ liệu gửi lên khi thêm/sửa bài viết không hợp lệ (ví dụ: thiếu `title` hoặc `content`).
    - Trả về 404 nếu không tìm thấy bài viết khi cập nhật hoặc xóa.

2. **Phân trang:**

    - Thêm endpoint `GET /api/posts?page=1&limit=5` để trả về danh sách bài viết theo trang.

3. **Tìm kiếm:**

    - Thêm endpoint `GET /api/posts?search=keyword` để tìm kiếm bài viết theo tiêu đề.

4. **Middleware:**
    - Viết middleware để log thông tin request (method, URL, thời gian).

---

## 4. Tài liệu tham khảo

-   [Express.js Documentation](https://expressjs.com/)
-   [MDN Web Docs: HTTP Status Codes](https://developer.mozilla.org/en-US/docs/Web/HTTP/Status)
-   [JavaScript Array Methods](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array)
-   [Postman Documentation](https://learning.postman.com/docs/getting-started/introduction/)

---

Chúc các em thực hành vui vẻ và sáng tạo! 🚀
