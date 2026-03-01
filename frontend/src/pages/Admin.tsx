import { useEffect, useState } from "react";
import { api } from "../services/api";
import PageContainer from "../components/layout/PageContainer";
import Card from "../components/layout/Card";
import SectionTitle from "../components/ui/SectionTitle";

interface Shareholder {
  id: string;
  firstName: string;
  lastName: string;
  nationality: string;
}

interface Company {
  id: string;
  name: string;
  totalCapital: number;
  shareholders: Shareholder[];
}

const Admin = () => {
  const [companies, setCompanies] = useState<Company[]>([]);

  useEffect(() => {
    api.get("/companies").then((res) => {
      setCompanies(res.data);
    });
  }, []);

  return (
    <PageContainer>
      <div className="w-full max-w-4xl space-y-6">
        <SectionTitle>Admin Dashboard</SectionTitle>

        {companies.length === 0 && (
          <p className="text-center text-gray-500">
            No companies found.
          </p>
        )}

        {companies.map((company) => (
          <Card key={company.id}>
            <h3 className="text-xl font-semibold mb-2">
              {company.name}
            </h3>

            <p className="text-gray-600 mb-4">
              Total Capital: {company.totalCapital}
            </p>

            <p className="text-gray-600 mb-4">
              Number of Shareholders: {company.shareholders.length}
            </p>

            <div>
              <h4 className="font-medium mb-2">
                Shareholders
              </h4>

              <ul className="space-y-1">
                {company.shareholders.map((s) => (
                  <li
                    key={s.id}
                    className="text-sm text-gray-700"
                  >
                    <p>First Name: {s.firstName}</p>
                    <p>Last Name: {s.lastName}</p>
                    <p>Nationality: {s.nationality}</p>
                  </li>
                ))}
              </ul>
            </div>
          </Card>
        ))}
      </div>
    </PageContainer>
  );
};

export default Admin;