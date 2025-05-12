# Hướng dẫn cài đặt và thiết lập dự án Node.js/Express cho sinh viên (vui vẻ, dễ hiểu) 🎉

## Giới thiệu

Chào các em sinh viên thân mến! 👨‍🏫  
Hôm nay thầy sẽ hướng dẫn các em từng bước để xây dựng một dự án Node.js/Express “xịn sò”, dễ hiểu, dễ làm, ai cũng có thể thực hiện được. Cứ yên tâm, làm theo là thành công nhé!

## 1. Chuẩn bị môi trường

-   Đầu tiên, các em cần cài Node.js (nếu máy chưa có): [https://nodejs.org/en](https://nodejs.org/en)
-   Tiếp theo, cài pnpm để quản lý thư viện cho tiện:
    ```bash
    npm i -g pnpm
    ```
    (pnpm giúp cài nhanh, tiết kiệm bộ nhớ, thầy rất khuyến khích dùng!)

## 2. Khởi tạo dự án

1. Tạo một thư mục mới cho dự án, ví dụ: `FPL-WEB503` (tên gì cũng được, miễn các em thích là được!)
2. Mở terminal, di chuyển vào thư mục đó và khởi tạo dự án Node.js:
    ```bash
    pnpm init -y
    ```
    (Cứ enter liên tục, mọi thứ sẽ tự động!)
3. Cài các thư viện cần thiết cho dự án:
    ```bash
    pnpm i express mongoose cors bcryptjs jsonwebtoken dotenv morgan
    ```
    (Đây là “bộ combo” để làm API hiện đại, các em cứ cài hết nhé!)

## 3. Cài đặt Babel cho dự án

-   Để code hiện đại hơn, các em cài thêm Babel:
    ```bash
    pnpm i -D @babel/core @babel/node @babel/preset-env nodemon
    ```
-   Sau đó, tạo file `.babelrc` ở thư mục gốc của dự án, dán vào:
    ```json
    {
        "presets": ["@babel/preset-env"]
    }
    ```
    (Chỉ cần vậy thôi, không cần lo lắng gì thêm!)

## 4. Cấu hình package.json

-   Thêm script để chạy dự án cho “xịn”:
    ```json
    "scripts": {
      "dev": "nodemon --exec babel-node src/app.js"
    }
    ```
    (Sau này chỉ cần gõ `pnpm run dev` là chạy được luôn!)

## 5. Thiết lập cấu trúc thư mục

-   Các em tạo các thư mục và file như sau:
    ```
    src/
      app.js
      routers/
        index.js
        posts.js
    note/
    .env
    .gitignore
    ```
    (Cứ mạnh dạn tạo, sai đâu thầy chỉ lại!)

## 6. Cấu hình biến môi trường

-   Tạo file `.env` với nội dung:
    ```env
    PORT=8000
    ```
    (Muốn đổi port thì sửa số thôi, không sao cả!)
-   Đừng quên file `.gitignore` để tránh lộ thông tin quan trọng:
    ```
    node_modules
    .env
    ```

## 7. Viết mã nguồn khởi tạo app

**src/app.js**

```js
import express from "express";
import dotenv from "dotenv";
import router from "./routers";

dotenv.config();
const app = express();

app.use("/api", router);

app.listen(process.env.PORT, () => {
    console.log(`Server is running on port ${process.env.PORT}`);
});
```

(Chỉ vài dòng là có server Express chạy “ngon lành” rồi các em nhé!)

## 8. Cấu hình router

**src/routers/index.js**

```js
import { Router } from "express";
import postsRouter from "./posts";

const router = Router();
router.use("/posts", postsRouter);

export default router;
```

**src/routers/posts.js**

```js
import { Router } from "express";

const router = Router();

router.get("/", (req, res) => {
    res.json({ message: "Danh sách bài viết" });
});

export default router;
```

(Mỗi file router giống như một “cửa ngõ” dẫn đến các chức năng của API, rất dễ mở rộng!)

## 9. Chạy thử dự án

-   Để chạy dự án, các em dùng lệnh:
    ```bash
    pnpm run dev
    ```
    (Chờ vài giây, thấy dòng “Server is running...” là thành công rồi đó!)
-   Mở trình duyệt hoặc Postman, truy cập thử: [http://localhost:8000/api/posts](http://localhost:8000/api/posts)

### Sử dụng Postman để kiểm tra API

1. Mở Postman (hoặc Insomnia, hoặc bất cứ công cụ nào các em thích).
2. Tạo một request mới với phương thức **GET**.
3. Nhập URL: `http://localhost:8000/api/posts`
4. Nhấn **Send** (bấm mạnh tay lên!).
5. Nếu thành công, các em sẽ thấy kết quả:
    ```json
    {
        "message": "Danh sách bài viết"
    }
    ```
    (Chúc mừng, API của các em đã “lên sóng” rồi nhé!)

---

## Kết luận

Vậy là thầy đã hướng dẫn xong cách tạo một dự án Node.js/Express hiện đại, dễ hiểu, dễ làm.  
Các em cứ mạnh dạn thử nghiệm, sáng tạo thêm tính năng, nếu gặp khó khăn thì hỏi thầy hoặc các bạn, thầy luôn sẵn sàng hỗ trợ!  
Chúc các em học tốt và làm được nhiều dự án “chất như nước cất” nhé! 😄
