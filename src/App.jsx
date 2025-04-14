import { BrowserRouter, Routes, Route } from "react-router-dom";
import LandingPage from "./components/pages/LandingPage";
import BasicHome from "./components/portals/BasicPortal/BasicHome";
import BasicDashboard from "./components/portals/BasicPortal/BasicDashboard";
// import AdminHome from "./components/portals/AdminPortal/AdminHome";
// import StaffHome from "./components/portals/StaffPortal/StaffHome";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/portal" element={<BasicHome />} />
        <Route path="/portal-dashboard" element={<BasicDashboard />} />
        {/* <Route path="/admin" element={<AdminHome />} /> */}
        {/* <Route path="/staff" element={<StaffHome />} /> */}
      </Routes>
    </BrowserRouter>
  );
}

export default App;
