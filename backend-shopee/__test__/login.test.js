const { app } = require("../app");
const { AuthServices } = require("../services/AuthServices");
const request = require("supertest");

jest.mock("../services/AuthServices", () => ({
  AuthServices: {
    login: jest.fn(),
  },
}));

describe("POST /users/login", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  test("should return 200 and access_token when login is successful", async () => {
    AuthServices.login.mockResolvedValue("access_token");

    const response = await request(app).post("/users/login").send({
      identifier: "admin@gmail.com",
      password: "1234567890",
    });

    expect(AuthServices.login).toHaveBeenCalledWith({
      identifier: "admin@gmail.com",
      password: "1234567890",
    });

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty("status", "success");
    expect(response.body).toHaveProperty("message", "Successfully login");
    expect(response.body.data).toHaveProperty("access_token");
  });
});
