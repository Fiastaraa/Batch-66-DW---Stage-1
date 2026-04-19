const express = require('express');
const session = require('express-session');
const bcrypt = require('bcrypt');
const db = require('./db');
const exphbs = require('express-handlebars');
const bodyParser = require('body-parser');
const methodOverride = require('method-override');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3001;

// Handlebars setup
app.engine('hbs', exphbs.engine({ extname: 'hbs', defaultLayout: 'main' }));
app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'views'));

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(methodOverride('_method'));
app.use(express.static(path.join(__dirname, 'public')));

// Session setup
app.use(session({
    secret: 'your-secret-key-change-this-in-production',
    resave: false,
    saveUninitialized: false
}));

// Auth middleware
function requireAuth(req, res, next) {
    if (req.session.userId) {
        return next();
    } else {
        res.redirect('/login');
    }
}

// Routes
app.get('/', (req, res) => {
    db.all('SELECT * FROM projects', [], (err, projects) => {
        if (err) {
            return res.status(500).send('Database error');
        }
        res.render('home', { title: 'Home', projects, user: req.session.user });
    });
});

app.get('/contact', (req, res) => {
    res.render('contact', { title: 'Contact' });
});

app.post('/contact', (req, res) => {
    const { name, email, message } = req.body;
    db.run('INSERT INTO messages (name, email, message) VALUES (?, ?, ?)', [name, email, message], (err) => {
        if (err) {
            return res.status(500).send('Error sending message');
        }
        res.render('contact', { title: 'Contact', success: true });
    });
});

app.get('/project/:id', (req, res) => {
    const id = req.params.id;
    db.get('SELECT * FROM projects WHERE id = ?', [id], (err, project) => {
        if (err || !project) {
            return res.status(404).send('Project not found');
        }
        res.render('project-detail', { title: project.title, project });
    });
});

// Static project pages
app.get('/js-concepts', (req, res) => {
    res.render('js-concepts', { title: 'JavaScript Core Concepts' });
});

app.get('/android-project', (req, res) => {
    res.render('android-project', { title: 'Android App Development' });
});

app.get('/uiux-project', (req, res) => {
    res.render('uiux-project', { title: 'UI/UX Design Project' });
});

app.get('/web-development', (req, res) => {
    res.render('web-development', { title: 'Web Development' });
});

// Auth routes
app.get('/register', (req, res) => {
    res.render('register', { title: 'Register' });
});

app.post('/register', async (req, res) => {
    const { username, email, password } = req.body;
    if (!username || !email || !password) {
        return res.render('register', { title: 'Register', error: 'All fields required' });
    }
    db.get('SELECT * FROM users WHERE email = ? OR username = ?', [email, username], async (err, user) => {
        if (user) {
            return res.render('register', { title: 'Register', error: 'User already exists' });
        }
        try {
            const hash = await bcrypt.hash(password, 10);
            db.run('INSERT INTO users (username, email, password_hash) VALUES (?, ?, ?)', [username, email, hash], (err) => {
                if (err) {
                    return res.render('register', { title: 'Register', error: 'Error creating user' });
                }
                res.redirect('/login');
            });
        } catch (err) {
            res.render('register', { title: 'Register', error: 'Error hashing password' });
        }
    });
});

app.get('/login', (req, res) => {
    res.render('login', { title: 'Login' });
});

app.post('/login', (req, res) => {
    const { email, password } = req.body;
    db.get('SELECT * FROM users WHERE email = ?', [email], async (err, user) => {
        if (!user || !(await bcrypt.compare(password, user.password_hash))) {
            return res.render('login', { title: 'Login', error: 'Invalid credentials' });
        }
        req.session.userId = user.id;
        req.session.user = user;
        res.redirect('/');
    });
});

app.post('/logout', (req, res) => {
    req.session.destroy();
    res.redirect('/');
});

// Protected routes
app.get('/projects', requireAuth, (req, res) => {
    db.all('SELECT * FROM projects WHERE user_id = ?', [req.session.userId], (err, projects) => {
        if (err) {
            return res.status(500).send('Database error');
        }
        res.render('projects', { title: 'My Projects', projects });
    });
});

app.get('/projects/add', requireAuth, (req, res) => {
    res.render('add-project', { title: 'Add Project' });
});

app.post('/projects', requireAuth, (req, res) => {
    const { title, description, image, link, tags } = req.body;
    db.run('INSERT INTO projects (title, description, image, link, tags, user_id) VALUES (?, ?, ?, ?, ?, ?)', [title, description, image, link, tags, req.session.userId], (err) => {
        if (err) {
            return res.status(500).send('Error adding project');
        }
        res.redirect('/projects');
    });
});

app.get('/projects/:id/edit', requireAuth, (req, res) => {
    const id = req.params.id;
    db.get('SELECT * FROM projects WHERE id = ? AND user_id = ?', [id, req.session.userId], (err, project) => {
        if (err || !project) {
            return res.status(404).send('Project not found');
        }
        res.render('edit-project', { title: 'Edit Project', project });
    });
});

app.put('/projects/:id', requireAuth, (req, res) => {
    const id = req.params.id;
    const { title, description, image, link, tags } = req.body;
    db.run('UPDATE projects SET title = ?, description = ?, image = ?, link = ?, tags = ? WHERE id = ? AND user_id = ?', [title, description, image, link, tags, id, req.session.userId], (err) => {
        if (err) {
            return res.status(500).send('Error updating project');
        }
        res.redirect('/projects');
    });
});

app.delete('/projects/:id', requireAuth, (req, res) => {
    const id = req.params.id;
    db.run('DELETE FROM projects WHERE id = ? AND user_id = ?', [id, req.session.userId], (err) => {
        if (err) {
            return res.status(500).send('Error deleting project');
        }
        res.redirect('/projects');
    });
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});