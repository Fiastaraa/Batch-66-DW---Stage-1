// Sticky header on scroll
window.addEventListener('scroll', function() {
    const header = document.querySelector('header');
    if (!header) return;

    if (window.scrollY > 100) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }
});

// Smooth scrolling for navigation links
const pageLinks = document.querySelectorAll('nav a[href^="#"]');
pageLinks.forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Featured Projects Section
const PROJECT_STORAGE_KEY = 'projects';

// Read project data from localStorage
function getProjects() {
    return JSON.parse(localStorage.getItem(PROJECT_STORAGE_KEY)) || [];
}

// Save project data to localStorage (reusable helper)
function saveProjects(projects) {
    localStorage.setItem(PROJECT_STORAGE_KEY, JSON.stringify(projects));
}

// Update the summary count text in the Featured Projects section
function updateProjectSummary(projects) {
    const summaryNode = document.getElementById('projectSummary');
    if (!summaryNode) return;

    const count = projects.length;
    summaryNode.innerHTML = `
        <strong>${count}</strong>
        <span>${count === 1 ? 'project available' : 'projects available'}</span>
    `;
}

// Create HTML for a single project card using HOFs and template strings
function createProjectCard(project) {
    const imageUrl = project.image || 'https://via.placeholder.com/640x360?text=Project+Preview';
    const tags = project.tags
        ? project.tags
            .split(',')
            .map(tag => tag.trim())
            .filter(Boolean)
            .map(tag => `<span class="badge me-1 mb-1">${tag}</span>`)
            .join('')
        : '';

    return `
        <div class="col-md-6 col-lg-4">
            <div class="card project-card h-100">
                <img src="${imageUrl}" class="project-card-img" alt="${project.name} thumbnail" />
                <div class="card-body d-flex flex-column">
                    <span class="project-card-category">${project.category}</span>
                    <h5 class="project-card-title">${project.name}</h5>
                    <p class="project-card-text">${project.description}</p>
                    <div class="project-card-tags">${tags}</div>
                    <div class="project-card-footer mt-auto">
                        <a href="${project.link}" target="_blank" rel="noopener noreferrer" class="btn btn-primary">View Project</a>
                    </div>
                </div>
            </div>
        </div>
    `;
}

// Render an empty state when no projects are found
function renderEmptyState() {
    const projectCards = document.getElementById('projectCards');
    if (!projectCards) return;

    projectCards.innerHTML = `
        <div class="col-12">
            <div class="project-empty text-center p-4 mb-0">
                <h5 class="mb-2">No projects available yet</h5>
                <p class="mb-0 text-muted">Add a project from the Add Project page and it will appear here automatically.</p>
            </div>
        </div>
    `;
}

// Filter projects by search term and category using .filter()
function filterProjects(projects, searchTerm, category) {
    return projects
        .filter(project => {
            const matchesSearch = project.name.toLowerCase().includes(searchTerm);
            const matchesCategory = !category || project.category === category;
            return matchesSearch && matchesCategory;
        })
        .sort((a, b) => {
            const dateA = a.date ? new Date(a.date) : new Date(0);
            const dateB = b.date ? new Date(b.date) : new Date(0);
            return dateB - dateA;
        });
}

// Render project cards into the DOM using .map()
function renderProjects(projects) {
    const projectCards = document.getElementById('projectCards');
    if (!projectCards) return;

    if (!projects.length) {
        renderEmptyState();
        updateProjectSummary([]);
        return;
    }

    projectCards.innerHTML = projects.map(createProjectCard).join('');
    updateProjectSummary(projects);
}

// Read input values and run the filter/render flow
function handleProjectFilter() {
    const searchInput = document.getElementById('searchInput');
    const categoryFilter = document.getElementById('categoryFilter');

    const searchTerm = searchInput ? searchInput.value.trim().toLowerCase() : '';
    const selectedCategory = categoryFilter ? categoryFilter.value : '';

    const projects = getProjects();
    const filteredProjects = filterProjects(projects, searchTerm, selectedCategory);

    renderProjects(filteredProjects);
}

// Set up event listeners using callback functions
document.addEventListener('DOMContentLoaded', () => {
    handleProjectFilter();

    const searchInput = document.getElementById('searchInput');
    const categoryFilter = document.getElementById('categoryFilter');

    if (searchInput) {
        searchInput.addEventListener('input', handleProjectFilter);
    }

    if (categoryFilter) {
        categoryFilter.addEventListener('change', handleProjectFilter);
    }
});
