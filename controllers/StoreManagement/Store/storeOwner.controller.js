import Store from "../../../models/StoreManagement/Store/StoreOwner.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import crypto from "crypto";
import sendPasswordResetEmail from "../../../utills/sendMail.js";
import {
  storeCreationSchema,
  storeUpdateSchema,
  storeLoginSchema,
} from "../../../validators/StoreManagement/Store/storeOwner.validator.js";
import { deleteFileFromObjectStorage } from "../../../middlewares/multer.js";
import { BaseStore } from "../../../models/StoreManagement/Store/BaseStore.js";

function generateToken() {
  return crypto.randomBytes(20).toString("hex");
}

export const createStore = async (req, res) => {
  try {
    // Validate request body
    const data = req.body;
    const { error } = storeCreationSchema.validate(data);
    if (error) {
      return res.status(400).json({ error: error.details[0].message });
    }

    // Extract properties from req.body using object destructuring
    const { phone, email } = data;

    // Create store object directly using extracted properties
    const isexiststore = await BaseStore.findOne({
      $or: [{ phone: phone }, { email: email }],
    });

    if (isexiststore) {
      return res.status(404).json({
        success: false,
        error: "EmailID or Phone Already Exist",
      });
    }
    const store = new Store({
      ...data,
      storeLogo: req.files?.storeLogo?.map((doc) => doc.key),
      storeCover: req.files?.storeCover?.map((doc) => doc.key),
    });

    // Save store to database
    const savedStore = await store.save();
    res.status(201).json(savedStore);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Get store by ID
export const getStore = async (req, res) => {
  try {
    const store = await Store.findById(req.params.id).populate("admin");
    if (!store) {
      return res.status(404).json({ error: "Store not found" });
    }
    res.status(200).json(store);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Update store by ID
export const updateStore = async (req, res) => {
  try {
    // Validate request body

    const { error } = storeUpdateSchema.validate(req.body);
    if (error) {
      return res.status(400).json({ error: error.details[0].message });
    }
    const data = req.body;
    const {
      storeName,
      completeAddress,
      vat_tax,
      zone,
      latitude,
      longitude,
      firstName,
      lastName,
      phone,
      email,
      password,
    } = data;

    const store = await Store.findById({
      _id: req.params.id,
    });

    if (store && store.storeLogo.length > 0) {
      await store.storeLogo.map((doc) => deleteFileFromObjectStorage(doc));
    }

    if (store && store.storeCover.length > 0) {
      await store.storeCover.map((doc) => deleteFileFromObjectStorage(doc));
    }
    store.storeName = storeName;
    store.completeAddress = completeAddress;
    store.vat_tax = vat_tax;
    store.zone = zone;
    store.latitude = latitude;
    store.longitude = longitude;
    store.firstName = firstName;
    store.lastName = lastName;
    store.password = password;
    store.storeLogo = req.files?.storeLogo?.map((doc) => doc.key);
    store.storeCover = req.files?.storeCover?.map((doc) => doc.key);
    store.phone = phone;
    store.email = email;
    await store.save();

    if (!store) {
      return res.status(404).json({ error: "Store not found" });
    }
    res.status(200).json(store);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Delete store by ID
export const deleteStore = async (req, res) => {
  try {
    const store = await Store.findByIdAndDelete(req.params.id);
    if (!store) {
      return res.status(404).json({ error: "Store not found" });
    }
    res.status(204).end();
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Store login
export const storeLogin = async (req, res) => {
  try {
    const { error } = storeLoginSchema.validate(req.body);
    if (error) {
      return res.status(400).json({ error: error.details[0].message });
    }
    const { email, phone, password } = req.body;

    // Find admin by email address
    const store = await Store.findOne({
      $or: [{ phone: phone }, { email: email }],
    });

    if (!store) {
      return res
        .status(404)
        .json({ success: false, error: "storeOwner not found" });
    }

    // Check if the provided password matches the stored hashed password
    if (!store.authenticate(password)) {
      return res
        .status(400)
        .json({ success: false, errors: "Invalid Password" });
    }
    // Generate JWT token
    const token = jwt.sign({ userId: store._id }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });

    store.salt = undefined;
    store.encry_password = undefined;

    // Set the token as a cookie
    res.cookie("token", token, { httpOnly: true, expiresIn: "1h" }); // You can set other options like expiration, domain, secure, etc. as needed

    // Send the user data and token in the response
    res.status(200).json({ success: true, store: store, token });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message || "Something went wrong",
    });
  }
};
export const storeLogout = (req, res) => {
  try {
    // Instead of clearing localStorage here, send a response to the client to clear the token
    res.clearCookie("token"); // Clearing a cookie if token is stored in cookies

    // Alternatively, you can send a response instructing the client to clear the token from local storage
    res
      .status(200)
      .json({ message: "Logged out successfully", clearToken: true });
  } catch (error) {
    res.status(500).json({ error: error.message || "Something went wrong" });
  }
};

export const forgotPassword = async (req, res) => {
  try {
    let { email } = req.body;

    // Find user by email address
    const store = await Store.findOne({ email });
    if (!store) {
      return res.status(404).json({ error: "storeOwner not found" });
    }

    // Generate a reset token
    const resetToken = generateToken();

    // Update user with reset token and expiry time
    store.resetPasswordToken = resetToken;
    store.resetPasswordExpires = Date.now() + 3600 * 5; // Token expires in 1 hour
    await store.save();

    // Send password reset email
    await sendPasswordResetEmail(store, resetToken);

    // Respond to the client
    res.status(200).json({ message: "Password reset email sent successfully" });
  } catch (error) {
    console.error("Error in forgotPassword:", error);
    res.status(500).json({ error: error.message || "Something went wrong" });
  }
};

// Reset password handler
export const resetPassword = async (req, res) => {
  try {
    const { resetToken, newPassword } = req.body;

    // Find user by reset token
    const store = await Store.findOne({ resetPasswordToken: resetToken });

    if (!store) {
      return res.status(404).json({ error: "Invalid or expired reset token" });
    }

    // Check if the reset token has expired
    if (store.resetPasswordExpires < Date.now()) {
      return res.status(401).json({ error: "Reset token has expired" });
    }

    // Generate a new hashed password

    // Update user's password and clear reset token
    store.password = newPassword;
    store.resetPasswordToken = undefined;
    store.resetPasswordExpires = undefined;

    // Save the updated user
    await store.save();

    // Respond to the client
    res.status(200).json({ message: "Password reset successful" });
  } catch (error) {
    console.error("Error in resetPassword:", error);
    res.status(500).json({ error: error.message || "Something went wrong" });
  }
};

export const changePassword = async (req, res) => {
  try {
    const { id } = req.params;
    console.log(id);
    const { oldPassword, newPassword } = req.body;
    console.log(req.body);
    // Find the user by userId
    const store = await Store.findOne({ _id: id });

    // If user not found
    if (!store) {
      return res.status(404).json({ message: "StoreOwner not found" });
    }

    // Compare old password with the hashed password stored in the database
    const passwordMatch = store.authenticate(oldPassword);
    console.log(passwordMatch);
    // If old password doesn't match
    if (!passwordMatch) {
      return res.status(400).json({ message: "Old password is incorrect" });
    }

    // Hash the new password

    // Update user's password
    store.password = newPassword;
    await store.save();

    // Send success response
    res
      .status(200)
      .json({ success: true, message: "Password updated successfully" });
  } catch (error) {
    // Handle errors
    res
      .status(500)
      .json({ message: "Something went wrong", error: error.message });
  }
};
