# Personal Portfolio Website

A modern, full-featured personal portfolio website built with Express.js, Node.js, and Bootstrap. This application allows you to showcase your projects with image uploads, create and manage projects dynamically, and provide contact information.

## Features

### ✨ Core Features
- **Responsive Design**: Mobile-first design using Bootstrap 5
- **Home Page**: Professional portfolio showcase with bio, skills, education, and experience
- **Projects Management**: Create, read, update, and delete (CRUD) projects
- **Project Details Page**: Detailed view of each project
- **Contact Page**: Contact information and message form
- **Flash Messages**: Success and error notifications with auto-dismiss
- **File Upload**: Upload project images with Multer

### 📁 File Upload Features
- **Image Upload**: Upload images when creating and updating projects
- **Image Validation**: Validates file type (JPG, PNG, GIF, WebP) and size (max 5MB)
- **Image Display**: Display uploaded images in project list and detail pages
- **Image Management**: Delete associated images when deleting projects
- **Image Preview**: Client-side image preview before upload
- **Error Handling**: Comprehensive error messages and flash notifications

## Tech Stack

- **Backend**: Express.js, Node.js
- **Frontend**: HTML5, CSS3, Bootstrap 5, JavaScript
- **File Upload**: Multer
- **Template Engine**: Handlebars (Express Handlebars)
- **Sessions**: Express Session
- **Notifications**: Express Flash
- **File System**: fs (Node.js built-in)

## Project Structure

```
personal web project/
├── public/
│   ├── css/
│   │   └── style.css
│   ├── js/
│   │   └── script.js
│   ├── uploads/          # Uploaded images stored here
│   └── assets/
├── views/
│   ├── layouts/
│   │   └── main.hbs      # Main layout
│   ├── partials/
│   │   ├── navbar.hbs
│   │   ├── footer.hbs
│   │   └── project-card.hbs
│   ├── home.hbs          # Home page
│   ├── projects.hbs      # Projects list
│   ├── project-detail.hbs
│   ├── add-project.hbs
│   ├── edit-project.hbs
│   ├── contact.hbs       # Contact page
│   └── error.hbs
├── data/
│   └── projects.json     # Projects data storage
├── server.js             # Main Express server
├── package.json
└── README.md
```

## Installation

### Prerequisites
- Node.js (v14 or higher)
- npm (v6 or higher)

### Setup Instructions

1. **Navigate to the project directory**
   ```bash
   cd "personal web project"
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the server**
   ```bash
   npm start
   ```
   OR for development with auto-reload:
   ```bash
   npm run dev
   ```

4. **Access the application**
   Open your browser and navigate to:
   ```
   http://localhost:3000
   ```

## Usage

### Home Page
- View your professional profile
- Display featured projects (up to 4)
- View education, skills, and experience sections

### Projects Page
- View all projects in a grid layout
- Each project card displays:
  - Project image
  - Title and description
  - Technologies used
  - Action buttons (View, Edit, Delete)

### Add Project
- Click "Add Project" in navbar or on home page
- Fill in project details:
  - Title (required)
  - Description (required)
  - Technologies (optional, comma-separated)
  - Project Link (optional)
  - Project Image (optional, max 5MB)
- Validation ensures required fields are filled
- Image preview before upload
- Success message after submission

### Project Detail
- View full project information
- Display larger project image
- View all technologies used
- Edit or delete the project
- Return to projects list

### Edit Project
- Update project information
- Update or replace project image
- View current image
- Delete old image when uploading new one
- Flash messages confirm updates

### Delete Project
- Confirmation dialog before deletion
- Automatically deletes associated image
- Removes project from database
- Redirects to projects page

### Contact Page
- Display contact information:
  - Address
  - Email
  - Phone
  - LinkedIn
- Contact form (frontend only in this version)

## File Upload Details

### Supported Image Formats
- JPG / JPEG
- PNG
- GIF
- WebP

### File Size Limit
- Maximum 5MB per file

### Storage
- Images stored in `/public/uploads/` directory
- Unique filenames generated with timestamp
- Old images deleted when projects are updated or deleted

### Validation
- MIME type checking
- File extension validation
- File size validation (client and server)
- Flash error messages for validation failures

## Error Handling

The application includes comprehensive error handling:

1. **Form Validation**
   - Required field validation
   - File type validation
   - File size validation

2. **Flash Messages**
   - Success messages for completed actions
   - Error messages for failures
   - Auto-dismiss after 5 seconds

3. **404 Handling**
   - Custom 404 error page
   - Navigation back to home

4. **File Upload Errors**
   - Clear error messages
   - Automatic cleanup of failed uploads
   - User-friendly notifications

## Customization

### Modify Portfolio Information
Edit the hardcoded values in `server.js` and template files:
- Contact information in `views/contact.hbs`
- Bio and profile info in `views/home.hbs`
- Social links in `views/partials/navbar.hbs`

### Change Styling
- Main styles: `public/css/style.css`
- Bootstrap variables can be customized in CSS

### Image Upload Limits
In `server.js`, modify the multer configuration:
```javascript
limits: {
    fileSize: 5 * 1024 * 1024 // Change 5 to desired MB
}
```

## Data Persistence

Projects are stored in `/data/projects.json` file. This is a simple file-based storage system suitable for small projects. For production, consider using a database like MongoDB or PostgreSQL.

## Security Considerations

For production use, implement:
- CSRF protection
- Input sanitization
- Authentication/Authorization
- Rate limiting
- Secure file upload validation
- HTTPS/SSL
- Database encryption
- Environment variables for sensitive data

## Future Enhancements

Potential features to add:
- Database integration (MongoDB, PostgreSQL)
- User authentication
- Blog/articles section
- Project filtering and search
- Image optimization
- CDN integration
- Analytics
- SEO optimization
- Dark mode

## Troubleshooting

### Port Already in Use
If port 3000 is already in use, modify in `server.js`:
```javascript
const PORT = process.env.PORT || 3001; // Change to different port
```

### Image Not Uploading
1. Check `/public/uploads/` directory exists
2. Verify file size < 5MB
3. Check supported image format
4. Check server logs for errors

### Projects Not Persisting
1. Ensure `/data/` directory exists
2. Check file permissions
3. Verify projects.json is not corrupted

## Dependencies

- **express** (^4.18.2): Web framework
- **express-handlebars** (^7.1.2): Template engine
- **multer** (^1.4.5): File upload middleware
- **express-flash** (^0.0.2): Flash messages
- **express-session** (^1.17.3): Session management
- **body-parser** (^1.20.2): Request parsing
- **method-override** (^3.0.0): HTTP method override

## License

This project is open source and available under the MIT License.

## Author

Fiastara Seikha Arthanev

## Support

For issues or questions, please reach out:
- Email: fiasseikha@gmail.com
- Phone: +62 895-3277-4755
- LinkedIn: https://www.linkedin.com/in/fiastara-arthanev/

---

**Enjoy building your portfolio!** 🚀
