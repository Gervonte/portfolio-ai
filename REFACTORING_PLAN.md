# Portfolio AI - Comprehensive Refactoring Plan

## Overview

This document outlines a comprehensive refactoring plan to achieve a more DRY, polished, and maintainable codebase. The analysis identified several areas for improvement including redundant code patterns, hardcoded values, large components that can be broken down, and opportunities for better reusability.

## 🎯 Goals

1. **Remove redundant code** - Eliminate duplicate patterns and utilities
2. **Refactor large components** - Break down monolithic components into smaller, reusable pieces
3. **Create reusable components** - Build a library of shared components (e.g., skill cards, leadership cards)
4. **Eliminate hardcoded values** - Make the site configurable for different users/resumes
5. **Follow DRY principles** - Don't Repeat Yourself
6. **Fix warnings** - Address any linter warnings or errors

## 📊 Analysis Summary

### Current State Metrics (Before Refactoring)

#### **Codebase Size** ✅ **MEASURED**

- **Total Files**: 92 TypeScript/TSX files
- **Total Lines of Code**: 12,623 lines
- **Total Components**: 57 React components
- **Bundle Size**: 196 kB First Load JS
- **Dependencies**: 1.4GB node_modules

#### **Largest Components (Lines of Code)**

1. **ScrollIndicator.tsx**: 699 lines ⚠️
2. **AboutSection.tsx**: 481 lines ⚠️
3. **TechnicalDetailsModal.tsx**: 480 lines ⚠️
4. **ContactSection.tsx**: 433 lines ⚠️
5. **Footer.tsx**: 239 lines
6. **HeaderSection.tsx**: 238 lines
7. **ValidationDemo.tsx**: 236 lines
8. **ThumbnailSection.tsx**: 232 lines
9. **CacheManagement.tsx**: 222 lines
10. **PerformanceCard.tsx**: 216 lines

#### **Code Quality Metrics** ✅ **MEASURED**

- **Console Statements**: 26 (should be removed in production)
- **Switch Statements**: 16 (potential for consolidation)
- **TODO/FIXME Comments**: 0 (good!)
- **Linter Status**: ✅ No errors found

#### **Redundant Patterns Identified**

- **Icon Mapping Functions**: 4+ duplicate implementations
- **Color Mapping Logic**: Scattered across multiple components
- **Badge/Tooltip Patterns**: Similar implementations with slight variations
- **Utility Functions**: Duplicate logic in multiple files

#### **Hardcoded Values Found**

- **Personal Information**: Name, title, location, social handles
- **URLs**: Portfolio URL, company websites, social links
- **Configuration**: SEO metadata, parallax speeds, theme settings
- **Project Data**: Company names, locations, descriptions

### **📏 Baseline Measurements (September 20, 2025)** ✅ **COMPLETED**

#### **Component Size Analysis** ✅ **MEASURED**

```
Total: 7,712 lines across all components

Top 10 Largest Components:
699 lines - ScrollIndicator.tsx ⚠️
481 lines - AboutSection.tsx ⚠️
480 lines - TechnicalDetailsModal.tsx ⚠️
433 lines - ContactSection.tsx ⚠️
239 lines - Footer.tsx
238 lines - HeaderSection.tsx
236 lines - ValidationDemo.tsx
232 lines - ThumbnailSection.tsx
222 lines - CacheManagement.tsx
216 lines - PerformanceCard.tsx
```

#### **Code Quality Baseline** ✅ **MEASURED**

- **Console Statements**: 26 (target: 0)
- **Switch Statements**: 16 (target: <8)
- **Total TypeScript Files**: 92
- **Total React Components**: 57

#### **Bundle Size Baseline** ✅ **MEASURED**

- **First Load JS**: 196 kB (target: <160 kB)
- **Target Reduction**: 18% (36 kB reduction needed)
- **Build Status**: ✅ Successful (3.4s compile time)
- **Bundle Analysis**: ✅ Complete with detailed chunk breakdown

#### **Refactoring Priority Targets**

1. **ScrollIndicator.tsx**: 699 → <300 lines (57% reduction needed)
2. **AboutSection.tsx**: 481 → <200 lines (58% reduction needed)
3. **TechnicalDetailsModal.tsx**: 480 → <200 lines (58% reduction needed)
4. **ContactSection.tsx**: 433 → <150 lines (65% reduction needed)

## 🔍 Key Issues Identified

### 1. Redundant Code Patterns

#### Icon Mapping Duplication

**Files Affected**: `AboutSection.tsx`, `WorkSection.tsx`, `ExpandableProjectCard.tsx`, `technical-details/utils.tsx`

**Problem**: Multiple components have their own icon mapping functions:

- `getCategoryIconComponent()` in AboutSection
- `getSkillIconComponent()` in AboutSection
- `getProjectIcon()` in WorkSection and ExpandableProjectCard
- `getTechnicalIcon()` in technical-details/utils

**Solution**: Create centralized icon mapping utilities

#### Color Mapping Duplication

**Files Affected**: `AboutSection.tsx`, `WorkSection.tsx`, `ExpandableProjectCard.tsx`

**Problem**: Similar color mapping logic scattered across components:

- `getTypeColor()` in WorkSection
- `getStatusColor()` in ExpandableProjectCard
- Theme-aware color logic in AboutSection

**Solution**: Centralize color mapping utilities

#### Badge/Tooltip Pattern Duplication

**Files Affected**: Multiple components

**Problem**: Similar badge and tooltip patterns repeated across components with slight variations

**Solution**: Create standardized badge and tooltip components

### 2. Large Components That Need Breaking Down

#### AboutSection.tsx (481 lines)

**Issues**:

- Multiple responsibilities (skills, education, research, leadership)
- Large utility functions embedded in component
- Complex rendering logic

**Breakdown Plan**:

- Extract `SkillsGrid` component
- Extract `EducationCard` component
- Extract `ResearchProjectsGrid` component
- Extract `LeadershipCard` component
- Move utility functions to separate files

#### ContactSection.tsx (429 lines)

**Issues**:

- Form logic mixed with UI rendering
- Hardcoded contact information
- Complex form validation

**Breakdown Plan**:

- Extract `ContactForm` component
- Extract `ContactInfo` component
- Create reusable form validation hooks
- Make contact info configurable

#### TechnicalDetailsModal.tsx (476 lines)

**Issues**:

- Complex modal logic
- Multiple technical section types
- Screenshot gallery logic

**Breakdown Plan**:

- Extract `TechnicalSectionRenderer` component
- Extract `ScreenshotGallery` component
- Create `TechnicalSectionFactory` for different section types

### 3. Hardcoded Values

#### Personal Information

**Files Affected**: `seo.ts`, `ContactSection.tsx`, `AboutSection.tsx`

**Hardcoded Values**:

- Name: "Gervonte Fowler"
- Title: "M.S. Computer Science | AI-Enhanced Developer"
- Location: "San Francisco, California"
- URLs: "https://portfolio-ai-xi.vercel.app"
- Social handles: "@gervontefowler", "gervonte-fowler", "gervonte"

**Solution**: Move to configuration files

#### Project-Specific Data

**Files Affected**: `ExperienceSection.tsx`, `ContactSection.tsx`

**Hardcoded Values**:

- Company: "NovaCredit"
- Website: "https://novacredit.com"
- Location: "San Francisco, California"

**Solution**: Make experience data configurable

#### Configuration Values

**Files Affected**: `seo.ts`, `parallax-config.ts`

**Hardcoded Values**:

- SEO metadata
- Parallax speeds
- Theme configurations

**Solution**: Create environment-based configuration system

### 4. Missing Reusable Components

#### Skill-Related Components

**Need**: Reusable skill card components that can be used across different sections

**Current**: Skills are rendered differently in AboutSection vs other places

**Solution**: Create `SkillCard`, `SkillBadge`, `SkillGrid` components

#### Card Components

**Need**: Specialized card components for different content types

**Current**: Heavy reliance on UnifiedCard with complex props

**Solution**: Create `ProjectCard`, `ExperienceCard`, `EducationCard`, `LeadershipCard`

#### Form Components

**Need**: Reusable form components and validation

**Current**: Form logic embedded in ContactSection

**Solution**: Create `FormField`, `FormSection`, validation hooks

## 🚀 Refactoring Plan

### Phase 1: Foundation & Utilities (Week 1)

#### 1.1 Create Centralized Utilities

- [ ] **Create `src/lib/icons.ts`**
  - Centralize all icon mapping functions
  - Create `getIconComponent()` utility
  - Create `getCategoryIcon()` utility
  - Create `getSkillIcon()` utility
  - Create `getProjectIcon()` utility

- [ ] **Create `src/lib/colors.ts`** (enhance existing)
  - Centralize color mapping functions
  - Create `getTypeColor()` utility
  - Create `getStatusColor()` utility
  - Create `getThemeAwareColor()` utility

- [ ] **Create `src/lib/badges.ts`**
  - Centralize badge creation logic
  - Create `createBadgeProps()` utility
  - Create `createTooltipProps()` utility

#### 1.2 Create Configuration System

- [ ] **Create `src/config/site.ts`**
  - Move all hardcoded personal information
  - Create site configuration interface
  - Support environment-based overrides

- [ ] **Create `src/config/seo.ts`**
  - Move SEO configuration
  - Make it data-driven from site config

- [ ] **Create `src/config/theme.ts`**
  - Centralize theme configuration
  - Make parallax speeds configurable

#### 1.3 Create Reusable Components Library

- [ ] **Create `src/components/ui/SkillCard.tsx`**
  - Reusable skill display component
  - Support different layouts (grid, list, compact)
  - Theme-aware styling

- [ ] **Create `src/components/ui/SkillBadge.tsx`**
  - Reusable skill badge component
  - Consistent styling across app

- [ ] **Create `src/components/ui/IconMapper.tsx`**
  - Centralized icon rendering component
  - Support for different icon types

### Phase 2: Component Breakdown (Week 2)

#### 2.1 Break Down AboutSection

- [ ] **Create `src/components/sections/SkillsSection.tsx`**
  - Extract skills grid logic
  - Use new SkillCard components
  - Make it reusable

- [ ] **Create `src/components/sections/EducationSection.tsx`**
  - Extract education display logic
  - Create EducationCard component

- [ ] **Create `src/components/sections/ResearchSection.tsx`**
  - Extract research projects logic
  - Create ResearchProjectCard component

- [ ] **Create `src/components/sections/LeadershipSection.tsx`**
  - Extract leadership display logic
  - Create LeadershipCard component

- [ ] **Refactor AboutSection.tsx**
  - Use new section components
  - Remove embedded utility functions
  - Reduce to ~100 lines

#### 2.2 Break Down ContactSection

- [ ] **Create `src/components/forms/ContactForm.tsx`**
  - Extract form logic
  - Create reusable form components
  - Add proper validation

- [ ] **Create `src/components/sections/ContactInfo.tsx`**
  - Extract contact information display
  - Make it configurable

- [ ] **Create `src/hooks/useFormValidation.ts`** (enhance existing)
  - Centralize form validation logic
  - Create reusable validation rules

- [ ] **Refactor ContactSection.tsx**
  - Use new form components
  - Remove hardcoded values
  - Reduce to ~100 lines

#### 2.3 Break Down TechnicalDetailsModal

- [ ] **Create `src/components/modals/TechnicalSectionRenderer.tsx`**
  - Extract section rendering logic
  - Create factory pattern for different section types

- [ ] **Create `src/components/modals/ScreenshotGallery.tsx`**
  - Extract screenshot gallery logic
  - Make it reusable

- [ ] **Refactor TechnicalDetailsModal.tsx**
  - Use new components
  - Simplify modal logic
  - Reduce to ~200 lines

### Phase 3: Specialized Card Components (Week 3)

#### 3.1 Create Specialized Card Components

- [ ] **Create `src/components/cards/ProjectCard.tsx`**
  - Specialized for project display
  - Extends UnifiedCard with project-specific features
  - Consistent project card styling

- [ ] **Create `src/components/cards/ExperienceCard.tsx`**
  - Specialized for work experience
  - Timeline support
  - Company information display

- [ ] **Create `src/components/cards/EducationCard.tsx`**
  - Specialized for education display
  - GPA display
  - Institution information

- [ ] **Create `src/components/cards/LeadershipCard.tsx`**
  - Specialized for leadership roles
  - Organization information
  - Role descriptions

#### 3.2 Create Form Components

- [ ] **Create `src/components/forms/FormField.tsx`**
  - Reusable form field component
  - Built-in validation display
  - Consistent styling

- [ ] **Create `src/components/forms/FormSection.tsx`**
  - Reusable form section wrapper
  - Consistent spacing and layout

- [ ] **Create `src/components/forms/SubmitButton.tsx`**
  - Reusable submit button
  - Loading states
  - Success/error states

### Phase 4: Data Configuration (Week 4)

#### 4.1 Make Data Configurable

- [ ] **Create `src/config/personal.ts`**
  - Move all personal information
  - Support for different users
  - Environment-based overrides

- [ ] **Create `src/config/experience.ts`**
  - Move work experience data
  - Make it configurable
  - Support multiple experiences

- [ ] **Create `src/config/projects.ts`**
  - Enhance existing projects configuration
  - Make it more flexible
  - Support different project types

#### 4.2 Create Data Validation

- [ ] **Enhance `src/lib/schemas.ts`**
  - Add validation for all configuration files
  - Create runtime validation
  - Add type safety

- [ ] **Create `src/lib/config-validator.ts`**
  - Validate configuration on startup
  - Provide helpful error messages
  - Support development vs production configs

### Phase 5: Polish & Optimization (Week 5)

#### 5.1 Code Cleanup

- [ ] **Remove redundant code**
  - Delete duplicate utility functions
  - Consolidate similar components
  - Remove unused imports

- [ ] **Optimize imports**
  - Use barrel exports
  - Remove unused dependencies
  - Optimize bundle size

#### 5.2 Documentation

- [ ] **Create component documentation**
  - Document all new components
  - Add usage examples
  - Create component storybook

- [ ] **Update README**
  - Document new architecture
  - Add configuration guide
  - Update development setup

#### 5.3 Testing

- [ ] **Add component tests**
  - Test new reusable components
  - Test utility functions
  - Add integration tests

## 📁 New File Structure

```
src/
├── components/
│   ├── ui/                    # Reusable UI components
│   │   ├── SkillCard.tsx
│   │   ├── SkillBadge.tsx
│   │   ├── IconMapper.tsx
│   │   └── index.ts
│   ├── cards/                 # Specialized card components
│   │   ├── ProjectCard.tsx
│   │   ├── ExperienceCard.tsx
│   │   ├── EducationCard.tsx
│   │   ├── LeadershipCard.tsx
│   │   └── index.ts
│   ├── forms/                 # Form components
│   │   ├── ContactForm.tsx
│   │   ├── FormField.tsx
│   │   ├── FormSection.tsx
│   │   ├── SubmitButton.tsx
│   │   └── index.ts
│   ├── sections/              # Page sections
│   │   ├── SkillsSection.tsx
│   │   ├── EducationSection.tsx
│   │   ├── ResearchSection.tsx
│   │   ├── LeadershipSection.tsx
│   │   ├── ContactInfo.tsx
│   │   └── index.ts
│   └── modals/                # Modal components
│       ├── TechnicalSectionRenderer.tsx
│       ├── ScreenshotGallery.tsx
│       └── index.ts
├── config/                    # Configuration files
│   ├── site.ts
│   ├── seo.ts
│   ├── theme.ts
│   ├── personal.ts
│   ├── experience.ts
│   └── index.ts
├── lib/                       # Enhanced utilities
│   ├── icons.ts
│   ├── colors.ts
│   ├── badges.ts
│   ├── config-validator.ts
│   └── schemas.ts             # Enhanced
└── hooks/                     # Enhanced hooks
    ├── useFormValidation.ts   # Enhanced
    └── useConfig.ts           # New
```

## 🎯 Success Metrics

### **Target Metrics (After Refactoring)**

#### **Component Size Reduction**

- **AboutSection.tsx**: 481 lines → <200 lines (58% reduction)
- **TechnicalDetailsModal.tsx**: 480 lines → <200 lines (58% reduction)
- **ContactSection.tsx**: 433 lines → <150 lines (65% reduction)
- **ScrollIndicator.tsx**: 699 lines → <300 lines (57% reduction)
- **Largest component**: <200 lines (currently 699 lines)

#### **Code Quality Improvements**

- **Console Statements**: 26 → 0 (remove all console.log statements)
- **Switch Statements**: 16 → <8 (consolidate duplicate switch logic)
- **Duplicate Functions**: 4+ icon mapping functions → 1 centralized function
- **Redundant Patterns**: Eliminate all identified duplicate patterns

#### **Bundle Size Optimization**

- **Current Bundle**: 196 kB First Load JS
- **Target Bundle**: <160 kB First Load JS (18% reduction)
- **Code Splitting**: Implement lazy loading for heavy components
- **Tree Shaking**: Optimize imports to reduce unused code
- **Bundle Analysis**: Use @next/bundle-analyzer for detailed insights

#### **Maintainability Improvements**

- **New Skill Addition**: <5 minutes (currently requires editing multiple files)
- **New Project Addition**: <10 minutes (currently requires editing multiple files)
- **Configuration Changes**: No code changes required (currently hardcoded)
- **Component Responsibilities**: Single responsibility per component

### **Measurable Goals**

#### **Code Quality**

- [ ] Reduce largest component from 699 lines to <200 lines
- [ ] Eliminate all duplicate utility functions (4+ → 1)
- [ ] Achieve 90%+ code reusability across similar components
- [ ] Zero console statements in production code
- [ ] Zero linter warnings/errors

#### **Maintainability**

- [ ] New developers can add a skill in <5 minutes
- [ ] New developers can add a project in <10 minutes
- [ ] Configuration changes don't require code changes
- [ ] All components have clear, single responsibilities
- [ ] Centralized utility functions for common operations

#### **Performance**

- [ ] Bundle size reduction of 18% (196 kB → <160 kB)
- [ ] Faster component rendering through better memoization
- [ ] Reduced re-renders through better prop design
- [ ] Lazy loading for heavy components (TechnicalDetailsModal, ContactForm)

#### **Developer Experience**

- [ ] Clear component API documentation
- [ ] Consistent patterns across all components
- [ ] Easy to extend and customize
- [ ] Type-safe configuration system
- [ ] Centralized icon and color management

## 🚦 Implementation Priority

### High Priority (Must Do)

1. Create centralized utilities (icons, colors, badges)
2. Break down AboutSection into smaller components
3. Make personal information configurable
4. Create reusable SkillCard components

### Medium Priority (Should Do)

1. Break down ContactSection and TechnicalDetailsModal
2. Create specialized card components
3. Enhance form validation system
4. Create configuration validation

### Low Priority (Nice to Have)

1. Add comprehensive testing
2. Create component documentation
3. Optimize bundle size
4. Add development tools

## 🔄 Migration Strategy

### Backward Compatibility

- Keep existing components working during refactoring
- Use feature flags for new components
- Gradual migration approach

### Testing Strategy

- Test each refactored component individually
- Integration tests for component interactions
- Visual regression testing for UI changes

### Rollout Plan

1. **Week 1-2**: Foundation utilities and AboutSection breakdown
2. **Week 3-4**: ContactSection and TechnicalDetailsModal breakdown
3. **Week 5**: Specialized cards and configuration system
4. **Week 6**: Polish, testing, and documentation

## 🛠️ Tools & Setup

### **Required NPM Packages**

#### **Bundle Analysis Tools**

```bash
# Install bundle analyzer
npm install --save-dev @next/bundle-analyzer

# Install webpack bundle analyzer (alternative)
npm install --save-dev webpack-bundle-analyzer

# Install bundle size monitoring
npm install --save-dev bundlesize
```

#### **Performance Analysis Tools**

```bash
# Install Lighthouse CLI for performance testing
npm install --save-dev lighthouse

# Install bundle size reporter
npm install --save-dev size-limit

# Install dependency analyzer
npm install --save-dev depcheck
```

#### **Code Quality Tools**

```bash
# Install duplicate code detector
npm install --save-dev jscpd

# Install complexity analyzer
npm install --save-dev complexity-report

# Install unused code detector
npm install --save-dev unimported
```

### **Package.json Scripts Setup**

Add these scripts to your `package.json`:

```json
{
  "scripts": {
    "analyze": "ANALYZE=true npm run build",
    "analyze:server": "BUNDLE_ANALYZE=server npm run build",
    "analyze:browser": "BUNDLE_ANALYZE=browser npm run build",
    "bundle:size": "bundlesize",
    "bundle:check": "size-limit",
    "lighthouse": "lighthouse http://localhost:3000 --output html --output-path ./lighthouse-report.html",
    "lighthouse:ci": "lighthouse http://localhost:3000 --output json --output-path ./lighthouse-report.json",
    "duplicates": "jscpd src --min-lines 5 --min-tokens 50",
    "complexity": "cr src --format json --output complexity-report.json",
    "unused": "unimported",
    "deps:check": "depcheck",
    "measure:before": "mkdir -p measurements && echo '=== PHASE BASELINE - $(date) ===' > measurements/baseline-$(date +%Y%m%d-%H%M).txt && find src/components -name '*.tsx' -exec wc -l {} + | sort -nr | head -10 >> measurements/baseline-$(date +%Y%m%d-%H%M).txt && find src -name '*.ts' -o -name '*.tsx' | xargs wc -l | tail -1 >> measurements/baseline-$(date +%Y%m%d-%H%M).txt && npm run analyze >> measurements/baseline-$(date +%Y%m%d-%H%M).txt 2>&1 && echo 'Baseline saved to measurements/baseline-$(date +%Y%m%d-%H%M).txt'",
    "measure:after": "mkdir -p measurements && echo '=== PHASE PROGRESS - $(date) ===' > measurements/progress-$(date +%Y%m%d-%H%M).txt && find src/components -name '*.tsx' -exec wc -l {} + | sort -nr | head -10 >> measurements/progress-$(date +%Y%m%d-%H%M).txt && find src -name '*.ts' -o -name '*.tsx' | xargs wc -l | tail -1 >> measurements/progress-$(date +%Y%m%d-%H%M).txt && npm run analyze >> measurements/progress-$(date +%Y%m%d-%H%M).txt 2>&1 && echo 'Progress saved to measurements/progress-$(date +%Y%m%d-%H%M).txt'",
    "measure:compare": "./scripts/compare-measurements.sh"
  }
}
```

### **Next.js Configuration for Bundle Analysis**

Update your `next.config.js`:

```javascript
const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
});

module.exports = withBundleAnalyzer({
  // Your existing Next.js config
  experimental: {
    optimizePackageImports: ['@tabler/icons-react', '@mantine/core'],
  },
  webpack: (config, { isServer }) => {
    if (!isServer) {
      config.resolve.fallback = {
        ...config.resolve.fallback,
        fs: false,
      };
    }
    return config;
  },
});
```

### **Bundle Size Configuration**

Create `.bundlesizerc.json`:

```json
{
  "files": [
    {
      "path": ".next/static/chunks/pages/_app-*.js",
      "maxSize": "100 kB"
    },
    {
      "path": ".next/static/chunks/pages/index-*.js",
      "maxSize": "50 kB"
    },
    {
      "path": ".next/static/chunks/pages/**/*.js",
      "maxSize": "30 kB"
    }
  ]
}
```

### **Size Limit Configuration**

Create `.size-limit.json`:

```json
[
  {
    "path": ".next/static/chunks/pages/_app-*.js",
    "limit": "100 KB"
  },
  {
    "path": ".next/static/chunks/pages/index-*.js",
    "limit": "50 KB"
  }
]
```

## 📏 Measurement Tracking

### **How to Measure Progress**

#### **Before Each Phase (Baseline Measurement)**

```bash
# Create baseline measurements
echo "=== PHASE BASELINE - $(date) ===" > measurements/baseline-$(date +%Y%m%d-%H%M).txt

echo "=== Component Sizes ===" >> measurements/baseline-$(date +%Y%m%d-%H%M).txt
find src/components -name "*.tsx" -exec wc -l {} + | sort -nr | head -10 >> measurements/baseline-$(date +%Y%m%d-%H%M).txt

echo "=== Total Lines of Code ===" >> measurements/baseline-$(date +%Y%m%d-%H%M).txt
find src -name "*.ts" -o -name "*.tsx" | xargs wc -l | tail -1 >> measurements/baseline-$(date +%Y%m%d-%H%M).txt

echo "=== Bundle Analysis ===" >> measurements/baseline-$(date +%Y%m%d-%H%M).txt
npm run analyze >> measurements/baseline-$(date +%Y%m%d-%H%M).txt 2>&1

echo "=== Performance Test ===" >> measurements/baseline-$(date +%Y%m%d-%H%M).txt
npm run lighthouse:ci >> measurements/baseline-$(date +%Y%m%d-%H%M).txt 2>&1

echo "=== Code Quality Metrics ===" >> measurements/baseline-$(date +%Y%m%d-%H%M).txt
echo "Console statements: $(find src -name "*.ts" -o -name "*.tsx" | xargs grep -c "console\." | awk -F: '{sum += $2} END {print sum}')" >> measurements/baseline-$(date +%Y%m%d-%H%M).txt
echo "Switch statements: $(find src -name "*.ts" -o -name "*.tsx" | xargs grep -c "switch" | awk -F: '{sum += $2} END {print sum}')" >> measurements/baseline-$(date +%Y%m%d-%H%M).txt
echo "Duplicate code: $(npm run duplicates 2>/dev/null | grep -o '[0-9]*%' | head -1)" >> measurements/baseline-$(date +%Y%m%d-%H%M).txt

echo "=== Unused Dependencies ===" >> measurements/baseline-$(date +%Y%m%d-%H%M).txt
npm run deps:check >> measurements/baseline-$(date +%Y%m%d-%H%M).txt 2>&1

echo "Baseline measurement saved to measurements/baseline-$(date +%Y%m%d-%H%M).txt"
```

#### **After Each Phase (Progress Measurement)**

```bash
# Create progress measurements
echo "=== PHASE PROGRESS - $(date) ===" > measurements/progress-$(date +%Y%m%d-%H%M).txt

echo "=== Component Sizes ===" >> measurements/progress-$(date +%Y%m%d-%H%M).txt
find src/components -name "*.tsx" -exec wc -l {} + | sort -nr | head -10 >> measurements/progress-$(date +%Y%m%d-%H%M).txt

echo "=== Total Lines of Code ===" >> measurements/progress-$(date +%Y%m%d-%H%M).txt
find src -name "*.ts" -o -name "*.tsx" | xargs wc -l | tail -1 >> measurements/progress-$(date +%Y%m%d-%H%M).txt

echo "=== Bundle Analysis ===" >> measurements/progress-$(date +%Y%m%d-%H%M).txt
npm run analyze >> measurements/progress-$(date +%Y%m%d-%H%M).txt 2>&1

echo "=== Performance Test ===" >> measurements/progress-$(date +%Y%m%d-%H%M).txt
npm run lighthouse:ci >> measurements/progress-$(date +%Y%m%d-%H%M).txt 2>&1

echo "=== Code Quality Metrics ===" >> measurements/progress-$(date +%Y%m%d-%H%M).txt
echo "Console statements: $(find src -name "*.ts" -o -name "*.tsx" | xargs grep -c "console\." | awk -F: '{sum += $2} END {print sum}')" >> measurements/progress-$(date +%Y%m%d-%H%M).txt
echo "Switch statements: $(find src -name "*.ts" -o -name "*.tsx" | xargs grep -c "switch" | awk -F: '{sum += $2} END {print sum}')" >> measurements/progress-$(date +%Y%m%d-%H%M).txt
echo "Duplicate code: $(npm run duplicates 2>/dev/null | grep -o '[0-9]*%' | head -1)" >> measurements/progress-$(date +%Y%m%d-%H%M).txt

echo "=== Unused Dependencies ===" >> measurements/progress-$(date +%Y%m%d-%H%M).txt
npm run deps:check >> measurements/progress-$(date +%Y%m%d-%H%M).txt 2>&1

echo "Progress measurement saved to measurements/progress-$(date +%Y%m%d-%H%M).txt"

# Compare with baseline
echo "=== COMPARISON WITH BASELINE ==="
echo "Comparing with latest baseline..."
LATEST_BASELINE=$(ls -t measurements/baseline-*.txt | head -1)
if [ -f "$LATEST_BASELINE" ]; then
    echo "Baseline: $LATEST_BASELINE"
    echo "Progress: measurements/progress-$(date +%Y%m%d-%H%M).txt"
    echo ""
    echo "=== COMPONENT SIZE CHANGES ==="
    echo "Before:"
    grep -A 10 "Component Sizes" "$LATEST_BASELINE" | head -11
    echo ""
    echo "After:"
    grep -A 10 "Component Sizes" "measurements/progress-$(date +%Y%m%d-%H%M).txt" | head -11
else
    echo "No baseline found. Run 'before' measurement first."
fi
```

#### **Quick Measurement Commands**

```bash
# Before starting a phase
npm run measure:before

# After completing a phase
npm run measure:after

# Compare before vs after
npm run measure:compare
```

#### **Progress Tracking Template**

```markdown
## Phase X Progress Report

### Before (Baseline)

- Largest component: X lines
- Total lines: X lines
- Console statements: X
- Switch statements: X
- Bundle size: X kB

### After (Progress)

- Largest component: X lines (X% reduction)
- Total lines: X lines (X% change)
- Console statements: X (X% change)
- Switch statements: X (X% change)
- Bundle size: X kB (X% change)

### Achievements

- [ ] Component X refactored
- [ ] Utility Y centralized
- [ ] Pattern Z eliminated
- [ ] X lines of code removed
- [ ] X console statements cleaned up
```

## 📝 Next Steps

1. **Review this plan** with the team
2. **Prioritize** based on current needs
3. **Start with Phase 1** - Foundation & Utilities
4. **Track progress** using the measurement commands above
5. **Iterate** based on learnings

---

_This refactoring plan will transform the codebase into a more maintainable, reusable, and configurable system while preserving all existing functionality._
