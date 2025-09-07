# Portfolio AI

A modern, AI-assisted portfolio website built with Next.js, TypeScript, and Mantine UI, featuring a beautiful sakura theme inspired by mono no aware aesthetics.

## ✨ Features

- **AI-Assisted Development**: Built with Claude AI, GitHub Copilot, and ChatGPT
- **Modern Tech Stack**: Next.js 14+, TypeScript, Mantine UI
- **Beautiful Animations**: Custom sakura petal effects with sakura.js
- **Responsive Design**: Mobile-first approach with Mantine components
- **Dynamic Screenshots**: Automatic project thumbnails with fallback system
- **Data Validation**: Comprehensive schemas with Zod
- **Performance Optimized**: Caching, lazy loading, and optimized images

## 🚀 Quick Start

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

## 📁 Project Structure

```
src/
├── app/                 # Next.js App Router
├── components/          # React components
├── lib/                # Utility functions
├── data/               # Project metadata
├── styles/             # Global styles
└── types/              # TypeScript definitions

public/
├── images/
│   └── projects/       # Local project images
└── js/                 # Third-party scripts
```

## 🖼️ Project Images

The portfolio supports multiple image sources with automatic fallback:

1. **Local Images** (Priority 1): Place images in `/public/images/projects/`
2. **Live Screenshots** (Priority 2): Automatic screenshots from live URLs
3. **Generated Placeholders** (Priority 3): SVG placeholders as final fallback

### Adding Project Images

1. Add your image to `/public/images/projects/`
2. Update the project in `src/data/projects-metadata.json`:
   ```json
   {
     "id": "my-project",
     "title": "My Project",
     "imagePath": "my-project.png",
     "liveUrl": "https://my-project.vercel.app"
   }
   ```

## 🎨 Design System

- **Color Palette**: Sakura pink, warm neutrals, earth tones
- **Typography**: Modern, readable fonts
- **Animations**: Smooth transitions and sakura petal effects
- **Layout**: Clean, minimalist design with focus on content

## 🛠️ Development

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint
- `npm run lint:fix` - Fix linting issues
- `npm run format` - Format code with Prettier

### Code Quality

- **ESLint**: Code linting with Next.js and TypeScript rules
- **Prettier**: Code formatting
- **Husky**: Pre-commit hooks
- **TypeScript**: Full type safety

## 📱 Responsive Design

The portfolio is fully responsive and optimized for:

- Mobile devices (320px+)
- Tablets (768px+)
- Desktop (1024px+)
- Large screens (1440px+)

## 🚀 Deployment

The project is optimized for Vercel deployment with:

- Automatic builds from GitHub
- Edge functions for API routes
- Image optimization
- CDN distribution

## 📄 License

MIT License - see [LICENSE](LICENSE) for details.

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Run tests and linting
5. Submit a pull request

## 📞 Contact

- **Portfolio**: [portfolio-ai-xi.vercel.app](https://portfolio-ai-xi.vercel.app)
- **GitHub**: [@gervonte](https://github.com/gervonte)
- **Email**: [Your Email]

---

Built with ❤️ and AI assistance
