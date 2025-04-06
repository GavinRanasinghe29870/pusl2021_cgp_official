import React from 'react';

const SportsPage = () => {
  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="container mx-auto px-4 py-2 flex justify-between items-center">
          <div className="text-blue-800 font-bold text-xl">LOGO</div>
          
          <nav className="hidden md:flex space-x-6">
            <a href="#" className="border-b-2 border-blue-800 text-blue-800 px-1">Home</a>
            <a href="#" className="text-blue-800 px-1">Help Center</a>
            <a href="#" className="text-blue-800 px-1">Club Center</a>
            <a href="#" className="text-blue-800 px-1">Friend Zone</a>
            <a href="#" className="text-blue-800 px-1 flex items-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10 2a4 4 0 00-4 4v1H5a1 1 0 00-.994.89l-1 9A1 1 0 004 18h12a1 1 0 00.994-1.11l-1-9A1 1 0 0015 7h-1V6a4 4 0 00-4-4zm2 5V6a2 2 0 10-4 0v1h4zm-6 3a1 1 0 112 0 1 1 0 01-2 0zm7-1a1 1 0 100 2 1 1 0 000-2z" clipRule="evenodd" />
              </svg>
              Shop
            </a>
          </nav>
          
          <div className="flex items-center space-x-4">
            <button className="text-gray-600">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd" />
              </svg>
            </button>
            <button className="text-gray-600 relative">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path d="M10 2a6 6 0 00-6 6v3.586l-.707.707A1 1 0 004 14h12a1 1 0 00.707-1.707L16 11.586V8a6 6 0 00-6-6zM10 18a3 3 0 01-3-3h6a3 3 0 01-3 3z" />
              </svg>
              <span className="absolute -top-1 -right-1 bg-red-500 text-white rounded-full h-4 w-4 flex items-center justify-center text-xs">1</span>
            </button>
            <div className="flex items-center">
              <button className="text-gray-600">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
              </button>
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-gray-500" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
              </svg>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-6">
        <div className="flex flex-col md:flex-row gap-6">
          {/* Left Sidebar */}
          <div className="w-full md:w-1/4 space-y-4">
            <div className="bg-blue-100 p-4 rounded">
              <div className="h-6"></div>
            </div>
            {[...Array(6)].map((_, index) => (
              <div key={index} className="bg-blue-100 p-4 rounded">
                <div className="h-6"></div>
              </div>
            ))}
          </div>

          {/* Main Content Area */}
          <div className="w-full md:w-3/4">
            {/* Search Bar */}
            <div className="flex flex-col md:flex-row gap-4 mb-4">
                <div className="bg-blue-100 p-4 rounded w-full md:w-1/2">
                    <h2 className="font-medium">Search</h2>
                </div>
                <div className="bg-blue-100 p-4 rounded w-full md:w-1/2">
                    <h2 className="font-medium">Requesting a Donetion</h2>
                </div>
            </div>

            {/* Person Details */}
            <div className="bg-yellow-100 p-4 rounded mb-4">
              <h2 className="font-medium text-center">PERSON DETAILS</h2>
            </div>

            {/* Yellow Content Blocks */}
            {[...Array(3)].map((_, index) => (
              <div key={index} className="bg-yellow-100 p-8 rounded mb-4"></div>
            ))}
          </div>
        </div>

        {/* Footer Contact Details */}
        <div className="bg-blue-100 p-6 rounded mt-6">
          <div className="flex flex-col md:flex-row justify-between">
            <div>
              <h3 className="font-medium text-blue-900">Contact Details</h3>
            </div>

            <div className="flex flex-col md:flex-row gap-8 mt-4 md:mt-0">
              <div className="flex flex-col items-center">
                <div className="bg-blue-100 rounded-full p-2 mb-2">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-blue-900" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                </div>
                <div className="text-center">
                  <p className="text-sm text-blue-900">+94</p>
                  <p className="text-sm text-blue-900">775343218</p>
                </div>
              </div>

              <div className="flex flex-col items-center">
                <div className="bg-blue-100 rounded-full p-2 mb-2">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-blue-900" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                </div>
                <div className="text-center">
                  <p className="text-sm text-blue-900">02,</p>
                  <p className="text-sm text-blue-900">Bambalapitiya,</p>
                  <p className="text-sm text-blue-900">Colombo</p>
                </div>
              </div>

              <div className="flex flex-col items-center">
                <div className="bg-blue-100 rounded-full p-2 mb-2">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-blue-900" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </div>
                <div className="text-center">
                  <p className="text-sm text-blue-900">sportyyyy@gmail.com</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SportsPage;