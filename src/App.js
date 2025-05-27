// App.js
import React, { useState } from 'react';
import './App.css';
import LandingPage from './components/LandingPage';
import RedeploymentPage from './components/RedeploymentPage';

function App() {
  const [currentPage, setCurrentPage] = useState('home');

  // Function to render the current page based on state
  const renderPage = () => {
    switch (currentPage) {
      case 'home':
        return <LandingPage setCurrentPage={setCurrentPage} />;
      case 'rd':
        return <RedeploymentPage setCurrentPage={setCurrentPage} />;
      // Add other pages as you create them
      // case 'rm':
      //   return <ResourceManagementPage setCurrentPage={setCurrentPage} />;
      // case 'csm':
      //   return <CustomerSuccessPage setCurrentPage={setCurrentPage} />;
      default:
        return <LandingPage setCurrentPage={setCurrentPage} />;
    }
  };

  return (
    <div className="app">
      {renderPage()}
    </div>
  );
}

export default App;