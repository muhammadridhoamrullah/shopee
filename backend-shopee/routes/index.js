const { UserController } = require("../controllers/UserController");
const { errorHandler } = require("../middlewares/errorHandler");
const { userRouter } = require("./user.router");

const router = require("express").Router();

// Routes user
router.use("/users", userRouter);
router.get("/health", (req, res) => {
  res.status(200).json({ message: "Server is running yeay" });
});

// Error handling
router.use(errorHandler);

module.exports = {
  router,
};
