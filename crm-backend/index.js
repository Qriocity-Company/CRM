const express = require("express");
const bodyParser = require('body-parser');
const cors = require("cors");
const app = express();
const AuthRouter = require("./routes/authRoutes");
const BlogRouter = require('./routes/blogRoutes');
const CustomerRouter = require('./routes/customerRoutes')
const mongoose = require('mongoose');
const multer = require('multer');
// const Blog = require('./models/Blog');


// Connect to MongoDB (replace 'your-mongodb-uri' with your actual MongoDB connection string)
mongoose.connect('mongodb+srv://qriocity:responses%40123@qriocity.b6f2e8s.mongodb.net/', {


  }).then(()=>{
    console.log('MongoDB database connection established successfully');
  }).catch(err=>console.log(err));
  

 

// Enable CORS for all routes
app.use(cors());


// Parse JSON requests
app.use(bodyParser.json({ limit: '10mb' }));
app.use(bodyParser.urlencoded({ extended: true, limit: '10mb' }));

app.use("/uploads" , express.static('uploads'));


app.use("/auth" , AuthRouter );

// Use the blogRoutes for all routes starting with '/blogs'
app.use('/blog', BlogRouter);


app.use('/customer', CustomerRouter);




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




