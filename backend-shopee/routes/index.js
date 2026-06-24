const { UserController } = require("../controllers/UserController");
const { errorHandler } = require("../middlewares/errorHandler");
const { userRouter } = require("./user.router");

const router = require("express").Router();

// Routes user
router.use("/users", userRouter);

// Error handling
router.use(errorHandler);

module.exports = {
  router,
};
