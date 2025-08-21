import React from 'react';
import { Star, TrendingUp, Users, DollarSign, Briefcase } from 'lucide-react';
import { GlassCard } from './ui/glass-card';

export const Dashboard: React.FC = () => {
  const testimonials = [
    {
      name: 'Grace Uwimana',
      role: 'Entrepreneur',
      content: 'LinkLift helped me launch my agricultural business. The community support is incredible!',
      rating: 5
    },
    {
      name: 'Jean-Claude Habimana',
      role: 'Investor',
      content: 'Great returns and positive impact. This is the future of community investment.',
      rating: 5
    },
    {
      name: 'Marie Mukamana',
      role: 'Worker',
      content: 'Found meaningful work through LinkLift. The skills development resources are excellent.',
      rating: 5
    }
  ];

  return (
    <div className="py-20">
      {/* Impact Metrics */}
      <section className="mb-20" id="impact">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-gradient-to-r from-blue-600 to-green-500 rounded-3xl p-12 text-white">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold mb-4">Our Impact</h2>
              <p className="text-xl text-blue-100">Building stronger communities together</p>
            </div>
            
            <div className="grid md:grid-cols-4 gap-8 text-center">
              <div>
                <div className="text-4xl font-bold mb-2">50+</div>
                <div className="text-blue-100">Ventures Funded</div>
              </div>
              <div>
                <div className="text-4xl font-bold mb-2">200+</div>
                <div className="text-blue-100">Jobs Created</div>
              </div>
              <div>
                <div className="text-4xl font-bold mb-2">$2M+</div>
                <div className="text-blue-100">Community Investment</div>
              </div>
              <div>
                <div className="text-4xl font-bold mb-2">15%</div>
                <div className="text-blue-100">Average ROI</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="mb-20" id="testimonials">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-800 mb-4">What Our Community Says</h2>
            <p className="text-xl text-gray-600">Real stories from real people</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <GlassCard key={index} hover className="p-8">
                <div className="flex mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 text-yellow-500 fill-current" />
                  ))}
                </div>
                <p className="text-gray-600 mb-6 italic">"{testimonial.content}"</p>
                <div>
                  <div className="font-semibold text-gray-800">{testimonial.name}</div>
                  <div className="text-sm text-gray-500">{testimonial.role}</div>
                </div>
              </GlassCard>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="mb-20" id="contact">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold text-gray-800 mb-6">Ready to Join the Movement?</h2>
          <p className="text-xl text-gray-600 mb-8">
            Be part of a community that's reshaping how we invest, work, and grow together.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <GlassCard className="p-6 text-center">
              <TrendingUp className="h-12 w-12 text-blue-600 mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">Start Investing</h3>
              <p className="text-gray-600 mb-4">Join our community of investors</p>
            </GlassCard>
            <GlassCard className="p-6 text-center">
              <Briefcase className="h-12 w-12 text-green-600 mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">Find Opportunities</h3>
              <p className="text-gray-600 mb-4">Discover your next venture</p>
            </GlassCard>
            <GlassCard className="p-6 text-center">
              <Users className="h-12 w-12 text-yellow-500 mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">Connect</h3>
              <p className="text-gray-600 mb-4">Build meaningful relationships</p>
            </GlassCard>
          </div>
        </div>
      </section>
    </div>
  );
};
