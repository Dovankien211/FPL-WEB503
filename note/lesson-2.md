# Buổi 2: Tổng quan về Request/Response và Middleware cơ bản trong Express

## Mục tiêu

-   Ôn tập và thực hành lại cài đặt từ buổi 1.
-   Hiểu rõ Request và Response trong Express, cách lấy và trả dữ liệu cơ bản.
-   Thực hành viết các endpoint đơn giản.
-   Làm quen với middleware cơ bản, chuẩn bị cho việc sử dụng phương thức POST.

---

## 1. Thực hành ôn tập buổi 1

### Các bước thực hiện

1. Tạo thư mục dự án mới (nếu chưa có).
2. Khởi tạo dự án Node.js:
    ```bash
    pnpm init -y
    ```
3. Cài đặt các thư viện cần thiết:
    ```bash
    pnpm i express dotenv
    ```
4. Cài đặt Babel và nodemon:
    ```bash
    pnpm i -D @babel/core @babel/node @babel/preset-env nodemon
    ```
5. Tạo file `.babelrc` với nội dung:
    ```json
    {
        "presets": ["@babel/preset-env"]
    }
    ```
6. Tạo cấu trúc thư mục:
    ```
    src/
      app.js
      routers/
        index.js
    .babelrc
    .env
    ```
7. Thêm script vào `package.json`:
    ```json
    "scripts": {
      "dev": "nodemon --exec babel-node src/app.js"
    }
    ```

---

## 2. Tổng quan về Request và Response trong Express

### Request (Yêu cầu)

Request là thông tin mà client gửi lên server. Trong Express, đối tượng này là `req`.

-   Một số thuộc tính thường dùng:
    -   `req.body`: Dữ liệu gửi từ client (thường dùng với POST, PUT).
    -   `req.params`: Tham số động trên URL (ví dụ: `/posts/:id`).
    -   `req.query`: Tham số truy vấn trên URL (ví dụ: `/posts?search=abc`).

### Response (Phản hồi)

Response là thông tin mà server trả về cho client. Trong Express, đối tượng này là `res`.

-   Một số phương thức thường dùng:
    -   `res.json(data)`: Trả về dữ liệu dạng JSON.
    -   `res.send(data)`: Trả về dữ liệu dạng text hoặc HTML.
    -   `res.status(code)`: Thiết lập mã trạng thái HTTP (ví dụ: 200, 404, 500...).

---

### Ví dụ minh họa

**src/routers/index.js**

```js
import { Router } from "express";

const router = Router();

// GET /hello?name=Teo
router.get("/hello", (req, res) => {
    const name = req.query.name || "bạn";
    res.json({ message: `Xin chào, ${name}!` });
});

// GET /posts/:id
router.get("/posts/:id", (req, res) => {
    const id = req.params.id;
    res.json({ id, message: "Chi tiết bài viết" });
});

// POST /posts
router.post("/posts", (req, res) => {
    const { title, content } = req.body;
    res.status(201).json({ title, content, message: "Bài viết đã được tạo" });
});

export default router;
```

**src/app.js**

```js
import express from "express";
import dotenv from "dotenv";
import router from "./routers";

dotenv.config();
const app = express();

app.use("/api", router);

app.listen(process.env.PORT || 3000, () => {
    console.log(`Server is running on port ${process.env.PORT || 3000}`);
});
```

---

## 3. Bài thực hành nhỏ

### Yêu cầu

1. Tạo endpoint `GET /api/greet` trả về lời chào với tên từ query string (ví dụ: `/api/greet?name=Ken`).
2. Tạo endpoint `GET /api/sum` nhận hai số từ query string (`a` và `b`) và trả về tổng của chúng.

### Gợi ý

**src/routers/index.js**

```js
// GET /greet?name=Ken
router.get("/greet", (req, res) => {
    const name = req.query.name || "bạn";
    res.json({ message: `Xin chào, ${name}!` });
});

// GET /sum?a=5&b=10
router.get("/sum", (req, res) => {
    const a = parseInt(req.query.a, 10) || 0;
    const b = parseInt(req.query.b, 10) || 0;
    res.json({ sum: a + b });
});
```

---

## 4. Middleware cơ bản trong Express

Middleware là các hàm trung gian trong Express, được sử dụng để xử lý request trước khi nó đến các route handler hoặc xử lý response trước khi gửi về client.

### Phân loại middleware

1. **Middleware tự định nghĩa**  
   Đây là các middleware do lập trình viên tự viết để xử lý logic cụ thể.

    #### Ví dụ:

    ```js
    // Middleware tự định nghĩa để ghi log thông tin request
    const logRequest = (req, res, next) => {
        console.log(`${req.method} ${req.url}`);
        next(); // Chuyển tiếp đến middleware tiếp theo
    };

    app.use(logRequest); // Sử dụng middleware
    ```

2. **Middleware sử dụng `app.use`**  
   Express cung cấp sẵn một số middleware tích hợp hoặc từ thư viện bên ngoài, ví dụ: `express.json()` để parse JSON, `express.static()` để phục vụ file tĩnh.

    #### Ví dụ:

    ```js
    // Middleware tích hợp để parse JSON
    app.use(express.json());

    // Middleware tích hợp để phục vụ file tĩnh
    app.use(express.static("public"));
    ```

---

### Sử dụng `express.json()` để xử lý dữ liệu JSON

Khi client gửi dữ liệu JSON trong body của request (ví dụ: với phương thức POST), cần sử dụng middleware `express.json()` để Express tự động parse dữ liệu JSON thành đối tượng JavaScript.

#### Ví dụ:

```js
app.use(express.json());

app.post("/api/posts", (req, res) => {
    const { title, content } = req.body;
    res.json({ title, content, message: "Dữ liệu đã được xử lý" });
});
```

> **Lưu ý:** Nếu không sử dụng `express.json()`, `req.body` sẽ là `undefined`.

---

Chúc các em thực hành vui vẻ và sáng tạo! 🚀
