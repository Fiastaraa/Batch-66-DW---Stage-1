const conceptGrid = document.querySelector("#jsConceptGrid");
const summaryBox = document.querySelector("#jsSummary");
const objectMethodOutput = document.querySelector("#objectMethodOutput");
const storageDocs = document.querySelector("#storageDocs");
const noteForm = document.querySelector("#noteForm");
const noteInput = document.querySelector("#noteInput");
const noteList = document.querySelector("#noteList");
const asyncProjectList = document.querySelector("#asyncProjectList");
const contactForm = document.querySelector("#contactForm");
const resetDraftButton = document.querySelector("#resetDraft");

const conceptExamples = [
  {
    title: "Data Types",
    level: "Core",
    description: "Strings, numbers, booleans, arrays, and objects keep the app data organized.",
    examples: ["'Fiastara'", "2026", "true", "['HTML', 'CSS']", "{ route: '/projects' }"]
  },
  {
    title: "Variables and Operators",
    level: "Core",
    description: "Variables store values, then operators compare or combine them for decisions.",
    examples: ["const total = 3", "const ready = total > 0", "status === 'Completed'"]
  },
  {
    title: "Functions and Conditionals",
    level: "Core",
    description: "Functions keep logic reusable, while conditionals choose what to show on screen.",
    examples: ["formatProject(project)", "if (projects.length) { ... }"]
  },
  {
    title: "Loops and Dynamic Rendering",
    level: "Practice",
    description: "Loops generate repeated UI blocks from arrays instead of hardcoding cards one by one.",
    examples: ["for...of", "map()", "innerHTML"]
  },
  {
    title: "Higher-Order Functions",
    level: "Practice",
    description: "filter(), map(), and reduce() transform data before it is rendered to the page.",
    examples: ["filter(featured)", "map(titles)", "reduce(totalTech)"]
  }
];

const storageGuide = [
  "The contact form saves a draft in localStorage on every input event.",
  "Submitting the form removes the saved draft so the next message starts clean.",
  "The note tool on the homepage stores an array of notes in the browser.",
  "Refreshing the page loads saved notes back into the DOM."
];

const developerProfile = {
  name: "Fiastara",
  role: "Creative Web Developer",
  introduce() {
    return `${this.name} builds a ${this.role.toLowerCase()} portfolio using Express.js and Handlebars.`;
  },
  summarizeTopics(topics) {
    return `This JavaScript lab currently demonstrates ${topics.length} core learning topics.`;
  }
};

const NOTES_KEY = "fiastara-notes";

const escapeHtml = (value = "") =>
  value.replace(/[&<>"']/g, (character) => {
    const entities = {
      "&": "&amp;",
      "<": "&lt;",
      ">": "&gt;",
      '"': "&quot;",
      "'": "&#39;"
    };

    return entities[character];
  });

const readNotes = () => {
  try {
    const storedNotes = localStorage.getItem(NOTES_KEY);
    return storedNotes ? JSON.parse(storedNotes) : [];
  } catch {
    return [];
  }
};

const saveNotes = (notes) => {
  localStorage.setItem(NOTES_KEY, JSON.stringify(notes));
};

const renderConceptCards = () => {
  if (!conceptGrid) {
    return;
  }

  const cards = [];

  for (const concept of conceptExamples) {
    cards.push(`
      <div class="col-md-6">
        <article class="content-card h-100">
          <div class="d-flex justify-content-between align-items-start gap-3 mb-3">
            <h3 class="h5 mb-0">${concept.title}</h3>
            <span class="badge text-bg-light border">${concept.level}</span>
          </div>
          <p class="text-muted">${concept.description}</p>
          <p class="mb-0"><strong>Examples:</strong> ${concept.examples.join(", ")}</p>
        </article>
      </div>
    `);
  }

  conceptGrid.innerHTML = cards.join("");

  const practiceTopics = conceptExamples.filter(
    (concept) => concept.level === "Practice"
  );
  const exampleCount = conceptExamples.reduce(
    (total, concept) => total + concept.examples.length,
    0
  );
  const statusLabel =
    practiceTopics.length > 0
      ? "Hands-on topics are ready to explore."
      : "Add more practice topics to continue.";

  if (summaryBox) {
    summaryBox.innerHTML = `
      <strong>Summary:</strong>
      ${statusLabel}
      There are ${conceptExamples.length} topic cards and ${exampleCount} example snippets in total.
    `;
  }

  if (objectMethodOutput) {
    objectMethodOutput.innerHTML = `
      <strong>Object Functions:</strong>
      ${developerProfile.introduce()}
      ${developerProfile.summarizeTopics(conceptExamples)}
    `;
  }
};

const renderStorageDocs = () => {
  if (!storageDocs) {
    return;
  }

  storageDocs.innerHTML = storageGuide
    .map((item) => `<li>${item}</li>`)
    .join("");
};

const renderNotes = () => {
  if (!noteList) {
    return;
  }

  const notes = readNotes();

  if (!notes.length) {
    noteList.innerHTML =
      "<li class='text-muted'>No notes saved yet. Add one to test localStorage.</li>";
    return;
  }

  noteList.innerHTML = notes
    .map(
      (note, index) => `
        <li>
          ${escapeHtml(note)}
          <button class="btn btn-sm btn-outline-danger" data-note-index="${index}" type="button">Delete</button>
        </li>
      `
    )
    .join("");
};

const handleNoteSubmit = (event) => {
  event.preventDefault();

  if (!noteInput) {
    return;
  }

  const trimmedValue = noteInput.value.trim();

  if (!trimmedValue) {
    return;
  }

  const notes = readNotes();
  notes.unshift(trimmedValue);
  saveNotes(notes);
  noteInput.value = "";
  renderNotes();
};

const handleNoteDelete = (event) => {
  const button = event.target.closest("[data-note-index]");

  if (!button) {
    return;
  }

  const notes = readNotes();
  const noteIndex = Number(button.dataset.noteIndex);

  notes.splice(noteIndex, 1);
  saveNotes(notes);
  renderNotes();
};

const loadProjectsAsync = async () => {
  if (!asyncProjectList) {
    return;
  }

  asyncProjectList.innerHTML =
    "<div class='col-12'><div class='summary-card'>Loading projects...</div></div>";

  try {
    const response = await fetch("/api/projects");
    const data = await response.json();
    const projects = Array.isArray(data.projects) ? data.projects : [];

    if (!projects.length) {
      asyncProjectList.innerHTML =
        "<div class='col-12'><div class='empty-state'>No API projects available yet.</div></div>";
      return;
    }

    asyncProjectList.innerHTML = projects
      .slice(0, 3)
      .map(
        (project) => `
          <div class="col-md-6 col-xl-4">
            <article class="content-card h-100">
              <div class="d-flex justify-content-between align-items-start gap-2 mb-3">
                <h3 class="h5 mb-0">${escapeHtml(project.title)}</h3>
                <span class="badge text-bg-light border">${escapeHtml(project.status)}</span>
              </div>
              <p class="text-muted">${escapeHtml(project.description)}</p>
              <p class="mb-3"><strong>Route:</strong> /projects/${escapeHtml(project.slug)}</p>
              <a href="/projects/${encodeURIComponent(project.slug)}" class="link-offset-2 fw-semibold">Open detail page</a>
            </article>
          </div>
        `
      )
      .join("");
  } catch (error) {
    asyncProjectList.innerHTML = `
      <div class="col-12">
        <div class="summary-card">The async request failed: ${escapeHtml(error.message)}</div>
      </div>
    `;
  }
};

const restoreContactDraft = () => {
  if (!contactForm) {
    return;
  }

  const draftKey = contactForm.dataset.draftKey || "contact-draft";

  try {
    const storedDraft = localStorage.getItem(draftKey);

    if (!storedDraft) {
      return;
    }

    const draft = JSON.parse(storedDraft);

    for (const [fieldName, fieldValue] of Object.entries(draft)) {
      const field = contactForm.elements.namedItem(fieldName);
      if (field) {
        field.value = fieldValue;
      }
    }
  } catch {
    localStorage.removeItem(draftKey);
  }
};

const persistContactDraft = () => {
  if (!contactForm) {
    return;
  }

  const draftKey = contactForm.dataset.draftKey || "contact-draft";
  const formData = Object.fromEntries(new FormData(contactForm).entries());
  localStorage.setItem(draftKey, JSON.stringify(formData));
};

const clearContactDraft = () => {
  if (!contactForm) {
    return;
  }

  const draftKey = contactForm.dataset.draftKey || "contact-draft";
  localStorage.removeItem(draftKey);
};

renderConceptCards();
renderStorageDocs();
renderNotes();
loadProjectsAsync();
restoreContactDraft();

if (noteForm) {
  noteForm.addEventListener("submit", handleNoteSubmit);
}

if (noteList) {
  noteList.addEventListener("click", handleNoteDelete);
}

if (contactForm) {
  contactForm.addEventListener("input", persistContactDraft);
  contactForm.addEventListener("submit", clearContactDraft);
}

if (resetDraftButton) {
  resetDraftButton.addEventListener("click", clearContactDraft);
}
