if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}

const express = require("express");
const { router } = require("./routes");
const app = express();
const port = process.env.PORT || 3000;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(router);

app.listen(port, "0.0.0.0", () => {
  console.log(`Server is running on port ${port}`);
});

module.exports = {
  app,
};
