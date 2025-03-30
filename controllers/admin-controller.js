const userModel = require("../models/user-model");
const postModel = require("../models/post-model");

const bcrypt = require("bcrypt");
const jwtSecret = process.env.JWTSECRETKEY;
const jwt = require("jsonwebtoken");

const adminRouter = (req, res) => {
  res.render("admin_Home_Page_Ejs");
};

const createAccount_Route = async (req, res) => {
  try {
    const { email, password } = req.body;
    const existingUser = await userModel.findOne({ email });
    if (existingUser) {
      return res.status(400).send("USER ALREADY");
    }
    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await userModel.create({
      email,
      password: hashedPassword,
    });

    res.render("userCreated__EJS", { newUser });
  } catch (error) {
    console.error("Error creating user:", error);
    res.status(500).render("errorPage__EJS", {
      message: "Something went wrong. Please try again.",
    });
  }
};

const login_GET = (req, res) => {
  res.render("login__EJS");
};

const login_Route = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Check if the user exists
    const user = await userModel.findOne({ email });
    if (!user) {
      return res.status(401).json({ message: "No User Found" });
    }

    // Validate the password
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: "Invalid Credentials" });
    }

    // Generate JWT token
    const jwtSecret = "your_secret_key"; // Replace with env variable
    const token = jwt.sign({ userId: user._id }, jwtSecret, {
      expiresIn: "1h",
    });

    // Set the token in a secure cookie
    res.cookie("token", token, {
      httpOnly: true,
      secure: true, // Enable in production (HTTPS)
      sameSite: "strict",
    });

    // ✅ Redirect to dashboard (instead of rendering it directly)
    res.redirect("/admin/dashboard");
  } catch (error) {
    console.error("Login Error:", error);
    res
      .status(500)
      .json({ message: "Something went wrong. Please try again." });
  }
};

const dashBoard__Controller = async (req, res) => {
  const data = await postModel.find().sort({ createdAt: -1 });
  res.render("dashboard", { data });
};

const logout_And_Clear_Cookie = (req, res) => {
  res.clearCookie("token");
  res.redirect("/admin/login"); // Redirect user to login
};

const addPost = (req, res) => {
  res.render("add_Post_EJS");
};

const addPostPostMethod = async (req, res) => {
  try {
    const { title, body } = req.body;
    const data = await postModel.create({ title, body });

    if (!data) {
      return res.status(400).json({ message: "Failed to create post" });
    }

    res.redirect("/admin/dashboard");
  } catch (error) {
    console.error("Error creating post:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

const editPost = async (req, res) => {
  try {
    const slug = req.params.id;
    const data = await postModel.findById(slug);
    res.render("edit_post_ejs", { data });
  } catch (error) {
    res.status(200).send("Error");
  }
};

const submitPost = async (req, res) => {
  try {
    const { title, body } = req.body;
    const postId = req.params.id;

    const updatedPost = await postModel.findByIdAndUpdate(
      postId,
      { title, body },
      { new: true }
    );

    if (!updatedPost) {
      return res.status(404).send("Post not found");
    }

    res.redirect("/admin/dashboard");
  } catch (error) {
    res.status(500).send("Error updating post");
  }
};

const deletPOST = async (req, res) => {
  try {
    const slug = req.params.id;
    const deleteUser = await postModel.findByIdAndDelete(slug);
    if (!deleteUser) {
      return res.status(404).send("Post not found");
    }
    res.redirect("/admin/dashboard");
  } catch (error) {
    return res.status(404).send("Error While Deleting File");
  }
};

module.exports = {
  adminRouter,
  createAccount_Route,
  login_Route,
  login_GET,
  dashBoard__Controller,
  logout_And_Clear_Cookie,
  addPost,
  addPostPostMethod,
  editPost,
  submitPost,
  deletPOST,
};
