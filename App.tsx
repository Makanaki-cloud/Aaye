
import React, { useState } from 'react';
import { HashRouter, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Home from './pages/Home';
import Explore from './pages/Explore';
import Learn from './pages/Learn';
import Inspect from './pages/Inspect';
import Profile from './pages/Profile';
import PropertyDetail from './pages/PropertyDetail';
import Host from './pages/Host';
import Dashboard from './pages/Dashboard';
import { AppState, Inspection } from './types';
import { MOCK_PROPERTIES } from './constants';

const App: React.FC = () => {
  const [appState, setAppState] = useState<AppState>({
    currency: 'NGN',
    exchangeRate: 1600,
    lowDataMode: false,
    savedListings: [],
    userRole: 'guest'
  });

  const [inspections, setInspections] = useState<Inspection[]>([
    {
      id: 'ins-1',
      date: 'Today, 2:30 PM',
      property: MOCK_PROPERTIES[0],
      status: 'Confirmed',
      fee: '₦2,000',
      paid: true
    }
  ]);

  const updateAppState = (updates: Partial<AppState>) => {
    setAppState(prev => ({ ...prev, ...updates }));
  };

  const addInspection = (inspection: Inspection) => {
    setInspections(prev => [inspection, ...prev]);
  };

  const updateInspection = (id: string, updates: Partial<Inspection>) => {
    setInspections(prev => prev.map(ins => ins.id === id ? { ...ins, ...updates } : ins));
  };

  return (
    <HashRouter>
      <Layout>
        <Routes>
          <Route path="/" element={<Home appState={appState} />} />
          <Route path="/explore" element={<Explore appState={appState} />} />
          <Route path="/property/:id" element={<PropertyDetail appState={appState} onBook={addInspection} />} />
          <Route path="/learn" element={<Learn />} />
          <Route path="/inspect" element={<Inspect inspections={inspections} onUpdateInspection={updateInspection} />} />
          <Route path="/profile" element={<Profile appState={appState} onUpdateState={updateAppState} />} />
          <Route path="/host" element={<Host />} />
          <Route path="/dashboard" element={<Dashboard appState={appState} />} />
        </Routes>
      </Layout>
    </HashRouter>
  );
};

export default App;
