import { NewsArticle, AcademicProgram, SchoolEvent, CampusLocation, ClubInfo } from './types';

export const PINE_CAMPUS_HERO = '/src/assets/images/pinecrest_campus_1782852382854.jpg';

export const ACADEMIC_PROGRAMS: AcademicProgram[] = [
  {
    id: 'lower-1',
    level: 'Lower School',
    title: 'Foundational Years (PreK - Grade 5)',
    description: 'An inquiry-based curriculum focusing on reading literacy, math foundations, scientific inquiry, and social development in a warm, nurturing environment.',
    curriculum: [
      'Singapore Math Framework',
      'Phonics-to-Reading Language Arts',
      'Hands-on Maker & STEM Labs',
      'Immersive Foreign Language (Spanish/Mandarin)',
      'Visual Arts & Music Appreciation'
    ],
    highlights: [
      'Orchard & Nature Play Outdoor Classroom',
      '1:8 Early Learning Student-Teacher Ratio',
      'Weekly Social-Emotional Learning (SEL) circles',
      'Annual Lower School Science & Invention Fair'
    ],
    headOfDept: 'Dr. Evelyn Carter, Ph.D.'
  },
  {
    id: 'middle-1',
    level: 'Middle School',
    title: 'Exploration & Growth (Grades 6 - 8)',
    description: 'Guiding students through critical transition years with a robust core curriculum, diverse electives, and advisory programs designed for self-discovery.',
    curriculum: [
      'Pre-Algebra, Algebra I, and Geometry paths',
      'Next Generation Science Standards (NGSS) Lab Science',
      'Integrated Humanities & Global Perspectives',
      'Digital Design & Introductory Python',
      'Creative Writing & Rhetoric'
    ],
    highlights: [
      'Comprehensive Student Advisory Program',
      'Annual 3-day Outdoor Leadership Retreat',
      'Exploratory Arts Rotations (Clay, Theater, Robotics)',
      'Intramural & Interscholastic Sports Leagues'
    ],
    headOfDept: 'Marcus Vance, M.Ed.'
  },
  {
    id: 'upper-1',
    level: 'Upper School',
    title: 'College Preparatory & Beyond (Grades 9 - 12)',
    description: 'A highly rigorous academic experience featuring 22 Advanced Placement (AP) courses, independent study projects, and intensive college counseling.',
    curriculum: [
      'Advanced Mathematics (Calculus BC, Multivariable, Stats)',
      'AP Sciences (Physics C, Chemistry, Biology, Environmental)',
      'Advanced Seminars in Lit, History, and Political Theory',
      'Artificial Intelligence & Advanced Software Engineering',
      'Fine & Performing Arts Mastery Tracks'
    ],
    highlights: [
      'Dedicated One-on-One College Counselling starting in Grade 9',
      'Senior Capstone Project & Community Internship',
      'State-of-the-Art Bio-Tech & Fabrication Labs',
      'Competitive Varsity Athletics & Elite Performing Arts'
    ],
    headOfDept: 'Sarah Sterling, M.A.'
  }
];

export const NEWS_ARTICLES: NewsArticle[] = [
  {
    id: 'news-1',
    title: 'Pinecrest Robotics Team Claims State Championship Title',
    category: 'STEM',
    summary: 'The "Gearheads" school robotics team out-designed and out-coded 45 other high schools to secure first place in the State VEX Robotics Finals.',
    content: 'After a grueling weekend of qualifying matches and alliance selections, our Upper School VEX Robotics team, the Gearheads (Team 4048A), came home with the State Championship trophy. The team—led by seniors Liam Chen and Sofia Rodriguez—dominated the skills challenge and designed a bespoke intake system that was the talk of the tournament. The championship win secures them a highly coveted spot in the World Finals in Dallas, Texas this coming May.',
    publishDate: 'June 24, 2026',
    imageUrl: 'https://images.unsplash.com/photo-1561557944-6e7860d1a7eb?auto=format&fit=crop&q=80&w=800',
    author: 'Coach David Miller'
  },
  {
    id: 'news-2',
    title: 'Groundbreaking Ceremony for the New Innovation & STEM Wing',
    category: 'Academic',
    summary: 'Pinecrest Academy breaks ground on a brand new 24,000 sq. ft. science and fabrication facility, scheduled to open in Fall 2027.',
    content: 'On Tuesday morning, the Pinecrest Board of Trustees, alongside student council representatives, officially broke ground on the much-anticipated Innovation and STEM Wing. Funded by the Generational Growth Campaign, the new facility will house advanced molecular biology labs, a cleanroom, an expanded woodworking/metalwork workshop, a VR development sandbox, and dynamic collaborative learning spaces. This facility represents our unwavering commitment to providing world-class infrastructure for future-ready students.',
    publishDate: 'June 18, 2026',
    imageUrl: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&q=80&w=800',
    author: 'Dr. Arthur Sterling, Trustee'
  },
  {
    id: 'news-3',
    title: 'Visual Arts Gala Showcases Over 200 Student Masterpieces',
    category: 'Arts',
    summary: 'The annual Pinecrest Fine Arts Exhibition brought together stunning oil paintings, ceramic sculptures, and digital media from PreK through 12th grade.',
    content: 'The Pinecrest Assembly Hall was transformed into a professional gallery space this week for the 22nd Annual Visual Arts Gala. This years theme, "Visions of Resilience," inspired a remarkably deep collection of works. From Lower School finger-painted self-portraits to Upper School AP portfolios addressing environmental conservation through charcoal and mixed media, visitors were astounded by the caliber of expression. Six of our seniors were awarded national scholastic art honors during the opening reception.',
    publishDate: 'June 10, 2026',
    imageUrl: 'https://images.unsplash.com/photo-1460661419201-fd4cecdf8a8b?auto=format&fit=crop&q=80&w=800',
    author: 'Ms. Clara Thorne, Fine Arts Dept'
  },
  {
    id: 'news-4',
    title: 'Pinecrest Varsity Soccer Celebrates Undefeated Regular Season',
    category: 'Athletics',
    summary: 'The Pinecrest Eagles clinch the Regional Division title with a 12-0-2 record, heading into the State Tournament as top-seed favorites.',
    content: 'With a thrilling 2-1 victory over Oakwood Prep on Friday night, the Pinecrest Varsity Soccer team sealed an undefeated regular season. Under the guidance of Coach Marcus Silva, the Eagles demonstrated exceptional defensive discipline, conceding only 4 goals across 14 matches. Lead striker junior Noah Peterson scored the game-winner in the 83rd minute. The Eagles now prepare to host the first round of the State Playoffs on our home turf next Wednesday.',
    publishDate: 'June 05, 2026',
    imageUrl: 'https://images.unsplash.com/photo-1508098682722-e99c43a406b2?auto=format&fit=crop&q=80&w=800',
    author: 'Coach Marcus Silva'
  }
];

export const SCHOOL_EVENTS: SchoolEvent[] = [
  {
    id: 'ev-1',
    title: 'Admissions Open House & Campus Tours',
    date: '2026-09-12',
    time: '09:00 AM - 12:00 PM',
    location: 'Main Assembly Hall & Campus-Wide',
    category: 'Admissions',
    description: 'Meet our academic leadership, explore our state-of-the-art facilities, and hear from current students about life at Pinecrest Academy. Tours leave every 15 minutes.',
    organizer: 'Admissions Office'
  },
  {
    id: 'ev-2',
    title: 'Upper School Fall Drama: "The Crucible"',
    date: '2026-10-15',
    time: '07:00 PM - 09:30 PM',
    location: 'Black Box Performing Arts Center',
    category: 'Arts',
    description: 'An evocative production of Arthur Millers masterpiece, performed and teched entirely by our Upper School drama and stagecraft students.',
    organizer: 'Theatre Department'
  },
  {
    id: 'ev-3',
    title: 'Parent-Teacher Consultations & Academic Review',
    date: '2026-10-22',
    time: '01:00 PM - 06:00 PM',
    location: 'Division classrooms & Online',
    category: 'Academic',
    description: 'An opportunity for structured discussions regarding student progress, goal setting, and learning portfolios with class teachers and advisors. Half-day for students.',
    organizer: 'Academic Administration'
  },
  {
    id: 'ev-4',
    title: 'Pinecrest Invitational Cross-Country Meet',
    date: '2026-09-26',
    time: '08:00 AM - 01:00 PM',
    location: 'Pinecrest Forestry Trails & Athletic Complex',
    category: 'Sports',
    description: 'Welcoming 12 regional high schools to our signature 5K forest trail course. Concession stands, pep band performance, and awards ceremony at noon.',
    organizer: 'Athletic Department'
  },
  {
    id: 'ev-5',
    title: 'Thanksgiving Break (School Closed)',
    date: '2026-11-25',
    time: 'All Day',
    location: 'Campus-wide',
    category: 'Holiday',
    description: 'School closed for Thanksgiving Holiday. Boarding dormitories remain open with limited recreational programs for international residents.',
    organizer: 'Operations Office'
  },
  {
    id: 'ev-6',
    title: 'Annual Winter Concert & Orchestra Gala',
    date: '2026-12-10',
    time: '06:30 PM - 08:30 PM',
    location: 'Symphony Hall',
    category: 'Arts',
    description: 'A festive celebration featuring the Lower School Choir, Middle School Concert Band, and the Upper School Honors Symphony Orchestra.',
    organizer: 'Music Academy'
  }
];

export const CAMPUS_LOCATIONS: CampusLocation[] = [
  {
    id: 'loc-1',
    name: 'Founders Hall',
    coordinates: { x: 25, y: 35 },
    description: 'The historic heart of Pinecrest Academy. Constructed in 1928, it houses the main administrative offices, history departments, the central clock tower, and classrooms for the Humanities.',
    builtYear: '1928 (Restored 2018)',
    features: ['Central Clock Tower', 'Principal Office', 'Board Room', 'Historical Archive Gallery'],
    imageUrl: 'https://images.unsplash.com/photo-1541339907198-e08756dedf3f?auto=format&fit=crop&q=80&w=600'
  },
  {
    id: 'loc-2',
    name: 'The Athena Science & STEM Center',
    coordinates: { x: 50, y: 25 },
    description: 'A cutting-edge facility bridging learning and creation. This modern glass and concrete structure houses university-grade biology, chemistry, and physics labs, as well as our design fabrication wing.',
    builtYear: '2021',
    features: ['VEX Robotics Sandbox', '3D Printing & CNC Lab', 'Microbiology Culture Station', 'Rooftop Meteorological Deck'],
    imageUrl: 'https://images.unsplash.com/photo-1562774053-f5a02f6dab66?auto=format&fit=crop&q=80&w=600'
  },
  {
    id: 'loc-3',
    name: 'Pinecrest Athletic Complex & Turf Fields',
    coordinates: { x: 75, y: 60 },
    description: 'Home of the Eagles. Features an olympic-sized swimming pool, indoor dual-court basketball gymnasium, fully-equipped physical therapy rooms, a 400m tartan track, and pristine all-weather turf soccer/football fields.',
    builtYear: '2015 (Turf upgraded 2024)',
    features: ['Heated 50-Meter Pool', 'Strength & Conditioning Suite', '1,200 Seat Grandstand', 'Forest Trail Trailheads'],
    imageUrl: 'https://images.unsplash.com/photo-1587280501635-68a0e82cd5ff?auto=format&fit=crop&q=80&w=600'
  },
  {
    id: 'loc-4',
    name: 'The Sterling Library & Learning Commons',
    coordinates: { x: 35, y: 70 },
    description: 'A serene space for individual study and group collaboration. Hosts over 45,000 physical volumes, a digital database research lab, 14 private group study rooms, and an organic cafe on the lower level.',
    builtYear: '2004 (Renovated 2023)',
    features: ['Private Group Study Pods', 'Digital Database Access Terminals', 'The Quill Coffee Shop', 'Acoustic Silent Reading Room'],
    imageUrl: 'https://images.unsplash.com/photo-1507842217343-583bb7270b66?auto=format&fit=crop&q=80&w=600'
  },
  {
    id: 'loc-5',
    name: 'Symphony Hall & Black Box Arts Center',
    coordinates: { x: 60, y: 80 },
    description: 'Where creativity takes center stage. Features a state-of-the-art 650-seat main auditorium designed for optimal acoustics, a flexible black-box theatre for student-led productions, and individual music practice suites.',
    builtYear: '2012',
    features: ['650-Seat Main Hall', 'Modular Black Box Theatre', 'Sound-proofed Recording Booths', 'Steinway Grand Piano Collection'],
    imageUrl: 'https://images.unsplash.com/photo-1503095396549-807759245b35?auto=format&fit=crop&q=80&w=600'
  }
];

export const SCHOOL_CLUBS: ClubInfo[] = [
  {
    id: 'club-1',
    name: 'VEX Robotics & AI Development',
    category: 'STEM',
    description: 'Designing, prototyping, and coding autonomous robots for regional, national, and international competitions.',
    meetingTime: 'Tuesdays & Thursdays, 4:00 PM - 6:00 PM',
    advisor: 'Dr. Raymond Pierce (STEM Dept)',
    achievements: ['State Champions 2026', 'National Design Award 2025']
  },
  {
    id: 'club-2',
    name: 'Model United Nations & Global Diplomacy',
    category: 'Leadership',
    description: 'Engaging in global affairs simulations, researching international policy, and attending interscholastic debate assemblies.',
    meetingTime: 'Wednesdays, 3:30 PM - 5:00 PM',
    advisor: 'Ms. Diane Vance (History Dept)',
    achievements: ['Best Small Delegation (Harvard MUN 2025)', 'Outstanding Delegate Gavel 2026']
  },
  {
    id: 'club-3',
    name: 'Elite Chamber Orchestra & Choir',
    category: 'Arts',
    description: 'An audition-only ensemble performing complex classical arrangements, romantic suites, and modern contemporary orchestrations.',
    meetingTime: 'Mondays & Fridays, 4:00 PM - 5:30 PM',
    advisor: 'Maestro Charles Thorne (Fine Arts Director)',
    achievements: ['Gold Medal (State Orchestral Assessment)', 'Carnegie Hall Invitation Soloists']
  },
  {
    id: 'club-4',
    name: 'Speech & Rhetorical Debate Team',
    category: 'Leadership',
    description: 'Honing public speaking, structured argumentation, and analytical evidence research under National Forensic League rules.',
    meetingTime: 'Mondays, 3:30 PM - 5:00 PM',
    advisor: 'Sarah Sterling (Upper School Head)',
    achievements: ['Top 10 State Finishers in Lincoln-Douglas Debate']
  },
  {
    id: 'club-5',
    name: 'Ecology & Sustainable Organic Gardening',
    category: 'STEM',
    description: 'Maintaining the campus Permaculture Orchard, monitoring school composting, and auditing the academy carbon footprint.',
    meetingTime: 'Saturdays, 10:00 AM - 12:00 PM',
    advisor: 'Dr. Evelyn Carter (Lower School Head)',
    achievements: ['Recognized as State Green Ribbon School 2025']
  }
];

export const TUITION_BASE_FEES: Record<string, { base: number; boardOption: number; meals: number; techActivity: number }> = {
  'Lower School': { base: 18500, boardOption: 0, meals: 1200, techActivity: 650 },
  'Middle School': { base: 22400, boardOption: 8500, meals: 1500, techActivity: 950 },
  'Upper School': { base: 28200, boardOption: 11000, meals: 1800, techActivity: 1250 }
};
