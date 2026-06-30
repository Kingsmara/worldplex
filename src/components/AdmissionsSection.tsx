import React, { useState } from 'react';
import { TUITION_BASE_FEES } from '../data';
import { InquirySubmission } from '../types';
import { Calculator, FileText, CheckCircle2, FileSpreadsheet, Send, HelpCircle, RefreshCw } from 'lucide-react';

export default function AdmissionsSection() {
  const [activeAdmissionsTab, setActiveAdmissionsTab] = useState<'estimator' | 'inquiry'>('estimator');
  
  // Tuition Estimator State
  const [division, setDivision] = useState<'Lower School' | 'Middle School' | 'Upper School'>('Lower School');
  const [boarding, setBoarding] = useState<boolean>(false);
  const [mealPlan, setMealPlan] = useState<'None' | 'Standard' | 'Premium'>('Standard');
  const [addons, setAddons] = useState({
    transport: false,
    athletics: true,
    tech: true,
    insurance: false
  });

  // Inquiry Form State
  const [formData, setFormData] = useState({
    studentName: '',
    parentName: '',
    email: '',
    phone: '',
    gradeLevel: 'Grade 9 (Upper School)',
    academicYear: '2026-2027',
    interests: [] as string[],
    notes: ''
  });
  
  const [submitting, setSubmitting] = useState(false);
  const [submissionSuccess, setSubmissionSuccess] = useState<string | null>(null);

  // Interest options for Inquiry
  const interestOptions = [
    'AP & Academic Rigor',
    'VEX Robotics & AI',
    'Chamber Orchestra & Arts',
    'Varsity Athletics',
    'Model United Nations',
    'Study Abroad Program'
  ];

  // Calculations for Tuition
  const baseFees = TUITION_BASE_FEES[division];
  const boardingCost = boarding && division !== 'Lower School' ? baseFees.boardOption : 0;
  
  let mealCost = 0;
  if (mealPlan === 'Standard') mealCost = baseFees.meals;
  else if (mealPlan === 'Premium') mealCost = baseFees.meals * 1.5;

  const transportCost = addons.transport ? 1200 : 0;
  const athleticsCost = addons.athletics ? 500 : 0;
  const techCost = addons.tech ? baseFees.techActivity : 0;
  const insuranceCost = addons.insurance ? 850 : 0;

  const totalTuition = baseFees.base + boardingCost + mealCost + transportCost + athleticsCost + techCost + insuranceCost;

  // Form Handlers
  const handleInterestToggle = (interest: string) => {
    if (formData.interests.includes(interest)) {
      setFormData({
        ...formData,
        interests: formData.interests.filter(item => item !== interest)
      });
    } else {
      setFormData({
        ...formData,
        interests: [...formData.interests, interest]
      });
    }
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.studentName || !formData.parentName || !formData.email) {
      alert('Please fill out all required fields.');
      return;
    }

    setSubmitting(true);

    // Simulate Network lag
    setTimeout(() => {
      const confirmationId = `PINECREST-${Math.floor(100000 + Math.random() * 900000)}`;
      
      const newSubmission: InquirySubmission = {
        id: confirmationId,
        studentName: formData.studentName,
        parentName: formData.parentName,
        email: formData.email,
        phone: formData.phone,
        gradeLevel: formData.gradeLevel,
        academicYear: formData.academicYear,
        interests: formData.interests,
        notes: formData.notes,
        submittedAt: new Date().toLocaleDateString('en-US', {
          year: 'numeric',
          month: 'long',
          day: 'numeric',
          hour: '2-digit',
          minute: '2-digit'
        }),
        status: 'Received'
      };

      // Retrieve existing from localStorage
      const existingInquiriesJson = localStorage.getItem('pinecrest_inquiries');
      const existingInquiries: InquirySubmission[] = existingInquiriesJson ? JSON.parse(existingInquiriesJson) : [];
      
      // Save updated
      localStorage.setItem('pinecrest_inquiries', JSON.stringify([newSubmission, ...existingInquiries]));

      setSubmitting(false);
      setSubmissionSuccess(confirmationId);
      
      // Reset form fields
      setFormData({
        studentName: '',
        parentName: '',
        email: '',
        phone: '',
        gradeLevel: 'Grade 9 (Upper School)',
        academicYear: '2026-2027',
        interests: [],
        notes: ''
      });
    }, 1200);
  };

  const resetEstimator = () => {
    setDivision('Lower School');
    setBoarding(false);
    setMealPlan('Standard');
    setAddons({
      transport: false,
      athletics: true,
      tech: true,
      insurance: false
    });
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-12">
      {/* Introduction Header */}
      <div className="text-center max-w-2xl mx-auto space-y-4">
        <span className="font-mono text-xs font-bold uppercase tracking-[0.2em] text-amber-500">Join the Eagle Community</span>
        <h1 className="font-display text-4xl font-extrabold text-indigo-950 tracking-tight">Admissions & Enrollment</h1>
        <p className="font-sans text-slate-500 text-sm leading-relaxed">
          Embarking on a transformative educational path. Evaluate prospective fees and submit your online admissions inquiry within minutes.
        </p>
        
        {/* Tab Picker */}
        <div className="flex justify-center pt-2">
          <div className="bg-slate-100 p-1.5 rounded-2xl inline-flex shadow-inner border border-slate-200">
            <button
              id="adm-tab-estimator"
              onClick={() => {
                setActiveAdmissionsTab('estimator');
                setSubmissionSuccess(null);
              }}
              className={`flex items-center space-x-2 px-5 py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider transition-all cursor-pointer ${
                activeAdmissionsTab === 'estimator'
                  ? 'bg-indigo-950 text-white shadow-md'
                  : 'text-slate-600 hover:text-indigo-950'
              }`}
            >
              <Calculator className="h-4 w-4" />
              <span>Tuition Estimator</span>
            </button>
            <button
              id="adm-tab-inquiry"
              onClick={() => setActiveAdmissionsTab('inquiry')}
              className={`flex items-center space-x-2 px-5 py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider transition-all cursor-pointer ${
                activeAdmissionsTab === 'inquiry'
                  ? 'bg-indigo-950 text-white shadow-md'
                  : 'text-slate-600 hover:text-indigo-950'
              }`}
            >
              <FileText className="h-4 w-4" />
              <span>Submit Inquiry Form</span>
            </button>
          </div>
        </div>
      </div>

      {activeAdmissionsTab === 'estimator' ? (
        /* TUITION ESTIMATOR SECTION */
        <div className="bg-white rounded-[2rem] border border-slate-200 p-6 sm:p-10 shadow-lg grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Settings panel */}
          <div className="lg:col-span-7 space-y-8">
            <div className="flex justify-between items-center border-b border-slate-100 pb-3">
              <h3 className="font-display font-bold text-lg text-indigo-950">Customize Tuition Variables</h3>
              <button
                id="estimator-reset-btn"
                onClick={resetEstimator}
                className="flex items-center space-x-1 font-mono text-xs font-bold text-slate-400 hover:text-indigo-900 cursor-pointer"
              >
                <RefreshCw className="h-3 w-3" />
                <span>Reset Defaults</span>
              </button>
            </div>

            {/* Division Selector */}
            <div className="space-y-3">
              <label className="font-display font-bold text-xs uppercase tracking-wider text-slate-500 block">Academic Level / Division</label>
              <div className="grid grid-cols-3 gap-3">
                {['Lower School', 'Middle School', 'Upper School'].map((lvl) => (
                  <button
                    key={lvl}
                    onClick={() => {
                      setDivision(lvl as any);
                      if (lvl === 'Lower School') setBoarding(false); // No boarding for lowerschool
                    }}
                    className={`py-3 px-4 rounded-xl text-center border font-sans text-xs font-semibold tracking-wide transition-all cursor-pointer ${
                      division === lvl
                        ? 'bg-indigo-50 text-indigo-950 border-indigo-950 shadow-sm ring-1 ring-indigo-950/30 font-bold'
                        : 'bg-white text-slate-600 border-slate-200 hover:bg-slate-50'
                    }`}
                  >
                    {lvl}
                  </button>
                ))}
              </div>
            </div>

            {/* Boarding option (not available for Lower School) */}
            <div className="space-y-3">
              <label className="font-display font-bold text-xs uppercase tracking-wider text-slate-500 block">Housing & Residency</label>
              {division === 'Lower School' ? (
                <div className="bg-amber-400/10 border border-amber-300/20 p-4 rounded-2xl text-xs font-sans text-amber-800 leading-normal">
                  Boarding programs are exclusively available for Middle & Upper School students (Grades 6-12). Lower School students are Day students only.
                </div>
              ) : (
                <div className="grid grid-cols-2 gap-3">
                  <button
                    id="boarding-day-btn"
                    onClick={() => setBoarding(false)}
                    className={`py-3 px-4 rounded-xl text-center border font-sans text-xs font-semibold tracking-wide transition-all cursor-pointer ${
                      !boarding
                        ? 'bg-indigo-50 text-indigo-950 border-indigo-950 shadow-sm ring-1 ring-indigo-950/30 font-bold'
                        : 'bg-white text-slate-600 border-slate-200 hover:bg-slate-50'
                    }`}
                  >
                    Day Student
                  </button>
                  <button
                    id="boarding-resident-btn"
                    onClick={() => setBoarding(true)}
                    className={`py-3 px-4 rounded-xl text-center border font-sans text-xs font-semibold tracking-wide transition-all cursor-pointer ${
                      boarding
                        ? 'bg-indigo-50 text-indigo-950 border-indigo-950 shadow-sm ring-1 ring-indigo-950/30 font-bold'
                        : 'bg-white text-slate-600 border-slate-200 hover:bg-slate-50'
                    }`}
                  >
                    On-Campus Boarding Resident
                  </button>
                </div>
              )}
            </div>

            {/* Meal Plan Plan */}
            <div className="space-y-3">
              <label className="font-display font-bold text-xs uppercase tracking-wider text-slate-500 block">Campus Dining Plan</label>
              <div className="grid grid-cols-3 gap-3">
                {[
                  { key: 'None', label: 'No Plan / Day Bag' },
                  { key: 'Standard', label: 'Standard Dining' },
                  { key: 'Premium', label: 'Premium Chef Club' }
                ].map((plan) => (
                  <button
                    key={plan.key}
                    onClick={() => setMealPlan(plan.key as any)}
                    className={`py-3 px-2 rounded-xl text-center border font-sans text-xs font-semibold tracking-wide transition-all cursor-pointer ${
                      mealPlan === plan.key
                        ? 'bg-indigo-50 text-indigo-950 border-indigo-950 shadow-sm ring-1 ring-indigo-950/30 font-bold'
                        : 'bg-white text-slate-600 border-slate-200 hover:bg-slate-50'
                    }`}
                  >
                    {plan.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Optional Extras */}
            <div className="space-y-3">
              <label className="font-display font-bold text-xs uppercase tracking-wider text-slate-500 block">Optional Programs & Service Audits</label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                <label className="flex items-center justify-between p-3.5 bg-slate-50 rounded-xl border border-slate-200 cursor-pointer hover:bg-slate-100/70 transition-all">
                  <div className="flex flex-col">
                    <span className="font-sans text-xs font-bold text-slate-850">Two-way Bus Shuttles</span>
                    <span className="font-sans text-[10px] text-slate-400">+$1,200 / Academic Year</span>
                  </div>
                  <input
                    type="checkbox"
                    checked={addons.transport}
                    onChange={(e) => setAddons({ ...addons, transport: e.target.checked })}
                    className="h-4 w-4 text-indigo-950 rounded border-slate-300 focus:ring-indigo-900"
                  />
                </label>

                <label className="flex items-center justify-between p-3.5 bg-slate-50 rounded-xl border border-slate-200 cursor-pointer hover:bg-slate-100/70 transition-all">
                  <div className="flex flex-col">
                    <span className="font-sans text-xs font-bold text-slate-850">Varsity Athletic Fees</span>
                    <span className="font-sans text-[10px] text-slate-400">+$500 / Academic Year</span>
                  </div>
                  <input
                    type="checkbox"
                    checked={addons.athletics}
                    onChange={(e) => setAddons({ ...addons, athletics: e.target.checked })}
                    className="h-4 w-4 text-indigo-950 rounded border-slate-300 focus:ring-indigo-900"
                  />
                </label>

                <label className="flex items-center justify-between p-3.5 bg-slate-50 rounded-xl border border-slate-200 cursor-pointer hover:bg-slate-100/70 transition-all">
                  <div className="flex flex-col">
                    <span className="font-sans text-xs font-bold text-slate-850">Technology & Lab Licensing</span>
                    <span className="font-sans text-[10px] text-slate-400">+${baseFees.techActivity} (Varies)</span>
                  </div>
                  <input
                    type="checkbox"
                    checked={addons.tech}
                    onChange={(e) => setAddons({ ...addons, tech: e.target.checked })}
                    className="h-4 w-4 text-indigo-950 rounded border-slate-300 focus:ring-indigo-900"
                  />
                </label>

                <label className="flex items-center justify-between p-3.5 bg-slate-50 rounded-xl border border-slate-200 cursor-pointer hover:bg-slate-100/70 transition-all">
                  <div className="flex flex-col">
                    <span className="font-sans text-xs font-bold text-slate-850">Student Health Insurance</span>
                    <span className="font-sans text-[10px] text-slate-400">+$850 / Academic Year</span>
                  </div>
                  <input
                    type="checkbox"
                    checked={addons.insurance}
                    onChange={(e) => setAddons({ ...addons, insurance: e.target.checked })}
                    className="h-4 w-4 text-indigo-950 rounded border-slate-300 focus:ring-indigo-900"
                  />
                </label>
              </div>
            </div>
          </div>

          {/* Dynamic Invoice Summary Panel */}
          <div className="lg:col-span-5 bg-slate-50 rounded-[2rem] p-6 sm:p-8 border border-slate-200 flex flex-col justify-between h-full relative overflow-hidden">
            <div className="space-y-6">
              <div className="flex items-center justify-between border-b border-slate-200 pb-4">
                <span className="font-mono text-[10px] uppercase font-extrabold text-slate-500 tracking-wider">Itemized Fee Schedule</span>
                <span className="bg-indigo-950 text-amber-300 text-[10px] font-mono font-bold tracking-widest uppercase px-2.5 py-0.5 rounded-lg">
                  ESTIMATE
                </span>
              </div>

              {/* Fee Receipt Breakdown */}
              <div className="space-y-4">
                <div className="flex justify-between items-start">
                  <div>
                    <span className="font-sans text-xs font-bold text-slate-800 block">Base Academic Tuition</span>
                    <span className="font-sans text-[10px] text-slate-400">{division} Instructional Fee</span>
                  </div>
                  <span className="font-mono text-xs font-bold text-slate-800">${baseFees.base.toLocaleString()}</span>
                </div>

                {boarding && (
                  <div className="flex justify-between items-start border-t border-slate-200/50 pt-2">
                    <div>
                      <span className="font-sans text-xs font-bold text-slate-800 block">Residential Housing Fee</span>
                      <span className="font-sans text-[10px] text-slate-400">Dormitories, Laundry & Security</span>
                    </div>
                    <span className="font-mono text-xs font-bold text-slate-800">${boardingCost.toLocaleString()}</span>
                  </div>
                )}

                {mealPlan !== 'None' && (
                  <div className="flex justify-between items-start border-t border-slate-200/50 pt-2">
                    <div>
                      <span className="font-sans text-xs font-bold text-slate-800 block">Campus Meal Plan</span>
                      <span className="font-sans text-[10px] text-slate-400">{mealPlan} dining schedule</span>
                    </div>
                    <span className="font-mono text-xs font-bold text-slate-800">${mealCost.toLocaleString()}</span>
                  </div>
                )}

                {addons.transport && (
                  <div className="flex justify-between items-start border-t border-slate-200/50 pt-2">
                    <div>
                      <span className="font-sans text-xs font-bold text-slate-800 block">Private Transport Service</span>
                      <span className="font-sans text-[10px] text-slate-400">Direct morning/evening routing</span>
                    </div>
                    <span className="font-mono text-xs font-bold text-slate-800">${transportCost.toLocaleString()}</span>
                  </div>
                )}

                {addons.athletics && (
                  <div className="flex justify-between items-start border-t border-slate-200/50 pt-2">
                    <div>
                      <span className="font-sans text-xs font-bold text-slate-800 block">Athletic Fields & Varsity Gym</span>
                      <span className="font-sans text-[10px] text-slate-400">Coaching, tournament gear & insurance</span>
                    </div>
                    <span className="font-mono text-xs font-bold text-slate-800">${athleticsCost.toLocaleString()}</span>
                  </div>
                )}

                {addons.tech && (
                  <div className="flex justify-between items-start border-t border-slate-200/50 pt-2">
                    <div>
                      <span className="font-sans text-xs font-bold text-slate-800 block">VEX Tech & Science Lab Licences</span>
                      <span className="font-sans text-[10px] text-slate-400">Physics software, VR rigs & woodshops</span>
                    </div>
                    <span className="font-mono text-xs font-bold text-slate-800">${techCost.toLocaleString()}</span>
                  </div>
                )}

                {addons.insurance && (
                  <div className="flex justify-between items-start border-t border-slate-200/50 pt-2">
                    <div>
                      <span className="font-sans text-xs font-bold text-slate-800 block">Student Health Insurance</span>
                      <span className="font-sans text-[10px] text-slate-400">Comprehensive emergency policy</span>
                    </div>
                    <span className="font-mono text-xs font-bold text-slate-800">${insuranceCost.toLocaleString()}</span>
                  </div>
                )}
              </div>
            </div>

            {/* Total Block */}
            <div className="border-t border-slate-200 pt-6 mt-8 space-y-4">
              <div className="flex justify-between items-center">
                <span className="font-display font-extrabold text-slate-800 text-sm uppercase tracking-wider">Estimated Total</span>
                <span className="font-display text-3xl font-black text-indigo-950">${totalTuition.toLocaleString()}</span>
              </div>
              
              <div className="bg-indigo-950 text-slate-300 p-4 rounded-2xl text-[11px] leading-relaxed border border-indigo-900 space-y-1">
                <span className="font-bold text-amber-300 uppercase block font-mono tracking-wider text-[10px]">Financial Aid & Grants</span>
                <p>Over 42% of Pinecrest students receive custom merit scholarships or need-based grants. Financial assistance packages are reviewed independently from inquiry status.</p>
              </div>

              <button
                id="apply-financial-aid-btn"
                onClick={() => setActiveAdmissionsTab('inquiry')}
                className="w-full bg-amber-400 hover:bg-amber-500 text-indigo-950 py-3.5 rounded-full font-display font-bold text-xs uppercase tracking-wider text-center block shadow transition-all cursor-pointer"
              >
                Inquire For Financial Aid
              </button>
            </div>
          </div>
        </div>
      ) : (
        /* ADMISSIONS INQUIRY FORM */
        <div className="max-w-3xl mx-auto bg-white rounded-[2rem] border border-slate-200 p-6 sm:p-10 shadow-lg">
          {submissionSuccess ? (
            <div className="text-center py-12 space-y-6">
              <div className="h-16 w-16 bg-indigo-50 rounded-full flex items-center justify-center mx-auto text-indigo-950">
                <CheckCircle2 className="h-10 w-10 text-emerald-600" />
              </div>
              <div className="space-y-2">
                <h3 className="font-display font-extrabold text-2xl text-indigo-950">Inquiry Received Successfully!</h3>
                <p className="font-sans text-slate-500 text-xs max-w-md mx-auto leading-relaxed">
                  Thank you for your interest in Pinecrest Academy. Your inquiry has been registered in our database under reference code:
                </p>
                <div className="font-mono text-base font-black bg-slate-100 px-5 py-2.5 rounded-xl inline-block text-indigo-950 select-all border border-slate-200">
                  {submissionSuccess}
                </div>
              </div>
              
              <p className="font-sans text-slate-400 text-xs leading-normal max-w-sm mx-auto">
                Our Admissions Office will review your details and send a prospectus guide to your email within 24 hours. You can audit this submission at any time inside the <strong className="text-indigo-950 font-bold">Admissions Office Portal (Staff Portal)</strong>.
              </p>

              <div className="pt-4 flex gap-3 justify-center">
                <button
                  id="inquiry-submit-another"
                  onClick={() => setSubmissionSuccess(null)}
                  className="bg-slate-100 hover:bg-slate-200 text-slate-700 font-display text-[10px] font-bold uppercase tracking-wider px-5 py-2.5 rounded-full transition-colors cursor-pointer"
                >
                  Submit Another Inquiry
                </button>
                <button
                  id="inquiry-goto-estimator"
                  onClick={() => setActiveAdmissionsTab('estimator')}
                  className="bg-indigo-950 hover:bg-indigo-900 text-white font-display text-[10px] font-bold uppercase tracking-wider px-5 py-2.5 rounded-full shadow transition-colors cursor-pointer"
                >
                  Tuition Estimator
                </button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleFormSubmit} className="space-y-6">
              <div className="border-b border-slate-200 pb-4">
                <h3 className="font-display font-bold text-lg text-indigo-950">Admissions Inquiry Intake</h3>
                <p className="font-sans text-slate-400 text-xs">All fields marked with an asterisk (*) are strictly required.</p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                {/* Parent Name */}
                <div className="space-y-1.5">
                  <label className="font-sans text-xs font-bold text-slate-600 block">Parent / Guardian Full Name *</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Eleanor Vance"
                    value={formData.parentName}
                    onChange={(e) => setFormData({ ...formData, parentName: e.target.value })}
                    className="w-full bg-white border border-slate-200 rounded-lg px-3 py-2 text-xs focus:ring-1 focus:ring-indigo-800 focus:outline-none"
                  />
                </div>

                {/* Student Name */}
                <div className="space-y-1.5">
                  <label className="font-sans text-xs font-bold text-slate-600 block">Prospective Student Full Name *</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Noah Vance"
                    value={formData.studentName}
                    onChange={(e) => setFormData({ ...formData, studentName: e.target.value })}
                    className="w-full bg-white border border-slate-200 rounded-lg px-3 py-2 text-xs focus:ring-1 focus:ring-indigo-800 focus:outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                {/* Email Address */}
                <div className="space-y-1.5">
                  <label className="font-sans text-xs font-bold text-slate-600 block">Email Address *</label>
                  <input
                    type="email"
                    required
                    placeholder="e.g. eleanor@example.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full bg-white border border-slate-200 rounded-lg px-3 py-2 text-xs focus:ring-1 focus:ring-indigo-800 focus:outline-none"
                  />
                </div>

                {/* Phone Number */}
                <div className="space-y-1.5">
                  <label className="font-sans text-xs font-bold text-slate-600 block">Phone Number</label>
                  <input
                    type="tel"
                    placeholder="e.g. +1 (555) 304-8840"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full bg-white border border-slate-200 rounded-lg px-3 py-2 text-xs focus:ring-1 focus:ring-indigo-800 focus:outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                {/* Entry Grade level */}
                <div className="space-y-1.5">
                  <label className="font-sans text-xs font-bold text-slate-600 block">Grade Level of Interest *</label>
                  <select
                    value={formData.gradeLevel}
                    onChange={(e) => setFormData({ ...formData, gradeLevel: e.target.value })}
                    className="w-full bg-white border border-slate-200 rounded-lg px-3 py-2 text-xs focus:ring-1 focus:ring-indigo-800 focus:outline-none"
                  >
                    <option value="Pre-Kindergarten (Lower School)">Pre-Kindergarten (Lower School)</option>
                    <option value="Kindergarten (Lower School)">Kindergarten (Lower School)</option>
                    <option value="Grade 1 to 5 (Lower School)">Grade 1 to 5 (Lower School)</option>
                    <option value="Grade 6 to 8 (Middle School)">Grade 6 to 8 (Middle School)</option>
                    <option value="Grade 9 (Upper School)">Grade 9 (Upper School)</option>
                    <option value="Grade 10 to 12 (Upper School)">Grade 10 to 12 (Upper School)</option>
                  </select>
                </div>

                {/* Academic Year */}
                <div className="space-y-1.5">
                  <label className="font-sans text-xs font-bold text-slate-600 block">Target Year of Entry *</label>
                  <select
                    value={formData.academicYear}
                    onChange={(e) => setFormData({ ...formData, academicYear: e.target.value })}
                    className="w-full bg-white border border-slate-200 rounded-lg px-3 py-2 text-xs focus:ring-1 focus:ring-indigo-800 focus:outline-none"
                  >
                    <option value="2026-2027">2026-2027 Academic Year</option>
                    <option value="2027-2028">2027-2028 Academic Year</option>
                    <option value="2028-2029">2028-2029 Academic Year</option>
                  </select>
                </div>
              </div>

              {/* Interests Multi-Checkbox */}
              <div className="space-y-2.5">
                <label className="font-sans text-xs font-bold text-slate-600 block">Co-Curricular Interest Areas</label>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                  {interestOptions.map((opt) => {
                    const isChecked = formData.interests.includes(opt);
                    return (
                      <button
                        type="button"
                        key={opt}
                        id={`interest-opt-${opt.replace(/\s+/g, '-').toLowerCase()}`}
                        onClick={() => handleInterestToggle(opt)}
                        className={`p-2.5 border rounded-xl text-left text-xs font-medium transition-all cursor-pointer ${
                          isChecked
                            ? 'bg-indigo-50 text-indigo-950 border-indigo-950 font-bold shadow-sm'
                            : 'bg-white text-slate-600 border-slate-200 hover:bg-slate-50'
                        }`}
                      >
                        {opt}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Special Questions / Notes */}
              <div className="space-y-1.5">
                <label className="font-sans text-xs font-bold text-slate-600 block">Questions & Additional Notes</label>
                <textarea
                  rows={4}
                  placeholder="Specify particular academic needs, sports records, artistic histories, or general questions here..."
                  value={formData.notes}
                  onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                  className="w-full bg-white border border-slate-200 rounded-lg px-3 py-2 text-xs focus:ring-1 focus:ring-indigo-800 focus:outline-none"
                ></textarea>
              </div>

              {/* Submission Button */}
              <div className="pt-2">
                <button
                  type="submit"
                  id="inquiry-form-submit-btn"
                  disabled={submitting}
                  className="w-full bg-indigo-950 hover:bg-indigo-900 text-white font-display font-bold text-xs uppercase tracking-wider py-4 rounded-full shadow-md transition-all flex items-center justify-center space-x-2 disabled:opacity-75 cursor-pointer"
                >
                  {submitting ? (
                    <>
                      <Send className="h-4 w-4 animate-bounce" />
                      <span>Transmitting Inquiry...</span>
                    </>
                  ) : (
                    <>
                      <Send className="h-4 w-4" />
                      <span>Submit Secure Online Inquiry</span>
                    </>
                  )}
                </button>
              </div>
            </form>
          )}
        </div>
      )}
    </div>
  );
}
