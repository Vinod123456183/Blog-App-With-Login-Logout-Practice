const postModel = require("../models/post-model");

const indexController = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1; // Get page number from query params, default is 1
    const limit = 5; // Number of posts per page
    const skip = (page - 1) * limit; // Calculate how many posts to skip

    const totalPosts = await postModel.countDocuments();

    const allPosts = await postModel
      .find()
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit);

    // Calculate total pages
    const totalPages = Math.ceil(totalPosts / limit);

    res.render("index", { allPosts, totalPages, currentPage: page });
  } catch (error) {
    console.error("Pagination error:", error);
    res.render("index", {
      allPosts: [],
      totalPages: 1,
      currentPage: 1,
    });
  }
};

const searchBoxController_ = async (req, res) => {
  try {
    const searchItem = req.body.search?.trim(); // Trim spaces to avoid empty search

    if (!searchItem) {
      return res.render("searchBoxSearch", { data: [] });
    }

    const regexSafe = searchItem.replace(/[-\/\\^$*+?.()|[\]{}]/g, "\\$&");
    const data = await postModel.find({
      $or: [
        { title: { $regex: new RegExp(regexSafe, "i") } },
        { body: { $regex: new RegExp(regexSafe, "i") } },
      ],
    });

    res.render("searchBoxSearch", { data });
  } catch (error) {
    console.error("Search error:", error);
    res.render("searchBoxSearch", { data: [] });
  }
};

const singlePost_ = async (req, res) => {
  try {
    const slug = req.params.id;
    const userId = await postModel.findById(slug);
    if (!userId) {
      return res.status(400).send("Post Not Found");
    }
    res.render("singlePostDetailsEJS__", { userId });
  } catch (error) {
    res.status(500).send("Server error");
  }
};

const contact = async (req, res) => {
  await res.render("contact_EJS");
};

module.exports = {
  indexController,
  searchBoxController_,
  singlePost_,
  contact,
};
