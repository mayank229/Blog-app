const Blogs = require('../models/blogs');
const { wlogger } = require('../config/index');

/**
 * Get all blog posts
 * @returns {Array} The list of all blog posts
 */
exports.getAllBlogs = async function(req, res) {
    try {
        wlogger.info(`Get all Blogs post request`);
        // Getting all the blog posts created by users
        const blogs = await Blogs.getAllBlogs();
        return res.status(200).json({
            success: true,
            message: 'Blogs Home Page, showing all the blog posts listings',
            blogs: blogs
        });
    } catch (error) {
        console.log(error)
        wlogger.error('Error in showing all blog posts: ', error);
        return res.status(400).json({
            success: false,
            message: 'Could not process.'
        });
    }
}

/**
 * Get the blog post
 * @params {token} 
 * @returns {Object} The blog post
 */
 exports.getBlog = async function(req, res) {
    try {
        wlogger.info(`Get Blog post by title`);
        const blogTitle = req.params.title;
        // Fetching the blog post with the required title
        const blog = await Blogs.getBlogByTitle(blogTitle);
        if (!blog) {
            return res.status(409).json({
                success: false,
                message: `No such blog post`,
            });
        }
        return res.status(200).json({
            success: true,
            message: `Showing the blog post with title: ${blog.title}`,
            blogs: blog
        });
    } catch (error) {
        wlogger.error('Error in getting specific post with title: ', error);
        return res.status(400).json({
            success: false,
            message: 'Could not process the request.'
        });
    }
}

// POST /blogs/create
exports.createBlog = async function(req, res, next) {
    wlogger.debug('Create new blog: ', req.body);
    // Check if all details are completed for creating the blog  
    if (!req.body.title || req.body.title === '' || !req.body.content || req.body.content === '') {
        return res.status(400).json({
           success: false,
           message: 'fill all the complete blog details (title, content) to create it'
        });
    }

    try {
        // Check if blog already exist with the same title in db
        const ifBlogExist = await Blogs.getBlogByTitle(req.body.title);
        if (ifBlogExist) {
            wlogger.debug(`Blog exist with title ${req.body.title}`);
            return res.status(409).json({
                success: false,
                message: 'This Blog title is already taken, pls change the title',
                errors: {
                    blog: 'This blog title is already taken.'
                }
            });
        }
        // Add a new blog
        const blog = await Blogs.addBlog(req.body, req.user);
        if (blog) {
            wlogger.info(`Blog added successfully with title: ${req.body.title}`);
            return res.status(200).json({
                success: true,
                message: `Blog has been added successfully: ${blog.title}.`,
                blog: blog
            });
        }
    } catch(error) {
        wlogger.error('Error in adding blog post: ', error);
        return res.status(400).json({
            success: false,
            message: 'Could not process the request.',
            error: error
        });
    }
};

// DELETE /blogs/delete
exports.deleteBlog = async function(req, res, next) {
    wlogger.debug('blog delete request: ', req.body);
    // Check if title is entered for the blog that needs to be deleted
    if (!req.body.title || req.body.title === '') {
        return res.status(400).json({
           success: false,
           message: 'Enter the title of the blog to be deleted'
        });
    }

    try {
        // Check if the blog exist with the title entered by user
        const ifBlogExist = await Blogs.getBlogByTitle(req.body.title);

        if (!ifBlogExist) {
            wlogger.debug(`Blog title does not exist with title ${req.body.title}`);
            return res.status(409).json({
                success: false,
                message: 'This Blog title does not exist.',
                errors: {
                    blog: 'This blog title does not exist.'
                }
            });
        }
        // Delete the blog if the logged in user is creator of that blog
        const blog = await Blogs.deleteBlog(req.body.title, req.user);
        if (blog) {
            wlogger.info(`Blog deleted successfully with title: ${req.body.title}`);
            return res.status(200).json({
                success: true,
                message: `Blog has been deleted successfully.`,
                blog: blog
            });
        } else {
            return res.status(409).json({
                success: false,
                message: `Cannot delete other user's blog, User can delete only their own posts`,
                blog: blog
            });
        }        
    } catch(error) {
        wlogger.error('Error in blog deletion: ', error);
        return res.status(400).json({
            success: false,
            message: 'Could not process the request.',
            error: error
        });
    }
};