const { AuthServices } = require("../services/AuthServices");

class UserController {
  static async login(req, res, next) {
    try {
      const { identifier, password } = req.body;

      //   Panggil service untuk login
      const access_token = await AuthServices.login(req.body);

      res.status(200).json({
        status: "success",
        message: "Successfully logged in",
        data: {
          access_token,
        },
      });
    } catch (error) {
      console.log(error, "error");

      next(error);
    }
  }
}

module.exports = {
  UserController,
};
