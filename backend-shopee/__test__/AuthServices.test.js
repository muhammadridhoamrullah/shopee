const { comparePassword } = require("../helpers/bcrypt");
const { signToken } = require("../helpers/jwt");
const { UserRepository } = require("../repository/UserRepository");
const { AuthServices } = require("../services/AuthServices");

jest.mock("../repository/UserRepository", () => ({
  UserRepository: {
    findByEmailOrUsernameForLogin: jest.fn(),
  },
}));

jest.mock("../helpers/jwt", () => ({
  signToken: jest.fn(),
}));

jest.mock("../helpers/bcrypt", () => ({
  comparePassword: jest.fn(),
}));

describe("AuthServices.login", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  test("should return access_token when login is successful", async () => {
    UserRepository.findByEmailOrUsernameForLogin.mockResolvedValue({
      id: 1,
      password: "hashedPassword",
    });
    comparePassword.mockResolvedValue(true);
    signToken.mockReturnValue("access_token");

    const response = await AuthServices.login({
      identifier: "admin@gmail.com",
      password: "1234567890",
    });

    expect(UserRepository.findByEmailOrUsernameForLogin).toHaveBeenCalledWith(
      "admin@gmail.com"
    );

    expect(comparePassword).toHaveBeenCalledWith(
      "1234567890",
      "hashedPassword",
    );

    expect(signToken).toHaveBeenCalledWith({ id: 1 });

    expect(response).toBe("access_token");
  });
});
