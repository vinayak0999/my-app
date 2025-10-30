import React, { useState } from 'react';

const OnboardingUI = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = 8;

  // Sample content for each page
  const pageContent = {
    1: {
      title: "Welcome to Our Company",
      content: "Welcome to the onboarding process. This guide will help you understand our company culture, values, and processes. Please read through each section carefully."
    },
    2: {
      title: "Company Overview",
      content: "Our company was founded with a vision to revolutionize the industry. We believe in innovation, collaboration, and excellence in everything we do."
    },
    3: {
      title: "Our Mission & Vision",
      content: "Our mission is to deliver exceptional value to our customers while fostering a culture of continuous learning and growth for our team members."
    },
    4: {
      title: "Core Values",
      content: "Integrity, Innovation, Collaboration, Excellence, and Customer Focus are the five pillars that guide our daily operations and decision-making."
    },
    5: {
      title: "Team Structure",
      content: "Our organization is structured into various departments including Engineering, Product, Sales, Marketing, and Operations. Each team works collaboratively towards our common goals."
    },
    6: {
      title: "Work Culture",
      content: "We promote a flexible and inclusive work environment where every team member's voice is heard and valued. Work-life balance is a priority for us."
    },
    7: {
      title: "Policies & Guidelines",
      content: "Please familiarize yourself with our company policies including attendance, leave, code of conduct, and communication guidelines."
    },
    8: {
      title: "Getting Started",
      content: "Congratulations! You've completed the onboarding material. Your manager will guide you through the next steps. Welcome aboard!"
    }
  };

  const handlePageClick = (pageNum) => {
    setCurrentPage(pageNum);
  };

  const handleNext = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePrevious = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  return (
    <div className="min-h-screen bg-black">
      {/* Header */}
      <header className="bg-gray-950 border-b border-gray-800 sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
          {/* Company Logo - Center */}
          <div className="flex-1 flex justify-center">
            <img 
              src="/logo.png" 
              alt="Company Logo" 
              className="h-12 w-auto object-contain opacity-90"
            />
          </div>

          {/* Page Numbers - Right Side (Absolute positioning) */}
          <div className="absolute right-4 sm:right-6 lg:right-8 flex items-center gap-2">
            <span className="text-sm text-gray-500 mr-2 hidden sm:inline">Pages:</span>
            {[...Array(totalPages)].map((_, index) => {
              const pageNum = index + 1;
              return (
                <button
                  key={pageNum}
                  onClick={() => handlePageClick(pageNum)}
                  className={`w-8 h-8 sm:w-10 sm:h-10 rounded-lg font-semibold transition-all duration-200 ${
                    currentPage === pageNum
                      ? 'bg-gradient-to-br from-[#163791] to-[#62AADE] text-white shadow-lg shadow-[#62AADE]/50 scale-110'
                      : 'bg-gray-800 text-gray-400 hover:bg-gray-700 hover:text-gray-200 hover:scale-105'
                  }`}
                >
                  {pageNum}
                </button>
              );
            })}
          </div>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-gray-900 rounded-2xl shadow-2xl border border-gray-800 p-8 min-h-[500px]">
          {/* Page Indicator */}
          <div className="text-sm text-gray-500 mb-4">
            Page {currentPage} of {totalPages}
          </div>

          {/* Content */}
          <div className="prose prose-invert max-w-none">
            <h1 className="text-3xl font-bold text-white mb-6">
              {pageContent[currentPage].title}
            </h1>
            <p className="text-lg text-gray-300 leading-relaxed">
              {pageContent[currentPage].content}
            </p>
          </div>

          {/* Additional content space */}
          <div className="mt-8 p-6 bg-gradient-to-br from-[#163791]/20 to-[#62AADE]/20 rounded-lg border border-[#62AADE]/30">
            <h3 className="text-lg font-semibold text-[#62AADE] mb-2">
              Important Note
            </h3>
            <p className="text-gray-300">
              Make sure you understand all the information on this page before proceeding to the next section.
            </p>
          </div>
        </div>
      </main>

      {/* Navigation Footer */}
      <footer className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="flex justify-between items-center">
          <button
            onClick={handlePrevious}
            disabled={currentPage === 1}
            className={`px-6 py-3 rounded-lg font-medium transition-all duration-200 ${
              currentPage === 1
                ? 'bg-gray-900 text-gray-600 cursor-not-allowed border border-gray-800'
                : 'bg-gray-900 text-gray-300 border-2 border-gray-700 hover:border-[#62AADE] hover:text-[#62AADE] shadow-sm hover:shadow-md'
            }`}
          >
            ← Previous
          </button>

          <div className="text-sm text-gray-500">
            Progress: {Math.round((currentPage / totalPages) * 100)}%
          </div>

          <button
            onClick={handleNext}
            disabled={currentPage === totalPages}
            className={`px-6 py-3 rounded-lg font-medium transition-all duration-200 ${
              currentPage === totalPages
                ? 'bg-gray-900 text-gray-600 cursor-not-allowed border border-gray-800'
                : 'bg-gradient-to-r from-[#163791] to-[#62AADE] text-white hover:shadow-lg hover:shadow-[#62AADE]/30'
            }`}
          >
            Next →
          </button>
        </div>

        {/* Footer Text */}
        <p className="text-center text-sm text-gray-600 mt-6">
          Your Onboarding Buddy • Powered by RAG & AI
        </p>
      </footer>
    </div>
  );
};

export default OnboardingUI;