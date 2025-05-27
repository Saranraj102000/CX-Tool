import React, { useEffect, useState } from 'react';
import { 
  ChevronRight, 
  BarChart2, 
  Users, 
  CheckCircle, 
  Clock, 
  ArrowRight, 
  ArrowUpRight,
  Bell,
  Settings,
  Search,
  ChevronDown,
  ExternalLink,
  Calendar,
  MessageCircle,
  FileText,
  Grid,
  HelpCircle,
  User,
  LogOut,
  Menu
} from 'lucide-react';

const LandingPage = ({ setCurrentPage }) => {
  // Animation for elements on page load
  const [isLoaded, setIsLoaded] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const [activeSection, setActiveSection] = useState('dashboard');
  
  useEffect(() => {
    setTimeout(() => {
      setIsLoaded(true);
    }, 100);
  }, []);

  const modules = [
    {
      title: 'RD-Redeployment',
      icon: <Clock className="w-10 h-10 text-blue-600" />,
      description: 'Manage and track redeployment processes and transitions.',
      link: 'rd',
      stats: {
        value: '24',
        label: 'Active Redeployments',
        trend: '+12%',
        trendUp: true
      }
    },
    {
      title: 'Resource Management',
      icon: <BarChart2 className="w-10 h-10 text-blue-600" />,
      description: 'Track and allocate resources across different projects and teams.',
      link: 'rm',
      stats: {
        value: '87%',
        label: 'Resource Utilization',
        trend: '+3%',
        trendUp: true
      }
    },
    {
      title: 'Customer Success Management',
      icon: <CheckCircle className="w-10 h-10 text-blue-600" />,
      description: 'Monitor customer relationships and ensure successful outcomes.',
      link: 'csm',
      stats: {
        value: '4.7/5',
        label: 'Customer Satisfaction',
        trend: '+0.2',
        trendUp: true
      }
    }
  ];

  const recentActivities = [
    {
      id: 1,
      time: '2 hours ago',
      title: 'New Redeployment Request',
      description: 'Client ABC Corp submitted a request for team restructuring',
      icon: <Clock className="w-4 h-4 text-blue-600" />
    },
    {
      id: 2,
      time: 'Yesterday',
      title: 'Resource Allocation Updated',
      description: '3 team members reassigned to Project XYZ',
      icon: <BarChart2 className="w-4 h-4 text-green-600" />
    },
    {
      id: 3,
      time: '2 days ago',
      title: 'CSM Milestone Reached',
      description: 'Client DEF Inc. completed onboarding phase',
      icon: <CheckCircle className="w-4 h-4 text-purple-600" />
    },
    {
      id: 4,
      time: '3 days ago',
      title: 'New Team Member Joined',
      description: 'Sarah Johnson added to development team',
      icon: <Users className="w-4 h-4 text-orange-600" />
    },
    {
      id: 5,
      time: '1 week ago',
      title: 'Quarterly Review Completed',
      description: 'Team performance assessment finalized',
      icon: <FileText className="w-4 h-4 text-indigo-600" />
    }
  ];

  const quickActions = [
    {
      title: 'Create Report',
      icon: <FileText className="w-5 h-5" />,
      color: 'bg-green-500',
      link: '#'
    },
    {
      title: 'Send Message',
      icon: <MessageCircle className="w-5 h-5" />,
      color: 'bg-yellow-500',
      link: '#'
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

  const upcomingEvents = [
    { 
      title: 'Team Standup', 
      time: '9:30 AM', 
      date: 'Today',
      attendees: 8,
      type: 'virtual'
    },
    { 
      title: 'Client Meeting: ABC Corp', 
      time: '1:00 PM', 
      date: 'Today',
      attendees: 5,
      type: 'in-person'
    },
    { 
      title: 'Resource Planning', 
      time: '10:00 AM', 
      date: 'Tomorrow',
      attendees: 12,
      type: 'virtual'
    }
  ];

  const getWeekdayName = () => {
    const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    const today = new Date();
    return days[today.getDay()];
  };

  const getMonthAndDay = () => {
    const today = new Date();
    const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    return `${months[today.getMonth()]} ${today.getDate()}, ${today.getFullYear()}`;
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col font-montserrat">
      {/* Header / Navigation */}
      <header className={`sticky top-0 z-50 bg-white shadow-sm transition-all duration-300 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-6'}`}>
        <div className="container mx-auto px-4 py-3 flex justify-between items-center">
          <div className="flex items-center gap-3 cursor-pointer">
            <div className="bg-blue-600 text-white h-10 w-10 flex items-center justify-center font-bold text-lg shadow-lg shadow-blue-200">CX</div>
            <div className="text-xl font-semibold bg-gradient-to-r from-blue-600 to-blue-800 bg-clip-text text-transparent">Team Portal</div>
          </div>
          
          <div className="hidden md:flex items-center gap-6">
            <div className="relative">
              <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                <Search className="w-4 h-4 text-gray-400" />
              </div>
              <input 
                type="text" 
                placeholder="Search..." 
                className="py-2 pl-10 pr-4 bg-gray-100 border-0 focus:ring-2 focus:ring-blue-600 focus:bg-white transition-colors w-64"
              />
            </div>
            
            <div className="flex gap-2">
              <button className="p-2 text-gray-500 hover:bg-gray-100 hover:text-gray-700 transition-colors relative">
                <Bell className="w-5 h-5" />
                <span className="absolute top-1 right-1 w-2 h-2 bg-red-500"></span>
              </button>
              <button className="p-2 text-gray-500 hover:bg-gray-100 hover:text-gray-700 transition-colors">
                <Settings className="w-5 h-5" />
              </button>
            </div>
          </div>
          
          <nav className="hidden md:block">
            <ul className="flex space-x-1">
              <li>
                <button className="px-4 py-2 bg-blue-600 text-white font-medium flex items-center gap-2">
                  <Grid className="w-4 h-4" /> Dashboard
                </button>
              </li>
              <li>
                <button 
                  className="px-4 py-2 text-gray-600 font-medium hover:bg-gray-100 transition-colors"
                  onClick={() => setCurrentPage('rd')}
                >
                  <div className="flex items-center gap-2">
                    <Clock className="w-4 h-4" /> RD
                  </div>
                </button>
              </li>
              <li>
                <button 
                  className="px-4 py-2 text-gray-600 font-medium hover:bg-gray-100 transition-colors"
                  onClick={() => setCurrentPage('rm')}
                >
                  <div className="flex items-center gap-2">
                    <BarChart2 className="w-4 h-4" /> RM
                  </div>
                </button>
              </li>
              <li>
                <button 
                  className="px-4 py-2 text-gray-600 font-medium hover:bg-gray-100 transition-colors"
                  onClick={() => setCurrentPage('csm')}
                >
                  <div className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4" /> CSM
                  </div>
                </button>
              </li>
            </ul>
          </nav>
          
          <div className="flex items-center gap-3">
            <div className="relative">
              <button 
                className="flex items-center gap-2 cursor-pointer"
                onClick={() => setShowUserMenu(!showUserMenu)}
              >
                <span className="text-gray-700 font-medium hidden md:block">User Name</span>
                <div className="h-10 w-10 bg-gradient-to-br from-blue-500 to-blue-700 flex items-center justify-center font-semibold text-white border-2 border-white shadow-sm">
                  UN
                </div>
                <ChevronDown className="w-4 h-4 text-gray-500 hidden md:block" />
              </button>
              
              {/* User menu dropdown */}
              {showUserMenu && (
                <div className="absolute right-0 mt-2 w-48 bg-white shadow-lg border border-gray-200 z-30 animate-fadeIn">
                  <div className="p-3 border-b border-gray-100">
                    <p className="font-medium text-gray-800">User Name</p>
                    <p className="text-xs text-gray-500">user.name@example.com</p>
                  </div>
                  <div className="py-2">
                    <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 flex items-center gap-2">
                      <User className="w-4 h-4" /> Your Profile
                    </a>
                    <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 flex items-center gap-2">
                      <Settings className="w-4 h-4" /> Settings
                    </a>
                    <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 flex items-center gap-2">
                      <HelpCircle className="w-4 h-4" /> Help Center
                    </a>
                  </div>
                  <div className="py-2 border-t border-gray-100">
                    <a href="#" className="block px-4 py-2 text-sm text-red-600 hover:bg-gray-100 flex items-center gap-2">
                      <LogOut className="w-4 h-4" /> Sign Out
                    </a>
                  </div>
                </div>
              )}
            </div>
            
            <button 
              className="block md:hidden p-2 text-gray-600 hover:bg-gray-100 transition-colors"
              onClick={() => setShowMobileMenu(!showMobileMenu)}
            >
              <Menu className="w-6 h-6" />
            </button>
          </div>
        </div>
        
        {/* Mobile menu */}
        {showMobileMenu && (
          <div className="md:hidden bg-white border-t border-gray-100 py-2 px-4 animate-fadeIn">
            <div className="flex flex-col space-y-2">
              <button className="px-4 py-3 bg-blue-50 text-blue-600 font-medium flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Grid className="w-5 h-5" /> Dashboard
                </div>
              </button>
              <button 
                className="px-4 py-3 text-gray-600 font-medium hover:bg-gray-100 transition-colors flex items-center justify-between"
                onClick={() => setCurrentPage('rd')}
              >
                <div className="flex items-center gap-2">
                  <Clock className="w-5 h-5" /> RD-Redeployment
                </div>
                <ChevronRight className="w-4 h-4 text-gray-400" />
              </button>
              <button 
                className="px-4 py-3 text-gray-600 font-medium hover:bg-gray-100 transition-colors flex items-center justify-between"
                onClick={() => setCurrentPage('rm')}
              >
                <div className="flex items-center gap-2">
                  <BarChart2 className="w-5 h-5" /> Resource Management
                </div>
                <ChevronRight className="w-4 h-4 text-gray-400" />
              </button>
              <button 
                className="px-4 py-3 text-gray-600 font-medium hover:bg-gray-100 transition-colors flex items-center justify-between"
                onClick={() => setCurrentPage('csm')}
              >
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-5 h-5" /> Customer Success
                </div>
                <ChevronRight className="w-4 h-4 text-gray-400" />
              </button>
            </div>
            
            <div className="border-t border-gray-100 mt-3 pt-3 flex items-center justify-between">
              <button className="p-2 text-gray-500 hover:bg-gray-100 hover:text-gray-700 transition-colors">
                <Bell className="w-5 h-5" />
              </button>
              <button className="p-2 text-gray-500 hover:bg-gray-100 hover:text-gray-700 transition-colors">
                <Settings className="w-5 h-5" />
              </button>
              <button className="p-2 text-gray-500 hover:bg-gray-100 hover:text-gray-700 transition-colors">
                <Search className="w-5 h-5" />
              </button>
              <button className="p-2 text-gray-500 hover:bg-gray-100 hover:text-gray-700 transition-colors">
                <HelpCircle className="w-5 h-5" />
              </button>
            </div>
          </div>
        )}
      </header>

      <main className="flex-grow">
        {/* Welcome Section */}
        <section className={`py-6 bg-white border-b border-gray-100 transition-all duration-500 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <div className="container mx-auto px-4">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
              <div>
                <div className="flex items-center gap-2 text-sm text-gray-500 mb-1">
                  <Calendar className="w-4 h-4" />
                  <span>{getWeekdayName()}, {getMonthAndDay()}</span>
                </div>
                <h1 className="text-2xl md:text-3xl font-bold text-gray-800">
                  Welcome to the <span className="text-blue-600">CX Team Portal</span>
                </h1>
                <p className="text-gray-600 mt-1">Your unified platform for managing customer experience workflows.</p>
              </div>
              
              <div className="flex flex-wrap gap-3">
                {quickActions.map((action, index) => (
                  <button 
                    key={index}
                    onClick={() => action.link === 'rd' ? setCurrentPage('rd') : null}
                    className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-200 shadow-sm hover:shadow-md transition-all hover:-translate-y-0.5"
                  >
                    <div className={`w-8 h-8 ${action.color} flex items-center justify-center text-white`}>
                      {action.icon}
                    </div>
                    <span className="font-medium">{action.title}</span>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Dashboard Content */}
        <section className={`py-8 transition-all duration-500 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Main Content Area - 2/3 width on large screens */}
              <div className="lg:col-span-2 space-y-6">
                {/* Core Modules Section */}
                <div className="bg-white shadow-sm border border-gray-100 overflow-hidden">
                  <div className="px-6 py-4 border-b border-gray-100">
                    <h2 className="text-lg font-semibold text-gray-800">Core Modules</h2>
                  </div>
                  
                  <div className="p-6">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                      {modules.map((module, index) => (
                        <div 
                          key={index}
                          onClick={() => setCurrentPage(module.link)}
                          className="bg-white shadow-sm border border-gray-200 hover:shadow-md transition-all duration-300 hover:-translate-y-1 cursor-pointer overflow-hidden"
                        >
                          <div className="p-6 flex flex-col h-full">
                            <div className="w-14 h-14 bg-blue-50 flex items-center justify-center mb-4">
                              {module.icon}
                            </div>
                            <h3 className="text-lg font-semibold text-gray-800 mb-2">
                              {module.title}
                            </h3>
                            <p className="text-gray-600 text-sm mb-4 flex-grow">
                              {module.description}
                            </p>
                            
                            <div className="mt-auto pt-4 border-t border-gray-100">
                              <div className="flex justify-between items-center">
                                <div>
                                  <p className="text-2xl font-bold text-gray-800">{module.stats.value}</p>
                                  <p className="text-xs text-gray-500">{module.stats.label}</p>
                                </div>
                                <div className={`px-2 py-1 text-xs font-medium flex items-center gap-1 ${
                                  module.stats.trendUp ? 'bg-green-50 text-green-700' : 'bg-red-50 text-red-700'
                                }`}>
                                  {module.stats.trendUp ? '↑' : '↓'} {module.stats.trend}
                                </div>
                              </div>
                            </div>
                            
                            <button className="mt-4 w-full px-4 py-2 bg-blue-50 hover:bg-blue-100 text-blue-600 font-medium flex items-center justify-center gap-2 transition-colors">
                              Go to Module <ArrowRight className="w-4 h-4" />
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
                
                {/* Analytics Overview Section */}
                <div className="bg-white shadow-sm border border-gray-100 overflow-hidden">
                  <div className="px-6 py-4 border-b border-gray-100 flex justify-between items-center">
                    <h2 className="text-lg font-semibold text-gray-800">Performance Analytics</h2>
                    <button className="text-sm text-blue-600 font-medium flex items-center gap-1 hover:text-blue-800 transition-colors">
                      <span>View Full Dashboard</span>
                      <ArrowUpRight className="w-4 h-4" />
                    </button>
                  </div>
                  
                  <div className="p-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                      <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-6 shadow-sm">
                        <h3 className="text-sm font-medium text-blue-800 mb-3">Active Redeployments</h3>
                        <div className="text-3xl font-bold text-gray-800 mb-2">24</div>
                        <p className="text-emerald-600 text-sm font-medium flex items-center gap-1">
                          <span>↑</span> 12% from last month
                        </p>
                      </div>
                      
                      <div className="bg-gradient-to-br from-green-50 to-green-100 p-6 shadow-sm">
                        <h3 className="text-sm font-medium text-green-800 mb-3">Resource Utilization</h3>
                        <div className="text-3xl font-bold text-gray-800 mb-2">
                          87<span className="text-xl">%</span>
                        </div>
                        <p className="text-emerald-600 text-sm font-medium flex items-center gap-1">
                          <span>↑</span> 3% from last month
                        </p>
                      </div>
                      
                      <div className="bg-gradient-to-br from-purple-50 to-purple-100 p-6 shadow-sm">
                        <h3 className="text-sm font-medium text-purple-800 mb-3">Customer Satisfaction</h3>
                        <div className="text-3xl font-bold text-gray-800 mb-2">
                          4.7<span className="text-xl">/5</span>
                        </div>
                        <p className="text-emerald-600 text-sm font-medium flex items-center gap-1">
                          <span>↑</span> 0.2 from last month
                        </p>
                      </div>
                      
                      <div className="bg-gradient-to-br from-yellow-50 to-yellow-100 p-6 shadow-sm">
                        <h3 className="text-sm font-medium text-yellow-800 mb-3">Pending Tasks</h3>
                        <div className="text-3xl font-bold text-gray-800 mb-2">18</div>
                        <p className="text-rose-600 text-sm font-medium flex items-center gap-1">
                          <span>↑</span> 5 from last week
                        </p>
                      </div>
                    </div>
                    
                    <div className="mt-6 pt-6 border-t border-gray-100">
                      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                        <div className="flex items-center gap-8">
                          <div>
                            <p className="text-sm text-gray-500 mb-1">Highest Performer</p>
                            <p className="font-medium">Customer Support Team</p>
                          </div>
                          <div>
                            <p className="text-sm text-gray-500 mb-1">Most Improved</p>
                            <p className="font-medium">Technical Redeployment</p>
                          </div>
                        </div>
                        <button className="px-6 py-2.5 bg-blue-600 text-white text-sm font-medium hover:bg-blue-700 transition-colors shadow-sm hover:shadow flex items-center justify-center gap-2">
                          View Detailed Reports <ArrowRight className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Sidebar - 1/3 width on large screens */}
              <div className="space-y-6">
                {/* Recent Activity Section */}
                <div className="bg-white shadow-sm border border-gray-100 overflow-hidden">
                  <div className="px-6 py-4 border-b border-gray-100 flex justify-between items-center">
                    <h2 className="text-lg font-semibold text-gray-800">Recent Activity</h2>
                    <button className="text-sm text-blue-600 font-medium hover:text-blue-800 transition-colors">
                      View All
                    </button>
                  </div>
                  
                  <div className="divide-y divide-gray-100">
                    {recentActivities.map((activity) => (
                      <div key={activity.id} className="p-4 hover:bg-gray-50 transition-colors">
                        <div className="flex gap-3">
                          <div className="mt-1 w-8 h-8 bg-gray-100 flex-shrink-0 flex items-center justify-center">
                            {activity.icon}
                          </div>
                          <div>
                            <div className="flex items-center gap-2 mb-1">
                              <h3 className="font-medium text-gray-900">{activity.title}</h3>
                              <span className="text-xs text-gray-500">{activity.time}</span>
                            </div>
                            <p className="text-sm text-gray-600">{activity.description}</p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
                
                {/* Upcoming Events */}
                <div className="bg-white shadow-sm border border-gray-100 overflow-hidden">
                  <div className="px-6 py-4 border-b border-gray-100">
                    <h2 className="text-lg font-semibold text-gray-800">Upcoming Events</h2>
                  </div>
                  
                  <div className="divide-y divide-gray-100">
                    {upcomingEvents.map((event, index) => (
                      <div key={index} className="p-4 hover:bg-gray-50 transition-colors">
                        <div className="flex gap-4">
                          <div className="flex flex-col items-center justify-center bg-blue-50 w-14 h-14 flex-shrink-0 text-blue-700">
                            <span className="text-xs font-medium">{event.date}</span>
                            <span className="text-sm font-bold">{event.time}</span>
                          </div>
                          <div>
                            <h3 className="font-medium text-gray-900">{event.title}</h3>
                            <div className="flex items-center gap-4 mt-1">
                              <span className="text-xs bg-gray-100 text-gray-700 px-2 py-1">
                                {event.attendees} attendees
                              </span>
                              <span className="text-xs bg-blue-50 text-blue-700 px-2 py-1">
                                {event.type}
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                  
                  <div className="p-4 bg-gray-50 border-t border-gray-100">
                    <button className="w-full px-4 py-2 bg-white border border-gray-200 text-gray-700 font-medium hover:bg-gray-50 transition-colors shadow-sm flex items-center justify-center gap-2">
                      <Calendar className="w-4 h-4" /> View Calendar
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className={`bg-gray-900 text-white py-12 mt-12 transition-all duration-500 delay-300 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center gap-3 mb-6">
                <div className="bg-white text-blue-600 h-10 w-10 flex items-center justify-center font-bold text-lg shadow-sm">CX</div>
                <div className="text-xl font-bold text-white">Team Portal</div>
              </div>
              <p className="text-gray-400 max-w-xs">
                Empowering customer experience teams with advanced tools for success and real-time collaboration.
              </p>
              <div className="mt-6 flex gap-4">
                <a href="#" className="text-gray-400 hover:text-white transition-colors">
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2C6.477 2 2 6.477 2 12c0 4.418 2.865 8.166 6.839 9.488.5.092.682-.217.682-.482 0-.237-.008-.866-.013-1.7-2.782.605-3.369-1.338-3.369-1.338-.455-1.156-1.11-1.465-1.11-1.465-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.831.092-.646.35-1.086.636-1.336-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.682-.103-.254-.446-1.27.098-2.646 0 0 .84-.268 2.75 1.026A9.578 9.578 0 0112 6.836c.85.004 1.705.114 2.504.336 1.909-1.294 2.747-1.026 2.747-1.026.545 1.376.202 2.392.1 2.646.64.698 1.028 1.59 1.028 2.682 0 3.841-2.337 4.687-4.565 4.935.359.308.678.915.678 1.846 0 1.332-.012 2.407-.012 2.734 0 .267.18.577.688.48C19.137 20.16 22 16.416 22 12c0-5.523-4.477-10-10-10z" />
                  </svg>
                </a>
                <a href="#" className="text-gray-400 hover:text-white transition-colors">
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M22.162 5.656a8.384 8.384 0 01-2.402.658A4.196 4.196 0 0021.6 4c-.82.488-1.719.83-2.656 1.015a4.182 4.182 0 00-7.126 3.814 11.874 11.874 0 01-8.62-4.37 4.168 4.168 0 00-.566 2.103c0 1.45.738 2.731 1.86 3.481a4.168 4.168 0 01-1.894-.523v.052a4.185 4.185 0 003.355 4.101 4.21 4.21 0 01-1.89.072A4.185 4.185 0 007.97 16.65a8.394 8.394 0 01-6.191 1.732 11.83 11.83 0 006.41 1.88c7.693 0 11.9-6.373 11.9-11.9 0-.18-.005-.362-.013-.54a8.496 8.496 0 002.087-2.165l-.001-.001z" />
                  </svg>
                </a>
                <a href="#" className="text-gray-400 hover:text-white transition-colors">
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                  </svg>
                </a>
              </div>
            </div>
            
            <div>
              <h4 className="text-lg font-semibold mb-4 pb-2 border-b border-gray-700 inline-block">
                Modules
              </h4>
              <ul className="space-y-3">
                <li>
                  <a href="#" className="text-gray-400 hover:text-blue-400 transition-colors flex items-center gap-2">
                    <Clock className="w-4 h-4" /> RD-Redeployment
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-400 hover:text-blue-400 transition-colors flex items-center gap-2">
                    <BarChart2 className="w-4 h-4" /> Resource Management
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-400 hover:text-blue-400 transition-colors flex items-center gap-2">
                    <CheckCircle className="w-4 h-4" /> Customer Success
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-400 hover:text-blue-400 transition-colors flex items-center gap-2">
                    <Users className="w-4 h-4" /> Team Directory
                  </a>
                </li>
              </ul>
            </div>
            
            <div>
              <h4 className="text-lg font-semibold mb-4 pb-2 border-b border-gray-700 inline-block">
                Resources
              </h4>
              <ul className="space-y-3">
                <li>
                  <a href="#" className="text-gray-400 hover:text-blue-400 transition-colors flex items-center gap-2">
                    <FileText className="w-4 h-4" /> Documentation
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-400 hover:text-blue-400 transition-colors flex items-center gap-2">
                    <MessageCircle className="w-4 h-4" /> Community
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-400 hover:text-blue-400 transition-colors flex items-center gap-2">
                    <HelpCircle className="w-4 h-4" /> Support
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-400 hover:text-blue-400 transition-colors flex items-center gap-2">
                    <Calendar className="w-4 h-4" /> Webinars
                  </a>
                </li>
              </ul>
            </div>
            
            <div>
              <h4 className="text-lg font-semibold mb-4 pb-2 border-b border-gray-700 inline-block">
                Contact Us
              </h4>
              <ul className="space-y-3">
                <li className="text-gray-400 flex items-start gap-2">
                  <svg className="w-5 h-5 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                  <span>(123) 456-7890</span>
                </li>
                <li className="text-gray-400 flex items-start gap-2">
                  <svg className="w-5 h-5 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                  <span>support@cxteamportal.com</span>
                </li>
                <li className="text-gray-400 flex items-start gap-2">
                  <svg className="w-5 h-5 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  <div>
                    <p>123 Business Avenue</p>
                    <p>Suite 400</p>
                    <p>San Francisco, CA 94107</p>
                  </div>
                </li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-gray-800 mt-12 pt-8 text-center text-gray-500">
            <div className="flex flex-col md:flex-row justify-between items-center">
              <p>© 2025 CX Team Portal. All rights reserved.</p>
              <div className="flex gap-6 mt-4 md:mt-0">
                <a href="#" className="text-gray-500 hover:text-gray-300 transition-colors">Privacy Policy</a>
                <a href="#" className="text-gray-500 hover:text-gray-300 transition-colors">Terms of Service</a>
                <a href="#" className="text-gray-500 hover:text-gray-300 transition-colors">Cookie Policy</a>
              </div>
            </div>
          </div>
        </div>
      </footer>

      {/* Add some CSS for animations */}
      <style jsx global>{`
        @import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@300;400;500;600;700&display=swap');
        
        .animate-fadeIn {
          animation: fadeIn 0.3s ease-out;
        }
        
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </div>
  );
};

export default LandingPage;