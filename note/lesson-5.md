# Buổi 5: Thực hành CRUD với MongoDB và Mongoose (Sản phẩm)

Chào các em! 👋 Hôm nay chúng ta sẽ cùng nhau thực hành xây dựng API CRUD đầy đủ với MongoDB và Mongoose. Đây là một bước tiến quan trọng trong việc xây dựng ứng dụng backend hiện đại. Các em sẽ học cách tổ chức code khoa học, xử lý lỗi hiệu quả và phản hồi trạng thái HTTP đúng chuẩn.

---

## Mục tiêu

-   Thực hành xây dựng API CRUD đầy đủ với MongoDB và Mongoose.
-   Hiểu cách tổ chức code với models, controllers, và routers.
-   Làm quen với cách xử lý lỗi và phản hồi trạng thái HTTP.

---

## 1. Yêu cầu thực hành

### Các bước thực hiện

1. **Kết nối MongoDB:**

    Đầu tiên, các em cần kết nối ứng dụng của mình với MongoDB. Các em có thể sử dụng MongoDB Atlas (cloud) hoặc MongoDB cài đặt trên máy.

    - Tạo file `.env` và thêm URI kết nối:

        ```env
        MONGO_URI=mongodb+srv://<username>:<password>@cluster0.mongodb.net/<dbname>?retryWrites=true&w=majority
        ```

    - Đừng quên thêm `.env` vào file `.gitignore` để bảo mật thông tin kết nối.

2. **Tạo cấu trúc thư mục:**

    Để code gọn gàng và dễ bảo trì, chúng ta sẽ tổ chức dự án theo cấu trúc sau:

    ```
    src/
      models/
        Product.js
      controllers/
        productController.js
      routers/
        products.js
      app.js
    ```

3. **Thực hiện các thao tác CRUD:**

    - `create`: Thêm sản phẩm mới.
    - `read`: Lấy danh sách sản phẩm hoặc chi tiết sản phẩm theo ID.
    - `update`: Cập nhật thông tin sản phẩm.
    - `delete`: Xóa sản phẩm.

---

## 2. Hướng dẫn thực hành

### Định nghĩa Schema và Model

Đầu tiên, chúng ta cần định nghĩa cấu trúc dữ liệu cho sản phẩm bằng Mongoose. Đây là bước rất quan trọng để đảm bảo dữ liệu được lưu trữ đúng định dạng.

**src/models/Product.js**

```javascript
// filepath: FPL-WEB503/src/models/Product.js
import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: [true, "Tên sản phẩm là bắt buộc"],
            trim: true,
            maxlength: [200, "Tên sản phẩm không được vượt quá 200 ký tự"],
        },
        slug: {
            type: String,
            unique: true,
            lowercase: true,
        },
        description: {
            type: String,
            required: [true, "Mô tả sản phẩm là bắt buộc"],
        },
        price: {
            type: Number,
            required: [true, "Giá sản phẩm là bắt buộc"],
            min: [0, "Giá sản phẩm không được âm"],
        },
        stock: {
            type: Number,
            required: [true, "Số lượng tồn kho là bắt buộc"],
            min: [0, "Số lượng tồn kho không được âm"],
            default: 0,
        },
        sku: {
            type: String,
            required: [true, "SKU sản phẩm là bắt buộc"],
            unique: true,
            trim: true,
        },
        status: {
            type: String,
            enum: ["draft", "published", "archived"],
            default: "draft",
        },
    },
    { timestamps: true, versionKey: false }
);

const Product = mongoose.model("Product", productSchema);

export default Product;
```

---

### Tách Controller để quản lý logic

Tiếp theo, chúng ta sẽ tách logic xử lý ra khỏi router và đặt vào controller. Điều này giúp code gọn gàng và dễ bảo trì hơn.

**src/controllers/productController.js**

```javascript
// filepath: FPL-WEB503/src/controllers/productController.js
import Product from "../models/Product";

// Lấy danh sách sản phẩm
export const getProducts = async (req, res) => {
    try {
        const products = await Product.find();
        res.json(products);
    } catch (err) {
        res.status(500).json({ error: "Lỗi server", message: err.message });
    }
};

// Lấy chi tiết sản phẩm
export const getProductById = async (req, res) => {
    try {
        const product = await Product.findById(req.params.id);
        if (!product) return res.status(404).json({ error: "Không tìm thấy sản phẩm" });
        res.json(product);
    } catch (err) {
        res.status(500).json({ error: "Lỗi server", message: err.message });
    }
};

// Thêm sản phẩm mới
export const createProduct = async (req, res) => {
    try {
        const newProduct = new Product(req.body);
        await newProduct.save();
        res.status(201).json(newProduct);
    } catch (err) {
        res.status(400).json({ error: "Lỗi khi thêm sản phẩm", message: err.message });
    }
};

// Cập nhật sản phẩm
export const updateProduct = async (req, res) => {
    try {
        const product = await Product.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators: true,
        });
        if (!product) return res.status(404).json({ error: "Không tìm thấy sản phẩm" });
        res.json(product);
    } catch (err) {
        res.status(400).json({ error: "Lỗi khi cập nhật sản phẩm", message: err.message });
    }
};

// Xóa sản phẩm
export const deleteProduct = async (req, res) => {
    try {
        const product = await Product.findByIdAndDelete(req.params.id);
        if (!product) return res.status(404).json({ error: "Không tìm thấy sản phẩm" });
        res.json({ success: true });
    } catch (err) {
        res.status(500).json({ error: "Lỗi server", message: err.message });
    }
};
```

---

### Sử dụng Controller trong Router

Bây giờ, chúng ta sẽ sử dụng các hàm trong controller để xử lý các endpoint.

**src/routers/products.js**

```javascript
// filepath: FPL-WEB503/src/routers/products.js
import { Router } from "express";
import {
    getProducts,
    getProductById,
    createProduct,
    updateProduct,
    deleteProduct,
} from "../controllers/productController";

const routeProduct = Router();

// Lấy danh sách sản phẩm
routeProduct.get("/", getProducts);

// Lấy chi tiết sản phẩm
routeProduct.get("/:id", getProductById);

// Thêm sản phẩm mới
routeProduct.post("/", createProduct);

// Cập nhật sản phẩm
routeProduct.put("/:id", updateProduct);

// Xóa sản phẩm
routeProduct.delete("/:id", deleteProduct);

export default routeProduct;
```

---

### Tích hợp Router vào Ứng dụng

Cuối cùng, chúng ta sẽ tích hợp router vào ứng dụng chính.

**src/app.js**

```javascript
// filepath: FPL-WEB503/src/app.js
import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import routeProduct from "./routers/products";

dotenv.config();
const app = express();

// Kết nối MongoDB
mongoose
    .connect(process.env.MONGO_URI)
    .then(() => console.log("Kết nối MongoDB thành công"))
    .catch((err) => console.error("Kết nối MongoDB thất bại:", err));

// Middleware
app.use(express.json());
app.use("/api/products", routeProduct);

app.listen(process.env.PORT, () => {
    console.log(`Server is running on port ${process.env.PORT}`);
});
```

---

## 3. Kết luận

Các em thấy không, việc xây dựng API CRUD với MongoDB và Mongoose không hề khó nếu chúng ta tổ chức code khoa học. Hãy nhớ:

-   **Models:** Định nghĩa cấu trúc dữ liệu.
-   **Controllers:** Xử lý logic nghiệp vụ.
-   **Routers:** Định nghĩa các endpoint API.

Chúc các em học tốt! 🚀 Nếu có thắc mắc, đừng ngại hỏi thầy nhé! 😊
