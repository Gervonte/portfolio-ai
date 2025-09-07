# About Section Metadata

This directory contains metadata files for the About section of the portfolio.

## Files

- `about-metadata.json` - Main metadata file containing all about section data
- `README-about.md` - This documentation file

## Structure

The `about-metadata.json` file contains the following sections:

### Personal Information

```json
{
  "personalInfo": {
    "name": "Your Name",
    "title": "Your Professional Title",
    "location": "Your Location",
    "email": "your.email@example.com",
    "linkedin": "https://linkedin.com/in/your-profile",
    "github": "https://github.com/your-username",
    "summary": "Brief professional summary"
  }
}
```

### Skills

```json
{
  "skills": [
    {
      "name": "Skill Name",
      "level": "beginner|intermediate|advanced|expert",
      "category": "frontend|backend|devops|tools|soft"
    }
  ]
}
```

**Skill Levels:**

- `beginner` - Gray badge
- `intermediate` - Green badge
- `advanced` - Blue badge
- `expert` - Sakura (pink) badge

**Skill Categories:**

- `frontend` - Frontend technologies (React, TypeScript, etc.)
- `backend` - Backend technologies (Node.js, Python, etc.)
- `devops` - DevOps tools (Docker, CI/CD, etc.)
- `tools` - Development tools and methodologies
- `soft` - Soft skills (Communication, Leadership, etc.)

### Experience

```json
{
  "experience": [
    {
      "title": "Job Title",
      "company": "Company Name",
      "period": "Start Date - End Date",
      "description": "Brief job description",
      "technologies": ["Tech1", "Tech2", "Tech3"],
      "achievements": ["Achievement 1", "Achievement 2"]
    }
  ]
}
```

### Education

```json
{
  "education": [
    {
      "degree": "Degree Name",
      "institution": "Institution Name",
      "year": "Graduation Year",
      "description": "Additional details (GPA, focus areas, etc.)"
    }
  ]
}
```

### Research Projects

```json
{
  "researchProjects": [
    {
      "title": "Project Title",
      "period": "Project Period",
      "description": "Project description",
      "technologies": ["Tech1", "Tech2"],
      "achievements": ["Achievement 1", "Achievement 2"]
    }
  ]
}
```

### Leadership

```json
{
  "leadership": [
    {
      "name": "Leadership Role Title",
      "organization": "Organization Name",
      "year": "Year or Period",
      "description": "Optional description of responsibilities"
    }
  ]
}
```

## Usage

The About section component automatically loads data from this metadata file. To update the About section:

1. Edit `about-metadata.json` with your information
2. The changes will be reflected immediately in the About section
3. No code changes are required

## Data Validation

The metadata is validated using Zod schemas defined in `src/lib/schemas.ts`. Ensure your data matches the expected structure to avoid runtime errors.

## Best Practices

1. **Keep descriptions concise** - Aim for 1-2 sentences for descriptions
2. **Use consistent formatting** - Follow the same format for dates, periods, etc.
3. **Update regularly** - Keep your information current and relevant
4. **Test changes** - Verify the About section displays correctly after updates
5. **Backup data** - Keep a backup of your metadata before making major changes

## Troubleshooting

If the About section doesn't display correctly:

1. Check JSON syntax in `about-metadata.json`
2. Verify all required fields are present
3. Ensure skill levels and categories use valid values
4. Check the browser console for error messages
5. Run `npm run type-check` to verify TypeScript types
