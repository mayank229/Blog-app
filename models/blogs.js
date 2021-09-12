const mongoose = require('mongoose');

// Defining the Blog schema
var BlogSchema = new mongoose.Schema({
    title: {
      type: String,
      required: true
    },
    created_by: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'users'
    },
    created_on: {
      type: Date,
      default: Date.now
    },
    content: {
        type: String
      },
    creater_info: {
      type: Object
    }
});

const Blogs = module.exports = mongoose.model('Blogs', BlogSchema);

// Get all the blog posts
module.exports.getAllBlogs = async function () {
  try {
    const blogs = await Blogs.find();
    return blogs;
  } catch (error) {
    throw error;
  }
};

// Get a blog post by id
module.exports.getBlogById = async function (blogId) {
  try {
    const blog = await Blogs.findOne({'_id': blogId});
    return blog;
  } catch (error) {
    throw error;
  }
}

// Get a blog post by Title 
module.exports.getBlogByTitle = async function (title) {
  try {
    const blog = await Blogs.findOne({ 'title': title });
    return blog;    
  } catch (error) {
    throw error;
  }
};

// Add a new blog
module.exports.addBlog = async (newBlog, user) => {
  try {
    newBlog.title = newBlog.title.trim();
    newBlog.created_by = user._id;
    newBlog.creater_info = {'userName': user.name, 'userEmail': user.email};  
    
    const blog = new Blogs(newBlog);
    const result = await blog.save();
    return result;
  } catch (error) {
    throw error;  
  }
};

// Delete a blog by title
module.exports.deleteBlog = async (blogTitle, user) => {
  try {
    // Delete the blog if the logged in user is creator of that blog
    const blog = await Blogs.findOneAndRemove({ 'title': blogTitle, 'created_by': user._id });
    return blog;
  } catch (error) {
    throw error;
  } 
}