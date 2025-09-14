const jwt = require("jsonwebtoken");

const userAuth = async (req, res, next) => {
  const {token} = req.cookies;

  if (!token) {
    return res.json({ success: "false", message: "token not found" });
  }

  const decodeToken = jwt.verify(token, process.env.JWT_SECRETKEY);

  console.log("decodeToken: ", decodeToken);

  if (decodeToken.userID) {
    req.userID = decodeToken.userID;
  } else {
    return res.json({
      success: "false",
      message: "not authorized login again",
    });
  }
 
  next();
};

module.exports = userAuth;
