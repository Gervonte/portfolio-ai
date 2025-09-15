import { z } from 'zod';
import {
  projectSchema,
  experienceSchema,
  educationSchema,
  certificationSchema,
  contactFormSchema,
  personalInfoSchema,
  portfolioDataSchema,
  type Project,
  type Experience,
  type Education,
  type Certification,
  type ContactForm,
  type PersonalInfo,
  type PortfolioData,
} from './schemas';

// Validation result type
export interface ValidationResult<T> {
  success: boolean;
  data?: T;
  errors?: z.ZodError;
  errorMessage?: string;
}

// Generic validation function
export function validateData<T>(schema: z.ZodSchema<T>, data: unknown): ValidationResult<T> {
  try {
    const result = schema.safeParse(data);

    if (result.success) {
      return {
        success: true,
        data: result.data,
      };
    } else {
      return {
        success: false,
        errors: result.error,
        errorMessage: formatZodError(result.error),
      };
    }
  } catch (error) {
    return {
      success: false,
      errorMessage: error instanceof Error ? error.message : 'Unknown validation error',
    };
  }
}

// Format Zod errors into a readable string
export function formatZodError(error: z.ZodError): string {
  return error.issues
    .map((err: z.ZodIssue) => {
      const path = err.path.length > 0 ? `${err.path.join('.')}: ` : '';
      return `${path}${err.message}`;
    })
    .join('; ');
}

// Specific validation functions
export const validateProjectData = (data: unknown): ValidationResult<Project> =>
  validateData(projectSchema, data);

export const validateExperienceData = (data: unknown): ValidationResult<Experience> =>
  validateData(experienceSchema, data);

export const validateEducationData = (data: unknown): ValidationResult<Education> =>
  validateData(educationSchema, data);

export const validateCertificationData = (data: unknown): ValidationResult<Certification> =>
  validateData(certificationSchema, data);

export const validateContactFormData = (data: unknown): ValidationResult<ContactForm> =>
  validateData(contactFormSchema, data);

export const validatePersonalInfoData = (data: unknown): ValidationResult<PersonalInfo> =>
  validateData(personalInfoSchema, data);

export const validatePortfolioData = (data: unknown): ValidationResult<PortfolioData> =>
  validateData(portfolioDataSchema, data);

// Validation middleware for API routes
export function createValidationMiddleware<T>(schema: z.ZodSchema<T>) {
  return (req: Request) => {
    return new Promise<ValidationResult<T>>(resolve => {
      req
        .json()
        .then(data => {
          const result = validateData(schema, data);
          resolve(result);
        })
        .catch(() => {
          resolve({
            success: false,
            errorMessage: 'Invalid JSON in request body',
          });
        });
    });
  };
}

// Client-side validation hook
export function useValidation<T>(schema: z.ZodSchema<T>, data: unknown): ValidationResult<T> {
  return validateData(schema, data);
}

// Form validation utilities
export function validateFormField<T>(
  schema: z.ZodSchema<T>,
  value: unknown,
  fieldName: string
): { isValid: boolean; error?: string } {
  try {
    schema.parse(value);
    return { isValid: true };
  } catch (error) {
    if (error instanceof z.ZodError && error.issues) {
      const fieldError = error.issues.find(
        (err: z.ZodIssue) => err.path.includes(fieldName) || err.path.length === 0
      );
      return {
        isValid: false,
        error: fieldError?.message || 'Invalid value',
      };
    }
    return {
      isValid: false,
      error: 'Validation error',
    };
  }
}

// Batch validation for multiple items
export function validateBatch<T>(
  schema: z.ZodSchema<T>,
  items: unknown[]
): { valid: T[]; invalid: { item: unknown; error: string }[] } {
  const valid: T[] = [];
  const invalid: { item: unknown; error: string }[] = [];

  items.forEach(item => {
    const result = validateData(schema, item);
    if (result.success && result.data) {
      valid.push(result.data);
    } else {
      invalid.push({
        item,
        error: result.errorMessage || 'Validation failed',
      });
    }
  });

  return { valid, invalid };
}

// Data sanitization utilities
export function sanitizeString(input: string): string {
  return input.trim().replace(/[<>]/g, '');
}

export function sanitizeUrl(url: string): string {
  try {
    const urlObj = new URL(url);
    return urlObj.toString();
  } catch {
    return '';
  }
}

export function sanitizeEmail(email: string): string {
  return email.toLowerCase().trim();
}

// Data transformation utilities
export function transformProjectForDisplay(project: Project) {
  return {
    ...project,
    title: sanitizeString(project.title),
    description: sanitizeString(project.description),
    liveUrl: project.liveUrl ? sanitizeUrl(project.liveUrl) : undefined,
    githubUrl: project.githubUrl ? sanitizeUrl(project.githubUrl) : undefined,
  };
}

export function transformExperienceForDisplay(experience: Experience) {
  return {
    ...experience,
    company: sanitizeString(experience.company),
    position: sanitizeString(experience.position),
    description: sanitizeString(experience.description),
    companyUrl: experience.companyUrl ? sanitizeUrl(experience.companyUrl) : undefined,
  };
}

// Error handling utilities
export class ValidationError extends Error {
  constructor(
    message: string,
    public field?: string,
    public code?: string
  ) {
    super(message);
    this.name = 'ValidationError';
  }
}

export function handleValidationError(error: unknown): ValidationError {
  if (error instanceof z.ZodError) {
    return new ValidationError(formatZodError(error), 'validation', 'ZOD_VALIDATION_ERROR');
  }

  if (error instanceof Error) {
    return new ValidationError(error.message, 'unknown', 'UNKNOWN_ERROR');
  }

  return new ValidationError('An unknown error occurred', 'unknown', 'UNKNOWN_ERROR');
}
