// controllers/notification.controller.js

import Notification from "../../models/PromotionManagement/Notification.model.js";
import { notificationValidationSchema } from "../../validators/PromotionManagement/Notification.validator.js";

// Create notification
export const createNotification = async (req, res) => {
  try {
    // Validate request body
    const { error } = notificationValidationSchema.validate(req.body);
    if (error) {
      return res.status(400).json({ error: error.details[0].message });
    }

    // Create new notification
    const notification = new Notification({
      ...req.body,
      image: req.files?.image.map(doc=>doc.key)
    });
    const savedNotification = await notification.save();
    res.status(201).json(savedNotification);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Get all notifications
export const getAllNotifications = async (req, res) => {
  try {
    const notifications = await Notification.find();
    res.status(200).json(notifications);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get notification by ID
export const getNotificationById = async (req, res) => {
  try {
    const notification = await Notification.findById(req.params.id);
    if (!notification) {
      return res.status(404).json({ error: "Notification not found" });
    }
    res.status(200).json(notification);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Update notification by ID
export const updateNotificationById = async (req, res) => {
  try {
    // Validate request body
    const { error } = notificationValidationSchema.validate(req.body);
    if (error) {
      return res.status(400).json({ error: error.details[0].message });
    }

    const updatedNotification = await Notification.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    if (!updatedNotification) {
      return res.status(404).json({ error: "Notification not found" });
    }
    res.status(200).json(updatedNotification);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Delete notification by ID
export const deleteNotificationById = async (req, res) => {
  try {
    const deletedNotification = await Notification.findByIdAndDelete(
      req.params.id
    );
    if (!deletedNotification) {
      return res.status(404).json({ error: "Notification not found" });
    }
    res.status(204).end();
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
