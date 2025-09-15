'use client';

import { useState, useEffect } from 'react';
import { Group, Stack, Anchor } from '@mantine/core';

export interface NavLink {
  label: string;
  href: string;
  active?: boolean;
}

interface NavigationProps {
  links: NavLink[];
  onLinkClick?: (href: string) => void;
  variant?: 'header' | 'footer' | 'mobile';
  scrolled?: boolean;
}

export default function Navigation({
  links,
  onLinkClick,
  variant = 'header',
  scrolled = false,
}: NavigationProps) {
  const [activeLink, setActiveLink] = useState('');

  useEffect(() => {
    const handleScroll = () => {
      const sections = links.map(link => link.href.substring(1));
      const scrollPosition = window.scrollY + 100;

      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const { offsetTop, offsetHeight } = element;
          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            setActiveLink(`#${section}`);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Check initial position

    return () => window.removeEventListener('scroll', handleScroll);
  }, [links]);

  const handleClick = (href: string, e: React.MouseEvent) => {
    e.preventDefault();
    setActiveLink(href);

    if (onLinkClick) {
      onLinkClick(href);
    } else {
      const element = document.querySelector(href);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  const getLinkStyles = (link: NavLink) => {
    const isActive = activeLink === link.href || link.active;

    const baseStyles = {
      textDecoration: 'none',
      fontWeight: 500,
      transition: 'all 0.3s ease',
      position: 'relative' as const,
      padding: variant === 'mobile' ? '0.5rem 0' : '0.25rem 0',
    };

    switch (variant) {
      case 'header':
        return {
          ...baseStyles,
          color: scrolled ? '#2C2C2C' : '#FEFEFE',
          fontSize: '0.875rem',
          '&:hover': {
            color: '#E91E63',
          },
          ...(isActive && {
            color: '#E91E63',
            '&::after': {
              content: '""',
              position: 'absolute',
              bottom: '-4px',
              left: 0,
              right: 0,
              height: '2px',
              background: 'linear-gradient(135deg, #E91E63, #F8BBD9)',
              borderRadius: '1px',
            },
          }),
        };

      case 'footer':
        return {
          ...baseStyles,
          color: '#666666',
          fontSize: '0.875rem',
          '&:hover': {
            color: '#E91E63',
          },
        };

      case 'mobile':
        return {
          ...baseStyles,
          color: '#2C2C2C',
          fontSize: '1rem',
          '&:hover': {
            color: '#E91E63',
            paddingLeft: '0.5rem',
          },
          ...(isActive && {
            color: '#E91E63',
            paddingLeft: '0.5rem',
            borderLeft: '3px solid #E91E63',
          }),
        };

      default:
        return baseStyles;
    }
  };

  return variant === 'mobile' ? (
    <Stack gap={0} align="stretch">
      {links.map(link => (
        <Anchor
          key={link.href}
          href={link.href}
          onClick={e => handleClick(link.href, e)}
          style={getLinkStyles(link)}
        >
          {link.label}
        </Anchor>
      ))}
    </Stack>
  ) : (
    <Group gap="xl" align="center">
      {links.map(link => (
        <Anchor
          key={link.href}
          href={link.href}
          onClick={e => handleClick(link.href, e)}
          style={getLinkStyles(link)}
        >
          {link.label}
        </Anchor>
      ))}
    </Group>
  );
}
