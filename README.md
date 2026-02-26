# Resume Builder - ElevateCV

A modern, feature-rich resume builder application built with React and Tailwind CSS.

## 🚀 Features

- **Multi-Step Wizard Interface**: Guided resume building process
- **Live Preview**: Real-time preview with instant updates
- **Multiple Templates**: 6+ professional resume templates
- **Drag & Drop Sections**: Customize section order and visibility
- **AI-Powered Enhancement**: Professional summary enhancement using Google Gemini
- **PDF Export**: High-quality PDF generation
- **Color & Typography Customization**: Personalize your resume design
- **Progress Tracking**: Visual progress indicators
- **Mobile Responsive**: Works seamlessly on all devices

## 🛠️ Tech Stack

### Frontend
- React 19
- Tailwind CSS
- React Router
- HTML2PDF.js
- @dnd-kit (Drag and Drop)
- Google Generative AI

### Backend (Optional)
- Node.js
- Express
- CORS
- Environment Variables

## 📦 Installation

### Frontend Setup
1. Clone the repository:
```bash
git clone <repository-url>
cd resume-builder
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm start
```

### Backend Setup (Optional - for secure AI functionality)
1. Navigate to the server directory:
```bash
cd server
```

2. Install server dependencies:
```bash
npm install
```

3. Set up environment variables:
Create a `.env` file in the `server` directory:
```
GEMINI_API_KEY=your-gemini-api-key-here
PORT=3001
```

4. Start the backend server:
```bash
# Development mode
npm run dev

# Production mode
npm start
```

## 🔧 Recent Improvements

### ✅ Code Quality Fixes
- **Fixed duplicate code** in ClassicTemplate.js - removed redundant case blocks
- **Enhanced error handling** - improved user-friendly error messages
- **Improved form validation** - added comprehensive field validation with helpful error messages
- **Added validation functions** to ResumeContext for required field checking

### ✅ Security Enhancements
- **Backend API integration** - moved AI functionality to secure backend server
- **API key protection** - removed frontend exposure of sensitive credentials
- **Input validation** - added server-side validation for AI requests

### ✅ User Experience Improvements
- **Better error messages** - more descriptive feedback for users
- **Enhanced form validation** - real-time validation with specific error messages
- **Progress tracking** - improved completion percentage calculation
- **Mobile optimization** - enhanced mobile menu and navigation

## 📁 Project Structure

```
resume-builder/
├── src/
│   ├── components/          # Reusable UI components
│   ├── pages/              # Main page components
│   ├── sections/           # Resume section components
│   ├── templates/          # Resume template components
│   ├── context/            # React context providers
│   ├── ai/                 # AI functionality
│   ├── preview/            # Preview components
│   └── utils/              # Utility functions
├── server/                 # Backend server (optional)
│   ├── server.js          # Main server file
│   ├── package.json       # Server dependencies
│   └── README.md          # Server documentation
└── public/                 # Static assets
```

## 🎨 Templates

The application includes several professional templates:

1. **Classic Template** - Traditional, professional layout
2. **Compact Template** - Space-efficient design
3. **Executive Template** - Senior-level professional
4. **Minimal ATS Template** - ATS-friendly design
5. **Creative Template** - Modern, creative layout
6. **Modern Sidebar Template** - Contemporary sidebar design

## 🤖 AI Features

### Professional Summary Enhancement
- Uses Google Gemini AI for content improvement
- Enhances ATS compatibility
- Improves action verbs and impact
- Maintains professional tone

**Note**: For security, AI functionality is now handled by the backend server to protect API keys.

## 📱 Responsive Design

The application is fully responsive and provides an optimal experience across all devices:
- Desktop: Full feature set with side panels
- Tablet: Optimized layout with collapsible sections
- Mobile: Streamlined interface with mobile menu

## 🔧 Configuration

### Environment Variables

#### Frontend
- `VITE_API_BASE_URL` - Backend API URL (default: http://localhost:3001)

#### Backend
- `GEMINI_API_KEY` - Google Gemini API key
- `PORT` - Server port (default: 3001)

## 🚀 Deployment

### Frontend Deployment
The frontend can be deployed to any static hosting service:
- Vercel
- Netlify
- GitHub Pages
- AWS S3

### Backend Deployment
The backend can be deployed to:
- Heroku
- Railway
- Render
- AWS EC2
- DigitalOcean App Platform

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🆘 Support

For support and questions:
- Create an issue in the repository
- Check the documentation in the `server/README.md` for backend setup
- Review the code comments for implementation details

## 🔄 Recent Changes

### Version 1.1.0
- ✅ Fixed duplicate code in templates
- ✅ Enhanced error handling throughout the application
- ✅ Improved form validation with better user feedback
- ✅ Added backend server for secure AI functionality
- ✅ Enhanced security by removing frontend API key exposure
- ✅ Added comprehensive validation functions to ResumeContext
- ✅ Improved mobile responsiveness and navigation

### Version 1.0.0
- Initial release with core resume building functionality
- Multiple templates and customization options
- Live preview and PDF export features