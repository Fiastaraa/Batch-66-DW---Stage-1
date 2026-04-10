# Fiastara Seikha Arthanev - Portfolio (Upgraded to ExpressJS + Handlebars)

An elegant, responsive portfolio website upgraded from vanilla HTML/CSS/JS to a modern ExpressJS + Handlebars stack. Maintains the original visual identity while leveraging dynamic rendering and modern web technologies.

## 🌐 Live Demo References
- **Day 5 Reference**: https://dw-day-5-fiastara.netlify.app
- **Day 6 Reference**: https://dw-day-6-fiastara.netlify.app

## 📋 Project Overview

A professional portfolio showcasing:
- **Experience**: IBM Academy, Frontend Development, Mobile App Development
- **Skills**: HTML5, CSS3, JavaScript, Python, Android, UI/UX, RPA, Data Science
- **Projects**: 5 featured projects with dynamic rendering
- **Responsive**: Beautiful on all devices

## 🚀 Technologies Used

- **Node.js** - Runtime
- **Express.js** - Web framework
- **Handlebars** - Template engine
- **Bootstrap 5** - UI components
- **CSS3** - Modern styling
- **JavaScript ES6+** - Interactivity

## 📁 Project Structure

```
fiastara-portfolio/
├── index.js                      # Express server
├── package.json                  # Dependencies
├── routes/index.js              # Route handlers
├── data/projects.js             # Project data & helpers
├── views/                        # Handlebars templates
│   ├── layouts/main.hbs
│   ├── partials/
│   ├── home.hbs
│   ├── projects.hbs
│   ├── contact.hbs
│   └── ...
└── public/
    ├── css/style.css            # Main stylesheet
    ├── js/script.js             # JavaScript
    └── assets/                  # Images & files
```

## ⚙️ Installation & Setup

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Run production server
npm start
```

Server runs at `http://localhost:3000`

## 🎯 Key Features

### Dynamic Rendering
- Array of projects with metadata
- Higher Order Functions (map, filter, find)
- Helper functions for duration calculation
- Dynamic filtering and search

### Responsive Design
- Mobile-first approach
- Bootstrap 5 grid system
- CSS Grid and Flexbox layouts
- Touch-friendly interface

### Visual Polish
- Burgundy/rose/purple color scheme
- Poppins typography
- Smooth animations
- Professional styling

### Accessibility
- WCAG compliant
- Semantic HTML
- Keyboard navigation
- Screen reader support

## 📄 Available Routes

| Route | Method | Description |
|-------|--------|-------------|
| `/` | GET | Home page |
| `/projects` | GET | All projects |
| `/project-detail/:id` | GET | Project details |
| `/add-project` | GET/POST | Add project form |
| `/contact` | GET/POST | Contact page |

## 🎨 CSS Features

- **900+ lines** organized in 15 sections
- **CSS Variables** for consistent theming
- **Responsive breakpoints** for all devices
- **Accessibility features** included
- **Print-friendly** styles

## 🔧 JavaScript Features

- **Smooth scrolling** and navigation
- **Project filtering** and search
- **Scroll animations** with Intersection Observer
- **Form handling** with feedback
- **Bootstrap integration**
- **Utility functions** in global namespace

## 📊 Project Data

Each project includes:
```javascript
{
  id: 1,
  title: "Project Title",
  description: "Description",
  image: "/assets/image.jpg",
  startDate: "2023-01-01",
  endDate: "2023-06-30",
  technologies: ["Tech1", "Tech2"],
  category: "Web Development",
  status: "Completed",
  link: "https://project-url.com"
}
```

## 🎓 Learning Concepts

- Higher Order Functions (map, filter, find)
- Express.js routing and middleware
- Handlebars templating
- Responsive web design
- JavaScript event handling
- Bootstrap framework
- CSS3 modern features

## ✨ What Was Improved in Stage 6

### CSS Refactoring
✅ Organized into 15 logical sections
✅ Enhanced color and shadow systems
✅ Improved responsive design
✅ Better typography scaling
✅ Consistent spacing
✅ Accessibility features
✅ Print styles

### JavaScript Enhancement
✅ Better code organization
✅ Smooth scroll navigation
✅ Active navbar highlighting
✅ Project filtering & search
✅ Scroll animations
✅ Form feedback
✅ Utility functions

### Views Refinement
✅ Updated navbar with accessibility
✅ Enhanced footer with social links
✅ Improved projects view with icons
✅ Better empty states
✅ Consistent styling

## 📱 Responsive Breakpoints

- **Desktop** (>768px): Full features
- **Tablet** (576px-768px): Optimized layout
- **Mobile** (<576px): Stacked layout, touch-friendly

## 🚀 Deployment Ready

- ✅ Production-quality code
- ✅ Optimized assets
- ✅ Security-conscious
- ✅ Performance optimized
- ✅ Accessibility compliant

## 📞 Contact

- Email: fiasseikha@gmail.com
- Phone: +62895327774755
- LinkedIn: https://www.linkedin.com/in/fiastara-arthanev/

---

**Version**: 1.0.0 | **Last Updated**: April 2026 | **Status**: Production Ready ✨