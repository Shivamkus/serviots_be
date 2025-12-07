const jwt = require("jsonwebtoken");
const dotenv = require("dotenv").config();

exports.protected = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res
        .status(401)
        .json({ message: "UnAutorized : No Token Provided" });
    }

    const token = authHeader.split(" ")[1];
    const decode = jwt.decode(token, process.env.JWT_SECREATE);

    req.user = decode;

    next();
  } catch (error) {
    console.log("JWT verification Failed", error.message);
    return res.status(403).json({
      message: "Invalid or Expired Token",
    });
  }
};
