import { Request, Response } from "express";
import {
  createCompanyService,
  getAllCompaniesService,
  getCompanyByIdService,
  addShareholdersService
} from "../services/company.service";

export const createCompany = async (req: Request, res: Response) => {
  try {
    const { name, numberOfShareholders, totalCapital } = req.body;

    if (!name || numberOfShareholders <= 0 || totalCapital <= 0) {
      return res.status(400).json({ message: "Invalid input" });
    }

    const company = await createCompanyService({
      name,
      numberOfShareholders,
      totalCapital
    });

    res.status(201).json(company);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

export const getCompanies = async (_req: Request, res: Response) => {
  try {
    const companies = await getAllCompaniesService();
    res.json(companies);
  } catch {
    res.status(500).json({ message: "Server error" });
  }
};

export const getCompanyById = async (req: Request, res: Response) => {
  try {
    const company = await getCompanyByIdService(req.params.id);

    if (!company) {
      return res.status(404).json({ message: "Company not found" });
    }

    res.json(company);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

export const addShareholders = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { shareholders } = req.body;

    if (!Array.isArray(shareholders)) {
      return res.status(400).json({ message: "Invalid shareholders data" });
    }

    await addShareholdersService(id, shareholders);

    res.status(201).json({ message: "Shareholders added successfully" });
  } catch {
    res.status(500).json({ message: "Server error" });
  }
};