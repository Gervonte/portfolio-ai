# Development Guide

This guide covers the development setup, architecture, and best practices for the Portfolio AI project.

## 🏗️ Architecture

### Tech Stack

- **Framework**: Next.js 14+ (App Router)
- **Language**: TypeScript
- **UI Library**: Mantine UI
- **Styling**: CSS-in-JS with Mantine
- **Animations**: sakura.js, Framer Motion
- **Validation**: Zod
- **Deployment**: Vercel

### Project Structure

```
src/
├── app/                    # Next.js App Router
│   ├── api/               # API routes
│   ├── layout.tsx         # Root layout
│   ├── page.tsx           # Home page
│   └── globals.css        # Global styles
├── components/            # React components
│   ├── ui/               # Reusable UI components
│   ├── sections/         # Page sections
│   └── effects/          # Animation components
├── lib/                  # Utility functions
│   ├── schemas.ts        # Zod validation schemas
│   ├── validation.ts     # Validation utilities
│   ├── screenshot.ts     # Screenshot utilities
│   └── screenshot-cache.ts # Caching system
├── data/                 # Static data
│   └── projects-metadata.json # Project data
├── styles/               # Global styles
└── types/                # TypeScript definitions
```

## 🚀 Getting Started

### Prerequisites

- Node.js 18+
- npm or yarn
- Git

### Installation

```bash
# Clone the repository
git clone https://github.com/gervonte/portfolio-ai.git
cd portfolio-ai

# Install dependencies
npm install

# Start development server
npm run dev
```

### Environment Setup

No environment variables required for basic development.

## 🎨 Design System

### Color Palette

- **Primary**: Sakura Pink (#E91E63)
- **Secondary**: Warm Neutrals (#F5F5F5, #E0E0E0)
- **Accent**: Earth Tones (#8D6E63, #A1887F)
- **Text**: Dark Gray (#212121)

### Typography

- **Headings**: Modern, clean fonts
- **Body**: Readable, accessible fonts
- **Code**: Monospace fonts for code blocks

### Components

- **Mantine UI**: Primary component library
- **Custom Components**: Built on top of Mantine
- **Responsive**: Mobile-first design approach

## 🖼️ Image System

### Local Images (Priority 1)

- Location: `/public/images/projects/`
- Formats: PNG, JPG, JPEG, WebP, SVG
- Naming: `project-name.png`

### Live Screenshots (Priority 2)

- Service: `v1.screenshot.11ty.dev`
- Caching: 7-day file system cache
- Fallback: SVG placeholders

### Adding New Project Images

1. Add image to `/public/images/projects/`
2. Update `src/data/projects-metadata.json`:
   ```json
   {
     "id": "new-project",
     "title": "New Project",
     "imagePath": "new-project.png",
     "liveUrl": "https://new-project.vercel.app"
   }
   ```

## 🔧 Development Tools

### Code Quality

- **ESLint**: Code linting with Next.js rules
- **Prettier**: Code formatting
- **Husky**: Pre-commit hooks
- **TypeScript**: Full type safety

### Available Scripts

```bash
npm run dev          # Start development server
npm run build        # Build for production
npm run start        # Start production server
npm run lint         # Run ESLint
npm run lint:fix     # Fix linting issues
npm run format       # Format code with Prettier
```

### Git Hooks

- **Pre-commit**: Runs linting and formatting
- **Pre-push**: Runs type checking

## 📱 Responsive Design

### Breakpoints

- **Mobile**: 320px - 767px
- **Tablet**: 768px - 1023px
- **Desktop**: 1024px - 1439px
- **Large**: 1440px+

### Testing

- Test on multiple devices
- Use browser dev tools
- Check accessibility

## 🚀 Deployment

### Vercel (Recommended)

1. Connect GitHub repository
2. Configure build settings
3. Deploy automatically on push

### Manual Deployment

```bash
npm run build
npm run start
```

## 🐛 Troubleshooting

### Common Issues

#### Images Not Loading

- Check file exists in `/public/images/projects/`
- Verify `imagePath` in metadata
- Check browser console for 404 errors

#### Build Errors

- Run `npm run lint:fix`
- Check TypeScript errors
- Verify all imports are correct

#### Performance Issues

- Check image optimization
- Verify caching is working
- Monitor bundle size

### Debug Mode

```bash
# Enable debug logging
DEBUG=* npm run dev
```

## 📚 Best Practices

### Code Style

- Use TypeScript for all new code
- Follow ESLint rules
- Use meaningful variable names
- Add comments for complex logic

### Component Development

- Keep components small and focused
- Use Mantine components when possible
- Add proper TypeScript types
- Test on multiple screen sizes

### Performance

- Optimize images before adding
- Use lazy loading for heavy components
- Minimize bundle size
- Cache expensive operations

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Run tests and linting
5. Submit a pull request

### Pull Request Guidelines

- Clear description of changes
- Screenshots for UI changes
- Test on multiple devices
- Follow code style guidelines

## 📞 Support

- **Issues**: GitHub Issues
- **Discussions**: GitHub Discussions
- **Email**: [Your Email]

---

Happy coding! 🚀
