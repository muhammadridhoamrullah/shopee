function errorHandler(err, req, res, next) {
  let statusCode = 500;
  let message = "Internal Server Error";

  switch (err.name) {
    case "SequelizeValidationError":
      statusCode = 400;
      message = err.errors.map((el) => el.message[0]);
      break;

    case "SequelizeUniqueConstraintError":
      statusCode = 400;
      message = err.errors.map((el) => el.message[0]);
      break;

    case "JsonWebTokenError":
      statusCode = 401;
      message = "Invalid token";
      break;

    case "TokenExpiredError":
      statusCode = 401;
      message = "Token expired";
      break;

    case "UNAUTHORIZED":
      statusCode = 401;
      message = "Unauthorized, please login first";
      break;

    case "LOGIN_IDENTIFIER_PASSWORD_INVALID":
      statusCode = 401;
      message = "Invalid email/username or password";
      break;

    case "LOGIN_USER_NOT_VERIFIED":
      statusCode = 401;
      message = "User not verified, please verify your account";
      break;

    case "FORBIDDEN":
      statusCode = 403;
      message = "Forbidden, you don't have access to this resource";
      break;

    case "EMAIL_SEND_FAILED":
      statusCode = 500;
      message = err.message || "Failed to send email notification";
      break;
  }

  return res.status(statusCode).json({
    status: "error",
    message,
    data: null,
  });
}

module.exports = {
  errorHandler,
};
