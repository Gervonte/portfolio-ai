import aboutMetadata from '@/data/about-metadata.json';

// Type definitions
export interface Skill {
  name: string;
  level: 'beginner' | 'intermediate' | 'advanced' | 'expert';
  category: 'frontend' | 'backend' | 'devops' | 'tools' | 'soft';
}

export interface Experience {
  title: string;
  company: string;
  period: string;
  description: string;
  longDescription?: string;
  technologies: string[];
  achievements: string[];
}

export interface Education {
  degree: string;
  institution: string;
  year: string;
  description?: string;
}

export interface Leadership {
  name: string;
  organization: string;
  year: string;
  description?: string;
}

export interface ResearchProject {
  title: string;
  period: string;
  description: string;
  technologies: string[];
  achievements: string[];
}

export interface PersonalInfo {
  name: string;
  title: string;
  location: string;
  email: string;
  linkedin: string;
  github: string;
  summary: string;
}

export interface AboutData {
  personalInfo: PersonalInfo;
  skills: Skill[];
  experience: Experience[];
  education: Education[];
  researchProjects: ResearchProject[];
  leadership: Leadership[];
}

// Export the data
export const aboutData = aboutMetadata as AboutData;

// Utility functions
export const getSkillsByCategory = (): Record<string, Skill[]> => {
  return aboutData.skills.reduce(
    (acc, skill) => {
      if (!acc[skill.category]) {
        acc[skill.category] = [];
      }
      acc[skill.category].push(skill);
      return acc;
    },
    {} as Record<string, Skill[]>
  );
};

export const getSkillsByLevel = (level: Skill['level']): Skill[] => {
  return aboutData.skills.filter(skill => skill.level === level);
};

export const getSkillsByCategoryAndLevel = (
  category: Skill['category'],
  level: Skill['level']
): Skill[] => {
  return aboutData.skills.filter(skill => skill.category === category && skill.level === level);
};

export const getRecentExperience = (limit: number = 3): Experience[] => {
  return aboutData.experience.slice(0, limit);
};

export const getRecentEducation = (limit: number = 2): Education[] => {
  return aboutData.education.slice(0, limit);
};

export const getRecentResearchProjects = (limit: number = 2): ResearchProject[] => {
  return aboutData.researchProjects.slice(0, limit);
};

export const getRecentLeadership = (limit: number = 3): Leadership[] => {
  return aboutData.leadership.slice(0, limit);
};

// Skill level color mapping (theme-aware)
// Note: This function returns color names that work with both sakura and ocean themes
export const getSkillColor = (level: Skill['level']): string => {
  switch (level) {
    case 'expert':
      return 'sakura'; // Primary theme color (sakura in sakura theme, ocean in ocean theme)
    case 'advanced':
      return 'pink'; // Effect color (pink in sakura theme, mist in ocean theme)
    case 'intermediate':
      return 'earth'; // Earth color (consistent across themes)
    case 'beginner':
      return 'gray'; // Neutral color
    default:
      return 'gray';
  }
};

// Category icon mapping (you'll need to import the icons in your component)
export const getCategoryIcon = (category: Skill['category']): string => {
  switch (category) {
    case 'frontend':
      return 'IconCode';
    case 'backend':
      return 'IconDatabase';
    case 'devops':
      return 'IconCloud';
    case 'tools':
      return 'IconTools';
    case 'soft':
      return 'IconUsers';
    default:
      return 'IconCode';
  }
};
