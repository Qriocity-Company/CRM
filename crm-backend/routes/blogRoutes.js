// routes/authRoutes.js
const express = require('express');
const router = express.Router();
const multer = require('multer');
const blogController = require('../controllers/blogController');
const authenticateToken = require("../middleware/Authentication")

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

const storage = multer.memoryStorage();
const upload = multer({ dest : 'uploads/' });

router.get('/', blogController.getAllBlogs);


router.get('/:id',  blogController.getBlogById);


// Route to create a new blog post
router.post('/',  authenticateToken , upload.single('image'),   blogController.createBlog);

// Route to get blogs by company name
router.get('/company/:companyName', blogController.getBlogsByCompany);

router.get('/category/:category', blogController.getBlogsByCategory);




module.exports = router;
