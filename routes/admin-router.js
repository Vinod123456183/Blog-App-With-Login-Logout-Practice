const express = require("express");
const router = express.Router();

const {
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
} = require("../controllers/admin-controller");

const authMiddleWare = require("../middlewares/auth-MiddleWare");

router.get("/", adminRouter);
router.post("/create_Account", createAccount_Route);
router.get("/login", login_GET);
router.post("/login__", login_Route);
router.get("/dashboard", authMiddleWare, dashBoard__Controller);
router.get("/logout", logout_And_Clear_Cookie);

router.get("/add-post", addPost);
router.post("/add-post-post-method", addPostPostMethod);

router.get("/edit-posts/:id", editPost);
router.post("/submit-post/:id", submitPost);
router.post("/delete-post/:id", deletPOST);

module.exports = router;
