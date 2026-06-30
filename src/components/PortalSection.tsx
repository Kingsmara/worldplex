import React, { useState } from 'react';
import { User, BookOpen, Clock, BarChart2, CheckCircle2, Award, ArrowUpRight, Percent, ShieldCheck } from 'lucide-react';

export default function PortalSection() {
  // Simulator State
  const [currentGrade, setCurrentGrade] = useState<number>(87.5);
  const [targetGrade, setTargetGrade] = useState<number>(90.0);
  const [finalWeight, setFinalWeight] = useState<number>(20);
  const [simulatedResult, setSimulatedResult] = useState<number | null>(null);

  const calculateRequiredScore = (e: React.FormEvent) => {
    e.preventDefault();
    if (currentGrade <= 0 || targetGrade <= 0 || finalWeight <= 0 || finalWeight >= 100) {
      alert('Please enter valid, positive values. Weight must be between 1% and 99%.');
      return;
    }

    const currentWeight = 100 - finalWeight;
    const needed = (targetGrade - (currentGrade * (currentWeight / 100))) / (finalWeight / 100);
    setSimulatedResult(Math.round(needed * 100) / 100);
  };

  const todaySchedule = [
    { period: 'Period 1', time: '08:30 AM - 09:45 AM', subject: 'AP English Literature', room: 'Founders Hall Room 104', teacher: 'Dr. Evelyn Carter' },
    { period: 'Period 2', time: '09:55 AM - 11:10 AM', subject: 'AP Physics C', room: 'Athena STEM Lab 2B', teacher: 'Dr. Raymond Pierce' },
    { period: 'Period 3', time: '11:20 AM - 12:35 PM', subject: 'Precalculus Honors', room: 'Founders Hall Room 212', teacher: 'Sarah Sterling' },
    { period: 'Lunch', time: '12:35 PM - 01:25 PM', subject: 'Open Campus Dining', room: 'The Quill Cafe Commons', teacher: 'Nutrition Staff' },
    { period: 'Period 4', time: '01:30 PM - 02:45 PM', subject: 'AP Computer Science A', room: 'Athena STEM Lab 4', teacher: 'Marcus Vance' },
    { period: 'Athletics', time: '03:30 PM - 05:00 PM', subject: 'Varsity Soccer Practice', room: 'Athletic Field A', teacher: 'Coach Silva' }
  ];

  const gradesSummary = [
    { course: 'AP English Literature', grade: 'A', percent: 94.2, status: 'On Track' },
    { course: 'AP Physics C', grade: 'A-', percent: 91.8, status: 'On Track' },
    { course: 'Precalculus Honors', grade: 'B+', percent: 87.5, status: 'Improvement Goal' },
    { course: 'AP Computer Science A', grade: 'A', percent: 96.0, status: 'Exemplary' }
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10">
      
      {/* Welcome Bar - Styled as a huge Bento Card */}
      <div className="bg-indigo-950 text-white rounded-[2rem] p-6 sm:p-10 border border-indigo-900 shadow-xl flex flex-col md:flex-row justify-between items-start md:items-center gap-8 relative overflow-hidden bento-pattern-dark">
        <div className="flex items-center space-x-5 relative z-10">
          <div className="h-16 w-16 bg-amber-400 rounded-2xl flex items-center justify-center text-indigo-950 shadow-inner">
            <User className="h-9 w-9 stroke-[1.5]" />
          </div>
          <div className="space-y-1">
            <span className="font-mono text-[9px] uppercase font-bold text-amber-300 tracking-wider">Connected Session</span>
            <h1 className="font-display text-xl sm:text-2xl font-extrabold tracking-tight">Alexander Wright</h1>
            <p className="font-sans text-slate-300 text-xs">Grade 10 Student • Upper Division Academy</p>
          </div>
        </div>

        {/* Academic Standings stats */}
        <div className="flex flex-wrap gap-8 divide-x divide-indigo-900 pr-4 relative z-10">
          <div className="text-center pl-4">
            <span className="text-amber-400 block font-display text-3xl font-black">3.86</span>
            <span className="font-mono text-[9px] uppercase tracking-wider text-slate-300 block font-bold">Cumulative GPA</span>
          </div>
          <div className="text-center pl-8">
            <span className="text-amber-400 block font-display text-3xl font-black">96.4%</span>
            <span className="font-mono text-[9px] uppercase tracking-wider text-slate-300 block font-bold">Attendance</span>
          </div>
          <div className="text-center pl-8">
            <span className="text-amber-400 block font-display text-3xl font-black">26.5</span>
            <span className="font-mono text-[9px] uppercase tracking-wider text-slate-300 block font-bold">Community Hours</span>
          </div>
        </div>
      </div>

      {/* Main Grid split */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
        
        {/* Left: Class Schedule & Grades Overview */}
        <div className="lg:col-span-8 space-y-8">
          
          {/* Today's schedule */}
          <div className="bg-white rounded-[2rem] border border-slate-200 p-6 sm:p-10 shadow-sm space-y-6">
            <div className="flex items-center space-x-2 border-b border-slate-150 pb-3">
              <Clock className="h-4.5 w-4.5 text-indigo-950" />
              <h3 className="font-display font-bold text-lg text-indigo-950">Today&apos;s Class Schedule</h3>
            </div>

            <div className="divide-y divide-slate-100">
              {todaySchedule.map((sched, idx) => (
                <div key={idx} className="py-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 first:pt-0 last:pb-0">
                  <div className="flex items-start space-x-4">
                    <span className="bg-slate-100 text-slate-500 font-mono text-[9px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-lg w-18 text-center shrink-0">
                      {sched.period}
                    </span>
                    <div>
                      <span className="font-sans font-bold text-sm text-indigo-950 block">{sched.subject}</span>
                      <span className="font-sans text-slate-400 text-xs block">{sched.room} • {sched.teacher}</span>
                    </div>
                  </div>
                  <span className="font-mono text-xs font-semibold text-slate-500 bg-slate-50 px-3.5 py-1.5 rounded-full border border-slate-200 self-start sm:self-center">
                    {sched.time}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Current Academic grades grid */}
          <div className="bg-white rounded-[2rem] border border-slate-200 p-6 sm:p-10 shadow-sm space-y-6">
            <div className="flex items-center space-x-2 border-b border-slate-150 pb-3">
              <BarChart2 className="h-4.5 w-4.5 text-indigo-950" />
              <h3 className="font-display font-bold text-lg text-indigo-950">Current Grading Terms (Mid-Session)</h3>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {gradesSummary.map((item, idx) => {
                const isUnderGoal = item.percent < 90;
                return (
                  <div key={idx} className="bg-slate-50 rounded-2xl p-5 border border-slate-200 flex items-center justify-between">
                    <div className="space-y-1">
                      <span className="font-sans font-bold text-xs text-slate-800 block truncate max-w-[200px]">{item.course}</span>
                      <span className={`inline-block font-mono text-[9px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-md ${
                        isUnderGoal ? 'bg-amber-150 text-amber-800' : 'bg-emerald-50 text-emerald-800'
                      }`}>
                        {item.status}
                      </span>
                    </div>
                    <div className="text-right">
                      <span className="font-display font-black text-2xl block text-indigo-950 leading-none">{item.grade}</span>
                      <span className="font-mono text-[10px] text-slate-400">{item.percent}%</span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

        </div>

        {/* Right: Grade Calculator Simulator Utility */}
        <div className="lg:col-span-4 bg-slate-50 rounded-[2rem] p-6 sm:p-8 border border-slate-200 shadow-sm space-y-6">
          <div className="flex items-center space-x-2 border-b border-slate-200 pb-3">
            <Percent className="h-4.5 w-4.5 text-indigo-950" />
            <h3 className="font-display font-bold text-base text-indigo-950">Final Exam Simulator</h3>
          </div>

          <p className="font-sans text-slate-500 text-xs leading-relaxed">
            Need an A but sitting on a high B? Work out exactly what score you must score on your final exam to achieve your target term grade.
          </p>

          <form onSubmit={calculateRequiredScore} className="space-y-4 pt-2">
            {/* Current Grade */}
            <div className="space-y-1.5">
              <label className="font-sans text-xs font-bold text-slate-600 block">Current Class Grade (%)</label>
              <input
                type="number"
                step="0.1"
                min="0"
                max="120"
                required
                value={currentGrade}
                onChange={(e) => {
                  setCurrentGrade(parseFloat(e.target.value) || 0);
                  setSimulatedResult(null);
                }}
                className="w-full bg-white border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs focus:ring-1 focus:ring-indigo-850 focus:outline-none font-semibold text-slate-800"
              />
            </div>

            {/* Target Grade */}
            <div className="space-y-1.5">
              <label className="font-sans text-xs font-bold text-slate-600 block">Desired Target Grade (%)</label>
              <input
                type="number"
                step="0.1"
                min="0"
                max="120"
                required
                value={targetGrade}
                onChange={(e) => {
                  setTargetGrade(parseFloat(e.target.value) || 0);
                  setSimulatedResult(null);
                }}
                className="w-full bg-white border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs focus:ring-1 focus:ring-indigo-850 focus:outline-none font-semibold text-slate-800"
              />
            </div>

            {/* Final Exam Weight */}
            <div className="space-y-1.5">
              <label className="font-sans text-xs font-bold text-slate-600 block">Final Exam Weight (%)</label>
              <input
                type="number"
                step="1"
                min="1"
                max="99"
                required
                value={finalWeight}
                onChange={(e) => {
                  setFinalWeight(parseInt(e.target.value) || 0);
                  setSimulatedResult(null);
                }}
                className="w-full bg-white border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs focus:ring-1 focus:ring-indigo-850 focus:outline-none font-semibold text-slate-800"
              />
            </div>

            {/* Submit */}
            <button
              type="submit"
              id="grade-simulate-submit-btn"
              className="w-full bg-indigo-950 hover:bg-indigo-900 text-white py-3 rounded-full font-display font-bold text-xs uppercase tracking-wider shadow transition-all cursor-pointer"
            >
              Calculate Required Score
            </button>
          </form>

          {/* Result Output */}
          {simulatedResult !== null && (
            <div className="bg-white border border-slate-200 p-5 rounded-2xl space-y-3 shadow-inner">
              <span className="font-mono text-[9px] uppercase font-extrabold text-slate-400 tracking-wider block">Target Requirement</span>
              
              <div className="flex items-baseline justify-between">
                <span className="text-slate-700 font-sans text-xs">Required Exam Score:</span>
                <span className={`font-display text-3xl font-black ${
                  simulatedResult > 100 
                    ? 'text-red-600' 
                    : simulatedResult < 70 
                    ? 'text-emerald-600' 
                    : 'text-amber-500'
                }`}>
                  {simulatedResult}%
                </span>
              </div>

              {simulatedResult > 100 ? (
                <p className="font-sans text-red-600 text-[10px] leading-relaxed">
                  ⚠️ This requirement exceeds 100%. It is math-wise impossible to achieve this target score unless extra credit or grade curves are granted by the faculty.
                </p>
              ) : simulatedResult < 0 ? (
                <p className="font-sans text-emerald-600 text-[10px] leading-relaxed">
                  ✓ Done! Your current standing is so high that even with a 0% score on the final exam, you will comfortably hit your target grade.
                </p>
              ) : (
                <p className="font-sans text-slate-500 text-[10px] leading-relaxed">
                  To secure a term final score of <strong className="text-slate-800 font-bold">{targetGrade}%</strong>, you must score at least <strong className="text-indigo-950 font-bold">{simulatedResult}%</strong> on the final exam.
                </p>
              )}
            </div>
          )}

          <div className="bg-indigo-950 text-slate-300 p-4 rounded-2xl text-[11px] leading-relaxed border border-indigo-900 flex items-start space-x-2.5">
            <ShieldCheck className="h-4.5 w-4.5 text-amber-300 shrink-0 mt-0.5" />
            <span>Students can request official guidance from their advisors or use our homework centers for target tutoring before exam week.</span>
          </div>

        </div>

      </div>
    </div>
  );
}
