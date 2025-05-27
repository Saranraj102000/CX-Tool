import React, { useState, useEffect, useRef } from 'react';
import { 
  BarChart2, 
  Users, 
  Briefcase, 
  Search, 
  Plus, 
  Filter, 
  ChevronDown, 
  X, 
  AlertCircle, 
  ChevronLeft, 
  ChevronRight,
  Calendar,
  Download,
  Upload,
  MoreHorizontal,
  Edit,
  Trash2,
  Eye,
  Clock,
  ArrowUpRight,
  Check,
  FileText,
  RefreshCw,
  Settings,
  GraduationCap,
  MapPin,
  UserCheck,
  Bell,
  Bookmark,
  CheckCircle,
  AlertTriangle,
  ExternalLink,
  Menu,
  Grid,
  List,
  FileBarChart2,
  User,
  LogOut,
  Home,
  Sliders,
  HelpCircle
} from 'lucide-react';
import * as XLSX from 'xlsx';

const RedeploymentPage = ({ setCurrentPage }) => {
  // Animation for elements on page load
  const [isLoaded, setIsLoaded] = useState(false);
  const [activeTab, setActiveTab] = useState('talent-bench');
  const [showForm, setShowForm] = useState(false);
  const [formType, setFormType] = useState('');
  const [currentPage, setCurrentPaginationPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState('');
  const [showFilters, setShowFilters] = useState(false);
  const [selectedCandidateDetails, setSelectedCandidateDetails] = useState(null);
  const [showNotifications, setShowNotifications] = useState(false);
  const [showProfileDropdown, setShowProfileDropdown] = useState(false);
  const [showSidebar, setShowSidebar] = useState(true);
  const [selectedStatus, setSelectedStatus] = useState('All');
  const [selectedExperience, setSelectedExperience] = useState('All');
  const [selectedLocation, setSelectedLocation] = useState('All');
  const [viewMode, setViewMode] = useState('table');
  
  // Pen Status state
  const [penStatusData, setPenStatusData] = useState([]);
  const [filteredPenStatusData, setFilteredPenStatusData] = useState([]);
  const [selectedMonth, setSelectedMonth] = useState('All');
  const [selectedProjectStatus, setSelectedProjectStatus] = useState('All');
  const [selectedBenchStatus, setSelectedBenchStatus] = useState('All');
  const fileInputRef = useRef(null);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadSuccess, setUploadSuccess] = useState(false);
  const [uploadError, setUploadError] = useState(null);

  // Closure & Starts state
  const [closureStartsData, setClosureStartsData] = useState([]);
  const [filteredClosureStartsData, setFilteredClosureStartsData] = useState([]);
  const [selectedSector, setSelectedSector] = useState('All');
  const closureFileInputRef = useRef(null);
  const [isClosureUploading, setIsClosureUploading] = useState(false);
  const [closureUploadSuccess, setClosureUploadSuccess] = useState(false);
  const [closureUploadError, setClosureUploadError] = useState(null);
  
  useEffect(() => {
    setTimeout(() => {
      setIsLoaded(true);
    }, 100);
    
    // Add Montserrat font
    const link = document.createElement('link');
    link.href = 'https://fonts.googleapis.com/css2?family=Montserrat:wght@300;400;500;600;700;800&display=swap';
    link.rel = 'stylesheet';
    document.head.appendChild(link);
    
    // Apply Montserrat to all elements
    document.body.style.fontFamily = "'Montserrat', sans-serif";
    
    return () => {
      if (document.head.contains(link)) {
        document.head.removeChild(link);
      }
    };
  }, []);
  
  // Sample data for demonstration
  const talentBenchData = [
    {
      id: 1,
      profileQuality: 'High',
      candidateName: 'John Smith',
      roles: 'Full Stack Developer',
      addedBy: 'Jane Doe',
      crs: 'CRS123',
      contactNo: '555-1234',
      emailId: 'john.smith@example.com',
      benchAddedDate: '2025-05-01',
      experience: '7 years',
      city: 'Atlanta',
      state: 'GA',
      primarySkills: 'React, Node.js',
      secondarySkills: 'MongoDB, AWS',
      benchStatus: 'Active',
      avatar: "JS",
      engagementLevel: 'High',
      lastContact: '3 days ago',
      upcomingEvent: 'Interview on May 25',
      matchScore: 92,
      lastUpdated: '2 hours ago',
      previousCompany: 'TechCorp',
      relocation: 'Yes',
      expectedSalary: '$120,000',
      availability: 'Immediate',
      workAuthorization: 'US Citizen',
      overdueStatus: 'On Track'
    },
    {
      id: 2,
      profileQuality: 'Medium',
      candidateName: 'Sarah Johnson',
      roles: 'UX Designer',
      addedBy: 'Mike Williams',
      crs: 'CRS456',
      contactNo: '555-5678',
      emailId: 'sarah.j@example.com',
      benchAddedDate: '2025-05-10',
      experience: '5 years',
      city: 'Chicago',
      state: 'IL',
      primarySkills: 'Figma, UI Design',
      secondarySkills: 'Adobe XD, Sketch',
      benchStatus: 'Active',
      avatar: "SJ",
      engagementLevel: 'Medium',
      lastContact: '1 week ago',
      upcomingEvent: 'Follow-up call on May 28',
      matchScore: 85,
      lastUpdated: '1 day ago',
      previousCompany: 'DesignHub',
      relocation: 'No',
      expectedSalary: '$95,000',
      availability: '2 weeks',
      workAuthorization: 'Green Card',
      overdueStatus: 'Due Soon'
    },
    {
      id: 3,
      profileQuality: 'High',
      candidateName: 'Robert Chen',
      roles: 'DevOps Engineer',
      addedBy: 'Lisa Brown',
      crs: 'CRS789',
      contactNo: '555-9012',
      emailId: 'robert.c@example.com',
      benchAddedDate: '2025-05-15',
      experience: '8 years',
      city: 'Seattle',
      state: 'WA',
      primarySkills: 'Docker, Kubernetes',
      secondarySkills: 'AWS, CI/CD',
      benchStatus: 'Inactive',
      avatar: "RC",
      engagementLevel: 'Low',
      lastContact: '2 weeks ago',
      upcomingEvent: 'None',
      matchScore: 78,
      lastUpdated: '3 days ago',
      previousCompany: 'CloudSys',
      relocation: 'Yes',
      expectedSalary: '$135,000',
      availability: '1 month',
      workAuthorization: 'H1B',
      overdueStatus: 'Overdue'
    },
    {
      id: 4,
      profileQuality: 'High',
      candidateName: 'Emily Rodriguez',
      roles: 'Data Scientist',
      addedBy: 'David Kim',
      crs: 'CRS234',
      contactNo: '555-3456',
      emailId: 'emily.r@example.com',
      benchAddedDate: '2025-05-08',
      experience: '6 years',
      city: 'Boston',
      state: 'MA',
      primarySkills: 'Python, TensorFlow',
      secondarySkills: 'SQL, Data Visualization',
      benchStatus: 'Active',
      avatar: "ER",
      engagementLevel: 'High',
      lastContact: '1 day ago',
      upcomingEvent: 'Technical assessment on May 24',
      matchScore: 95,
      lastUpdated: '12 hours ago',
      previousCompany: 'DataCorp',
      relocation: 'Yes',
      expectedSalary: '$140,000',
      availability: 'Immediate',
      workAuthorization: 'US Citizen',
      overdueStatus: 'On Track'
    },
    {
      id: 5,
      profileQuality: 'Medium',
      candidateName: 'Michael Thompson',
      roles: 'Project Manager',
      addedBy: 'Jennifer White',
      crs: 'CRS567',
      contactNo: '555-6789',
      emailId: 'michael.t@example.com',
      benchAddedDate: '2025-05-12',
      experience: '9 years',
      city: 'Denver',
      state: 'CO',
      primarySkills: 'Agile, Scrum',
      secondarySkills: 'JIRA, Confluence',
      benchStatus: 'Active',
      avatar: "MT",
      engagementLevel: 'Medium',
      lastContact: '4 days ago',
      upcomingEvent: 'Client interview on May 26',
      matchScore: 88,
      lastUpdated: '2 days ago',
      previousCompany: 'ProjectX',
      relocation: 'No',
      expectedSalary: '$115,000',
      availability: '2 weeks',
      workAuthorization: 'Green Card',
      overdueStatus: 'Critical'
    }
  ];

  const submissionsData = [
    {
      id: 1,
      quarter: 'Q2',
      year: '2025',
      month: 'May',
      week: 'Week 3',
      weekNo: '21',
      dateAdded: '2025-05-18',
      consultant: 'David Lee',
      role: 'Data Scientist',
      client: 'TechCorp',
      endClient: 'FinanceOne',
      candidateRate: '$75/hr',
      submissionStatus: 'Pending',
      priority: 'High',
      progress: 40,
      lastActivity: 'Resume submitted',
      nextStep: 'Client review',
      timeline: [{
        date: '2025-05-18',
        action: 'Submitted resume'
      }, {
        date: '2025-05-21',
        action: 'Client reviewing'
      }]
    },
    {
      id: 2,
      quarter: 'Q2',
      year: '2025',
      month: 'May',
      week: 'Week 3',
      weekNo: '21',
      dateAdded: '2025-05-19',
      consultant: 'Mary Adams',
      role: 'Project Manager',
      client: 'ConsultCo',
      endClient: 'HealthTech',
      candidateRate: '$85/hr',
      submissionStatus: 'Interview',
      priority: 'Medium',
      progress: 60,
      lastActivity: 'First interview completed',
      nextStep: 'Second interview',
      timeline: [{
        date: '2025-05-19',
        action: 'Submitted resume'
      }, {
        date: '2025-05-21',
        action: 'First interview scheduled'
      }, {
        date: '2025-05-22',
        action: 'First interview completed'
      }]
    },
    {
      id: 3,
      quarter: 'Q2',
      year: '2025',
      month: 'May',
      week: 'Week 3',
      weekNo: '21',
      dateAdded: '2025-05-20',
      consultant: 'Tom Wilson',
      role: 'Security Specialist',
      client: 'SecureSys',
      endClient: 'BankGlobal',
      candidateRate: '$90/hr',
      submissionStatus: 'Closed',
      priority: 'Low',
      progress: 100,
      lastActivity: 'Offer accepted',
      nextStep: 'Onboarding',
      timeline: [{
        date: '2025-05-20',
        action: 'Submitted resume'
      }, {
        date: '2025-05-21',
        action: 'Interview scheduled'
      }, {
        date: '2025-05-22',
        action: 'Interview completed'
      }, {
        date: '2025-05-23',
        action: 'Offer extended'
      }, {
        date: '2025-05-24',
        action: 'Offer accepted'
      }]
    }
  ];

  const notifications = [
    {
      id: 1,
      message: 'New client requirement for React developers',
      time: '1 hour ago',
      read: false,
      type: 'requirement'
    },
    {
      id: 2,
      message: 'Interview scheduled: John Smith with TechCorp',
      time: '3 hours ago',
      read: false,
      type: 'interview'
    },
    {
      id: 3,
      message: 'Sarah Johnson submitted updated resume',
      time: 'Yesterday',
      read: true,
      type: 'update'
    },
    {
      id: 4,
      message: 'Resource allocation meeting at 2 PM',
      time: 'Yesterday',
      read: true,
      type: 'meeting'
    }
  ];

  const handleOpenForm = (type) => {
    setFormType(type);
    setShowForm(true);
  };

  const handleCloseForm = () => {
    setShowForm(false);
    setFormType('');
  };

  const handleCandidateClick = (candidate) => {
    setSelectedCandidateDetails(candidate);
  };

  const closeDetails = () => {
    setSelectedCandidateDetails(null);
  };
  
  const handleEditCandidate = (candidate) => {
    // In a real application, you'd set the form data from the candidate object
    setFormType('talent');
    setShowForm(true);
    // Pre-fill form with candidate data
    console.log("Editing candidate:", candidate);
  };
  
  const handleEditSubmission = (submission) => {
    setFormType('submission');
    setShowForm(true);
    // Pre-fill form with submission data
    console.log("Editing submission:", submission);
  };

  // Pen Status Functions
  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    if (!file) return;
    
    setIsUploading(true);
    setUploadSuccess(false);
    setUploadError(null);
    
    const reader = new FileReader();
    
    reader.onload = (e) => {
      try {
        const data = new Uint8Array(e.target.result);
        const workbook = XLSX.read(data, { type: 'array', cellDates: true });
        
        const firstSheetName = workbook.SheetNames[0];
        const worksheet = workbook.Sheets[firstSheetName];
        
        const jsonData = XLSX.utils.sheet_to_json(worksheet, { defval: '' });
        
        // Validate the data has the required columns
        const requiredColumns = ['Month', 'Date Sent from CE Helpdesk Team', 'Consultant'];
        const hasAllColumns = requiredColumns.every(column => 
          jsonData.length > 0 && Object.keys(jsonData[0]).includes(column)
        );
        
        if (!hasAllColumns) {
          setUploadError('The uploaded Excel file is missing required columns');
          setIsUploading(false);
          return;
        }
        
        setPenStatusData(jsonData);
        setFilteredPenStatusData(jsonData);
        setUploadSuccess(true);
        
        // Reset file input
        if (fileInputRef.current) {
          fileInputRef.current.value = '';
        }
      } catch (error) {
        console.error('Error parsing Excel file:', error);
        setUploadError('Failed to parse the Excel file. Please ensure it is a valid Excel format.');
      } finally {
        setIsUploading(false);
      }
    };
    
    reader.onerror = () => {
      setUploadError('Error reading the file');
      setIsUploading(false);
    };
    
    reader.readAsArrayBuffer(file);
  };

  const triggerFileInput = () => {
    fileInputRef.current.click();
  };

  const getUniqueValues = (key) => {
    if (!penStatusData.length) return [];
    return [...new Set(penStatusData.map(item => item[key]).filter(Boolean))];
  };

  // Closure & Starts Functions
  const handleClosureFileUpload = (event) => {
    const file = event.target.files[0];
    if (!file) return;
    
    setIsClosureUploading(true);
    setClosureUploadSuccess(false);
    setClosureUploadError(null);
    
    const reader = new FileReader();
    
    reader.onload = (e) => {
      try {
        const data = new Uint8Array(e.target.result);
        const workbook = XLSX.read(data, { type: 'array', cellDates: true });
        
        const firstSheetName = workbook.SheetNames[0];
        const worksheet = workbook.Sheets[firstSheetName];
        
        const jsonData = XLSX.utils.sheet_to_json(worksheet, { defval: '' });
        
        // Validate the data has the required columns
        const requiredColumns = ['Sector', 'Year', 'Month', 'Start Date', 'End Date', 'Status'];
        const hasAllColumns = requiredColumns.every(column => 
          jsonData.length > 0 && Object.keys(jsonData[0]).includes(column)
        );
        
        if (!hasAllColumns) {
          setClosureUploadError('The uploaded Excel file is missing required columns');
          setIsClosureUploading(false);
          return;
        }
        
        setClosureStartsData(jsonData);
        setFilteredClosureStartsData(jsonData);
        setClosureUploadSuccess(true);
        
        // Reset file input
        if (closureFileInputRef.current) {
          closureFileInputRef.current.value = '';
        }
      } catch (error) {
        console.error('Error parsing Excel file:', error);
        setClosureUploadError('Failed to parse the Excel file. Please ensure it is a valid Excel format.');
      } finally {
        setIsClosureUploading(false);
      }
    };
    
    reader.onerror = () => {
      setClosureUploadError('Error reading the file');
      setIsClosureUploading(false);
    };
    
    reader.readAsArrayBuffer(file);
  };

  const triggerClosureFileInput = () => {
    closureFileInputRef.current.click();
  };

  const getUniqueClosureValues = (key) => {
    if (!closureStartsData.length) return [];
    return [...new Set(closureStartsData.map(item => item[key]).filter(Boolean))];
  };

  // Filter pen status data when search or filters change
  useEffect(() => {
    if (penStatusData.length === 0) return;
    
    let results = [...penStatusData];
    
    // Apply search filter
    if (searchTerm) {
      const lowercasedTerm = searchTerm.toLowerCase();
      results = results.filter(item => 
        (item.Consultant && item.Consultant.toLowerCase().includes(lowercasedTerm)) ||
        (item.JobTitle && item.JobTitle.toLowerCase().includes(lowercasedTerm)) ||
        (item['Primary Skill'] && item['Primary Skill'].toLowerCase().includes(lowercasedTerm)) ||
        (item.Client && item.Client.toLowerCase().includes(lowercasedTerm))
      );
    }
    
    // Apply month filter
    if (selectedMonth !== 'All') {
      results = results.filter(item => item.Month === selectedMonth);
    }
    
    // Apply status filter
    if (selectedProjectStatus !== 'All') {
      results = results.filter(item => item['Project Status'] === selectedProjectStatus);
    }
    
    // Apply bench status filter
    if (selectedBenchStatus !== 'All') {
      const benchFilter = selectedBenchStatus === 'Added to Bench';
      results = results.filter(item => 
        (benchFilter && (item['Added to Bench / Not Added'] === true || 
                        item['Added to Bench / Not Added'] === 'Yes' || 
                        item['Added to Bench / Not Added'] === 'true')) ||
        (!benchFilter && (item['Added to Bench / Not Added'] === false || 
                         item['Added to Bench / Not Added'] === 'No' || 
                         item['Added to Bench / Not Added'] === 'false' || 
                         !item['Added to Bench / Not Added']))
      );
    }
    
    setFilteredPenStatusData(results);
  }, [searchTerm, penStatusData, selectedMonth, selectedProjectStatus, selectedBenchStatus]);

  // Filter closure & starts data
  useEffect(() => {
    if (closureStartsData.length === 0) return;
    
    let results = [...closureStartsData];
    
    // Apply search filter
    if (searchTerm) {
      const lowercasedTerm = searchTerm.toLowerCase();
      results = results.filter(item => 
        (item['Candidate Name'] && item['Candidate Name'].toLowerCase().includes(lowercasedTerm)) ||
        (item['Job Title'] && item['Job Title'].toLowerCase().includes(lowercasedTerm)) ||
        (item['Client'] && item['Client'].toLowerCase().includes(lowercasedTerm))
      );
    }
    
    // Apply sector filter
    if (selectedSector !== 'All') {
      results = results.filter(item => item['Sector'] === selectedSector);
    }
    
    // Apply status filter
    if (selectedStatus !== 'All') {
      results = results.filter(item => item['Status'] === selectedStatus);
    }
    
    setFilteredClosureStartsData(results);
  }, [searchTerm, closureStartsData, selectedSector, selectedStatus]);

  // Filter data based on search term and filters
  const filteredTalentData = talentBenchData.filter(talent => {
    // Search filter
    const searchMatch = 
      talent.candidateName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      talent.roles.toLowerCase().includes(searchTerm.toLowerCase()) ||
      talent.primarySkills.toLowerCase().includes(searchTerm.toLowerCase());
    
    // Status filter
    const statusMatch = selectedStatus === 'All' || talent.benchStatus === selectedStatus;
    
    // Experience filter (simplified)
    let experienceMatch = true;
    if (selectedExperience !== 'All') {
      const years = parseInt(talent.experience);
      if (selectedExperience === '0-3') experienceMatch = years <= 3;
      else if (selectedExperience === '3-5') experienceMatch = years > 3 && years <= 5;
      else if (selectedExperience === '5-8') experienceMatch = years > 5 && years <= 8;
      else if (selectedExperience === '8+') experienceMatch = years > 8;
    }
    
    // Location filter
    const locationMatch = selectedLocation === 'All' || 
                          talent.state === selectedLocation ||
                          talent.city === selectedLocation;
    
    return searchMatch && statusMatch && experienceMatch && locationMatch;
  });

  const filteredSubmissionsData = submissionsData.filter(submission => 
    submission.consultant.toLowerCase().includes(searchTerm.toLowerCase()) ||
    submission.role.toLowerCase().includes(searchTerm.toLowerCase()) ||
    submission.client.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Component for card view of candidates
  const CandidateCard = ({ candidate }) => (
    <div 
      className="bg-white border border-gray-200 p-4 hover:shadow-lg transition-all duration-200 cursor-pointer transform hover:-translate-y-1"
      onClick={() => handleCandidateClick(candidate)}
    >
      <div className="flex items-start justify-between mb-3">
        <div className="flex items-center gap-3">
          <div className="h-10 w-10 bg-blue-100 text-blue-600 flex items-center justify-center font-semibold">
            {candidate.avatar}
          </div>
          <div>
            <h3 className="font-semibold text-gray-900">{candidate.candidateName}</h3>
            <p className="text-sm text-gray-600">{candidate.roles}</p>
          </div>
        </div>
        <div className="flex gap-1">
          <span className={`inline-flex items-center px-2 py-1 text-xs font-medium ${
            candidate.benchStatus === 'Active' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
          }`}>
            {candidate.benchStatus}
          </span>
          <span className={`inline-flex items-center px-2 py-1 text-xs font-medium ${
            candidate.profileQuality === 'High' ? 'bg-green-100 text-green-800' :
            candidate.profileQuality === 'Medium' ? 'bg-yellow-100 text-yellow-800' :
            'bg-gray-100 text-gray-800'
          }`}>
            {candidate.profileQuality}
          </span>
        </div>
      </div>
      
      <div className="space-y-2">
        <div className="flex justify-between">
          <span className="text-sm text-gray-600">Experience:</span>
          <span className="text-sm font-medium">{candidate.experience}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-sm text-gray-600">Location:</span>
          <span className="text-sm font-medium">{`${candidate.city}, ${candidate.state}`}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-sm text-gray-600">Availability:</span>
          <span className="text-sm font-medium">{candidate.availability}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-sm text-gray-600">Match Score:</span>
          <span className="text-sm font-medium text-blue-600">{candidate.matchScore}%</span>
        </div>
      </div>
      
      <div className="mt-4 pt-4 border-t border-gray-100">
        <p className="text-xs text-gray-500 mb-2">Primary Skills</p>
        <div className="flex flex-wrap gap-1">
          {candidate.primarySkills.split(',').map((skill, i) => (
            <span key={i} className="px-2 py-1 bg-blue-50 text-blue-700 text-xs">
              {skill.trim()}
            </span>
          ))}
        </div>
      </div>
      
      <div className="mt-3 flex justify-between">
        <div className="text-xs text-gray-500">Last updated: {candidate.lastUpdated}</div>
        <div className="flex items-center space-x-1">
          <button 
            className="p-1 text-gray-500 hover:text-blue-600 transition-colors"
            onClick={(e) => {
              e.stopPropagation();
              handleEditCandidate(candidate);
            }}
          >
            <Edit className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );

  // Talent Bench Form Component
  const TalentBenchForm = () => {
    const [formData, setFormData] = useState({
      profileQuality: '',
      candidateName: '',
      roles: '',
      addedBy: '',
      crs: '',
      contactNo: '',
      emailId: '',
      workedWithVDart: '',
      referredBy: '',
      benchAddedDate: '',
      experience: '',
      previousClient: '',
      businessUnit: '',
      altContactNo: '',
      city: '',
      state: '',
      timeZone: '',
      country: '',
      relocation: '',
      workMode: '',
      jobPreference: '',
      expectedSalary: '',
      workAuthorization: '',
      validityExp: '',
      primarySkills: '',
      secondarySkills: '',
      techCategoryMain: '',
      techCategorySub: '',
      taxTerms: '',
      vendorCompany: '',
      pocVendor: '',
      vendorContactNo: '',
      vendorEmail: '',
      projectEndDate: '',
      lastSpokenBy: '',
      lastSpokenOn: '',
      daysLeft: '',
      attempts: '',
      connections: '',
      benchStatus: '',
      comments: '',
      engagementLevel: '',
      movedOutDate: '',
      movedToBenchDate: '',
      rejectionReasons: '',
      certified: '',
      resumeLink: ''
    });
    
    const [activeFormSection, setActiveFormSection] = useState('basic');
    const [validationErrors, setValidationErrors] = useState({});
    const [formProgress, setFormProgress] = useState(0);
    const [previewMode, setPreviewMode] = useState(false);
    
    const updateFormProgress = () => {
      const totalFields = Object.keys(formData).length;
      const filledFields = Object.values(formData).filter(value => value !== '').length;
      setFormProgress(Math.round((filledFields / totalFields) * 100));
    };
    
    useEffect(() => {
      updateFormProgress();
    }, [formData]);
    
    const handleChange = (e) => {
      const { name, value } = e.target;
      setFormData(prev => ({
        ...prev,
        [name]: value
      }));
      
      // Clear validation error when field is filled
      if (validationErrors[name] && value) {
        setValidationErrors(prev => ({
          ...prev,
          [name]: undefined
        }));
      }
    };
    
    const validateForm = (section) => {
      const newErrors = {};
      const requiredFields = {
        basic: ['candidateName', 'roles', 'emailId', 'contactNo', 'benchAddedDate'],
        skills: ['experience', 'primarySkills'],
        location: ['city', 'state', 'workMode'],
        documents: ['benchStatus']
      };
      
      if (requiredFields[section]) {
        requiredFields[section].forEach(field => {
          if (!formData[field]) {
            newErrors[field] = 'This field is required';
          }
        });
      }
      
      // Email validation
      if (section === 'basic' && formData.emailId && !/\S+@\S+\.\S+/.test(formData.emailId)) {
        newErrors.emailId = 'Please enter a valid email address';
      }
      
      setValidationErrors(newErrors);
      return Object.keys(newErrors).length === 0;
    };
    
    const handleNextSection = () => {
      const isValid = validateForm(activeFormSection);
      if (!isValid) return;
      
      const sections = ['basic', 'skills', 'location', 'documents'];
      const currentIndex = sections.indexOf(activeFormSection);
      if (currentIndex < sections.length - 1) {
        setActiveFormSection(sections[currentIndex + 1]);
      }
    };
    
    const handlePrevSection = () => {
      const sections = ['basic', 'skills', 'location', 'documents'];
      const currentIndex = sections.indexOf(activeFormSection);
      if (currentIndex > 0) {
        setActiveFormSection(sections[currentIndex - 1]);
      }
    };
    
    const handleSubmit = () => {
      const isValid = validateForm(activeFormSection);
      if (!isValid) return;
      
      // In a real application, you'd submit the form data to an API
      console.log('Form submitted:', formData);
      handleCloseForm();
    };
    
    const togglePreview = () => {
      setPreviewMode(!previewMode);
    };
    
    return (
      <div className="space-y-6">
        {/* Progress indicator */}
        <div className="bg-gray-50 p-4 mb-4">
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm font-medium text-gray-700">Completion Progress</span>
            <span className="text-sm font-medium text-blue-600">{formProgress}%</span>
          </div>
          <div className="w-full bg-gray-200 h-3">
            <div 
              className="bg-gradient-to-r from-blue-500 to-blue-600 h-3 transition-all duration-500 ease-out"
              style={{ width: `${formProgress}%` }}
            ></div>
          </div>
        </div>
        
        {/* Form tabs */}
        <div className="border-b border-gray-200 mb-6">
          <div className="flex flex-wrap space-x-6">
            <button 
              className={`px-4 py-3 font-medium transition-all duration-200 ${activeFormSection === 'basic' ? 'border-b-3 border-blue-600 text-blue-600 bg-blue-50' : 'text-gray-500 hover:text-gray-700 hover:bg-gray-50'}`}
              onClick={() => setActiveFormSection('basic')}
            >
              Basic Info
            </button>
            <button 
              className={`px-4 py-3 font-medium transition-all duration-200 ${activeFormSection === 'skills' ? 'border-b-3 border-blue-600 text-blue-600 bg-blue-50' : 'text-gray-500 hover:text-gray-700 hover:bg-gray-50'}`}
              onClick={() => setActiveFormSection('skills')}
            >
              Skills & Experience
            </button>
            <button 
              className={`px-4 py-3 font-medium transition-all duration-200 ${activeFormSection === 'location' ? 'border-b-3 border-blue-600 text-blue-600 bg-blue-50' : 'text-gray-500 hover:text-gray-700 hover:bg-gray-50'}`}
              onClick={() => setActiveFormSection('location')}
            >
              Location & Availability
            </button>
            <button 
              className={`px-4 py-3 font-medium transition-all duration-200 ${activeFormSection === 'documents' ? 'border-b-3 border-blue-600 text-blue-600 bg-blue-50' : 'text-gray-500 hover:text-gray-700 hover:bg-gray-50'}`}
              onClick={() => setActiveFormSection('documents')}
            >
              Documents & Notes
            </button>
          </div>
        </div>

        {/* Conditional rendering based on preview mode */}
        {previewMode ? (
          <div className="bg-white border border-gray-200 p-6">
            <h3 className="text-lg font-semibold mb-4 pb-2 border-b border-gray-200">Candidate Details Preview</h3>
            
            <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
              <div className="space-y-1">
                <p className="text-sm text-gray-500">Profile Quality</p>
                <p className="font-medium">{formData.profileQuality || 'Not specified'}</p>
              </div>
              
              <div className="space-y-1">
                <p className="text-sm text-gray-500">Candidate Name</p>
                <p className="font-medium">{formData.candidateName || 'Not specified'}</p>
              </div>
              
              <div className="space-y-1">
                <p className="text-sm text-gray-500">Roles</p>
                <p className="font-medium">{formData.roles || 'Not specified'}</p>
              </div>
              
              <div className="space-y-1">
                <p className="text-sm text-gray-500">Email</p>
                <p className="font-medium">{formData.emailId || 'Not specified'}</p>
              </div>
              
              <div className="space-y-1">
                <p className="text-sm text-gray-500">Contact Number</p>
                <p className="font-medium">{formData.contactNo || 'Not specified'}</p>
              </div>
              
              <div className="space-y-1">
                <p className="text-sm text-gray-500">Experience</p>
                <p className="font-medium">{formData.experience || 'Not specified'}</p>
              </div>
              
              <div className="space-y-1">
                <p className="text-sm text-gray-500">Location</p>
                <p className="font-medium">{formData.city ? `${formData.city}, ${formData.state}` : 'Not specified'}</p>
              </div>
              
              <div className="space-y-1">
                <p className="text-sm text-gray-500">Bench Status</p>
                <p className="font-medium">{formData.benchStatus || 'Not specified'}</p>
              </div>
              
              <div className="space-y-1">
                <p className="text-sm text-gray-500">Work Mode</p>
                <p className="font-medium">{formData.workMode || 'Not specified'}</p>
              </div>
            </div>
            
            <div className="mt-6 pt-4 border-t border-gray-200">
              <div className="space-y-1">
                <p className="text-sm text-gray-500">Primary Skills</p>
                <div className="flex flex-wrap gap-1 mt-1">
                  {formData.primarySkills ? formData.primarySkills.split(',').map((skill, i) => (
                    <span key={i} className="px-2 py-1 bg-blue-50 text-blue-700 text-xs">
                      {skill.trim()}
                    </span>
                  )) : <p className="text-sm text-gray-500">Not specified</p>}
                </div>
              </div>
            </div>
            
            {formData.comments && (
              <div className="mt-4 pt-4 border-t border-gray-200">
                <div className="space-y-1">
                  <p className="text-sm text-gray-500">Comments</p>
                  <p className="text-sm">{formData.comments}</p>
                </div>
              </div>
            )}
          </div>
        ) : (
          <div>
            {/* Basic Info Section */}
            {activeFormSection === 'basic' && (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Profile Quality
                  </label>
                  <select 
                    name="profileQuality"
                    value={formData.profileQuality}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border-2 border-gray-300 focus:outline-none focus:border-blue-600 transition-colors duration-200 bg-white"
                  >
                    <option value="">Select Quality</option>
                    <option value="High">High</option>
                    <option value="Medium">Medium</option>
                    <option value="Low">Low</option>
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Candidate Name <span className="text-red-500">*</span>
                  </label>
                  <input 
                    type="text" 
                    name="candidateName"
                    value={formData.candidateName}
                    onChange={handleChange}
                    className={`w-full px-4 py-3 border-2 ${validationErrors.candidateName ? 'border-red-500 bg-red-50' : 'border-gray-300'} focus:outline-none focus:border-blue-600 transition-colors duration-200`}
                    placeholder="Enter candidate's full name"
                  />
                  {validationErrors.candidateName && (
                    <p className="mt-1 text-sm text-red-500">{validationErrors.candidateName}</p>
                  )}
                </div>
                
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Roles <span className="text-red-500">*</span>
                  </label>
                  <input 
                    type="text" 
                    name="roles"
                    value={formData.roles}
                    onChange={handleChange}
                    className={`w-full px-4 py-3 border-2 ${validationErrors.roles ? 'border-red-500 bg-red-50' : 'border-gray-300'} focus:outline-none focus:border-blue-600 transition-colors duration-200`}
                    placeholder="e.g. Full Stack Developer"
                  />
                  {validationErrors.roles && (
                    <p className="mt-1 text-sm text-red-500">{validationErrors.roles}</p>
                  )}
                </div>
                
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Added By
                  </label>
                  <input 
                    type="text" 
                    name="addedBy"
                    value={formData.addedBy}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border-2 border-gray-300 focus:outline-none focus:border-blue-600 transition-colors duration-200"
                    placeholder="Recruiter or team member name"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    CRS
                  </label>
                  <input 
                    type="text" 
                    name="crs"
                    value={formData.crs}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border-2 border-gray-300 focus:outline-none focus:border-blue-600 transition-colors duration-200"
                    placeholder="CRS identifier"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Contact No <span className="text-red-500">*</span>
                  </label>
                  <input 
                    type="tel" 
                    name="contactNo"
                    value={formData.contactNo}
                    onChange={handleChange}
                    className={`w-full px-4 py-3 border-2 ${validationErrors.contactNo ? 'border-red-500 bg-red-50' : 'border-gray-300'} focus:outline-none focus:border-blue-600 transition-colors duration-200`}
                    placeholder="Phone number"
                  />
                  {validationErrors.contactNo && (
                    <p className="mt-1 text-sm text-red-500">{validationErrors.contactNo}</p>
                  )}
                </div>
                
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Email ID <span className="text-red-500">*</span>
                  </label>
                  <input 
                    type="email" 
                    name="emailId"
                    value={formData.emailId}
                    onChange={handleChange}
                    className={`w-full px-4 py-3 border-2 ${validationErrors.emailId ? 'border-red-500 bg-red-50' : 'border-gray-300'} focus:outline-none focus:border-blue-600 transition-colors duration-200`}
                    placeholder="candidate@example.com"
                  />
                  {validationErrors.emailId && (
                    <p className="mt-1 text-sm text-red-500">{validationErrors.emailId}</p>
                  )}
                </div>
                
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Worked with VDart
                  </label>
                  <select 
                    name="workedWithVDart"
                    value={formData.workedWithVDart}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border-2 border-gray-300 focus:outline-none focus:border-blue-600 transition-colors duration-200 bg-white"
                  >
                    <option value="">Select</option>
                    <option value="Yes">Yes</option>
                    <option value="No">No</option>
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Referred By
                  </label>
                  <input 
                    type="text" 
                    name="referredBy"
                    value={formData.referredBy}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border-2 border-gray-300 focus:outline-none focus:border-blue-600 transition-colors duration-200"
                    placeholder="Referral source"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Bench Added Date <span className="text-red-500">*</span>
                  </label>
                  <input 
                    type="date" 
                    name="benchAddedDate"
                    value={formData.benchAddedDate}
                    onChange={handleChange}
                    className={`w-full px-4 py-3 border-2 ${validationErrors.benchAddedDate ? 'border-red-500 bg-red-50' : 'border-gray-300'} focus:outline-none focus:border-blue-600 transition-colors duration-200`}
                  />
                  {validationErrors.benchAddedDate && (
                    <p className="mt-1 text-sm text-red-500">{validationErrors.benchAddedDate}</p>
                  )}
                </div>
                
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Previous Client
                  </label>
                  <input 
                    type="text" 
                    name="previousClient"
                    value={formData.previousClient}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border-2 border-gray-300 focus:outline-none focus:border-blue-600 transition-colors duration-200"
                    placeholder="Last employer/client"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Business Unit
                  </label>
                  <input 
                    type="text" 
                    name="businessUnit"
                    value={formData.businessUnit}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border-2 border-gray-300 focus:outline-none focus:border-blue-600 transition-colors duration-200"
                    placeholder="Business unit or department"
                  />
                </div>
              </div>
            )}
            
            {/* Skills & Experience Section */}
            {activeFormSection === 'skills' && (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Experience <span className="text-red-500">*</span>
                  </label>
                  <input 
                    type="text" 
                    name="experience"
                    value={formData.experience}
                    onChange={handleChange}
                    className={`w-full px-4 py-3 border-2 ${validationErrors.experience ? 'border-red-500 bg-red-50' : 'border-gray-300'} focus:outline-none focus:border-blue-600 transition-colors duration-200`}
                    placeholder="e.g. 5 years"
                  />
                  {validationErrors.experience && (
                    <p className="mt-1 text-sm text-red-500">{validationErrors.experience}</p>
                  )}
                </div>
                
                <div className="md:col-span-2">
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Primary Skills <span className="text-red-500">*</span>
                  </label>
                  <input 
                    type="text" 
                    name="primarySkills"
                    value={formData.primarySkills}
                    onChange={handleChange}
                    className={`w-full px-4 py-3 border-2 ${validationErrors.primarySkills ? 'border-red-500 bg-red-50' : 'border-gray-300'} focus:outline-none focus:border-blue-600 transition-colors duration-200`}
                    placeholder="e.g. React, Node.js, AWS"
                  />
                  {validationErrors.primarySkills && (
                    <p className="mt-1 text-sm text-red-500">{validationErrors.primarySkills}</p>
                  )}
                  <p className="mt-1 text-xs text-gray-500">Separate multiple skills with commas</p>
                </div>
                
                <div className="md:col-span-2">
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Secondary Skills
                  </label>
                  <input 
                    type="text" 
                    name="secondarySkills"
                    value={formData.secondarySkills}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border-2 border-gray-300 focus:outline-none focus:border-blue-600 transition-colors duration-200"
                    placeholder="e.g. SQL, Docker, Git"
                  />
                  <p className="mt-1 text-xs text-gray-500">Separate multiple skills with commas</p>
                </div>
                
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Tech Category (Main)
                  </label>
                  <input 
                    type="text" 
                    name="techCategoryMain"
                    value={formData.techCategoryMain}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border-2 border-gray-300 focus:outline-none focus:border-blue-600 transition-colors duration-200"
                    placeholder="e.g. Frontend Development"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Tech Category (Sub)
                  </label>
                  <input 
                    type="text" 
                    name="techCategorySub"
                    value={formData.techCategorySub}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border-2 border-gray-300 focus:outline-none focus:border-blue-600 transition-colors duration-200"
                    placeholder="e.g. React.js"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Work Authorization
                  </label>
                  <select 
                    name="workAuthorization"
                    value={formData.workAuthorization}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border-2 border-gray-300 focus:outline-none focus:border-blue-600 transition-colors duration-200 bg-white"
                  >
                    <option value="">Select Authorization</option>
                    <option value="US Citizen">US Citizen</option>
                    <option value="Green Card">Green Card</option>
                    <option value="H1B">H1B</option>
                    <option value="EAD">EAD</option>
                    <option value="Other">Other</option>
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Validity Expiration
                  </label>
                  <input 
                    type="date" 
                    name="validityExp"
                    value={formData.validityExp}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border-2 border-gray-300 focus:outline-none focus:border-blue-600 transition-colors duration-200"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Tax Terms
                  </label>
                  <select 
                    name="taxTerms"
                    value={formData.taxTerms}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border-2 border-gray-300 focus:outline-none focus:border-blue-600 transition-colors duration-200 bg-white"
                  >
                    <option value="">Select Tax Terms</option>
                    <option value="W2">W2</option>
                    <option value="1099">1099</option>
                    <option value="C2C">C2C</option>
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Certified?
                  </label>
                  <select 
                    name="certified"
                    value={formData.certified}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border-2 border-gray-300 focus:outline-none focus:border-blue-600 transition-colors duration-200 bg-white"
                  >
                    <option value="">Select</option>
                    <option value="Yes">Yes</option>
                    <option value="No">No</option>
                  </select>
                </div>
              </div>
            )}
            
            {/* Location & Availability Section */}
            {activeFormSection === 'location' && (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    City <span className="text-red-500">*</span>
                  </label>
                  <input 
                    type="text" 
                    name="city"
                    value={formData.city}
                    onChange={handleChange}
                    className={`w-full px-4 py-3 border-2 ${validationErrors.city ? 'border-red-500 bg-red-50' : 'border-gray-300'} focus:outline-none focus:border-blue-600 transition-colors duration-200`}
                    placeholder="City name"
                  />
                  {validationErrors.city && (
                    <p className="mt-1 text-sm text-red-500">{validationErrors.city}</p>
                  )}
                </div>
                
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    State <span className="text-red-500">*</span>
                  </label>
                  <input 
                    type="text" 
                    name="state"
                    value={formData.state}
                    onChange={handleChange}
                    className={`w-full px-4 py-3 border-2 ${validationErrors.state ? 'border-red-500 bg-red-50' : 'border-gray-300'} focus:outline-none focus:border-blue-600 transition-colors duration-200`}
                    placeholder="State/Province"
                  />
                  {validationErrors.state && (
                    <p className="mt-1 text-sm text-red-500">{validationErrors.state}</p>
                  )}
                </div>
                
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Time Zone
                  </label>
                  <select 
                    name="timeZone"
                    value={formData.timeZone}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border-2 border-gray-300 focus:outline-none focus:border-blue-600 transition-colors duration-200 bg-white"
                  >
                    <option value="">Select Time Zone</option>
                    <option value="EST">EST</option>
                    <option value="CST">CST</option>
                    <option value="MST">MST</option>
                    <option value="PST">PST</option>
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Country
                  </label>
                  <input 
                    type="text" 
                    name="country"
                    value={formData.country}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border-2 border-gray-300 focus:outline-none focus:border-blue-600 transition-colors duration-200"
                    placeholder="Country name"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Relocation
                  </label>
                  <select 
                    name="relocation"
                    value={formData.relocation}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border-2 border-gray-300 focus:outline-none focus:border-blue-600 transition-colors duration-200 bg-white"
                  >
                    <option value="">Select</option>
                    <option value="Yes">Yes</option>
                    <option value="No">No</option>
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Work Mode <span className="text-red-500">*</span>
                  </label>
                  <select 
                    name="workMode"
                    value={formData.workMode}
                    onChange={handleChange}
                    className={`w-full px-4 py-3 border-2 ${validationErrors.workMode ? 'border-red-500 bg-red-50' : 'border-gray-300'} focus:outline-none focus:border-blue-600 transition-colors duration-200 bg-white`}
                  >
                    <option value="">Select Work Mode</option>
                    <option value="Remote">Remote</option>
                    <option value="Hybrid">Hybrid</option>
                    <option value="On-site">On-site</option>
                  </select>
                  {validationErrors.workMode && (
                    <p className="mt-1 text-sm text-red-500">{validationErrors.workMode}</p>
                  )}
                </div>
                
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Job Preference
                  </label>
                  <input 
                    type="text" 
                    name="jobPreference"
                    value={formData.jobPreference}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border-2 border-gray-300 focus:outline-none focus:border-blue-600 transition-colors duration-200"
                    placeholder="Preferred job type"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Expected Rate/Salary
                  </label>
                  <input 
                    type="text" 
                    name="expectedSalary"
                    value={formData.expectedSalary}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border-2 border-gray-300 focus:outline-none focus:border-blue-600 transition-colors duration-200"
                    placeholder="e.g. $75,000/year or $50/hr"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Vendor Company
                  </label>
                  <input 
                    type="text" 
                    name="vendorCompany"
                    value={formData.vendorCompany}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border-2 border-gray-300 focus:outline-none focus:border-blue-600 transition-colors duration-200"
                    placeholder="Vendor company name"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    POC (Vendor)
                  </label>
                  <input 
                    type="text" 
                    name="pocVendor"
                    value={formData.pocVendor}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border-2 border-gray-300 focus:outline-none focus:border-blue-600 transition-colors duration-200"
                    placeholder="Point of contact"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Alt Contact No
                  </label>
                  <input 
                    type="tel" 
                    name="altContactNo"
                    value={formData.altContactNo}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border-2 border-gray-300 focus:outline-none focus:border-blue-600 transition-colors duration-200"
                    placeholder="Alternative phone number"
                  />
                </div>
              </div>
            )}
            
            {/* Documents & Notes Section */}
            {activeFormSection === 'documents' && (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Bench Status <span className="text-red-500">*</span>
                  </label>
                  <select 
                    name="benchStatus"
                    value={formData.benchStatus}
                    onChange={handleChange}
                    className={`w-full px-4 py-3 border-2 ${validationErrors.benchStatus ? 'border-red-500 bg-red-50' : 'border-gray-300'} focus:outline-none focus:border-blue-600 transition-colors duration-200 bg-white`}
                  >
                    <option value="">Select Status</option>
                    <option value="Active">Active</option>
                    <option value="Inactive">Inactive</option>
                    <option value="On Hold">On Hold</option>
                  </select>
                  {validationErrors.benchStatus && (
                    <p className="mt-1 text-sm text-red-500">{validationErrors.benchStatus}</p>
                  )}
                </div>
                
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Engagement Level
                  </label>
                  <select 
                    name="engagementLevel"
                    value={formData.engagementLevel}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border-2 border-gray-300 focus:outline-none focus:border-blue-600 transition-colors duration-200 bg-white"
                  >
                    <option value="">Select Level</option>
                    <option value="High">High</option>
                    <option value="Medium">Medium</option>
                    <option value="Low">Low</option>
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Project End Date
                  </label>
                  <input 
                    type="date" 
                    name="projectEndDate"
                    value={formData.projectEndDate}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border-2 border-gray-300 focus:outline-none focus:border-blue-600 transition-colors duration-200"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Last Spoken By
                  </label>
                  <input 
                    type="text" 
                    name="lastSpokenBy"
                    value={formData.lastSpokenBy}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border-2 border-gray-300 focus:outline-none focus:border-blue-600 transition-colors duration-200"
                    placeholder="Team member name"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Last Spoken On
                  </label>
                  <input 
                    type="date" 
                    name="lastSpokenOn"
                    value={formData.lastSpokenOn}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border-2 border-gray-300 focus:outline-none focus:border-blue-600 transition-colors duration-200"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Days Left
                  </label>
                  <input 
                    type="number" 
                    name="daysLeft"
                    value={formData.daysLeft}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border-2 border-gray-300 focus:outline-none focus:border-blue-600 transition-colors duration-200"
                    placeholder="Number of days"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Moved Out Of Bench Date
                  </label>
                  <input 
                    type="date" 
                    name="movedOutDate"
                    value={formData.movedOutDate}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border-2 border-gray-300 focus:outline-none focus:border-blue-600 transition-colors duration-200"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Moved to Bench
                  </label>
                  <input 
                    type="date" 
                    name="movedToBenchDate"
                    value={formData.movedToBenchDate}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border-2 border-gray-300 focus:outline-none focus:border-blue-600 transition-colors duration-200"
                  />
                </div>
                
                <div className="md:col-span-2">
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Resume Link
                  </label>
                  <input 
                    type="url" 
                    name="resumeLink"
                    value={formData.resumeLink}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border-2 border-gray-300 focus:outline-none focus:border-blue-600 transition-colors duration-200"
                    placeholder="e.g. https://drive.google.com/file/..."
                  />
                </div>
                
                <div className="col-span-full">
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Comments
                  </label>
                  <textarea 
                    name="comments"
                    value={formData.comments}
                    onChange={handleChange}
                    rows="4"
                    className="w-full px-4 py-3 border-2 border-gray-300 focus:outline-none focus:border-blue-600 transition-colors duration-200 resize-none"
                    placeholder="Additional notes or comments about the candidate..."
                  ></textarea>
                </div>
                
                <div className="col-span-full">
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Reasons Why Candidates Reject Opportunity
                  </label>
                  <textarea 
                    name="rejectionReasons"
                    value={formData.rejectionReasons}
                    onChange={handleChange}
                    rows="3"
                    className="w-full px-4 py-3 border-2 border-gray-300 focus:outline-none focus:border-blue-600 transition-colors duration-200 resize-none"
                    placeholder="Common rejection reasons or feedback..."
                  ></textarea>
                </div>
              </div>
            )}
          </div>
        )}
        
        <div className="flex justify-between items-center pt-6 border-t border-gray-200">
          <div className="flex items-center space-x-2">
            {!previewMode ? (
              <span className="text-sm text-gray-500">Fields with <span className="text-red-500">*</span> are required</span>
            ) : null}
          </div>
          <div className="flex space-x-4">
            {activeFormSection !== 'basic' && !previewMode && (
              <button 
                type="button"
                onClick={handlePrevSection}
                className="px-6 py-3 border-2 border-gray-300 text-gray-700 hover:bg-gray-50 transition-all duration-200 flex items-center gap-2 font-medium"
              >
                <ChevronLeft className="w-4 h-4" /> Previous
              </button>
            )}
            
            {!previewMode && (
              <button 
                type="button"
                onClick={togglePreview}
                className="px-6 py-3 border-2 border-blue-600 text-blue-600 hover:bg-blue-50 transition-all duration-200 font-medium"
              >
                Preview
              </button>
            )}
            
            {previewMode && (
              <button 
                type="button"
                onClick={togglePreview}
                className="px-6 py-3 border-2 border-gray-300 text-gray-700 hover:bg-gray-50 transition-all duration-200 font-medium"
              >
                Edit Form
              </button>
            )}
            
            {activeFormSection !== 'documents' && !previewMode ? (
              <button 
                type="button"
                onClick={handleNextSection}
                className="px-6 py-3 bg-blue-600 text-white hover:bg-blue-700 transition-all duration-200 flex items-center gap-2 font-medium shadow-lg hover:shadow-xl"
              >
                Next <ChevronRight className="w-4 h-4" />
              </button>
            ) : previewMode ? (
              <button 
                type="button"
                onClick={handleSubmit}
                className="px-8 py-3 bg-green-600 text-white hover:bg-green-700 transition-all duration-200 font-medium shadow-lg hover:shadow-xl"
              >
                Save Candidate
              </button>
            ) : (
              <button 
                type="button"
                onClick={handleSubmit}
                className="px-8 py-3 bg-green-600 text-white hover:bg-green-700 transition-all duration-200 font-medium shadow-lg hover:shadow-xl"
              >
                Save Candidate
              </button>
            )}
          </div>
        </div>
      </div>
    );
  };

  // Submissions Form Component
  const SubmissionsForm = () => {
    const [formData, setFormData] = useState({
      quarter: '',
      year: '',
      month: '',
      week: '',
      weekNo: '',
      dateAdded: '',
      doInterview: '',
      doClosure: '',
      doStart: '',
      submittedBy: '',
      consultantName: '',
      role: '',
      sourceRequirements: '',
      crs: '',
      bench: '',
      client: '',
      endClient: '',
      clientRate: '',
      candidateRate: '',
      recruiter: '',
      teamName: '',
      bu: '',
      submissionType: '',
      submissionStatus: '',
      reasons: '',
      priority: 'Medium'
    });
    
    const [activeFormSection, setActiveFormSection] = useState('basic');
    const [validationErrors, setValidationErrors] = useState({});
    const [formProgress, setFormProgress] = useState(0);
    const [previewMode, setPreviewMode] = useState(false);
    
    const updateFormProgress = () => {
      const totalFields = Object.keys(formData).length;
      const filledFields = Object.values(formData).filter(value => value !== '').length;
      setFormProgress(Math.round((filledFields / totalFields) * 100));
    };
    
    useEffect(() => {
      updateFormProgress();
    }, [formData]);
    
    const handleChange = (e) => {
      const { name, value } = e.target;
      setFormData(prev => ({
        ...prev,
        [name]: value
      }));
      
      // Clear validation error when field is filled
      if (validationErrors[name] && value) {
        setValidationErrors(prev => ({
          ...prev,
          [name]: undefined
        }));
      }
    };
    
    const validateForm = (section) => {
      const newErrors = {};
      const requiredFields = {
        basic: ['consultantName', 'role', 'dateAdded'],
        client: ['client', 'submissionStatus'],
        rate: ['candidateRate']
      };
      
      if (requiredFields[section]) {
        requiredFields[section].forEach(field => {
          if (!formData[field]) {
            newErrors[field] = 'This field is required';
          }
        });
      }
      
      setValidationErrors(newErrors);
      return Object.keys(newErrors).length === 0;
    };
    
    const handleNextSection = () => {
      const isValid = validateForm(activeFormSection);
      if (!isValid) return;
      
      const sections = ['basic', 'client', 'dates', 'rate'];
      const currentIndex = sections.indexOf(activeFormSection);
      if (currentIndex < sections.length - 1) {
        setActiveFormSection(sections[currentIndex + 1]);
      }
    };
    
    const handlePrevSection = () => {
      const sections = ['basic', 'client', 'dates', 'rate'];
      const currentIndex = sections.indexOf(activeFormSection);
      if (currentIndex > 0) {
        setActiveFormSection(sections[currentIndex - 1]);
      }
    };
    
    const handleSubmit = () => {
      const isValid = validateForm(activeFormSection);
      if (!isValid) return;
      
      // In a real application, you'd submit the form data to an API
      console.log('Submission form submitted:', formData);
      handleCloseForm();
    };
    
    const togglePreview = () => {
      setPreviewMode(!previewMode);
    };
    
    return (
      <div className="space-y-6">
        {/* Progress indicator */}
        <div className="bg-gray-50 p-4 mb-4">
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm font-medium text-gray-700">Completion Progress</span>
            <span className="text-sm font-medium text-blue-600">{formProgress}%</span>
          </div>
          <div className="w-full bg-gray-200 h-3">
            <div 
              className="bg-gradient-to-r from-blue-500 to-blue-600 h-3 transition-all duration-500 ease-out"
              style={{ width: `${formProgress}%` }}
            ></div>
          </div>
        </div>
        
        {/* Form tabs */}
        <div className="border-b border-gray-200 mb-6">
          <div className="flex flex-wrap space-x-6">
            <button 
              className={`px-4 py-3 font-medium transition-all duration-200 ${activeFormSection === 'basic' ? 'border-b-3 border-blue-600 text-blue-600 bg-blue-50' : 'text-gray-500 hover:text-gray-700 hover:bg-gray-50'}`}
              onClick={() => setActiveFormSection('basic')}
            >
              Submission Details
            </button>
            <button 
              className={`px-4 py-3 font-medium transition-all duration-200 ${activeFormSection === 'client' ? 'border-b-3 border-blue-600 text-blue-600 bg-blue-50' : 'text-gray-500 hover:text-gray-700 hover:bg-gray-50'}`}
              onClick={() => setActiveFormSection('client')}
            >
              Client Information
            </button>
            <button 
              className={`px-4 py-3 font-medium transition-all duration-200 ${activeFormSection === 'dates' ? 'border-b-3 border-blue-600 text-blue-600 bg-blue-50' : 'text-gray-500 hover:text-gray-700 hover:bg-gray-50'}`}
              onClick={() => setActiveFormSection('dates')}
            >
              Dates & Timeline
            </button>
            <button 
              className={`px-4 py-3 font-medium transition-all duration-200 ${activeFormSection === 'rate' ? 'border-b-3 border-blue-600 text-blue-600 bg-blue-50' : 'text-gray-500 hover:text-gray-700 hover:bg-gray-50'}`}
              onClick={() => setActiveFormSection('rate')}
            >
              Rate & Terms
            </button>
          </div>
        </div>
        
        {/* Continue with submission form sections... */}
        <div className="text-center p-8">
          <p className="text-gray-500">Submission form sections would continue here with similar styling...</p>
        </div>
        
        <div className="flex justify-between items-center pt-6 border-t border-gray-200">
          <div className="flex items-center space-x-2">
            {!previewMode ? (
              <span className="text-sm text-gray-500">Fields with <span className="text-red-500">*</span> are required</span>
            ) : null}
          </div>
          <div className="flex space-x-4">
            {activeFormSection !== 'basic' && !previewMode && (
              <button 
                type="button"
                onClick={handlePrevSection}
                className="px-6 py-3 border-2 border-gray-300 text-gray-700 hover:bg-gray-50 transition-all duration-200 flex items-center gap-2 font-medium"
              >
                <ChevronLeft className="w-4 h-4" /> Previous
              </button>
            )}
            
            <button 
              type="button"
              onClick={handleSubmit}
              className="px-8 py-3 bg-green-600 text-white hover:bg-green-700 transition-all duration-200 font-medium shadow-lg hover:shadow-xl"
            >
              Save Submission
            </button>
          </div>
        </div>
      </div>
    );
  };

  // Candidate Details View Component
  const CandidateDetailsView = ({ candidate, onClose }) => {
    if (!candidate) return null;
    
    return (
      <div className="fixed inset-0 z-50 overflow-hidden bg-gray-900 bg-opacity-50 flex items-center justify-center">
        <div className="bg-white w-full max-w-6xl max-h-[90vh] overflow-hidden flex flex-col animate-fadeIn shadow-2xl">
          <div className="sticky top-0 bg-white px-6 py-4 border-b border-gray-200 flex justify-between items-center z-10">
            <div className="flex items-center space-x-4">
              <div className="h-12 w-12 bg-blue-100 text-blue-600 flex items-center justify-center font-bold text-lg">
                {candidate.avatar}
              </div>
              <div>
                <h2 className="text-2xl font-bold text-gray-800">{candidate.candidateName}</h2>
                <p className="text-gray-500">{candidate.roles}</p>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <button 
                className="p-2 text-gray-400 hover:text-gray-600 transition-colors"
                onClick={() => handleEditCandidate(candidate)}
              >
                <Edit className="w-5 h-5" />
              </button>
              <button className="p-2 text-gray-400 hover:text-gray-600 transition-colors">
                <Bookmark className="w-5 h-5" />
              </button>
              <button 
                className="p-2 text-gray-400 hover:text-gray-600 transition-colors"
                onClick={onClose}
              >
                <X className="w-6 h-6" />
              </button>
            </div>
          </div>
          
          <div className="flex-grow overflow-y-auto">
            <div className="flex flex-col md:flex-row h-full">
              {/* Left sidebar with tabs */}
              <div className="w-full md:w-64 bg-gray-50 border-r border-gray-200">
                <div className="p-4">
                  <div className="flex flex-col space-y-2">
                    <button className="px-4 py-3 bg-blue-50 text-blue-600 font-medium text-left flex items-center transition-colors hover:bg-blue-100">
                      <UserCheck className="w-5 h-5 mr-3" /> Overview
                    </button>
                    <button className="px-4 py-3 text-gray-600 font-medium text-left flex items-center hover:bg-gray-100 transition-colors">
                      <GraduationCap className="w-5 h-5 mr-3" /> Skills & Experience
                    </button>
                    <button className="px-4 py-3 text-gray-600 font-medium text-left flex items-center hover:bg-gray-100 transition-colors">
                      <MapPin className="w-5 h-5 mr-3" /> Location & Availability
                    </button>
                    <button className="px-4 py-3 text-gray-600 font-medium text-left flex items-center hover:bg-gray-100 transition-colors">
                      <FileText className="w-5 h-5 mr-3" /> Documents
                    </button>
                    <button className="px-4 py-3 text-gray-600 font-medium text-left flex items-center hover:bg-gray-100 transition-colors">
                      <Clock className="w-5 h-5 mr-3" /> Activity History
                    </button>
                    <button className="px-4 py-3 text-gray-600 font-medium text-left flex items-center hover:bg-gray-100 transition-colors">
                      <BarChart2 className="w-5 h-5 mr-3" /> Metrics
                    </button>
                  </div>
                </div>
              </div>
              
              {/* Main content area */}
              <div className="flex-grow p-6 overflow-y-auto">
                {/* Status and quick actions */}
                <div className="flex flex-col md:flex-row justify-between mb-6">
                  <div className="flex flex-wrap gap-3 mb-4 md:mb-0">
                    <span className={`px-3 py-2 text-sm font-medium ${
                      candidate.benchStatus === 'Active' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                    }`}>
                      {candidate.benchStatus}
                    </span>
                    <span className="px-3 py-2 bg-blue-100 text-blue-800 text-sm font-medium">
                      {candidate.experience}
                    </span>
                    <span className="px-3 py-2 bg-purple-100 text-purple-800 text-sm font-medium">
                      {candidate.workAuthorization}
                    </span>
                    <span className="px-3 py-2 bg-yellow-100 text-yellow-800 text-sm font-medium">
                      Match Score: {candidate.matchScore}%
                    </span>
                  </div>
                  
                  <div className="flex space-x-3">
                    <button className="px-4 py-2 bg-white border-2 border-gray-300 text-gray-700 font-medium hover:bg-gray-50 transition-colors">
                      Download Resume
                    </button>
                    <button className="px-4 py-2 bg-blue-600 text-white font-medium hover:bg-blue-700 transition-colors">
                      Submit to Client
                    </button>
                  </div>
                </div>
                
                {/* Content in sections */}
                <div className="space-y-6">
                  {/* Overview section */}
                  <div className="bg-white border border-gray-200">
                    <div className="px-6 py-4 border-b border-gray-200 flex justify-between items-center">
                      <h3 className="text-lg font-semibold text-gray-800">Candidate Overview</h3>
                      <span className="text-sm text-gray-500">Last updated: {candidate.lastUpdated}</span>
                    </div>
                    <div className="p-6">
                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        <div>
                          <p className="text-sm text-gray-500 mb-1">Contact Information</p>
                          <p className="font-medium">{candidate.emailId}</p>
                          <p className="font-medium">{candidate.contactNo}</p>
                        </div>
                        <div>
                          <p className="text-sm text-gray-500 mb-1">Location</p>
                          <p className="font-medium">{candidate.city}, {candidate.state}</p>
                          <p className="text-sm text-gray-500 mt-1">Relocation: {candidate.relocation}</p>
                        </div>
                        <div>
                          <p className="text-sm text-gray-500 mb-1">Availability</p>
                          <p className="font-medium">{candidate.availability}</p>
                          <p className="text-sm text-gray-500 mt-1">Expected: {candidate.expectedSalary}</p>
                        </div>
                      </div>
                      
                      <div className="mt-6 border-t border-gray-100 pt-6">
                        <p className="text-sm text-gray-500 mb-2">Primary Skills</p>
                        <div className="flex flex-wrap gap-2">
                          {candidate.primarySkills.split(',').map((skill, index) => (
                            <span key={index} className="px-3 py-1 bg-blue-50 text-blue-700 text-sm">
                              {skill.trim()}
                            </span>
                          ))}
                        </div>
                      </div>
                      
                      <div className="mt-4">
                        <p className="text-sm text-gray-500 mb-2">Secondary Skills</p>
                        <div className="flex flex-wrap gap-2">
                          {candidate.secondarySkills.split(',').map((skill, index) => (
                            <span key={index} className="px-3 py-1 bg-gray-50 text-gray-700 text-sm">
                              {skill.trim()}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  {/* Engagement metrics */}
                  <div className="bg-white border border-gray-200">
                    <div className="px-6 py-4 border-b border-gray-200">
                      <h3 className="text-lg font-semibold text-gray-800">Engagement Metrics</h3>
                    </div>
                    <div className="p-6">
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <div className="bg-gray-50 p-4">
                          <p className="text-sm text-gray-500 mb-2">Engagement Level</p>
                          <div className="flex items-center">
                            <div className={`h-3 w-3 mr-2 ${
                              candidate.engagementLevel === 'High' ? 'bg-green-500' :
                              candidate.engagementLevel === 'Medium' ? 'bg-yellow-500' : 'bg-red-500'
                            }`}></div>
                            <p className="font-medium">{candidate.engagementLevel}</p>
                          </div>
                        </div>
                        <div className="bg-gray-50 p-4">
                          <p className="text-sm text-gray-500 mb-2">Last Contact</p>
                          <p className="font-medium">{candidate.lastContact}</p>
                        </div>
                        <div className="bg-gray-50 p-4">
                          <p className="text-sm text-gray-500 mb-2">Upcoming</p>
                          <p className="font-medium">{candidate.upcomingEvent || 'None scheduled'}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  // Advanced filter panel
  const FilterPanel = () => (
    <div className={`fixed inset-0 z-50 overflow-hidden transition-opacity ${showFilters ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}>
      <div className="absolute inset-0 bg-gray-900 bg-opacity-50" onClick={() => setShowFilters(false)}></div>
      <div className="absolute top-0 right-0 max-w-md w-full h-full bg-white shadow-2xl transform transition-transform duration-300 ease-in-out">
        <div className="p-6 border-b border-gray-200 flex justify-between items-center">
          <h3 className="text-xl font-bold text-gray-800">Advanced Filters</h3>
          <button 
            className="text-gray-500 hover:text-gray-700 transition-colors"
            onClick={() => setShowFilters(false)}
          >
            <X className="w-6 h-6" />
          </button>
        </div>
        
        <div className="p-6 space-y-6 overflow-y-auto h-full">
          <div>
            <h4 className="text-sm font-semibold text-gray-700 mb-3">Status</h4>
            <div className="space-y-3">
              {['All', 'Active', 'Inactive'].map(status => (
                <label key={status} className="flex items-center space-x-3 cursor-pointer hover:bg-gray-50 p-2 transition-colors">
                  <input 
                    type="radio" 
                    name="status" 
                    value={status} 
                    checked={selectedStatus === status} 
                    onChange={() => setSelectedStatus(status)}
                    className="h-4 w-4 text-blue-600"
                  />
                  <span className="font-medium">{status}</span>
                </label>
              ))}
            </div>
          </div>
          
          <div>
            <h4 className="text-sm font-semibold text-gray-700 mb-3">Experience</h4>
            <div className="space-y-3">
              {[
                { value: 'All', label: 'All' },
                { value: '0-3', label: '0-3 years' },
                { value: '3-5', label: '3-5 years' },
                { value: '5-8', label: '5-8 years' },
                { value: '8+', label: '8+ years' }
              ].map(exp => (
                <label key={exp.value} className="flex items-center space-x-3 cursor-pointer hover:bg-gray-50 p-2 transition-colors">
                  <input 
                    type="radio" 
                    name="experience" 
                    value={exp.value} 
                    checked={selectedExperience === exp.value} 
                    onChange={() => setSelectedExperience(exp.value)}
                    className="h-4 w-4 text-blue-600"
                  />
                  <span className="font-medium">{exp.label}</span>
                </label>
              ))}
            </div>
          </div>
          
          <div>
            <h4 className="text-sm font-semibold text-gray-700 mb-3">Location</h4>
            <select 
              className="w-full px-4 py-3 border-2 border-gray-300 focus:outline-none focus:border-blue-600 bg-white"
              value={selectedLocation}
              onChange={(e) => setSelectedLocation(e.target.value)}
            >
              <option value="All">All Locations</option>
              <option value="Atlanta">Atlanta, GA</option>
              <option value="Chicago">Chicago, IL</option>
              <option value="Seattle">Seattle, WA</option>
              <option value="Boston">Boston, MA</option>
              <option value="Denver">Denver, CO</option>
            </select>
          </div>
          
          <div>
            <h4 className="text-sm font-semibold text-gray-700 mb-3">Skills</h4>
            <div className="space-y-3">
              <input 
                type="text" 
                placeholder="Search skills..."
                className="w-full px-4 py-3 border-2 border-gray-300 focus:outline-none focus:border-blue-600"
              />
              <div className="space-y-2 max-h-40 overflow-y-auto bg-gray-50 p-3">
                {['React', 'Node.js', 'JavaScript', 'Python', 'AWS', 'Docker', 'UI Design'].map(skill => (
                  <label key={skill} className="flex items-center space-x-2 cursor-pointer">
                    <input type="checkbox" className="h-4 w-4 text-blue-600" />
                    <span className="font-medium">{skill}</span>
                  </label>
                ))}
              </div>
            </div>
          </div>
        </div>
        
        <div className="absolute bottom-0 left-0 right-0 p-6 bg-white border-t border-gray-200">
          <div className="flex justify-between">
            <button className="px-4 py-2 text-gray-600 hover:text-gray-800 font-medium">
              Reset All
            </button>
            <button 
              className="px-6 py-2 bg-blue-600 text-white hover:bg-blue-700 transition-colors font-medium"
              onClick={() => setShowFilters(false)}
            >
              Apply Filters
            </button>
          </div>
        </div>
      </div>
    </div>
  );
  
  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Sidebar */}
      <div className={`fixed inset-y-0 left-0 z-30 w-64 bg-white shadow-xl transform transition-transform duration-300 ease-in-out ${showSidebar ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}`}>
        <div className="flex flex-col h-full">
          <div className="px-6 py-6 border-b border-gray-200">
            <div className="flex items-center gap-3">
              <div className="bg-gradient-to-br from-blue-600 to-blue-700 text-white h-12 w-12 flex items-center justify-center font-bold text-lg shadow-lg">CX</div>
              <div className="text-xl font-bold bg-gradient-to-r from-blue-600 to-blue-800 bg-clip-text text-transparent">Team Portal</div>
            </div>
          </div>
          
          <div className="flex-grow overflow-y-auto px-4 py-6 space-y-6">
            <div>
              <p className="text-xs font-bold text-gray-500 uppercase tracking-wider px-3 mb-3">Navigation</p>
              <ul className="space-y-2">
                <li>
                  <button 
                    className="w-full px-4 py-3 text-gray-600 font-medium hover:bg-gray-100 transition-colors flex items-center gap-3"
                    onClick={() => setCurrentPage('home')}
                  >
                    <Home className="w-5 h-5" />
                    Home
                  </button>
                </li>
                <li>
                  <button 
                    className="w-full px-4 py-3 bg-blue-50 text-blue-600 font-semibold flex items-center gap-3 border-r-4 border-blue-600"
                  >
                    <Clock className="w-5 h-5" />
                    RD-Redeployment
                  </button>
                </li>
                <li>
                  <button 
                    className="w-full px-4 py-3 text-gray-600 font-medium hover:bg-gray-100 transition-colors flex items-center gap-3"
                    onClick={() => setCurrentPage('rm')}
                  >
                    <BarChart2 className="w-5 h-5" />
                    Resource Management
                  </button>
                </li>
                <li>
                  <button 
                    className="w-full px-4 py-3 text-gray-600 font-medium hover:bg-gray-100 transition-colors flex items-center gap-3"
                    onClick={() => setCurrentPage('csm')}
                  >
                    <CheckCircle className="w-5 h-5" />
                    Customer Success
                  </button>
                </li>
              </ul>
            </div>
            
            <div>
              <p className="text-xs font-bold text-gray-500 uppercase tracking-wider px-3 mb-3">Quick Access</p>
              <ul className="space-y-2">
                <li>
                  <a href="#" className="block px-4 py-3 text-gray-600 font-medium hover:bg-gray-100 transition-colors flex items-center gap-3">
                    <Users className="w-5 h-5 text-gray-500" />
                    My Bench
                  </a>
                </li>
                <li>
                  <a href="#" className="block px-4 py-3 text-gray-600 font-medium hover:bg-gray-100 transition-colors flex items-center gap-3">
                    <AlertCircle className="w-5 h-5 text-gray-500" />
                    Urgent Requirements
                  </a>
                </li>
                <li>
                  <a href="#" className="block px-4 py-3 text-gray-600 font-medium hover:bg-gray-100 transition-colors flex items-center gap-3">
                    <Check className="w-5 h-5 text-gray-500" />
                    Recent Placements
                  </a>
                </li>
                <li>
                  <a href="#" className="block px-4 py-3 text-gray-600 font-medium hover:bg-gray-100 transition-colors flex items-center gap-3">
                    <FileBarChart2 className="w-5 h-5 text-gray-500" />
                    Analytics Dashboard
                  </a>
                </li>
              </ul>
            </div>
          </div>
          
          <div className="p-4 border-t border-gray-200">
            <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-4 border border-blue-200">
              <h4 className="font-semibold text-blue-700 mb-1">Need Help?</h4>
              <p className="text-sm text-blue-600 mb-3">Access support resources and documentation</p>
              <a href="#" className="text-sm font-semibold text-blue-700 hover:text-blue-800 flex items-center transition-colors">
                Learn More <ExternalLink className="w-4 h-4 ml-1" />
              </a>
            </div>
          </div>
        </div>
      </div>

      <div className={`flex-1 ${showSidebar ? 'md:ml-64' : ''} transition-all duration-300`}>
        {/* Header */}
        <header className={`sticky top-0 z-20 bg-white shadow-md transition-all duration-300 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-6'}`}>
          <div className="px-6 py-4 flex justify-between items-center">
            <div className="flex items-center gap-4">
              <button
                className="p-2 text-gray-600 hover:bg-gray-100 md:hidden transition-colors"
                onClick={() => setShowSidebar(!showSidebar)}
              >
                <Menu className="w-6 h-6" />
              </button>
              
              <h1 className="text-2xl font-bold text-gray-800">Redeployment Dashboard</h1>
            </div>
            
            <div className="flex items-center gap-4">
              <div className="relative">
                <button 
                  className="p-2 text-gray-600 hover:bg-gray-100 relative transition-colors"
                  onClick={() => setShowNotifications(!showNotifications)}
                >
                  <Bell className="w-6 h-6" />
                  <span className="absolute top-1 right-1 w-3 h-3 bg-red-500 animate-pulse"></span>
                </button>
                
                {/* Notifications dropdown */}
                {showNotifications && (
                  <div className="absolute right-0 mt-2 w-80 bg-white border border-gray-200 z-30 shadow-xl">
                    <div className="p-4 border-b border-gray-100 flex justify-between items-center">
                      <h3 className="font-bold text-gray-700">Notifications</h3>
                      <span className="text-xs text-blue-600 font-semibold cursor-pointer hover:text-blue-700">Mark all as read</span>
                    </div>
                    <div className="max-h-[400px] overflow-y-auto">
                      {notifications.map(notification => (
                        <div 
                          key={notification.id} 
                          className={`p-4 border-b border-gray-100 flex items-start transition-colors hover:bg-gray-50 ${notification.read ? '' : 'bg-blue-50'}`}
                        >
                          <div className={`flex-shrink-0 w-3 h-3 mt-2 ${
                            notification.type === 'requirement' ? 'bg-purple-500' :
                            notification.type === 'interview' ? 'bg-green-500' :
                            notification.type === 'update' ? 'bg-blue-500' : 'bg-yellow-500'
                          }`}></div>
                          <div className="ml-3 flex-grow">
                            <p className={`text-sm ${notification.read ? 'text-gray-600' : 'text-gray-800 font-semibold'}`}>
                              {notification.message}
                            </p>
                            <p className="text-xs text-gray-500 mt-1">{notification.time}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                    <div className="p-3 text-center border-t border-gray-100">
                      <a href="#" className="text-sm text-blue-600 font-semibold hover:text-blue-700">View all notifications</a>
                    </div>
                  </div>
                )}
              </div>
              
              <div className="relative">
                <button 
                  className="flex items-center gap-3 cursor-pointer hover:bg-gray-100 p-2 transition-colors"
                  onClick={() => setShowProfileDropdown(!showProfileDropdown)}
                >
                  <span className="text-gray-700 font-semibold hidden md:block">User Name</span>
                  <div className="h-10 w-10 bg-gradient-to-br from-gray-300 to-gray-400 flex items-center justify-center font-bold text-gray-600 border-2 border-gray-300">
                    UN
                  </div>
                </button>
                
                {/* Profile dropdown */}
                {showProfileDropdown && (
                  <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-200 z-30 shadow-xl">
                    <div className="p-3 border-b border-gray-100">
                      <p className="font-semibold text-gray-800">User Name</p>
                      <p className="text-xs text-gray-500">user.name@example.com</p>
                    </div>
                    <div className="py-2">
                      <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors">Your Profile</a>
                      <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors">Settings</a>
                      <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors">Help Center</a>
                    </div>
                    <div className="py-2 border-t border-gray-100">
                      <a href="#" className="block px-4 py-2 text-sm text-red-600 hover:bg-gray-100 transition-colors">Sign Out</a>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </header>

        <main className="flex-grow p-6">
          <div className={`transition-all duration-500 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            {/* Page header with stats */}
            <div className="mb-6 bg-white border border-gray-200 overflow-hidden shadow-sm">
              <div className="p-6">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                  <div>
                    <h2 className="text-2xl font-bold text-gray-800 mb-4">Redeployment Dashboard</h2>
                    <p className="text-gray-600 leading-relaxed">
                      Manage talent bench and track submissions to optimize resource allocation
                    </p>
                  </div>
                  
                  <div className="bg-gradient-to-br from-gray-50 to-gray-100 p-5 border border-gray-200">
                    <div className="flex justify-between items-start mb-3">
                      <p className="text-sm font-semibold text-gray-600">Active Candidates</p>
                      <span className="inline-flex items-center px-2 py-1 text-xs font-bold bg-green-100 text-green-800">
                        +12% ↗
                      </span>
                    </div>
                    <div className="flex items-baseline">
                      <span className="text-3xl font-bold text-gray-800">42</span>
                      <span className="ml-2 text-sm text-gray-500">of 57 total</span>
                    </div>
                  </div>
                  
                  <div className="bg-gradient-to-br from-gray-50 to-gray-100 p-5 border border-gray-200">
                    <div className="flex justify-between items-start mb-3">
                      <p className="text-sm font-semibold text-gray-600">Pending Submissions</p>
                      <span className="inline-flex items-center px-2 py-1 text-xs font-bold bg-yellow-100 text-yellow-800">
                        +3% ↗
                      </span>
                    </div>
                    <div className="flex items-baseline">
                      <span className="text-3xl font-bold text-gray-800">18</span>
                      <span className="ml-2 text-sm text-gray-500">in progress</span>
                    </div>
                  </div>
                  
                  <div className="bg-gradient-to-br from-gray-50 to-gray-100 p-5 border border-gray-200">
                    <div className="flex justify-between items-start mb-3">
                      <p className="text-sm font-semibold text-gray-600">Success Rate</p>
                      <span className="inline-flex items-center px-2 py-1 text-xs font-bold bg-blue-100 text-blue-800">
                        +5% ↗
                      </span>
                    </div>
                    <div className="flex items-baseline">
                      <span className="text-3xl font-bold text-gray-800">72%</span>
                      <span className="ml-2 text-sm text-gray-500">this month</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Actions Bar */}
            <div className="mb-6 flex flex-col md:flex-row justify-between gap-4">
              <div className="flex items-center gap-4">
                <button 
                  className="flex-shrink-0 px-6 py-3 bg-blue-600 text-white hover:bg-blue-700 transition-all duration-200 flex items-center gap-2 font-semibold shadow-lg hover:shadow-xl"
                  onClick={() => handleOpenForm(activeTab === 'talent-bench' ? 'talent' : 'submission')}
                >
                  <Plus className="w-5 h-5" />
                  <span>Add {activeTab === 'talent-bench' ? 'Candidate' : 'Submission'}</span>
                </button>
                
                <div className="flex items-center gap-3">
                  <button className="p-3 bg-white border-2 border-gray-300 text-gray-700 hover:bg-gray-50 transition-colors">
                    <Upload className="w-5 h-5" />
                  </button>
                  <button className="p-3 bg-white border-2 border-gray-300 text-gray-700 hover:bg-gray-50 transition-colors">
                    <Download className="w-5 h-5" />
                  </button>
                  <button className="p-3 bg-white border-2 border-gray-300 text-gray-700 hover:bg-gray-50 transition-colors">
                    <RefreshCw className="w-5 h-5" />
                  </button>
                </div>
              </div>
              
              <div className="flex items-center gap-4">
                <div className="relative flex-grow">
                  <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                  <input
                    type="text"
                    placeholder={`Search ${activeTab === 'talent-bench' ? 'candidates' : 'submissions'}...`}
                    className="w-full pl-12 pr-4 py-3 border-2 border-gray-300 focus:outline-none focus:border-blue-600 transition-colors"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
                
                <div className="flex gap-2 items-center">
                  <button 
                    className={`p-3 border-2 ${viewMode === 'table' ? 'bg-blue-50 border-blue-200 text-blue-600' : 'bg-white border-gray-300 text-gray-600'} transition-colors`}
                    onClick={() => setViewMode('table')}
                    title="Table View"
                  >
                    <List className="w-5 h-5" />
                  </button>
                  <button 
                    className={`p-3 border-2 ${viewMode === 'grid' ? 'bg-blue-50 border-blue-200 text-blue-600' : 'bg-white border-gray-300 text-gray-600'} transition-colors`}
                    onClick={() => setViewMode('grid')}
                    title="Grid View"
                  >
                    <Grid className="w-5 h-5" />
                  </button>
                </div>
                
                <button 
                  className="flex-shrink-0 px-4 py-3 bg-gray-100 text-gray-700 flex items-center gap-2 hover:bg-gray-200 transition-colors font-medium"
                  onClick={() => setShowFilters(true)}
                >
                  <Filter className="w-4 h-4" />
                  <span className="hidden md:inline">Filters</span>
                </button>
                
                <button className="flex-shrink-0 p-3 bg-gray-100 text-gray-700 hover:bg-gray-200 transition-colors">
                  <Settings className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Tabs */}
            <div className="bg-white border border-gray-200 mb-6 overflow-hidden shadow-sm">
              <div className="border-b border-gray-200">
                <div className="flex overflow-x-auto">
                  <button
                    className={`px-6 py-4 font-semibold flex items-center gap-2 transition-all duration-200 whitespace-nowrap border-b-4 ${
                      activeTab === 'talent-bench'
                        ? 'text-blue-600 border-blue-600 bg-blue-50'
                        : 'text-gray-600 hover:text-blue-600 border-transparent hover:bg-gray-50'
                    }`}
                    onClick={() => setActiveTab('talent-bench')}
                  >
                    <Users className="w-5 h-5" />
                    Talent Bench
                  </button>
                  <button
                    className={`px-6 py-4 font-semibold flex items-center gap-2 transition-all duration-200 whitespace-nowrap border-b-4 ${
                      activeTab === 'submissions'
                        ? 'text-blue-600 border-blue-600 bg-blue-50'
                        : 'text-gray-600 hover:text-blue-600 border-transparent hover:bg-gray-50'
                    }`}
                    onClick={() => setActiveTab('submissions')}
                  >
                    <Briefcase className="w-5 h-5" />
                    Submissions
                  </button>
                  <button
                    className={`px-6 py-4 font-semibold flex items-center gap-2 transition-all duration-200 whitespace-nowrap border-b-4 ${
                      activeTab === 'pen-status'
                        ? 'text-blue-600 border-blue-600 bg-blue-50'
                        : 'text-gray-600 hover:text-blue-600 border-transparent hover:bg-gray-50'
                    }`}
                    onClick={() => setActiveTab('pen-status')}
                  >
                    <Clock className="w-5 h-5" />
                    Pen Status
                  </button>
                  <button
                    className={`px-6 py-4 font-semibold flex items-center gap-2 transition-all duration-200 whitespace-nowrap border-b-4 ${
                      activeTab === 'closure-starts'
                        ? 'text-blue-600 border-blue-600 bg-blue-50'
                        : 'text-gray-600 hover:text-blue-600 border-transparent hover:bg-gray-50'
                    }`}
                    onClick={() => setActiveTab('closure-starts')}
                  >
                    <CheckCircle className="w-5 h-5" />
                    Closure & Starts
                  </button>
                </div>
              </div>

              {/* Content Area */}
              <div className="p-6">
                {/* Talent Bench Content */}
                {activeTab === 'talent-bench' && (
                  <>
                    {viewMode === 'table' ? (
                      <div className="overflow-x-auto">
                        <table className="min-w-full bg-white">
                          <thead className="bg-gray-100 text-gray-700 uppercase text-xs font-bold">
                            <tr>
                              <th className="py-4 px-4 text-left">S.No</th>
                              <th className="py-4 px-4 text-left">Candidate</th>
                              <th className="py-4 px-4 text-left">Profile Quality</th>
                              <th className="py-4 px-4 text-left">Roles</th>
                              <th className="py-4 px-4 text-left">Experience</th>
                              <th className="py-4 px-4 text-left">Location</th>
                              <th className="py-4 px-4 text-left">Skills</th>
                              <th className="py-4 px-4 text-left">Overdue Status</th>
                              <th className="py-4 px-4 text-left">Status</th>
                              <th className="py-4 px-4 text-left">Actions</th>
                            </tr>
                          </thead>
                          <tbody className="divide-y-2 divide-gray-100">
                            {filteredTalentData.map((candidate, index) => (
                              <tr 
                                key={candidate.id} 
                                className="hover:bg-blue-50 transition-all duration-200 cursor-pointer transform hover:scale-[1.01]"
                                onClick={() => handleCandidateClick(candidate)}
                              >
                                <td className="py-4 px-4 text-sm font-semibold">{index + 1}</td>
                                <td className="py-4 px-4">
                                  <div className="flex items-center gap-3">
                                    <div className="h-10 w-10 bg-blue-100 text-blue-600 flex items-center justify-center font-bold text-sm">
                                      {candidate.avatar}
                                    </div>
                                    <div>
                                      <p className="font-semibold text-gray-900">{candidate.candidateName}</p>
                                      <p className="text-xs text-gray-500">{candidate.emailId}</p>
                                    </div>
                                  </div>
                                </td>
                                <td className="py-4 px-4 text-sm">
                                  <span className={`px-3 py-1 text-xs font-bold ${
                                    candidate.profileQuality === 'High' ? 'bg-green-100 text-green-800' :
                                    candidate.profileQuality === 'Medium' ? 'bg-yellow-100 text-yellow-800' :
                                    'bg-gray-100 text-gray-800'
                                  }`}>
                                    {candidate.profileQuality}
                                  </span>
                                </td>
                                <td className="py-4 px-4 text-sm font-medium">{candidate.roles}</td>
                                <td className="py-4 px-4 text-sm font-medium">{candidate.experience}</td>
                                <td className="py-4 px-4 text-sm">{`${candidate.city}, ${candidate.state}`}</td>
                                <td className="py-4 px-4">
                                  <div className="flex flex-wrap gap-1">
                                    {candidate.primarySkills.split(',').slice(0, 2).map((skill, i) => (
                                      <span key={i} className="px-2 py-1 bg-blue-50 text-blue-700 text-xs whitespace-nowrap font-medium">
                                        {skill.trim()}
                                      </span>
                                    ))}
                                    {candidate.primarySkills.split(',').length > 2 && (
                                      <span className="px-2 py-1 bg-gray-50 text-gray-500 text-xs whitespace-nowrap font-medium">
                                        +{candidate.primarySkills.split(',').length - 2}
                                      </span>
                                    )}
                                  </div>
                                </td>
                                <td className="py-4 px-4">
                                  <div className="flex items-center">
                                    {candidate.overdueStatus === 'On Track' && (
                                      <span className="px-3 py-1 bg-green-100 text-green-800 text-xs font-bold flex items-center gap-2">
                                        <span className="w-2 h-2 bg-green-500"></span>
                                        On Track
                                      </span>
                                    )}
                                    {candidate.overdueStatus === 'Due Soon' && (
                                      <span className="px-3 py-1 bg-yellow-100 text-yellow-800 text-xs font-bold flex items-center gap-2">
                                        <span className="w-2 h-2 bg-yellow-500"></span>
                                        Due Soon (3 days)
                                      </span>
                                    )}
                                    {candidate.overdueStatus === 'Overdue' && (
                                      <span className="px-3 py-1 bg-red-100 text-red-800 text-xs font-bold flex items-center gap-2">
                                        <span className="w-2 h-2 bg-red-500"></span>
                                        Overdue (5 days)
                                      </span>
                                    )}
                                    {candidate.overdueStatus === 'Critical' && (
                                      <span className="px-3 py-1 bg-red-100 text-red-800 text-xs font-bold flex items-center gap-2 border-2 border-red-300">
                                        <span className="w-2 h-2 bg-red-500 animate-pulse"></span>
                                        Critical (14+ days)
                                      </span>
                                    )}
                                  </div>
                                </td>
                                <td className="py-4 px-4 text-sm">
                                  <span className={`px-3 py-1 text-xs font-bold ${
                                    candidate.benchStatus === 'Active' ? 'bg-blue-100 text-blue-800' : 'bg-red-100 text-red-800'
                                  }`}>
                                    {candidate.benchStatus}
                                  </span>
                                </td>
                                <td className="py-4 px-4">
                                  <div className="flex items-center space-x-2">
                                    <button 
                                      className="p-2 text-gray-500 hover:text-blue-600 transition-colors hover:bg-blue-50"
                                      onClick={(e) => {
                                        e.stopPropagation();
                                        handleCandidateClick(candidate);
                                      }}
                                    >
                                      <Eye className="w-4 h-4" />
                                    </button>
                                    <button 
                                      className="p-2 text-gray-500 hover:text-blue-600 transition-colors hover:bg-blue-50"
                                      onClick={(e) => {
                                        e.stopPropagation();
                                        handleEditCandidate(candidate);
                                      }}
                                    >
                                      <Edit className="w-4 h-4" />
                                    </button>
                                    <button 
                                      className="p-2 text-gray-500 hover:text-red-600 transition-colors hover:bg-red-50"
                                      onClick={(e) => {
                                        e.stopPropagation();
                                        // Delete functionality
                                      }}
                                    >
                                      <Trash2 className="w-4 h-4" />
                                    </button>
                                  </div>
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    ) : (
                      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                        {filteredTalentData.map(candidate => (
                          <CandidateCard key={candidate.id} candidate={candidate} />
                        ))}
                      </div>
                    )}
                    
                    {filteredTalentData.length === 0 && (
                      <div className="text-center p-12">
                        <div className="flex justify-center mb-6">
                          <AlertCircle className="w-16 h-16 text-gray-400" />
                        </div>
                        <h3 className="text-xl font-bold text-gray-700 mb-3">No candidates found</h3>
                        <p className="text-gray-500 mb-6">Try adjusting your search or filter to find what you're looking for.</p>
                        <button 
                          className="px-6 py-3 bg-blue-600 text-white hover:bg-blue-700 transition-colors font-semibold shadow-lg"
                          onClick={() => handleOpenForm('talent')}
                        >
                          Add New Candidate
                        </button>
                      </div>
                    )}
                  </>
                )}
                
                {/* Submissions Table */}
                {activeTab === 'submissions' && (
                  <>
                    <div className="overflow-x-auto">
                      <table className="min-w-full bg-white">
                        <thead className="bg-gray-100 text-gray-700 uppercase text-xs font-bold">
                          <tr>
                            <th className="py-4 px-4 text-left">S.No</th>
                            <th className="py-4 px-4 text-left">Consultant</th>
                            <th className="py-4 px-4 text-left">Role</th>
                            <th className="py-4 px-4 text-left">Client</th>
                            <th className="py-4 px-4 text-left">Date Added</th>
                            <th className="py-4 px-4 text-left">Rate</th>
                            <th className="py-4 px-4 text-left">Priority</th>
                            <th className="py-4 px-4 text-left">Progress</th>
                            <th className="py-4 px-4 text-left">Status</th>
                            <th className="py-4 px-4 text-left">Actions</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y-2 divide-gray-100">
                          {filteredSubmissionsData.map((submission, index) => (
                            <tr key={submission.id} className="hover:bg-blue-50 transition-all duration-200 transform hover:scale-[1.01]">
                              <td className="py-4 px-4 text-sm font-semibold">{index + 1}</td>
                              <td className="py-4 px-4 text-sm font-bold">{submission.consultant}</td>
                              <td className="py-4 px-4 text-sm font-medium">{submission.role}</td>
                              <td className="py-4 px-4">
                                <div>
                                  <p className="text-sm font-medium">{submission.client}</p>
                                  <p className="text-xs text-gray-500">End Client: {submission.endClient}</p>
                                </div>
                              </td>
                              <td className="py-4 px-4 text-sm">{submission.dateAdded}</td>
                              <td className="py-4 px-4 text-sm font-bold text-green-600">{submission.candidateRate}</td>
                              <td className="py-4 px-4 text-sm">
                                <span className={`px-3 py-1 text-xs font-bold ${
                                  submission.priority === 'High' ? 'bg-red-100 text-red-800' :
                                  submission.priority === 'Medium' ? 'bg-yellow-100 text-yellow-800' :
                                  'bg-green-100 text-green-800'
                                }`}>
                                  {submission.priority}
                                </span>
                              </td>
                              <td className="py-4 px-4">
                                <div className="w-full bg-gray-200 h-3">
                                  <div 
                                    className={`h-3 transition-all duration-300 ${
                                      submission.progress >= 80 ? 'bg-green-500' :
                                      submission.progress >= 40 ? 'bg-blue-500' :
                                      'bg-yellow-500'
                                    }`}
                                    style={{ width: `${submission.progress}%` }}
                                  ></div>
                                </div>
                                <p className="text-xs text-gray-500 mt-1 font-medium">{submission.lastActivity}</p>
                              </td>
                              <td className="py-4 px-4 text-sm">
                                <span className={`px-3 py-1 text-xs font-bold ${
                                  submission.submissionStatus === 'Pending' ? 'bg-yellow-100 text-yellow-800' :
                                  submission.submissionStatus === 'Interview' ? 'bg-blue-100 text-blue-800' :
                                  submission.submissionStatus === 'Closed' ? 'bg-green-100 text-green-800' :
                                  'bg-gray-100 text-gray-800'
                                }`}>
                                  {submission.submissionStatus}
                                </span>
                              </td>
                              <td className="py-4 px-4">
                                <div className="flex items-center space-x-2">
                                  <button 
                                    className="p-2 text-gray-500 hover:text-blue-600 transition-colors hover:bg-blue-50"
                                    onClick={(e) => {
                                      e.stopPropagation();
                                      // View functionality
                                    }}
                                  >
                                    <Eye className="w-4 h-4" />
                                  </button>
                                  <button 
                                    className="p-2 text-gray-500 hover:text-blue-600 transition-colors hover:bg-blue-50"
                                    onClick={(e) => {
                                      e.stopPropagation();
                                      handleEditSubmission(submission);
                                    }}
                                  >
                                    <Edit className="w-4 h-4" />
                                  </button>
                                  <button 
                                    className="p-2 text-gray-500 hover:text-red-600 transition-colors hover:bg-red-50"
                                    onClick={(e) => {
                                      e.stopPropagation();
                                      // Delete functionality
                                    }}
                                  >
                                    <Trash2 className="w-4 h-4" />
                                  </button>
                                </div>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                    
                    {filteredSubmissionsData.length === 0 && (
                      <div className="text-center p-12">
                        <div className="flex justify-center mb-6">
                          <AlertCircle className="w-16 h-16 text-gray-400" />
                        </div>
                        <h3 className="text-xl font-bold text-gray-700 mb-3">No submissions found</h3>
                        <p className="text-gray-500 mb-6">Try adjusting your search or filter to find what you're looking for.</p>
                        <button 
                          className="px-6 py-3 bg-blue-600 text-white hover:bg-blue-700 transition-colors font-semibold shadow-lg"
                          onClick={() => handleOpenForm('submission')}
                        >
                          Add New Submission
                        </button>
                      </div>
                    )}
                  </>
                )}
                
                {/* Pen Status Tab */}
                {activeTab === 'pen-status' && (
                  <>
                    {penStatusData.length === 0 && (
                      <div className="bg-white border-2 border-gray-200 p-8 mb-6">
                        <h3 className="text-2xl font-bold text-gray-800 mb-4">Pen Status Management</h3>
                        <p className="text-gray-600 mb-8 text-lg">Upload and manage candidate data from the CE Helpdesk Team</p>
                        
                        <div className="flex flex-col lg:flex-row gap-8">
                          <div 
                            className="flex-1 border-4 border-dashed border-gray-300 p-12 flex flex-col items-center justify-center bg-gray-50 hover:bg-gray-100 transition-colors cursor-pointer" 
                            onClick={triggerFileInput}
                          >
                            <Upload className="w-16 h-16 text-blue-600 mb-6" />
                            <h4 className="text-xl font-bold text-gray-800 mb-3">Upload Excel File</h4>
                            <p className="text-gray-500 text-center mb-6 leading-relaxed">
                              Drag and drop or click to upload the CE Helpdesk Excel sheet
                            </p>
                            <input 
                              type="file" 
                              accept=".xlsx,.xls" 
                              className="hidden" 
                              ref={fileInputRef} 
                              onChange={handleFileUpload}
                            />
                            <button className="px-6 py-3 bg-blue-600 text-white hover:bg-blue-700 transition-colors flex items-center gap-2 font-semibold shadow-lg">
                              <FileText className="w-5 h-5" /> Select File
                            </button>
                          </div>
                          
                          <div className="flex-1 p-8 border-2 border-gray-200">
                            <h4 className="text-xl font-bold text-gray-800 mb-6">Expected Columns</h4>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm">
                              {[
                                'Month', 'Date Sent from CE Helpdesk Team', 'Consultant', 'Contractor',
                                'End Date', 'Project Status', 'Contacts', 'Emails', 'Job Title',
                                'Primary Skill', 'Secondary Skill', 'Client', 'End Client'
                              ].map((column, index) => (
                                <div key={index} className="px-4 py-2 bg-gray-100 font-medium border border-gray-200">{column}</div>
                              ))}
                            </div>
                          </div>
                        </div>
                        
                        {/* Upload Status Messages */}
                        {isUploading && (
                          <div className="mt-6 p-4 bg-blue-50 text-blue-700 flex items-center gap-3 border border-blue-200">
                            <RefreshCw className="w-6 h-6 animate-spin" />
                            <span className="font-semibold">Processing your Excel file...</span>
                          </div>
                        )}
                        
                        {uploadSuccess && (
                          <div className="mt-6 p-4 bg-green-50 text-green-700 flex items-center gap-3 border border-green-200">
                            <CheckCircle className="w-6 h-6" />
                            <span className="font-semibold">Successfully imported {penStatusData.length} records!</span>
                          </div>
                        )}
                        
                        {uploadError && (
                          <div className="mt-6 p-4 bg-red-50 text-red-700 flex items-center gap-3 border border-red-200">
                            <AlertTriangle className="w-6 h-6" />
                            <span className="font-semibold">{uploadError}</span>
                          </div>
                        )}
                      </div>
                    )}
                    
                    {penStatusData.length > 0 && (
                      <div className="overflow-x-auto">
                        <div className="mb-4 flex flex-col md:flex-row justify-between gap-4">
                          <div className="flex items-center gap-4">
                            <button 
                              className="flex-shrink-0 px-4 py-2 bg-blue-600 text-white shadow-sm hover:bg-blue-700 transition-colors flex items-center gap-2"
                              onClick={triggerFileInput}
                            >
                              <Upload className="w-5 h-5" />
                              <span>Upload New File</span>
                            </button>
                            <input 
                              type="file" 
                              accept=".xlsx,.xls" 
                              className="hidden" 
                              ref={fileInputRef} 
                              onChange={handleFileUpload}
                            />
                            
                            <div className="flex items-center gap-3">
                              <button className="p-2 bg-white border border-gray-300 text-gray-700 hover:bg-gray-50 transition-colors">
                                <Download className="w-5 h-5" />
                              </button>
                              <button 
                                className="p-2 bg-white border border-gray-300 text-gray-700 hover:bg-gray-50 transition-colors"
                                onClick={() => {
                                  setPenStatusData([]);
                                  setFilteredPenStatusData([]);
                                  setUploadSuccess(false);
                                }}
                              >
                                <RefreshCw className="w-5 h-5" />
                              </button>
                            </div>
                          </div>
                          
                          <div className="flex flex-wrap gap-3">
                            <select 
                              className="px-3 py-2 border border-gray-300 focus:outline-none focus:border-blue-600"
                              value={selectedMonth}
                              onChange={(e) => setSelectedMonth(e.target.value)}
                            >
                              <option value="All">All Months</option>
                              {getUniqueValues('Month').map((month, index) => (
                                <option key={index} value={month}>{month}</option>
                              ))}
                            </select>
                            
                            <select 
                              className="px-3 py-2 border border-gray-300 focus:outline-none focus:border-blue-600"
                              value={selectedProjectStatus}
                              onChange={(e) => setSelectedProjectStatus(e.target.value)}
                            >
                              <option value="All">All Statuses</option>
                              {getUniqueValues('Project Status').map((status, index) => (
                                <option key={index} value={status}>{status}</option>
                              ))}
                            </select>
                            
                            <select 
                              className="px-3 py-2 border border-gray-300 focus:outline-none focus:border-blue-600"
                              value={selectedBenchStatus}
                              onChange={(e) => setSelectedBenchStatus(e.target.value)}
                            >
                              <option value="All">All Bench Status</option>
                              <option value="Added to Bench">Added to Bench</option>
                              <option value="Not Added">Not Added</option>
                            </select>
                          </div>
                        </div>
                        
                        <table className="min-w-full bg-white overflow-hidden">
                          <thead className="bg-gray-50 text-gray-700 uppercase text-xs">
                            <tr>
                              <th className="py-3 px-4 text-left">Month</th>
                              <th className="py-3 px-4 text-left">Date Sent</th>
                              <th className="py-3 px-4 text-left">Consultant</th>
                              <th className="py-3 px-4 text-left">Job Title</th>
                              <th className="py-3 px-4 text-left">Skills</th>
                              <th className="py-3 px-4 text-left">Client</th>
                              <th className="py-3 px-4 text-left">End Date</th>
                              <th className="py-3 px-4 text-left">Project Status</th>
                              <th className="py-3 px-4 text-left">Bench Status</th>
                              <th className="py-3 px-4 text-left">Last Contact</th>
                              <th className="py-3 px-4 text-left">Actions</th>
                            </tr>
                          </thead>
                          <tbody className="divide-y divide-gray-200">
                            {filteredPenStatusData.map((item, index) => (
                              <tr key={index} className="hover:bg-gray-50 transition-colors">
                                <td className="py-3 px-4 text-sm">{item.Month || '-'}</td>
                                <td className="py-3 px-4 text-sm">
                                  {item['Date Sent from CE Helpdesk Team'] ? 
                                    (typeof item['Date Sent from CE Helpdesk Team'] === 'string' ? 
                                      item['Date Sent from CE Helpdesk Team'] : 
                                      new Date(item['Date Sent from CE Helpdesk Team']).toLocaleDateString()) 
                                    : '-'}
                                </td>
                                <td className="py-3 px-4">
                                  <div>
                                    <p className="font-medium text-gray-900">{item.Consultant || '-'}</p>
                                    <p className="text-xs text-gray-500">{item.Emails || '-'}</p>
                                  </div>
                                </td>
                                <td className="py-3 px-4 text-sm">{item.JobTitle || '-'}</td>
                                <td className="py-3 px-4">
                                  <div className="flex flex-wrap gap-1">
                                    {item['Primary Skill'] && (
                                      <span className="px-2 py-1 bg-blue-50 text-blue-700 text-xs">
                                        {item['Primary Skill']}
                                      </span>
                                    )}
                                    {item['Secondary Skill'] && (
                                      <span className="px-2 py-1 bg-gray-50 text-gray-700 text-xs">
                                        {item['Secondary Skill']}
                                      </span>
                                    )}
                                  </div>
                                </td>
                                <td className="py-3 px-4">
                                  <div>
                                    <p className="text-sm">{item.Client || '-'}</p>
                                    {item['End Client'] && (
                                      <p className="text-xs text-gray-500">End: {item['End Client']}</p>
                                    )}
                                  </div>
                                </td>
                                <td className="py-3 px-4 text-sm">
                                  {item['End Date'] ? 
                                    (typeof item['End Date'] === 'string' ? 
                                      item['End Date'] : 
                                      new Date(item['End Date']).toLocaleDateString()) 
                                    : '-'}
                                </td>
                                <td className="py-3 px-4 text-sm">
                                  <span className={`px-2 py-1 text-xs font-medium ${
                                    item['Project Status'] === 'Active' ? 'bg-green-100 text-green-800' :
                                    item['Project Status'] === 'Ending Soon' ? 'bg-yellow-100 text-yellow-800' :
                                    item['Project Status'] === 'Ended' ? 'bg-red-100 text-red-800' :
                                    'bg-gray-100 text-gray-800'
                                  }`}>
                                    {item['Project Status'] || 'Unknown'}
                                  </span>
                                </td>
                                <td className="py-3 px-4 text-sm">
                                  <span className={`px-2 py-1 text-xs font-medium ${
                                    item['Added to Bench / Not Added'] === true || 
                                    item['Added to Bench / Not Added'] === 'Yes' ||
                                    item['Added to Bench / Not Added'] === 'true'
                                      ? 'bg-blue-100 text-blue-800' 
                                      : 'bg-gray-100 text-gray-800'
                                  }`}>
                                    {item['Added to Bench / Not Added'] === true || 
                                     item['Added to Bench / Not Added'] === 'Yes' ||
                                     item['Added to Bench / Not Added'] === 'true'
                                      ? 'Added to Bench' 
                                      : 'Not Added'}
                                  </span>
                                </td>
                                <td className="py-3 px-4 text-sm">
                                  <div>
                                    <p className="text-xs">{item['Last Spoken By'] || '-'}</p>
                                    <p className="text-xs text-gray-500">
                                      {item['Last Spoken Date'] ? 
                                        (typeof item['Last Spoken Date'] === 'string' ? 
                                          item['Last Spoken Date'] : 
                                          new Date(item['Last Spoken Date']).toLocaleDateString()) 
                                        : '-'}
                                    </p>
                                  </div>
                                </td>
                                <td className="py-3 px-4">
                                  <div className="flex items-center space-x-2">
                                    <button className="p-1.5 text-gray-500 hover:text-blue-600 transition-colors">
                                      <Edit className="w-4 h-4" />
                                    </button>
                                    <button className="p-1.5 text-gray-500 hover:text-red-600 transition-colors">
                                      <Trash2 className="w-4 h-4" />
                                    </button>
                                  </div>
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                        
                        {filteredPenStatusData.length === 0 && penStatusData.length > 0 && (
                          <div className="text-center p-8">
                            <div className="flex justify-center mb-4">
                              <AlertCircle className="w-12 h-12 text-gray-400" />
                            </div>
                            <h3 className="text-lg font-medium text-gray-700 mb-2">No matching records found</h3>
                            <p className="text-gray-500 mb-4">Try adjusting your search or filters to find what you're looking for.</p>
                            <button 
                              className="px-4 py-2 bg-gray-100 text-gray-700 hover:bg-gray-200 transition-colors"
                              onClick={() => {
                                setSearchTerm('');
                                setSelectedMonth('All');
                                setSelectedProjectStatus('All');
                                setSelectedBenchStatus('All');
                              }}
                            >
                              Clear Filters
                            </button>
                          </div>
                        )}
                        
                        <div className="mt-4 text-sm text-gray-500">
                          Showing {filteredPenStatusData.length} of {penStatusData.length} records
                        </div>
                      </div>
                    )}
                  </>
                )}
                
                {/* Closure & Starts Tab */}
                {activeTab === 'closure-starts' && (
                  <>
                    {closureStartsData.length === 0 && (
                      <div className="bg-white border-2 border-gray-200 p-8 mb-6">
                        <h3 className="text-2xl font-bold text-gray-800 mb-4">Closure & Starts Management</h3>
                        <p className="text-gray-600 mb-8 text-lg">Upload and manage closure and start data</p>
                        
                        <div className="flex flex-col lg:flex-row gap-8">
                          <div 
                            className="flex-1 border-4 border-dashed border-gray-300 p-12 flex flex-col items-center justify-center bg-gray-50 hover:bg-gray-100 transition-colors cursor-pointer" 
                            onClick={triggerClosureFileInput}
                          >
                            <Upload className="w-16 h-16 text-blue-600 mb-6" />
                            <h4 className="text-xl font-bold text-gray-800 mb-3">Upload Excel File</h4>
                            <p className="text-gray-500 text-center mb-6 leading-relaxed">
                              Drag and drop or click to upload the Closure & Starts Excel sheet
                            </p>
                            <input 
                              type="file" 
                              accept=".xlsx,.xls" 
                              className="hidden" 
                              ref={closureFileInputRef} 
                              onChange={handleClosureFileUpload}
                            />
                            <button className="px-6 py-3 bg-blue-600 text-white hover:bg-blue-700 transition-colors flex items-center gap-2 font-semibold shadow-lg">
                              <FileText className="w-5 h-5" /> Select File
                            </button>
                          </div>
                          
                          <div className="flex-1 p-8 border-2 border-gray-200">
                            <h4 className="text-xl font-bold text-gray-800 mb-6">Expected Columns</h4>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm">
                              {[
                                'Sector', 'Year', 'Month', 'Start Date', 'End Date', 'Status',
                                'Reason', 'Placement Code', 'Candidate Name', 'Job Title', 'Job Location', 'GEO'
                              ].map((column, index) => (
                                <div key={index} className="px-4 py-2 bg-gray-100 font-medium border border-gray-200">{column}</div>
                              ))}
                            </div>
                          </div>
                        </div>
                        
                        {/* Upload Status Messages */}
                        {isClosureUploading && (
                          <div className="mt-6 p-4 bg-blue-50 text-blue-700 flex items-center gap-3 border border-blue-200">
                            <RefreshCw className="w-6 h-6 animate-spin" />
                            <span className="font-semibold">Processing your Excel file...</span>
                          </div>
                        )}
                        
                        {closureUploadSuccess && (
                          <div className="mt-6 p-4 bg-green-50 text-green-700 flex items-center gap-3 border border-green-200">
                            <CheckCircle className="w-6 h-6" />
                            <span className="font-semibold">Successfully imported {closureStartsData.length} records!</span>
                          </div>
                        )}
                        
                        {closureUploadError && (
                          <div className="mt-6 p-4 bg-red-50 text-red-700 flex items-center gap-3 border border-red-200">
                            <AlertTriangle className="w-6 h-6" />
                            <span className="font-semibold">{closureUploadError}</span>
                          </div>
                        )}
                      </div>
                    )}
                    
                    {closureStartsData.length > 0 && (
                      <div className="overflow-x-auto">
                        <div className="mb-4 flex flex-col md:flex-row justify-between gap-4">
                          <div className="flex items-center gap-4">
                            <button 
                              className="flex-shrink-0 px-4 py-2 bg-blue-600 text-white shadow-sm hover:bg-blue-700 transition-colors flex items-center gap-2"
                              onClick={triggerClosureFileInput}
                            >
                              <Upload className="w-5 h-5" />
                              <span>Upload New File</span>
                            </button>
                            <input 
                              type="file" 
                              accept=".xlsx,.xls" 
                              className="hidden" 
                              ref={closureFileInputRef} 
                              onChange={handleClosureFileUpload}
                            />
                            
                            <div className="flex items-center gap-3">
                              <button className="p-2 bg-white border border-gray-300 text-gray-700 hover:bg-gray-50 transition-colors">
                                <Download className="w-5 h-5" />
                              </button>
                              <button 
                                className="p-2 bg-white border border-gray-300 text-gray-700 hover:bg-gray-50 transition-colors"
                                onClick={() => {
                                  setClosureStartsData([]);
                                  setFilteredClosureStartsData([]);
                                  setClosureUploadSuccess(false);
                                }}
                              >
                                <RefreshCw className="w-5 h-5" />
                              </button>
                            </div>
                          </div>
                          
                          <div className="flex flex-wrap gap-3">
                            <select 
                              className="px-3 py-2 border border-gray-300 focus:outline-none focus:border-blue-600"
                              value={selectedSector}
                              onChange={(e) => setSelectedSector(e.target.value)}
                            >
                              <option value="All">All Sectors</option>
                              {getUniqueClosureValues('Sector').map((sector, index) => (
                                <option key={index} value={sector}>{sector}</option>
                              ))}
                            </select>
                            
                            <select 
                              className="px-3 py-2 border border-gray-300 focus:outline-none focus:border-blue-600"
                              value={selectedStatus}
                              onChange={(e) => setSelectedStatus(e.target.value)}
                            >
                              <option value="All">All Status</option>
                              {getUniqueClosureValues('Status').map((status, index) => (
                                <option key={index} value={status}>{status}</option>
                              ))}
                            </select>
                          </div>
                        </div>
                        
                        <table className="min-w-full bg-white overflow-hidden">
                          <thead className="bg-gray-50 text-gray-700 uppercase text-xs">
                            <tr>
                              <th className="py-3 px-4 text-left">Sector</th>
                              <th className="py-3 px-4 text-left">Year/Month</th>
                              <th className="py-3 px-4 text-left">Start Date</th>
                              <th className="py-3 px-4 text-left">End Date</th>
                              <th className="py-3 px-4 text-left">Status</th>
                              <th className="py-3 px-4 text-left">Candidate Name</th>
                              <th className="py-3 px-4 text-left">Job Title</th>
                              <th className="py-3 px-4 text-left">Client</th>
                              <th className="py-3 px-4 text-left">Deal Type</th>
                              <th className="py-3 px-4 text-left">Margin</th>
                              <th className="py-3 px-4 text-left">Actions</th>
                            </tr>
                          </thead>
                          <tbody className="divide-y divide-gray-200">
                            {filteredClosureStartsData.map((item, index) => (
                              <tr key={index} className="hover:bg-gray-50 transition-colors">
                                <td className="py-3 px-4 text-sm">{item.Sector || '-'}</td>
                                <td className="py-3 px-4 text-sm">{`${item.Year || '-'}/${item.Month || '-'}`}</td>
                                <td className="py-3 px-4 text-sm">
                                  {item['Start Date'] ? 
                                    (typeof item['Start Date'] === 'string' ? 
                                      item['Start Date'] : 
                                      new Date(item['Start Date']).toLocaleDateString()) 
                                    : '-'}
                                </td>
                                <td className="py-3 px-4 text-sm">
                                  {item['End Date'] ? 
                                    (typeof item['End Date'] === 'string' ? 
                                      item['End Date'] : 
                                      new Date(item['End Date']).toLocaleDateString()) 
                                    : '-'}
                                </td>
                                <td className="py-3 px-4 text-sm">
                                  <span className={`px-2 py-1 text-xs font-medium ${
                                    item.Status === 'Active' ? 'bg-green-100 text-green-800' :
                                    item.Status === 'Pending' ? 'bg-yellow-100 text-yellow-800' :
                                    item.Status === 'Closed' ? 'bg-blue-100 text-blue-800' :
                                    'bg-gray-100 text-gray-800'
                                  }`}>
                                    {item.Status || 'Unknown'}
                                  </span>
                                </td>
                                <td className="py-3 px-4">
                                  <div>
                                    <p className="font-medium text-gray-900">{item['Candidate Name'] || '-'}</p>
                                    <p className="text-xs text-gray-500">{item['Placement Code'] || '-'}</p>
                                  </div>
                                </td>
                                <td className="py-3 px-4 text-sm">{item['Job Title'] || '-'}</td>
                                <td className="py-3 px-4">
                                  <div>
                                    <p className="text-sm">{item.Client || '-'}</p>
                                    {item['End Client'] && (
                                      <p className="text-xs text-gray-500">End: {item['End Client']}</p>
                                    )}
                                  </div>
                                </td>
                                <td className="py-3 px-4 text-sm">{item['Deal Type'] || '-'}</td>
                                <td className="py-3 px-4 text-sm">
                                  {item['Margin (Closure Floor report)'] ? 
                                    `${item['Margin (Closure Floor report)']}%` : '-'}
                                </td>
                                <td className="py-3 px-4">
                                  <div className="flex items-center space-x-2">
                                    <button className="p-1.5 text-gray-500 hover:text-blue-600 transition-colors">
                                      <Eye className="w-4 h-4" />
                                    </button>
                                    <button className="p-1.5 text-gray-500 hover:text-blue-600 transition-colors">
                                      <Edit className="w-4 h-4" />
                                    </button>
                                    <button className="p-1.5 text-gray-500 hover:text-red-600 transition-colors">
                                      <Trash2 className="w-4 h-4" />
                                    </button>
                                  </div>
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                        
                        {filteredClosureStartsData.length === 0 && closureStartsData.length > 0 && (
                          <div className="text-center p-8">
                            <div className="flex justify-center mb-4">
                              <AlertCircle className="w-12 h-12 text-gray-400" />
                            </div>
                            <h3 className="text-lg font-medium text-gray-700 mb-2">No matching records found</h3>
                            <p className="text-gray-500 mb-4">Try adjusting your search or filters to find what you're looking for.</p>
                            <button 
                              className="px-4 py-2 bg-gray-100 text-gray-700 hover:bg-gray-200 transition-colors"
                              onClick={() => {
                                setSearchTerm('');
                                setSelectedSector('All');
                                setSelectedStatus('All');
                              }}
                            >
                              Clear Filters
                            </button>
                          </div>
                        )}
                        
                        <div className="mt-4 text-sm text-gray-500">
                          Showing {filteredClosureStartsData.length} of {closureStartsData.length} records
                        </div>
                      </div>
                    )}
                  </>
                )}
              </div>
            </div>
          </div>
        </main>
      </div>
      
      {/* Add/Edit Form Modal */}
      {showForm && (
        <div className="fixed inset-0 z-50 overflow-hidden bg-gray-900 bg-opacity-60 flex items-center justify-center">
          <div className="bg-white max-w-4xl w-full max-h-[90vh] overflow-auto animate-fadeIn shadow-2xl">
            <div className="sticky top-0 bg-white p-6 border-b-2 border-gray-200 flex justify-between items-center z-10">
              <h2 className="text-2xl font-bold text-gray-800">
                {formType === 'talent' ? 'Add Candidate to Talent Bench' : 'Add New Submission'}
              </h2>
              <button 
                className="text-gray-500 hover:text-gray-700 transition-colors"
                onClick={handleCloseForm}
              >
                <X className="w-8 h-8" />
              </button>
            </div>
            
            <div className="p-6">
              {formType === 'talent' ? <TalentBenchForm /> : <SubmissionsForm />}
            </div>
          </div>
        </div>
      )}
      
      {/* Candidate Details Modal */}
      {selectedCandidateDetails && (
        <CandidateDetailsView 
          candidate={selectedCandidateDetails}
          onClose={closeDetails}
        />
      )}
      
      {/* Filter Panel */}
      <FilterPanel />

      {/* Enhanced CSS for animations and styling */}
      <style jsx global>{`
        body {
          font-family: 'Montserrat', sans-serif !important;
        }
        
        .animate-fadeIn {
          animation: fadeIn 0.4s ease-out;
        }
        
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        /* Enhanced scrollbar styling */
        ::-webkit-scrollbar {
          width: 8px;
          height: 8px;
        }
        
        ::-webkit-scrollbar-track {
          background: #f1f5f9;
        }
        
        ::-webkit-scrollbar-thumb {
          background: #cbd5e1;
          border: 2px solid #f1f5f9;
        }
        
        ::-webkit-scrollbar-thumb:hover {
          background: #94a3b8;
        }
        
        /* Custom focus styles without border radius */
        .custom-focus:focus {
          outline: none;
          border-color: #2563eb;
          box-shadow: 0 0 0 4px rgba(37, 99, 235, 0.15);
        }
        
        /* Table hover enhancements */
        tbody tr:hover {
          background-color: #eff6ff;
          transform: translateY(-2px);
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
          transition: all 0.2s ease;
        }
        
        /* Button hover enhancements */
        button {
          transition: all 0.2s ease;
        }
        
        button:hover {
          transform: translateY(-1px);
        }
        
        button:active {
          transform: translateY(0);
        }
        
        /* Enhanced shadows and depth */
        .enhanced-shadow {
          box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
        }
        
        .enhanced-shadow:hover {
          box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04);
        }
        
        /* Gradient backgrounds */
        .gradient-bg {
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
        }
        
        /* Card animations */
        .card-hover {
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        }
        
        .card-hover:hover {
          transform: translateY(-4px) scale(1.02);
          box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1);
        }
        
        /* Pulse animation for critical status */
        @keyframes pulse {
          0%, 100% {
            opacity: 1;
          }
          50% {
            opacity: 0.5;
          }
        }
        
        .animate-pulse {
          animation: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
        }
        
        /* Enhanced border styles */
        .border-b-3 {
          border-bottom-width: 3px;
        }
        
        .border-b-4 {
          border-bottom-width: 4px;
        }
        
        /* Loading states */
        .loading-shimmer {
          background: linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%);
          background-size: 200% 100%;
          animation: shimmer 2s infinite;
        }
        
        @keyframes shimmer {
          0% {
            background-position: -200% 0;
          }
          100% {
            background-position: 200% 0;
          }
        }
        
        /* Form enhancements */
        input:focus, textarea:focus, select:focus {
          outline: none;
          border-color: #2563eb;
          box-shadow: 0 0 0 3px rgba(37, 99, 235, 0.1);
          transform: scale(1.02);
          transition: all 0.2s ease;
        }
        
        /* Status badge animations */
        .status-badge {
          animation: slideInFromRight 0.3s ease-out;
        }
        
        @keyframes slideInFromRight {
          from {
            opacity: 0;
            transform: translateX(20px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }
        
        /* Progress bar animation */
        .progress-bar {
          transition: width 1s ease-in-out;
        }
        
        /* Mobile responsiveness */
        @media (max-width: 768px) {
          .mobile-stack {
            flex-direction: column;
          }
          
          .mobile-full {
            width: 100%;
          }
        }
      `}</style>
    </div>
  );
};

export default RedeploymentPage;