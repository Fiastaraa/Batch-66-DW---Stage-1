// Routes middleware for Fiastara Portfolio
// Consolidated app(app) pattern with data integration


// Import project data and helper functions
const {
  getProjectById,
  getProjectsByCategory,
  getProjectsByStatus,
  getAllEnhancedProjects,
  enhanceProjectData
} = require('../data/projects');

module.exports = (app) => {
  const {
    getProjectById,
    getProjectsByCategory,
    getProjectsByStatus,
    getAllEnhancedProjects,
    enhanceProjectData
  } = require('../data/projects');

  // Home page - portfolio overview
  app.get('/', (req, res) => {
    const featuredProjects = getAllEnhancedProjects().slice(0, 3);
    res.render('home', {
      title: 'Fiastara Seikha Arthanev - Portfolio',
      projects: featuredProjects
    });
  });

  // Add/Edit project
  app.get('/add-project', (req, res) => res.render('add-project'));
  app.post('/add-project', (req, res) => {
    // TODO: Persist to DB/localStorage in future
    console.log('New project:', req.body);
    res.redirect('/projects');
  });

  // All projects with filters
  app.get('/projects', (req, res) => {
    let projects = getAllEnhancedProjects();
    const { category, status } = req.query;
    if (category) projects = projects.filter(p => p.category.toLowerCase() === category.toLowerCase());
    if (status) projects = projects.filter(p => p.status.toLowerCase() === status.toLowerCase());
    res.render('projects', { projects, filters: req.query });
  });

  // Project detail
  app.get('/project-detail/:id', (req, res) => {
    const project = getProjectById(req.params.id);
    if (!project) return res.status(404).render('error', { message: 'Project not found' });
    res.render('project-detail', { project: enhanceProjectData(project) });
  });

  // Contact
  app.get('/contact', (req, res) => res.render('contact'));
  app.post('/contact', (req, res) => {
    console.log('Contact:', req.body);
    res.redirect('/contact?sent=true');
  });

  // Static assets fallback
  app.use(express.static('public'));
  app.use(express.static('src'));
};
<parameter name="filePath">c:\Users\Lenovo\OneDrive\Desktop\Batch 66 DW - Fiastara\Task 8 New\routes\index.js