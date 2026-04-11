// Routes for Fiastara Portfolio Website
// This module defines all the routes for the Express application

const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
  res.render('home');
});

router.get('/add-project', (req, res) => {
  res.render('add-project');
});

router.get('/project-detail/:id', (req, res) => {
  const projectId = req.params.id;
  // Fetch project data from your data source
  // Then render the project detail page
  res.render('project-detail', { projectId });
});

module.exports = router;


// Import project data and helper functions
const {
  getProjectById,
  getProjectsByCategory,
  getProjectsByStatus,
  getAllEnhancedProjects,
  enhanceProjectData
} = require('../data/projects');

module.exports = (app) => {

  // Home page route - displays the main portfolio
  app.get('/', (req, res) => {
    // Get first 3 projects for portfolio section using Higher Order Functions
    const allProjects = getAllEnhancedProjects();
    const featuredProjects = allProjects.slice(0, 3);

    res.render('home', {
      title: 'Fiastara Seikha Arthanev - Portfolio',
      currentPage: 'home',
      projects: featuredProjects
    });
  });

  // Add Project page - form to add new projects
  app.get('/add-project', (req, res) => {
    res.render('add-project', {
      title: 'Add New Project - Fiastara Portfolio',
      currentPage: 'add-project'
    });
  });

  // Projects page - displays all projects
  app.get('/projects', (req, res) => {
    // Get query parameters for filtering
    const category = req.query.category;
    const status = req.query.status;

    // Get enhanced projects data using Higher Order Functions
    let projectsData = getAllEnhancedProjects();

    // Apply filters using callback functions (Higher Order Functions)
    if (category) {
      projectsData = projectsData.filter(project =>
        project.category.toLowerCase() === category.toLowerCase()
      );
    }

    if (status) {
      projectsData = projectsData.filter(project =>
        project.status.toLowerCase() === status.toLowerCase()
      );
    }

    res.render('projects', {
      title: 'My Projects - Fiastara Portfolio',
      currentPage: 'projects',
      projects: projectsData,
      filters: { category, status }
    });
  });

  // Project Detail page - shows individual project details
  // :id is a route parameter that captures the project ID from the URL
  app.get('/project-detail/:id', (req, res) => {
    const projectId = req.params.id;

    // Get project by ID using Higher Order Function (find with callback)
    const project = getProjectById(projectId);

    if (!project) {
      return res.status(404).render('error', {
        title: 'Project Not Found - Fiastara Portfolio',
        message: 'The project you are looking for does not exist.'
      });
    }

    // Enhance project data with calculated fields using callback function
    const enhancedProject = enhanceProjectData(project);

    res.render('project-detail', {
      title: `${enhancedProject.title} - Fiastara Portfolio`,
      currentPage: 'project-detail',
      project: enhancedProject
    });
  });

  // Contact page - displays contact form and information
  app.get('/contact', (req, res) => {
    res.render('contact', {
      title: 'Contact Me - Fiastara Portfolio',
      currentPage: 'contact'
    });
  });

  // POST route for contact form submission
  app.post('/contact', (req, res) => {
    const { name, email, subject, message } = req.body;

    // In future stages, this will send email or save to database
    console.log('Contact form submission:', { name, email, subject, message });

    // For now, redirect back to contact page with success message
    res.redirect('/contact?sent=true');
  });

  // BONUS: POST route for adding new projects
  app.post('/add-project', (req, res) => {
    const { title, description, technologies } = req.body;

    // In future stages, this will save to database
    console.log('New project data:', { title, description, technologies });

    // For now, redirect back to projects page
    res.redirect('/projects');
  });

};</content>
<parameter name="filePath">c:\Users\Lenovo\OneDrive\Desktop\Batch 66 DW - Fiastara\Task 8 New\routes\index.js