const { comparePassword } = require("../helpers/bcrypt");
const { signToken } = require("../helpers/jwt");
const { UserRepository } = require("../repository/UserRepository");

class AuthServices {
  static async login({ identifier, password }) {
    // Cari user berdasarkan email atau username
    const findUser =
      await UserRepository.findByEmailOrUsernameForLogin(identifier);

    if (!findUser) throw { name: "LOGIN_IDENTIFIER_PASSWORD_INVALID" };

    // Cek password invalid atau tidak
    const checkPassword = await comparePassword(password, findUser.password);
    console.log(checkPassword, "<< checkPass AuthLogin");

    if (!checkPassword) throw { name: "LOGIN_IDENTIFIER_PASSWORD_INVALID" };

    // Cek apakah user sudah terverifikasi atau belum
    // if (!findUser.isVerified) throw { name: "LOGIN_USER_NOT_VERIFIED" };

    // Jika semua validasi lolos, maka buat token
    const access_token = signToken({
      id: findUser.id,
    });

    // Nanti panggil service login notification menggunakan nodemailer

    return access_token;
  }
}

module.exports = {
  AuthServices,
};

// LOGIN_IDENTIFIER_PASSWORD_INVALID
// LOGIN_USER_NOT_VERIFIED
