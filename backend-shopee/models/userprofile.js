"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class UserProfile extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      UserProfile.belongsTo(models.User, { foreignKey: "UserId", as: "user" });
    }
  }
  UserProfile.init(
    {
      UserId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        unique: {
          msg: "UserId already exists",
        },
        validate: {
          notNull: {
            msg: "UserId is required",
          },
          notEmpty: {
            msg: "UserId is required",
          },
        },
      },
      firstName: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: {
            msg: "First name is required",
          },
          notEmpty: {
            msg: "First name is required",
          },
        },
      },
      lastName: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      avatar: {
        type: DataTypes.STRING,
        defaultValue:
          "https://static.vecteezy.com/system/resources/thumbnails/020/911/750/small/user-profile-icon-profile-avatar-user-icon-male-icon-face-icon-profile-icon-free-png.png",
      },
      gender: {
        type: DataTypes.ENUM("male", "female"),
        allowNull: false,
      },
      birthDate: {
        type: DataTypes.DATE,
        allowNull: true,
      },
      bio: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
    },
    {
      sequelize,
      modelName: "UserProfile",
      timestamps: true,
      paranoid: true,
    },
  );
  return UserProfile;
};
