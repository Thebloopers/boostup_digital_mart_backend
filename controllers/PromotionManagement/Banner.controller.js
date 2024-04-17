// controllers/banner.controller.js

import { deleteFileFromObjectStorage } from "../../middlewares/multer.js";
import Banner from "../../models/PromotionManagement/BannerModel.js";
import { bannerValidationSchema } from "../../validators/PromotionManagement/Banner.validator.js";

// Create banner
export const createBanner = async (req, res) => {
  try {
    // Validate request body
    const { error } = bannerValidationSchema.validate(req.body);
    if (error) {
      return res.status(400).json({ error: error.details[0].message });
    }

    // Create new banner
    const banner = new Banner({
      ...req.body,
      bannerImage: req.files?.bannerImage?.map((doc) => doc.key),
    });
    const savedBanner = await banner.save();
    res.status(201).json(savedBanner);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Get all banners
export const getAllBanners = async (req, res) => {
  try {
    const banners = await Banner.find();
    res.status(200).json(banners);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get banner by ID
export const getBannerById = async (req, res) => {
  try {
    console.log(req.params.id);
    const banner = await Banner.findById({_id:req.params.id})
    if (!banner) {
      return res.status(404).json({ error: "Banner not found" });
    }
    res.status(200).json(banner);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Update banner by ID
export const updateBannerById = async (req, res) => {
  try {
    // Validate request body
    console.log(req.params.id);
    const { error } = bannerValidationSchema.validate(req.body);
    if (error) {
      return res.status(400).json({ error: error.details[0].message });
    }

    const updatedBanner = await Banner.findById(req.params.id);
    console.log(updatedBanner);

    if (!updatedBanner) {
      return res.status(404).json({ error: "Banner not found" });
    }
    if (updatedBanner && updatedBanner.bannerImage.length > 0) {
      updatedBanner.bannerImage.map((doc) => deleteFileFromObjectStorage(doc));
    }
    
    updatedBanner.title=req.body.title;
    updatedBanner.zone = req.body.zone;
    updatedBanner.bannerType = req.body.bannerType;
    updatedBanner.store = req.body.store;
    updatedBanner.defaultLink = req.body.defaultLink;
    updatedBanner.bannerImage = req.files?.bannerImage?.map((doc) => doc.key);;
    await updatedBanner.save();
    res.status(200).json(updatedBanner);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Delete banner by ID
export const deleteBannerById = async (req, res) => {
  try {
    const deletedBanner = await Banner.findByIdAndDelete(req.params.id);
    if (!deletedBanner) {
      return res.status(404).json({ error: "Banner not found" });
    }
    res.status(204).end();
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
