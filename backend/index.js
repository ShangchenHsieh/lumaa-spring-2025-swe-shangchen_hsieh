import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import authRoutes from "./routers/auth.js";
import taskRoutes from "./routers/task.js";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

// including routes
app.use("/auth", authRoutes);
app.use("/tasks", taskRoutes);


const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
    console.log(`Server is running on https://localhost:${PORT}`);
});
