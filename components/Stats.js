export default function Stats({ internships }) {
    // Calculate total internships
    const totalInternships = internships.length;
    
    // Calculate remote internships
    const remoteCount = internships.filter(internship => internship.type === 'remote').length;
    
    // Calculate average salary
    const totalSalary = internships.reduce((sum, internship) => sum + internship.salary, 0);
    const avgSalary = internships.length ? Math.round(totalSalary / internships.length) : 0;
    
    // Calculate internships closing soon (within 7 days)
    const today = new Date();
    const oneWeekLater = new Date();
    oneWeekLater.setDate(today.getDate() + 7);
    
    const closingSoon = internships.filter(internship => {
      const deadline = new Date(internship.deadline);
      return deadline <= oneWeekLater && deadline >= today;
    }).length;
  
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          title="Total Internships"
          value={totalInternships}
          description="Available opportunities"
        />
        <StatCard
          title="Remote Positions"
          value={remoteCount}
          description="Work from anywhere"
        />
        <StatCard
          title="Average Salary"
          value={`$${avgSalary}`}
          description="Monthly stipend"
        />
        <StatCard
          title="Closing Soon"
          value={closingSoon}
          description="Apply within 7 days"
        />
      </div>
    );
  }
  
  function StatCard({ title, value, description }) {
    return (
      <div className="bg-white p-4 rounded-lg shadow-md text-center transition-transform hover:transform hover:-translate-y-1">
        <div className="text-gray-600">{title}</div>
        <div className="text-3xl font-bold text-indigo-600 my-2">{value}</div>
        <div className="text-sm text-gray-500">{description}</div>
      </div>
    );
  }