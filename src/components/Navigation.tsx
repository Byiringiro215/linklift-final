import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Menu, X, TrendingUp } from 'lucide-react';
import { Button } from './ui/button';
import { GlassCard } from './ui/glass-card';

export const Navigation: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 px-4 sm:px-6 lg:px-8 py-4">
      <GlassCard className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <div className="flex items-center space-x-2">
            <div className="p-2 bg-gradient-to-r from-blue-600 to-green-500 rounded-lg">
              <TrendingUp className="h-6 w-6 text-white" />
            </div>
            <span className="text-xl font-bold bg-gradient-to-r from-blue-600 to-green-500 bg-clip-text text-transparent">
              LinkLift
            </span>
          </div>
        </div>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center space-x-8">
          <a href="#features" className="text-gray-600 hover:text-gray-800 transition-colors">
            Features
          </a>
          <a href="#how-it-works" className="text-gray-600 hover:text-gray-800 transition-colors">
            How It Works
          </a>
          <a href="#impact" className="text-gray-600 hover:text-gray-800 transition-colors">
            Impact
          </a>
          <a href="#contact" className="text-gray-600 hover:text-gray-800 transition-colors">
            Contact
          </a>
        </div>

        <div className="hidden md:flex items-center space-x-4">
          <Link to="/signin">
            <Button variant="ghost" className="text-gray-700 hover:bg-gray-100">
              Sign In
            </Button>
          </Link>
          <Link to="/onboarding">
            <Button className="bg-blue-600 hover:bg-blue-700 text-white font-medium">
              Get Started
            </Button>
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden p-2 text-gray-700"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </GlassCard>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden mt-4 animate-slide-up">
          <GlassCard className="flex flex-col space-y-4">
            <a href="#features" className="text-gray-600 hover:text-gray-800 transition-colors py-2">
              Features
            </a>
            <a href="#how-it-works" className="text-gray-600 hover:text-gray-800 transition-colors py-2">
              How It Works
            </a>
            <a href="#impact" className="text-gray-600 hover:text-gray-800 transition-colors py-2">
              Impact
            </a>
            <a href="#contact" className="text-gray-600 hover:text-gray-800 transition-colors py-2">
              Contact
            </a>
            <div className="pt-4 border-t border-gray-200">
              <Link to="/signin" className="block w-full mb-2">
                <Button variant="ghost" className="w-full text-gray-700 hover:bg-gray-100">
                  Sign In
                </Button>
              </Link>
              <Link to="/onboarding" className="block w-full">
                <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium">
                  Get Started
                </Button>
              </Link>
            </div>
          </GlassCard>
        </div>
      )}
    </nav>
  );
};
