export default function Filters({ filters, updateFilter, updateSalaryFilter, resetFilters }) {
    // Location filter options
    const locationOptions = [
      { value: 'remote', label: 'Remote' },
      { value: 'onsite', label: 'On-site' },
      { value: 'hybrid', label: 'Hybrid' }
    ];
  
    // Duration filter options
    const durationOptions = [
      { value: 'summer', label: 'Summer' },
      { value: '3months', label: '3 Months' },
      { value: '6months', label: '6 Months' },
      { value: 'flexible', label: 'Flexible' }
    ];
  
    // Field filter options
    const fieldOptions = [
      { value: 'software', label: 'Software Development' },
      { value: 'data', label: 'Data Science' },
      { value: 'design', label: 'Design' },
      { value: 'marketing', label: 'Marketing' },
      { value: 'finance', label: 'Finance' }
    ];
  
    // Source filter options
    const sourceOptions = [
      { value: 'linkedin', label: 'LinkedIn' },
      { value: 'indeed', label: 'Indeed' },
      { value: 'glassdoor', label: 'Glassdoor' },
      { value: 'handshake', label: 'Handshake' }
    ];
  
    return (
      <div className="bg-white p-4 rounded-lg shadow-md">
        <h2 className="text-xl font-semibold mb-4">Filters</h2>
        
        {/* Location Filter */}
        <div className="mb-6">
          <h3 className="font-medium text-indigo-700 mb-2">Location</h3>
          {locationOptions.map(option => (
            <div key={option.value} className="mb-1">
              <label className="flex items-center space-x-2 cursor-pointer">
                <input 
                  type="checkbox"
                  checked={filters.location.includes(option.value)}
                  onChange={(e) => updateFilter('location', option.value, e.target.checked)}
                  className="form-checkbox h-4 w-4 text-indigo-600"
                />
                <span>{option.label}</span>
              </label>
            </div>
          ))}
        </div>
        
        {/* Duration Filter */}
        <div className="mb-6">
          <h3 className="font-medium text-indigo-700 mb-2">Duration</h3>
          {durationOptions.map(option => (
            <div key={option.value} className="mb-1">
              <label className="flex items-center space-x-2 cursor-pointer">
                <input 
                  type="checkbox"
                  checked={filters.duration.includes(option.value)}
                  onChange={(e) => updateFilter('duration', option.value, e.target.checked)}
                  className="form-checkbox h-4 w-4 text-indigo-600"
                />
                <span>{option.label}</span>
              </label>
            </div>
          ))}
        </div>
        
        {/* Field Filter */}
        <div className="mb-6">
          <h3 className="font-medium text-indigo-700 mb-2">Field</h3>
          {fieldOptions.map(option => (
            <div key={option.value} className="mb-1">
              <label className="flex items-center space-x-2 cursor-pointer">
                <input 
                  type="checkbox"
                  checked={filters.field.includes(option.value)}
                  onChange={(e) => updateFilter('field', option.value, e.target.checked)}
                  className="form-checkbox h-4 w-4 text-indigo-600"
                />
                <span>{option.label}</span>
              </label>
            </div>
          ))}
        </div>
        
        {/* Salary Filter */}
        <div className="mb-6">
          <h3 className="font-medium text-indigo-700 mb-2">Salary Range</h3>
          <input 
            type="range"
            min="0"
            max="10000"
            step="500"
            value={filters.salary}
            onChange={(e) => updateSalaryFilter(parseInt(e.target.value))}
            className="w-full"
          />
          <div className="text-right">${filters.salary}+</div>
        </div>
        
        {/* Source Filter */}
        <div className="mb-6">
          <h3 className="font-medium text-indigo-700 mb-2">Source</h3>
          {sourceOptions.map(option => (
            <div key={option.value} className="mb-1">
              <label className="flex items-center space-x-2 cursor-pointer">
                <input 
                  type="checkbox"
                  checked={filters.source.includes(option.value)}
                  onChange={(e) => updateFilter('source', option.value, e.target.checked)}
                  className="form-checkbox h-4 w-4 text-indigo-600"
                />
                <span>{option.label}</span>
              </label>
            </div>
          ))}
        </div>
        
        <button
          onClick={resetFilters}
          className="w-full bg-indigo-600 text-white py-2 rounded hover:bg-indigo-700 transition-colors font-medium"
        >
          Reset Filters
        </button>
      </div>
    );
  }
  