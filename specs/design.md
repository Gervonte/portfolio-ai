# Portfolio Design Document

## Design Philosophy

### Core Design Principles

- **Mono No Aware**: Embracing the beauty of transience and impermanence through delicate, fleeting visual elements
- **Cherry Blossom Aesthetic**: Soft, organic design inspired by sakura petals and spring renewal
- **Professional Elegance**: Clean, sophisticated design that conveys competence while maintaining warmth
- **Subtle Animation**: Gentle, contemplative movements that reflect the ephemeral nature of beauty
- **Accessibility First**: Inclusive design that works for all users
- **Performance-Driven**: Visual choices that support fast loading and smooth interactions
- **Brand Consistency**: Cohesive visual language throughout all sections

### Target Audience

- **Primary**: Hiring managers and technical leads
- **Secondary**: Recruiters and HR professionals
- **Tertiary**: Fellow developers and industry peers

## Design System Foundation

### Mantine UI Integration

- **Component Library**: Mantine UI for consistent, accessible components
- **Theme System**: Custom Mantine theme with sakura color palette
- **Typography**: Mantine's typography system with custom font configurations
- **Spacing**: Mantine's spacing scale adapted for cherry blossom aesthetic
- **Accessibility**: Built-in accessibility features from Mantine components

### Design Tokens

- **Colors**: Mantine theme colors mapped to sakura palette
- **Typography**: Mantine font families with custom sizing
- **Spacing**: Mantine spacing scale (4px base unit)
- **Shadows**: Custom shadow system for depth and elevation
- **Border Radius**: Consistent border radius values
- **Breakpoints**: Mantine responsive breakpoints

## Visual Identity

### Color Palette

#### Primary Colors (Cherry Blossom Inspired - Red Variant)

- **Sakura Red**: `#FFCDD2` - Soft, delicate red for primary elements
- **Sakura Deep**: `#F44336` - Deeper red for emphasis and CTAs
- **Sakura Light**: `#FFEBEE` - Very light red for backgrounds and highlights
- **Sakura Accent**: `#EF9A9A` - Medium red for secondary elements

#### Secondary Colors

- **Warm White**: `#FEFEFE` - Pure, clean white for main backgrounds
- **Soft Gray**: `#F5F5F5` - Gentle gray for section backgrounds
- **Charcoal**: `#2C2C2C` - Deep charcoal for primary text
- **Midnight**: `#1A1A1A` - Near black for strong contrast

#### Neutral Colors

- **Text Primary**: `#2C2C2C` - Charcoal for main text content
- **Text Secondary**: `#666666` - Medium gray for supporting text
- **Text Muted**: `#999999` - Light gray for placeholders and subtle text
- **Background White**: `#FEFEFE` - Pure white main background
- **Background Cream**: `#FDFCFB` - Warm off-white for section backgrounds
- **Border Light**: `#E8E8E8` - Subtle borders and dividers

#### Work Section Specific Colors

- **Vibe Coded Accent**: `#F44336` - Deep sakura red for AI-assisted work
- **Standard Work Accent**: `#8B4513` - Warm brown for traditional development
- **Vibe Coded Background**: `#FFEBEE` with sakura red tint
- **Standard Work Background**: `#FDF4E3` with warm brown tint

#### Sakura Petal Colors

- **Petal Red**: `#FFCDD2` - Main petal color
- **Petal Light**: `#FFEBEE` - Light petal for subtle effects
- **Petal Dark**: `#F44336` - Dark petal for depth and shadow

### Mantine Theme Configuration

```typescript
// Mantine theme with sakura color palette
const theme = {
  colors: {
    sakura: [
      '#FFEBEE', // sakura[0] - lightest red
      '#FFCDD2', // sakura[1] - light red
      '#EF9A9A', // sakura[2] - medium red
      '#F44336', // sakura[3] - deep red
      '#E53935', // sakura[4] - darker red
      '#D32F2F', // sakura[5] - darkest red
      '#C62828', // sakura[6] - very dark red
      '#B71C1C', // sakura[7] - ultra dark red
      '#8D1A1A', // sakura[8] - near black red
      '#4A0E0E', // sakura[9] - black red
    ],
    warm: [
      '#FDFCFB', // warm[0] - cream white
      '#F5F5F5', // warm[1] - light gray
      '#E8E8E8', // warm[2] - border gray
      '#999999', // warm[3] - muted text
      '#666666', // warm[4] - secondary text
      '#2C2C2C', // warm[5] - primary text
      '#1A1A1A', // warm[6] - near black
    ],
    earth: [
      '#FDF4E3', // earth[0] - light brown
      '#F4E4BC', // earth[1] - warm beige
      '#D4A574', // earth[2] - medium brown
      '#8B4513', // earth[3] - saddle brown
      '#654321', // earth[4] - dark brown
    ],
  },
  primaryColor: 'sakura',
  primaryShade: 3, // Use sakura[3] as primary
  fontFamily: 'Inter, -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, sans-serif',
  fontFamilyMonospace: 'JetBrains Mono, Fira Code, Consolas, monospace',
  headings: {
    fontFamily: 'Inter, sans-serif',
    fontWeight: '600',
  },
  spacing: {
    xs: 4,
    sm: 8,
    md: 16,
    lg: 24,
    xl: 32,
  },
  radius: {
    xs: 4,
    sm: 8,
    md: 12,
    lg: 16,
    xl: 20,
  },
  shadows: {
    xs: '0 1px 3px rgba(0, 0, 0, 0.05)',
    sm: '0 1px 3px rgba(0, 0, 0, 0.1)',
    md: '0 4px 6px rgba(0, 0, 0, 0.1)',
    lg: '0 10px 15px rgba(0, 0, 0, 0.1)',
    xl: '0 20px 25px rgba(0, 0, 0, 0.1)',
  },
};
```

### Typography

#### Font Stack

- **Primary Font**: Inter (Google Fonts) - Modern, highly readable
- **Fallback**: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif
- **Monospace**: "JetBrains Mono", "Fira Code", Consolas, monospace

#### Type Scale

- **H1 (Hero)**: 3.5rem (56px) / 4rem (64px) mobile / 1.2 line-height
- **H2 (Section Headers)**: 2.5rem (40px) / 1.3 line-height
- **H3 (Subsections)**: 1.875rem (30px) / 1.4 line-height
- **H4 (Card Titles)**: 1.25rem (20px) / 1.5 line-height
- **Body Large**: 1.125rem (18px) / 1.7 line-height
- **Body Regular**: 1rem (16px) / 1.6 line-height
- **Body Small**: 0.875rem (14px) / 1.5 line-height
- **Caption**: 0.75rem (12px) / 1.4 line-height

#### Font Weights

- **Light**: 300 - For subtle text and descriptions
- **Regular**: 400 - Body text and general content
- **Medium**: 500 - Emphasized text and labels
- **Semibold**: 600 - Section headers and important text
- **Bold**: 700 - Hero text and strong emphasis

## Layout & Grid System

### Grid Structure

- **Desktop**: 12-column grid with 24px gutters
- **Tablet**: 8-column grid with 20px gutters
- **Mobile**: 4-column grid with 16px gutters
- **Max Width**: 1200px container with auto margins

### Spacing System

- **Base Unit**: 8px
- **Spacing Scale**: 4px, 8px, 12px, 16px, 24px, 32px, 48px, 64px, 96px, 128px
- **Section Padding**: 80px vertical, 24px horizontal
- **Card Padding**: 24px all around
- **Component Spacing**: 16px between related elements

### Breakpoints

- **Mobile**: 320px - 767px
- **Tablet**: 768px - 1023px
- **Desktop**: 1024px - 1439px
- **Large Desktop**: 1440px+

## Component Design System

### Mantine Component Integration

- **Base Components**: Mantine Button, Input, Card, Text, Title, Group, Stack
- **Layout Components**: Mantine Container, Grid, Paper, Box, Center
- **Navigation**: Mantine Navbar, Burger, Anchor, Breadcrumbs
- **Data Display**: Mantine Badge, Avatar, Timeline, List, Table
- **Feedback**: Mantine Alert, Notification, LoadingOverlay, Skeleton
- **Custom Components**: SakuraPetal, ProjectCard, WorkSectionHeader

#### Atomic Design Principles

- **Atoms**: Mantine Button, Input, Icon + Custom SakuraPetal
- **Molecules**: Mantine Card + Custom ProjectCard, SkillBadge, ContactItem
- **Organisms**: Custom WorkSection, ExperienceTimeline + Mantine Navbar
- **Templates**: Mantine Container + Custom PageLayout, SectionLayout
- **Pages**: Home, About, Work, Contact using Mantine components

### Navigation

#### Desktop Navigation

- **Height**: 72px
- **Background**: White with subtle shadow
- **Logo**: Left-aligned, 32px height
- **Menu Items**: Right-aligned, 16px font, 24px spacing
- **Hover State**: Color transition to primary blue
- **Active State**: Primary blue color with bottom border

#### Mobile Navigation

- **Height**: 64px
- **Hamburger Menu**: 24px icon, right-aligned
- **Overlay**: Full-screen with blur background
- **Menu Items**: Stacked vertically, 20px font, 32px spacing
- **Close Button**: Top-right corner, 24px icon

### Hero Section

#### Layout

- **Height**: 100vh minimum
- **Content**: Centered vertically and horizontally
- **Background**: Subtle gradient or pattern
- **CTA Buttons**: Primary and secondary styles

#### Typography Hierarchy

- **Headline**: H1 with bold weight, center-aligned
- **Subheadline**: H3 with regular weight, center-aligned
- **Description**: Body large, center-aligned, max-width 600px

#### Visual Elements

- **Profile Image**: Circular, 200px diameter, subtle shadow with sakura petal frame
- **Background Pattern**: Floating sakura petals with gentle movement
- **Scroll Indicator**: Animated sakura petal falling or gentle arrow with petal accent
- **Sakura Petals**: 6-8 petals floating gently across the hero section
- **Gradient Overlay**: Soft pink gradient overlay for warmth

### Work Sections

#### Vibe Coded Section

- **Header**: Sakura pink gradient background with floating petal pattern
- **Card Design**: Rounded corners (12px), sakura pink accent border with petal shadows
- **Badge**: "AI-Assisted" with soft pink background and petal icon
- **Icons**: AI-themed symbols with cherry blossom accents
- **Hover Effect**: Gentle pink glow with floating petal animation
- **Background**: Subtle sakura petal particles floating gently

#### Standard Work Section

- **Header**: Warm brown gradient background with organic texture
- **Card Design**: Rounded corners (12px), warm brown accent border
- **Badge**: "Hand-Coded" with earth-tone background and traditional icon
- **Icons**: Classic development symbols with organic, hand-drawn feel
- **Hover Effect**: Subtle brown glow with gentle paper texture animation
- **Background**: Subtle paper or wood grain texture

#### Project Cards

- **Layout**: 3-column grid on desktop, 2-column on tablet, 1-column on mobile
- **Image**: 16:9 aspect ratio, rounded top corners
- **Content**: Title, description, tech stack, links
- **Actions**: Live demo and GitHub buttons
- **Animation**: Fade-in on scroll, hover lift effect

### About Section

#### Layout

- **Two-Column**: Text content and skills visualization
- **Skills Section**: Interactive skill bars or tag cloud
- **Timeline**: Vertical timeline for career progression
- **Image**: Professional headshot with subtle styling

#### Skills Visualization

- **Skill Bars**: Animated progress bars with percentages
- **Tech Stack**: Tag-based layout with category grouping
- **Proficiency Levels**: Beginner, Intermediate, Advanced, Expert

### Contact Section

#### Contact Form

- **Layout**: Centered, max-width 600px
- **Fields**: Name, email, subject, message
- **Styling**: Rounded inputs with focus states
- **Validation**: Real-time validation with error messages
- **Submit Button**: Primary style with loading state

#### Contact Information

- **Layout**: Grid of contact methods
- **Icons**: Consistent icon set for each method
- **Links**: Hover effects and external link indicators

## Sakura Petal Effects

### Petal Animation System

- **Floating Petals**: Gentle, random movement across the viewport
- **Petal Shapes**: Organic, hand-drawn style with slight variations
- **Petal Sizes**: 3-4 different sizes (8px, 12px, 16px, 20px)
- **Petal Colors**: Gradient from light pink to deeper pink with transparency
- **Animation Speed**: Very slow, contemplative movement (2-4 seconds per cycle)
- **Petal Density**: 8-12 petals visible at any time
- **Z-Index Layering**: Petals behind content, subtle depth

### Petal Interactions

- **Hover Effects**: Petals gently drift toward cursor
- **Scroll Triggers**: New petals appear on scroll with fade-in animation
- **Work Section Focus**: Petals cluster around active work sections
- **Page Load**: Petals fall gently from top on initial load
- **Mobile Optimization**: Reduced petal count and simpler animations

### Petal Visual Design

- **Shape**: Organic, slightly irregular petal forms
- **Opacity**: 0.3-0.6 for subtle presence
- **Rotation**: Random rotation angles for natural feel
- **Shadow**: Subtle drop shadow for depth
- **Gradient**: Soft pink gradient with transparency
- **Edge Softness**: Blurred edges for dreamy effect

## Interactive Elements

### Animations

#### Page Transitions

- **Fade In**: 0.3s ease-out for page load
- **Slide Up**: 0.4s ease-out for section reveals
- **Stagger**: 0.1s delay between card animations

#### Hover Effects

- **Cards**: Scale (1.02x) with shadow increase
- **Buttons**: Color transition and slight scale
- **Links**: Underline animation from left to right
- **Images**: Subtle zoom effect

#### Loading States

- **Skeleton Screens**: For content loading
- **Spinner**: For form submissions
- **Progress Bar**: For page transitions

### Micro-Interactions

#### Button States

- **Default**: Primary color with subtle shadow
- **Hover**: Darker shade with increased shadow
- **Active**: Pressed state with reduced shadow
- **Disabled**: Muted color with no interaction

#### Form Interactions

- **Focus**: Blue border with subtle glow
- **Error**: Red border with shake animation
- **Success**: Green border with checkmark
- **Loading**: Spinner with disabled state

## Responsive Design

### Mobile-First Approach

- **Base Styles**: Mobile-optimized
- **Progressive Enhancement**: Add features for larger screens
- **Touch Targets**: Minimum 44px for interactive elements
- **Readable Text**: Minimum 16px font size

### Breakpoint-Specific Adjustments

#### Mobile (320px - 767px)

- **Single Column**: All content stacked vertically
- **Larger Touch Targets**: Buttons and links
- **Simplified Navigation**: Hamburger menu
- **Reduced Spacing**: Tighter vertical rhythm

#### Tablet (768px - 1023px)

- **Two-Column Layout**: Where appropriate
- **Larger Images**: Better visual impact
- **Hover States**: Maintained for touch devices
- **Grid Adjustments**: 2-column project cards

#### Desktop (1024px+)

- **Multi-Column Layout**: Full grid system
- **Hover Effects**: All interactive elements
- **Larger Typography**: Enhanced readability
- **Complex Animations**: Full feature set

## Accessibility Design

### Color Contrast

- **Text on Background**: Minimum 4.5:1 ratio
- **Large Text**: Minimum 3:1 ratio
- **Interactive Elements**: High contrast for visibility
- **Focus Indicators**: Clear, high-contrast outlines

### Visual Hierarchy

- **Clear Headings**: Proper heading structure
- **Consistent Spacing**: Predictable layout patterns
- **Logical Flow**: Left-to-right, top-to-bottom
- **Grouped Content**: Related elements visually connected

### Interactive Elements

- **Focus States**: Visible focus indicators
- **Keyboard Navigation**: All elements accessible via keyboard
- **Screen Reader Support**: Proper ARIA labels
- **Alternative Text**: Descriptive alt text for images

## Brand Personality

### Visual Tone

- **Contemplative**: Reflective and thoughtful, embracing the beauty of transience
- **Elegant**: Sophisticated yet gentle, like cherry blossoms in spring
- **Professional**: Clean and trustworthy while maintaining warmth
- **Poetic**: Subtle beauty that speaks to deeper meaning
- **Approachable**: Friendly and inviting without being casual

### Design Language

- **Organic**: Flowing, natural shapes inspired by nature
- **Minimalist**: Essential elements with breathing room
- **Consistent**: Unified visual language throughout
- **Purposeful**: Every element serves a function
- **Transient**: Elements that suggest the beauty of impermanence

## Design Assets

### Icons

- **Style**: Outline style with 2px stroke weight
- **Size**: 16px, 20px, 24px, 32px variants
- **Library**: Heroicons or Feather Icons
- **Custom Icons**: For unique elements like work section badges

### Images

- **Profile Photo**: Professional headshot, 400x400px minimum
- **Project Screenshots**: High-resolution, consistent aspect ratios
- **Background Images**: Subtle, non-distracting patterns
- **Optimization**: WebP format with fallbacks

### Illustrations

- **Custom Graphics**: For empty states and loading
- **Decorative Elements**: Subtle patterns and shapes
- **Work Section Graphics**: AI and coding-themed illustrations
- **Consistent Style**: Matching visual language

## Design Validation

### User Testing Scenarios

- **First Impression**: 5-second test for immediate impact
- **Navigation**: Find specific information quickly
- **Mobile Experience**: Complete tasks on mobile device
- **Accessibility**: Screen reader and keyboard navigation

### Design Review Checklist

- [ ] Consistent color usage throughout
- [ ] Proper typography hierarchy
- [ ] Responsive design at all breakpoints
- [ ] Accessibility standards met
- [ ] Performance considerations addressed
- [ ] Brand consistency maintained
- [ ] User experience flows logical
- [ ] Visual hierarchy clear and effective

## Future Design Considerations

### Scalability

- **Component Library**: Reusable design components
- **Design Tokens**: Centralized design values
- **Style Guide**: Living documentation
- **Version Control**: Design system updates

### Enhancement Opportunities

- **Dark Mode**: Alternative color scheme
- **Animation Library**: Advanced micro-interactions
- **Custom Illustrations**: Brand-specific graphics
- **Advanced Typography**: Variable fonts and effects

---

_This design document will be updated as the visual design evolves and new requirements are identified._
