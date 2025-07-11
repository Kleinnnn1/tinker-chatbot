import express from "express";
import cors from "cors";
import { config } from "dotenv";
import chatRoute from "./routes/chat.js";

config();
const app = express();
app.use(cors());
app.use(express.json());

app.use("/api/chat", chatRoute);

app.listen(3001, () => console.log("Server running on http://localhost:3001"));
