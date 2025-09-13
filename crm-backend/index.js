const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const app = express();
const AuthRouter = require("./routes/authRoutes");
const BlogRouter = require("./routes/blogRoutes");
const CustomerRouter = require("./routes/customerRoutes");
const AdsCustomerRouter = require("./routes/adsCustomer");
const UkAdsCustomerRouter = require("./routes/ukRoutes");
const phdProffesorrRouter = require("./routes/phdProffesor");
const StudentRoutes = require("./routes/studentRoutes");
const EnquiryRoutes = require("./routes/EnquiryRoutes");
const docRouter = require("./routes/DocRoutes");
const linkRouter = require("./routes/linkRoutes");
const GoogleAdsRoutes = require("./routes/googleAdsRoutes");
const hardwareRouter = require("./routes/hardwareCustomers");
const earnrouter = require("./routes/EarnCustomers");
const mongoose = require("mongoose");
const roadmaprouter = require("./routes/roadmap");
const ConsultAdsRoutes = require("./routes/ConsultAds")
const roadmappopuprouter = require("./routes/roadmappopup");
const bookConsultationrouter = require("./routes/bookConsultations")
const multer = require("multer");
// const Blog = require('./models/Blog');

// Connect to MongoDB (replace 'your-mongodb-uri' with your actual MongoDB connection string)
mongoose
  .connect(
    "mongodb+srv://qriocity:responses%40123@qriocity.b6f2e8s.mongodb.net/",
    {}
  )
  .then(() => {
    console.log("MongoDB database connection established successfully");
  })
  .catch((err) => console.log(err));

// Enable CORS for all routes
app.use(cors());

// Parse JSON requests
app.use(bodyParser.json({ limit: "10mb" }));
app.use(bodyParser.urlencoded({ extended: true, limit: "10mb" }));

app.use("/uploads", express.static("uploads"));

app.use("/auth", AuthRouter);

// Use the blogRoutes for all routes starting with '/blogs'
app.use("/blog", BlogRouter);

app.use("/customer", CustomerRouter);

app.use("/adsCustomer", AdsCustomerRouter);

app.use("/ukAdsCustomer", UkAdsCustomerRouter);

app.use("/phdProffesors", phdProffesorrRouter);

app.use("/hardwareCustomers", hardwareRouter);

app.use("/googleadsCustomer", GoogleAdsRoutes);

app.use("/consultadsCustomer", ConsultAdsRoutes);

app.use("/students", StudentRoutes);

app.use("/enquiry", EnquiryRoutes);

app.use("/api/doc", docRouter);

app.use("/api/link", linkRouter);

app.use("/roadmap", roadmaprouter);

app.use("/roadmap-popup", roadmappopuprouter);

app.use("/earnCustomer", earnrouter);

app.use("/bookConsultations", bookConsultationrouter);

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
