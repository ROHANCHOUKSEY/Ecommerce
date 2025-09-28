const jwt = require("jsonwebtoken");

const AdminAuth = async (req, res, next) => {
  const { token } = req.cookies;

  if (!token) {
    return res
      .status(400)
      .json({ success: false, message: "token is not found" });
  }

  const decodeToken = jwt.verify(token, process.env.JWT_SECRETKEY);

  if (decodeToken.adminId) {
    req.adminId = decodeToken.adminId;
  } else {
    return res.json({
        success:false,
        message:"not authorized, login again"
    })
  }

  next();
};

module.exports = AdminAuth;
