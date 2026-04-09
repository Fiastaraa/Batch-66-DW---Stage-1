// Project data array - inspired by Day 6 bootcamp concepts
// Using array of objects with Higher Order Functions and Callbacks

const projects = [
  {
    id: 1,
    title: "IBM Academy Final Project",
    description: "Individual final project involving AI, hybrid cloud, and cybersecurity concepts. Developed a comprehensive solution demonstrating practical application of cloud technologies and security principles.",
    image: "/assets/project-placeholder.jpg",
    startDate: "2023-08-01",
    endDate: "2024-01-15",
    technologies: ["AI", "Cloud Computing", "Cybersecurity", "Python", "AWS"],
    category: "Data Science",
    status: "Completed",
    link: "https://github.com/fiastara/ibm-academy-project"
  },
  {
    id: 2,
    title: "Mobile Application at Nongsa SEZ",
    description: "Mobile application and cloud-based solution developed during internship. Created a comprehensive mobile platform for business operations in the Nongsa Special Economic Zone.",
    image: "/assets/project-mobile.jpg",
    startDate: "2022-03-01",
    endDate: "2022-08-31",
    technologies: ["Android Studio", "Java", "Firebase", "REST API", "Material Design"],
    category: "Mobile App",
    status: "Completed",
    link: "https://github.com/fiastara/nongsa-mobile-app"
  },
  {
    id: 3,
    title: "Humanity First Indonesia Platform",
    description: "Responsive UI/UX designs implemented using WordPress for the digital platform. Designed and developed user interfaces for humanitarian aid distribution system.",
    image: "/assets/project-humanity.jpg",
    startDate: "2023-03-01",
    endDate: "2023-08-31",
    technologies: ["WordPress", "PHP", "HTML5", "CSS3", "JavaScript", "MySQL"],
    category: "Web Development",
    status: "Completed",
    link: "https://humanityfirst.id"
  },
  {
    id: 4,
    title: "Data Analytics Dashboard",
    description: "Interactive dashboard for data visualization and analytics. Built using modern web technologies to provide insights from complex datasets.",
    image: "/assets/project-dashboard.jpg",
    startDate: "2023-09-01",
    endDate: "2023-12-15",
    technologies: ["React", "D3.js", "Node.js", "MongoDB", "Express"],
    category: "Data Science",
    status: "Completed",
    link: "https://github.com/fiastara/analytics-dashboard"
  },
  {
    id: 5,
    title: "UI/UX Design System",
    description: "Comprehensive design system and component library for consistent user interfaces. Created reusable components and design guidelines for scalable product development.",
    image: "/assets/project-design.jpg",
    startDate: "2023-06-01",
    endDate: "2023-10-31",
    technologies: ["Figma", "Adobe XD", "Sketch", "InVision", "Zeplin"],
    category: "UI/UX Design",
    status: "Completed",
    link: "https://www.figma.com/@fiastara/design-system"
  }
];

// Helper function to calculate project duration
// Uses Higher Order Functions concept - callback-based calculation
function calculateDuration(startDate, endDate) {
  const start = new Date(startDate);
  const end = new Date(endDate);
  const diffTime = Math.abs(end - start);
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

  if (diffDays < 30) {
    return `${diffDays} days`;
  } else if (diffDays < 365) {
    const months = Math.floor(diffDays / 30);
    return `${months} month${months > 1 ? 's' : ''}`;
  } else {
    const years = Math.floor(diffDays / 365);
    const remainingMonths = Math.floor((diffDays % 365) / 30);
    let duration = `${years} year${years > 1 ? 's' : ''}`;
    if (remainingMonths > 0) {
      duration += ` ${remainingMonths} month${remainingMonths > 1 ? 's' : ''}`;
    }
    return duration;
  }
}

// Helper function to format technologies with icons
// Uses map() Higher Order Function and callback pattern
function formatTechnologies(techArray) {
  const techIcons = {
    "HTML5": "fab fa-html5",
    "CSS3": "fab fa-css3-alt",
    "JavaScript": "fab fa-js-square",
    "Python": "fab fa-python",
    "Java": "fab fa-java",
    "PHP": "fab fa-php",
    "React": "fab fa-react",
    "Node.js": "fab fa-node-js",
    "MongoDB": "fas fa-database",
    "MySQL": "fas fa-database",
    "AWS": "fab fa-aws",
    "Firebase": "fas fa-fire",
    "Android Studio": "fab fa-android",
    "WordPress": "fab fa-wordpress",
    "Figma": "fab fa-figma",
    "AI": "fas fa-brain",
    "Cloud Computing": "fas fa-cloud",
    "Cybersecurity": "fas fa-shield-alt",
    "REST API": "fas fa-exchange-alt",
    "Material Design": "fas fa-palette",
    "D3.js": "fas fa-chart-line",
    "Express": "fas fa-server",
    "Adobe XD": "fas fa-palette",
    "Sketch": "fas fa-pencil-ruler",
    "InVision": "fas fa-eye",
    "Zeplin": "fas fa-share-alt"
  };

  // Using map() Higher Order Function with callback
  return techArray.map(tech => {
    const iconClass = techIcons[tech] || "fas fa-code";
    return {
      name: tech,
      icon: iconClass
    };
  });
}

// Function to get project by ID
// Uses find() Higher Order Function with callback
function getProjectById(id) {
  return projects.find(project => project.id === parseInt(id));
}

// Function to get projects by category
// Uses filter() Higher Order Function with callback
function getProjectsByCategory(category) {
  if (!category || category === 'all') {
    return projects;
  }
  return projects.filter(project => project.category.toLowerCase() === category.toLowerCase());
}

// Function to get projects by status
// Uses filter() Higher Order Function with callback
function getProjectsByStatus(status) {
  if (!status || status === 'all') {
    return projects;
  }
  return projects.filter(project => project.status.toLowerCase() === status.toLowerCase());
}

// Function to enhance project data with calculated fields
// Uses map() Higher Order Function with callback
function enhanceProjectData(project) {
  return {
    ...project,
    duration: calculateDuration(project.startDate, project.endDate),
    formattedTechnologies: formatTechnologies(project.technologies),
    startDateFormatted: new Date(project.startDate).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    }),
    endDateFormatted: new Date(project.endDate).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    })
  };
}

// Function to get all enhanced projects
// Uses map() Higher Order Function with callback
function getAllEnhancedProjects() {
  return projects.map(enhanceProjectData);
}

module.exports = {
  projects,
  getProjectById,
  getProjectsByCategory,
  getProjectsByStatus,
  enhanceProjectData,
  getAllEnhancedProjects,
  calculateDuration,
  formatTechnologies
};