const express = require("express");
const bodyParser = require('body-parser');
const cors = require("cors");
const app = express();
const AuthRouter = require("./routes/authRoutes");
const BlogRouter = require('./routes/blogRoutes');
const mongoose = require('mongoose');


// Connect to MongoDB (replace 'your-mongodb-uri' with your actual MongoDB connection string)
mongoose.connect('mongodb+srv://ankitrawat20052001:Ankitrawat20052001@cluster0.r07ife8.mongodb.net/', {
  }).then(()=>{
    console.log('MongoDB database connection established successfully');
  }).catch(err=>console.log(err));
  


// Enable CORS for all routes
app.use(cors());

app.use(express.json());
// Parse JSON requests
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended : true}));


app.use("/auth" , AuthRouter );

// Use the blogRoutes for all routes starting with '/blogs'
app.use('/blog', BlogRouter);




app.listen(process.env.PORT || 5000, () => {
  console.log("Server has started at port 5000");
});