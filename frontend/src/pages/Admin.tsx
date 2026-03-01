import { useEffect, useState } from "react";
import { api } from "../services/api";

const Admin = () => {
  const [companies, setCompanies] = useState([]);

  useEffect(() => {
    api.get("/companies").then((res) => {
      setCompanies(res.data);
    });
  }, []);

  return (
    <div>
      <h2>Admin Panel</h2>

      {companies.map((company: any) => (
        <div key={company.id}>
          <h3>{company.name}</h3>
          <p>Total Capital: {company.totalCapital}</p>
          <h4>Number of Shareholders: {company.numberOfShareholders}</h4>

          <ul>
            {company.shareholders.map((s: any) => (
              <li key={s.id}>
                {s.firstName} {s.lastName} - {s.nationality}
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
};

export default Admin;