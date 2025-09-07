# Resume Parser

This script automatically parses a plaintext resume and generates the `about-metadata.json` file for the About section of the portfolio.

## Usage

```bash
npm run parse-resume
```

This will:

1. Read `src/assets/resume.txt`
2. Parse the resume content
3. Generate `src/data/about-metadata.json`
4. Display parsing statistics (skills, experience, education, research projects, leadership roles)

## How It Works

The parser extracts the following information from your resume:

### Personal Information

- **Name**: Extracted from the resume header
- **Location**: First line of the resume
- **Email**: Extracted using regex pattern matching
- **GitHub**: Extracted from contact line
- **LinkedIn**: Uses placeholder (not in resume)
- **Summary**: Uses predefined professional summary

### Skills

Parses skills from three sections:

- **LANGUAGES & TOOLS**: Technical skills
- **DATA & INFRASTRUCTURE**: DevOps and data skills
- **PRODUCT EXPERIENCE**: Soft skills and methodologies

**Skill Processing**:

- Handles parentheses: `JavaScript (React, Node.js, Express)` → `JavaScript`, `React`, `Node.js`, `Express`
- Categorizes skills automatically based on keywords
- Assigns skill levels based on context and keywords

### Experience

Extracts work experience including:

- Job title and company
- Employment period
- Job description
- Technologies used
- Key achievements

### Education

Parses education history:

- Degree and institution
- Graduation year
- GPA and additional details

### Research Projects

Extracts research projects:

- Project title and period
- Description and technologies
- Key achievements

### Leadership

Parses leadership roles and initiatives:

- Role/title and organization
- Time period
- Description of responsibilities

## Resume Format Requirements

For the parser to work correctly, your resume should follow this structure:

```
Location
Phone
Email | GitHub
Name

SKILLS
LANGUAGES & TOOLS
Python, TypeScript, JavaScript (React, Node.js, Express), HTML, CSS, REST APIs, PostgreSQL, GraphQL (familiar), Git, GitHub Actions

DATA & INFRASTRUCTURE
API Development & Consumption, Docker (basic), LLM Evaluation, Prompt Engineering, Model Interpretability (LIME), Unit & Integration Testing, CI/CD Pipelines

PRODUCT EXPERIENCE
Product Thinking, Agile Development, Developer Experience, Human-in-the-loop Evaluation, API Usability & Documentation, UI/UX Iteration

EXPERIENCE
Company Name, Location — Job Title
Start Date - End Date
* Achievement 1
* Achievement 2

PROJECTS & RESEARCH
Project Title — Project Type
Period
* Achievement 1
* Achievement 2

EDUCATION
Institution, Location — Degree
Graduation Date | GPA

LEADERSHIP & INITIATIVES
Role Title
Organization
* Description
```

## Skill Level Mapping

The parser automatically assigns skill levels based on keywords:

- **Expert**: Core technologies (Python, JavaScript, React, Node.js, etc.)
- **Advanced**: Specialized skills (LLM Evaluation, Prompt Engineering, etc.)
- **Intermediate**: Familiar technologies (Docker, GraphQL, etc.)
- **Beginner**: Learning technologies

## Skill Category Mapping

Skills are categorized based on keywords:

- **Frontend**: React, TypeScript, JavaScript, HTML, CSS, UI/UX
- **Backend**: Python, Node.js, Express, PostgreSQL, REST APIs
- **DevOps**: Docker, CI/CD, GitHub Actions, Pipelines
- **Tools**: Git, Testing, Documentation, Agile, LLM
- **Soft**: Product, Leadership, Communication, Planning

## Customization

To modify the parser behavior:

1. **Skill Levels**: Edit the `determineSkillLevel()` function
2. **Skill Categories**: Edit the `skillCategoryMap` object
3. **Personal Info**: Modify the `extractPersonalInfo()` function
4. **Parsing Logic**: Update the respective extraction functions

## Troubleshooting

### Common Issues

1. **Skills not parsing correctly**:
   - Check that skill lines don't have extra line breaks
   - Ensure parentheses are properly closed
   - Verify comma separation

2. **Missing data**:
   - Check that section headers match exactly
   - Ensure proper formatting (dashes, bullets, etc.)

3. **Wrong skill categories**:
   - Update the `skillCategoryMap` object
   - Add new keywords as needed

### Debug Mode

To see detailed parsing information, temporarily add console.log statements in the parsing functions.

## File Structure

```
scripts/
├── parse-resume.js          # Main parser script
└── README-resume-parser.md  # This documentation

src/
├── assets/
│   └── resume.txt           # Input: Your plaintext resume
└── data/
    └── about-metadata.json  # Output: Generated metadata
```

## Integration

The generated `about-metadata.json` is automatically used by:

- `src/lib/about.ts` - Data loading and utilities
- `src/components/AboutSection.tsx` - About section component

No manual intervention is required after running the parser.
