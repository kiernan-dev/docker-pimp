# Development Guide

## 🚀 Getting Started

### Prerequisites
- Node.js 18+
- npm or yarn

### Setup
```bash
npm install
npm run dev
```

## 📁 Project Structure

```
docker-cheat-sheet/
├── app/                          # Next.js 14 App Router
│   ├── globals.css              # Global styles with Tailwind
│   ├── layout.tsx               # Root layout with metadata
│   ├── page.tsx                 # Main application page
│   └── favicon.ico              # App icon
├── components/                   # Reusable React components
│   ├── CommandCard.tsx          # Interactive command display
│   ├── Header.tsx               # App header with search & controls
│   ├── KeyboardShortcuts.tsx    # Keyboard navigation helper
│   ├── LoadingScreen.tsx        # Beautiful loading animation
│   ├── Navigation.tsx           # Category sidebar navigation
│   └── SearchAndFilter.tsx      # Search & filtering controls
├── lib/                         # Utility libraries
│   ├── dockerCommands.ts        # Docker commands data & utilities
│   └── favorites.ts             # Favorites management
└── config files                 # Next.js, Tailwind, TypeScript setup
```

## 🎨 Design System

### Colors
```css
/* Primary Colors */
--docker-blue: #2496ed
--docker-darkblue: #1a73e8
--docker-lightblue: #64b5f6

/* Semantic Colors */
--success: #10b981
--error: #ef4444
--warning: #f59e0b
```

### Typography
- **Primary Font**: Inter (400, 500, 600, 700, 800)
- **Monospace**: Monaco, Menlo, Consolas
- **Scale**: text-sm (14px), text-base (16px), text-lg (18px), etc.

### Spacing
- **Base**: 4px (Tailwind's default)
- **Common**: px-4 (16px), py-2 (8px), space-x-3 (12px)
- **Layout**: max-w-7xl for content containers

## 🧩 Component Architecture

### CommandCard Component
- Displays individual Docker commands
- Copy-to-clipboard functionality
- Expandable details with syntax and flags
- Favorite toggling
- Smooth animations

### Header Component
- Search functionality
- Theme toggle (dark/light)
- Favorites filter
- Responsive design

### Navigation Component
- Category filtering
- Collapsible sidebar
- Command counts
- Mobile-friendly

## 🔄 State Management

### Local State (React)
- Search terms
- Active category
- UI toggles (sidebar, filters)
- Component state

### Persistent State (localStorage)
- User favorites
- Theme preference
- Settings

## 📱 Responsive Design

### Breakpoints
```css
sm: 640px   /* Small tablets */
md: 768px   /* Tablets */
lg: 1024px  /* Small desktops */
xl: 1280px  /* Desktops */
2xl: 1536px /* Large desktops */
```

### Mobile-First Approach
- Base styles for mobile
- Progressive enhancement for larger screens
- Touch-friendly interactions

## 🎭 Animations

### Framer Motion
- Page transitions
- Component entrance animations
- Hover and tap interactions
- Loading states

### Common Patterns
```tsx
// Stagger children
const container = {
  hidden: { opacity: 0 },
  visible: { 
    opacity: 1,
    transition: { staggerChildren: 0.1 }
  }
}

// Slide up animation
const item = {
  hidden: { y: 20, opacity: 0 },
  visible: { y: 0, opacity: 1 }
}
```

## 🔍 Search & Filtering

### Search Algorithm
- Searches across: command, description, tags, examples
- Case-insensitive matching
- Real-time filtering
- No debouncing (instant results)

### Filter Types
1. **Text Search** - Free text input
2. **Category Filter** - Predefined categories
3. **Favorites Filter** - User's saved commands
4. **Popular Filter** - Commonly used commands

## 📊 Data Structure

### Command Object
```typescript
interface DockerCommand {
  id: string                    // Unique identifier
  command: string               // Command name
  description: string           // What it does
  example: string              // Usage example
  category: string             // Category ID
  tags: string[]               // Search tags
  isPopular?: boolean          // Popular flag
  syntax?: string              // Full syntax
  flags?: Array<{              // Command flags
    flag: string
    description: string
  }>
}
```

## ⌨️ Keyboard Shortcuts

### Implementation
- Global event listener on document
- Context-aware (ignores when typing)
- Visual feedback with help modal

### Available Shortcuts
- `/` - Focus search
- `f` - Toggle favorites
- `d` - Toggle dark mode
- `?` - Show help
- `Esc` - Clear/close

## 🎯 Performance Optimizations

### React Optimizations
- `React.memo` for expensive components
- `useMemo` for computed values
- `useCallback` for stable references

### Next.js Features
- Automatic code splitting
- Image optimization
- Static generation where possible

### Bundle Size
- Tree shaking
- Dynamic imports for large components
- Minimal external dependencies

## 🧪 Testing Strategy

### Unit Tests (Recommended)
```bash
# Install testing dependencies
npm install --save-dev jest @testing-library/react @testing-library/jest-dom

# Test files location
__tests__/
├── components/
├── lib/
└── utils/
```

### E2E Tests (Recommended)
```bash
# Install Playwright
npm install --save-dev @playwright/test

# Test scenarios
- Search functionality
- Favorites management
- Keyboard shortcuts
- Mobile interactions
```

## 🚀 Deployment

### Build Commands
```bash
# Development
npm run dev

# Production build
npm run build
npm start

# Type checking
npm run lint
```

### Deployment Platforms
1. **Vercel** (Recommended)
   - Automatic deployments
   - Edge functions
   - Analytics

2. **Netlify**
   - Static site hosting
   - Form handling
   - Split testing

3. **Docker**
   ```dockerfile
   FROM node:18-alpine
   WORKDIR /app
   COPY package*.json ./
   RUN npm ci --only=production
   COPY . .
   RUN npm run build
   CMD ["npm", "start"]
   ```

## 🔧 Development Tips

### Adding New Commands
1. Update `lib/dockerCommands.ts`
2. Add to appropriate category
3. Include all required fields
4. Test search functionality

### Styling Guidelines
- Use Tailwind utilities first
- Custom CSS only when necessary
- Follow design system colors
- Maintain responsive design

### Component Creation
- Start with TypeScript interface
- Add proper prop types
- Include accessibility features
- Add Framer Motion animations

## 🐛 Common Issues

### Build Errors
- Check TypeScript errors: `npx tsc --noEmit`
- Verify import paths
- Ensure all dependencies are installed

### Styling Issues
- Clear Tailwind cache: `npx tailwindcss -o output.css --watch`
- Check dark mode classes
- Verify responsive breakpoints

### Performance Issues
- Use React DevTools Profiler
- Check for unnecessary re-renders
- Monitor bundle size with `npm run analyze`

## 📚 Additional Resources

- [Next.js Documentation](https://nextjs.org/docs)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [Framer Motion Documentation](https://www.framer.com/motion/)
- [Docker Documentation](https://docs.docker.com/)

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Follow the coding standards
4. Add tests if applicable
5. Submit a pull request

Happy coding! 🚀