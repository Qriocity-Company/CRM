// controllers/blogController.js

const Blog = require('../models/Blog');

// Controller function to get all blog posts
exports.getAllBlogs = async (req, res) => {
  try {
    const blogs = await Blog.find();
    res.json({blogs});
  } catch (error) {
    console.error('Error getting blog posts:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};
 
// Controller function to get a specific blog post by ID
// exports.getBlogById = async (req, res) => {
//   try {
//     const blog = await Blog.findById(req.params.id);
//     if (!blog) {
//       return res.status(404).json({ error: 'Blog not found' });
//     }
//     res.json(blog);
//   } catch (error) {
//     console.error('Error getting blog post by ID:', error);
//     res.status(500).json({ error: 'Internal Server Error' });
//   }
// };

// Controller function to create a new blog post
// exports.createBlog = async (req, res) => {
//   try {
//     const { title, caption, description, company  , category} = req.body;
//     // const image = req.file ? req.file.filename : '';
//     // console.log("images : ", image)
//     const newBlog = new Blog({ title, caption, description,  company , category ,  imageURL: req.file.path, });
//     await newBlog.save();
    
//     res.status(201).json({ message: 'Blog post created successfully' });
//   } catch (error) {
//     console.error('Error creating blog post:', error);
//     res.status(500).json({ error: 'Internal Server Error' });
//   }
// };


// Controller function to create a new blog post
exports.createBlog = async (req, res) => {
  try {
    const {title ,  content, company, category } = req.body;
    const newBlog = new Blog({ content, company, category });
    await newBlog.save();
    
    res.status(201).json({ message: 'Blog post created successfully' });
  } catch (error) {
    console.error('Error creating blog post:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};





// Get blogs by company name
// exports.getBlogsByCompany = async (req, res) => {
//   try {
//     const companyName = req.params.companyName;
//     const blogs = await Blog.find({ company: companyName });
//     console.log(companyName);
//     if (blogs.length === 0) {
//       return res.status(404).json({ message: 'No blogs found for the specified company' });
//     }

//     res.json(blogs);
//   } catch (error) {
//     console.error('Error fetching blogs by company:', error);
//     res.status(500).json({ error: 'Internal Server Error' });
//   }
// };

// exports.getBlogsByCategory = async (req, res) => {
//   try {
//     const companyName = req.params.category;
//     const blogs = await Blog.find({ category: category });
//     console.log(category);
//     if (blogs.length === 0) {
//       return res.status(404).json({ message: 'No blogs found for the specified company' });
//     }

//     res.json(blogs);
//   } catch (error) {
//     console.error('Error fetching blogs by company:', error);
//     res.status(500).json({ error: 'Internal Server Error' });
//   }
// };







// module.exports = {
//   getAllBlogs,
//   getBlogById,
//   createBlog,
//   // Add more controller functions as needed
// };