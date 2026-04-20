const fs = require('fs');
const path = require('path');
const pool = require('./db');

async function runSchema() {
  try {
    // Drop tables if they exist
    await pool.query('DROP TABLE IF EXISTS projects CASCADE');
    await pool.query('DROP TABLE IF EXISTS contact_messages CASCADE');
    await pool.query('DROP TABLE IF EXISTS users CASCADE');

    const schemaPath = path.join(__dirname, 'schema.sql');
    const schema = fs.readFileSync(schemaPath, 'utf8');

    // Split the schema into individual statements
    const statements = schema.split(';').filter(stmt => stmt.trim().length > 0);

    for (const statement of statements) {
      if (statement.trim()) {
        console.log('Executing:', statement.trim().substring(0, 50) + '...');
        await pool.query(statement);
      }
    }

    console.log('Schema executed successfully');

    // Insert some default data
    const defaultProjects = [
      {
        slug: 'responsive-portfolio-website',
        title: 'Responsive Portfolio Website',
        category: 'Web Development',
        description: 'A personal portfolio that combines Bootstrap layout, custom CSS, JavaScript interactivity, and reusable Handlebars sections.',
        technologies: ['HTML', 'CSS', 'Bootstrap', 'JavaScript', 'Handlebars'],
        status: 'Completed',
        year: 2026,
        challenge: 'Present coursework topics in one polished application instead of scattered files.',
        solution: 'Used a modular Express.js structure with reusable templates, helper functions, and a clean visual system.',
        is_featured: true
      },
      {
        slug: 'project-crud-dashboard',
        title: 'Project CRUD Dashboard',
        category: 'Backend Practice',
        description: 'A lightweight CRUD workflow for adding, editing, reviewing, and deleting project entries with database storage.',
        technologies: ['Express.js', 'PostgreSQL', 'Routing', 'Async/Await'],
        status: 'In Progress',
        year: 2026,
        challenge: 'Create a database-driven CRUD system with proper validation and error handling.',
        solution: 'Implemented full CRUD operations with PostgreSQL, input validation, and comprehensive error handling.',
        is_featured: true
      },
      {
        slug: 'contact-and-local-storage-lab',
        title: 'Contact and Local Storage Lab',
        category: 'Front-End Fundamentals',
        description: 'A contact page with Bootstrap flexbox, form validation, draft persistence in localStorage, and dynamic rendering examples.',
        technologies: ['Flexbox', 'Forms', 'Local Storage', 'Loops', 'Arrays'],
        status: 'Completed',
        year: 2026,
        challenge: 'Show multiple JavaScript concepts in a practical, easy-to-explain way.',
        solution: 'Combined dynamic rendering, higher-order functions, and browser storage in one interactive page.',
        is_featured: false
      }
    ];

    for (const project of defaultProjects) {
      const query = `
        INSERT INTO projects (slug, title, category, description, technologies, status, year, challenge, solution, is_featured)
        VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)
        ON CONFLICT (slug) DO NOTHING
      `;
      const values = [
        project.slug,
        project.title,
        project.category,
        project.description,
        project.technologies,
        project.status,
        project.year,
        project.challenge,
        project.solution,
        project.is_featured
      ];
      await pool.query(query, values);
    }

    console.log('Default data inserted successfully');
  } catch (error) {
    console.error('Error running schema:', error);
  } finally {
    await pool.end();
  }
}

runSchema();