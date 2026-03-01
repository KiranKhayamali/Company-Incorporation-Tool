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
      <div className="w-full max-w-5xl">
        <Card>
          <SectionTitle>Admin Dashboard</SectionTitle>
          <p className="text-center text-gray-600 text-sm md:text-base">
            Review all incorporated companies and shareholder details in one place.
          </p>

          <div className="mt-6 flex justify-center">
            <span className="inline-flex items-center rounded-full bg-blue-100 px-4 py-2 text-sm font-medium text-blue-700">
              Total Companies: {companies.length}
            </span>
          </div>
        </Card>

        {companies.length === 0 ? (
          <Card>
            <p className="text-center text-gray-500">
              No companies found.
            </p>
          </Card>
        ) : (
          <div className="mt-6 grid gap-6 md:grid-cols-2">
            {companies.map((company) => (
              <Card key={company.id}>
                <div className="space-y-4 text-left">
                  <div className="border-b border-gray-200 pb-3">
                    <h3 className="text-xl font-semibold text-gray-900">
                      {company.name}
                    </h3>
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div className="rounded-lg bg-gray-50 p-3">
                      <p className="text-xs text-gray-500">Total Capital</p>
                      <p className="text-base font-semibold text-gray-900">
                        {company.totalCapital}
                      </p>
                    </div>
                    <div className="rounded-lg bg-gray-50 p-3">
                      <p className="text-xs text-gray-500">Shareholders</p>
                      <p className="text-base font-semibold text-gray-900">
                        {company.shareholders.length}
                      </p>
                    </div>
                  </div>

                  <div>
                    <h4 className="font-medium text-gray-800 mb-2">Shareholders</h4>

                    <ul className="space-y-2">
                      {company.shareholders.map((s) => (
                        <li
                          key={s.id}
                          className="rounded-lg border border-gray-200 bg-gray-50 p-3"
                        >
                          <p className="font-medium text-gray-900">
                            {s.firstName} {s.lastName}
                          </p>
                          <p className="text-sm text-gray-600">Nationality : {s.nationality}</p>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        )}
      </div>
    </PageContainer>
  );
};

export default Admin;