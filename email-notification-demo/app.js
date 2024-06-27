import { createServer } from "http";
import express from "express";
import "dotenv/config";
import { initRoutes } from "./config/router.js";

const app = express();
const server = createServer(app);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

server.listen(process.env.PORT, async () => {
  console.log("Server listening to PORT", process.env.PORT);
  initRoutes(app);
});
