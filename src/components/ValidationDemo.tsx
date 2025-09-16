'use client';

import { sampleExperience, sampleProjects } from '@/data/sample-data';
import { useContactFormValidation } from '@/hooks/useFormValidation';
import { validateExperienceData, validateProjectData } from '@/lib/validation';
import {
  Alert,
  Button,
  Code,
  Container,
  Divider,
  Group,
  Paper,
  Stack,
  Text,
  TextInput,
  Textarea,
  Title,
} from '@mantine/core';
import { IconCheck, IconInfoCircle, IconX } from '@tabler/icons-react';
import { useState } from 'react';

interface ValidationResult {
  success: boolean;
  data?: {
    title?: string;
    company?: string;
    [key: string]: unknown;
  };
  errorMessage?: string;
}

export default function ValidationDemo() {
  const [validationResults, setValidationResults] = useState<{
    project: ValidationResult | null;
    experience: ValidationResult | null;
  }>({
    project: null,
    experience: null,
  });

  const contactForm = useContactFormValidation();

  const handleValidateSampleData = () => {
    // Validate sample project
    const projectResult = validateProjectData(sampleProjects[0]);

    // Validate sample experience
    const experienceResult = validateExperienceData(sampleExperience[0]);

    setValidationResults({
      project: projectResult,
      experience: experienceResult,
    });
  };

  const handleContactFormSubmit = () => {
    const result = contactForm.validateForm();
    if (result.success) {
      alert('Form is valid! Data: ' + JSON.stringify(result.data, null, 2));
    } else {
      alert('Form has errors: ' + result.errorMessage);
    }
  };

  return (
    <Container size="lg" py="xl">
      <Stack gap="xl">
        <Title order={2} ta="center">
          Data Validation Schemas Demo
        </Title>

        <Text ta="center" c="dimmed">
          This demo showcases the comprehensive data validation schemas built with Zod.
        </Text>

        {/* Sample Data Validation */}
        <Paper p="md" withBorder>
          <Title order={3} mb="md">
            Sample Data Validation
          </Title>
          <Text mb="md">
            Click the button below to validate sample project and experience data.
          </Text>
          <Button onClick={handleValidateSampleData} mb="md">
            Validate Sample Data
          </Button>

          {validationResults.project && (
            <Stack gap="sm">
              <Alert
                icon={
                  validationResults.project.success ? <IconCheck size={16} /> : <IconX size={16} />
                }
                color={validationResults.project.success ? 'sakura' : 'red'}
                title="Project Validation"
              >
                {validationResults.project.success ? (
                  <Text size="sm">
                    ✅ Project data is valid! Title: {validationResults.project.data?.title}
                  </Text>
                ) : (
                  <Text size="sm">
                    ❌ Project validation failed: {validationResults.project.errorMessage}
                  </Text>
                )}
              </Alert>

              <Alert
                icon={
                  validationResults.experience?.success ? (
                    <IconCheck size={16} />
                  ) : (
                    <IconX size={16} />
                  )
                }
                color={validationResults.experience?.success ? 'sakura' : 'red'}
                title="Experience Validation"
              >
                {validationResults.experience?.success ? (
                  <Text size="sm">
                    ✅ Experience data is valid! Company:{' '}
                    {validationResults.experience.data?.company}
                  </Text>
                ) : (
                  <Text size="sm">
                    ❌ Experience validation failed: {validationResults.experience?.errorMessage}
                  </Text>
                )}
              </Alert>
            </Stack>
          )}
        </Paper>

        <Divider />

        {/* Contact Form Demo */}
        <Paper p="md" withBorder>
          <Title order={3} mb="md">
            Contact Form Validation Demo
          </Title>
          <Text mb="md">Try filling out the form below to see real-time validation in action.</Text>

          <Stack gap="md">
            <TextInput
              label="Name"
              placeholder="Your name"
              {...contactForm.getFieldProps('name')}
              required
            />

            <TextInput
              label="Email"
              placeholder="your@email.com"
              type="email"
              {...contactForm.getFieldProps('email')}
              required
            />

            <TextInput
              label="Subject"
              placeholder="What's this about?"
              {...contactForm.getFieldProps('subject')}
              required
            />

            <Textarea
              label="Message"
              placeholder="Your message here..."
              minRows={4}
              {...contactForm.getTextareaProps('message')}
              required
            />

            <TextInput
              label="Company (Optional)"
              placeholder="Your company"
              {...contactForm.getFieldProps('company')}
            />

            <TextInput
              label="Phone (Optional)"
              placeholder="Your phone number"
              {...contactForm.getFieldProps('phone')}
            />

            <Group justify="space-between" mt="md">
              <Button
                variant="outline"
                onClick={contactForm.resetForm}
                disabled={!contactForm.isFormTouched}
              >
                Reset Form
              </Button>

              <Button onClick={handleContactFormSubmit} disabled={!contactForm.isFormValid}>
                Submit Form
              </Button>
            </Group>

            <Alert icon={<IconInfoCircle size={16} />} color="sakura" title="Form Status">
              <Text size="sm">
                Form is {contactForm.isFormValid ? 'valid' : 'invalid'} •
                {contactForm.isFormTouched ? ' Touched' : ' Untouched'}
              </Text>
            </Alert>
          </Stack>
        </Paper>

        <Divider />

        {/* Schema Information */}
        <Paper p="md" withBorder>
          <Title order={3} mb="md">
            Available Validation Schemas
          </Title>
          <Stack gap="sm">
            <Text size="sm">The validation system includes comprehensive schemas for:</Text>
            <Code block>
              {`• Project Schema - Validates project data with technologies, URLs, dates
• Experience Schema - Validates work experience with dates and responsibilities  
• Education Schema - Validates educational background and achievements
• Certification Schema - Validates professional certifications
• Contact Form Schema - Validates contact form submissions
• Personal Info Schema - Validates personal information and social links
• Portfolio Data Schema - Master schema combining all data types`}
            </Code>
            <Text size="sm" c="dimmed">
              All schemas include proper TypeScript types, error handling, and validation utilities.
            </Text>
          </Stack>
        </Paper>
      </Stack>
    </Container>
  );
}
