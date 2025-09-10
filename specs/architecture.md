# Portfolio Architecture Document

## System Overview

### Architecture Philosophy

- **Performance First**: Optimized for fast loading and smooth interactions
- **Maintainable**: Clean, modular code structure for easy updates
- **Scalable**: Architecture that can grow with future requirements
- **Accessible**: Built with accessibility standards from the ground up
- **Modern**: Leveraging current best practices and technologies

### Technology Stack

#### Frontend Framework

- **Next.js 14+**: Full-stack React framework with App Router
- **React 18+**: Component-based architecture with hooks
- **TypeScript**: Type safety and better developer experience
- **Server-Side Rendering**: SEO-optimized page generation
- **Static Site Generation**: Pre-built pages for maximum performance

#### Styling & Animation

- **Mantine UI**: Comprehensive React component library with built-in design system
- **Mantine Theme**: Custom theme configuration for sakura color palette
- **Framer Motion**: Smooth animations and transitions
- **CSS Modules**: Scoped styling for custom components
- **PostCSS**: CSS processing and optimization

#### State Management

- **React Context**: Global state for theme and user preferences
- **React Query**: Server state management and caching
- **Zustand**: Lightweight state management for complex interactions

#### Build & Deployment

- **Next.js Build**: Optimized production builds
- **ESLint + Prettier**: Code quality and formatting
- **Husky**: Git hooks for code quality
- **Vercel**: Optimized Next.js deployment platform
- **GitHub Actions**: CI/CD pipeline

## Project Structure

```
portfolio-ai/
├── public/
│   ├── images/
│   │   ├── profile/
│   │   ├── projects/
│   │   └── sakura-petals/
│   ├── icons/
│   ├── favicon.ico
│   └── manifest.json
├── src/
│   ├── app/
│   │   ├── globals.css
│   │   ├── layout.tsx
│   │   ├── page.tsx
│   │   ├── about/
│   │   │   └── page.tsx
│   │   ├── work/
│   │   │   ├── page.tsx
│   │   │   ├── vibe-coded/
│   │   │   │   └── page.tsx
│   │   │   └── standard-work/
│   │   │       └── page.tsx
│   │   ├── contact/
│   │   │   └── page.tsx
│   │   └── api/
│   │       └── contact/
│   │           └── route.ts
│   ├── components/
│   │   ├── common/
│   │   │   ├── Header/
│   │   │   ├── Footer/
│   │   │   ├── Navigation/
│   │   │   └── LoadingSpinner/
│   │   ├── sections/
│   │   │   ├── Hero/
│   │   │   ├── About/
│   │   │   ├── Work/
│   │   │   │   ├── VibeCoded/
│   │   │   │   └── StandardWork/
│   │   │   ├── Experience/
│   │   │   └── Contact/
│   │   ├── ui/
│   │   │   ├── Button/
│   │   │   ├── Card/
│   │   │   ├── Modal/
│   │   │   └── Form/
│   │   └── animations/
│   │       ├── SakuraPetals/
│   │       ├── FadeIn/
│   │       └── ScrollReveal/
│   ├── hooks/
│   │   ├── useSakuraPetals.ts
│   │   ├── useScrollAnimation.ts
│   │   └── useIntersectionObserver.ts
│   ├── utils/
│   │   ├── animations.ts
│   │   ├── constants.ts
│   │   └── helpers.ts
│   ├── data/
│   │   ├── projects.ts
│   │   ├── experience.ts
│   │   └── skills.ts
│   ├── types/
│   │   ├── project.ts
│   │   ├── experience.ts
│   │   └── common.ts
│   └── lib/
│       ├── metadata.ts
│       └── seo.ts
├── package.json
├── mantine.config.js
├── tsconfig.json
├── next.config.js
└── README.md
```

## Mantine Integration

### Mantine Provider Setup

```typescript
// src/app/layout.tsx
import { MantineProvider } from '@mantine/core';
import { Notifications } from '@mantine/notifications';
import { theme } from './lib/theme';

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <MantineProvider theme={theme}>
          <Notifications />
          {children}
        </MantineProvider>
      </body>
    </html>
  );
}
```

### Mantine Theme Configuration

```typescript
// src/lib/theme.ts
import { createTheme } from '@mantine/core';

export const theme = createTheme({
  colors: {
    sakura: [
      '#FCE4EC',
      '#F8BBD9',
      '#F48FB1',
      '#E91E63',
      '#C2185B',
      '#AD1457',
      '#880E4F',
      '#4A0E2E',
      '#2C0B1A',
      '#1A070F',
    ],
    warm: [
      '#FDFCFB',
      '#F5F5F5',
      '#E8E8E8',
      '#999999',
      '#666666',
      '#2C2C2C',
      '#1A1A1A',
    ],
    earth: ['#FDF4E3', '#F4E4BC', '#D4A574', '#8B4513', '#654321'],
  },
  primaryColor: 'sakura',
  primaryShade: 3,
  fontFamily:
    'Inter, -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, sans-serif',
  headings: { fontFamily: 'Inter, sans-serif', fontWeight: '600' },
  spacing: { xs: 4, sm: 8, md: 16, lg: 24, xl: 32 },
  radius: { xs: 4, sm: 8, md: 12, lg: 16, xl: 20 },
});
```

### Mantine Component Usage

- **Layout**: Container, Grid, Stack, Group, Box
- **Typography**: Text, Title, Anchor, List
- **Inputs**: TextInput, Textarea, Select, Checkbox, Radio
- **Navigation**: Navbar, Burger, Breadcrumbs, Anchor
- **Data Display**: Card, Badge, Avatar, Timeline, Table
- **Feedback**: Alert, Notification, LoadingOverlay, Skeleton
- **Overlays**: Modal, Drawer, Popover, Tooltip

## Component Architecture

### Component Hierarchy

```
RootLayout
├── Header
│   ├── Navigation
│   └── MobileMenu
├── HomePage
│   ├── Hero
│   │   ├── ProfileImage
│   │   ├── SakuraPetals (background)
│   │   └── ScrollIndicator
│   ├── About
│   │   ├── SkillsGrid
│   │   └── Timeline
│   ├── Work
│   │   ├── VibeCoded
│   │   │   ├── ProjectCard[]
│   │   │   └── WorkSectionHeader
│   │   └── StandardWork
│   │       ├── ProjectCard[]
│   │       └── WorkSectionHeader
│   ├── Experience
│   │   ├── ExperienceTimeline
│   │   └── EducationCard[]
│   └── Contact
│       ├── ContactForm
│       └── ContactInfo
└── Footer
    ├── SocialLinks
    └── Copyright
```

### Component Design Patterns

#### Atomic Design Principles

- **Atoms**: Button, Input, Icon, SakuraPetal
- **Molecules**: ProjectCard, SkillBadge, ContactItem
- **Organisms**: WorkSection, ExperienceTimeline, Navigation
- **Templates**: PageLayout, SectionLayout
- **Pages**: Home, About, Work, Contact

#### Component Structure

```typescript
// Example component structure
interface ComponentProps {
  // Props interface
}

const Component: React.FC<ComponentProps> = ({ ...props }) => {
  // Hooks
  // State
  // Effects
  // Handlers

  return (
    <div className="component-wrapper">
      {/* JSX */}
    </div>
  );
};

export default Component;
```

## Data Architecture

### Data Models

#### Project Model

```typescript
interface Project {
  id: string;
  title: string;
  description: string;
  longDescription: string;
  category: 'vibe-coded' | 'standard-work';
  technologies: string[];
  images: ProjectImage[];
  liveUrl?: string;
  githubUrl?: string;
  featured: boolean;
  createdAt: Date;
  updatedAt: Date;
  aiTools?: string[];
  challenges: string[];
  results: string[];
}

interface ProjectImage {
  src: string;
  alt: string;
  caption?: string;
  type: 'desktop' | 'mobile' | 'gif' | 'diagram';
}
```

#### Experience Model

```typescript
interface Experience {
  id: string;
  company: string;
  position: string;
  location: string;
  startDate: Date;
  endDate?: Date;
  current: boolean;
  description: string;
  achievements: string[];
  technologies: string[];
  type: 'full-time' | 'contract' | 'freelance' | 'internship';
}
```

#### Skill Model

```typescript
interface Skill {
  id: string;
  name: string;
  category: 'frontend' | 'backend' | 'tools' | 'design' | 'ai';
  proficiency: 'beginner' | 'intermediate' | 'advanced' | 'expert';
  yearsExperience: number;
  featured: boolean;
  icon?: string;
}
```

### Data Management

#### Static Data

- **Projects**: Stored in `src/data/projects.ts`
- **Experience**: Stored in `src/data/experience.ts`
- **Skills**: Stored in `src/data/skills.ts`
- **Content**: Markdown files for blog posts (future)

#### Dynamic Data

- **Contact Form**: Form submission handling
- **Analytics**: User interaction tracking
- **Preferences**: Theme and user settings

## Animation Architecture

### Sakura Petal System

#### Petal Component

```typescript
interface SakuraPetalProps {
  size: 'small' | 'medium' | 'large';
  color: 'light' | 'medium' | 'dark';
  position: { x: number; y: number };
  rotation: number;
  animationDuration: number;
  delay: number;
}

const SakuraPetal: React.FC<SakuraPetalProps> = ({ ...props }) => {
  // Petal rendering and animation logic
};
```

#### Petal Manager Hook

```typescript
const useSakuraPetals = () => {
  const [petals, setPetals] = useState<SakuraPetal[]>([]);

  const createPetal = () => {
    // Petal creation logic
  };

  const animatePetals = () => {
    // Animation loop
  };

  return { petals, createPetal, animatePetals };
};
```

#### Animation Performance

- **RequestAnimationFrame**: Smooth 60fps animations
- **CSS Transforms**: Hardware-accelerated animations
- **Intersection Observer**: Animate only visible elements
- **Debounced Resize**: Optimize for window resizing

### Scroll Animations

#### Intersection Observer Hook

```typescript
const useIntersectionObserver = (
  ref: RefObject<HTMLElement>,
  options?: IntersectionObserverInit
) => {
  const [isIntersecting, setIsIntersecting] = useState(false);

  useEffect(() => {
    // Observer logic
  }, [ref, options]);

  return isIntersecting;
};
```

#### Animation Triggers

- **Fade In**: Elements fade in on scroll
- **Slide Up**: Elements slide up from bottom
- **Stagger**: Sequential animation of child elements
- **Parallax**: Background elements move at different speeds

## Performance Architecture

### Code Splitting

- **Route-based**: Split by page sections
- **Component-based**: Lazy load heavy components
- **Library-based**: Split large dependencies

### Image Optimization

- **WebP Format**: Modern image format with fallbacks
- **Responsive Images**: Different sizes for different screens
- **Lazy Loading**: Load images as they enter viewport
- **Blur Placeholders**: Smooth loading experience

### Caching Strategy

- **Static Assets**: Long-term caching with versioning
- **API Responses**: Short-term caching for dynamic data
- **Service Worker**: Offline functionality and caching
- **CDN**: Global content delivery

### Bundle Optimization

- **Tree Shaking**: Remove unused code
- **Minification**: Compress JavaScript and CSS
- **Compression**: Gzip/Brotli compression
- **Critical CSS**: Inline critical styles

## Security Architecture

### Content Security Policy

```html
<meta
  http-equiv="Content-Security-Policy"
  content="default-src 'self'; 
               script-src 'self' 'unsafe-inline'; 
               style-src 'self' 'unsafe-inline'; 
               img-src 'self' data: https:;"
/>
```

### Form Security

- **Input Validation**: Client and server-side validation
- **XSS Protection**: Sanitize user inputs
- **CSRF Protection**: Token-based protection
- **Rate Limiting**: Prevent spam submissions

### External Dependencies

- **Audit Dependencies**: Regular security audits
- **Update Dependencies**: Keep packages current
- **Minimize Attack Surface**: Use minimal dependencies
- **Subresource Integrity**: Verify external resources

## Accessibility Architecture

### Semantic HTML

- **Proper Heading Hierarchy**: H1 → H2 → H3 structure
- **ARIA Labels**: Screen reader support
- **Landmark Roles**: Navigation, main, complementary
- **Form Labels**: Associated labels for all inputs

### Keyboard Navigation

- **Tab Order**: Logical tab sequence
- **Focus Management**: Visible focus indicators
- **Skip Links**: Jump to main content
- **Keyboard Shortcuts**: Common actions

### Screen Reader Support

- **Alt Text**: Descriptive image alternatives
- **Live Regions**: Dynamic content announcements
- **Descriptive Links**: Meaningful link text
- **Form Instructions**: Clear form guidance

## SEO Architecture (Next.js Optimized)

### Next.js SEO Features

- **Server-Side Rendering**: Full HTML content for search engines
- **Static Site Generation**: Pre-built pages for maximum performance
- **Automatic Code Splitting**: Optimized loading per page
- **Built-in Image Optimization**: Next.js Image component
- **Metadata API**: Dynamic meta tags per page

### Metadata Management

```typescript
// src/lib/metadata.ts
export const siteConfig = {
  name: 'Gervonte Fowler - Developer Portfolio',
  description:
    'Professional portfolio showcasing AI-assisted and traditional development work',
  url: 'https://portfolio-ai-xi.vercel.app/',
  ogImage: '/images/og-image.jpg',
  links: {
    github: 'https://github.com/gervonte',
    linkedin: 'https://www.linkedin.com/in/gervonte-fowler-5a7781158',
  },
};

// Page-level metadata
export const generateMetadata = async ({
  params,
}: {
  params: { slug: string };
}) => {
  return {
    title: `${siteConfig.name} - ${params.slug}`,
    description: siteConfig.description,
    openGraph: {
      title: siteConfig.name,
      description: siteConfig.description,
      url: siteConfig.url,
      siteName: siteConfig.name,
      images: [
        {
          url: siteConfig.ogImage,
          width: 1200,
          height: 630,
          alt: siteConfig.name,
        },
      ],
      locale: 'en_US',
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title: siteConfig.name,
      description: siteConfig.description,
      images: [siteConfig.ogImage],
    },
  };
};
```

### Layout Metadata

```typescript
// src/app/layout.tsx
export const metadata: Metadata = {
  title: {
    default: siteConfig.name,
    template: `%s | ${siteConfig.name}`,
  },
  description: siteConfig.description,
  keywords: [
    'developer',
    'portfolio',
    'AI',
    'coding',
    'web development',
    'React',
    'Next.js',
    'TypeScript',
  ],
  authors: [{ name: 'Your Name' }],
  creator: 'Your Name',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: siteConfig.url,
    title: siteConfig.name,
    description: siteConfig.description,
    siteName: siteConfig.name,
  },
  twitter: {
    card: 'summary_large_image',
    title: siteConfig.name,
    description: siteConfig.description,
    creator: '@yourusername',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
};
```

### Structured Data

```typescript
// src/lib/structured-data.ts
export const personStructuredData = {
  '@context': 'https://schema.org',
  '@type': 'Person',
  name: 'Your Name',
  jobTitle: 'Software Developer',
  description:
    'Full-stack developer specializing in modern web technologies and AI-assisted development',
  url: 'https://yourportfolio.com',
  image: 'https://yourportfolio.com/images/profile.jpg',
  sameAs: [
    'https://github.com/yourusername',
    'https://linkedin.com/in/yourusername',
    'https://twitter.com/yourusername',
  ],
  knowsAbout: [
    'React',
    'Next.js',
    'TypeScript',
    'AI Development',
    'Web Development',
  ],
  hasOccupation: {
    '@type': 'Occupation',
    name: 'Software Developer',
    description:
      'Creating modern web applications with AI assistance and traditional coding',
  },
};
```

### Sitemap Generation

```typescript
// src/app/sitemap.ts
import { MetadataRoute } from 'next';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://yourportfolio.com';

  return [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 1,
    },
    {
      url: `${baseUrl}/about`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/work`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/work/vibe-coded`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.7,
    },
    {
      url: `${baseUrl}/work/standard-work`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.7,
    },
    {
      url: `${baseUrl}/contact`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.6,
    },
  ];
}
```

### Robots.txt

```typescript
// src/app/robots.ts
import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: ['/api/', '/admin/'],
    },
    sitemap: 'https://yourportfolio.com/sitemap.xml',
  };
}
```

### Image Optimization

```typescript
// Using Next.js Image component
import Image from "next/image";

const OptimizedImage = ({ src, alt, ...props }) => (
  <Image
    src={src}
    alt={alt}
    width={800}
    height={600}
    priority={props.priority}
    placeholder="blur"
    blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAABAAEDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAUEAEAAAAAAAAAAAAAAAAAAAAA/8QAFQEBAQAAAAAAAAAAAAAAAAAAAAX/xAAUEQEAAAAAAAAAAAAAAAAAAAAA/9oADAMBAAIRAxEAPwCdABmX/9k="
    {...props}
  />
);
```

### Performance Optimization

- **Automatic Code Splitting**: Each page loads only necessary code
- **Image Optimization**: WebP format with fallbacks
- **Font Optimization**: Google Fonts with display=swap
- **Bundle Analysis**: Built-in bundle analyzer
- **Core Web Vitals**: Automatic optimization for LCP, FID, CLS

## Deployment Architecture

### Hosting Platform

- **Vercel**: Optimized for React applications
- **Netlify**: Alternative with good performance
- **GitHub Pages**: Free option for static sites
- **Custom Domain**: Professional URL

### CI/CD Pipeline

```yaml
# GitHub Actions workflow
name: Deploy Portfolio
on:
  push:
    branches: [main]
jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - name: Setup Node.js
        uses: actions/setup-node@v2
      - name: Install dependencies
        run: npm install
      - name: Build
        run: npm run build
      - name: Deploy
        run: npm run deploy
```

### Environment Configuration

- **Development**: Local development with hot reload
- **Staging**: Pre-production testing environment
- **Production**: Live site with optimizations
- **Environment Variables**: Secure configuration management

## Monitoring & Analytics

### Performance Monitoring

- **Core Web Vitals**: LCP, FID, CLS tracking
- **Bundle Analysis**: Webpack bundle analyzer
- **Lighthouse**: Automated performance audits
- **Real User Monitoring**: Actual user performance data

### Error Tracking

- **Sentry**: Error monitoring and reporting
- **Console Logging**: Development error tracking
- **User Feedback**: Error reporting system
- **Health Checks**: System status monitoring

### Analytics

- **Google Analytics 4**: User behavior tracking
- **Google Search Console**: SEO performance
- **Heatmaps**: User interaction analysis
- **Conversion Tracking**: Contact form submissions

## Future Architecture Considerations

### Scalability

- **Microservices**: Break into smaller services
- **CDN Integration**: Global content delivery
- **Database**: Move from static to dynamic data
- **API Layer**: Backend API for dynamic content

### Feature Additions

- **Blog System**: Content management
- **Admin Panel**: Content editing interface
- **Multi-language**: Internationalization
- **Dark Mode**: Theme switching system

### Technology Evolution

- **React 19**: Latest React features
- **Next.js**: Full-stack React framework
- **Edge Functions**: Serverless functions
- **WebAssembly**: Performance-critical components

---

_This architecture document will be updated as the technical implementation evolves and new requirements are identified._
