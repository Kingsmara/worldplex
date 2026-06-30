/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from 'react';
import Navigation from './components/Navigation';
import HomeSection from './components/HomeSection';
import AcademicsSection from './components/AcademicsSection';
import AdmissionsSection from './components/AdmissionsSection';
import CalendarSection from './components/CalendarSection';
import CampusLifeSection from './components/CampusLifeSection';
import PortalSection from './components/PortalSection';
import StaffDashboard from './components/StaffDashboard';
import { School, MapPin, Phone, Mail, Clock, HelpCircle } from 'lucide-react';

export default function App() {
  const [activeSection, setActiveSection] = useState<string>('home');
  const [showStaffDashboard, setShowStaffDashboard] = useState<boolean>(false);

  const handleNavigate = (section: string) => {
    setActiveSection(section);
    setShowStaffDashboard(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-slate-50 bento-pattern-dark flex flex-col justify-between selection:bg-amber-400 selection:text-indigo-950">
      
      {/* Top sticky Navigation */}
      <Navigation
        activeSection={activeSection}
        setActiveSection={setActiveSection}
        showStaffDashboard={showStaffDashboard}
        setShowStaffDashboard={setShowStaffDashboard}
      />

      {/* Main active section contents */}
      <main className="flex-grow">
        {showStaffDashboard ? (
          <StaffDashboard />
        ) : (
          <>
            {activeSection === 'home' && <HomeSection onNavigate={handleNavigate} />}
            {activeSection === 'academics' && <AcademicsSection />}
            {activeSection === 'admissions' && <AdmissionsSection />}
            {activeSection === 'events' && <CalendarSection />}
            {activeSection === 'campus' && <CampusLifeSection />}
            {activeSection === 'portal' && <PortalSection />}
          </>
        )}
      </main>

      {/* Majestic Academic Footer with Bento curves */}
      <footer className="bg-indigo-950 text-slate-300 border-t border-indigo-900 pt-16 pb-8 rounded-t-[2.5rem] mt-16 shadow-2xl relative overflow-hidden">
        {/* Subtle decorative background circle from Bento theme */}
        <div className="absolute -right-24 -bottom-24 w-72 h-72 bg-indigo-900 rounded-full blur-3xl opacity-30"></div>
        <div className="absolute -left-24 -top-24 w-72 h-72 bg-indigo-800 rounded-full blur-3xl opacity-20"></div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 relative z-10">
          
          {/* Brand block */}
          <div className="lg:col-span-4 space-y-4">
            <div className="flex items-center space-x-3">
              <div className="bg-amber-400 text-indigo-950 p-2.5 rounded-xl shadow-md">
                <School className="h-6 w-6" />
              </div>
              <span className="font-display text-lg font-bold tracking-wider text-amber-300 uppercase">PINECREST ACADEMY</span>
            </div>
            <p className="font-sans text-xs text-slate-400 leading-relaxed">
              Established in 1928, Pinecrest Academy prepares students to lead with moral purpose, scientific insight, and artistic depth in an ever-evolving global landscape.
            </p>
            <div className="pt-2">
              <span className="font-mono text-[10px] uppercase font-bold text-amber-400 tracking-wider">Motto</span>
              <p className="font-display font-semibold italic text-white text-xs mt-0.5">&quot;Sapientia, Virtus, Veritas&quot; — Wisdom, Virtue, Truth</p>
            </div>
          </div>

          {/* Quick Navigation Links */}
          <div className="lg:col-span-2 space-y-3">
            <h4 className="font-display font-bold text-sm text-white tracking-tight">Explore</h4>
            <ul className="space-y-2 text-xs font-sans">
              <li>
                <button onClick={() => handleNavigate('home')} className="hover:text-amber-300 transition-colors text-slate-400 hover:underline text-left">
                  Academy Home
                </button>
              </li>
              <li>
                <button onClick={() => handleNavigate('academics')} className="hover:text-amber-300 transition-colors text-slate-400 hover:underline text-left">
                  Curriculum Setup
                </button>
              </li>
              <li>
                <button onClick={() => handleNavigate('admissions')} className="hover:text-amber-300 transition-colors text-slate-400 hover:underline text-left">
                  Tuition Estimator
                </button>
              </li>
              <li>
                <button onClick={() => handleNavigate('events')} className="hover:text-amber-300 transition-colors text-slate-400 hover:underline text-left">
                  Campus Calendar
                </button>
              </li>
            </ul>
          </div>

          {/* Core Offices Contacts */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="font-display font-bold text-sm text-white tracking-tight">Contact & Location</h4>
            <ul className="space-y-3 text-xs font-sans text-slate-400">
              <li className="flex items-start space-x-2">
                <MapPin className="h-4 w-4 text-amber-400 shrink-0 mt-0.5" />
                <span>1040 Oakridge Boulevard,<br />Pinecrest Valley, OR 97401</span>
              </li>
              <li className="flex items-center space-x-2">
                <Phone className="h-4 w-4 text-amber-400 shrink-0" />
                <span className="font-mono text-slate-300">+1 (555) 304-8840</span>
              </li>
              <li className="flex items-center space-x-2">
                <Mail className="h-4 w-4 text-amber-400 shrink-0" />
                <span className="hover:text-amber-300 transition-colors">admissions@pinecrest.edu</span>
              </li>
            </ul>
          </div>

          {/* Weekly Operating Hours info */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="font-display font-bold text-sm text-white tracking-tight">Admissions Inquiries</h4>
            <ul className="space-y-3 text-xs font-sans text-slate-400">
              <li className="flex items-start space-x-2">
                <Clock className="h-4 w-4 text-amber-400 shrink-0 mt-0.5" />
                <span>Monday - Friday<br />08:00 AM - 04:30 PM (PST)</span>
              </li>
              <li className="flex items-start space-x-2">
                <HelpCircle className="h-4 w-4 text-amber-400 shrink-0 mt-0.5" />
                <span>Tours run every Tuesday/Thursday by active online schedule appointment.</span>
              </li>
            </ul>
          </div>

        </div>

        {/* Lower footer copyright stripe */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 border-t border-indigo-900/60 mt-12 pt-6 flex flex-col sm:flex-row items-center justify-between text-[11px] text-slate-500 relative z-10">
          <p>© {new Date().getFullYear()} Pinecrest Academy of Science & Art. All Rights Reserved. Private Preparatory School Board of Accreditation.</p>
          <div className="flex space-x-4 mt-4 sm:mt-0 font-sans">
            <a href="#privacy" className="hover:text-amber-300">Privacy Policy</a>
            <span>•</span>
            <a href="#terms" className="hover:text-amber-300">Terms of Enrollment</a>
            <span>•</span>
            <a href="#accreditation" className="hover:text-amber-300">Accreditation Info</a>
          </div>
        </div>
      </footer>

    </div>
  );
}

