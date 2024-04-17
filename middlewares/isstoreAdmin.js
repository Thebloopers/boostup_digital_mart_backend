import jwt from "jsonwebtoken";
import User from "../models/User/Admin.js";
const isStoreAdmin = async (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader) {
    return res
      .status(401)
      .json({ success: false, error: "Authorization Required" });
  }
  const token = authHeader.split(" ")[1];
  try {
    const decode = jwt.verify(token, process.env.SECRET_KEY);
    const user = await User.findOne({
      _id: decode.userId,
    });
    if (!user) {
      return res
        .status(401)
        .json({ success: false, error: "Please Authenticate" });
    } else {
      if (user.role < 2) {
        return res
          .status(401)
          .json({ success: false, error: "You Are Not Admin" });
      }
      req.token = token;
      req.profile = user;
      next();
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({ success: false, error: "Server error" });
  }
};
export default isAdmin;
