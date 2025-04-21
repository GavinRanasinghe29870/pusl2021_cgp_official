import React from 'react';

const tabs = ['home', 'about', 'photos', 'videos', 'posts'];

function ProfileNavbar({ activeTab, onTabChange }) {
  return (
    <div className="bg-primary-light py-4 px-6">
      <div className="flex justify-center gap-8 font-semibold text-lg">
        {tabs.map((tab) => (
          <button
            key={tab}
            onClick={() => onTabChange(tab)}
            className={`capitalize relative pb-1 transition duration-200 ${
              activeTab === tab
                ? 'text-black after:absolute after:-bottom-1 after:left-0 after:w-full after:h-[2px] after:bg-black after:content-[""]'
                : 'text-gray-700 hover:text-black'
            }`}
          >
            {tab}
          </button>
        ))}
      </div>
    </div>
  );
}

export default ProfileNavbar;
