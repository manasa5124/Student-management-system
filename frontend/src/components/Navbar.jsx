import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { GraduationCap, LayoutDashboard, Home, PlusCircle } from 'lucide-react';
import { clsx } from 'clsx';

/**
 * Navbar Component
 * 
 * DESIGN PRINCIPLE: Accessibility & Semantic HTML
 * Use <header> and <nav> for sectioning. Use aria-labels if needed.
 */
const Navbar = () => {
  const location = useLocation();

  const navLinks = [
    { name: 'Home', path: '/', icon: Home },
    { name: 'Dashboard', path: '/dashboard', icon: LayoutDashboard },
    { name: 'Add Student', path: '/add', icon: PlusCircle },
  ];

  return (
    <header className="sticky top-0 z-50 w-full bg-white/70 backdrop-blur-lg border-b border-gray-100">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <Link to="/" className="flex items-center space-x-2 group">
          <div className="bg-primary-600 p-2 rounded-lg group-hover:rotate-12 transition-transform">
            <GraduationCap className="text-white w-6 h-6" />
          </div>
          <span className="font-bold text-xl tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-primary-700 to-primary-500">
            EduManage
          </span>
        </Link>

        <nav className="hidden md:flex items-center space-x-1">
          {navLinks.map((link) => {
            const Icon = link.icon;
            const isActive = location.pathname === link.path;
            
            return (
              <Link
                key={link.name}
                to={link.path}
                className={clsx(
                  "px-4 py-2 rounded-xl flex items-center space-x-2 transition-all duration-200",
                  isActive 
                    ? "bg-primary-50 text-primary-700 font-semibold" 
                    : "text-gray-600 hover:bg-gray-50 hover:text-primary-600"
                )}
              >
                <Icon size={18} />
                <span>{link.name}</span>
              </Link>
            );
          })}
        </nav>

        {/* Mobile menu could be added here */}
      </div>
    </header>
  );
};

export default Navbar;
