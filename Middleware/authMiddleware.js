const { decode } = require("jsonwebtoken");
const jwt = require("jsonwebtoken");
const User = require('../model/user.model')

const protect = async (req, res, next) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer ")
  ) {
    try {
      //get token from header
      token = req.headers.authorization.split(" ")[1];
      //verify token
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      //get user from token
      req.user = await User.findById(decoded.id).select("-password");
      

      next();
    } catch (error) {
      console.log("abc",error);
      res.status(401);
      throw new Error("Not authorized");
    }
  }

  if (!token) {
    console.log(error);
    res.status(401);
    throw new Error("Not authorized");
  }
};

module.exports = { protect };
