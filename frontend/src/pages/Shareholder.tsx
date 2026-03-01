import { useEffect, useState } from "react";
import { api } from "../services/api";
import { useNavigate } from "react-router-dom";
import PageContainer from "../components/layout/PageContainer";
import Card from "../components/layout/Card";
import SectionTitle from "../components/ui/SectionTitle";
import Input from "../components/ui/Input";
import Button from "../components/ui/Button";

interface Shareholder {
  firstName: string;
  lastName: string;
  nationality: string;
}

const ShareholderForm = () => {
  const navigate = useNavigate();
  const [shareholders, setShareholders] = useState<Shareholder[]>([]);
  const companyId = localStorage.getItem("companyId");

  // Load draft or initialize empty shareholder forms
  useEffect(() => {
    if (!companyId) return;

    // Try to load draft first
    const draft = localStorage.getItem("shareholdersDraft");
    if (draft) {
      setShareholders(JSON.parse(draft));
      return;
    }

    // If no draft, initialize empty forms based on company data
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
  }, [companyId]);

  useEffect(() => {
    if (!companyId) {
        window.location.href = "/";
    }

    // Auto-save draft whenever shareholder data changes
    if (shareholders.length > 0) {
      localStorage.setItem("shareholdersDraft", JSON.stringify(shareholders));
    }
  }, [shareholders]);

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
    // Clear all drafts and company ID after successful submission
    localStorage.removeItem("companyId");
    localStorage.removeItem("companyDraft");
    localStorage.removeItem("shareholdersDraft");
    navigate("/");
  };

  return (
    <PageContainer>
        <Card>
            <SectionTitle>Shareholders Information</SectionTitle>

            {shareholders.map((s, index) => (
                <div key={index} className="mb-6 border border-gray-200 p-4 rounded-xl bg-gray-50">
                <h4 className="font-semibold mb-3">Shareholder {index + 1}</h4>

                <Input
                    placeholder="First Name"
                    value={s.firstName}
                    onChange={(e) =>
                    handleChange(index, "firstName", e.target.value)
                    }
                />

                <Input
                    placeholder="Last Name"
                    value={s.lastName}
                    onChange={(e) =>
                    handleChange(index, "lastName", e.target.value)
                    }
                />

                <Input
                    placeholder="Nationality"
                    value={s.nationality}
                    onChange={(e) =>
                    handleChange(index, "nationality", e.target.value)
                    }
                />
                </div>
            ))}

            <Button onClick={handleSubmit}>Submit</Button>
      </Card>
    </PageContainer>
  );
};

export default ShareholderForm;