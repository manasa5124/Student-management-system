import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Zap, Shield, Smartphone, Users } from 'lucide-react';
import Button from '../components/Button';

/**
 * Landing Page Component
 * 
 * DESIGN PRINCIPLE: Rich Aesthetics
 * Features a clean hero section with gradients, a feature list, and clear CTA.
 */
const Landing = () => {
  const features = [
    {
      title: "Fast Operations",
      description: "Manage students with lightning speed using our optimized React engine.",
      icon: <Zap className="text-amber-500" />
    },
    {
      title: "Secure Data",
      description: "Built with industry-standard patterns ensuring your data is always safe.",
      icon: <Shield className="text-emerald-500" />
    },
    {
      title: "Mobile Ready",
      description: "Fully responsive design that looks stunning on phones and tablets.",
      icon: <Smartphone className="text-blue-500" />
    },
    {
      title: "Collaborative",
      description: "Designed for teams to manage educational institutions effortlessly.",
      icon: <Users className="text-purple-500" />
    }
  ];

  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="relative pt-24 pb-40 overflow-hidden">
        {/* Animated background blobs */}
        <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-primary-300/20 rounded-full blur-[120px] animate-pulse"></div>
        <div className="absolute bottom-0 right-1/4 w-[600px] h-[600px] bg-brand-300/20 rounded-full blur-[120px] animate-pulse delay-1000"></div>
        
        <div className="container mx-auto px-6 relative z-10 text-center">
          <div className="max-w-4xl mx-auto space-y-10">
            <div className="inline-flex items-center space-x-2 px-6 py-2 rounded-full bg-white/50 backdrop-blur-md border border-white/50 shadow-sm animate-float">
              <span className="w-2 h-2 rounded-full bg-primary-500 animate-ping"></span>
              <span className="text-primary-700 text-sm font-bold tracking-widest uppercase">
                The Future of Education
              </span>
            </div>
            
            <h1 className="text-6xl md:text-8xl font-black text-slate-900 leading-[0.9] tracking-tighter">
              Manage Your <br />
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary-600 via-brand-500 to-indigo-600">
                Student Ecosystem
              </span>
            </h1>
            
            <p className="text-xl md:text-2xl text-slate-600 leading-relaxed max-w-2xl mx-auto font-medium">
              A high-performance command center for modern educators. Streamline enrollment, tracking, and analytics in one stunning interface.
            </p>
            
            <div className="flex flex-col sm:flex-row items-center justify-center gap-6 pt-6">
              <Link to="/dashboard">
                <Button size="lg" className="rounded-[2rem] px-12 h-16 text-xl shadow-2xl">
                  Enter Dashboard <ArrowRight className="ml-3" size={24} />
                </Button>
              </Link>
              <Link to="/add">
                <Button variant="secondary" size="lg" className="rounded-[2rem] px-12 h-16 text-xl border-2">
                  Quick Enroll
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-24 bg-gray-50/50">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-2xl mx-auto mb-16 space-y-4">
            <h2 className="text-3xl font-bold text-gray-900">Why choose EduManage?</h2>
            <p className="text-gray-500">Everything you need to streamline student administration in one powerful dashboard.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <div key={index} className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
                <div className="w-14 h-14 rounded-2xl bg-gray-50 flex items-center justify-center mb-6">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">{feature.title}</h3>
                <p className="text-gray-500 leading-relaxed">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24">
        <div className="container mx-auto px-4">
          <div className="bg-primary-600 rounded-[3rem] p-12 md:p-20 text-center relative overflow-hidden shadow-2xl shadow-primary-200">
            <div className="absolute top-0 left-0 w-full h-full opacity-10 bg-[radial-gradient(circle_at_center,_white_1px,_transparent_1px)] bg-[length:24px_24px]"></div>
            
            <div className="relative z-10 space-y-6">
              <h2 className="text-3xl md:text-5xl font-bold text-white">Ready to simplify your workflow?</h2>
              <p className="text-primary-100 text-lg max-w-xl mx-auto">Join thousands of schools using EduManage to improve student success.</p>
              <div className="pt-6">
                <Link to="/dashboard">
                  <button className="bg-white text-primary-600 px-10 py-4 rounded-full font-bold text-lg hover:bg-primary-50 transition-colors shadow-lg active:scale-95">
                    Start Managing Now
                  </button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Landing;
