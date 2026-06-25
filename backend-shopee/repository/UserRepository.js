const { Op } = require("sequelize");
const { User, UserProfile } = require("../models/index");

class UserRepository {
  static async findByEmailOrUsernameForLogin(identifier) {
    // Cari user berdasarkan email atau username
    const findUser = User.findOne({
      where: {
        [Op.or]: [{ email: identifier }, { username: identifier }],
      },
      attributes: ["id", "email", "password"],
    });

    return findUser;
  }

  static async findUserById(id) {
    const findUser = User.findByPk(id, {
      attributes: ["id", "email", "role"],
      include: [
        {
          model: UserProfile,
          as: "profile",
          attributes: ["firstName"],
        },
      ],
    });
    return findUser;
  }
}

module.exports = {
  UserRepository,
};
