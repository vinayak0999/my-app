import React from 'react';
import { BookOpen, MessageCircle, ClipboardCheck } from 'lucide-react';

const HomePage = () => {
  const sections = [
    {
      id: 'guidelines',
      title: 'Guidelines',
      description: 'Learn about our company policies, procedures, and best practices to get started.',
      icon: BookOpen,
      color: 'from-[#163791] to-[#62AADE]',
      link: '/OnboardingDoc'
    },
    {
      id: 'qna',
      title: 'QNA Bot',
      description: 'Ask questions about annotations, processes, and get instant answers from our AI assistant.',
      icon: MessageCircle,
      color: 'from-[#62AADE] to-[#163791]',
      link: '/QnAchat'
    },
    {
      id: 'test',
      title: 'Test Yourself',
      description: 'Evaluate your understanding with our interactive assessment and track your progress.',
      icon: ClipboardCheck,
      color: 'from-[#163791] to-[#62AADE]',
      link: '/test'
    }
  ];

  const handleNavigate = (link) => {
    // Navigation logic - replace with your routing
    console.log('Navigating to:', link);
    // For React Router: navigate(link)
    // For Next.js: router.push(link)
    // window.location.href = link;
  };

  return (
    <div className="min-h-screen bg-black">
      {/* Header */}
      <header className="bg-gray-950 border-b border-gray-800 sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-center">
            <img 
              src="/logo.png" 
              alt="Autonex AI Logo" 
              className="h-12 w-auto object-contain opacity-90"
            />
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Welcome Section */}
        <div className="text-center mb-16">
          <h1 className="text-5xl md:text-6xl font-bold text-white mb-4">
            Welcome to Your{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#62AADE] to-[#163791]">
              Onboarding Journey
            </span>
          </h1>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto leading-relaxed">
            Choose a section below to begin your learning experience
          </p>
        </div>

        {/* Cards Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 max-w-6xl mx-auto">
          {sections.map((section) => {
            const Icon = section.icon;
            return (
              <button
                key={section.id}
                onClick={() => handleNavigate(section.link)}
                className="group relative bg-gray-900 hover:bg-gray-800 border border-gray-800 hover:border-[#62AADE] rounded-2xl p-8 transition-all duration-300 hover:shadow-2xl hover:shadow-[#62AADE]/20 hover:scale-105 text-left"
              >
                {/* Icon Circle */}
                <div className={`w-16 h-16 rounded-xl bg-gradient-to-br ${section.color} flex items-center justify-center mb-6 shadow-lg group-hover:shadow-xl transition-shadow duration-300`}>
                  <Icon className="w-8 h-8 text-white" />
                </div>

                {/* Title */}
                <h2 className="text-2xl font-bold text-white mb-3 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-[#62AADE] group-hover:to-[#163791] transition-all">
                  {section.title}
                </h2>

                {/* Description */}
                <p className="text-gray-400 leading-relaxed mb-4">
                  {section.description}
                </p>

                {/* Arrow Indicator */}
                <div className="flex items-center text-[#62AADE] opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <span className="text-sm font-medium mr-2">Get Started</span>
                  <svg 
                    className="w-4 h-4 group-hover:translate-x-1 transition-transform" 
                    fill="none" 
                    stroke="currentColor" 
                    viewBox="0 0 24 24"
                  >
                    <path 
                      strokeLinecap="round" 
                      strokeLinejoin="round" 
                      strokeWidth={2} 
                      d="M9 5l7 7-7 7" 
                    />
                  </svg>
                </div>

                {/* Glow Effect */}
                <div className={`absolute inset-0 rounded-2xl bg-gradient-to-br ${section.color} opacity-0 group-hover:opacity-10 transition-opacity duration-300 pointer-events-none`}></div>
              </button>
            );
          })}
        </div>

        {/* Additional Info Section */}
        <div className="mt-20 text-center">
          <div className="inline-block bg-gray-900 border border-gray-800 rounded-xl px-8 py-6">
            <p className="text-gray-400 mb-2">
              Need help getting started?
            </p>
            <button 
              onClick={() => handleNavigate('/help')}
              className="text-[#62AADE] hover:text-white font-medium transition-colors"
            >
              Contact Support →
            </button>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-gray-800 mt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <p className="text-center text-sm text-gray-600">
            Your Onboarding Buddy • Powered by RAG & AI
          </p>
        </div>
      </footer>
    </div>
  );
};

export default HomePage;