// models/Blog.js
const mongoose = require('mongoose');

const blogSchema = new mongoose.Schema({
  title : {
    type : String ,
    required : true,
  },
  content : {
    type : String , 
    required : true,
  } ,
  company: {
    type : String , 
    required : true,
  },
  category: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Category'
  },
} ,
{
  timestamps: true,
});

const Blog = mongoose.model('Blog', blogSchema);

module.exports = Blog;




// const dummyBlogs = [
//   {
//     title: 'Exploring the Enchanting Wonders of Nature',
//     caption: 'Captivating scenes from around the world',
//     description: 'Embark on a mesmerizing journey through lush rainforests, majestic mountains, and serene beaches. Experience the symphony of nature and marvel at the diverse ecosystems that make our planet truly extraordinary.',
//   },
//   {
//     title: 'The Art of Coding: Crafting Digital Masterpieces',
//     caption: 'Unleashing creativity through programming',
//     description: 'Dive deep into the art of coding, where lines of logic transform into digital masterpieces. Explore the realms of software development, web design, and game programming, and witness the power of turning innovative ideas into functional, interactive experiences.',
//   },
//   {
//     title: 'Culinary Adventures: A Gastronomic Tour of Global Delights',
//     caption: 'Embark on a journey through diverse cuisines',
//     description: 'Embark on a culinary adventure that transcends borders. Indulge your taste buds in a symphony of flavors from around the world, from savory dishes that tell stories of rich cultural heritage to sweet delights that evoke a sense of pure bliss.',
//   },
//   {
//     title: 'Innovations in Technology: Shaping Tomorrow, Today',
//     caption: 'Shaping the future through technological advancements',
//     description: 'Stay at the forefront of technological breakthroughs that are reshaping the world. Explore innovations in artificial intelligence, robotics, and cutting-edge technologies that hold the promise of transforming industries and enhancing our daily lives.',
//   },
//   {
//     title: 'Mindful Living: Nurturing a Balanced Lifestyle',
//     caption: 'Embracing a mindful and balanced lifestyle',
//     description: 'Embark on a journey towards mindful living, where the art of presence and balance becomes a way of life. Discover practices that promote mental well-being, emotional resilience, and a holistic approach to health in our fast-paced modern world.',
//   },
//   {
//     title: 'Journeying through the Cosmos: Unveiling Celestial Wonders',
//     caption: 'Journeying through the wonders of outer space',
//     description: 'Embark on an awe-inspiring journey through the cosmos, exploring distant galaxies, breathtaking nebulae, and the mysteries of the universe. Uncover the secrets of celestial bodies and ponder the vastness of the cosmic tapestry that surrounds us.',
//   },
//   {
//     title: 'The World of Literature: Tales from Every Corner',
//     caption: 'Immersing in the realm of words and stories',
//     description: 'Immerse yourself in a world of literary wonders, where words weave tales that span across genres and cultures. Explore the beauty of storytelling, discover literary classics, and delve into the works of authors who bring imagination to life through the written word.',
//   },
//   {
//     title: 'Health and Fitness Chronicles: Nourishing the Mind and Body',
//     caption: 'Empowering your journey to a healthier lifestyle',
//     description: 'Embark on a transformative journey toward optimal health and well-being. Discover a wealth of insights on nutrition, fitness, and mental wellness, empowering you to make informed choices for a vibrant and balanced lifestyle.',
//   },
//   {
//     title: 'Adventures in Travel: Experiencing the Essence of Cultures',
//     caption: 'Experiencing cultures and landscapes across the globe',
//     description: 'Embark on virtual journeys to the heart of diverse cultures and captivating landscapes. From bustling cityscapes to serene natural wonders, let the spirit of adventure guide you through a tapestry of experiences that transcend borders.',
//   },
//   {
//     title: 'Artistic Expressions: Celebrating Creativity in Every Form',
//     caption: 'Exploring the world of visual and performing arts',
//     description: 'Immerse yourself in the rich tapestry of artistic expressions, from breathtaking visual masterpieces to the magic of performing arts. Celebrate the creativity that transcends boundaries and reflects the myriad ways in which human imagination comes to life.',
//   },
// ];

// console.log(dummyBlogs);
