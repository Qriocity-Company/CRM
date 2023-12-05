const express = require("express");
const bodyParser = require('body-parser');
const cors = require("cors");
const app = express();
const AuthRouter = require("./routes/authRoutes");
const BlogRouter = require('./routes/blogRoutes');
const mongoose = require('mongoose');
const multer = require('multer');
const Blog = require('./models/Blog');


// Connect to MongoDB (replace 'your-mongodb-uri' with your actual MongoDB connection string)
mongoose.connect('mongodb+srv://qriocity:responses%40123@qriocity.b6f2e8s.mongodb.net/', {


  }).then(()=>{
    console.log('MongoDB database connection established successfully');
  }).catch(err=>console.log(err));
  

 

// Enable CORS for all routes
app.use(cors());


// Parse JSON requests
app.use(bodyParser.urlencoded({extended : false}));
app.use(bodyParser.json());
app.use("/uploads" , express.static('uploads'));


app.use("/auth" , AuthRouter );

// Use the blogRoutes for all routes starting with '/blogs'
app.use('/blog', BlogRouter);







// app.get('/api/blogs', async (req, res) => {
//   try {
//     const blogs = await Blog.find();
  
//     res.json({ blogs });
//   } catch (error) {
//     console.error('Error fetching blogs:', error);
//     res.status(500).json({ error: 'Internal Server Error' });
//   }
// });

app.listen(process.env.PORT || 5000, () => {
  console.log("Server has started at port 5000");
});


