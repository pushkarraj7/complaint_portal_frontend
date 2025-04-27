import { BrowserRouter, Routes, Route } from "react-router-dom";
import LandingPage from "./components/pages/LandingPage";
import BasicHome from "./components/portals/Portal/Home";
import BasicDashboard from "./components/portals/Portal/Dashboard";
import AdminHome from "./components/portals/AdminPortal/Home";
import AdminDashboard from "./components/portals/AdminPortal/Dashboard";
import StaffHome from "./components/portals/StaffPortal/Home";
import StaffDashboard from "./components/portals/StaffPortal/Dashboard";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  return (
    <BrowserRouter>
      <ToastContainer />
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<LandingPage />} />
        <Route path="/portal" element={<BasicHome />} />
        <Route path="/portal-dashboard" element={<BasicDashboard />} />

        {/* Admin Routes */}
        <Route path="/admin" element={<AdminHome />} />
        <Route path="/admin/dashboard" element={<AdminDashboard />} />
        

        {/* Staff Routes */}
        <Route path="/staff" element={<StaffHome />} />
        <Route path="/staff/dashboard" element={<StaffDashboard />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
