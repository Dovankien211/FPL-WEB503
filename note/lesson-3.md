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

## 3. Bài tập nâng cao

1. **Tìm kiếm:**

    - Thêm endpoint `GET /api/posts?search=keyword` để tìm kiếm bài viết theo tiêu đề.

    - Nếu có tham số `search`, trả về danh sách bài viết có tiêu đề chứa từ khóa tìm kiếm (không phân biệt hoa thường).
    - Nếu không có tham số `search`, trả về tất cả bài viết.
    - Nếu không tìm thấy bài viết nào, trả về danh sách rỗng.
    - Nếu có lỗi xảy ra, trả về mã trạng thái 500 và thông báo lỗi.
    - Nếu không có bài viết nào, trả về mã trạng thái 404 và thông báo lỗi.

    #### Gợi ý:

    ```javascript
    // GET /api/posts?search=keyword

    router.get("/", (req, res) => {
        try {
            const { search } = req.query;

            if (search) {
                const filteredPosts = posts.filter((post) =>
                    post.title.toLowerCase().includes(search.toLowerCase())
                );
                if (filteredPosts.length === 0) {
                    return res.status(404).json({ error: "No posts found" });
                }
                return res.json(filteredPosts);
            }

            if (posts.length === 0) {
                return res.status(404).json({ error: "No posts available" });
            }

            return res.json(posts);
        } catch (error) {
            return res.status(500).json({ error: "Server error", message: error.message });
        }
    });
    ```

---

## 4. Hướng dẫn tạo collections test API sử dụng Postman

### 4.1 Export file Postman

1. Mở Postman và chọn Collection mà bạn muốn export (ví dụ: `WD20105`).
2. Nhấn chuột phải vào Collection và chọn **Export**.
3. Chọn định dạng **Collection v2.1** (khuyến nghị) và nhấn **Export**.
4. Lưu file JSON vào thư mục dự án, ví dụ: `/Users/ken/Folders/Training/FPL-WEB503/note/WD20105.postman_collection.json`.

---

### 4.2 Sử dụng AI để tạo tài liệu từ file JSON

#### Gợi ý prompt để tạo tài liệu API từ file JSON:

<blockquote>Hãy tạo tài liệu API từ file JSON sau. File này chứa các endpoint CRUD cho bài viết, bao gồm các phương thức GET, POST, PUT, DELETE. Dưới đây là nội dung file JSON:</blockquote>

```json
{
    "info": {
        "name": "WD20105",
        "description": "Collection API CRUD cho bài viết",
        ...
    },
    "item": [
        {
            "name": "Lấy danh sách bài viết",
            "request": {
                "method": "GET",
                "url": "{{host}}/posts"
            },
            ...
        },
        {
            "name": "Thêm bài viết mới",
            "request": {
                "method": "POST",
                "url": "{{host}}/posts",
                "body": {
                    "mode": "raw",
                    "raw": "{ \"title\": \"Bài viết mới\", \"content\": \"Nội dung bài viết mới\" }"
                }
            },
            ...
        },
        ...
    ],
    "variable": [
        {
            "key": "host",
            "value": "http://localhost:8000/api"
        }
    ]
}
```

#### Kết quả mong đợi:

-   Tài liệu API được tạo từ file JSON, bao gồm:
    -   Tên endpoint.
    -   Phương thức HTTP (GET, POST, PUT, DELETE).
    -   URL endpoint.
    -   Mô tả dữ liệu gửi lên (nếu có).
    -   Mô tả dữ liệu trả về (nếu có).
    -   Biến môi trường `host` được thiết lập để dễ dàng thay đổi URL gốc.

---

### 4.3 Import file JSON vào Postman

1. Mở Postman và nhấn vào nút **Import** ở góc trên bên trái.
2. Chọn tab **File** và nhấn **Upload Files**.
3. Chọn file JSON đã export (ví dụ: `WD20105.postman_collection.json`) và nhấn **Open**.
4. Sau khi import thành công, bạn sẽ thấy Collection xuất hiện trong Postman.

---

### 4.4 Tạo tài liệu Markdown từ file JSON

...existing content...

---

Chúc các em học tốt! 🚀
