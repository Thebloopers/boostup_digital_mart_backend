import express, { urlencoded } from "express";
import dotenv from "dotenv";
import cors from "cors";
import dbConnection from "./database/db.js";
import path from "path";
import http from "http";
import { fileURLToPath } from "url";
import { Server } from "socket.io";

/****************IMPORT ROUTES*************/
import authRoutes from "./routes/User/auth.js";
import storeRoutes from "./routes/StoreManagement/Store/storeOwner.route.js";
import employeeRoutes from "./routes/EmployeeManagement/employee.route.js";
import categoryRoutes from "./routes/ProductManagement/Category/category.route.js";
import subCategoryRoutes from "./routes/ProductManagement/Category/subcategory.route.js";
import permisionRoutes from "./routes/EmployeeManagement/Permision/permision.route.js";
import ProductRoutes from "./routes/ProductManagement/Product/Product.route.js";
import AttributeRoutes from "./routes/ProductManagement/Attribute/attribute.route.js";
import UnitRoutes from "./routes/ProductManagement/Unit/unit.route.js";
import BannerRoutes from "./routes/PromotionManagement/banner.route.js";
import BasicCampaignRoutes from "./routes/PromotionManagement/basicCampagin.route.js";
import ItemCampaignRoutes from "./routes/PromotionManagement/ItemCampaign.route.js";
import CouponRoutes from "./routes/PromotionManagement/Coupon.route.js";
import NotificationRoutes from "./routes/PromotionManagement/Notification.route.js";

/********************************************/
const app = express();
dotenv.config();
const PORT = 7000;

/*****************MIDDLEWARES*****************/

app.use(cors());
app.use(express.json());
app.use(urlencoded({ extended: true }));

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use("/", express.static(__dirname + "/public"));
app.use("/socket", express.static(__dirname + "/socket"));

const server = http.createServer(app);

export const io = new Server(server, {
  cors: {
    origin: "*",
    methods: "*",
  },
});

io.on("connection", (socket) => {
  console.log("A user connected");

  // Handle disconnection
  socket.on("disconnect", () => {
    console.log("User disconnected");
  });
});

/*******************ROUTES******************/
app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/store", storeRoutes);
app.use("/api/v1/emoloyee", employeeRoutes);
app.use("/api/v1/category", categoryRoutes);
app.use("/api/v1/subcategory", subCategoryRoutes);
app.use("/api/v1/permision", permisionRoutes);
app.use("/api/v1/product", ProductRoutes);
app.use("/api/v1/attribute", AttributeRoutes);
app.use("/api/v1/unit", UnitRoutes);
app.use("/api/v1/banner", BannerRoutes);
app.use("/api/v1/basicCampaign", BasicCampaignRoutes);
app.use("/api/v1/itemCampaign", ItemCampaignRoutes);
app.use("/api/v1/coupon", CouponRoutes);
app.use("/api/v1/notification", NotificationRoutes);

/***************************************/

const MONGODB_URL = process.env.MONGODB_URL;

dbConnection(MONGODB_URL);

server.listen(PORT, (err) => {
  if (err) {
    console.log(`Error while listening on PORT: ${PORT}`);
  } else {
    console.log(`Server is listening on PORT: ${PORT}`);
  }
});
