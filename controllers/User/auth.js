import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import crypto from "crypto"; // Import the crypto module
import { validateCreateAdmin } from "../../validators/User/admin.validator.js";
import { validateCreateUser } from "../../validators/User/user.validator.js";
import { AdminModel } from "../../models/User/Admin.js";
import { UserModel } from "../../models/User/User.js";

function generateToken() {
  return crypto.randomBytes(20).toString("hex");
}

export async function adminInsert(req, res) {
  try {
    const userData = req.body;

    // Validate user data before insertion
    const { error } = validateCreateAdmin(userData);
    if (error) {
      return res.status(400).json({ success: false, error: error?.message });
    }

    // Check if emailAddress already exists in UserModel
    const existingUser = await AdminModel.findOne({
      $or: [{ phone: userData?.phone }, { email: userData?.email }],
    });

    if (existingUser) {
      return res.status(400).json({
        success: false,
        error: "Admin with the given email already exists",
      });
    }

    // Insert User with userId
    const newUser = new AdminModel({
      ...userData,
    });

    const savedUser = await newUser.save();

    // Send Response
    res.status(200).json({
      success: true,
      message: "Admin Created",
      userData: savedUser,
    });
  } catch (error) {
    res
      .status(500)
      .json({ success: false, error: error.message || "Something went wrong" });
  }
}

export async function userInsert(req, res) {
  try {
    const userData = req.body;

    // Validate user data before insertion
    const { error } = validateCreateUser(userData);
    if (error) {
      return res.status(400).json({ success: false, error: error?.message });
    }

    // Check if emailAddress already exists in UserModel
    const existingUser = await UserModel.findOne({
      $or: [{ phone: userData?.phone }, { email: userData?.email }],
    });

    if (existingUser) {
      return res.status(400).json({
        success: false,
        error: "User with the given emailAddress already exists",
      });
    }

    // Insert User with userId
    const newUser = new UserModel({
      ...userData,
    });

    const savedUser = await newUser.save();

    // Send Response
    res.status(200).json({
      success: true,
      message: "Customer Created",
      userData: savedUser,
    });
  } catch (error) {
    res
      .status(500)
      .json({ success: false, error: error.message || "Something went wrong" });
  }
}

export async function adminLogin(req, res) {
  try {
    const { email, phone, password } = req.body;

    // Find admin by email address
    const user = await AdminModel.findOne({
      $or: [{ phone: phone }, { email: email }],
    });

    if (!user) {
      return res.status(404).json({ success: false, error: "Admin not found" });
    }

    // Check if the provided password matches the stored hashed password
    if (!user.authenticate(password)) {
      return res
        .status(400)
        .json({ success: false, errors: "Invalid Password" });
    }

    if (user?.isDisabled == true) {
      return res
        .status(404)
        .json({ success: false, error: "Admin blocked !!! Contact Developer" });
    }

    user.isOnline = true;
    await user.save();

    // Generate JWT token
    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });

    user.salt = undefined;
    user.ency_password = undefined;

    // Set the token as a cookie
    res.cookie("token", token, { httpOnly: true, expiresIn: "1h" }); // You can set other options like expiration, domain, secure, etc. as needed

    // Send the user data and token in the response
    res.status(200).json({ success: true, user: user, token });
  } catch (error) {
    res
      .status(500)
      .json({ success: false, error: error.message || "Something went wrong" });
  }
}

export async function userLogin(req, res) {
  try {
    const { email, phone, password } = req.body;

    // Find user by email address
    const user = await UserModel.findOne({
      $or: [{ phone: phone }, { email: email }],
    });
    if (!user) {
      return res.status(404).json({ success: false, error: "User not found" });
    }

    // Check if the provided password matches the stored hashed password
    if (!user.authenticate(password)) {
      return res
        .status(400)
        .json({ success: false, errors: "Invalid Password" });
    }

    if (user?.isDisabled == true) {
      return res
        .status(404)
        .json({ success: false, error: "User blocked !!! Contact Admin" });
    }

    user.isOnline = true;
    await user.save();

    // Generate JWT token
    const token = jwt.sign({ userId: user.userId }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });

    user.password = undefined;

    // Set the token as a cookie
    res.cookie("token", token, { httpOnly: true, expiresIn: "1h" }); // You can set other options like expiration, domain, secure, etc. as needed

    // Send the user data and token in the response
    res.status(200).json({ success: true, user, token });
  } catch (error) {
    res
      .status(500)
      .json({ success: false, error: error.message || "Something went wrong" });
  }
}

// export async function userWallet(req, res) {
//   try {
//     const { userId } = req.params;

//     // Find user by email address
//     const user = await UserModel.findOne({ userId: userId });
//     const userTree = await TreeModel.findOne({ userId: user?._id });

//     if (!user) {
//       return res.status(404).json({ error: "User not found" });
//     }

//     if (!userTree) {
//       return res.status(404).json({ error: "User Tree not found" });
//     }

//     // Send the user data and token in the response
//     res.status(200).json({
//       success: true,
//       mainWallet: user.mainWallet,
//       fundWallet: userTree.fundWallet,
//     });
//   } catch (error) {
//     res.status(500).json({ error: error.message || "Something went wrong" });
//   }
// }

// export async function userLogout(req, res) {
//   try {
//     // Instead of clearing localStorage here, send a response to the client to clear the token
//     res.clearCookie("token"); // Clearing a cookie if token is stored in cookies

//     // Alternatively, you can send a response instructing the client to clear the token from local storage
//     res
//       .status(200)
//       .json({ message: "Logged out successfully", clearToken: true });
//   } catch (error) {
//     res.status(500).json({ error: error.message || "Something went wrong" });
//   }
// }

// const transporter = nodemailer.createTransport({
//   service: "suryaumpteen@gmail.com", // e.g., 'gmail'
//   auth: {
//     user: "suryaumpteen@gmail.com",
//     pass: "egye onio jxeo rhmt",
//   },
// });

// async function sendPasswordResetEmail(user, resetToken) {
//   try {
//     await transporter.sendMail({
//       from: "suryaumpteen@gmail.com",
//       to: user.emailAddress,
//       subject: "Password Reset Request",
//       html:
//         "<p>Hello " +
//         user.name +
//         `, Please click here to <a href="http://localhost:3000/Resetpassword?resetToken=${resetToken}` +
//         '"></br> Reset </a> your password. </p>',
//     });
//     console.log("Password reset email sent successfully");
//   } catch (error) {
//     console.error("Error sending password reset email:", error);
//     throw new Error("Error sending password reset email");
//   }
// }

// export async function forgotPassword(req, res) {
//   try {
//     let { emailAddress } = req.body;

//     // Find user by email address
//     const user = await UserModel.findOne({ emailAddress });
//     if (!user) {
//       return res.status(404).json({ error: "User not found" });
//     }

//     // Generate a reset token
//     const resetToken = generateToken();

//     // Update user with reset token and expiry time
//     user.resetPasswordToken = resetToken;
//     user.resetPasswordExpires = Date.now() + 3600000; // Token expires in 1 hour
//     await user.save();

//     // Send password reset email
//     await sendPasswordResetEmail(user, resetToken);

//     // Respond to the client
//     res.status(200).json({ message: "Password reset email sent successfully" });
//   } catch (error) {
//     console.error("Error in forgotPassword:", error);
//     res.status(500).json({ error: error.message || "Something went wrong" });
//   }
// }

// // Reset password handler
// export async function resetPassword(req, res) {
//   try {
//     const { resetToken, newPassword } = req.body;

//     // Find user by reset token
//     const user = await UserModel.findOne({ resetPasswordToken: resetToken });

//     if (!user) {
//       return res.status(404).json({ error: "Invalid or expired reset token" });
//     }

//     // Check if the reset token has expired
//     if (user.resetPasswordExpires < Date.now()) {
//       return res.status(401).json({ error: "Reset token has expired" });
//     }

//     // Generate a new hashed password
//     const hashedPassword = await bcrypt.hash(newPassword, 10);

//     // Update user's password and clear reset token
//     user.password = hashedPassword;
//     user.resetPasswordToken = undefined;
//     user.resetPasswordExpires = undefined;

//     // Save the updated user
//     await user.save();

//     // Respond to the client
//     res.status(200).json({ message: "Password reset successful" });
//   } catch (error) {
//     console.error("Error in resetPassword:", error);
//     res.status(500).json({ error: error.message || "Something went wrong" });
//   }
// }

// // Method to change user password
// export async function changePassword(req, res) {
//   try {
//     const { userId } = req.params;
//     const { oldPassword, newPassword } = req.body;

//     // Find the user by userId
//     const user = await UserModel.findOne({ userId });

//     // If user not found
//     if (!user) {
//       return res.status(404).json({ message: "User not found" });
//     }

//     // Compare old password with the hashed password stored in the database
//     const passwordMatch = await bcrypt.compare(oldPassword, user.password);

//     // If old password doesn't match
//     if (!passwordMatch) {
//       return res.status(400).json({ message: "Old password is incorrect" });
//     }

//     // Hash the new password
//     const saltRounds = 10;
//     const hashedNewPassword = await bcrypt.hash(newPassword, saltRounds);

//     // Update user's password
//     user.password = hashedNewPassword;
//     await user.save();

//     // Send success response
//     res
//       .status(200)
//       .json({ success: true, message: "Password updated successfully" });
//   } catch (error) {
//     // Handle errors
//     res
//       .status(500)
//       .json({ message: "Something went wrong", error: error.message });
//   }
// }
