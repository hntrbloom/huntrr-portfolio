/**
 * PERSONALIZE THIS FILE FIRST.
 * Only set URLs you actually own. Empty strings hide unfinished links.
 * Review all project descriptions for accuracy before publishing.
 */
export const profile = {
  name: 'Hunter Bloom',
  firstName: 'Hunter',
  role: 'Aspiring computer engineer & software developer',
  headline: 'Turning curious ideas into',
  headlineHighlight: 'useful software.',
  introduction:
    'I’m interested in computer engineering and software development. I build practical tools, explore how software and hardware work together, and turn ideas into projects through coding and 3D printing.',
  location: 'Des Moines, Iowa',
  email: 'hebloom@icloud.com',
  github: 'https://github.com/hntrbloom',
  linkedin: 'https://www.linkedin.com/in/huntrr-bloom',
  resume: '/resume/Hunter_Bloom_Public_Resume.pdf',
  avatar: '/images/hunter-headshot.jpeg',
  mood: 'Inspired & a little caffeinated',
};

export const printing = {
  photo: '/images/bambu-lab-a1.jpg',
  paragraph: 'I got my first 3D printer in March 2026 and quickly became interested in creating my own designs. Since then, I’ve learned how to turn ideas into physical objects through 3D modeling, slicing, multicolor printing, testing, and troubleshooting. Each project gives me a chance to improve a design, solve technical problems, and learn more about how digital designs become real products.',
  skills: ['Bambu Lab A1', '3D Modeling', 'Rapid Prototyping', 'Troubleshooting'],
};

export const japanTrip = {
  title: 'Two Weeks in Japan',
  subtitle: 'A shared adventure at 18.',
  photo: '/images/japan-trip-with-friend.jpg',
  photoAlt: 'Two friends posing for a nighttime photo outdoors during their trip to Japan.',
  story: [
    'At 18, I spent two weeks exploring Japan with a friend. We visited Tokyo, Kamakura, Kanazawa, Takayama, Kyoto, Osaka, and Hakone—an experience that broadened my perspective and gave me memories I’ll always carry with me.',
  ],
};

export type Category = 'Software' | 'AI & Data' | 'Making';

export type ProjectPhoto = {
  src: string;
  alt: string;
  caption: string;
  width: number;
  height: number;
};

export type Project = {
  id: string;
  title: string;
  category: Category;
  yearLabel: string;
  subtitle: string;
  description: string;
  stack: string[];
  notes: string[];
  demoUrl?: string;
  codeUrl?: string;
  artifacts?: { label: string; url: string }[];
  screenshot?: string; // Public image path for the project screenshot.
  photos?: ProjectPhoto[];
};

export const projects: Project[] = [
  {
    id: 'nailsbyhuntrr-ai-dashboard',
    title: 'NailsByHuntrr AI Business Dashboard',
    category: 'AI & Data',
    yearLabel: 'Applied AI internship project · 2026',
    subtitle: 'Comparing AI development tools through a working business app',
    description:
      'A final applied AI project that compared Codex with Python and Streamlit against Google AI Studio with React and TypeScript. I used both approaches to turn scattered Etsy orders, inventory, color records, reviews, analytics, and 3D printer information into a deployed business dashboard.',
    stack: ['Python', 'Streamlit', 'React', 'TypeScript', 'Google AI Studio', 'Recharts'],
    notes: [
      'Built a Python and Streamlit prototype focused on data organization, tables, charts, and debugging.',
      'Developed the final app-style version with React, TypeScript, Vite, Tailwind CSS, and Google AI Studio.',
      'Created a 10-prompt benchmark and manually scored both tools for speed, design, debugging, data organization, mobile usability, and final fit.',
      'Connected business data for 107 color swatches, 26 nail listings, 20 sales records, 17 reviews, 32 orders, and $1,187 in recorded revenue.',
      'Included a read-only Bambu printer status workflow showing print progress, temperatures, connectivity, and AMS Lite spool state.',
      'Presented the findings in a full slide deck and a detailed research poster.',
    ],
    demoUrl: 'https://huntrr-dashboard-607549261991.us-east1.run.app/',
    screenshot: '/images/nailsbyhuntrr-ai-dashboard.png',
    artifacts: [
      { label: 'View presentation', url: '/documents/Bloom_Hunter_Slides.pdf' },
      { label: 'View project poster', url: '/documents/Bloom_Hunter_Posterboard.pdf' },
    ],
    photos: [
      {
        src: '/images/nailsbyhuntrr-ai-dashboard.png',
        alt: 'NailsByHuntrr Streamlit dashboard overview with shop statistics and a revenue trend chart.',
        caption: 'Python and Streamlit prototype — shop overview and revenue trend',
        width: 1861,
        height: 791,
      },
      {
        src: '/images/ames-internship-group.jpeg',
        alt: 'Five Applied AI and Data Science interns holding their completion certificates at Ames National Laboratory.',
        caption: 'Our Applied AI and Data Science internship group at Ames National Laboratory',
        width: 1536,
        height: 1152,
      },
    ],
  },
  {
    id: 'ai-data',
    title: 'AI & Data Science Work',
    category: 'AI & Data',
    yearLabel: 'Internship experience',
    subtitle: 'Experimenting with data and machine learning',
    description:
      'Applied learning and experimentation with data analysis, machine learning tools, and technical problem-solving during an AI and data science internship.',
    stack: ['Python', 'pandas', 'seaborn', 'KNIME', 'Kaggle'],
    notes: [
      'Cleaned, organized, and explored datasets with Python and pandas during the Applied AI and Data Science Program at Ames National Laboratory.',
      'Used seaborn for data visualization and built KNIME workflows for data processing and analysis.',
      'Worked with Kaggle datasets, practiced machine-learning concepts, and evaluated AI-generated outputs.',
    ],
  },
  {
    id: 'business-tools',
    title: 'Creative Business Toolkit',
    category: 'Software',
    yearLabel: 'Independent project',
    subtitle: 'Building small tools for real-world operations',
    description:
      'Order tracking, pricing, and workflow tools that support a small creative business selling custom products and 3D-printed designs.',
    stack: ['Python', 'Java', 'Google Sheets', 'Automation'],
    notes: [
      'Translate day-to-day business problems into software ideas.',
      'Experiment with tracking, simple interfaces, and automation.',
      'Add screenshots or an example of time saved once measured.',
    ],
  },
  {
    id: '3d-printing',
    title: '3D Design & Prototyping',
    category: 'Making',
    yearLabel: 'Hands-on engineering',
    subtitle: 'From digital models to physical objects',
    description:
      'Designing, preparing, printing, and refining physical models while learning about tolerances, materials, and iterative troubleshooting.',
    stack: ['FDM Printing', '3D Modeling', 'Prototyping', 'Testing'],
    notes: [
      'Iterate on shape, fit, printability, and surface quality.',
      'Combine design decisions with hardware troubleshooting.',
      'Show before-and-after print photos to demonstrate your process.',
    ],
  },
  {
    id: 'huntrr-workspace',
    title: 'huntrr-workspace',
    category: 'Software',
    yearLabel: 'Personal web app',
    subtitle: 'A personal dashboard for planning, habits, and creative projects',
    description:
      'An all-in-one workspace that brings together a daily agenda, calendar, daily logs, shopping lists, habit tracking, goals, notes, and creative project tools in a custom pink interface.',
    stack: ['React', 'TypeScript', 'Firebase', 'Tailwind CSS', 'Vite'],
    notes: [
      'Bring everyday planning tools together through a shared sidebar and dashboard.',
      'Organize daily schedules and upcoming events alongside monthly calendar views.',
      'Keep daily logs, shopping lists, habits, goals, and notes within one workspace.',
      'Include tools for client receipts, prints, 3D models, and a character wiki.',
      'Develop a custom interface with a pink polka-dot background, rounded panels, and responsive layouts.',
    ],
    codeUrl: 'https://github.com/hntrbloom/huntrr-workspace',
    screenshot: '/images/huntrr-workspace.png',
    photos: [
      {
        src: '/images/huntrr-workspace-japan-shrine-selfie.jpg',
        alt: 'A selfie in front of a traditional Japanese gate, with stone steps and trees in the background.',
        caption: 'At the shrine steps',
        width: 2880, height: 2160,
      },
      {
        src: '/images/huntrr-workspace-japan-instant-prints.jpg',
        alt: 'Two instant photo prints on a wooden table, showing a Japanese garden with a pond and a white castle.',
        caption: 'Garden and castle keepsakes',
        width: 2944, height: 2160,
      },
      {
        src: '/images/huntrr-workspace-japan-night-car.jpg',
        alt: 'A traveler standing beside a white sports car on a city street in Japan at night.',
        caption: 'City lights and a white sports car',
        width: 2267, height: 2160,
      },
    ],
  },
];

export const skillGroups = [
  { title: 'Programming Languages', skills: ['Python', 'Java', 'JavaScript', 'TypeScript'] },
  { title: 'Web Development', skills: ['React', 'Responsive Design', 'UI Testing', 'REST APIs'] },
  { title: 'Cloud & Databases', skills: ['Firebase', 'Firestore', 'Google Cloud', 'Google Drive Integration'] },
  { title: 'Development Tools', skills: ['Git', 'GitHub', 'Google AI Studio'] },
  { title: 'Data Science & AI', skills: ['pandas', 'seaborn', 'KNIME', 'Kaggle', 'Data Cleaning', 'Data Visualization', 'AI-Assisted Development', 'Workflow Automation', 'n8n'] },
  { title: 'Debugging & Testing', skills: ['Root-Cause Analysis', 'Error-Log Review', 'Cross-Device Testing', 'Data Persistence Testing', 'Authentication Troubleshooting', 'OAuth Authentication'] },
  { title: 'Other Technical Skills', skills: ['Excel', 'Microsoft Word', 'Google Sheets', 'HTML & CSS'] },
  { title: 'Professional Skills', skills: ['Leadership', 'Communication', 'Teamwork', 'Problem-Solving', 'Organization', 'Time Management', 'Adaptability', 'Small Business Management'] },
  { title: 'Engineering & making', skills: ['3D Printing', '3D Modeling', 'Prototyping', 'Troubleshooting'] },
];

export type ExperienceEntry = {
  organization: string;
  role: string;
  dates: string;
  description: string;
  responsibilities: string[];
  skills: string[];
};

export const experiences: ExperienceEntry[] = [
  {
    organization: 'Ames National Laboratory',
    role: 'Applied AI & Data Science Intern',
    dates: 'Summer 2026',
    description: 'Participated in the Applied AI and Data Science Program, gaining practical experience with data analysis, machine learning concepts, and AI technologies.',
    responsibilities: [
      'Used Python, pandas, and seaborn for data analysis and visualization.',
      'Cleaned, organized, and explored datasets.',
      'Built KNIME workflows for data processing and analysis.',
      'Worked with Kaggle datasets.',
      'Practiced machine-learning concepts and evaluated AI-generated outputs.',
      'Developed technical problem-solving skills.',
    ],
    skills: ['Python', 'pandas', 'seaborn', 'KNIME', 'Kaggle', 'Data Science', 'Applied AI'],
  },
  {
    organization: 'NailsByHuntrr',
    role: 'Small Business Owner / Creative Product Designer',
    dates: '2024 – Present',
    description: 'I operate a creative small business specializing in custom press-on nails, keychains, and 3D-printed products.',
    responsibilities: [
      'Design and create physical products, manage online product listings, and run business operations.',
      'Use spreadsheets and automation tools.',
    ],
    skills: ['Product Design', 'Small Business Management', 'Spreadsheets', 'Automation'],
  },
  {
    organization: "Jimmy John's",
    role: 'Person in Charge',
    dates: 'March 2024 – Present',
    description: 'Lead daily operations in a fast-paced environment while developing leadership, communication, and organizational skills.',
    responsibilities: [
      'Coordinate daily store operations and maintain efficient workflows.',
      'Train and support team members, building teamwork and clear communication.',
      'Resolve customer concerns through practical problem-solving.',
      'Manage responsibilities independently and demonstrate reliability and adaptability.',
    ],
    skills: ['Leadership', 'Communication', 'Teamwork', 'Responsibility', 'Problem-Solving', 'Organization', 'Adaptability'],
  },
];

export type EducationEntry = {
  status: string;
  heading: string;
  institution?: string;
  detail: string;
  body: string;
  coursework?: string[];
};

export const education: EducationEntry[] = [
  {
    status: 'Completed',
    heading: 'Associate of Applied Science',
    institution: 'Des Moines Area Community College',
    detail: 'Completed Summer 2026',
    body: 'I completed my Associate Degree in Applied Science, marking the first step in my academic journey toward computer engineering.',
    coursework: ['Python', 'Data Science', 'Statistics', 'Precalculus', 'Programming', 'AI Tools'],
  },
  {
    status: 'Planned · Spring 2027',
    heading: 'Calculus I',
    detail: 'Future coursework',
    body: 'I plan to complete Calculus I in Spring 2027 to meet transfer requirements.',
  },
  {
    status: 'Future goal',
    heading: "Bachelor's in Computer Engineering",
    institution: 'Iowa State University · Planned',
    detail: 'Planned transfer',
    body: "My goal is to transfer to Iowa State University and pursue a Bachelor's Degree in Computer Engineering.",
  },
];
