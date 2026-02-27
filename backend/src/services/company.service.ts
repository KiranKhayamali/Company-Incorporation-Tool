import { prisma } from "../prisma";

export const createCompanyService = async (data: {
  name: string;
  numberOfShareholders: number;
  totalCapital: number;
}) => {
  return prisma.company.create({
    data
  });
};

export const getAllCompaniesService = async () => {
  return prisma.company.findMany({
    include: { shareholders: true }
  });
};

export const getCompanyByIdService = async (id: string) => {
  return prisma.company.findUnique({
    where: { id },
    include: { shareholders: true }
  });
};

export const addShareholdersService = async (
  companyId: string,
  shareholders: {
    firstName: string;
    lastName: string;
    nationality: string;
  }[]
) => {
  return prisma.$transaction(async (tx) => {
    const company = await tx.company.findUnique({
      where: { id: companyId }
    });

    if (!company) {
      throw new Error("Company not found");
    }

    if (shareholders.length !== company.numberOfShareholders) {
      throw new Error("Shareholder count mismatch");
    }

    return tx.shareholder.createMany({
      data: shareholders.map((s) => ({
        ...s,
        companyId
      }))
    });
  });
};