import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Users, TrendingUp, Handshake } from 'lucide-react';
import { Button } from './ui/button';
import { GlassCard } from './ui/glass-card';
import { BadgeGlow } from './ui/badge-glow';

export const Hero: React.FC = () => {
  return (
    <section className="min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8 pt-24">
      <div className="max-w-7xl mx-auto text-center">
        <div className="animate-scale-in">
          <BadgeGlow className="mb-8">
            🚀 Connecting Communities for Financial Growth
          </BadgeGlow>
          
          <h1 className="text-4xl sm:text-5xl lg:text-7xl font-bold mb-6 leading-tight">
            Building Wealth{" "}
            <span className="bg-gradient-to-r from-blue-600 to-green-500 bg-clip-text text-transparent">Together</span>,{" "}
            <br className="hidden sm:block" />
            Lifting{" "}
            <span className="bg-gradient-to-r from-blue-600 to-green-500 bg-clip-text text-transparent">Lives</span>
          </h1>
          
          <p className="text-xl sm:text-2xl text-gray-600 max-w-3xl mx-auto mb-12 leading-relaxed">
            Connect economically stable and unstable users to grow wealth through 
            ventures, microloans, and jobs. Real impact, real returns.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
            <Link to="/onboarding">
              <Button 
                size="lg" 
                className="bg-blue-600 hover:bg-blue-700 text-white font-semibold text-lg px-8 py-4 group"
              >
                Start Investing
                <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
            <Link to="/onboarding">
              <Button 
                size="lg" 
                variant="outline" 
                className="border-gray-300 hover:bg-gray-50 text-gray-700 font-semibold text-lg px-8 py-4"
              >
                Find Opportunities
              </Button>
            </Link>
          </div>
        </div>

        {/* Feature Cards */}
        <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
          <GlassCard hover className="text-center">
            <div className="inline-flex items-center justify-center p-3 bg-gradient-to-r from-blue-600 to-green-500 rounded-lg mb-4">
              <TrendingUp className="h-8 w-8 text-white" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Smart Ventures</h3>
            <p className="text-gray-600">
              Invest in vetted local businesses and emerging opportunities with transparent tracking
            </p>
          </GlassCard>

          <GlassCard hover className="text-center">
            <div className="inline-flex items-center justify-center p-3 bg-gradient-to-r from-blue-600 to-green-500 rounded-lg mb-4">
              <Handshake className="h-8 w-8 text-white" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Microloans</h3>
            <p className="text-gray-600">
              Quick access to funding for job seekers and entrepreneurs with fair interest rates
            </p>
          </GlassCard>

          <GlassCard hover className="text-center">
            <div className="inline-flex items-center justify-center p-3 bg-gradient-to-r from-blue-600 to-green-500 rounded-lg mb-4">
              <Users className="h-8 w-8 text-white" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Job Matching</h3>
            <p className="text-gray-600">
              Connect with opportunities that match your skills and investment interests
            </p>
          </GlassCard>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mt-16 max-w-4xl mx-auto">
          <div className="text-center">
            <div className="text-3xl font-bold text-blue-600 mb-2">$2.4M</div>
            <div className="text-gray-600">Funded Projects</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-green-600 mb-2">1,250</div>
            <div className="text-gray-600">Jobs Created</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-blue-600 mb-2">89%</div>
            <div className="text-gray-600">Success Rate</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-green-600 mb-2">15K+</div>
            <div className="text-gray-600">Active Users</div>
          </div>
        </div>
      </div>
    </section>
  );
};
