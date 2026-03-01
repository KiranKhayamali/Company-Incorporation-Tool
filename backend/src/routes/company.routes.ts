import { Router } from "express";
import {
  createCompany,
  getCompanies,
  getCompanyById,
  addShareholders,
  updateCompany
} from "../controllers/company.controller";

const router = Router();

router.post("/", createCompany);
router.get("/", getCompanies);
router.get("/:id", getCompanyById);
router.post("/:id/shareholders", addShareholders);
router.put("/:id", updateCompany);

export default router;