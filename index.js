const express = require('express');
const path = require('path');
const { engine } = require('express-handlebars');

const app = express();
const PORT = process.env.PORT || 3000;

// Set up Handlebars as the view engine
app.engine('hbs', engine({
  extname: 'hbs',
  defaultLayout: 'main',
  layoutsDir: path.join(__dirname, 'views', 'layouts'),
  partialsDir: path.join(__dirname, 'views', 'partials'),
  helpers: {
    // Helper function for slicing arrays (Higher Order Function concept)
    slice: function(array, start, end) {
      if (!Array.isArray(array)) return [];
      return array.slice(start, end);
    },
    // Helper function for equality comparison
    eq: function(a, b) {
      return a === b;
    },
    // Helper function for greater than comparison
    gt: function(a, b) {
      return a > b;
    },
    // Helper function for subtraction
    subtract: function(a, b) {
      return a - b;
    }
  }
}));
app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'views'));

// Serve static files from the public folder
app.use(express.static(path.join(__dirname, 'public')));

// Middleware for parsing form data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Load and use the routes
const routes = require('./routes/index');
routes(app);

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});</content>
<parameter name="filePath">c:\Users\Lenovo\OneDrive\Desktop\Batch 66 DW - Fiastara\Task 8 New\index.js