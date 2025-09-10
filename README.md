# 🐳 Docker Pimp - Your Ultimate Docker Commands Companion

Docker Pimp is the most stylish and comprehensive Docker commands companion built with React, Next.js, Tailwind CSS, and Framer Motion. Pimp your Docker workflow with quick access to commands, beautiful UI, and an immersive user experience.

![Docker Pimp](https://img.shields.io/badge/Docker-Pimp-2496ED?style=for-the-badge&logo=docker&logoColor=white)
![Next.js](https://img.shields.io/badge/Next.js-14-000000?style=for-the-badge&logo=next.js&logoColor=white)
![React](https://img.shields.io/badge/React-18-61DAFB?style=for-the-badge&logo=react&logoColor=black)
![Tailwind](https://img.shields.io/badge/Tailwind-CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-5.3-3178C6?style=for-the-badge&logo=typescript&logoColor=white)

## ✨ Features

### 🎯 Core Functionality
- **100+ Docker Commands** - Comprehensive collection covering ALL Docker CLI commands from official documentation
- **Smart Search** - Real-time filtering by command name, description, tags, or examples
- **Category Organization** - Commands grouped into logical categories (Basic, Images, Containers, Networks, Volumes, Compose, System)
- **Copy to Clipboard** - One-click copying for commands and examples
- **Favorites System** - Save frequently used commands with localStorage persistence

### 🎨 User Experience
- **Glassmorphic Design** - Beautiful translucent UI with backdrop blur effects
- **Fixed Header & Search** - Always-accessible navigation and search functionality
- **Scrollable Filters** - Compact filter bubbles that scroll naturally with content  
- **Optimized Layout** - Reduced filter spacing and font sizes for better screen utilization
- **Stylish Footer** - Professional footer with developer credits and social links
- **Animated Background** - Subtle floating blob animations for visual depth
- **Dark/Light Theme** - Automatic system preference detection with manual toggle
- **Smooth Animations** - Framer Motion powered animations and transitions
- **Keyboard Shortcuts** - Navigate efficiently with keyboard controls
- **Interactive Cards** - Expandable command cards with detailed syntax and flags

### 🚀 Technical Features
- **Next.js 14** - App Router with React Server Components
- **TypeScript** - Full type safety throughout the application
- **Tailwind CSS** - Utility-first CSS with custom design system
- **Framer Motion** - Advanced animations and gesture handling
- **Local Storage** - Persistent favorites and theme preferences
- **PWA Ready** - Optimized for installation as a Progressive Web App

## 🛠️ Installation & Setup

### Prerequisites
- Node.js 18+ 
- npm or yarn

### Quick Start

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Start production server
npm start
```

The application will be available at `http://localhost:3000`

## 📱 Usage

### Search & Filter
- **Search Bar**: Type to filter commands by name, description, or tags
- **Categories**: Click sidebar categories to filter commands by type
- **Favorites**: Toggle to show only your saved favorite commands
- **Popular Commands**: Filter to show only the most commonly used commands

### Command Cards
- **Copy Commands**: Click the copy button to copy command examples
- **Add to Favorites**: Click the heart icon to save commands for quick access
- **Expand Details**: Click "Show details" to see command syntax and flags
- **Tag Navigation**: Tags help identify command categories and use cases

### Keyboard Shortcuts
| Shortcut | Action |
|----------|--------|
| `/` | Focus search input |
| `⌘/Ctrl + F` | Focus search input |
| `⌘/Ctrl + K` | Focus search input |
| `F` | Toggle favorites filter |
| `D` | Toggle dark/light mode |
| `?` | Show/hide keyboard shortcuts |
| `Esc` | Clear search & close dialogs |

## 🏗️ Project Structure

```
docker-pimp/
├── app/                    # Next.js App Router
│   ├── globals.css        # Global styles and Tailwind imports
│   ├── layout.tsx         # Root layout component
│   ├── page.tsx          # Main application page
│   └── favicon.png       # Custom Docker Pimp favicon
├── components/            # React components
│   ├── CommandCard.tsx   # Individual command card component
│   ├── Header.tsx        # Application header with branding
│   ├── SearchAndFilter.tsx    # Search and filtering controls
│   └── LoadingScreen.tsx # Loading animation component
├── lib/                  # Utility libraries
│   ├── dockerCommands.ts # 100+ Docker commands with complete metadata
│   └── favorites.ts      # Favorites management with localStorage
├── public/               # Static assets
│   └── favicon.png       # Docker Pimp favicon
├── package.json          # Dependencies and scripts
├── tailwind.config.js    # Tailwind CSS configuration
├── tsconfig.json         # TypeScript configuration
└── README.md            # Project documentation
```

## 🐳 Docker Commands Covered

### Complete Command Categories
1. **Basic Commands** (5 commands) - Essential container operations
2. **Image Management** (9 commands) - Building, tagging, and managing images
3. **Container Management** (17 commands) - Advanced container operations and lifecycle
4. **Network Commands** (4 commands) - Docker networking
5. **Volume Commands** (4 commands) - Data persistence
6. **Docker Compose** (11 commands) - Multi-container orchestration
7. **Registry & Auth** (3 commands) - Registry authentication and image search
8. **Context Management** (3 commands) - Remote Docker connections
9. **Docker Swarm** (3 commands) - Cluster initialization and management
10. **Service Management** (5 commands) - Docker Swarm services
11. **Stack Management** (3 commands) - Docker stack deployment
12. **Node Management** (3 commands) - Swarm node management
13. **Plugin Management** (2 commands) - Docker plugin system
14. **Secret Management** (2 commands) - Docker secrets in Swarm mode
15. **System Maintenance** (5 commands) - Cleanup, monitoring, and system info

### Popular Commands
- `docker run` - Create and start containers
- `docker ps` - List running containers
- `docker images` - List local images
- `docker build` - Build images from Dockerfile
- `docker exec` - Execute commands in containers
- `docker logs` - View container logs
- `docker-compose up` - Start composed applications
- `docker system prune` - Clean up unused resources

### Advanced Operations Covered
- **Container Lifecycle**: attach, commit, create, diff, export, import, kill, pause, unpause, rename, update, wait
- **Image Operations**: history, save, load, import/export workflows
- **Registry Management**: login, logout, search, push/pull workflows
- **Orchestration**: Complete Docker Swarm, Service, Stack, and Node management
- **Development**: Context switching, plugin management, secret handling
- **Monitoring**: Real-time events, statistics, system information

## 🎨 Design System

### Color Palette
- **Primary Blue**: Docker brand colors (#2496ed, #1a73e8)
- **Grayscale**: Carefully selected gray tones for light/dark themes
- **Semantic Colors**: Green for success, red for favorites, orange for popular commands

### Typography
- **Font**: Inter - Modern, readable font family
- **Code**: Monaco/Menlo - Monospace fonts for command display
- **Hierarchy**: Clear text size and weight hierarchy

### Components
- **Cards**: Elevated cards with subtle shadows and hover effects
- **Buttons**: Consistent button styles with hover animations
- **Forms**: Clean input designs with focus states
- **Navigation**: Intuitive sidebar with category organization

## 🌟 Advanced Features

### Favorites Management
```typescript
// Add to favorites
FavoritesManager.addFavorite('docker-run')

// Check if favorited
FavoritesManager.isFavorite('docker-run')

// Export/Import favorites
const exported = FavoritesManager.exportFavorites()
FavoritesManager.importFavorites(exported)
```

### Search Functionality
- Real-time filtering as you type
- Searches across commands, descriptions, tags, and examples
- Highlighting of search matches
- Empty state handling with suggestions

### Theme System
- Automatic dark mode detection
- Manual theme toggle
- Persistent theme preference
- Smooth transitions between themes

## 📈 Performance Optimizations

- **Code Splitting**: Automatic code splitting with Next.js
- **Image Optimization**: Next.js Image component for optimal loading
- **Lazy Loading**: Components and animations load on demand
- **Memoization**: React.memo and useMemo for expensive operations
- **Local Storage**: Efficient favorites and settings persistence

## 🔄 Future Enhancements

### Planned Features
- [ ] Export favorites as Markdown/JSON
- [ ] Command history tracking
- [ ] Custom command categories
- [ ] Dockerfile snippet generator
- [ ] Docker Compose template library
- [ ] Offline support with service worker
- [ ] Command execution simulator
- [ ] Integration with Docker Desktop

### Community Features
- [ ] User-contributed commands
- [ ] Rating and reviews
- [ ] Command sharing
- [ ] Community favorites

## 🤝 Contributing

We welcome contributions! Here are some ways you can help:

1. **Add Docker Commands** - Expand the commands database
2. **Improve UI/UX** - Enhance the design and user experience
3. **Add Features** - Implement new functionality
4. **Fix Bugs** - Report and fix issues
5. **Documentation** - Improve docs and examples

## 📄 License

This project is open source and available under the MIT License.

## 👨‍💻 Author

Built with ❤️ by **Kiernan** - Docker Pimp Developer
- Journeyman Frontend Developer
- Senior Graphic Designer  
- Digital Innovator
- Web3 Pioneer

Expertise in React, Next.js, Node.js, AI Art Direction, Blockchain Development, and UI/UX Design.

---

## 🚀 Deployment

This application can be deployed on any platform that supports Next.js:

### Recommended Platforms
- **Vercel** (Optimal for Next.js)
- **Netlify**
- **GitHub Pages** (with static export)
- **Docker** (containerized deployment)

### Deployment Commands
```bash
# Build for production
npm run build

# Start production server
npm start

# Export static version (if needed)
npm run build && npm run export
```

## 📊 Analytics & Monitoring

The application is ready for analytics integration:
- Google Analytics
- Vercel Analytics
- Custom event tracking for user interactions
- Performance monitoring with Core Web Vitals

---

**⭐ If you find this project useful, please give it a star on GitHub!**