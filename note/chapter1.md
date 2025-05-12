# Hướng dẫn cài đặt và thiết lập dự án

## Chuẩn bị môi trường

-   Cài đặt Node.js: [https://nodejs.org/en](https://nodejs.org/en)

## Các bước thiết lập dự án

1. Tạo folder project WD20104
2. Khởi tạo dự án: `npm init -y`
3. Cài đặt pnpm toàn cục: `npm i -g pnpm`
4. Cài đặt các dependencies: `pnpm i`
5. Tạo file `src/app.js`
6. Cài đặt các thư viện cần thiết:
    ```
    pnpm i express nodemon mongoose cors bcryptjs jsonwebtoken dotenv morgan
    ```
7. Chỉnh sửa file `package.json`

```json
"type": "module",
"scripts": {
    "start": "node src/app.js",
    "dev": "nodemon src/app.js"
}
```

## Các thư viện sử dụng

-   **express**: framework cho phép tạo server
-   **nodemon**: tự động reload lại server khi có file thay đổi
-   **mongoose**: ODM cho phép tương tác với database
-   **cors**: cho phép truy cập từ domain khác
-   **bcryptjs**: cho phép mã hóa password
-   **jsonwebtoken**: cho phép tạo và xác thực token
-   **dotenv**: cho phép sử dụng biến môi trường
-   **morgan**: cho phép log request

## Cấu hình dự án

7. Tạo file `.env`
8. Tạo file `.gitignore`, truy cập [gitignore.io](https://gitignore.io) để tạo file .gitignore

## Cấu hình .env

-   PORT: 8000

## Cập nhật file App.js

```js
import express from "express";
import dotenv from "dotenv";

dotenv.config();

const app = express();

app.listen(process.env.PORT, () => {
    console.log(`Server is running on port ${process.env.PORT}`);
});
```

## Cấu hình router

1. Tạo file `src/routers/index.js`
2. Tạo file `src/routers/posts.js`
3. Cập nhật file `src/app.js`

```js
import express from "express";
import router from "./routers/index.js";

router.use("/api", router);
```
