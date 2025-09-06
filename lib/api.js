export const API_CONFIG = {
    linkedin: {
      apiKey: process.env.LINKEDIN_API_KEY,
      endpoint: 'https://api.linkedin.com/v2/jobSearch'
    },
    indeed: {
      apiKey: process.env.INDEED_API_KEY,
      endpoint: 'https://api.indeed.com/ads/apisearch'
    },
    glassdoor: {
      apiKey: process.env.GLASSDOOR_API_KEY,
      endpoint: 'https://api.glassdoor.com/api/api.htm'
    },
    handshake: {
      apiKey: process.env.HANDSHAKE_API_KEY,
      endpoint: 'https://api.joinhandshake.com/v1/jobs'
    }
  };
  
  // LinkedIn API
  export async function fetchLinkedInInternships() {
    try {
      const response = await fetch(`${API_CONFIG.linkedin.endpoint}?keywords=internship&count=20`, {
        headers: {
          'Authorization': `Bearer ${API_CONFIG.linkedin.apiKey}`,
          'Content-Type': 'application/json'
        }
      });
      
      const data = await response.json();
      
      // Transform the API response to match our app's internship format
      return data.elements.map(job => ({
        id: job.entityUrn,
        title: job.title,
        company: job.companyDetails.name,
        location: job.locationName,
        type: determineLocationType(job.workRemoteAllowed),
        salary: estimateSalary(job),  // Would need to implement this function
        duration: determineDuration(job), // Would need to implement this function
        field: determineField(job), // Would need to implement this function
        description: job.description ? job.description.text : '',
        requirements: extractSkills(job), // Would need to implement this function
        deadline: job.listedAt ? new Date(job.listedAt).toISOString().split('T')[0] : null,
        source: 'linkedin'
      }));
    } catch (error) {
      console.error('Error fetching LinkedIn internships:', error);
      return [];
    }
  }
  
  // Indeed API
  export async function fetchIndeedInternships() {
    // Implementation similar to LinkedIn
    // ...
    return [];
  }
  
  // Glassdoor API
  export async function fetchGlassdoorInternships() {
    // Implementation similar to LinkedIn
    // ...
    return [];
  }
  
  // Handshake API
  export async function fetchHandshakeInternships() {
    // Implementation similar to LinkedIn
    // ...
    return [];
  }
  
  // Fetch from all sources
  export async function fetchAllInternships() {
    try {
      const [linkedin, indeed, glassdoor, handshake] = await Promise.all([
        fetchLinkedInInternships(),
        fetchIndeedInternships(),
        fetchGlassdoorInternships(),
        fetchHandshakeInternships()
      ]);
      
      return [...linkedin, ...indeed, ...glassdoor, ...handshake];
    } catch (error) {
      console.error('Error fetching all internships:', error);
      return [];
    }
  }