import React, { useState, useEffect } from 'react';
import { SCHOOL_EVENTS } from '../data';
import { SchoolEvent } from '../types';
import { Calendar, Star, StarOff, Clock, MapPin, Tag, User, Search, Check, CalendarCheck } from 'lucide-react';

export default function CalendarSection() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [bookmarks, setBookmarks] = useState<string[]>([]);
  const [showOnlyBookmarks, setShowOnlyBookmarks] = useState(false);

  // Load bookmarks on mount
  useEffect(() => {
    const saved = localStorage.getItem('pinecrest_event_bookmarks');
    if (saved) {
      setBookmarks(JSON.parse(saved));
    }
  }, []);

  const toggleBookmark = (eventId: string) => {
    let updated: string[];
    if (bookmarks.includes(eventId)) {
      updated = bookmarks.filter(id => id !== eventId);
    } else {
      updated = [...bookmarks, eventId];
    }
    setBookmarks(updated);
    localStorage.setItem('pinecrest_event_bookmarks', JSON.stringify(updated));
  };

  const categories = ['All', 'Academic', 'Arts', 'Sports', 'Admissions', 'Holiday'];

  // Filter logic
  const filteredEvents = SCHOOL_EVENTS.filter(event => {
    const matchesSearch = event.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          event.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          event.location.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || event.category === selectedCategory;
    const matchesBookmark = !showOnlyBookmarks || bookmarks.includes(event.id);
    return matchesSearch && matchesCategory && matchesBookmark;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10">
      
      {/* Title block */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-slate-200 pb-6">
        <div className="space-y-2">
          <span className="font-mono text-xs font-bold uppercase tracking-[0.2em] text-amber-500 block">Stay Updated</span>
          <h1 className="font-display text-4xl font-extrabold text-indigo-950 tracking-tight">Events Calendar</h1>
          <p className="font-sans text-slate-500 text-sm max-w-xl">
            Keep track of athletic matches, music recitals, academic milestones, and admission briefing periods. Add key events directly to your planner.
          </p>
        </div>

        {/* Counter of saved events */}
        <button
          id="toggle-bookmarks-view"
          onClick={() => setShowOnlyBookmarks(!showOnlyBookmarks)}
          className={`flex items-center space-x-2 px-5 py-3 rounded-xl font-display text-xs font-bold uppercase tracking-wider transition-all shadow-sm border cursor-pointer ${
            showOnlyBookmarks
              ? 'bg-amber-400 text-indigo-950 border-amber-400'
              : 'bg-white text-slate-600 border-slate-200 hover:bg-slate-50'
          }`}
        >
          <CalendarCheck className="h-4.5 w-4.5" />
          <span>My Schedule ({bookmarks.length})</span>
        </button>
      </div>

      {/* Filters Area */}
      <div className="flex flex-col md:flex-row gap-4 justify-between items-center bg-slate-50 p-4 rounded-2xl border border-slate-200">
        {/* Category Filters */}
        <div className="flex gap-1 overflow-x-auto w-full md:w-auto p-1 bg-slate-200/50 rounded-xl">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-4 py-2 rounded-lg text-xs font-bold uppercase tracking-wider transition-all cursor-pointer ${
                selectedCategory === cat
                  ? 'bg-indigo-950 text-white shadow-sm'
                  : 'text-slate-600 hover:text-indigo-950'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Search */}
        <div className="relative w-full md:w-80">
          <Search className="absolute left-3.5 top-2.5 h-4 w-4 text-slate-400" />
          <input
            type="text"
            placeholder="Search scheduled activities..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10 pr-4 py-2 bg-white border border-slate-200 text-xs rounded-xl w-full focus:outline-none focus:ring-1 focus:ring-indigo-850"
          />
        </div>
      </div>

      {/* Main Grid layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
        
        {/* Left: Events Grid */}
        <div className="lg:col-span-8 space-y-6">
          {filteredEvents.length === 0 ? (
            <div className="text-center py-16 border border-dashed border-slate-200 rounded-[2rem] bg-slate-50 space-y-3">
              <Calendar className="h-10 w-10 text-slate-400 mx-auto" />
              <p className="text-slate-500 font-sans text-sm">No scheduled events match your current filter selection.</p>
              {showOnlyBookmarks && (
                <button
                  onClick={() => setShowOnlyBookmarks(false)}
                  className="text-xs font-bold text-indigo-950 underline hover:text-indigo-850 cursor-pointer"
                >
                  Clear Saved Filters
                </button>
              )}
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {filteredEvents.map((ev) => {
                const isSaved = bookmarks.includes(ev.id);
                const eventDate = new Date(ev.date);
                const month = eventDate.toLocaleString('default', { month: 'short' }).toUpperCase();
                const day = eventDate.getDate();

                return (
                  <div 
                    key={ev.id} 
                    className="bg-white rounded-[2rem] border border-slate-200 p-6 shadow-sm hover:shadow-md transition-all flex flex-col justify-between h-full group"
                  >
                    <div className="space-y-4">
                      {/* Date Badge and Bookmark Button */}
                      <div className="flex justify-between items-start">
                        <div className="flex space-x-3 items-center">
                          <div className="bg-indigo-50 text-indigo-950 px-3.5 py-2.5 rounded-2xl text-center border border-indigo-900/10 shadow-sm">
                            <span className="block text-[10px] font-mono font-extrabold text-amber-500 leading-none">{month}</span>
                            <span className="block text-xl font-display font-black tracking-tight leading-none mt-1">{day}</span>
                          </div>
                          <div>
                            <span className="inline-block bg-slate-100 text-slate-500 font-mono text-[9px] font-bold uppercase px-2 py-0.5 rounded tracking-wide">
                              {ev.category}
                            </span>
                            <span className="block font-sans text-slate-400 text-[10px] mt-0.5">{ev.organizer}</span>
                          </div>
                        </div>

                        <button
                          id={`bookmark-btn-${ev.id}`}
                          onClick={() => toggleBookmark(ev.id)}
                          className={`p-2 rounded-xl transition-colors border cursor-pointer ${
                            isSaved
                              ? 'bg-amber-400 text-indigo-950 border-amber-400'
                              : 'text-slate-450 hover:text-indigo-950 bg-slate-50 border-slate-200'
                          }`}
                          title={isSaved ? "Remove from my schedule" : "Add to my schedule"}
                        >
                          <Star className={`h-4 w-4 ${isSaved ? 'fill-indigo-950 stroke-[1.5]' : 'stroke-[2]'}`} />
                        </button>
                      </div>

                      {/* Info details */}
                      <div className="space-y-1.5">
                        <h3 className="font-display font-bold text-base text-indigo-950 leading-snug group-hover:text-indigo-850 transition-colors">
                          {ev.title}
                        </h3>
                        <p className="font-sans text-slate-500 text-xs leading-relaxed">
                          {ev.description}
                        </p>
                      </div>
                    </div>

                    {/* Metadata footer */}
                    <div className="pt-4 border-t border-slate-100 mt-4 space-y-2 text-[11px] font-sans text-slate-500">
                      <div className="flex items-center space-x-2">
                        <Clock className="h-3.5 w-3.5 text-amber-500" />
                        <span>{ev.time}</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <MapPin className="h-3.5 w-3.5 text-amber-500" />
                        <span className="truncate">{ev.location}</span>
                      </div>
                    </div>

                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* Right: Personal Planner Sticky Display */}
        <div className="lg:col-span-4 bg-slate-50 rounded-[2rem] p-6 sm:p-8 border border-slate-200 h-fit space-y-6 lg:sticky lg:top-28">
          <div className="flex items-center space-x-2 border-b border-slate-200 pb-3">
            <Calendar className="h-5 w-5 text-indigo-950" />
            <h3 className="font-display font-bold text-base text-indigo-950">My Custom Schedule</h3>
          </div>

          {bookmarks.length === 0 ? (
            <div className="text-center py-8 space-y-2 text-slate-400">
              <p className="font-sans text-xs">Your planner is currently empty.</p>
              <p className="font-sans text-[10px] leading-relaxed max-w-xs mx-auto">
                Click the star icon (★) on any event to bookmark it and build your own tailored attendance list.
              </p>
            </div>
          ) : (
            <div className="space-y-3.5 max-h-[400px] overflow-y-auto pr-1">
              {SCHOOL_EVENTS.filter(e => bookmarks.includes(e.id)).map(e => (
                <div key={e.id} className="bg-white p-3.5 rounded-xl border border-slate-200 shadow-sm relative group flex items-start space-x-3">
                  <div className="bg-amber-400 text-indigo-950 text-[10px] font-bold tracking-wider px-2 py-0.5 rounded uppercase">
                    {e.category.slice(0, 3).toUpperCase()}
                  </div>
                  <div className="flex-grow min-w-0 space-y-1">
                    <span className="font-sans text-xs font-bold text-indigo-950 block truncate">{e.title}</span>
                    <span className="font-sans text-[10px] text-slate-400 block">{new Date(e.date).toLocaleDateString('en-US', {month: 'short', day: 'numeric'})} • {e.time}</span>
                  </div>
                  <button
                    id={`remove-schedule-item-${e.id}`}
                    onClick={() => toggleBookmark(e.id)}
                    className="text-slate-350 hover:text-red-500 text-sm font-bold cursor-pointer"
                    title="Remove item"
                  >
                    &times;
                  </button>
                </div>
              ))}
              
              <div className="pt-2 border-t border-slate-200 flex justify-between items-center text-[10px] text-slate-400 font-mono font-bold uppercase tracking-wider">
                <span>Total Bookmarked:</span>
                <span>{bookmarks.length} Events</span>
              </div>
            </div>
          )}

          <div className="bg-indigo-950 text-slate-300 p-5 rounded-2xl text-[11px] leading-relaxed border border-indigo-900 space-y-1.5">
            <span className="font-bold text-amber-300 font-mono tracking-wider block uppercase text-[10px]">Admissions Counseling</span>
            <p>Our counselors are available to answer queries regarding scheduling conflicts or parent orientation timelines. Email us at <strong className="text-white">admissions@pinecrest.edu</strong>.</p>
          </div>
        </div>

      </div>
    </div>
  );
}
