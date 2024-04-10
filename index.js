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

/***************************************/

const MONGO_URI = process.env.MONGO_URI;

dbConnection(MONGO_URI);

server.listen(PORT, (err) => {
  if (err) {
    console.log(`Error while listening on PORT: ${PORT}`);
  } else {
    console.log(`Server is listening on PORT: ${PORT}`);
  }
});
