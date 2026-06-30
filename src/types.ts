export interface NewsArticle {
  id: string;
  title: string;
  category: 'Academic' | 'Athletics' | 'Arts' | 'Community' | 'STEM';
  summary: string;
  content: string;
  publishDate: string;
  imageUrl: string;
  author: string;
}

export interface AcademicProgram {
  id: string;
  level: 'Lower School' | 'Middle School' | 'Upper School';
  title: string;
  description: string;
  curriculum: string[];
  highlights: string[];
  headOfDept: string;
  gpaWeight?: number;
}

export interface SchoolEvent {
  id: string;
  title: string;
  date: string;
  time: string;
  location: string;
  category: 'Academic' | 'Sports' | 'Arts' | 'Admissions' | 'Holiday';
  description: string;
  organizer: string;
}

export interface InquirySubmission {
  id: string;
  studentName: string;
  parentName: string;
  email: string;
  phone: string;
  gradeLevel: string;
  academicYear: string;
  interests: string[];
  notes: string;
  submittedAt: string;
  status: 'Received' | 'Reviewing' | 'Interview Scheduled' | 'Offered' | 'Archived';
  staffNotes?: string;
}

export interface CampusLocation {
  id: string;
  name: string;
  coordinates: { x: number; y: number }; // Percentage values for placement on a styled relative grid/map
  description: string;
  builtYear: string;
  features: string[];
  imageUrl: string;
}

export interface ClubInfo {
  id: string;
  name: string;
  category: 'STEM' | 'Arts' | 'Leadership' | 'Athletics';
  description: string;
  meetingTime: string;
  advisor: string;
  achievements: string[];
}
