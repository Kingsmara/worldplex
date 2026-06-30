import React, { useState } from 'react';
import { CAMPUS_LOCATIONS, SCHOOL_CLUBS } from '../data';
import { CampusLocation, ClubInfo } from '../types';
import { Map, MapPin, Calendar, Compass, User, Trophy, Award, BookOpen, Clock, Activity, Image as ImageIcon } from 'lucide-react';

export default function CampusLifeSection() {
  const [activeTab, setActiveTab] = useState<'map' | 'clubs'>('map');
  const [selectedLocation, setSelectedLocation] = useState<CampusLocation>(CAMPUS_LOCATIONS[0]);
  const [selectedClubCategory, setSelectedClubCategory] = useState<string>('All');

  const clubCategories = ['All', 'STEM', 'Leadership', 'Arts', 'Athletics'];

  const filteredClubs = SCHOOL_CLUBS.filter(club => {
    return selectedClubCategory === 'All' || club.category === selectedClubCategory;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-12">
      
      {/* Page Title */}
      <div className="text-center max-w-2xl mx-auto space-y-4">
        <span className="font-mono text-xs font-bold uppercase tracking-[0.2em] text-amber-500">The Pinecrest Experience</span>
        <h1 className="font-display text-4xl font-extrabold text-indigo-950 tracking-tight">Student & Campus Life</h1>
        <p className="font-sans text-slate-500 text-sm leading-relaxed">
          Nurturing holistic development through fully equipped campus environments and rigorous student-led clubs that push limits outside the classroom boundaries.
        </p>

        {/* Toggles */}
        <div className="flex justify-center pt-2">
          <div className="bg-slate-100 p-1.5 rounded-2xl inline-flex shadow-inner border border-slate-200">
            <button
              id="campus-tab-map"
              onClick={() => setActiveTab('map')}
              className={`flex items-center space-x-2 px-5 py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider transition-all cursor-pointer ${
                activeTab === 'map'
                  ? 'bg-indigo-950 text-white shadow-md'
                  : 'text-slate-600 hover:text-indigo-950'
              }`}
            >
              <Compass className="h-4 w-4" />
              <span>Interactive Campus Map</span>
            </button>
            <button
              id="campus-tab-clubs"
              onClick={() => setActiveTab('clubs')}
              className={`flex items-center space-x-2 px-5 py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider transition-all cursor-pointer ${
                activeTab === 'clubs'
                  ? 'bg-indigo-950 text-white shadow-md'
                  : 'text-slate-600 hover:text-indigo-950'
              }`}
            >
              <Trophy className="h-4 w-4" />
              <span>Co-Curricular Clubs</span>
            </button>
          </div>
        </div>
      </div>

      {activeTab === 'map' ? (
        /* INTERACTIVE VECTOR MAP SECTION */
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          
          {/* Left: Interactive styled map canvas */}
          <div className="lg:col-span-8 flex flex-col space-y-4">
            <div className="flex items-center justify-between border-b border-slate-200 pb-3">
              <span className="font-display font-bold text-sm text-indigo-950">Pinecrest Forest & Academic Campus Plot</span>
              <span className="font-sans text-xs text-slate-450">Select any blinking pin to view specific facility descriptions.</span>
            </div>

            {/* Custom SVG/CSS Map Layout */}
            <div className="relative aspect-[16/10] bg-gradient-to-br from-indigo-50/60 via-slate-50 to-indigo-100/50 rounded-[2rem] border border-slate-200 shadow-inner overflow-hidden flex items-center justify-center p-8">
              
              {/* Map grid lines / decorative elements */}
              <div className="absolute inset-0 bg-[linear-gradient(to_right,#e2e8f0_1px,transparent_1px),linear-gradient(to_bottom,#e2e8f0_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)] opacity-35"></div>
              
              {/* Forest outline decoration */}
              <div className="absolute right-4 bottom-4 w-44 h-44 rounded-full bg-indigo-950/5 filter blur-xl"></div>
              <div className="absolute left-6 top-6 w-32 h-32 rounded-full bg-indigo-950/5 filter blur-xl"></div>

              {/* Styled Road paths */}
              <div className="absolute left-[35%] top-0 bottom-0 w-8 bg-slate-200/40 border-l border-r border-slate-300/40 origin-center transform -rotate-12"></div>
              <div className="absolute left-0 right-0 top-[60%] h-8 bg-slate-200/40 border-t border-b border-slate-300/40 transform rotate-6"></div>

              {/* Dynamic Coordinate Map Pins */}
              {CAMPUS_LOCATIONS.map((loc) => {
                const isSelected = selectedLocation.id === loc.id;
                return (
                  <button
                    key={loc.id}
                    id={`map-pin-${loc.id}`}
                    onClick={() => setSelectedLocation(loc)}
                    style={{ left: `${loc.coordinates.x}%`, top: `${loc.coordinates.y}%` }}
                    className="absolute -translate-x-1/2 -translate-y-1/2 group z-30 focus:outline-none cursor-pointer"
                  >
                    {/* Ring pulsing animation */}
                    <span className={`absolute inline-flex h-8 w-8 rounded-full opacity-75 -left-2.5 -top-2.5 ${
                      isSelected ? 'animate-ping bg-amber-400' : 'bg-indigo-950 group-hover:bg-amber-300'
                    }`}></span>

                    {/* Pin block */}
                    <div className={`relative flex items-center justify-center h-8 w-8 rounded-full shadow-lg border-2 transition-all duration-200 ${
                      isSelected
                        ? 'bg-amber-400 text-indigo-950 border-white scale-110 ring-2 ring-indigo-950'
                        : 'bg-indigo-950 text-white border-slate-100 hover:bg-amber-400 hover:text-indigo-950'
                    }`}>
                      <MapPin className="h-4.5 w-4.5" />
                    </div>

                    {/* Desktop Tooltip Hover text */}
                    <span className="absolute left-1/2 -translate-x-1/2 top-10 bg-indigo-950 text-slate-100 text-[10px] font-sans font-bold py-1 px-2.5 rounded shadow-md opacity-0 group-hover:opacity-100 transition-opacity duration-150 whitespace-nowrap pointer-events-none border border-indigo-900 z-40">
                      {loc.name}
                    </span>
                  </button>
                );
              })}

              {/* Compass symbol decoration */}
              <div className="absolute bottom-6 left-6 flex items-center space-x-2 bg-white/70 backdrop-blur-sm px-3 py-1.5 rounded-lg border border-slate-200 font-mono text-[10px] text-slate-500 font-bold uppercase shadow-sm">
                <Compass className="h-4 w-4 text-indigo-900 animate-spin-slow" />
                <span>N 45° 28&apos; W 122°</span>
              </div>
            </div>
          </div>

          {/* Right: facility details drawer */}
          <div className="lg:col-span-4 bg-white rounded-[2rem] border border-slate-200 p-6 sm:p-8 shadow-md flex flex-col justify-between h-full space-y-6">
            <div className="space-y-4">
              <div className="relative h-44 overflow-hidden rounded-2xl bg-slate-100 border border-slate-200">
                <img
                  src={selectedLocation.imageUrl}
                  alt={selectedLocation.name}
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
                <span className="absolute bottom-3 left-3 bg-indigo-950 text-amber-300 font-mono text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded shadow-sm">
                  Built {selectedLocation.builtYear}
                </span>
              </div>

              <div className="space-y-2">
                <h3 className="font-display font-bold text-xl text-indigo-950 tracking-tight leading-snug">
                  {selectedLocation.name}
                </h3>
                <p className="font-sans text-slate-500 text-xs leading-relaxed">
                  {selectedLocation.description}
                </p>
              </div>

              {/* Features lists */}
              <div className="border-t border-slate-100 pt-4 space-y-3">
                <h4 className="font-display text-[10px] font-bold uppercase tracking-wider text-amber-500 flex items-center space-x-1.5">
                  <Activity className="h-3.5 w-3.5" />
                  <span>Key Services & Features</span>
                </h4>
                <div className="grid grid-cols-1 gap-2">
                  {selectedLocation.features.map((feat, idx) => (
                    <div key={idx} className="flex items-start space-x-2 text-slate-700 font-sans text-xs">
                      <span className="text-indigo-950 font-bold">✓</span>
                      <span>{feat}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="bg-slate-55 border border-slate-200 rounded-xl p-4 text-[10px] font-sans text-slate-400 leading-normal flex items-start space-x-2.5">
              <Compass className="h-4 w-4 text-slate-400 shrink-0 mt-0.5" />
              <span>Campus guides lead prospective students and parents through these locations during our scheduled Weekly Admissions Open Houses.</span>
            </div>
          </div>

        </div>
      ) : (
        /* CO-CURRICULAR CLUBS GRID SECTION */
        <div className="space-y-8">
          
          {/* Filters area */}
          <div className="flex justify-center space-x-1.5 border-b border-slate-200 pb-4">
            {clubCategories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedClubCategory(cat)}
                className={`px-4.5 py-2 rounded-full text-xs font-bold uppercase tracking-wider border transition-all cursor-pointer ${
                  selectedClubCategory === cat
                    ? 'bg-indigo-950 text-white border-indigo-950 shadow-sm'
                    : 'bg-white text-slate-600 border-slate-200 hover:bg-slate-50'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Clubs Grid layout */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredClubs.map((club) => (
              <div 
                key={club.id} 
                className="bg-white rounded-[2rem] border border-slate-200 p-6 shadow-sm hover:shadow-md transition-all flex flex-col justify-between h-full group border-l-4 border-l-indigo-950"
              >
                <div className="space-y-4">
                  {/* Title and Category Tag */}
                  <div className="flex justify-between items-start">
                    <span className="bg-indigo-50 text-indigo-950 font-mono text-[9px] font-bold uppercase tracking-wider px-2 py-0.5 rounded border border-indigo-900/10">
                      {club.category}
                    </span>
                  </div>

                  <h3 className="font-display font-bold text-lg text-indigo-950 group-hover:text-indigo-850 transition-colors leading-snug">
                    {club.name}
                  </h3>

                  <p className="font-sans text-slate-500 text-xs leading-relaxed">
                    {club.description}
                  </p>

                  {/* Achievements and awards */}
                  {club.achievements.length > 0 && (
                    <div className="space-y-2 pt-2">
                      <span className="font-mono text-[9px] font-bold text-amber-500 uppercase tracking-widest block">Accolades & Achievements</span>
                      <div className="flex flex-wrap gap-1.5">
                        {club.achievements.map((ach, idx) => (
                          <span key={idx} className="inline-flex items-center space-x-1 bg-amber-400/10 text-amber-800 text-[10px] px-2.5 py-1 rounded-md border border-amber-300/20 font-sans font-semibold">
                            <Award className="h-3 w-3 shrink-0" />
                            <span>{ach}</span>
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                </div>

                {/* Logistics details footer */}
                <div className="pt-4 border-t border-slate-100 mt-5 space-y-2 text-[10px] font-sans text-slate-400">
                  <div className="flex items-center space-x-2">
                    <Clock className="h-3.5 w-3.5 text-slate-400" />
                    <span>{club.meetingTime}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <User className="h-3.5 w-3.5 text-slate-400" />
                    <span>Faculty Advisor: {club.advisor}</span>
                  </div>
                </div>

              </div>
            ))}
          </div>

        </div>
      )}
    </div>
  );
}
