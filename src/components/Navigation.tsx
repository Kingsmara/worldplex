import React from 'react';
import { School, UserCheck, Calendar, MapPin, GraduationCap, FileHeart, Menu, X } from 'lucide-react';

interface NavigationProps {
  activeSection: string;
  setActiveSection: (section: string) => void;
  showStaffDashboard: boolean;
  setShowStaffDashboard: (show: boolean) => void;
}

export default function Navigation({
  activeSection,
  setActiveSection,
  showStaffDashboard,
  setShowStaffDashboard,
}: NavigationProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false);

  const navItems = [
    { id: 'home', label: 'Home', icon: School },
    { id: 'academics', label: 'Academics', icon: GraduationCap },
    { id: 'admissions', label: 'Admissions', icon: FileHeart },
    { id: 'events', label: 'Events & Calendar', icon: Calendar },
    { id: 'campus', label: 'Campus Life', icon: MapPin },
    { id: 'portal', label: 'Student Portal', icon: UserCheck },
  ];

  const handleNavClick = (id: string) => {
    setActiveSection(id);
    setShowStaffDashboard(false);
    setIsMobileMenuOpen(false);
  };

  return (
    <nav className="sticky top-0 z-50 bg-indigo-950 text-white shadow-xl border-b border-indigo-900/50 backdrop-blur-md bg-opacity-95">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* School Crest Logo */}
          <div 
            onClick={() => handleNavClick('home')}
            className="flex items-center space-x-3 cursor-pointer group"
          >
            <div className="bg-amber-400 text-indigo-950 p-2.5 rounded-xl shadow-md group-hover:bg-amber-300 transition-colors duration-200">
              <School className="h-7 w-7 stroke-[2]" />
            </div>
            <div>
              <span className="font-display text-xl font-extrabold tracking-tight block leading-none text-amber-300 group-hover:text-amber-200 transition-colors duration-150 uppercase">
                PINECREST
              </span>
              <span className="font-mono text-[9px] text-slate-400 tracking-[0.22em] block uppercase mt-1">
                Academy of Science & Art
              </span>
            </div>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-1.5">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeSection === item.id && !showStaffDashboard;
              return (
                <button
                  key={item.id}
                  id={`nav-btn-${item.id}`}
                  onClick={() => handleNavClick(item.id)}
                  className={`flex items-center space-x-2 px-4 py-2.5 rounded-xl font-sans text-xs font-bold uppercase tracking-wider transition-all duration-200 ${
                    isActive
                      ? 'bg-amber-400 text-indigo-950 shadow-md font-extrabold'
                      : 'text-slate-300 hover:text-white hover:bg-indigo-900/80'
                  }`}
                >
                  <Icon className="h-4 w-4" />
                  <span>{item.label}</span>
                </button>
              );
            })}

            <div className="h-6 w-[1px] bg-indigo-900 mx-2"></div>

            <button
              id="nav-btn-staff"
              onClick={() => {
                setShowStaffDashboard(true);
                setIsMobileMenuOpen(false);
              }}
              className={`px-5 py-2.5 rounded-full font-mono text-xs font-bold tracking-widest uppercase shadow-md transition-all duration-200 ${
                showStaffDashboard
                  ? 'bg-amber-400 text-indigo-950 shadow-lg'
                  : 'bg-indigo-900 text-white border border-indigo-850 hover:bg-indigo-850 hover:text-amber-300 shadow-lg shadow-indigo-950/20'
              }`}
            >
              Staff Portal
            </button>
          </div>

          {/* Mobile menu button */}
          <div className="lg:hidden flex items-center">
            <button
              id="mobile-menu-toggle"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="inline-flex items-center justify-center p-2 rounded-xl text-slate-400 hover:text-white hover:bg-indigo-900 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-amber-400"
            >
              {isMobileMenuOpen ? (
                <X className="block h-6 w-6" aria-hidden="true" />
              ) : (
                <Menu className="block h-6 w-6" aria-hidden="true" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="lg:hidden bg-indigo-950 border-b border-indigo-900 px-2 pt-2 pb-4 space-y-1">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeSection === item.id && !showStaffDashboard;
            return (
              <button
                key={item.id}
                id={`mobile-nav-${item.id}`}
                onClick={() => handleNavClick(item.id)}
                className={`flex items-center space-x-3 w-full px-4 py-3 rounded-xl text-left text-sm font-bold uppercase tracking-wider transition-colors ${
                  isActive
                    ? 'bg-amber-400 text-indigo-950 font-bold'
                    : 'text-slate-300 hover:text-white hover:bg-indigo-900'
                }`}
              >
                <Icon className="h-5 w-5" />
                <span>{item.label}</span>
              </button>
            );
          })}
          
          <div className="h-[1px] bg-indigo-900/80 my-2"></div>
          
          <button
            id="mobile-nav-staff"
            onClick={() => {
              setShowStaffDashboard(true);
              setIsMobileMenuOpen(false);
            }}
            className={`flex items-center justify-center space-x-2 w-full px-4 py-3 rounded-full font-mono text-xs font-bold tracking-widest uppercase border border-amber-400/30 text-center transition-all ${
              showStaffDashboard
                ? 'bg-amber-400 text-indigo-950 font-bold'
                : 'bg-indigo-900 text-amber-300 hover:bg-indigo-850'
            }`}
          >
            Admissions Office Portal
          </button>
        </div>
      )}
    </nav>
  );
}
