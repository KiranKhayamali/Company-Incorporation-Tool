import { Router } from "express";
import {
  createCompany,
  getCompanies,
  getCompanyById,
  addShareholders
} from "../controllers/company.controller";

const router = Router();

router.post("/", createCompany);
router.get("/", getCompanies);
router.get("/:id", getCompanyById);
router.post("/:id/shareholders", addShareholders);

export default router;