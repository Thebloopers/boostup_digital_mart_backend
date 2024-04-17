// controllers/campaign.controller.js

// controllers/campaign.controller.js
import { deleteFileFromObjectStorage } from "../../middlewares/multer.js";

import BasicCampaign from '../../models/PromotionManagement/BasicCampaignModel.js';
import { campaignValidationSchema } from '../../validators/PromotionManagement/BasicCampaign.validator.js';

// Create campaign
export const createCampaign = async (req, res) => {
  try {
     const { title, shortDescription, itemImage } = req.body;
     const { error } = campaignValidationSchema.validate({
       title,
       shortDescription,
       itemImage,
     });
    if (error) {
      return res.status(400).json({ error: error.details[0].message });
    }

    // Create new campaign
    const campaign = new BasicCampaign({
      ...req.body,
      itemImage: req.files?.itemImage.map(doc=>doc.key)
    });
    const savedCampaign = await campaign.save();
    res.status(201).json(savedCampaign);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Get all campaigns
export const getAllCampaigns = async (req, res) => {
  try {
    const campaigns = await BasicCampaign.find();
    res.status(200).json(campaigns);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get campaign by ID
export const getCampaignById = async (req, res) => {
  try {
    const campaign = await BasicCampaign.findById(req.params.id);
    if (!campaign) {
      return res.status(404).json({ error: 'Campaign not found' });
    }
    res.status(200).json(campaign);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Update campaign by ID
export const updateCampaignById = async (req, res) => {
  try {
    // Validate request body
    const { title, shortDescription, itemImage } = req.body;
    const { error } = campaignValidationSchema.validate({
      title,
      shortDescription,
      itemImage,
    });
    if (error) {
      return res.status(400).json({ error: error.details[0].message });
    }

    const updatedCampaign = await BasicCampaign.findById(req.params.id);
    if (!updatedCampaign) {
      return res.status(404).json({ error: 'Campaign not found' });
    }
    if (updatedCampaign && updatedCampaign.itemImage.length > 0) {
      updatedCampaign.itemImage.map((doc) => deleteFileFromObjectStorage(doc));
    }
    updatedCampaign.title=req.body.title;
    updatedCampaign.shortDescription = req.body.shortDescription;
    updatedCampaign.itemImage = req.files?.itemImage.map(doc=>doc.key);
    updatedCampaign.startDate = req.body.startDate;
    updatedCampaign.endDate = req.body.endDate;
    updatedCampaign.startTime = req.body.startTime;
    updatedCampaign.endTime = req.body.endTime;
    await updatedCampaign.save();
    res.status(200).json(updatedCampaign);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Delete campaign by ID
export const deleteCampaignById = async (req, res) => {
  try {
    const deletedCampaign = await BasicCampaign.findByIdAndDelete(
      req.params.id
    );
    if (!deletedCampaign) {
      return res.status(404).json({ error: 'Campaign not found' });
    }
    res.status(204).end();
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};


