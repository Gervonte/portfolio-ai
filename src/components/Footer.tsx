'use client';

import {
  Container,
  Group,
  Text,
  Anchor,
  Stack,
  Box,
  Divider,
} from '@mantine/core';
import {
  IconBrandGithub,
  IconBrandLinkedin,
  IconMail,
  IconCode,
  IconHeart,
} from '@tabler/icons-react';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <Box
      component="footer"
      style={{
        background: 'linear-gradient(135deg, #FFEBEE, #FFCDD2)',
        padding: '3rem 0 2rem',
        marginTop: '4rem',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Sakura petal decoration */}
      <Box
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          height: '100%',
          background:
            "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'%3E%3Cpath d='M50 0L60 40L100 50L60 60L50 100L40 60L0 50L40 40Z' fill='%23F8BBD9' opacity='0.1'/%3E%3C/svg%3E\")",
          backgroundSize: '50px 50px',
          pointerEvents: 'none',
        }}
      />

      <Container size="lg" style={{ position: 'relative', zIndex: 1 }}>
        <Stack gap="xl">
          {/* Main Footer Content */}
          <Group justify="space-between" align="flex-start" wrap="wrap">
            {/* Brand Section */}
            <Stack gap="md" style={{ flex: 1, minWidth: '250px' }}>
              <Group gap="xs">
                <IconCode size={24} style={{ color: '#F44336' }} />
                <Text
                  size="lg"
                  fw={700}
                  style={{
                    background: 'linear-gradient(135deg, #F44336, #FFCDD2)',
                    backgroundClip: 'text',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                  }}
                >
                  Portfolio
                </Text>
              </Group>
              <Text size="sm" c="dimmed" style={{ maxWidth: '300px' }}>
                Professional portfolio showcasing AI-assisted and traditional
                development work with a touch of mono no aware.
              </Text>
              <Group gap="xs">
                <IconHeart size={16} style={{ color: '#F44336' }} />
                <Text size="xs" c="dimmed">
                  Built with Next.js, Mantine, and sakura.js
                </Text>
              </Group>
            </Stack>

            {/* Quick Links */}
            <Stack gap="md" style={{ minWidth: '150px' }}>
              <Text fw={600} size="sm" c="#2C2C2C">
                Quick Links
              </Text>
              <Stack gap="xs">
                {[
                  { label: 'Work', href: '#work' },
                  { label: 'Experience', href: '#experience' },
                  { label: 'About', href: '#about' },
                  { label: 'Contact', href: '#contact' },
                ].map(link => (
                  <Anchor
                    key={link.label}
                    href={link.href}
                    size="sm"
                    c="#666666"
                    style={{
                      textDecoration: 'none',
                      transition: 'color 0.3s ease',
                    }}
                    onMouseEnter={e => {
                      e.currentTarget.style.color = '#F44336';
                    }}
                    onMouseLeave={e => {
                      e.currentTarget.style.color = '#666666';
                    }}
                  >
                    {link.label}
                  </Anchor>
                ))}
              </Stack>
            </Stack>

            {/* Social Links */}
            <Stack gap="md" style={{ minWidth: '150px' }}>
              <Text fw={600} size="sm" c="#2C2C2C">
                Connect
              </Text>
              <Group gap="md">
                <Anchor
                  href="https://github.com/gervonte"
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ color: '#666666', transition: 'color 0.3s ease' }}
                  onMouseEnter={e => {
                    e.currentTarget.style.color = '#F44336';
                  }}
                  onMouseLeave={e => {
                    e.currentTarget.style.color = '#666666';
                  }}
                >
                  <IconBrandGithub size={20} />
                </Anchor>
                <Anchor
                  href="https://www.linkedin.com/in/gervonte-fowler-5a7781158"
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ color: '#666666', transition: 'color 0.3s ease' }}
                  onMouseEnter={e => {
                    e.currentTarget.style.color = '#F44336';
                  }}
                  onMouseLeave={e => {
                    e.currentTarget.style.color = '#666666';
                  }}
                >
                  <IconBrandLinkedin size={20} />
                </Anchor>
                <Anchor
                  href="mailto:gervontefowler.dev@outlook.com"
                  style={{ color: '#666666', transition: 'color 0.3s ease' }}
                  onMouseEnter={e => {
                    e.currentTarget.style.color = '#F44336';
                  }}
                  onMouseLeave={e => {
                    e.currentTarget.style.color = '#666666';
                  }}
                >
                  <IconMail size={20} />
                </Anchor>
              </Group>
            </Stack>
          </Group>

          <Divider color="rgba(248, 187, 217, 0.3)" />

          {/* Copyright */}
          <Group justify="space-between" align="center" wrap="wrap">
            <Text size="xs" c="dimmed">
              © {currentYear} Portfolio. All rights reserved.
            </Text>
            <Text size="xs" c="dimmed">
              Made with{' '}
              <IconHeart
                size={12}
                style={{ color: '#F44336', verticalAlign: 'middle' }}
              />{' '}
              and sakura petals
            </Text>
          </Group>
        </Stack>
      </Container>
    </Box>
  );
}
