const express = require("express");

const {
  CATEGORY_OPTIONS,
  STATUS_OPTIONS,
  TECHNOLOGY_OPTIONS,
  createProject,
  deleteProject,
  getAllProjects,
  getProjectById,
  getProjectStatistics,
  getTechnologyBreakdown,
  updateProject,
} = require("../src/projectStore");

const router = express.Router();

const learningModules = [
  "HTML structure and semantic sections",
  "CSS variables and responsive layout styling",
  "Bootstrap flexbox utilities and contact form",
  "JavaScript data types, variables, operators, conditionals, loops, and functions",
  "Dynamic rendering with arrays, objects, and higher-order functions",
  "Local storage draft handling and notes",
  "Express.js routing and async CRUD flows",
  "Handlebars partials, helpers, expressions, and dynamic routes",
];

const jsConceptSeed = [
  {
    title: "Data Types and Variables",
    example:
      "const author = 'Fiastara'; let projectCount = 4; const isPortfolioReady = true;",
    focus: "string, number, boolean",
  },
  {
    title: "Functions and Operators",
    example:
      "const totalBudget = projects.reduce((sum, project) => sum + project.budget, 0);",
    focus: "functions, arithmetic, assignment",
  },
  {
    title: "Conditionals and Loops",
    example:
      "for (const project of projects) { if (project.status === 'Completed') completed++; }",
    focus: "if/else, for...of",
  },
  {
    title: "Arrays and Object Functions",
    example:
      "const categories = [...new Set(projects.map((project) => project.category))];",
    focus: "map, Set, object access",
  },
  {
    title: "Higher-Order Functions",
    example:
      "const featured = projects.filter((project) => project.featured).map((project) => project.title);",
    focus: "filter, map, callbacks",
  },
  {
    title: "Local Storage",
    example:
      "localStorage.setItem('fiastara-lab-notes', JSON.stringify(notes));",
    focus: "browser persistence",
  },
];

function buildFormModel(project = {}) {
  const selectedTechnologies = Array.isArray(project.technologies)
    ? project.technologies
    : [];

  return {
    project,
    categories: CATEGORY_OPTIONS.map((value) => ({
      value,
      selected: value === project.category,
    })),
    statuses: STATUS_OPTIONS.map((value) => ({
      value,
      selected: value === project.status,
    })),
    technologies: TECHNOLOGY_OPTIONS.map((value) => ({
      value,
      checked: selectedTechnologies.includes(value),
    })),
  };
}

router.get("/", async (req, res, next) => {
  try {
    const [projects, stats, technologyBreakdown] = await Promise.all([
      getAllProjects({ featuredOnly: true }),
      getProjectStatistics(),
      getTechnologyBreakdown(),
    ]);

    res.render("home", {
      title: "Fiastara Dev Showcase",
      currentPage: "home",
      featuredProjects: projects.slice(0, 3),
      stats,
      technologyBreakdown: technologyBreakdown.slice(0, 6),
      learningModules,
    });
  } catch (error) {
    next(error);
  }
});

router.get("/projects", async (req, res, next) => {
  try {
    const filters = {
      search: req.query.search || "",
      category: req.query.category || "",
      status: req.query.status || "",
    };

    const [projects, stats] = await Promise.all([
      getAllProjects(filters),
      getProjectStatistics(),
    ]);

    res.render("projects", {
      title: "Project Dashboard",
      currentPage: "projects",
      projects,
      stats,
      filters,
      categories: CATEGORY_OPTIONS,
      statuses: STATUS_OPTIONS,
    });
  } catch (error) {
    next(error);
  }
});

router.get("/projects/new", (req, res) => {
  res.render("project-form", {
    title: "Create Project",
    currentPage: "projects",
    formTitle: "Create a New Project",
    formAction: "/projects",
    submitLabel: "Create Project",
    isEdit: false,
    ...buildFormModel({
      status: "Planning",
      category: CATEGORY_OPTIONS[0],
      technologies: ["HTML", "CSS", "JavaScript"],
    }),
  });
});

router.post("/projects", async (req, res, next) => {
  try {
    const createdProject = await createProject(req.body);
    res.redirect(`/projects/${createdProject.id}?created=true`);
  } catch (error) {
    next(error);
  }
});

router.get("/projects/:id", async (req, res, next) => {
  try {
    const project = await getProjectById(req.params.id);

    if (!project) {
      return res.status(404).render("error", {
        title: "Project Not Found",
        currentPage: "error",
        message: "The project you requested could not be found.",
      });
    }

    res.render("project-detail", {
      title: project.title,
      currentPage: "projects",
      project,
      created: req.query.created === "true",
      updated: req.query.updated === "true",
    });
  } catch (error) {
    next(error);
  }
});

router.get("/projects/:id/edit", async (req, res, next) => {
  try {
    const project = await getProjectById(req.params.id);

    if (!project) {
      return res.status(404).render("error", {
        title: "Project Not Found",
        currentPage: "error",
        message: "The project you want to edit does not exist.",
      });
    }

    res.render("project-form", {
      title: `Edit ${project.title}`,
      currentPage: "projects",
      formTitle: "Update Project",
      formAction: `/projects/${project.id}/update`,
      submitLabel: "Save Changes",
      isEdit: true,
      ...buildFormModel(project),
    });
  } catch (error) {
    next(error);
  }
});

router.post("/projects/:id/update", async (req, res, next) => {
  try {
    const updatedProject = await updateProject(req.params.id, req.body);

    if (!updatedProject) {
      return res.status(404).render("error", {
        title: "Project Not Found",
        currentPage: "error",
        message: "The project you want to update does not exist.",
      });
    }

    res.redirect(`/projects/${updatedProject.id}?updated=true`);
  } catch (error) {
    next(error);
  }
});

router.post("/projects/:id/delete", async (req, res, next) => {
  try {
    await deleteProject(req.params.id);
    res.redirect("/projects?deleted=true");
  } catch (error) {
    next(error);
  }
});

router.get("/contact", (req, res) => {
  res.render("contact", {
    title: "Contact",
    currentPage: "contact",
    sent: req.query.sent === "true",
  });
});

router.post("/contact", async (req, res, next) => {
  try {
    await new Promise((resolve) => setTimeout(resolve, 250));
    res.redirect("/contact?sent=true");
  } catch (error) {
    next(error);
  }
});

router.get("/javascript-lab", async (req, res, next) => {
  try {
    const [projects, stats] = await Promise.all([
      getAllProjects(),
      getProjectStatistics(),
    ]);

    res.render("javascript-lab", {
      title: "JavaScript Lab",
      currentPage: "javascript-lab",
      conceptSeed: jsConceptSeed,
      projectSeed: projects.map((project) => ({
        title: project.title,
        status: project.status,
        category: project.category,
        budget: project.budget,
        technologies: project.technologies,
      })),
      stats,
      localStorageSteps: [
        "Read the previous note list from localStorage.",
        "Push the newest note into the array.",
        "Convert the array back into JSON text.",
        "Save it with setItem so the browser remembers it.",
      ],
    });
  } catch (error) {
    next(error);
  }
});

router.use((req, res) => {
  res.status(404).render("error", {
    title: "Page Not Found",
    currentPage: "error",
    message: "That page does not exist in this demo project.",
  });
});

module.exports = router;
