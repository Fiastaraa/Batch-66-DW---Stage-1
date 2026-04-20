const pool = require('../db');

const CATEGORY_OPTIONS = [
  'Web Development',
  'Mobile Development',
  'UI/UX Design',
  'Backend Development',
  'Full Stack',
  'Data Science',
  'Machine Learning',
  'DevOps',
  'General'
];

const STATUS_OPTIONS = [
  'Planning',
  'In Progress',
  'Completed',
  'On Hold',
  'Cancelled'
];

const TECHNOLOGY_OPTIONS = [
  'HTML',
  'CSS',
  'JavaScript',
  'TypeScript',
  'React',
  'Vue.js',
  'Angular',
  'Node.js',
  'Express.js',
  'Python',
  'Django',
  'Flask',
  'PHP',
  'Laravel',
  'Java',
  'Spring Boot',
  'C#',
  '.NET',
  'Ruby',
  'Rails',
  'Go',
  'Rust',
  'Swift',
  'Kotlin',
  'Flutter',
  'React Native',
  'MongoDB',
  'PostgreSQL',
  'MySQL',
  'SQLite',
  'Redis',
  'Docker',
  'Kubernetes',
  'AWS',
  'Azure',
  'GCP',
  'Git',
  'Bootstrap',
  'Tailwind CSS',
  'Sass',
  'Handlebars',
  'EJS',
  'Jinja2'
];

// Helper function to normalize technologies input
const normalizeTechnologies = (technologies) => {
  if (Array.isArray(technologies)) {
    return technologies.filter(Boolean);
  }
  if (typeof technologies === 'string') {
    return technologies.split(',').map(tech => tech.trim()).filter(Boolean);
  }
  return [];
};

const slugify = (value = '') =>
  value
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');

const makeUniqueSlug = async (title, excludeId = null) => {
  const baseSlug = slugify(title) || `project-${Date.now()}`;
  let candidate = baseSlug;
  let index = 1;

  while (true) {
    const existing = await pool.query(
      'SELECT id FROM projects WHERE slug = $1 AND id != $2',
      [candidate, excludeId || -1]
    );

    if (existing.rows.length === 0) {
      break;
    }

    candidate = `${baseSlug}-${index}`;
    index += 1;
  }

  return candidate;
};

// CRUD Operations
const createProject = async (data) => {
  const errors = validateProject(data);
  if (errors.length > 0) {
    throw new Error(`Validation failed: ${errors.join(', ')}`);
  }

  const slug = await makeUniqueSlug(data.title);

  const technologies = normalizeTechnologies(data.technologies);

  const query = `
    INSERT INTO projects (slug, title, category, description, technologies, status, year, challenge, solution, is_featured)
    VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)
    RETURNING *
  `;

  const values = [
    slug,
    data.title.trim(),
    data.category,
    data.description.trim(),
    technologies,
    data.status,
    data.year ? parseInt(data.year) : null,
    data.challenge ? data.challenge.trim() : null,
    data.solution ? data.solution.trim() : null,
    data.isFeatured === 'on' || data.isFeatured === true
  ];

  try {
    const result = await pool.query(query, values);
    return formatProject(result.rows[0]);
  } catch (error) {
    console.error('Error creating project:', error);
    throw new Error('Failed to create project');
  }
};

const getAllProjects = async (filters = {}) => {
  let query = 'SELECT * FROM projects WHERE 1=1';
  const values = [];
  let paramIndex = 1;

  if (filters.search) {
    query += ` AND (title ILIKE $${paramIndex} OR description ILIKE $${paramIndex})`;
    values.push(`%${filters.search}%`);
    paramIndex++;
  }

  if (filters.category) {
    query += ` AND category = $${paramIndex}`;
    values.push(filters.category);
    paramIndex++;
  }

  if (filters.status) {
    query += ` AND status = $${paramIndex}`;
    values.push(filters.status);
    paramIndex++;
  }

  if (filters.featuredOnly) {
    query += ` AND is_featured = true`;
  }

  query += ' ORDER BY updated_at DESC';

  try {
    const result = await pool.query(query, values);
    return result.rows.map(formatProject);
  } catch (error) {
    console.error('Error fetching projects:', error);
    throw new Error('Failed to fetch projects');
  }
};

const getProjectById = async (id) => {
  try {
    const result = await pool.query('SELECT * FROM projects WHERE id = $1', [id]);

    if (result.rows.length === 0) {
      return null;
    }

    return formatProject(result.rows[0]);
  } catch (error) {
    console.error('Error fetching project by ID:', error);
    throw new Error('Failed to fetch project');
  }
};

const updateProject = async (id, data) => {
  const errors = validateProject(data);
  if (errors.length > 0) {
    throw new Error(`Validation failed: ${errors.join(', ')}`);
  }

  const existing = await getProjectById(id);
  if (!existing) {
    return null;
  }

  const slug = await makeUniqueSlug(data.title, id);

  const technologies = normalizeTechnologies(data.technologies);

  const query = `
    UPDATE projects
    SET slug = $1, title = $2, category = $3, description = $4, technologies = $5,
        status = $6, year = $7, challenge = $8, solution = $9, is_featured = $10,
        updated_at = CURRENT_TIMESTAMP
    WHERE id = $11
    RETURNING *
  `;

  const values = [
    slug,
    data.title.trim(),
    data.category,
    data.description.trim(),
    technologies,
    data.status,
    data.year ? parseInt(data.year) : null,
    data.challenge ? data.challenge.trim() : null,
    data.solution ? data.solution.trim() : null,
    data.isFeatured === 'on' || data.isFeatured === true,
    id
  ];

  try {
    const result = await pool.query(query, values);
    return formatProject(result.rows[0]);
  } catch (error) {
    console.error('Error updating project:', error);
    throw new Error('Failed to update project');
  }
};

const deleteProject = async (id) => {
  try {
    const result = await pool.query('DELETE FROM projects WHERE id = $1 RETURNING id', [id]);

    if (result.rows.length === 0) {
      throw new Error('Project not found');
    }

    return true;
  } catch (error) {
    console.error('Error deleting project:', error);
    throw new Error('Failed to delete project');
  }
};

const getProjectStatistics = async () => {
  try {
    const result = await pool.query(`
      SELECT
        COUNT(*) as total,
        COUNT(CASE WHEN status = 'Completed' THEN 1 END) as completed,
        COUNT(CASE WHEN status = 'In Progress' THEN 1 END) as in_progress,
        COUNT(CASE WHEN is_featured = true THEN 1 END) as featured,
        COUNT(DISTINCT category) as categories
      FROM projects
    `);

    return result.rows[0];
  } catch (error) {
    console.error('Error fetching project statistics:', error);
    throw new Error('Failed to fetch project statistics');
  }
};

const getTechnologyBreakdown = async () => {
  try {
    const result = await pool.query(`
      SELECT
        unnest(technologies) as technology,
        COUNT(*) as count
      FROM projects
      GROUP BY technology
      ORDER BY count DESC
    `);

    return result.rows;
  } catch (error) {
    console.error('Error fetching technology breakdown:', error);
    throw new Error('Failed to fetch technology breakdown');
  }
};

// Helper function to format database row to match app expectations
const formatProject = (row) => ({
  id: row.id,
  slug: row.slug,
  title: row.title,
  category: row.category,
  description: row.description,
  technologies: row.technologies || [],
  status: row.status,
  year: row.year,
  challenge: row.challenge,
  solution: row.solution,
  isFeatured: row.is_featured,
  createdAt: row.created_at,
  updatedAt: row.updated_at
});

module.exports = {
  CATEGORY_OPTIONS,
  STATUS_OPTIONS,
  TECHNOLOGY_OPTIONS,
  createProject,
  getAllProjects,
  getProjectById,
  updateProject,
  deleteProject,
  getProjectStatistics,
  getTechnologyBreakdown
};