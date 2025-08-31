import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import contratosRoutes from "./routes/contratos";

const app = express();
app.use(cors());
app.use(express.json({ limit: "10mb" }));
app.use(contratosRoutes);

mongoose.connect("mongodb+srv://mateusnicoletti:221253310@cluster0.dprkjev.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0");

app.listen(3000, () => console.log("Backend rodando na 3000"));
