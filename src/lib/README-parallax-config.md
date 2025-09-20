# Parallax Configuration

This file contains all parallax speed settings for easy adjustment across the application.

## Quick Reference

### Section Speeds

- **Work**: `0.5` (moves at half scroll speed)
- **Experience**: `-0.3` (moves at 30% scroll speed in opposite direction)
- **About**: `-0.5` (moves at half scroll speed in opposite direction)
- **Contact**: `0.3` (moves at 30% scroll speed)

### Hero Element Speeds

- **Title**: `-0.2` (subtle upward movement)
- **Subtitle**: `-0.3` (gentle upward movement)
- **Buttons**: `-0.3` (gentle upward movement)

## How to Adjust Speeds

### 1. Edit the Configuration

Open `src/lib/parallax-config.ts` and modify the values:

```typescript
export const parallaxConfig = {
  sections: {
    work: 0.5, // Change this value
    experience: -0.3, // Change this value
    about: -0.5, // Change this value
    contact: 0.3, // Change this value
  },
  hero: {
    title: -0.2, // Change this value
    subtitle: -0.3, // Change this value
    buttons: -0.3, // Change this value
  },
};
```

### 2. Speed Guidelines

- **0**: No movement (fixed)
- **0.1-0.3**: Subtle movement
- **0.4-0.7**: Gentle movement
- **0.8-1.2**: Moderate movement
- **1.3+**: Strong movement
- **Negative values**: Move in opposite direction

### 3. Safety Limits

Speeds are automatically clamped between -2.0 and 2.0 to prevent extreme effects.

## Presets Available

```typescript
presets: {
  subtle: 0.2,
  gentle: 0.5,
  moderate: 0.8,
  strong: 1.2,
  extreme: 1.8,
}
```

## Helper Functions

- `getSectionSpeed('work')` - Get section speed
- `getHeroSpeed('title')` - Get hero element speed
- `validateParallaxSpeed(speed)` - Validate and clamp speed

## Examples

### Make all sections more subtle:

```typescript
sections: {
  work: 0.2,
  experience: -0.1,
  about: -0.2,
  contact: 0.1,
}
```

### Make hero elements more dramatic:

```typescript
hero: {
  title: -0.5,
  subtitle: -0.7,
  buttons: -0.6,
}
```

### Disable parallax for a section:

```typescript
sections: {
  work: 0,  // No movement
  // ... other sections
}
```
