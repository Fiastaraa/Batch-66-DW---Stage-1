// Local storage key for project data
const STORAGE_KEY = 'dw-projects';

// Get stored project array or return an empty list
function getProjectsFromStorage() {
    return JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];
}

// Save the project array back to storage
function saveProjectsToStorage(projects) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(projects));
}

// Build project object from the add project form fields
function getFormData() {
    const name = document.getElementById('projectName')?.value.trim() || '';
    const startDate = document.getElementById('projectStartDate')?.value || '';
    const endDate = document.getElementById('projectEndDate')?.value || '';
    const description = document.getElementById('projectDescription')?.value.trim() || '';
    const category = document.getElementById('projectCategory')?.value || 'Other';
    const imageFile = document.getElementById('projectImage')?.files[0] || null;
    const technologies = Array.from(document.querySelectorAll('.tech-checkbox'))
        .filter((checkbox) => checkbox.checked)
        .map((checkbox) => checkbox.value);

    return { name, startDate, endDate, description, category, imageFile, technologies };
}

// Validate the add project form using required rules and some()
function validateForm(data) {
    const errors = [];
    if (!data.name) errors.push('Project name is required.');
    if (!data.startDate || !data.endDate) errors.push('Start date and end date are required.');
    if (data.startDate && data.endDate && data.startDate > data.endDate) {
        errors.push('Start date must be before or equal to end date.');
    }
    if (!data.description) errors.push('Description is required.');
    if (!data.technologies.some(Boolean)) errors.push('Please select at least one technology.');
    if (!data.imageFile) errors.push('Project image is required.');
    return errors;
}

function addProject(event) {
    event.preventDefault();
    const errorBox = document.getElementById('formError');
    if (errorBox) errorBox.textContent = '';

    const formData = getFormData();
    const errors = validateForm(formData);
    if (errors.length > 0) {
        if (errorBox) {
            errorBox.textContent = errors.join(' ');
        } else {
            alert(errors.join('\n'));
        }
        return;
    }

    const reader = new FileReader();
    reader.onload = function (event) {
        const projects = getProjectsFromStorage();
        const newProject = {
            id: Date.now().toString(),
            name: formData.name,
            category: formData.category,
            description: formData.description,
            startDate: formData.startDate,
            endDate: formData.endDate,
            technologies: formData.technologies,
            image: event.target.result,
        };

        projects.push(newProject);
        saveProjectsToStorage(projects);
        window.location.href = 'index.html';
    };

    reader.readAsDataURL(formData.imageFile);
}

// Higher-order function: renderProjects accepts a projects array and a callback to create each card
function renderProjects(projects, callback) {
    const projectCards = document.getElementById('projectCards');
    if (!projectCards) return;
    if (projects.length === 0) {
        projectCards.innerHTML = `
            <div class="col-12">
                <div class="alert alert-warning text-center">No projects yet, please add a new project.</div>
            </div>
        `;
        document.getElementById('projectSummary').textContent = '';
        return;
    }

    projectCards.innerHTML = projects
        .map((project) => callback(project))
        .join('');
    renderProjectSummary(projects);
}

// Callback that generates HTML for a single project card
function createProjectCard(project) {
    const duration = getProjectDuration(project.startDate, project.endDate);
    const techIcons = getTechIcons(project.technologies);

    return `
        <div class="col-md-6 col-lg-4">
            <div class="card h-100 project-card">
                <img src="${project.image}" class="card-img-top" alt="${project.name}">
                <div class="card-body d-flex flex-column">
                    <h5 class="card-title">${project.name}</h5>
                    <div class="mb-2">
                        <span class="badge bg-primary me-1">${project.category}</span>
                        <span class="badge bg-secondary">${duration}</span>
                    </div>
                    <p class="card-text flex-grow-1">${project.description.substring(0, 100)}${project.description.length > 100 ? '...' : ''}</p>
                    <div class="mb-3 tech-list">${techIcons}</div>
                    <div class="mt-auto d-flex gap-2 flex-wrap">
                        <button type="button" class="btn btn-sm btn-primary" onclick="showProjectDetail('${project.id}')">Details</button>
                        <button type="button" class="btn btn-sm btn-outline-danger" onclick="handleProjectAction(deleteProject, '${project.id}')">Delete</button>
                    </div>
                </div>
            </div>
        </div>
    `;
}

function getProjectDuration(startDate, endDate) {
    const start = new Date(startDate);
    const end = new Date(endDate);
    const difference = Math.abs(end - start);
    const days = Math.ceil(difference / (1000 * 60 * 60 * 24)) + 1;
    return `${days} day${days !== 1 ? 's' : ''}`;
}

function getTechIcons(technologies) {
    const iconMap = {
        HTML: 'fab fa-html5',
        CSS: 'fab fa-css3-alt',
        JavaScript: 'fab fa-js',
        Bootstrap: 'fab fa-bootstrap',
        Figma: 'fab fa-figma',
    };

    return technologies
        .map((tech) => {
            const iconClass = iconMap[tech] || 'fa-solid fa-code';
            return `<span class="badge bg-secondary tech-badge"><i class="${iconClass}"></i> ${tech}</span>`;
        })
        .join('');
}

// Search projects by name using filter() + includes()
function searchProjects(projects, keyword) {
    const lowerKeyword = keyword.trim().toLowerCase();
    if (!lowerKeyword) return projects;
    return projects.filter((project) => project.name.toLowerCase().includes(lowerKeyword));
}

// Category filtering using filter() and callback
function filterProjects(projects, category) {
    if (!category) return projects;
    return projects.filter((project) => project.category === category);
}

// Delete project by id and re-render the filtered list
function deleteProject(id) {
    const projects = getProjectsFromStorage();
    const filteredProjects = projects.filter((project) => project.id !== id);
    saveProjectsToStorage(filteredProjects);

    const keyword = document.getElementById('searchInput')?.value || '';
    const category = document.getElementById('categoryFilter')?.value || '';
    const visibleProjects = filterProjects(searchProjects(filteredProjects, keyword), category);
    renderProjects(visibleProjects, createProjectCard);
}

// Generic confirmation wrapper using callback pattern
function confirmAction(callback) {
    if (confirm('Are you sure you want to delete this project?')) {
        callback();
    }
}

// General action handler using a callback function for actions like delete
function handleProjectAction(callback, id) {
    confirmAction(() => callback(id));
}

// Navigate to the project detail page with query parameter
function showProjectDetail(id) {
    window.location.href = `project-detail.html?id=${encodeURIComponent(id)}`;
}

function getUrlParameter(name) {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get(name) || '';
}

// Load selected project detail using find()
function loadProjectDetail() {
    const projectId = getUrlParameter('id');
    const projectDetail = document.getElementById('projectDetail');
    const projects = getProjectsFromStorage();
    const project = projects.find((item) => item.id === projectId);

    if (!project || !projectDetail) {
        if (projectDetail) {
            projectDetail.innerHTML = '<p class="text-center">Project not found.</p>';
        }
        return;
    }

    const duration = getProjectDuration(project.startDate, project.endDate);
    const technologies = project.technologies.map((tech) => `<span class="badge bg-secondary tech-badge">${tech}</span>`).join(' ');

    projectDetail.innerHTML = `
        <div class="text-center mb-4">
            <img src="${project.image}" alt="${project.name}" class="img-fluid rounded mb-3" style="max-height: 400px; width: 100%; object-fit: cover;">
        </div>
        <h2 class="mb-3">${project.name}</h2>
        <p class="mb-2"><strong>Category:</strong> ${project.category}</p>
        <p class="mb-2"><strong>Duration:</strong> ${duration}</p>
        <p class="mb-2"><strong>Dates:</strong> ${project.startDate} to ${project.endDate}</p>
        <p class="mb-3"><strong>Description:</strong> ${project.description}</p>
        <div class="mb-3"><strong>Technologies:</strong> ${technologies}</div>
    `;
}

// Compute summary stats using reduce()
function renderProjectSummary(projects) {
    const summaryElement = document.getElementById('projectSummary');
    if (!summaryElement) return;

    const summary = projects.reduce(
        (acc, project) => {
            acc.total += 1;
            acc.categories[project.category] = (acc.categories[project.category] || 0) + 1;
            return acc;
        },
        { total: 0, categories: {} }
    );

    const categoryText = Object.entries(summary.categories)
        .map(([name, count]) => `${name}: ${count}`)
        .join(' • ');

    summaryElement.textContent = `Total: ${summary.total} project${summary.total !== 1 ? 's' : ''} ${categoryText ? '• ' + categoryText : ''}`;
}

function initProjectPage() {
    const projects = getProjectsFromStorage();
    renderProjects(projects, createProjectCard);

    const searchInput = document.getElementById('searchInput');
    const categoryFilter = document.getElementById('categoryFilter');

    if (searchInput) {
        searchInput.addEventListener('input', () => {
            const filtered = filterProjects(getProjectsFromStorage(), categoryFilter?.value || '');
            renderProjects(searchProjects(filtered, searchInput.value), createProjectCard);
        });
    }

    if (categoryFilter) {
        categoryFilter.addEventListener('change', () => {
            const filtered = filterProjects(getProjectsFromStorage(), categoryFilter.value);
            renderProjects(searchProjects(filtered, searchInput?.value || ''), createProjectCard);
        });
    }
}

function initNavigation() {
    document.querySelectorAll('nav a[href^="#"]').forEach((anchor) => {
        anchor.addEventListener('click', function (event) {
            event.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        });
    });
}

function initTypedText() {
    const typedElement = document.getElementById('typed-text');
    if (!typedElement) return;
    if (typeof Typed === 'undefined') return;

    new Typed('#typed-text', {
        strings: ['Web Developer', 'Fullstack Engineer', 'UI/UX Designer', 'Data Analyst'],
        typeSpeed: 80,
        backSpeed: 50,
        loop: true,
    });
}

window.addEventListener('scroll', () => {
    const header = document.querySelector('header');
    if (!header) return;
    if (window.scrollY > 100) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }
});

window.addEventListener('DOMContentLoaded', () => {
    initNavigation();
    initTypedText();

    if (document.getElementById('projectCards')) {
        initProjectPage();
    }

    if (document.getElementById('projectForm')) {
        document.getElementById('projectForm').addEventListener('submit', addProject);
    }

    if (document.getElementById('projectDetail')) {
        loadProjectDetail();
    }
});
