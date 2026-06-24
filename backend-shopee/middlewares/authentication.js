const { verifyToken } = require("../helpers/jwt");
const { User, UserProfile } = require("../models/index");
const { UserRepository } = require("../repository/UserRepository");

async function authentication(req, res, next) {
  try {
    console.log("Hit Middleware");

    const { authorization } = req.headers;

    if (!authorization) throw { name: "UNAUTHORIZED" };

    // Cek apakah tokennya itu Bearer token atau bukan
    const [bearer, token] = authorization.split(" ");
    if (bearer !== "Bearer") throw { name: "INVALID_TOKEN" };

    const payload = verifyToken(token);

    // Cek user
    const user = await UserRepository.findUserById(payload.id);

    if (!user) throw { name: "UNAUTHORIZED" };

    req.user = {
      id: user.id,
      email: user.email,
      role: user.role,
      firstName: user.profile.firstName,
    };

    next();
  } catch (error) {
    next(error);
  }
}

module.exports = {
  authentication,
};
