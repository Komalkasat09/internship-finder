export default function handler(req, res) {
    // In a real application, this would fetch data from various APIs
    // using the API config and keys from environment variables
    
    // Sample data to simulate API responses
    const sampleInternships = [
      {
        id: 1,
        title: "Software Engineering Intern",
        company: "Google",
        location: "Mountain View, CA (On-site)",
        type: "onsite",
        salary: 8000,
        duration: "3months",
        field: "software",
        description: "Join our team to work on cutting-edge technology projects...",
        requirements: ["JavaScript", "React", "Node.js"],
        deadline: "2025-04-15",
        source: "linkedin"
      },
      {
        id: 2,
        title: "Data Science Intern",
        company: "Microsoft",
        location: "Remote",
        type: "remote",
        salary: 7500,
        duration: "summer",
        field: "data",
        description: "Work with our data science team to analyze large datasets...",
        requirements: ["Python", "SQL", "Machine Learning"],
        deadline: "2025-04-10",
        source: "indeed"
      },
      {
        id: 3,
        title: "UI/UX Design Intern",
        company: "Apple",
        location: "Cupertino, CA (Hybrid)",
        type: "hybrid",
        salary: 7000,
        duration: "6months",
        field: "design",
        description: "Design beautiful and intuitive user interfaces for our products...",
        requirements: ["Figma", "Adobe XD", "UI Design"],
        deadline: "2025-03-20",
        source: "glassdoor"
      },
      {
        id: 4,
        title: "Marketing Intern",
        company: "Amazon",
        location: "Seattle, WA (On-site)",
        type: "onsite",
        salary: 6000,
        duration: "3months",
        field: "marketing",
        description: "Assist our marketing team with campaign planning and execution...",
        requirements: ["Social Media", "Content Creation", "Analytics"],
        deadline: "2025-03-25",
        source: "handshake"
      },
      {
        id: 5,
        title: "Finance Intern",
        company: "JP Morgan",
        location: "New York, NY (On-site)",
        type: "onsite",
        salary: 7200,
        duration: "summer",
        field: "finance",
        description: "Work with our finance team on financial analysis and reporting...",
        requirements: ["Excel", "Financial Modeling", "Accounting"],
        deadline: "2025-04-05",
        source: "linkedin"
      },
      {
        id: 6,
        title: "Frontend Developer Intern",
        company: "Netflix",
        location: "Remote",
        type: "remote",
        salary: 7800,
        duration: "6months",
        field: "software",
        description: "Build and improve user interfaces for our streaming platform...",
        requirements: ["HTML/CSS", "JavaScript", "React"],
        deadline: "2025-04-12",
        source: "indeed"
      },
      {
        id: 7,
        title: "Product Management Intern",
        company: "Facebook",
        location: "Menlo Park, CA (Hybrid)",
        type: "hybrid",
        salary: 8200,
        duration: "3months",
        field: "software",
        description: "Assist in product development lifecycle from ideation to launch...",
        requirements: ["Data Analysis", "Product Design", "Market Research"],
        deadline: "2025-03-15",
        source: "glassdoor"
      },
      {
        id: 8,
        title: "Machine Learning Intern",
        company: "Tesla",
        location: "Austin, TX (On-site)",
        type: "onsite",
        salary: 8500,
        duration: "summer",
        field: "data",
        description: "Work on machine learning models for autonomous driving systems...",
        requirements: ["Python", "TensorFlow", "Computer Vision"],
        deadline: "2025-04-20",
        source: "handshake"
      },
    ];
  
    res.status(200).json(sampleInternships);
  }