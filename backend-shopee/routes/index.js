const { UserController } = require("../controllers/UserController");
const { userRouter } = require("./user.router");

const router = require("express").Router();

// Routes user
router.use("/users", userRouter);

module.exports = {
  router,
};
