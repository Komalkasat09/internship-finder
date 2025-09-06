import { useState } from 'react';

export default function InternshipCard({ internship }) {
  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'short', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  const capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  };

  // In a real application, this would navigate to the application page
  const handleApply = () => {
    alert(`Apply for ${internship.title} at ${internship.company}. In a real application, this would redirect to the application page.`);
  };

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden relative">
      <div className="absolute top-2 right-2 bg-gray-100 px-2 py-1 rounded-full text-xs">
        {capitalizeFirstLetter(internship.source)}
      </div>
      
      <div className="p-4">
        <div className="flex items-start space-x-3">
          <div className="w-12 h-12 bg-indigo-100 rounded-lg flex items-center justify-center text-indigo-600 font-bold text-xl">
            {internship.company.charAt(0)}
          </div>
          <div>
            <h3 className="font-medium text-lg text-indigo-700">{internship.title}</h3>
            <div className="text-indigo-600">{internship.company}</div>
          </div>
        </div>
        
        <div className="mt-3 text-gray-600">{internship.location}</div>
        
        <div className="mt-3 flex flex-wrap gap-2">
          <span className="px-3 py-1 bg-gray-100 rounded-full text-sm">${internship.salary}/month</span>
          <span className="px-3 py-1 bg-gray-100 rounded-full text-sm">{capitalizeFirstLetter(internship.duration)}</span>
          <span className="px-3 py-1 bg-gray-100 rounded-full text-sm">{capitalizeFirstLetter(internship.field)}</span>
        </div>
        
        <div className="mt-3 flex flex-wrap gap-2">
          {internship.requirements.map((req, idx) => (
            <span key={idx} className="px-3 py-1 bg-indigo-50 text-indigo-700 rounded-full text-xs">{req}</span>
          ))}
        </div>
        
        <div className="mt-4 flex justify-between items-center">
          <div className="text-red-500 text-sm">Deadline: {formatDate(internship.deadline)}</div>
          <button 
            onClick={handleApply}
            className="bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700 transition-colors font-medium"
          >
            Apply Now
          </button>
        </div>
      </div>
    </div>
  );
}
