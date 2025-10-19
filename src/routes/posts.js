import express from "express";
import Post from "../models/Post.js";
import Joi from "joi";

const router = express.Router();

// Validation schema cho Post
const postSchema = Joi.object({
  title: Joi.string().required().messages({
    'string.empty': 'Tiêu đề không được để trống',
    'any.required': 'Tiêu đề là bắt buộc'
  }),
  content: Joi.string().required().messages({
    'string.empty': 'Nội dung không được để trống',
    'any.required': 'Nội dung là bắt buộc'
  }),
  author: Joi.string().required().messages({
    'string.empty': 'Tác giả không được để trống',
    'any.required': 'Tác giả là bắt buộc'
  })
});

// GET /posts - Lấy danh sách bài viết với query parameters
router.get('/', async (req, res) => {
  try {
    const { _limit, _sort, _order } = req.query;
    
    let query = Post.find();
    
    // Áp dụng limit
    if (_limit) {
      const limit = parseInt(_limit);
      if (limit > 0) {
        query = query.limit(limit);
      }
    }
    
    // Áp dụng sort
    if (_sort) {
      const sortOrder = _order === 'desc' ? -1 : 1;
      query = query.sort({ [_sort]: sortOrder });
    } else {
      // Mặc định sort theo createdAt desc
      query = query.sort({ createdAt: -1 });
    }
    
    const posts = await query.exec();
    
    res.json({
      success: true,
      data: posts,
      count: posts.length
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Lỗi server khi lấy danh sách bài viết'
    });
  }
});

// POST /posts - Thêm bài viết mới
router.post('/', async (req, res) => {
  try {
    // Validate dữ liệu đầu vào
    const { error, value } = postSchema.validate(req.body);
    if (error) {
      return res.status(400).json({
        success: false,
        message: 'Dữ liệu không hợp lệ',
        errors: error.details.map(detail => detail.message)
      });
    }
    
    const post = new Post(value);
    const savedPost = await post.save();
    
    res.status(201).json({
      success: true,
      message: 'Thêm bài viết thành công',
      data: savedPost
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Lỗi server khi thêm bài viết'
    });
  }
});

// GET /posts/:id - Lấy chi tiết bài viết
router.get('/:id', async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    
    if (!post) {
      return res.status(404).json({
        success: false,
        message: 'Không tìm thấy bài viết'
      });
    }
    
    res.json({
      success: true,
      data: post
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Lỗi server khi lấy chi tiết bài viết'
    });
  }
});

// PUT /posts/:id - Cập nhật bài viết
router.put('/:id', async (req, res) => {
  try {
    // Validate dữ liệu đầu vào
    const { error, value } = postSchema.validate(req.body);
    if (error) {
      return res.status(400).json({
        success: false,
        message: 'Dữ liệu không hợp lệ',
        errors: error.details.map(detail => detail.message)
      });
    }
    
    const post = await Post.findByIdAndUpdate(
      req.params.id, 
      value, 
      { new: true, runValidators: true }
    );
    
    if (!post) {
      return res.status(404).json({
        success: false,
        message: 'Không tìm thấy bài viết để cập nhật'
      });
    }
    
    res.json({
      success: true,
      message: 'Cập nhật bài viết thành công',
      data: post
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Lỗi server khi cập nhật bài viết'
    });
  }
});

// DELETE /posts/:id - Xóa bài viết
router.delete('/:id', async (req, res) => {
  try {
    const post = await Post.findByIdAndDelete(req.params.id);
    
    if (!post) {
      return res.status(404).json({
        success: false,
        message: 'Không tìm thấy bài viết để xóa'
      });
    }
    
    res.json({
      success: true,
      message: 'Xóa bài viết thành công',
      data: post
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Lỗi server khi xóa bài viết'
    });
  }
});

export default router;
