# 🐳 Docker Pimp

A modern Docker commands companion with search, favorites, and copy-to-clipboard functionality.

![Docker Pimp](https://img.shields.io/badge/Docker-Pimp-2496ED?style=for-the-badge&logo=docker&logoColor=white)
![Next.js](https://img.shields.io/badge/Next.js-14-000000?style=for-the-badge&logo=next.js&logoColor=white)
![React](https://img.shields.io/badge/React-18-61DAFB?style=for-the-badge&logo=react&logoColor=black)

## Features

- **100+ Docker Commands** - Complete collection from basic to advanced operations
- **Smart Search** - Filter by command name, description, or tags
- **Categories** - Organized by Basic, Images, Containers, Networks, Volumes, Compose, System
- **Favorites** - Save frequently used commands with localStorage
- **Copy to Clipboard** - One-click copying for commands and examples
- **Dark/Light Theme** - Automatic system preference detection
- **Responsive Design** - Works on desktop, tablet, and mobile

## Quick Start

```bash
# Install dependencies
pnpm install

# Start development server
pnpm run dev

# Build for production
pnpm run build
```

The application will be available at `http://localhost:3000`

## Tech Stack

- **Next.js 14** - App Router with React Server Components
- **TypeScript** - Full type safety
- **Tailwind CSS** - Utility-first styling
- **Framer Motion** - Smooth animations
- **Local Storage** - Persistent favorites and settings

## Popular Commands Included

- `docker run` - Create and start containers
- `docker ps` - List running containers  
- `docker images` - List local images
- `docker build` - Build images from Dockerfile
- `docker exec` - Execute commands in containers
- `docker logs` - View container logs
- `docker-compose up` - Start composed applications
- `docker system prune` - Clean up unused resources

## Project Structure

```text
docker-pimp/
├── app/              # Next.js App Router
├── components/       # React components
├── lib/             # Docker commands data & utilities
└── public/          # Static assets
```
