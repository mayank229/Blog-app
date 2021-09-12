const express = require('express');
const router = express.Router();

// Importing the middleware and blog controller
const isAuthenticated = require('../middlewares/check-auth');
const blogController = require('../controllers/blogs');

// GET /blogs/home - list all the blog posts
router.get('/home',isAuthenticated, (req, res) => {
    blogController.getAllBlogs(req, res);
});

// GET /blogs/home/title - list the specific blog post
router.get('/home/:title', isAuthenticated, (req, res) => {
    blogController.getBlog(req, res);
});

// POST /blogs/create - to create a blog post
router.post('/create', isAuthenticated, (req,res) => {
    blogController.createBlog(req, res);
});

// DELETE /blogs/delete - to delete a specific blog post
router.delete('/delete', isAuthenticated, (req, res) => {
    blogController.deleteBlog(req, res);
})

module.exports = router;
