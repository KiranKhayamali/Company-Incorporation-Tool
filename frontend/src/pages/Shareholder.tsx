import { useEffect, useState } from "react";
import { api } from "../services/api";
import { useNavigate } from "react-router-dom";

interface Shareholder {
  firstName: string;
  lastName: string;
  nationality: string;
}

const ShareholderForm = () => {
const navigate = useNavigate();
  const [shareholders, setShareholders] = useState<Shareholder[]>([]);
  const companyId = localStorage.getItem("companyId");

  useEffect(() => {
    if (!companyId) return;

    api.get(`/companies/${companyId}`).then((res) => {
      const count = res.data.numberOfShareholders;
      setShareholders(
        Array.from({ length: count }, () => ({
          firstName: "",
          lastName: "",
          nationality: "",
        }))
      );
    });
  }, []);

  const handleChange = (
    index: number,
    field: keyof Shareholder,
    value: string
  ) => {
    const updated = [...shareholders];
    updated[index][field] = value;
    setShareholders(updated);
  };

  const handleSubmit = async () => {
    await api.post(`/companies/${companyId}/shareholders`, {
      shareholders,
    });

    alert("Company Incorporated Successfully!");
    localStorage.removeItem("companyId");
    navigate("/");
  };

  return (
    <div>
      <h2>Shareholders Information</h2>

      {shareholders.map((s, index) => (
        <div key={index}>
          <h4>Shareholder {index + 1}</h4>

          <input
            placeholder="First Name"
            onChange={(e) =>
              handleChange(index, "firstName", e.target.value)
            }
          />

          <input
            placeholder="Last Name"
            onChange={(e) =>
              handleChange(index, "lastName", e.target.value)
            }
          />

          <input
            placeholder="Nationality"
            onChange={(e) =>
              handleChange(index, "nationality", e.target.value)
            }
          />
        </div>
      ))}

      <button onClick={handleSubmit}>Submit</button>
    </div>
  );
};

export default ShareholderForm;