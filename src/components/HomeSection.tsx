import React, { useState } from 'react';
import { BookOpen, Award, Users, ShieldAlert, Award as MedalIcon, ArrowRight, Search, Filter, CalendarDays, ExternalLink } from 'lucide-react';
import { NEWS_ARTICLES, PINE_CAMPUS_HERO } from '../data';
import { NewsArticle } from '../types';

interface HomeSectionProps {
  onNavigate: (section: string) => void;
}

export default function HomeSection({ onNavigate }: HomeSectionProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [activeArticle, setActiveArticle] = useState<NewsArticle | null>(null);

  const categories = ['All', 'Academic', 'STEM', 'Arts', 'Athletics'];

  const filteredNews = NEWS_ARTICLES.filter((article) => {
    const matchesSearch = article.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          article.summary.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          article.content.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || article.category === selectedCategory || 
                            (selectedCategory === 'Academic' && article.category === 'Academic');
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="space-y-12 pb-20 pt-6">
      {/* Hero Section as a Floating Bento Box */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative h-[520px] overflow-hidden bg-indigo-950 rounded-[2.5rem] shadow-2xl border border-indigo-900/30 group">
          <div className="absolute inset-0 bg-gradient-to-t from-indigo-950/90 via-indigo-950/40 to-transparent z-10"></div>
          {/* Bento pattern overlay */}
          <div className="absolute inset-0 bento-pattern opacity-20 z-10 pointer-events-none"></div>
          <img
            src={PINE_CAMPUS_HERO}
            alt="Pinecrest Academy Campus"
            className="absolute inset-0 w-full h-full object-cover object-center transform scale-100 group-hover:scale-[1.03] transition-transform duration-10000 ease-out"
            referrerPolicy="no-referrer"
          />
          
          <div className="absolute bottom-0 left-0 right-0 z-20 p-8 sm:p-12 max-w-3xl space-y-5">
            <div className="inline-flex items-center space-x-2 bg-amber-400 text-indigo-950 text-[10px] font-mono font-black tracking-widest uppercase px-4 py-1.5 rounded-full shadow-lg">
              <Award className="h-4 w-4 stroke-[2.5]" />
              <span>Ranked #1 Prep Academy in Region</span>
            </div>
            
            <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white leading-tight">
              Excellence in Every <span className="italic text-amber-300">Endeavor.</span>
            </h1>
            
            <p className="font-sans text-base sm:text-lg text-slate-200 font-medium leading-relaxed max-w-2xl opacity-90">
              Welcome to Pinecrest Academy, where academic excellence integrates with artistic passion, robust athletics, and innovative research.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 pt-2">
              <button
                id="hero-admissions-btn"
                onClick={() => onNavigate('admissions')}
                className="flex items-center justify-center space-x-2 bg-amber-400 hover:bg-amber-300 text-indigo-950 font-display font-bold text-xs uppercase tracking-wider px-6 py-3.5 rounded-full shadow-lg hover:shadow-xl transition-all duration-150 transform hover:-translate-y-0.5"
              >
                <span>Admissions & Inquiry</span>
                <ArrowRight className="h-4.5 w-4.5 stroke-[2.5]" />
              </button>
              
              <button
                id="hero-tours-btn"
                onClick={() => onNavigate('campus')}
                className="flex items-center justify-center space-x-2 bg-white/10 hover:bg-white/20 text-white border border-white/20 font-display font-bold text-xs uppercase tracking-wider px-6 py-3.5 rounded-full backdrop-blur-sm transition-all"
              >
                <span>Explore Campus</span>
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Core Statistics bento grid layout */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-5">
          {[
            { value: '100%', label: 'College Acceptance', desc: 'Ivy & elite placements' },
            { value: '15:1', label: 'Average Class Size', desc: 'Highly focused attention' },
            { value: '22', label: 'Advanced Placement', desc: 'AP curriculum courses' },
            { value: '1,200+', label: 'Student Body Size', desc: 'Vibrant diverse community' }
          ].map((stat, i) => (
            <div key={i} className="bg-white rounded-[2rem] p-6 text-center border border-slate-200/80 shadow-sm hover:shadow-md transition-all flex flex-col justify-center items-center space-y-2">
              <span className="font-display text-3xl sm:text-4xl font-black text-indigo-900 block leading-none">{stat.value}</span>
              <span className="font-display text-[11px] font-bold uppercase tracking-wider text-slate-500 block">{stat.label}</span>
              <span className="font-sans text-[10px] text-slate-400 block">{stat.desc}</span>
            </div>
          ))}
        </div>
      </section>

      {/* Principal Welcome Section - Bento Card layout */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
          
          <div className="lg:col-span-5 relative bg-indigo-900 rounded-[2rem] overflow-hidden min-h-[400px] flex flex-col justify-end p-8 group shadow-xl">
            <div className="absolute inset-0 bg-gradient-to-t from-indigo-950/95 via-indigo-950/45 to-transparent z-10"></div>
            <img 
              src="https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=600" 
              alt="Principal Dr. Evelyn Carter" 
              className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              referrerPolicy="no-referrer"
            />
            <div className="relative z-20 space-y-2">
              <span className="px-3 py-1 bg-amber-400 text-indigo-950 text-[9px] font-black rounded-full uppercase tracking-widest inline-block">ACADEMY LEADERSHIP</span>
              <h3 className="font-display text-2xl font-bold text-white leading-tight">Dr. Evelyn Carter, Ph.D.</h3>
              <p className="font-mono text-[10px] text-indigo-200 uppercase tracking-widest">Principal & Academic Chair</p>
            </div>
          </div>
          
          <div className="lg:col-span-7 bg-white rounded-[2rem] p-8 sm:p-10 border border-slate-200/80 shadow-sm flex flex-col justify-between space-y-6">
            <div className="space-y-4">
              <span className="font-mono text-xs font-bold uppercase tracking-[0.2em] text-amber-500 block">Leadership Greeting</span>
              <h2 className="font-display text-3xl font-extrabold text-indigo-950 tracking-tight leading-snug">
                A Warm Welcome from Pinecrest
              </h2>
              
              <div className="h-1 w-16 bg-amber-400 rounded-full"></div>
              
              <p className="font-sans text-slate-600 leading-relaxed text-sm italic sm:text-base">
                "For nearly a century, Pinecrest Academy has been a cornerstone of educational distinction. Our school is a vibrant greenhouse where scientific curiosity meets creative flourish. We do not prepare students simply for high-stakes courses; we prepare them to lead with moral purpose."
              </p>
              
              <p className="font-sans text-slate-500 leading-relaxed text-xs sm:text-sm">
                Our faculty members represent industry specialists, published scholars, and devoted coaches who collaborate directly with students. Whether in our biomechanical design lab, the varsity field, or the acoustic chamber of our concert hall, Pinecrest students find their voices, build resilience, and establish friendships that endure a lifetime.
              </p>
            </div>
            
            <div className="pt-4 border-t border-slate-100 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
              <div>
                <p className="font-display text-indigo-900 font-bold italic block text-sm">"Sapientia, Virtus, Veritas"</p>
                <p className="font-mono text-[9px] uppercase text-slate-400 font-bold tracking-wider mt-0.5">Academy Motto — Wisdom, Virtue, Truth</p>
              </div>
              <button 
                onClick={() => onNavigate('academics')}
                className="inline-flex items-center space-x-1.5 text-xs font-display font-bold text-indigo-850 hover:text-amber-500 transition-colors uppercase tracking-wider self-start sm:self-auto"
              >
                <span>Curriculum Overview</span>
                <ArrowRight className="h-3.5 w-3.5" />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Announcements & News Feed */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-slate-200 pb-5">
          <div className="space-y-2">
            <span className="font-mono text-xs font-bold uppercase tracking-[0.2em] text-amber-500 block">Stay Connected</span>
            <h2 className="font-display text-3xl font-extrabold text-indigo-950 tracking-tight">
              Announcements & Campus News
            </h2>
          </div>
          
          {/* Search & Filters */}
          <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto">
            <div className="relative">
              <Search className="absolute left-3 top-3 h-4 w-4 text-slate-400" />
              <input
                type="text"
                placeholder="Search headlines..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-9 pr-4 py-2 rounded-xl border border-slate-200 text-xs focus:outline-none focus:ring-1 focus:ring-indigo-800 w-full sm:w-64 bg-white"
              />
            </div>
            
            <div className="flex gap-1 overflow-x-auto bg-slate-100 p-1 rounded-xl">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold tracking-wide transition-all whitespace-nowrap ${
                    selectedCategory === cat
                      ? 'bg-indigo-950 text-white shadow-sm'
                      : 'text-slate-600 hover:text-indigo-950 hover:bg-white/50'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* News Grid */}
        {filteredNews.length === 0 ? (
          <div className="text-center py-16 border border-dashed border-slate-200 rounded-[2rem] bg-slate-50">
            <p className="text-slate-400 font-sans text-sm">No matching announcements or articles found.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredNews.map((article) => (
              <article 
                key={article.id} 
                className="bg-white rounded-[2rem] overflow-hidden shadow-sm hover:shadow-md border border-slate-200/80 flex flex-col h-full transition-all duration-300 group"
              >
                <div className="relative h-48 overflow-hidden bg-slate-100">
                  <img
                    src={article.imageUrl}
                    alt={article.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    referrerPolicy="no-referrer"
                  />
                  <span className="absolute top-4 left-4 bg-indigo-950/90 text-amber-300 font-mono text-[10px] font-bold uppercase tracking-wider px-3 py-1 rounded-lg">
                    {article.category}
                  </span>
                </div>
                
                <div className="p-6 flex flex-col flex-grow space-y-3">
                  <div className="flex items-center space-x-2 text-slate-400 text-[10px] font-mono font-bold">
                    <CalendarDays className="h-3.5 w-3.5" />
                    <span>{article.publishDate}</span>
                  </div>
                  
                  <h3 className="font-display font-bold text-lg text-indigo-950 group-hover:text-indigo-850 transition-colors leading-snug">
                    {article.title}
                  </h3>
                  
                  <p className="font-sans text-slate-500 text-xs leading-relaxed flex-grow">
                    {article.summary}
                  </p>
                  
                  <div className="pt-4 border-t border-slate-100 flex items-center justify-between text-[11px] font-semibold text-indigo-900">
                    <span className="text-slate-400 font-medium">By {article.author}</span>
                    <button
                      onClick={() => setActiveArticle(article)}
                      className="flex items-center space-x-1 text-amber-600 hover:text-amber-700 font-display font-bold uppercase tracking-wider text-[10px]"
                    >
                      <span>Read Story</span>
                      <ArrowRight className="h-3.5 w-3.5" />
                    </button>
                  </div>
                </div>
              </article>
            ))}
          </div>
        )}
      </section>

      {/* Article Detail Modal */}
      {activeArticle && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-indigo-950/40 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-[2.5rem] max-w-3xl w-full max-h-[90vh] overflow-y-auto shadow-2xl border border-slate-200">
            <div className="relative h-64 sm:h-80 bg-slate-900">
              <img
                src={activeArticle.imageUrl}
                alt={activeArticle.title}
                className="w-full h-full object-cover opacity-85"
                referrerPolicy="no-referrer"
              />
              <button
                onClick={() => setActiveArticle(null)}
                className="absolute top-4 right-4 bg-indigo-950/80 hover:bg-indigo-950 text-white rounded-full p-2 h-9 w-9 flex items-center justify-center transition-colors shadow-lg font-bold text-lg"
              >
                <span className="sr-only">Close</span>
                &times;
              </button>
              <div className="absolute bottom-6 left-6 right-6 z-10">
                <span className="inline-block bg-amber-400 text-indigo-950 font-mono text-[9px] font-black uppercase tracking-widest px-3 py-1 rounded-full mb-2">
                  {activeArticle.category}
                </span>
                <h2 className="font-display text-2xl sm:text-3xl font-extrabold text-white leading-tight drop-shadow">
                  {activeArticle.title}
                </h2>
              </div>
            </div>
            
            <div className="p-6 sm:p-8 space-y-6">
              <div className="flex items-center justify-between text-[10px] font-mono text-slate-400 border-b border-slate-100 pb-4">
                <div className="flex items-center space-x-2">
                  <CalendarDays className="h-4 w-4" />
                  <span>Published: {activeArticle.publishDate}</span>
                </div>
                <span>Author: {activeArticle.author}</span>
              </div>
              
              <div className="font-sans text-slate-600 leading-relaxed text-sm space-y-4">
                <p className="font-display font-semibold text-slate-800 text-base leading-relaxed">
                  {activeArticle.summary}
                </p>
                {activeArticle.content.split('\n\n').map((paragraph, index) => (
                  <p key={index}>{paragraph}</p>
                ))}
              </div>
              
              <div className="pt-4 border-t border-slate-100 flex justify-end">
                <button
                  onClick={() => setActiveArticle(null)}
                  className="bg-indigo-900 hover:bg-indigo-950 text-white font-display font-bold text-xs uppercase tracking-wider px-6 py-2.5 rounded-full shadow-md"
                >
                  Close Story
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
