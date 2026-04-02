# 📚 Complete Learning Guide - Topics Overview

## 📌 Topic 1: Higher Order Functions & Callbacks
**Status:** ✅ Fully Implemented  
**Location:** `js/concepts.js` | `js-concepts.html`

### a. Array Methods (map, filter, reduce)
**File:** [js/concepts.js](js/concepts.js#L18-L70)

- **MAP**: Transform each element
  - Lines 18-26: Basic map with numbers
  - Lines 28-30: Mapping object properties
  - Lines 32-38: Complex mapping with object creation

- **FILTER**: Keep only matching elements
  - Lines 41-46: Filter even numbers
  - Lines 48-50: Filter expensive products
  - Lines 52-54: Filter in-stock items

- **REDUCE**: Combine into single value
  - Lines 57-58: Sum all numbers
  - Lines 60-61: Calculate total inventory value
  - Lines 63-67: Group by price category

- **METHOD CHAINING**: Combine multiple operations
  - Lines 73-78: Filter → Map → Reduce pipeline

**Interactive Demo:** [js-concepts.html](js-concepts.html)
- Live demonstrations with custom inputs
- Tab-based navigation between array methods
- Real-time output display

---

### b. Callback Functions
**File:** [js/concepts.js](js/concepts.js#L82-L117)

- **Basic Callbacks**
  - Lines 82-88: Simple callback pattern
  - Lines 90-102: Order processing with success/error callbacks

- **Array Method Callbacks**
  - Lines 113-114: forEach with callback

- **Real-world Examples in Portfolio:**
  - [script.js](js/script.js#L1-L13): Scroll event listener callbacks
  - [script.js](js/script.js#L16-L25): Navigation link click callbacks

---

### c. Functional Programming Concepts
**File:** [js/concepts.js](js/concepts.js#L127-L364)

- **Pure Functions** (Lines 127-141)
  - Same input = predictable output
  - No side effects
  - Example: `add(5, 3)` always returns 8

- **First-Class Functions** (Lines 146-165)
  - Functions as values
  - Functions as parameters
  - Functions returning functions (createMultiplier)

- **Higher-Order Functions** (Lines 169-177)
  - Functions operating on other functions
  - Compose function implementation
  - Function pipelines

- **Currying** (Lines 182-195)
  - Breaking down multi-argument functions
  - Partial application
  - Example: `calculatePrice(tax)(discount)(price)`

- **Arrow Functions** (Lines 199-215)
  - Concise syntax
  - Lexical `this` binding
  - With destructuring

- **Spread Operator** (Lines 220-230)
  - Array spread
  - Object spread
  - Cloning and merging

- **Template Literals** (Lines 235-253)
  - String interpolation
  - Multiline strings
  - Expression evaluation

- **Destructuring** (Lines 258-270)
  - Array destructuring
  - Object destructuring
  - Default values

- **Default Parameters** (Lines 275-281)
  - Function parameter defaults
  - Fallback values

**Real-world Usage in Portfolio:**
- [script.js](js/script.js#L6-L12): Arrow functions with forEach
- [script.js](js/script.js#L16-L25): Event listeners with arrow functions
- [js-concepts.html](js-concepts.html): Multiple arrow function demonstrations

---

## 📌 Topic 2: Report & Discussion Session
**Status:** 📋 Structural Framework Ready

### Suggested Structure:
Create file: `REPORT.md`
- Session objectives and outcomes
- Key discussion points
- Team insights and learnings
- Action items
- Next steps

### Discussion Topics to Cover:
- [ ] Performance implications of different array methods
- [ ] When to use pure functions vs. impure functions
- [ ] Error handling in callbacks
- [ ] ES6+ modern JavaScript best practices
- [ ] Callback hell and alternatives (promises, async/await)

---

## 📌 Topic 3: Introduction to Express.js
**Status:** ⏳ Planned for Implementation

### a. Node.js and npm basics
- [ ] Installation verification
- [ ] Package.json structure
- [ ] Node.js runtime concepts
- [ ] npm commands (install, start, run)

### b. Express.js setup and configuration
- [ ] Project initialization
- [ ] Express installation and setup
- [ ] Middleware configuration
- [ ] Static file serving
- [ ] CORS setup

### c. Basic routing
- [ ] GET routes
- [ ] POST routes
- [ ] Route parameters
- [ ] Query strings
- [ ] Route handlers

### d. Server-side rendering
- [ ] Template engine setup
- [ ] Passing data to templates
- [ ] Conditional rendering
- [ ] Loops in templates
- [ ] View directory structure

---

## 📌 Topic 4: Routing & Template Integration
**Status:** ⏳ Planned for Implementation

### a. Express routing advanced
- [ ] Nested routes
- [ ] Route middleware
- [ ] Route parameters validation
- [ ] Error handling in routes
- [ ] Route organization (express.Router)

### b. Fetching and displaying data
- [ ] Requesting external APIs
- [ ] Processing JSON responses
- [ ] Error handling for API calls
- [ ] Data formatting for display
- [ ] Pagination and filtering

### c. Template engines (EJS/Handlebars)
- [ ] EJS syntax and usage
- [ ] Handlebars syntax and usage
- [ ] Partial templates
- [ ] Template loops and conditions
- [ ] Helper functions

### d. Bootstrap/Tailwind integration
- [ ] CSS framework setup
- [ ] Responsive grid system
- [ ] Component usage
- [ ] Custom styling integration
- [ ] Mobile-first approach

---

## 📌 Topic 5: Database Introduction
**Status:** ⏳ Planned for Implementation

### a. PostgreSQL installation and setup
- [ ] Installation and configuration
- [ ] PostgreSQL service management
- [ ] psql command line basics
- [ ] Database creation and deletion
- [ ] User management

### b. DDL (Data Definition Language) & DML (Data Manipulation Language)
- [ ] CREATE TABLE
- [ ] ALTER TABLE
- [ ] DROP TABLE
- [ ] INSERT statements
- [ ] UPDATE statements
- [ ] DELETE statements
- [ ] SELECT queries

### c. Database design principles
- [ ] Normalization (1NF, 2NF, 3NF)
- [ ] Entity-Relationship (ER) diagrams
- [ ] Primary keys and foreign keys
- [ ] Indexing strategies
- [ ] Data integrity constraints

### d. Creating tables and relationships
- [ ] One-to-One relationships
- [ ] One-to-Many relationships
- [ ] Many-to-Many relationships
- [ ] Referential integrity
- [ ] Query optimization

---

## 🎯 Summary by Topic Implementation Status

| Topic | Status | Location | Files |
|-------|--------|----------|-------|
| **Topic 1: Higher Order Functions & Callbacks** | ✅ Complete | js/concepts.js, js-concepts.html | 2 files |
| **Topic 2: Report & Discussion** | 📋 Ready | To be created | REPORT.md |
| **Topic 3: Express.js Intro** | ⏳ Planned | To be created | server.js, config/ |
| **Topic 4: Routing & Templates** | ⏳ Planned | To be created | routes/, views/ |
| **Topic 5: Database Intro** | ⏳ Planned | To be created | db/, migrations/ |

---

## 🚀 Quick Navigation

### Topic 1 Resources (Available Now)
- 📖 [Array Methods Demo](js/concepts.html#MAP)
- 📄 [Concepts Source Code](js/concepts.js)
- 🎨 [Interactive Examples](js-concepts.html)
- 💡 [Portfolio Implementation](js/script.js)

### Topics 2-5 (Ready for Development)
- Create Topic 2: Analysis and discussion documentation
- Create Topic 3: Node.js/Express project setup
- Create Topic 4: Routing and template system
- Create Topic 5: Database schemas and queries

---

## 📝 Notes for Study

**Topic 1 Completed:**
✅ Array methods fully documented with examples  
✅ Callbacks explained with real-world patterns  
✅ Functional programming concepts comprehensively covered  
✅ Interactive demonstrations in HTML  
✅ Used in actual portfolio code  

**Topics 2-5 Framework:**
The structure is prepared and ready to be populated with:
- Code examples and tutorials
- Practice exercises
- Database schemas
- API endpoints
- Template files

---

**Last Updated:** February 18, 2026  
**Project:** Fiastara's Portfolio - Learning Path

---

## 📌 Topic 6: Higher Order Functions & Callbacks (Consolidated)
**Status:** ✅ Implemented in `js/concepts.js` and demonstrated in `js-concepts.html`

### a. Array methods (map, filter, reduce)
- Overview: Transform, select, and aggregate collections using `map`, `filter`, and `reduce`.
- Best practices: prefer immutability, avoid side-effects inside callbacks, always provide an initial value for `reduce`.
- Example snippets: see [js/concepts.js](js/concepts.js#L1-L120) for ready-to-run examples.

### b. Callback functions
- Overview: Callbacks are functions passed as arguments to other functions for deferred execution.
- Error-first callback pattern: `(err, result) => {}` for Node-style APIs.
- Transition: use Promises/async-await to avoid callback hell; examples in `js/concepts.js`.

### c. Functional programming concepts
- Pure functions, first-class functions, higher-order functions, currying, composition, immutability.
- Practical patterns: `pipe`/`compose`, data pipelines with `filter->map->reduce`, memoization for expensive pure functions.
- See `js/concepts.js` for examples and an `EventEmitter` pattern demo.

---

## 📌 Topic 8: Introduction to Express.js
**Status:** ⏳ Starter files added (`server.js`, `package.json`, `views/`) — see `server.js` in repo root for examples.

### a. Node.js and npm basics
- Install Node.js: download from https://nodejs.org and verify with:

```bash
node -v
npm -v
```

- Initialize a project:

```bash
npm init -y
npm install express ejs dotenv
```

### b. Express.js setup and configuration
- Minimal `server.js` creates an Express app, sets a template engine (EJS), static folder, and basic middleware (JSON body parser).
- Use `dotenv` to manage environment variables (PORT, DATABASE_URL).

### c. Basic routing
- Define route handlers for `GET`, `POST`, with route params and query handling:

- Example: `GET /users/:id` reads `req.params.id`, `GET /search?q=term` reads `req.query.q`.

### d. Server-side rendering
- Use EJS or Handlebars to render views with server-side data.
- Pass objects to templates via `res.render('view', { data })`, use partials for repeated markup.

---

## 📌 Topic 9: Routing & Template Integration
**Status:** ⏳ Starter guidance and examples added (see `server.js` and `views/`)

### a. Express routing advanced
- Use `express.Router()` to organize routes per resource (`routes/users.js`, `routes/api.js`).
- Middleware: authentication, validation, error handlers inserted with `router.use()`.

### b. Fetching and displaying data
- Server-side: use `node-fetch` or native `fetch` (Node 18+) to call external APIs, process JSON, and inject into templates.
- Client-side: fetch from API endpoints and update DOM with JS.

### c. Template engines (EJS/Handlebars)
- EJS: `<%= variable %>` for escaped output, `<%- include('partial') %>` for partials.
- Handlebars: helpers and partials; choose based on familiarity.

### d. Bootstrap/Tailwind integration
- Add via CDN in templates or install via npm and build pipeline.
- Example (CDN): add `<link>` and `<script>` tags in base template.

---

## 📌 Topic 10: Database Introduction (PostgreSQL)
**Status:** ⏳ Documentation and sample schema added (`README-db.md`, `db/schema.sql`)

### a. PostgreSQL installation and setup
- Install: https://www.postgresql.org/download/ or use `choco install postgresql` on Windows.
- Start/stop service: use `pg_ctl` or system service manager.
- CLI: `psql -U postgres` to connect; create DB: `CREATE DATABASE mydb;`

### b. DDL & DML
- DDL: `CREATE TABLE`, `ALTER TABLE`, `DROP TABLE`.
- DML: `INSERT`, `UPDATE`, `DELETE`, `SELECT`.
- Use transactions: `BEGIN; ... COMMIT;` with `ROLLBACK` on error.

### c. Database design principles
- Normalize to 3NF where appropriate, choose sensible primary keys (UUIDs for distributed systems), index frequently queried columns.
- Use foreign keys for referential integrity and constraints (`NOT NULL`, `UNIQUE`).

### d. Creating tables and relationships
- Example schema (see `db/schema.sql`): `users`, `projects`, `roles` with `one-to-many` and `many-to-many` join table sample.

---

If you want, I can now:
- Create the Express starter files (`server.js`, `package.json`, `views/index.ejs`) and a `README-db.md` plus `db/schema.sql`.
- Or only update docs. Tell me which you prefer and I'll proceed.
