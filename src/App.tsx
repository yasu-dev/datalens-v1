import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import DashboardLayout from './components/layout/DashboardLayout';
import Dashboard from './pages/Dashboard';
import AreaAnalysis from './pages/AreaAnalysis';
import CustomerSegmentation from './pages/CustomerSegmentation';
import TrendsAnalysis from './pages/TrendsAnalysis';
import PrivacySettings from './pages/PrivacySettings';
import PersonalAnalysis from './pages/PersonalAnalysis';
import SegmentAnalysis from './pages/SegmentAnalysis';
import CustomerList from './pages/CustomerList';
import { FilterProvider } from './contexts/FilterContext';

function App() {
  return (
    <Router>
      <FilterProvider>
        <Routes>
          <Route path="/" element={<DashboardLayout />}>
            <Route index element={<Dashboard />} />
            <Route path="area-analysis" element={<AreaAnalysis />} />
            <Route path="customer-segmentation" element={<CustomerSegmentation />} />
            <Route path="customer-segments" element={<Navigate replace to="/customer-segmentation" />} />
            <Route path="segment-analysis/:segmentId" element={<SegmentAnalysis />} />
            <Route path="customer-list/:segmentId" element={<CustomerList />} />
            <Route path="personal-analysis/:customerId" element={<PersonalAnalysis />} />
            <Route path="trends" element={<TrendsAnalysis />} />
            <Route path="privacy-settings" element={<PrivacySettings />} />
          </Route>
        </Routes>
      </FilterProvider>
    </Router>
  );
}

export default App;