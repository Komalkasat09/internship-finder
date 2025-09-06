"use client";

import { useState, useEffect } from 'react';
import Head from 'next/head';
import InternshipCard from '../components/InternshipCard';
import Filters from '../components/Filters';
import Stats from '../components/Stats';

export default function Home() {
  const [internships, setInternships] = useState([]);
  const [filteredInternships, setFilteredInternships] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [filters, setFilters] = useState({
    location: [],
    duration: [],
    field: [],
    salary: 0,
    source: ["linkedin", "indeed", "glassdoor", "handshake"],
    search: ""
  });

  const itemsPerPage = 6;

  // Fetch internships on initial load
  useEffect(() => {
    async function fetchInternships() {
      try {
        const response = await fetch('/api/internships');
        const data = await response.json();
        setInternships(data);
        setFilteredInternships(data);
        setIsLoading(false);
      } catch (error) {
        console.error('Error fetching internships:', error);
        setIsLoading(false);
      }
    }

    fetchInternships();
  }, []);

  // Apply filters when they change
  useEffect(() => {
    applyFilters();
  }, [filters]);

  // Handle search functionality
  const handleSearch = (searchTerm) => {
    setFilters(prev => ({ ...prev, search: searchTerm.toLowerCase() }));
    setCurrentPage(1);
  };

  // Update filter arrays based on changes
  const updateFilter = (filterType, value, isChecked) => {
    setFilters(prev => {
      const updatedFilter = isChecked
        ? [...prev[filterType], value]
        : prev[filterType].filter(item => item !== value);
      
      return { ...prev, [filterType]: updatedFilter };
    });
    setCurrentPage(1);
  };

  // Update salary filter
  const updateSalaryFilter = (value) => {
    setFilters(prev => ({ ...prev, salary: value }));
    setCurrentPage(1);
  };

  // Reset all filters
  const resetFilters = () => {
    setFilters({
      location: [],
      duration: [],
      field: [],
      salary: 0,
      source: ["linkedin", "indeed", "glassdoor", "handshake"],
      search: ""
    });
    setCurrentPage(1);
  };

  // Apply all filters to the internship data
  const applyFilters = () => {
    const { location, duration, field, salary, source, search } = filters;
    
    const filtered = internships.filter(internship => {
      // Filter by location
      if (location.length > 0 && !location.includes(internship.type)) {
        return false;
      }
      
      // Filter by duration
      if (duration.length > 0 && !duration.includes(internship.duration)) {
        return false;
      }
      
      // Filter by field
      if (field.length > 0 && !field.includes(internship.field)) {
        return false;
      }
      
      // Filter by salary
      if (internship.salary < salary) {
        return false;
      }
      
      // Filter by source
      if (!source.includes(internship.source)) {
        return false;
      }
      
      // Filter by search term
      if (search && !(
        internship.title.toLowerCase().includes(search) ||
        internship.company.toLowerCase().includes(search) ||
        internship.description.toLowerCase().includes(search) ||
        internship.requirements.some(req => req.toLowerCase().includes(search))
      )) {
        return false;
      }
      
      return true;
    });
    
    setFilteredInternships(filtered);
  };

  // Calculate pagination
  const totalPages = Math.ceil(filteredInternships.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = Math.min(startIndex + itemsPerPage, filteredInternships.length);
  const currentItems = filteredInternships.slice(startIndex, endIndex);

  return (
    <div className="min-h-screen bg-gray-50">
      <Head>
        <title>Internship Insights</title>
        <meta name="description" content="Find your perfect internship opportunity" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <header className="bg-indigo-700 text-white shadow-md">
        <div className="container mx-auto p-4">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <h1 className="text-2xl font-bold">InternshipInsights</h1>
            <div className="bg-white rounded-full flex w-full md:w-1/2 overflow-hidden shadow-md">
              <input
                type="text"
                placeholder="Search for internships, companies, or skills..."
                className="w-full p-3 text-gray-700 focus:outline-none"
                value={filters.search}
                onChange={(e) => handleSearch(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSearch(e.target.value)}
              />
              <button
                className="bg-indigo-600 text-white px-6 py-3 font-semibold"
                onClick={() => handleSearch(filters.search)}
              >
                Search
              </button>
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto p-4">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          <aside className="lg:col-span-1">
            <Filters
              filters={filters}
              updateFilter={updateFilter}
              updateSalaryFilter={updateSalaryFilter}
              resetFilters={resetFilters}
            />
          </aside>

          <div className="lg:col-span-3">
            <Stats internships={filteredInternships} />

            {isLoading ? (
              <div className="text-center py-16">
                <div className="text-2xl text-indigo-600">Loading internship opportunities...</div>
              </div>
            ) : filteredInternships.length > 0 ? (
              <>
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 mt-6">
                  {currentItems.map(internship => (
                    <InternshipCard key={internship.id} internship={internship} />
                  ))}
                </div>
                
                {totalPages > 1 && (
                  <div className="flex justify-center mt-8 space-x-2">
                    <button
                      onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                      disabled={currentPage === 1}
                      className="px-4 py-2 border rounded disabled:opacity-50"
                    >
                      Previous
                    </button>
                    {[...Array(totalPages)].map((_, i) => (
                      <button
                        key={i}
                        onClick={() => setCurrentPage(i + 1)}
                        className={`px-4 py-2 border rounded ${
                          currentPage === i + 1 ? 'bg-indigo-600 text-white' : ''
                        }`}
                      >
                        {i + 1}
                      </button>
                    ))}
                    <button
                      onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                      disabled={currentPage === totalPages}
                      className="px-4 py-2 border rounded disabled:opacity-50"
                    >
                      Next
                    </button>
                  </div>
                )}
              </>
            ) : (
              <div className="text-center py-16 bg-white rounded-lg shadow-md mt-6">
                <h3 className="text-xl font-medium text-indigo-600 mb-2">No internships match your criteria</h3>
                <p className="text-gray-600">Try adjusting your filters or search terms to see more opportunities.</p>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}
