import { Request, Response } from "express";
import { ZodError } from "zod";
import {
  createCompanyService,
  getAllCompaniesService,
  getCompanyByIdService,
  addShareholdersService,
  updateCompanyService
} from "../services/company.service";
import { createCompanySchema, addShareholdersSchema } from "../schemas/company.schema";

const formatZodError = (error: ZodError) => {
  return error.issues.map((err) => ({
    field: err.path.join("."),
    message: err.message,
  }));
};

export const createCompany = async (req: Request, res: Response) => {
  try {
    const validated = createCompanySchema.parse(req.body);

    const company = await createCompanyService(validated);

    res.status(201).json(company);
  } catch (error) {
    if (error instanceof ZodError) {
      return res.status(400).json({
        message: "Validation failed",
        errors: formatZodError(error),
      });
    }
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
    const company = await getCompanyByIdService(req.params.id as string);

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
    
    const validated = addShareholdersSchema.parse({
      companyId: id,
      shareholders: req.body.shareholders,
    });

    await addShareholdersService(validated.companyId, validated.shareholders);

    res.status(201).json({ message: "Shareholders added successfully" });
  } catch (error) {
    if (error instanceof ZodError) {
      return res.status(400).json({
        message: "Validation failed",
        errors: formatZodError(error),
      });
    }
    res.status(500).json({ message: "Server error" });
  }
};

export const updateCompany = async (req: Request, res: Response) => {
  try {
    const { name, numberOfShareholders, totalCapital } = req.body;

    const updated = await updateCompanyService(req.params.id as string, {
      name,
      numberOfShareholders,
      totalCapital,
    });

    res.json(updated);
  } catch (error) {
    res.status(500).json({ message: "Update failed" });
  }
};
