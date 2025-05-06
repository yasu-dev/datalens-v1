import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import DashboardLayout from './components/layout/DashboardLayout';
import Dashboard from './pages/Dashboard';
import AreaAnalysis from './pages/AreaAnalysis';
import CustomerSegments from './pages/CustomerSegments';
import TrendsAnalysis from './pages/TrendsAnalysis';
import { FilterProvider } from './contexts/FilterContext';

function App() {
  return (
    <Router>
      <FilterProvider>
        <Routes>
          <Route path="/" element={<DashboardLayout />}>
            <Route index element={<Dashboard />} />
            <Route path="area-analysis" element={<AreaAnalysis />} />
            <Route path="customer-segments" element={<CustomerSegments />} />
            <Route path="trends" element={<TrendsAnalysis />} />
          </Route>
        </Routes>
      </FilterProvider>
    </Router>
  );
}

export default App;