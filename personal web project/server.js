const express = require('express');
const path = require('path');
const fs = require('fs');
const multer = require('multer');
const flash = require('express-flash');
const session = require('express-session');
const bodyParser = require('body-parser');
const methodOverride = require('method-override');
const { engine } = require('express-handlebars');

const app = express();

// Ensure uploads directory exists
const uploadsDir = path.join(__dirname, 'public/uploads');
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir, { recursive: true });
}

// Configure multer for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadsDir);
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, 'project-' + uniqueSuffix + path.extname(file.originalname));
  }
});

const fileFilter = (req, file, cb) => {
  // Allowed MIME types
  const allowedMimes = ['image/jpeg', 'image/png', 'image/gif', 'image/webp'];
  const allowedExtensions = ['.jpg', '.jpeg', '.png', '.gif', '.webp'];
  
  const ext = path.extname(file.originalname).toLowerCase();
  
  if (allowedMimes.includes(file.mimetype) && allowedExtensions.includes(ext)) {
    cb(null, true);
  } else {
    cb(new Error('Only image files are allowed (JPG, PNG, GIF, WebP)'), false);
  }
};

const upload = multer({
  storage: storage,
  fileFilter: fileFilter,
  limits: {
    fileSize: 5 * 1024 * 1024 // 5MB limit
  }
});

// Session configuration
app.use(session({
  secret: 'your-secret-key',
  resave: false,
  saveUninitialized: true,
  cookie: { maxAge: 1000 * 60 * 60 * 24 } // 24 hours
}));

// Middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(methodOverride('_method'));
app.use(flash());

// Static files
app.use(express.static(path.join(__dirname, 'public')));

// View engine
app.engine('hbs', engine({
  extname: 'hbs',
  defaultLayout: 'main',
  layoutsDir: path.join(__dirname, 'views/layouts'),
  partialsDir: path.join(__dirname, 'views/partials'),
  helpers: {
    eq: (a, b) => a === b,
    neq: (a, b) => a !== b,
    json: (obj) => JSON.stringify(obj)
  }
}));

app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'views'));

// In-memory storage for projects (in production, use a database)
let projects = [];
let projectIdCounter = 1;

// Load projects from file if it exists
const projectsFile = path.join(__dirname, 'data', 'projects.json');
if (fs.existsSync(projectsFile)) {
  try {
    projects = JSON.parse(fs.readFileSync(projectsFile, 'utf8'));
    if (projects.length > 0) {
      projectIdCounter = Math.max(...projects.map(p => p.id)) + 1;
    }
  } catch (err) {
    console.error('Error loading projects:', err);
  }
}

// Function to save projects to file
function saveProjects() {
  const dataDir = path.join(__dirname, 'data');
  if (!fs.existsSync(dataDir)) {
    fs.mkdirSync(dataDir, { recursive: true });
  }
  fs.writeFileSync(projectsFile, JSON.stringify(projects, null, 2));
}

// Home page route
app.get('/', (req, res) => {
  res.render('home', {
    title: 'Home',
    projects: projects.slice(0, 4) // Show featured projects
  });
});

// Contact page route
app.get('/contact', (req, res) => {
  res.render('contact', {
    title: 'Contact Me'
  });
});

// Projects list page route
app.get('/projects', (req, res) => {
  res.render('projects', {
    title: 'My Projects',
    projects: projects
  });
});

// Add project form route
app.get('/add-project', (req, res) => {
  res.render('add-project', {
    title: 'Add New Project'
  });
});

// Add project POST route with file upload
app.post('/add-project', upload.single('image'), (req, res) => {
  try {
    const { title, description, technologies, link } = req.body;
    
    // Validation
    if (!title || !description) {
      if (req.file) {
        fs.unlinkSync(req.file.path); // Delete uploaded file if validation fails
      }
      req.flash('error', 'Title and description are required');
      return res.redirect('/add-project');
    }
    
    // Check file size
    if (req.file && req.file.size > 5 * 1024 * 1024) {
      fs.unlinkSync(req.file.path);
      req.flash('error', 'File size must be less than 5MB');
      return res.redirect('/add-project');
    }
    
    const newProject = {
      id: projectIdCounter++,
      title: title,
      description: description,
      technologies: technologies ? technologies.split(',').map(t => t.trim()) : [],
      link: link || '#',
      image: req.file ? '/uploads/' + req.file.filename : null,
      createdAt: new Date().toISOString()
    };
    
    projects.push(newProject);
    saveProjects();
    
    req.flash('success', 'Project added successfully!');
    res.redirect('/projects');
  } catch (err) {
    console.error('Error adding project:', err);
    if (req.file) {
      try {
        fs.unlinkSync(req.file.path);
      } catch (e) {}
    }
    req.flash('error', 'Error adding project: ' + err.message);
    res.redirect('/add-project');
  }
});

// Project detail route
app.get('/project/:id', (req, res) => {
  const project = projects.find(p => p.id === parseInt(req.params.id));
  if (!project) {
    req.flash('error', 'Project not found');
    return res.redirect('/projects');
  }
  res.render('project-detail', {
    title: project.title,
    project: project
  });
});

// Edit project form route
app.get('/edit-project/:id', (req, res) => {
  const project = projects.find(p => p.id === parseInt(req.params.id));
  if (!project) {
    req.flash('error', 'Project not found');
    return res.redirect('/projects');
  }
  res.render('edit-project', {
    title: 'Edit Project',
    project: project
  });
});

// Edit project POST route with file upload
app.post('/edit-project/:id', upload.single('image'), (req, res) => {
  try {
    const projectId = parseInt(req.params.id);
    const project = projects.find(p => p.id === projectId);
    
    if (!project) {
      if (req.file) {
        fs.unlinkSync(req.file.path);
      }
      req.flash('error', 'Project not found');
      return res.redirect('/projects');
    }
    
    const { title, description, technologies, link } = req.body;
    
    // Validation
    if (!title || !description) {
      if (req.file) {
        fs.unlinkSync(req.file.path);
      }
      req.flash('error', 'Title and description are required');
      return res.redirect('/edit-project/' + projectId);
    }
    
    // Update project
    project.title = title;
    project.description = description;
    project.technologies = technologies ? technologies.split(',').map(t => t.trim()) : [];
    project.link = link || '#';
    
    // Handle image update
    if (req.file) {
      // Delete old image if exists
      if (project.image) {
        const oldImagePath = path.join(__dirname, 'public', project.image);
        if (fs.existsSync(oldImagePath)) {
          fs.unlinkSync(oldImagePath);
        }
      }
      project.image = '/uploads/' + req.file.filename;
    }
    
    saveProjects();
    req.flash('success', 'Project updated successfully!');
    res.redirect('/project/' + projectId);
  } catch (err) {
    console.error('Error editing project:', err);
    if (req.file) {
      try {
        fs.unlinkSync(req.file.path);
      } catch (e) {}
    }
    req.flash('error', 'Error editing project: ' + err.message);
    res.redirect('/edit-project/' + req.params.id);
  }
});

// Delete project route
app.delete('/project/:id', (req, res) => {
  try {
    const projectId = parseInt(req.params.id);
    const projectIndex = projects.findIndex(p => p.id === projectId);
    
    if (projectIndex === -1) {
      req.flash('error', 'Project not found');
      return res.redirect('/projects');
    }
    
    const project = projects[projectIndex];
    
    // Delete image file
    if (project.image) {
      const imagePath = path.join(__dirname, 'public', project.image);
      if (fs.existsSync(imagePath)) {
        fs.unlinkSync(imagePath);
      }
    }
    
    projects.splice(projectIndex, 1);
    saveProjects();
    
    req.flash('success', 'Project deleted successfully!');
    res.redirect('/projects');
  } catch (err) {
    console.error('Error deleting project:', err);
    req.flash('error', 'Error deleting project: ' + err.message);
    res.redirect('/projects');
  }
});

// Handle POST for delete (since HTML forms don't support DELETE)
app.post('/delete-project/:id', (req, res) => {
  try {
    const projectId = parseInt(req.params.id);
    const projectIndex = projects.findIndex(p => p.id === projectId);
    
    if (projectIndex === -1) {
      req.flash('error', 'Project not found');
      return res.redirect('/projects');
    }
    
    const project = projects[projectIndex];
    
    // Delete image file
    if (project.image) {
      const imagePath = path.join(__dirname, 'public', project.image);
      if (fs.existsSync(imagePath)) {
        fs.unlinkSync(imagePath);
      }
    }
    
    projects.splice(projectIndex, 1);
    saveProjects();
    
    req.flash('success', 'Project deleted successfully!');
    res.redirect('/projects');
  } catch (err) {
    console.error('Error deleting project:', err);
    req.flash('error', 'Error deleting project: ' + err.message);
    res.redirect('/projects');
  }
});

// 404 handler
app.use((req, res) => {
  res.status(404).render('error', {
    title: '404 Not Found',
    message: 'Page not found'
  });
});

// Error handler for multer
app.use((err, req, res, next) => {
  if (err instanceof multer.MulterError) {
    if (err.code === 'FILE_TOO_LARGE') {
      req.flash('error', 'File is too large. Maximum size is 5MB');
    } else {
      req.flash('error', 'File upload error: ' + err.message);
    }
  } else if (err) {
    req.flash('error', 'Error: ' + err.message);
  }
  res.redirect(req.headers.referer || '/');
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
