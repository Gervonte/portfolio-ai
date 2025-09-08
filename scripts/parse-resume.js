#!/usr/bin/env node

/**
 * Resume Parser Script
 * Parses plaintext resume and generates about-metadata.json
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Paths
const resumePath = path.join(__dirname, '../src/assets/resume.txt');
const outputPath = path.join(__dirname, '../src/data/about-metadata.json');

// Skill level mapping based on context and keywords
const skillLevelMap = {
  expert: ['expert', 'advanced', 'production', 'scalable', 'comprehensive'],
  advanced: [
    'familiar',
    'intermediate',
    'basic',
    'evaluation',
    'interpretability',
  ],
  intermediate: ['basic', 'familiar', 'learning'],
  beginner: ['learning', 'introduction', 'basics'],
};

// Skill category mapping
const skillCategoryMap = {
  frontend: ['react', 'typescript', 'javascript', 'html', 'css', 'ui', 'ux'],
  backend: [
    'python',
    'node.js',
    'express',
    'postgresql',
    'graphql',
    'api',
    'rest',
  ],
  devops: [
    'docker',
    'ci/cd',
    'github actions',
    'pipelines',
    'deployment',
    'git',
  ],
  tools: ['testing', 'documentation', 'agile', 'llm', 'prompt', 'lime'],
  soft: ['product', 'leadership', 'communication', 'budget', 'planning'],
};

function parseResume(resumeText) {
  const lines = resumeText
    .split('\n')
    .map(line => line.trim())
    .filter(line => line);

  // Extract personal info from first few lines
  const personalInfo = extractPersonalInfo(lines);

  // Extract skills
  const skills = extractSkills(lines);

  // Extract experience
  const experience = extractExperience(lines);

  // Extract education
  const education = extractEducation(lines);

  // Extract research projects
  const researchProjects = extractResearchProjects(lines);

  // Extract leadership
  const leadership = extractLeadership(lines);

  return {
    personalInfo,
    skills,
    experience,
    education,
    researchProjects,
    leadership,
  };
}

function extractPersonalInfo(lines) {
  const firstLine = lines[0];
  const secondLine = lines[1];
  const thirdLine = lines[2];
  const fourthLine = lines[3];

  // Extract name (usually in the 4th line)
  const name = fourthLine.split(' ').slice(0, 2).join(' '); // First two words

  // Extract location
  const location = firstLine;

  // Extract phone and email
  const phoneMatch = secondLine.match(/\([0-9]{3}\)[0-9]{3}-[0-9]{4}/);
  const emailMatch = secondLine.match(
    /[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/
  );
  const githubMatch = secondLine.match(/github\.com\/[a-zA-Z0-9-]+/);

  return {
    name: name || 'Gervonte Fowler',
    title: 'Full-Stack Software Engineer & AI Researcher',
    location: location || 'Lakeland, FL',
    email: emailMatch ? emailMatch[0] : 'gervontefowler.dev@outlook.com',
    linkedin: 'https://linkedin.com/in/gervonte-fowler', // Not in resume, using placeholder
    github: githubMatch
      ? `https://${githubMatch[0]}`
      : 'https://github.com/gervonte',
    summary:
      'Passionate full-stack software engineer with expertise in React, Node.js, and AI/ML research. Currently pursuing MS in Computer Science with focus on LLM evaluation and explainable AI systems. Proven track record of shipping production-ready features and leading technical initiatives at fintech startups.',
  };
}

function extractSkills(lines) {
  const skills = [];
  let inSkillsSection = false;
  let currentCategory = '';
  let skillLineBuffer = '';

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];

    if (line === 'SKILLS') {
      inSkillsSection = true;
      continue;
    }

    if (inSkillsSection && line === 'EXPERIENCE') {
      break;
    }

    if (inSkillsSection) {
      // Check if this is a category header
      if (
        line.includes('LANGUAGES & TOOLS') ||
        line.includes('DATA & INFRASTRUCTURE') ||
        line.includes('PRODUCT EXPERIENCE')
      ) {
        // Process any buffered skills first
        if (skillLineBuffer && currentCategory) {
          processSkillLine(skillLineBuffer, currentCategory, skills);
          skillLineBuffer = '';
        }
        currentCategory = line;
        continue;
      }

      // Accumulate skill lines (they might be split across multiple lines)
      if (
        line &&
        !line.includes('&') &&
        !line.includes('EXPERIENCE') &&
        currentCategory
      ) {
        if (skillLineBuffer) {
          skillLineBuffer += ' ' + line;
        } else {
          skillLineBuffer = line;
        }

        // Check if this line ends with a complete skill set (ends with a skill name)
        // If it ends with a skill name, process it
        if (line.match(/[A-Za-z]+\)?$/)) {
          processSkillLine(skillLineBuffer, currentCategory, skills);
          skillLineBuffer = '';
        }
      }
    }
  }

  // Process any remaining buffered skills
  if (skillLineBuffer && currentCategory) {
    processSkillLine(skillLineBuffer, currentCategory, skills);
  }

  return skills;
}

function processSkillLine(skillLine, currentCategory, skills) {
  const skillNames = parseSkillLine(skillLine);

  skillNames.forEach(skillName => {
    const category = determineSkillCategory(skillName, currentCategory);
    const level = determineSkillLevel(skillName);

    skills.push({
      name: skillName,
      level: level,
      category: category,
    });
  });
}

function parseSkillLine(line) {
  const skills = [];

  // Clean the line first - remove extra whitespace and newlines
  const cleanLine = line.replace(/\s+/g, ' ').trim();

  // Split by comma, but be careful about parentheses
  const parts = [];
  let currentPart = '';
  let parenCount = 0;

  for (let i = 0; i < cleanLine.length; i++) {
    const char = cleanLine[i];

    if (char === '(') {
      parenCount++;
    } else if (char === ')') {
      parenCount--;
    } else if (char === ',' && parenCount === 0) {
      parts.push(currentPart.trim());
      currentPart = '';
      continue;
    }

    currentPart += char;
  }

  // Add the last part
  if (currentPart.trim()) {
    parts.push(currentPart.trim());
  }

  // Process each part
  parts.forEach(part => {
    // Check if this part has parentheses
    const parenMatch = part.match(/^([^(]+)\s*\(([^)]+)\)/);
    if (parenMatch) {
      const baseSkill = parenMatch[1].trim();
      const subSkills = parenMatch[2]
        .split(',')
        .map(s => s.trim())
        .filter(s => s);

      // Add the base skill
      if (baseSkill) {
        skills.push(baseSkill);
      }

      // Only add parenthetical content as sub-skills if they look like actual skills
      // (not level indicators like "familiar", "basic", "expert", etc.)
      const levelIndicators = [
        'familiar',
        'basic',
        'intermediate',
        'advanced',
        'expert',
        'learning',
      ];
      const parentheticalContent = parenMatch[2].trim();
      const isLevelIndicator = levelIndicators.some(indicator =>
        parentheticalContent.toLowerCase().includes(indicator)
      );

      if (!isLevelIndicator) {
        // Split by comma and add as sub-skills
        subSkills.forEach(subSkill => {
          if (subSkill) {
            skills.push(subSkill);
          }
        });
      }
    } else {
      // Regular skill
      if (part) {
        skills.push(part);
      }
    }
  });

  return skills;
}

function determineSkillCategory(skillName, currentCategory) {
  const skillLower = skillName.toLowerCase();

  // Check category based on current section
  if (currentCategory.includes('LANGUAGES & TOOLS')) {
    if (
      skillCategoryMap.frontend.some(keyword => skillLower.includes(keyword))
    ) {
      return 'frontend';
    } else if (
      skillCategoryMap.backend.some(keyword => skillLower.includes(keyword))
    ) {
      return 'backend';
    } else if (
      skillCategoryMap.tools.some(keyword => skillLower.includes(keyword))
    ) {
      return 'tools';
    }
  } else if (currentCategory.includes('DATA & INFRASTRUCTURE')) {
    if (skillCategoryMap.devops.some(keyword => skillLower.includes(keyword))) {
      return 'devops';
    } else if (
      skillCategoryMap.tools.some(keyword => skillLower.includes(keyword))
    ) {
      return 'tools';
    }
  } else if (currentCategory.includes('PRODUCT EXPERIENCE')) {
    return 'soft';
  }

  // Fallback to keyword matching
  for (const [category, keywords] of Object.entries(skillCategoryMap)) {
    if (keywords.some(keyword => skillLower.includes(keyword))) {
      return category;
    }
  }

  return 'tools'; // Default fallback
}

function determineSkillLevel(skillName) {
  const skillLower = skillName.toLowerCase();

  // Check for explicit level indicators
  if (skillLower.includes('basic') || skillLower.includes('familiar')) {
    return 'intermediate';
  }

  // Core technologies that are likely expert level
  if (
    [
      'python',
      'javascript',
      'typescript',
      'react',
      'node.js',
      'express',
      'html',
      'css',
      'git',
      'postgresql',
      'rest apis',
    ].includes(skillLower)
  ) {
    return 'expert';
  }

  // Technologies that are likely advanced
  if (
    [
      'api development',
      'unit testing',
      'integration testing',
      'ci/cd pipelines',
      'agile development',
      'product thinking',
    ].includes(skillLower)
  ) {
    return 'expert';
  }

  // Technologies that are likely intermediate
  if (
    [
      'docker',
      'graphql',
      'llm evaluation',
      'prompt engineering',
      'model interpretability',
    ].includes(skillLower)
  ) {
    return 'advanced';
  }

  // Soft skills
  if (
    [
      'developer experience',
      'ui/ux iteration',
      'team leadership',
      'communication',
      'budget management',
    ].includes(skillLower)
  ) {
    return 'advanced';
  }

  return 'advanced'; // Default
}

function extractExperience(lines) {
  const experience = [];
  let inExperienceSection = false;
  let currentExperience = null;

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];

    if (line === 'EXPERIENCE') {
      inExperienceSection = true;
      continue;
    }

    if (inExperienceSection && line === 'PROJECTS & RESEARCH') {
      break;
    }

    if (inExperienceSection) {
      // Check if this is a job header (contains company and title)
      if (line.includes('—') && line.includes(',')) {
        if (currentExperience) {
          experience.push(currentExperience);
        }

        const parts = line.split('—');
        const companyPart = parts[0].trim();
        const titlePart = parts[1].trim();

        // Extract company and location
        const companyMatch = companyPart.match(/^([^,]+),/);
        const company = companyMatch ? companyMatch[1] : companyPart;

        currentExperience = {
          title: titlePart,
          company: company,
          period: '',
          description: '',
          technologies: [],
          achievements: [],
        };
      }
      // Check if this is a date line
      else if (
        currentExperience &&
        line.match(/^[A-Za-z]+ \d{4} - [A-Za-z]+ \d{4}$/)
      ) {
        currentExperience.period = line;
      }
      // Check if this is an achievement (starts with *)
      else if (currentExperience && line.startsWith('*')) {
        currentExperience.achievements.push(line.substring(1).trim());
      }
    }
  }

  if (currentExperience) {
    experience.push(currentExperience);
  }

  return experience;
}

function extractEducation(lines) {
  const education = [];
  let inEducationSection = false;

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];

    if (line === 'EDUCATION') {
      inEducationSection = true;
      continue;
    }

    if (inEducationSection && line === 'LEADERSHIP & INITIATIVES') {
      break;
    }

    if (inEducationSection && line.includes('—')) {
      const parts = line.split('—');
      const institutionPart = parts[0].trim();
      const degreePart = parts[1].trim();

      // Extract institution and location
      const institutionMatch = institutionPart.match(/^([^,]+),/);
      const institution = institutionMatch
        ? institutionMatch[1]
        : institutionPart;

      // Extract degree and year
      const degreeMatch = degreePart.match(/^([^|]+)\|/);
      const degree = degreeMatch ? degreeMatch[1].trim() : degreePart;

      // Look for GPA in next line
      let gpa = '';
      if (i + 1 < lines.length) {
        const nextLine = lines[i + 1];
        const gpaMatch = nextLine.match(/GPA\s+([0-9.]+)/);
        if (gpaMatch) {
          gpa = `GPA: ${gpaMatch[1]}`;
        }
      }

      education.push({
        degree: degree,
        institution: institution,
        year: extractYearFromDegree(degree),
        description: gpa,
      });
    }
  }

  return education;
}

function extractYearFromDegree(degree) {
  // Extract year from degree text
  const yearMatch = degree.match(/(\d{4})/);
  return yearMatch ? yearMatch[1] : '2025';
}

function extractResearchProjects(lines) {
  const projects = [];
  let inProjectsSection = false;
  let currentProject = null;

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];

    if (line === 'PROJECTS & RESEARCH') {
      inProjectsSection = true;
      continue;
    }

    if (inProjectsSection && line === 'EDUCATION') {
      break;
    }

    if (inProjectsSection) {
      // Check if this is a project title (contains — and Graduate Research Project)
      if (line.includes('—') && line.includes('Graduate Research Project')) {
        if (currentProject) {
          projects.push(currentProject);
        }

        const parts = line.split('—');
        const title = parts[0].trim();

        currentProject = {
          title: title,
          period: '',
          description: '',
          technologies: [],
          achievements: [],
        };
      }
      // Check if this is a date line
      else if (currentProject && line.match(/^[A-Za-z]+ \d{4}$/)) {
        currentProject.period = line;
      }
      // Check if this is an achievement (starts with *)
      else if (currentProject && line.startsWith('*')) {
        currentProject.achievements.push(line.substring(1).trim());
      }
    }
  }

  if (currentProject) {
    projects.push(currentProject);
  }

  return projects;
}

function extractLeadership(lines) {
  const leadership = [];
  let inLeadershipSection = false;
  let currentRole = null;

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];

    if (line === 'LEADERSHIP & INITIATIVES') {
      inLeadershipSection = true;
      continue;
    }

    if (inLeadershipSection) {
      // Check if this is a title line (not starting with *)
      if (line && !line.startsWith('*') && !line.includes('Chapter')) {
        if (currentRole) {
          leadership.push(currentRole);
        }

        currentRole = {
          name: line,
          organization: '',
          year: '',
          description: '',
        };
      }
      // Check if this is an organization line
      else if (currentRole && line.includes('Chapter')) {
        currentRole.organization = line;
        currentRole.year = '2020 - Present';
      }
      // Check if this is a description (starts with *)
      else if (currentRole && line.startsWith('*')) {
        currentRole.description = line.substring(1).trim();
      }
    }
  }

  if (currentRole) {
    leadership.push(currentRole);
  }

  return leadership;
}

// Main execution
function main() {
  try {
    console.log('🔄 Parsing resume...');

    // Read resume file
    const resumeText = fs.readFileSync(resumePath, 'utf8');

    // Parse resume
    const parsedData = parseResume(resumeText);

    // Write to output file
    fs.writeFileSync(outputPath, JSON.stringify(parsedData, null, 2));

    console.log('✅ Resume parsed successfully!');
    console.log(`📄 Generated: ${outputPath}`);
    console.log(`📊 Found:`);
    console.log(`   - ${parsedData.skills.length} skills`);
    console.log(`   - ${parsedData.experience.length} experience entries`);
    console.log(`   - ${parsedData.education.length} education entries`);
    console.log(`   - ${parsedData.researchProjects.length} research projects`);
    console.log(`   - ${parsedData.leadership.length} leadership roles`);
  } catch (error) {
    console.error('❌ Error parsing resume:', error.message);
    process.exit(1);
  }
}

// Run if called directly
if (import.meta.url === `file://${process.argv[1]}`) {
  main();
}

export { parseResume };
