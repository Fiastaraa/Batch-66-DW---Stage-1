const express = require("express");
const path = require("path");
const fs = require("fs/promises");
const { engine } = require("express-handlebars");

const app = express();
const PORT = process.env.PORT || 3000;

const DATA_DIR = path.join(__dirname, "data");
const PROJECTS_FILE = path.join(DATA_DIR, "projects.json");
const MESSAGES_FILE = path.join(DATA_DIR, "messages.json");

const DEFAULT_PROJECTS = [
  {
    id: "project-1001",
    slug: "responsive-portfolio-website",
    title: "Responsive Portfolio Website",
    category: "Web Development",
    description:
      "A personal portfolio that combines Bootstrap layout, custom CSS, JavaScript interactivity, and reusable Handlebars sections.",
    technologies: ["HTML", "CSS", "Bootstrap", "JavaScript", "Handlebars"],
    status: "Completed",
    year: 2026,
    challenge:
      "Present coursework topics in one polished application instead of scattered files.",
    solution:
      "Used a modular Express.js structure with reusable templates, helper functions, and a clean visual system.",
    isFeatured: true,
    createdAt: "2026-04-14T07:00:00.000Z",
    updatedAt: "2026-04-14T07:00:00.000Z"
  },
  {
    id: "project-1002",
    slug: "project-crud-dashboard",
    title: "Project CRUD Dashboard",
    category: "Backend Practice",
    description:
      "A lightweight CRUD workflow for adding, editing, reviewing, and deleting project entries with file-based storage.",
    technologies: ["Express.js", "Routing", "Async/Await", "JSON Storage"],
    status: "In Progress",
    year: 2026,
    challenge:
      "Create a beginner-friendly data workflow without adding a database setup burden.",
    solution:
      "Stored records in JSON files and wrapped every operation in async utility functions.",
    isFeatured: true,
    createdAt: "2026-04-14T07:10:00.000Z",
    updatedAt: "2026-04-14T07:10:00.000Z"
  },
  {
    id: "project-1003",
    slug: "contact-and-local-storage-lab",
    title: "Contact and Local Storage Lab",
    category: "Front-End Fundamentals",
    description:
      "A contact page with Bootstrap flexbox, form validation, draft persistence in localStorage, and dynamic rendering examples.",
    technologies: ["Flexbox", "Forms", "Local Storage", "Loops", "Arrays"],
    status: "Completed",
    year: 2026,
    challenge:
      "Show multiple JavaScript concepts in a practical, easy-to-explain way.",
    solution:
      "Combined dynamic rendering, higher-order functions, and browser storage in one interactive page.",
    isFeatured: false,
    createdAt: "2026-04-14T07:20:00.000Z",
    updatedAt: "2026-04-14T07:20:00.000Z"
  }
];

app.engine(
  "hbs",
  engine({
    extname: "hbs",
    defaultLayout: "main",
    helpers: {
      eq: (left, right) => left === right,
      gt: (left, right) => Number(left) > Number(right),
      join: (items, separator = ", ") =>
        Array.isArray(items) ? items.join(separator) : "",
      formatDate: (value) =>
        value
          ? new Intl.DateTimeFormat("en-US", { dateStyle: "medium" }).format(
              new Date(value)
            )
          : "",
      truncate: (value = "", limit = 140) =>
        value.length > limit ? `${value.slice(0, limit).trim()}...` : value,
      badgeClass: (status = "") => {
        const styles = {
          Completed: "text-bg-success",
          "In Progress": "text-bg-warning",
          Draft: "text-bg-secondary"
        };

        return styles[status] || "text-bg-primary";
      },
      isActive: (currentPath, targetPath) =>
        currentPath === targetPath ? "active" : "",
      checked: (value) => (value ? "checked" : ""),
      selected: (currentValue, optionValue) =>
        currentValue === optionValue ? "selected" : "",
      stringify: (value) => JSON.stringify(value, null, 2)
    }
  })
);

app.set("view engine", "hbs");
app.set("views", path.join(__dirname, "views"));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));
app.use("/assets", express.static(path.join(__dirname, "src")));

app.use((req, res, next) => {
  res.locals.currentPath = req.path;
  res.locals.flashMessage = req.query.message || "";
  res.locals.flashType = req.query.type || "success";
  res.locals.currentYear = new Date().getFullYear();
  next();
});

const slugify = (value = "") =>
  value
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");

const splitTechnologies = (value = "") =>
  String(value)
    .split(",")
    .map((item) => item.trim())
    .filter(Boolean);

const ensureDataFiles = async () => {
  await fs.mkdir(DATA_DIR, { recursive: true });

  for (const [filePath, fallback] of [
    [PROJECTS_FILE, DEFAULT_PROJECTS],
    [MESSAGES_FILE, []]
  ]) {
    try {
      await fs.access(filePath);
    } catch {
      await fs.writeFile(filePath, JSON.stringify(fallback, null, 2));
    }
  }
};

const readJson = async (filePath, fallback = []) => {
  try {
    const raw = await fs.readFile(filePath, "utf8");
    return JSON.parse(raw);
  } catch {
    return fallback;
  }
};

const writeJson = async (filePath, data) => {
  await fs.writeFile(filePath, JSON.stringify(data, null, 2));
};

const getProjects = async () => {
  const projects = await readJson(PROJECTS_FILE, []);

  return projects.sort(
    (left, right) => new Date(right.updatedAt) - new Date(left.updatedAt)
  );
};

const findProjectBySlug = async (slug) => {
  const projects = await getProjects();
  return projects.find((project) => project.slug === slug);
};

const makeUniqueSlug = (title, projects, currentSlug = "") => {
  const baseSlug = slugify(title) || `project-${Date.now()}`;
  let candidate = baseSlug;
  let index = 1;

  while (
    projects.some(
      (project) => project.slug === candidate && project.slug !== currentSlug
    )
  ) {
    candidate = `${baseSlug}-${index}`;
    index += 1;
  }

  return candidate;
};

const buildProjectPayload = (body, slug, currentProject = {}) => ({
  id: currentProject.id || `project-${Date.now()}`,
  slug,
  title: (body.title || "").trim(),
  category: (body.category || "").trim() || "General",
  description: (body.description || "").trim(),
  technologies: splitTechnologies(body.technologies),
  status: body.status || "Draft",
  year: Number(body.year) || new Date().getFullYear(),
  challenge: (body.challenge || "").trim(),
  solution: (body.solution || "").trim(),
  isFeatured: body.isFeatured === "on",
  createdAt: currentProject.createdAt || new Date().toISOString(),
  updatedAt: new Date().toISOString()
});

app.get("/", async (req, res, next) => {
  try {
    const projects = await getProjects();
    const featuredProjects = projects.filter((project) => project.isFeatured);
    const totalTechnologies = new Set(
      projects.flatMap((project) => project.technologies)
    ).size;

    res.render("home", {
      pageTitle: "Home",
      featuredProjects,
      stats: {
        totalProjects: projects.length,
        completedProjects: projects.filter(
          (project) => project.status === "Completed"
        ).length,
        totalTechnologies
      }
    });
  } catch (error) {
    next(error);
  }
});

app.get("/projects", async (req, res, next) => {
  try {
    const projects = await getProjects();

    res.render("projects", {
      pageTitle: "Projects",
      projects
    });
  } catch (error) {
    next(error);
  }
});

app.get("/projects/new", (req, res) => {
  res.render("project-form", {
    pageTitle: "Create Project",
    formTitle: "Create New Project",
    submitLabel: "Save Project",
    action: "/projects",
    cancelHref: "/projects",
    project: {
      status: "Draft",
      year: new Date().getFullYear()
    }
  });
});

app.post("/projects", async (req, res, next) => {
  try {
    const projects = await getProjects();
    const slug = makeUniqueSlug(req.body.title, projects);
    const newProject = buildProjectPayload(req.body, slug);

    projects.unshift(newProject);
    await writeJson(PROJECTS_FILE, projects);

    res.redirect(
      "/projects?type=success&message=Project%20created%20successfully."
    );
  } catch (error) {
    next(error);
  }
});

app.get("/projects/:slug", async (req, res, next) => {
  try {
    const project = await findProjectBySlug(req.params.slug);

    if (!project) {
      return res.status(404).render("error", {
        pageTitle: "Project Not Found",
        title: "Project not found",
        description:
          "The project you are trying to open does not exist anymore."
      });
    }

    res.render("project-detail", {
      pageTitle: project.title,
      project
    });
  } catch (error) {
    next(error);
  }
});

app.get("/projects/:slug/edit", async (req, res, next) => {
  try {
    const project = await findProjectBySlug(req.params.slug);

    if (!project) {
      return res.status(404).render("error", {
        pageTitle: "Project Not Found",
        title: "Project not found",
        description: "There is nothing to edit because the project is missing."
      });
    }

    res.render("project-form", {
      pageTitle: `Edit ${project.title}`,
      formTitle: `Edit ${project.title}`,
      submitLabel: "Update Project",
      action: `/projects/${project.slug}/update`,
      cancelHref: `/projects/${project.slug}`,
      project: {
        ...project,
        technologyInput: project.technologies.join(", ")
      }
    });
  } catch (error) {
    next(error);
  }
});

app.post("/projects/:slug/update", async (req, res, next) => {
  try {
    const projects = await getProjects();
    const projectIndex = projects.findIndex(
      (project) => project.slug === req.params.slug
    );

    if (projectIndex === -1) {
      return res.status(404).render("error", {
        pageTitle: "Project Not Found",
        title: "Project not found",
        description: "This project could not be updated because it was missing."
      });
    }

    const currentProject = projects[projectIndex];
    const updatedSlug = makeUniqueSlug(
      req.body.title,
      projects,
      currentProject.slug
    );

    projects[projectIndex] = buildProjectPayload(
      req.body,
      updatedSlug,
      currentProject
    );

    await writeJson(PROJECTS_FILE, projects);

    res.redirect(
      `/projects/${updatedSlug}?type=success&message=Project%20updated%20successfully.`
    );
  } catch (error) {
    next(error);
  }
});

app.post("/projects/:slug/delete", async (req, res, next) => {
  try {
    const projects = await getProjects();
    const filteredProjects = projects.filter(
      (project) => project.slug !== req.params.slug
    );

    await writeJson(PROJECTS_FILE, filteredProjects);

    res.redirect(
      "/projects?type=success&message=Project%20deleted%20successfully."
    );
  } catch (error) {
    next(error);
  }
});

app.get("/contact", async (req, res, next) => {
  try {
    const messages = await readJson(MESSAGES_FILE, []);

    res.render("contact", {
      pageTitle: "Contact",
      savedMessageCount: messages.length
    });
  } catch (error) {
    next(error);
  }
});

app.post("/contact", async (req, res, next) => {
  try {
    const messages = await readJson(MESSAGES_FILE, []);
    const newMessage = {
      id: `message-${Date.now()}`,
      name: (req.body.name || "").trim(),
      email: (req.body.email || "").trim(),
      reason: (req.body.reason || "").trim(),
      budget: (req.body.budget || "").trim(),
      message: (req.body.message || "").trim(),
      createdAt: new Date().toISOString()
    };

    messages.unshift(newMessage);
    await writeJson(MESSAGES_FILE, messages);

    res.redirect(
      "/contact?type=success&message=Thanks!%20Your%20message%20was%20saved."
    );
  } catch (error) {
    next(error);
  }
});

app.get("/api/projects", async (req, res, next) => {
  try {
    const projects = await getProjects();
    res.json({ projects });
  } catch (error) {
    next(error);
  }
});

app.get("/api/projects/:slug", async (req, res, next) => {
  try {
    const project = await findProjectBySlug(req.params.slug);

    if (!project) {
      return res.status(404).json({ message: "Project not found" });
    }

    res.json({ project });
  } catch (error) {
    next(error);
  }
});

app.use((req, res) => {
  res.status(404).render("error", {
    pageTitle: "Page Not Found",
    title: "Page not found",
    description:
      "Try heading back to the homepage or opening the projects section."
  });
});

app.use((error, req, res, next) => {
  console.error(error);

  res.status(500).render("error", {
    pageTitle: "Server Error",
    title: "Something went wrong",
    description:
      "The server hit an unexpected error while processing your request."
  });
});

const startServer = async () => {
  await ensureDataFiles();

  app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
  });
};

startServer();
