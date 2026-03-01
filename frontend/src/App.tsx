import { Route, Routes } from 'react-router-dom'
import CompanyForm from "./pages/Company"
import ShareholderForm from "./pages/Shareholder"
import Admin from "./pages/Admin"
import './App.css'

function App() {
  return (
    <Routes>
      <Route path="/" element={<CompanyForm />} />
      <Route path="/shareholders" element={<ShareholderForm />} />
      <Route path="/admin" element={<Admin />} />
    </Routes>
  )
}

export default App
