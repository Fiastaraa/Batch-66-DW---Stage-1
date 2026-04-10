# Quick Start Guide - Fiastara Portfolio

## 🚀 Getting Started (5 Minutes)

### Step 1: Install Dependencies
```bash
npm install
```

### Step 2: Start Development Server
```bash
npm run dev
```

### Step 3: Open in Browser
Visit `http://localhost:3000`

## 📂 Important Files

| File | Purpose |
|------|---------|
| `index.js` | Express server entry point |
| `routes/index.js` | All route handlers |
| `data/projects.js` | Project data & helper functions |
| `public/css/style.css` | Main stylesheet (900+ lines) |
| `public/js/script.js` | JavaScript enhancements |
| `views/layouts/main.hbs` | Main layout template |

## 🎨 Customization Quick Tips

### Change Colors
Edit `public/css/style.css` CSS variables (lines 3-15):
```css
--primary-color: #95292D;
--secondary-color: #E2B0A5;
--accent-color: #6D3871;
```

### Add New Project
Edit `data/projects.js` and add to projects array:
```javascript
{
  id: 6,
  title: "Your Title",
  description: "Your description",
  image: "/assets/image.jpg",
  startDate: "2023-01-01",
  endDate: "2023-06-30",
  technologies: ["Tech1", "Tech2"],
  category: "Web Development",
  status: "Completed",
  link: "https://your-link.com"
}
```

### Update Contact Info
Edit `views/contact.hbs` with your details

### Change Navbar Links
Edit `views/partials/navbar.hbs`

## 📱 Test Responsive
- Desktop: Full width
- Tablet: `npm run dev` then resize browser to 768px
- Mobile: Resize to 576px or use DevTools

## 🔗 Available Routes

```
GET  /                    Home page
GET  /projects            Project listing
GET  /projects?category=* Filter by category
GET  /project-detail/:id  Individual project
GET  /add-project         Add project form
POST /add-project         Submit project
GET  /contact             Contact page
POST /contact             Submit contact form
```

## 📊 Project Categories
- Web Development
- Mobile App
- Data Science
- UI/UX Design
- Other

## 📊 Project Status
- Completed
- In Progress
- Planning

## 💡 Development Tips

### Live Reload
With `npm run dev`, changes auto-reload:
- CSS changes → immediate
- JavaScript changes → immediate
- Template changes → restart browser
- Data changes → restart server

### Debug
Open browser DevTools (F12) to:
- Check console errors
- Inspect elements
- Test responsive design

### Performance
- CSS is organized for maintainability
- JavaScript is minimal and efficient
- Assets are optimized

## 🎯 Next Steps

1. **Customize Content**
   - Update project data
   - Change colors
   - Update contact info

2. **Test Thoroughly**
   - Desktop browser
   - Mobile browser
   - Different screen sizes

3. **Deploy**
   - Commit to GitHub
   - Deploy to Heroku/Vercel/Netlify
   - Share portfolio link

## 📞 Support

Need help?
- Check `README.md` for full documentation
- Check `STAGE_6_CLEANUP_SUMMARY.md` for upgrade details
- Review code comments in key files

## ⚡ Common Issues

**Port 3000 already in use:**
```bash
npm start -- --port 3001
```

**Module not found:**
```bash
npm install
```

**Styles not updating:**
- Hard refresh browser (Ctrl+Shift+R)
- Clear browser cache

**Projects not showing:**
- Check `data/projects.js` has projects
- Check browser console for errors

---

**Ready to showcase your portfolio!** 🎉
