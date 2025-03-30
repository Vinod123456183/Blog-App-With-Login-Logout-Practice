const express = require("express");
const router = express.Router();
const postModel = require("../models/post-model");
const { faker } = require("@faker-js/faker");

const {
  indexController,
  searchBoxController_,
  singlePost_,
  contact
} = require("../controllers/index-controller");

router.get("/", indexController);
router.post("/search", searchBoxController_);
router.get("/singlePost/:id", singlePost_);
router.get("/contact",contact)












// const addRandomPosts = async (count = 20) => {
//   try {
//     let posts = [];

//     for (let i = 0; i < count; i++) {
//       posts.push({
//         title: faker.lorem.sentence(15), // Title with 15 words
//         body: faker.lorem.words(50), // Body with 50 words
//       });
//     }

//     await postModel.insertMany(posts);
//     console.log(`${count} random posts added successfully.`);
//   } catch (error) {
//     console.error("Error adding random posts:", error);
//   }
// };

module.exports = router;
