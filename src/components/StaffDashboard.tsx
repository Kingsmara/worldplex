import React, { useState, useEffect } from 'react';
import { InquirySubmission } from '../types';
import { Search, Filter, BookOpen, Clock, FileSpreadsheet, CheckCircle, MessageSquare, Save, Trash, AlertCircle, RefreshCw, Layers } from 'lucide-react';

const INITIAL_MOCK_INQUIRIES: InquirySubmission[] = [
  {
    id: 'PINECREST-384910',
    studentName: 'Julian Thorne',
    parentName: 'Clara Thorne',
    email: 'clara.thorne@example.com',
    phone: '+1 (555) 304-8840',
    gradeLevel: 'Grade 9 (Upper School)',
    academicYear: '2026-2027',
    interests: ['AP & Academic Rigor', 'Chamber Orchestra & Arts'],
    notes: 'Julian has played the violin for 4 years and hopes to audition for the Honors Chamber Orchestra. He is also highly motivated to take AP History courses.',
    submittedAt: 'June 28, 2026, 11:24 AM',
    status: 'Received'
  },
  {
    id: 'PINECREST-772910',
    studentName: 'Madelyn Chen',
    parentName: 'David Chen',
    email: 'david.chen@example.com',
    phone: '+1 (555) 492-3841',
    gradeLevel: 'Grade 6 to 8 (Middle School)',
    academicYear: '2026-2027',
    interests: ['VEX Robotics & AI', 'AP & Academic Rigor'],
    notes: 'Madelyn was part of her previous elementary schools coding club. She is looking for strong STEM programs and hands-on makerspaces.',
    submittedAt: 'June 25, 2026, 03:40 PM',
    status: 'Reviewing',
    staffNotes: 'Strong robotics background. Recommend pairing with STEM advisor for introductory interview.'
  },
  {
    id: 'PINECREST-102941',
    studentName: 'Oliver Vance',
    parentName: 'Eleanor Vance',
    email: 'eleanor.vance@example.com',
    phone: '+1 (555) 720-3940',
    gradeLevel: 'Grade 10 to 12 (Upper School)',
    academicYear: '2026-2027',
    interests: ['Varsity Athletics', 'Model United Nations'],
    notes: 'Oliver is a competitive central defender in regional club soccer. He is also eager to join the speech and debate team.',
    submittedAt: 'June 22, 2026, 09:12 AM',
    status: 'Interview Scheduled',
    staffNotes: 'Interview booked for September 14th at 10 AM. Varsity soccer coach Marcus Silva will join the tour.'
  },
  {
    id: 'PINECREST-992031',
    studentName: 'Sophie Dubois',
    parentName: 'Luc Dubois',
    email: 'luc.dubois@example.com',
    phone: '+1 (555) 831-2940',
    gradeLevel: 'Pre-Kindergarten (Lower School)',
    academicYear: '2027-2028',
    interests: ['Chamber Orchestra & Arts'],
    notes: 'Sophie is fluent in both French and English. We would love to tour the nature forest play center and learn more about early reading programs.',
    submittedAt: 'June 19, 2026, 02:15 PM',
    status: 'Offered',
    staffNotes: 'Provisional place offered for 2027 term. Awaiting enrollment contract signoff.'
  }
];

export default function StaffDashboard() {
  const [inquiries, setInquiries] = useState<InquirySubmission[]>([]);
  const [selectedInquiry, setSelectedInquiry] = useState<InquirySubmission | null>(null);
  
  // Search & Filter State
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('All');
  const [divisionFilter, setDivisionFilter] = useState<string>('All');
  
  // Editing state for selected inquiry
  const [adminNotes, setAdminNotes] = useState('');
  const [adminStatus, setAdminStatus] = useState<InquirySubmission['status']>('Received');
  const [saveSuccess, setSaveSuccess] = useState(false);

  // Load submissions from localStorage
  useEffect(() => {
    loadInquiries();
  }, []);

  const loadInquiries = () => {
    const saved = localStorage.getItem('pinecrest_inquiries');
    if (saved) {
      setInquiries(JSON.parse(saved));
    } else {
      // Boot strap with mock inquiries
      localStorage.setItem('pinecrest_inquiries', JSON.stringify(INITIAL_MOCK_INQUIRIES));
      setInquiries(INITIAL_MOCK_INQUIRIES);
    }
  };

  // Select item handler
  const handleSelectInquiry = (inq: InquirySubmission) => {
    setSelectedInquiry(inq);
    setAdminNotes(inq.staffNotes || '');
    setAdminStatus(inq.status);
    setSaveSuccess(false);
  };

  // Save changes to LocalStorage
  const handleSaveChanges = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedInquiry) return;

    const updated = inquiries.map((item) => {
      if (item.id === selectedInquiry.id) {
        return {
          ...item,
          status: adminStatus,
          staffNotes: adminNotes
        };
      }
      return item;
    });

    localStorage.setItem('pinecrest_inquiries', JSON.stringify(updated));
    setInquiries(updated);
    
    // Update active inspector reference
    setSelectedInquiry({
      ...selectedInquiry,
      status: adminStatus,
      staffNotes: adminNotes
    });

    setSaveSuccess(true);
    setTimeout(() => setSaveSuccess(false), 2000);
  };

  // Delete Inquiry
  const handleDeleteInquiry = (id: string) => {
    if (!confirm('Are you sure you want to delete this enrollment inquiry? This action cannot be undone.')) {
      return;
    }
    const updated = inquiries.filter(item => item.id !== id);
    localStorage.setItem('pinecrest_inquiries', JSON.stringify(updated));
    setInquiries(updated);
    if (selectedInquiry?.id === id) {
      setSelectedInquiry(null);
    }
  };

  // Purge / Reset to Mock data
  const handleResetToFactory = () => {
    if (confirm('Reset system data? All newly submitted inquiries will be replaced by the defaults.')) {
      localStorage.setItem('pinecrest_inquiries', JSON.stringify(INITIAL_MOCK_INQUIRIES));
      setInquiries(INITIAL_MOCK_INQUIRIES);
      setSelectedInquiry(null);
    }
  };

  // Filter computation
  const filteredInquiries = inquiries.filter((inq) => {
    const matchesSearch = inq.studentName.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          inq.parentName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          inq.id.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = statusFilter === 'All' || inq.status === statusFilter;
    
    let matchesDivision = true;
    if (divisionFilter !== 'All') {
      matchesDivision = inq.gradeLevel.includes(divisionFilter);
    }

    return matchesSearch && matchesStatus && matchesDivision;
  });

  // Calculate Statistics Metrics
  const totalCount = inquiries.length;
  const receivedCount = inquiries.filter(i => i.status === 'Received').length;
  const interviewingCount = inquiries.filter(i => i.status === 'Interview Scheduled').length;
  const offeredCount = inquiries.filter(i => i.status === 'Offered').length;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10">
      
      {/* Title */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-slate-200 pb-6">
        <div className="space-y-2">
          <span className="font-mono text-xs font-bold uppercase tracking-[0.2em] text-amber-500 block">Staff Operations Workspace</span>
          <h1 className="font-display text-4xl font-extrabold text-indigo-950 tracking-tight">Admissions Intake Console</h1>
          <p className="font-sans text-slate-500 text-sm max-w-xl">
            Real-time management dashboard. Track prospective parent applications, arrange face-to-face consultations, and input staff records securely.
          </p>
        </div>

        <button
          id="purge-system-btn"
          onClick={handleResetToFactory}
          className="flex items-center space-x-1.5 px-4 py-2.5 border border-dashed border-red-300 text-red-650 rounded-xl font-mono text-[10px] font-bold uppercase tracking-wider hover:bg-red-50/50 transition-colors shadow-sm cursor-pointer"
        >
          <RefreshCw className="h-3.5 w-3.5" />
          <span>Reset Factory Database</span>
        </button>
      </div>

      {/* Numerical Indicators Ribbon - Bento style */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm flex items-center justify-between">
          <div>
            <span className="font-mono text-[9px] uppercase font-bold text-slate-400 block tracking-wider">Total Inquiries</span>
            <span className="font-display text-3xl font-black text-indigo-950 block mt-1">{totalCount}</span>
          </div>
          <Layers className="h-8 w-8 text-indigo-950/25 stroke-[1.5]" />
        </div>

        <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm flex items-center justify-between">
          <div>
            <span className="font-mono text-[9px] uppercase font-bold text-slate-400 block tracking-wider">Pending Review</span>
            <span className="font-display text-3xl font-black text-amber-500 block mt-1">{receivedCount}</span>
          </div>
          <Clock className="h-8 w-8 text-amber-400/25 stroke-[1.5]" />
        </div>

        <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm flex items-center justify-between">
          <div>
            <span className="font-mono text-[9px] uppercase font-bold text-slate-400 block tracking-wider">Interviews Scheduled</span>
            <span className="font-display text-3xl font-black text-indigo-900 block mt-1">{interviewingCount}</span>
          </div>
          <MessageSquare className="h-8 w-8 text-indigo-900/25 stroke-[1.5]" />
        </div>

        <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm flex items-center justify-between">
          <div>
            <span className="font-mono text-[9px] uppercase font-bold text-slate-400 block tracking-wider">Admissions Offered</span>
            <span className="font-display text-3xl font-black text-indigo-955 block mt-1">{offeredCount}</span>
          </div>
          <CheckCircle className="h-8 w-8 text-indigo-950/25 stroke-[1.5]" />
        </div>
      </div>

      {/* Workspace Grid splits */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
        
        {/* Left: Lists Table */}
        <div className="lg:col-span-7 space-y-4">
          
          {/* Search filters */}
          <div className="flex flex-col sm:flex-row gap-3 bg-slate-50 p-4 rounded-2xl border border-slate-200 justify-between items-center">
            
            <div className="relative w-full sm:w-64">
              <Search className="absolute left-3 top-2.5 h-4 w-4 text-slate-450" />
              <input
                type="text"
                placeholder="Search name or ID code..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-9 pr-4 py-2 bg-white text-xs rounded-xl border border-slate-200 focus:outline-none focus:ring-1 focus:ring-indigo-850 w-full"
              />
            </div>

            <div className="flex gap-2 w-full sm:w-auto overflow-x-auto">
              {/* Status Selector */}
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="bg-white text-xs border border-slate-200 px-3 py-2 rounded-xl font-bold text-slate-600 focus:outline-none cursor-pointer"
              >
                <option value="All">All Statuses</option>
                <option value="Received">Received</option>
                <option value="Reviewing">Reviewing</option>
                <option value="Interview Scheduled">Interview Scheduled</option>
                <option value="Offered">Offered</option>
                <option value="Archived">Archived</option>
              </select>

              {/* Division Selector */}
              <select
                value={divisionFilter}
                onChange={(e) => setDivisionFilter(e.target.value)}
                className="bg-white text-xs border border-slate-200 px-3 py-2 rounded-xl font-bold text-slate-600 focus:outline-none cursor-pointer"
              >
                <option value="All">All Divisions</option>
                <option value="Lower School">Lower School</option>
                <option value="Middle School">Middle School</option>
                <option value="Upper School">Upper School</option>
              </select>
            </div>
          </div>

          {/* Core Table List */}
          <div className="bg-white rounded-[2rem] border border-slate-200 overflow-hidden shadow-sm">
            {filteredInquiries.length === 0 ? (
              <div className="text-center py-16 text-slate-400 font-sans text-sm bg-slate-50/20">
                No matching admissions inquiries found in database.
              </div>
            ) : (
              <div className="divide-y divide-slate-100">
                {filteredInquiries.map((inq) => {
                  const isSelected = selectedInquiry?.id === inq.id;
                  
                  // Status Color assignment
                  let statusStyle = 'bg-slate-100 text-slate-600 border-slate-200';
                  if (inq.status === 'Received') statusStyle = 'bg-indigo-50 text-indigo-800 border-indigo-200';
                  else if (inq.status === 'Reviewing') statusStyle = 'bg-amber-50 text-amber-850 border-amber-200';
                  else if (inq.status === 'Interview Scheduled') statusStyle = 'bg-indigo-50/70 text-indigo-900 border-indigo-200';
                  else if (inq.status === 'Offered') statusStyle = 'bg-emerald-50 text-emerald-800 border-emerald-200';
                  else if (inq.status === 'Archived') statusStyle = 'bg-slate-100 text-slate-500 border-slate-200';

                  return (
                    <div 
                      key={inq.id}
                      onClick={() => handleSelectInquiry(inq)}
                      className={`p-5 transition-all cursor-pointer hover:bg-slate-50 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-l-4 ${
                        isSelected ? 'bg-indigo-50/30 border-l-indigo-950' : 'border-l-transparent'
                      }`}
                    >
                      <div className="space-y-1">
                        <div className="flex items-center space-x-2">
                          <span className="font-sans font-extrabold text-sm text-indigo-950">{inq.studentName}</span>
                          <span className="font-mono text-[9px] text-slate-400 bg-slate-100 px-1.5 py-0.5 rounded">
                            {inq.id}
                          </span>
                        </div>
                        <div className="font-sans text-slate-500 text-xs">
                          Parent: <strong className="font-semibold text-slate-600">{inq.parentName}</strong> • {inq.gradeLevel.split(' (')[0]}
                        </div>
                        <div className="font-sans text-[10px] text-slate-405">
                          Submitted: {inq.submittedAt}
                        </div>
                      </div>

                      <div className="flex items-center space-x-3.5 sm:justify-end justify-between">
                        <span className={`inline-block font-mono text-[9px] uppercase font-bold tracking-wider px-2.5 py-1 rounded-full border ${statusStyle}`}>
                          {inq.status}
                        </span>
                        
                        <button
                          id={`delete-inquiry-btn-${inq.id}`}
                          onClick={(e) => {
                            e.stopPropagation();
                            handleDeleteInquiry(inq.id);
                          }}
                          className="text-slate-300 hover:text-red-600 p-1.5 hover:bg-slate-100 rounded-xl cursor-pointer"
                          title="Purge record"
                        >
                          <Trash className="h-4 w-4" />
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </div>

        {/* Right: Selected Inquiry Editor Panel */}
        <div className="lg:col-span-5">
          {selectedInquiry ? (
            <div className="bg-white rounded-[2rem] border border-slate-200 p-6 sm:p-8 shadow-md space-y-6">
              <div className="border-b border-slate-150 pb-4 flex justify-between items-center">
                <div>
                  <span className="font-mono text-[9px] uppercase font-bold text-amber-500 tracking-wider">Record Inspector</span>
                  <h3 className="font-display font-bold text-lg text-indigo-950 leading-none mt-1.5">
                    {selectedInquiry.studentName}
                  </h3>
                </div>
                <span className="font-mono text-xs font-black text-slate-400 bg-slate-50 px-2.5 py-1 rounded border border-slate-200">
                  {selectedInquiry.id}
                </span>
              </div>

              {/* Grid data */}
              <div className="grid grid-cols-2 gap-4 text-xs font-sans">
                <div>
                  <span className="text-slate-400 block font-semibold text-[9px] uppercase tracking-wider">Parent / Guardian</span>
                  <span className="font-bold text-slate-800">{selectedInquiry.parentName}</span>
                </div>
                <div>
                  <span className="text-slate-400 block font-semibold text-[9px] uppercase tracking-wider">Grade Target</span>
                  <span className="font-bold text-slate-800 truncate block">{selectedInquiry.gradeLevel}</span>
                </div>
                <div>
                  <span className="text-slate-400 block font-semibold text-[9px] uppercase tracking-wider">Email Contact</span>
                  <a href={`mailto:${selectedInquiry.email}`} className="text-indigo-900 underline font-semibold block truncate">
                    {selectedInquiry.email}
                  </a>
                </div>
                <div>
                  <span className="text-slate-400 block font-semibold text-[9px] uppercase tracking-wider">Phone Number</span>
                  <span className="font-mono font-bold text-slate-800 block">{selectedInquiry.phone || 'Not Specified'}</span>
                </div>
              </div>

              {/* Co-curricular interests checked */}
              <div className="space-y-2 border-t border-slate-100 pt-4">
                <span className="text-slate-400 block font-semibold font-mono text-[9px] uppercase tracking-wider">Student Interests</span>
                {selectedInquiry.interests.length === 0 ? (
                  <span className="text-slate-450 font-sans text-xs italic">No specific interest items cataloged.</span>
                ) : (
                  <div className="flex flex-wrap gap-1.5">
                    {selectedInquiry.interests.map((it) => (
                      <span key={it} className="bg-slate-50 text-slate-650 border border-slate-200 text-[10px] font-sans font-semibold px-2.5 py-1 rounded-lg">
                        {it}
                      </span>
                    ))}
                  </div>
                )}
              </div>

              {/* Parent Notes block */}
              <div className="space-y-1.5 border-t border-slate-100 pt-4">
                <span className="text-slate-400 block font-semibold font-mono text-[9px] uppercase tracking-wider">Parent Comments & Notes</span>
                <p className="font-sans text-slate-700 text-xs leading-relaxed bg-slate-50 p-4 rounded-xl border border-slate-200">
                  {selectedInquiry.notes || 'No comments specified.'}
                </p>
              </div>

              {/* Interactive editor Form */}
              <form onSubmit={handleSaveChanges} className="space-y-4 border-t border-slate-200 pt-5 mt-4">
                <span className="font-mono text-[10px] uppercase font-bold text-amber-500 block tracking-widest">Administrative Adjustments</span>
                
                <div className="grid grid-cols-1 gap-4">
                  {/* Status Dropdown */}
                  <div className="space-y-1.5">
                    <label className="font-sans text-xs font-bold text-slate-600 block">Enrollment Phase Status</label>
                    <select
                      value={adminStatus}
                      onChange={(e) => setAdminStatus(e.target.value as any)}
                      className="w-full bg-white border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs font-semibold focus:outline-none focus:ring-1 focus:ring-indigo-850 cursor-pointer"
                    >
                      <option value="Received">Received</option>
                      <option value="Reviewing">Reviewing</option>
                      <option value="Interview Scheduled">Interview Scheduled</option>
                      <option value="Offered">Offered</option>
                      <option value="Archived">Archived</option>
                    </select>
                  </div>

                  {/* Private Staff Notes */}
                  <div className="space-y-1.5">
                    <label className="font-sans text-xs font-bold text-slate-600 block">Private Admissions Notes (Internal)</label>
                    <textarea
                      rows={3}
                      placeholder="e.g. Awaiting math diagnostic scores..."
                      value={adminNotes}
                      onChange={(e) => setAdminNotes(e.target.value)}
                      className="w-full bg-white border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs focus:ring-1 focus:ring-indigo-850 focus:outline-none text-slate-700 font-sans"
                    ></textarea>
                  </div>
                </div>

                {/* Save Button */}
                <div className="pt-2">
                  <button
                    type="submit"
                    id="save-notes-btn"
                    className="w-full bg-indigo-950 hover:bg-indigo-900 text-white py-3.5 rounded-full font-display font-bold text-xs uppercase tracking-wider transition-all flex items-center justify-center space-x-2 shadow cursor-pointer"
                  >
                    <Save className="h-4 w-4" />
                    <span>Save Application Changes</span>
                  </button>
                </div>

                {saveSuccess && (
                  <div className="bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs px-3.5 py-2.5 rounded-xl flex items-center justify-center space-x-2 animate-pulse text-center">
                    <CheckCircle className="h-4 w-4 shrink-0" />
                    <span>Changes Saved and Sync&apos;d with Database!</span>
                  </div>
                )}
              </form>
            </div>
          ) : (
            <div className="bg-slate-50 rounded-[2rem] border border-dashed border-slate-300 p-12 text-center text-slate-400 space-y-3 h-full flex flex-col justify-center items-center">
              <AlertCircle className="h-10 w-10 text-slate-300" />
              <h3 className="font-display font-bold text-slate-500">No Record Inspected</h3>
              <p className="font-sans text-xs max-w-xs leading-relaxed">
                Choose an inquiry card from the list on the left to review its parameters, write custom notes, and manage the enrollment process.
              </p>
            </div>
          )}
        </div>

      </div>
    </div>
  );
}
