import React from 'react';
import { Navigation } from '../components/Navigation';
import { Hero } from '../components/Hero';
import { RoleSelection } from '../components/RoleSelection';
import { Dashboard } from '../components/Dashboard';
import { Footer } from '../components/Footer';

const LandingPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      <Navigation />
      <Hero />
      <RoleSelection />
      <Dashboard />
      <Footer />
    </div>
  );
};

export default LandingPage;