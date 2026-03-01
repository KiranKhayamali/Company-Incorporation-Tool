import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { api } from "../services/api";

const CompanyForm = () => {
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [numberOfShareholders, setNumberOfShareholders] = useState(1);
  const [totalCapital, setTotalCapital] = useState(0);

  // Load draft or existing company data on mount
  useEffect(() => {
    // Try to load draft first
    const draft = localStorage.getItem("companyDraft");
    if (draft) {
      const data = JSON.parse(draft);
      setName(data.name || "");
      setNumberOfShareholders(data.numberOfShareholders || 1);
      setTotalCapital(data.totalCapital || 0);
      return;
    }

    // If no draft, try to load existing company data
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

  // Auto-save draft whenever form data changes
  useEffect(() => {
    const draft = {
      name,
      numberOfShareholders,
      totalCapital,
    };
    localStorage.setItem("companyDraft", JSON.stringify(draft));
  }, [name, numberOfShareholders, totalCapital]);

  const handleSubmit = async () => {
    const existingId = localStorage.getItem("companyId");
    console.log("Submitting company id:", {existingId, name} );
    let response;
    if (existingId) {
        response = await api.put(`/companies/${existingId}`, {
            name,
            numberOfShareholders,
            totalCapital,
        });
    } else {
        response = await api.post("/companies", {
            name,
            numberOfShareholders,
            totalCapital,
        });
    };

    localStorage.setItem("companyId", response.data.id);
    // Clear draft after successful submission
    localStorage.removeItem("companyDraft");
    navigate("/shareholders");
  };

  return (
    <div className="container">
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