import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import MainLayout from './components/Layout/MainLayout';
import Dashboard from './pages/Dashboard';
import AlertsPage from './pages/AlertsPage';
import NetworkPage from './pages/NetworkPage';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<MainLayout />}>
          <Route index element={<Dashboard />} />
          <Route path="/alerts" element={<AlertsPage />} />
          <Route path="/network" element={<NetworkPage />} />
          {/* Add routes for the other sections */}
          <Route path="/logs" element={<div className="p-6">Logs Page (Coming Soon)</div>} />
          <Route path="/analytics" element={<div className="p-6">Analytics Page (Coming Soon)</div>} />
          <Route path="/devices" element={<div className="p-6">Devices Page (Coming Soon)</div>} />
          <Route path="/users" element={<div className="p-6">Users Page (Coming Soon)</div>} />
          <Route path="/settings" element={<div className="p-6">Settings Page (Coming Soon)</div>} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;