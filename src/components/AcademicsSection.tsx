import React, { useState, useEffect } from 'react';
import { ACADEMIC_PROGRAMS } from '../data';
import { AcademicProgram } from '../types';
import { GraduationCap, Award, BookOpen, Calculator, Plus, Trash2, RotateCcw } from 'lucide-react';

interface GPACourse {
  id: string;
  name: string;
  grade: string;
  credits: number;
  level: 'Standard' | 'Honors' | 'AP';
}

const GRADE_VALUES: Record<string, number> = {
  'A+': 4.0, 'A': 4.0, 'A-': 3.7,
  'B+': 3.3, 'B': 3.0, 'B-': 2.7,
  'C+': 2.3, 'C': 2.0, 'C-': 1.7,
  'D': 1.0, 'F': 0.0
};

export default function AcademicsSection() {
  const [activeTab, setActiveTab] = useState<'programs' | 'calculator'>('programs');
  const [selectedLevel, setSelectedLevel] = useState<'All' | 'Lower School' | 'Middle School' | 'Upper School'>('All');
  
  // GPA Calculator State
  const [courses, setCourses] = useState<GPACourse[]>([
    { id: '1', name: 'AP English Literature', grade: 'A', credits: 4, level: 'AP' },
    { id: '2', name: 'Honors Pre-Calculus', grade: 'B+', credits: 4, level: 'Honors' },
    { id: '3', name: 'AP Physics C', grade: 'A-', credits: 5, level: 'AP' },
    { id: '4', name: 'US History Seminar', grade: 'A', credits: 3, level: 'Standard' }
  ]);
  const [calculatedGPA, setCalculatedGPA] = useState({ unweighted: 4.0, weighted: 4.0 });

  // Filter academic programs
  const filteredPrograms = ACADEMIC_PROGRAMS.filter(prog => selectedLevel === 'All' || prog.level === selectedLevel);

  // Recalculate GPA on courses change
  useEffect(() => {
    let totalCredits = 0;
    let totalUnweightedPoints = 0;
    let totalWeightedPoints = 0;

    courses.forEach(c => {
      const gradeVal = GRADE_VALUES[c.grade] || 0;
      let levelWeight = 0;
      if (c.level === 'Honors') levelWeight = 0.5;
      else if (c.level === 'AP') levelWeight = 1.0;

      totalCredits += c.credits;
      totalUnweightedPoints += gradeVal * c.credits;
      totalWeightedPoints += (gradeVal + levelWeight) * c.credits;
    });

    if (totalCredits > 0) {
      setCalculatedGPA({
        unweighted: Math.round((totalUnweightedPoints / totalCredits) * 100) / 100,
        weighted: Math.round((totalWeightedPoints / totalCredits) * 100) / 100
      });
    } else {
      setCalculatedGPA({ unweighted: 0, weighted: 0 });
    }
  }, [courses]);

  const addCourseRow = () => {
    const newCourse: GPACourse = {
      id: Date.now().toString(),
      name: '',
      grade: 'A',
      credits: 3,
      level: 'Standard'
    };
    setCourses([...courses, newCourse]);
  };

  const removeCourseRow = (id: string) => {
    setCourses(courses.filter(c => c.id !== id));
  };

  const updateCourse = (id: string, field: keyof GPACourse, value: any) => {
    setCourses(courses.map(c => c.id === id ? { ...c, [field]: value } : c));
  };

  const resetCalculator = () => {
    setCourses([
      { id: '1', name: 'Chemistry Lab', grade: 'B', credits: 3, level: 'Standard' },
      { id: '2', name: 'Creative Writing', grade: 'A', credits: 3, level: 'Standard' }
    ]);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-12">
      {/* Title block */}
      <div className="text-center max-w-2xl mx-auto space-y-4">
        <span className="font-mono text-xs font-bold uppercase tracking-[0.2em] text-amber-500">Educational Framework</span>
        <h1 className="font-display text-4xl font-extrabold text-indigo-950 tracking-tight">Academics at Pinecrest</h1>
        <p className="font-sans text-slate-500 leading-relaxed text-sm">
          Fostering deep inquiry, critical analytical abilities, and academic mastery at every level of our students developmental journey.
        </p>
        
        {/* Toggle between curriculum and GPA Utility */}
        <div className="flex justify-center pt-2">
          <div className="bg-slate-150 p-1.5 rounded-2xl inline-flex shadow-inner border border-slate-200">
            <button
              id="tab-btn-programs"
              onClick={() => setActiveTab('programs')}
              className={`flex items-center space-x-2 px-5 py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider transition-all cursor-pointer ${
                activeTab === 'programs'
                  ? 'bg-indigo-950 text-white shadow-md'
                  : 'text-slate-600 hover:text-indigo-950'
              }`}
            >
              <GraduationCap className="h-4 w-4" />
              <span>Academic Programs</span>
            </button>
            <button
              id="tab-btn-calculator"
              onClick={() => setActiveTab('calculator')}
              className={`flex items-center space-x-2 px-5 py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider transition-all cursor-pointer ${
                activeTab === 'calculator'
                  ? 'bg-indigo-950 text-white shadow-md'
                  : 'text-slate-600 hover:text-indigo-950'
              }`}
            >
              <Calculator className="h-4 w-4" />
              <span>AP/Honors GPA Estimator</span>
            </button>
          </div>
        </div>
      </div>

      {activeTab === 'programs' ? (
        <div className="space-y-8">
          {/* Level Filter */}
          <div className="flex justify-center space-x-2 border-b border-slate-200 pb-4">
            {['All', 'Lower School', 'Middle School', 'Upper School'].map((level) => (
              <button
                key={level}
                onClick={() => setSelectedLevel(level as any)}
                className={`px-4 py-2 rounded-full text-xs font-bold uppercase tracking-wider border transition-all cursor-pointer ${
                  selectedLevel === level
                    ? 'bg-indigo-950 text-white border-indigo-950 shadow-sm'
                    : 'bg-white text-slate-500 border-slate-200 hover:bg-slate-50'
                }`}
              >
                {level}
              </button>
            ))}
          </div>

          {/* Programs Stack */}
          <div className="space-y-8">
            {filteredPrograms.map((prog) => (
              <div 
                key={prog.id}
                className="bg-white rounded-[2rem] p-6 sm:p-10 border border-slate-200 shadow-sm hover:shadow-md transition-all grid grid-cols-1 lg:grid-cols-12 gap-8"
              >
                <div className="lg:col-span-4 space-y-4">
                  <span className="font-mono text-[9px] font-black uppercase tracking-widest text-amber-600 bg-amber-400/15 px-3 py-1 rounded-lg">
                    {prog.level}
                  </span>
                  <h3 className="font-display text-2xl font-bold text-indigo-950 leading-tight">
                    {prog.title}
                  </h3>
                  <p className="font-sans text-slate-500 text-xs leading-relaxed">
                    {prog.description}
                  </p>
                  
                  <div className="pt-4 border-t border-slate-100 flex items-center space-x-3">
                    <div className="h-10 w-10 bg-indigo-50 rounded-full flex items-center justify-center text-indigo-950">
                      <BookOpen className="h-5 w-5" />
                    </div>
                    <div>
                      <span className="text-slate-400 block font-mono text-[9px] uppercase font-bold">Academic Leader</span>
                      <span className="font-sans text-slate-800 text-xs font-semibold block">{prog.headOfDept}</span>
                    </div>
                  </div>
                </div>

                {/* Curriculum Grid */}
                <div className="lg:col-span-4 bg-slate-50/50 rounded-2xl p-6 border border-slate-200/60 space-y-4">
                  <h4 className="font-display text-xs font-bold uppercase tracking-wider text-indigo-950 flex items-center space-x-2">
                    <span className="h-1.5 w-1.5 bg-amber-400 rounded-full"></span>
                    <span>Sample Core Curriculum</span>
                  </h4>
                  <ul className="space-y-2.5">
                    {prog.curriculum.map((item, idx) => (
                      <li key={idx} className="font-sans text-slate-600 text-xs leading-relaxed flex items-start space-x-2">
                        <span className="text-amber-500 font-bold">•</span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Highlights Grid */}
                <div className="lg:col-span-4 bg-indigo-950 text-slate-200 rounded-2xl p-6 border border-indigo-900/60 space-y-4 relative overflow-hidden">
                  <div className="absolute -right-16 -bottom-16 w-36 h-36 bg-indigo-900/40 rounded-full blur-2xl"></div>
                  <h4 className="font-display text-xs font-bold uppercase tracking-wider text-amber-300 flex items-center space-x-2 relative z-10">
                    <Award className="h-4 w-4" />
                    <span>Division Highlights</span>
                  </h4>
                  <ul className="space-y-3 relative z-10">
                    {prog.highlights.map((highlight, idx) => (
                      <li key={idx} className="font-sans text-slate-300 text-xs leading-relaxed flex items-start space-x-2.5">
                        <span className="text-amber-400 font-semibold">✓</span>
                        <span>{highlight}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </div>
      ) : (
        /* Interactive GPA & Grade Calculator */
        <div className="bg-white rounded-[2rem] border border-slate-200 p-6 sm:p-10 shadow-lg grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Main Rows Panel */}
          <div className="lg:col-span-8 space-y-6">
            <div className="flex justify-between items-center border-b border-slate-100 pb-3">
              <h3 className="font-display font-bold text-lg text-indigo-950">Add Courses & Letter Grades</h3>
              <button
                id="gpa-reset-btn"
                onClick={resetCalculator}
                className="flex items-center space-x-1.5 text-xs font-mono font-bold text-slate-400 hover:text-indigo-950 cursor-pointer"
              >
                <RotateCcw className="h-3.5 w-3.5" />
                <span>Reset Demo</span>
              </button>
            </div>

            {/* Headers row */}
            <div className="hidden sm:grid grid-cols-12 gap-4 text-[10px] font-mono font-bold text-slate-400 uppercase tracking-wider px-2">
              <div className="col-span-5">Course Title / Name</div>
              <div className="col-span-2 text-center">Grade</div>
              <div className="col-span-2 text-center">Credits</div>
              <div className="col-span-2 text-center">Type</div>
              <div className="col-span-1"></div>
            </div>

            {/* Core Course List */}
            <div className="space-y-3">
              {courses.map((course) => (
                <div 
                  key={course.id} 
                  className="grid grid-cols-1 sm:grid-cols-12 gap-3 sm:gap-4 items-center bg-slate-50/50 p-3.5 sm:p-2 rounded-xl border border-slate-200/50"
                >
                  {/* Course Title */}
                  <div className="col-span-5">
                    <input
                      type="text"
                      placeholder="e.g. AP Language, Biology, Art..."
                      value={course.name}
                      onChange={(e) => updateCourse(course.id, 'name', e.target.value)}
                      className="w-full bg-white border border-slate-200 rounded-lg px-3 py-2 text-xs font-semibold focus:outline-none focus:ring-1 focus:ring-indigo-800"
                    />
                  </div>

                  {/* Letter Grade */}
                  <div className="col-span-2 text-center">
                    <select
                      value={course.grade}
                      onChange={(e) => updateCourse(course.id, 'grade', e.target.value)}
                      className="w-full bg-white border border-slate-200 rounded-lg px-2 py-2 text-xs text-center font-bold text-slate-700 focus:outline-none focus:ring-1 focus:ring-indigo-800"
                    >
                      {Object.keys(GRADE_VALUES).map(g => (
                        <option key={g} value={g}>{g}</option>
                      ))}
                    </select>
                  </div>

                  {/* Credits */}
                  <div className="col-span-2 text-center">
                    <select
                      value={course.credits}
                      onChange={(e) => updateCourse(course.id, 'credits', parseInt(e.target.value))}
                      className="w-full bg-white border border-slate-200 rounded-lg px-2 py-2 text-xs text-center text-slate-700 focus:outline-none focus:ring-1 focus:ring-indigo-800"
                    >
                      {[1, 2, 3, 4, 5].map(cr => (
                        <option key={cr} value={cr}>{cr} credits</option>
                      ))}
                    </select>
                  </div>

                  {/* Course Type / Weight */}
                  <div className="col-span-2 text-center">
                    <select
                      value={course.level}
                      onChange={(e) => updateCourse(course.id, 'level', e.target.value)}
                      className="w-full bg-white border border-slate-200 rounded-lg px-2 py-2 text-xs text-center font-semibold text-slate-700 focus:outline-none focus:ring-1 focus:ring-indigo-800"
                    >
                      <option value="Standard">Standard</option>
                      <option value="Honors">Honors (+0.5)</option>
                      <option value="AP">AP (+1.0)</option>
                    </select>
                  </div>

                  {/* Delete Button */}
                  <div className="col-span-1 text-right flex sm:justify-center">
                    <button
                      id={`delete-course-${course.id}`}
                      onClick={() => removeCourseRow(course.id)}
                      className="text-slate-300 hover:text-red-600 p-2 rounded-lg hover:bg-slate-100 transition-colors cursor-pointer"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>

            <button
              id="add-course-row-btn"
              onClick={addCourseRow}
              className="flex items-center space-x-2 text-indigo-900 hover:text-indigo-950 text-xs font-bold uppercase tracking-wider pt-2 cursor-pointer"
            >
              <Plus className="h-4 w-4 stroke-[2.5]" />
              <span>Add Another Course</span>
            </button>
          </div>

          {/* Results Display Panel */}
          <div className="lg:col-span-4 bg-indigo-950 text-white rounded-[2rem] p-6 sm:p-8 flex flex-col justify-between border border-indigo-900 shadow-lg relative overflow-hidden">
            <div className="absolute -right-12 -bottom-12 w-32 h-32 bg-indigo-900 rounded-full blur-2xl opacity-40"></div>
            <div className="space-y-6 relative z-10">
              <div className="flex items-center space-x-2 text-amber-400 font-mono text-[10px] uppercase font-bold tracking-widest border-b border-indigo-900 pb-3">
                <Calculator className="h-4.5 w-4.5" />
                <span>Estimated Outputs</span>
              </div>
              
              <p className="font-sans text-slate-300 text-xs leading-relaxed">
                Unweighted GPAs use standard scales (A=4.0). Weighted GPAs grant bonus grade points for honors courses (+0.5) and AP college-level classes (+1.0) to represent course rigor accurately.
              </p>

              <div className="space-y-4 py-2">
                <div className="bg-indigo-900/40 border border-indigo-900 p-4 rounded-xl flex items-center justify-between">
                  <div>
                    <span className="text-slate-300 font-mono text-[9px] uppercase font-bold tracking-wider block">Unweighted GPA</span>
                    <span className="text-slate-400 text-[10px]">A average max = 4.00</span>
                  </div>
                  <span className="font-display text-3xl font-black text-white">{calculatedGPA.unweighted.toFixed(2)}</span>
                </div>

                <div className="bg-amber-400 text-indigo-950 p-4 rounded-xl flex items-center justify-between shadow-md border border-amber-400/20">
                  <div>
                    <span className="font-mono text-[9px] uppercase font-bold tracking-wider block text-indigo-950">Weighted GPA</span>
                    <span className="text-indigo-900/80 text-[10px]">Includes AP & Honors weights</span>
                  </div>
                  <span className="font-display text-3xl font-black">{calculatedGPA.weighted.toFixed(2)}</span>
                </div>
              </div>
            </div>

            <div className="border-t border-indigo-900 pt-5 mt-4 space-y-3 relative z-10">
              <span className="font-mono text-[9px] uppercase text-amber-400 font-bold tracking-wider block">Pinecrest AP Standards</span>
              <p className="font-sans text-slate-400 text-[11px] leading-relaxed">
                Calculations are modeled strictly on Oakridge-Pinecrest secondary grading criteria. Inquiries can be forwarded directly to our college counselors.
              </p>
            </div>

          </div>

        </div>
      )}
    </div>
  );
}
