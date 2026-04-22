import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { GraduationCap, LayoutDashboard, Home, PlusCircle } from 'lucide-react';
import { clsx } from 'clsx';

const Navbar = () => {
  const location = useLocation();

  const navLinks = [
    { name: 'Home', path: '/', icon: Home },
    { name: 'Dashboard', path: '/dashboard', icon: LayoutDashboard },
    { name: 'Add Student', path: '/add', icon: PlusCircle },
  ];

  return (
    <header className="sticky top-0 z-50 w-full bg-white/40 backdrop-blur-2xl border-b border-white/20">
      <div className="container mx-auto px-6 h-20 flex items-center justify-between">
        <Link to="/" className="flex items-center space-x-3 group">
          <div className="bg-gradient-to-br from-primary-600 to-brand-500 p-2.5 rounded-2xl group-hover:rotate-12 transition-all duration-500 shadow-lg shadow-primary-500/30">
            <GraduationCap className="text-white w-7 h-7" />
          </div>
          <span className="font-extrabold text-2xl tracking-tighter bg-clip-text text-transparent bg-gradient-to-r from-slate-900 to-slate-700">
            EduManage
          </span>
        </Link>

        <nav className="hidden md:flex items-center space-x-2 bg-slate-100/50 p-1.5 rounded-2xl border border-white/50">
          {navLinks.map((link) => {
            const Icon = link.icon;
            const isActive = location.pathname === link.path;
            
            return (
              <Link
                key={link.name}
                to={link.path}
                className={clsx(
                  "px-5 py-2.5 rounded-xl flex items-center space-x-2 transition-all duration-300 font-bold text-sm",
                  isActive 
                    ? "bg-white text-primary-600 shadow-sm" 
                    : "text-slate-600 hover:text-primary-500 hover:bg-white/50"
                )}
              >
                <Icon size={18} strokeWidth={2.5} />
                <span>{link.name}</span>
              </Link>
            );
          })}
        </nav>
      </div>
    </header>
  );
};

export default Navbar;
