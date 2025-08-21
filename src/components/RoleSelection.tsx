import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, DollarSign, Briefcase, Users } from 'lucide-react';
import { Button } from './ui/button';
import { GlassCard } from './ui/glass-card';

export const RoleSelection: React.FC = () => {
  const roles = [
    {
      icon: DollarSign,
      title: 'Investor',
      description: 'Pool resources with your community to fund local ventures',
      color: 'from-blue-600 to-blue-700',
      link: '/onboarding'
    },
    {
      icon: Briefcase,
      title: 'Entrepreneur',
      description: 'Get funding and support to launch or grow your business',
      color: 'from-green-600 to-green-700',
      link: '/onboarding'
    },
    {
      icon: Users,
      title: 'Worker',
      description: 'Find meaningful work and develop skills for better opportunities',
      color: 'from-yellow-500 to-yellow-600',
      link: '/onboarding'
    }
  ];

  return (
    <section className="py-20 bg-gray-50/50" id="how-it-works">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-800 mb-4">Choose Your Path</h2>
          <p className="text-xl text-gray-600">Join LinkLift in the role that fits you best</p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {roles.map((role, index) => (
            <GlassCard key={index} hover className="text-center p-8">
              <div className={`inline-flex items-center justify-center p-4 bg-gradient-to-r ${role.color} rounded-2xl mb-6`}>
                <role.icon className="h-10 w-10 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-gray-800 mb-4">{role.title}</h3>
              <p className="text-gray-600 mb-8">{role.description}</p>
              <Link to={role.link}>
                <Button 
                  size="lg" 
                  className={`bg-gradient-to-r ${role.color} hover:opacity-90 text-white font-semibold px-8 py-4 group`}
                >
                  Join as {role.title}
                  <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>
            </GlassCard>
          ))}
        </div>
      </div>
    </section>
  );
};
