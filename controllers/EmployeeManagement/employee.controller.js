// controllers/employee.controller.js
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import crypto from "crypto";
import sendPasswordResetEmail from "../../utills/sendMail.js";
import {
  employeeCreationSchema,
  employeeUpdateSchema,
  employeeLoginSchema,
} from "../../validators/EmployeeManagement/storeEmploye.validator.js";
import Employee from "../../models/EmployeeManagement/StoreEmployee.js";
import { BaseStore } from "../../models/StoreManagement/Store/BaseStore.js";
import { deleteFileFromObjectStorage } from "../../middlewares/multer.js";

// Create employee
export const createEmployee = async (req, res) => {
  try {
    const data = req.body;
    const { phone, email } = data;

    const { error } = employeeCreationSchema.validate(data);
    if (error) {
      return res.status(400).json({ error: error.details[0].message });
    }
    const isexistemployee = await BaseStore.findOne({
      $or: [{ phone: phone }, { email: email }],
    });

    if (isexistemployee) {
      return res.status(404).json({
        success: false,
        error: "EmailID or Phone Already Exist",
      });
    }

    const employee = new Employee({
      ...data,
      employeeImage: req.files?.employeeImage?.map((doc) => doc.key),
    });
    const savedEmployee = await employee.save();
    res.status(201).json(savedEmployee);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Get employee by ID
export const getEmployee = async (req, res) => {
  try {
    const employee = await Employee.findById(req.params.id);
    if (!employee) {
      return res.status(404).json({ error: "Employee not found" });
    }
    res.status(200).json(employee);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Update employee by ID
export const updateEmployee = async (req, res) => {
  try {
    const data = req.body;
    const {
      completeAddress,
      zone,
      firstName,
      lastName,
      phone,
      email,
      password,
    } = data;
    const employee = await Employee.findById({
      _id: req.params.id,
    });

    if (!employee) {
      return res.status(404).json({ error: "Employee not found" });
    }

    if (employee && employee.employeeImage.length > 0) {
      deleteFileFromObjectStorage(employee.employeeImage[0]);
    }

    employee.firstName = firstName;
    employee.lastName = lastName;
    employee.phone = phone;
    employee.email = email;
    employee.password = password;
    employee.zone = zone;
    employee.completeAddress = completeAddress;
    employee.employeeImage = req.files?.employeeImage?.map((doc) => doc.key);
    employee.save();

    res.status(200).json(employee);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Delete employee by ID
export const deleteEmployee = async (req, res) => {
  try {
    const employee = await Employee.findByIdAndDelete(req.params.id);
    if (!employee) {
      return res.status(404).json({ error: "Employee not found" });
    }
    res.status(204).end();
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Employee login

export const employeeLogin = async (req, res) => {
  try {
    const { error } = employeeLoginSchema.validate(req.body);
    if (error) {
      return res.status(400).json({ error: error.details[0].message });
    }
    const { email, phone, password } = req.body;

    // Find admin by email address
    const employee = await Employee.findOne({
      $or: [{ phone: phone }, { email: email }],
    });

    if (!employee) {
      return res
        .status(404)
        .json({ success: false, error: "storeEmployee not found" });
    }

    // Check if the provided password matches the stored hashed password
    if (!employee.authenticate(password)) {
      return res
        .status(400)
        .json({ success: false, errors: "Invalid Password" });
    }
    // Generate JWT token
    const token = jwt.sign({ userId: employee._id }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });

    employee.salt = undefined;
    employee.encry_password = undefined;

    // Set the token as a cookie
    res.cookie("token", token, { httpOnly: true, expiresIn: "1h" }); // You can set other options like expiration, domain, secure, etc. as needed

    // Send the user data and token in the response
    res.status(200).json({ success: true, store: employee, token });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message || "Something went wrong",
    });
  }
};
export const employeeLogout = (req, res) => {
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
    const employee = await Employee.findOne({ email });
    if (!employee) {
      return res.status(404).json({ error: "storeEmployee not found" });
    }

    // Generate a reset token
    const resetToken = generateToken();

    // Update user with reset token and expiry time
    employee.resetPasswordToken = resetToken;
    employee.resetPasswordExpires = Date.now() + 3600 * 5; // Token expires in 1 hour
    await employee.save();

    // Send password reset email
    await sendPasswordResetEmail(employee, resetToken);

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
    const employee = await Employee.findOne({ resetPasswordToken: resetToken });

    if (!employee) {
      return res.status(404).json({ error: "Invalid or expired reset token" });
    }

    // Check if the reset token has expired
    if (employee.resetPasswordExpires < Date.now()) {
      return res.status(401).json({ error: "Reset token has expired" });
    }

    employee.password = newPassword;
    employee.resetPasswordToken = undefined;
    employee.resetPasswordExpires = undefined;

    // Save the updated user
    await employee.save();

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
    const { oldPassword, newPassword } = req.body;

    // Find the user by userId
    const employee = await Employee.findOne({ _id: id });

    // If user not found
    if (!employee) {
      return res.status(404).json({ message: "StoreEmployee not found" });
    }

    // Compare old password with the hashed password stored in the database
    const passwordMatch = employee.authenticate(oldPassword);

    // If old password doesn't match
    if (!passwordMatch) {
      return res.status(400).json({ message: "Old password is incorrect" });
    }

    // Update user's password
    employee.password = newPassword;
    await employee.save();

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
