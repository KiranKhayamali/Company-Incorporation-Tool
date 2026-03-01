import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { api } from "../services/api";

const CompanyForm = () => {
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [numberOfShareholders, setNumberOfShareholders] = useState(1);
  const [totalCapital, setTotalCapital] = useState(0);

  useEffect(() => {
    const companyId = localStorage.getItem("companyId");
    if (companyId) {
      api.get(`/companies/${companyId}`).then((res) => {
        const data = res.data;
        setName(data.name);
        setNumberOfShareholders(data.numberOfShareholders);
        setTotalCapital(data.totalCapital);
      });
    }
  }, []);

  const handleSubmit = async () => {
    const response = await api.post("/companies", {
      name,
      numberOfShareholders,
      totalCapital,
    });

    localStorage.setItem("companyId", response.data.id);
    navigate("/shareholders");
  };

  return (
    <div>
      <h2>Company Information</h2>

      <input
        placeholder="Company Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />

      <input
        type="number"
        placeholder="Number of Shareholders"
        value={numberOfShareholders}
        onChange={(e) => setNumberOfShareholders(Number(e.target.value))}
      />

      <input
        type="number"
        placeholder="Total Capital"
        value={totalCapital}
        onChange={(e) => setTotalCapital(Number(e.target.value))}
      />

      <button onClick={handleSubmit}>Next</button>
    </div>
  );
};

export default CompanyForm;