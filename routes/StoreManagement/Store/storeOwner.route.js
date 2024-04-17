// routes/store.routes.js

import express from "express";
import * as storeController from "../../../controllers/StoreManagement/Store/storeOwner.controller.js";
import { uploadS3 } from "../../../middlewares/multer.js";
const router = express.Router();

// Create store route()
router.post(
  "/",
  uploadS3.fields([
    { name: "storeLogo", maxCount: 1 },
    { name: "storeCover", maxCount: 1 },
  ]),
  storeController.createStore
);

// Get store route
router.get("/:id", storeController.getStore);

// Update store route
router.put(
  "/:id",
  uploadS3.fields([
    { name: "storeLogo", maxCount: 1 },
    { name: "storeCover", maxCount: 1 },
  ]),
  storeController.updateStore
);

// Delete store route
router.delete("/:id", storeController.deleteStore);

// Store login route
router.post("/login", storeController.storeLogin);

// Store login route
router.post("/logout", storeController.storeLogout);
router.post("/forgotPassword", storeController.forgotPassword);
router.post("/resetPassword", storeController.resetPassword);
router.post("/changePassword/:id", storeController.changePassword);

// forgetpassword route

export default router;
