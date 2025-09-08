'use client';

import { useState, useEffect } from 'react';
import {
  Container,
  Group,
  Stack,
  Burger,
  Paper,
  Transition,
  Text,
  Button,
  Box,
  Anchor,
} from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { IconCode, IconHeart } from '@tabler/icons-react';

const HEADER_HEIGHT = 60;

interface HeaderProps {
  links: Array<{ link: string; label: string }>;
}

export default function Header({ links }: HeaderProps) {
  const [opened, { toggle, close }] = useDisclosure(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const items = links.map(link => (
    <Anchor
      key={link.label}
      href={link.link}
      size="sm"
      style={{
        textDecoration: 'none',
        color: scrolled ? '#2C2C2C' : '#FEFEFE',
        fontWeight: 500,
        transition: 'color 0.3s ease',
        position: 'relative',
      }}
      onClick={e => {
        e.preventDefault();
        const element = document.querySelector(link.link);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
        close();
      }}
    >
      {link.label}
    </Anchor>
  ));

  return (
    <Box
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 1000,
        transition: 'all 0.3s ease',
        background: scrolled
          ? 'rgba(254, 254, 254, 0.95)'
          : 'rgba(254, 254, 254, 0.1)',
        backdropFilter: 'blur(10px)',
        borderBottom: scrolled ? '1px solid rgba(248, 187, 217, 0.2)' : 'none',
      }}
    >
      <Container size="lg" style={{ height: HEADER_HEIGHT }}>
        <Group justify="space-between" h="100%">
          {/* Logo */}
          <Group gap="xs">
            <IconCode
              size={28}
              style={{
                color: scrolled ? '#E91E63' : '#F8BBD9',
                transition: 'color 0.3s ease',
              }}
            />
            <Text
              size="lg"
              fw={700}
              style={{
                backgroundImage: scrolled
                  ? 'linear-gradient(135deg, #E91E63, #F8BBD9)'
                  : 'linear-gradient(135deg, #F8BBD9, #FCE4EC)',
                backgroundSize: '100% 100%',
                backgroundClip: 'text',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                transition: 'all 0.3s ease',
              }}
            >
              Portfolio
            </Text>
          </Group>

          {/* Desktop Navigation */}
          <Group gap="xl" visibleFrom="sm">
            {items}
            <Button
              size="sm"
              color="sakura"
              variant="outline"
              leftSection={<IconHeart size={16} />}
              onClick={() => {
                document
                  .getElementById('contact')
                  ?.scrollIntoView({ behavior: 'smooth' });
              }}
              style={{
                borderColor: scrolled ? '#E91E63' : '#F8BBD9',
                color: scrolled ? '#E91E63' : '#F8BBD9',
                background: 'transparent',
                transition: 'all 0.3s ease',
              }}
            >
              Let&apos;s Connect
            </Button>
          </Group>

          {/* Mobile Menu Button */}
          <Burger
            opened={opened}
            onClick={toggle}
            size="sm"
            color={scrolled ? '#2C2C2C' : '#FEFEFE'}
            hiddenFrom="sm"
          />
        </Group>
      </Container>

      {/* Mobile Navigation */}
      <Transition transition="pop-top-right" duration={200} mounted={opened}>
        {styles => (
          <Paper
            style={{
              ...styles,
              position: 'absolute',
              top: HEADER_HEIGHT,
              left: 0,
              right: 0,
              zIndex: 0,
              background: 'rgba(254, 254, 254, 0.98)',
              backdropFilter: 'blur(10px)',
              borderTop: '1px solid rgba(248, 187, 217, 0.2)',
            }}
            hiddenFrom="sm"
          >
            <Container py="md">
              <Stack gap="md">
                {items}
                <Button
                  fullWidth
                  color="sakura"
                  variant="outline"
                  leftSection={<IconHeart size={16} />}
                  onClick={() => {
                    document
                      .getElementById('contact')
                      ?.scrollIntoView({ behavior: 'smooth' });
                    toggle(); // Close mobile menu
                  }}
                  style={{
                    borderColor: '#E91E63',
                    color: '#E91E63',
                    background: 'transparent',
                  }}
                >
                  Let&apos;s Connect
                </Button>
              </Stack>
            </Container>
          </Paper>
        )}
      </Transition>
    </Box>
  );
}
