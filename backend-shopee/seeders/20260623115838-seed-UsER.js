"use strict";
let data = require("../data/user.json");
const { hashPassword } = require("../helpers/bcrypt");
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    data = await Promise.all(
      data.map(async (el) => {
        el.createdAt = new Date();
        el.updatedAt = new Date();
        el.password = await hashPassword(el.password);
        return el;
      }),
    );

    await queryInterface.bulkInsert("Users", data, {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("Users", null, {});
  },
};
