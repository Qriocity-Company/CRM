// routes/authRoutes.js
const express = require("express");
const router = express.Router();
const multer = require("multer");
const blogController = require("../controllers/blogController");
const authenticateToken = require("../middleware/Authentication");
const Category = require("../models/Category");
const Blog = require("../models/Blog");
// Set up Multer to handle file uploads, if needed
// const storage = multer.diskStorage({
//     destination: (req, file, cb) => {
//       cb(null, 'uploads/'); // Save the files to the 'uploads' directory
//     },
//     filename: (req, file, cb) => {
//       const fileName = Date.now() + '-' + file.originalname;
//       cb(null, fileName);
//     },
//   });

//   const upload = multer({ storage });

// const storage = multer.memoryStorage();
// const upload = multer({ dest : 'uploads/' });

// router.get('/', blogController.getAllBlogs);

// router.get('/:id',  blogController.getBlogById);

// Route to create a new blog post
router.post("/", blogController.createBlog);

// Route to get blogs by company name
// router.get('/company/:companyName', blogController.getBlogsByCompany);

// router.get('/category/:category', blogController.getBlogsByCategory);

router.get("/company/:company", async (req, res) => {
  try {
    const { company } = req.params; // Use destructuring for cleaner code
    const BlogList = await Blog.find({ company: company });

    if (BlogList && BlogList.length > 0) {
      return res.status(200).json(BlogList);
    } else {
      return res.status(204).json({ message: "No Blogs Found" });
    }
  } catch (error) {
    console.error("Error fetching Category:", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
});

router.get("/company/:company/:categoryId", async (req, res) => {
  try {
    const { company , categoryId } = req.params; // Use destructuring for cleaner code
    const BlogList = await Blog.find({ company: company ,category : categoryId  });
    
    if (BlogList && BlogList.length > 0) {
      return res.status(200).json(BlogList);
    } else {
      return res.status(204).json({ message: "No Blogs Found" });
    }
  } catch (error) {
    console.error("Error fetching Category:", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
});

router.get("/category/:company", async (req, res) => {
  try {
    const { company } = req.params; // Use destructuring for cleaner code
    const CategoryList = await Category.find({ company: company });

    if (CategoryList && CategoryList.length > 0) {
      return res.status(200).json(CategoryList);
    } else {
      return res.status(204).json({ message: "No Category Found" });
    }
  } catch (error) {
    console.error("Error fetching Category:", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
});

router.post("/add-category", async (req, res) => {
  try {
    console.log(req.body);
    const { company, category } = req.body;

    const existingCategory = await Category.findOne({
      company: company,
      category: category,
    });

    if (existingCategory) {
      console.log(existingCategory);
      return res.status(202).json({ message: "Category already exists" });
    }

    const newCategory = new Category({ company, category });
    await newCategory.save();

    return res.status(200).json({ message: "Category created successfully" });
  } catch (error) {
    console.error("Error creating Category:", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
});

module.exports = router;
