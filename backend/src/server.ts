import dotenv from "dotenv";
import express from "express";
import cors from "cors";
import companyRoutes from "./routes/company.routes";

dotenv.config({ path: '../.env' });

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/companies", companyRoutes);

const PORT = 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});