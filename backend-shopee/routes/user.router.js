const { UserController } = require("../controllers/UserController");
const { authentication } = require("../middlewares/authentication");

const userRouter = require("express").Router();

userRouter.post("/login", UserController.login);


module.exports = {
  userRouter,
};
