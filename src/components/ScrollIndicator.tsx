'use client';

import { colorCombinations } from '@/lib/colors';
import { ActionIcon, Box, Group, Progress, Stack, Text, Transition } from '@mantine/core';
import { IconChevronDown, IconChevronUp } from '@tabler/icons-react';
import { useCallback, useEffect, useState } from 'react';

interface ScrollIndicatorProps {
  sections?: string[];
  showProgress?: boolean;
  showNavigation?: boolean;
  position?: 'left' | 'right' | 'bottom';
  variant?: 'minimal' | 'detailed';
  orientation?: 'vertical' | 'horizontal';
  className?: string;
}

export default function ScrollIndicator({
  sections = ['hero', 'about', 'work', 'experience', 'contact'],
  showProgress = true,
  showNavigation = true,
  position = 'right',
  variant = 'detailed',
  orientation = 'vertical',
  className = '',
}: ScrollIndicatorProps) {
  const [scrollProgress, setScrollProgress] = useState(0);
  const [currentSection, setCurrentSection] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const [isScrolling, setIsScrolling] = useState(false);
  const [showIndicator, setShowIndicator] = useState(false);
  const [pressedButton, setPressedButton] = useState<'up' | 'down' | null>(null);

  const scrollToSection = useCallback(
    (sectionIndex: number) => {
      const sectionId = sections[sectionIndex];
      const element = document.getElementById(sectionId);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    },
    [sections]
  );

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = (scrollTop / docHeight) * 100;

      setScrollProgress(Math.min(100, Math.max(0, progress)));
      setIsVisible(scrollTop > 100);

      // Determine current section
      const sectionElements = sections
        .map(section => document.getElementById(section))
        .filter(Boolean);

      let activeSection = 0;
      for (let i = 0; i < sectionElements.length; i++) {
        const element = sectionElements[i];
        if (element) {
          const rect = element.getBoundingClientRect();
          if (rect.top <= window.innerHeight / 2 && rect.bottom >= window.innerHeight / 2) {
            activeSection = i;
            break;
          }
        }
      }
      setCurrentSection(activeSection);
    };

    const handleScrollStart = () => {
      setIsScrolling(true);
      setShowIndicator(true);
    };

    const handleScrollEnd = () => {
      setTimeout(() => setIsScrolling(false), 150);
    };

    let scrollTimeout: NodeJS.Timeout;
    let hideTimeout: NodeJS.Timeout;

    const throttledScroll = () => {
      clearTimeout(scrollTimeout);
      clearTimeout(hideTimeout);

      scrollTimeout = setTimeout(() => {
        handleScroll();
        handleScrollEnd();

        // Hide indicator after 2 seconds of no scrolling
        hideTimeout = setTimeout(() => {
          setShowIndicator(false);
        }, 2000);
      }, 10);
    };

    // Keyboard navigation handler
    const handleKeyDown = (event: KeyboardEvent) => {
      // Only handle arrow keys when not in input fields
      if (
        event.target instanceof HTMLInputElement ||
        event.target instanceof HTMLTextAreaElement ||
        event.target instanceof HTMLSelectElement
      ) {
        return;
      }

      if (event.key === 'ArrowUp' || event.key === 'ArrowDown') {
        event.preventDefault();

        let newSection = currentSection;

        if (event.key === 'ArrowUp') {
          newSection = Math.max(0, currentSection - 1);
        } else if (event.key === 'ArrowDown') {
          newSection = Math.min(sections.length - 1, currentSection + 1);
        }

        if (newSection !== currentSection) {
          // Show visual feedback for keyboard navigation
          handleButtonPress(event.key === 'ArrowUp' ? 'up' : 'down');

          scrollToSection(newSection);
          setShowIndicator(true);

          // Reset hide timeout when using keyboard navigation
          clearTimeout(hideTimeout);
          hideTimeout = setTimeout(() => {
            setShowIndicator(false);
          }, 2000);
        }
      }
    };

    window.addEventListener('scroll', handleScrollStart);
    window.addEventListener('scroll', throttledScroll);
    window.addEventListener('keydown', handleKeyDown);
    handleScroll(); // Initial call

    return () => {
      window.removeEventListener('scroll', handleScrollStart);
      window.removeEventListener('scroll', throttledScroll);
      window.removeEventListener('keydown', handleKeyDown);
      clearTimeout(scrollTimeout);
      clearTimeout(hideTimeout);
    };
  }, [sections, currentSection, scrollToSection]);

  const handleButtonPress = (direction: 'up' | 'down') => {
    setPressedButton(direction);

    // Reset pressed state after animation
    setTimeout(() => {
      setPressedButton(null);
    }, 200);
  };

  const scrollToTop = () => {
    handleButtonPress('up');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const scrollToBottom = () => {
    handleButtonPress('down');
    window.scrollTo({
      top: document.documentElement.scrollHeight,
      behavior: 'smooth',
    });
  };

  const getSectionName = (index: number) => {
    const sectionNames: { [key: string]: string } = {
      hero: 'Home',
      about: 'About',
      work: 'Work',
      experience: 'Experience',
      contact: 'Contact',
    };
    return sectionNames[sections[index]] || sections[index];
  };

  // Horizontal layout for bottom position
  if (orientation === 'horizontal' || position === 'bottom') {
    return (
      <Box visibleFrom="sm">
        <Transition
          mounted={isVisible && showIndicator}
          transition="slide-up"
          duration={300}
          timingFunction="ease"
        >
          {styles => (
            <Box
              style={{
                ...styles,
                position: 'fixed',
                bottom: '20px',
                left: '50%',
                transform: 'translateX(-50%)',
                zIndex: 1000,
              }}
              className={className}
            >
              <Box
                style={{
                  background: 'rgba(0, 0, 0, 0.8)',
                  backdropFilter: 'blur(20px)',
                  border: '1px solid rgba(233, 30, 99, 0.3)',
                  borderRadius: '20px',
                  padding: '16px 24px',
                  minWidth: '400px',
                  boxShadow: '0 12px 40px rgba(0, 0, 0, 0.3), 0 0 20px rgba(233, 30, 99, 0.2)',
                }}
              >
                <Group justify="center" gap="md">
                  {/* Progress Bar */}
                  {showProgress && (
                    <Box style={{ flex: 1, maxWidth: '200px' }}>
                      <Progress
                        value={scrollProgress}
                        size="md"
                        radius="xl"
                        style={{
                          background: 'rgba(255, 255, 255, 0.2)',
                        }}
                      />
                      <Text size="sm" c="white" ta="center" mt="xs" fw={600}>
                        {Math.round(scrollProgress)}%
                      </Text>
                    </Box>
                  )}

                  {/* Section Navigation */}
                  {showNavigation && (
                    <Group gap="xs">
                      {sections.map((section, index) => (
                        <Box
                          key={section}
                          style={{
                            padding: '8px 16px',
                            borderRadius: '12px',
                            cursor: 'pointer',
                            transition: 'all 0.3s ease',
                            background:
                              currentSection === index
                                ? colorCombinations.sakuraGradient
                                : 'rgba(255, 255, 255, 0.1)',
                            border:
                              currentSection === index
                                ? '1px solid rgba(233, 30, 99, 0.5)'
                                : '1px solid rgba(255, 255, 255, 0.2)',
                            boxShadow:
                              currentSection === index
                                ? '0 4px 15px rgba(233, 30, 99, 0.3)'
                                : 'none',
                          }}
                          onClick={() => scrollToSection(index)}
                          onMouseEnter={e => {
                            if (currentSection !== index) {
                              e.currentTarget.style.background = 'rgba(255, 255, 255, 0.1)';
                            }
                          }}
                          onMouseLeave={e => {
                            if (currentSection !== index) {
                              e.currentTarget.style.background = 'transparent';
                            }
                          }}
                        >
                          <Text
                            size="sm"
                            c={currentSection === index ? 'white' : 'rgba(255, 255, 255, 0.8)'}
                            fw={currentSection === index ? 700 : 500}
                          >
                            {getSectionName(index)}
                          </Text>
                        </Box>
                      ))}
                    </Group>
                  )}

                  {/* Quick Navigation */}
                  <Group gap="xs">
                    <ActionIcon
                      variant="subtle"
                      color="white"
                      size="md"
                      onClick={scrollToTop}
                      style={{
                        background:
                          pressedButton === 'up'
                            ? colorCombinations.sakuraGradient
                            : 'rgba(255, 255, 255, 0.2)',
                        border:
                          pressedButton === 'up'
                            ? '1px solid rgba(233, 30, 99, 0.5)'
                            : '1px solid rgba(255, 255, 255, 0.3)',
                        boxShadow:
                          pressedButton === 'up'
                            ? '0 4px 15px rgba(233, 30, 99, 0.4), 0 0 10px rgba(233, 30, 99, 0.3)'
                            : '0 2px 8px rgba(0, 0, 0, 0.2)',
                        transform: pressedButton === 'up' ? 'scale(0.95)' : 'scale(1)',
                        transition: 'all 0.2s ease',
                      }}
                    >
                      <IconChevronUp size={16} />
                    </ActionIcon>
                    <ActionIcon
                      variant="subtle"
                      color="white"
                      size="md"
                      onClick={scrollToBottom}
                      style={{
                        background:
                          pressedButton === 'down'
                            ? colorCombinations.sakuraGradient
                            : 'rgba(255, 255, 255, 0.2)',
                        border:
                          pressedButton === 'down'
                            ? '1px solid rgba(233, 30, 99, 0.5)'
                            : '1px solid rgba(255, 255, 255, 0.3)',
                        boxShadow:
                          pressedButton === 'down'
                            ? '0 4px 15px rgba(233, 30, 99, 0.4), 0 0 10px rgba(233, 30, 99, 0.3)'
                            : '0 2px 8px rgba(0, 0, 0, 0.2)',
                        transform: pressedButton === 'down' ? 'scale(0.95)' : 'scale(1)',
                        transition: 'all 0.2s ease',
                      }}
                    >
                      <IconChevronDown size={16} />
                    </ActionIcon>
                  </Group>
                </Group>

                {/* Scroll Status Indicator */}
                <Box
                  style={{
                    position: 'absolute',
                    top: '-6px',
                    right: '-6px',
                    width: '12px',
                    height: '12px',
                    borderRadius: '50%',
                    background: isScrolling
                      ? colorCombinations.sakuraGradient
                      : 'rgba(255, 255, 255, 0.3)',
                    transition: 'all 0.3s ease',
                    boxShadow: isScrolling ? '0 0 8px rgba(233, 30, 99, 0.5)' : 'none',
                  }}
                />
              </Box>
            </Box>
          )}
        </Transition>
      </Box>
    );
  }

  if (variant === 'minimal') {
    return (
      <Box visibleFrom="sm">
        <Transition
          mounted={isVisible && showIndicator}
          transition="fade"
          duration={300}
          timingFunction="ease"
        >
          {styles => (
            <Box
              style={{
                ...styles,
                position: 'fixed',
                [position]: '20px',
                top: '50%',
                transform: 'translateY(-50%)',
                zIndex: 1000,
              }}
              className={className}
            >
              <Progress
                value={scrollProgress}
                size="xs"
                radius="xl"
                style={{
                  width: '4px',
                  height: '200px',
                  background: 'rgba(255, 255, 255, 0.1)',
                  backdropFilter: 'blur(10px)',
                  border: '1px solid rgba(255, 255, 255, 0.2)',
                }}
              />
            </Box>
          )}
        </Transition>
      </Box>
    );
  }

  return (
    <Box visibleFrom="sm">
      <Transition
        mounted={isVisible && showIndicator}
        transition="slide-left"
        duration={300}
        timingFunction="ease"
      >
        {styles => (
          <Box
            style={{
              ...styles,
              position: 'fixed',
              [position]: '20px',
              top: '50%',
              transform: 'translateY(-50%)',
              zIndex: 1000,
            }}
            className={className}
          >
            <Box
              style={{
                background: 'rgba(255, 255, 255, 0.1)',
                backdropFilter: 'blur(20px)',
                border: '1px solid rgba(255, 255, 255, 0.2)',
                borderRadius: '16px',
                padding: '16px',
                minWidth: '200px',
                boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1)',
              }}
            >
              {/* Progress Section */}
              {showProgress && (
                <Box mb="md">
                  <Group justify="space-between" mb="xs">
                    <Text size="sm" fw={500} c="white">
                      Progress
                    </Text>
                    <Text size="sm" c="dimmed">
                      {Math.round(scrollProgress)}%
                    </Text>
                  </Group>
                  <Progress
                    value={scrollProgress}
                    size="sm"
                    radius="xl"
                    style={{
                      background: 'rgba(255, 255, 255, 0.1)',
                    }}
                  />
                </Box>
              )}

              {/* Section Navigation */}
              {showNavigation && (
                <Box>
                  <Text size="sm" fw={500} c="white" mb="xs">
                    Sections
                  </Text>
                  <Stack gap="xs">
                    {sections.map((section, index) => (
                      <Box
                        key={section}
                        style={{
                          padding: '8px 12px',
                          borderRadius: '8px',
                          cursor: 'pointer',
                          transition: 'all 0.2s ease',
                          background:
                            currentSection === index ? 'rgba(233, 30, 99, 0.2)' : 'transparent',
                          border:
                            currentSection === index
                              ? '1px solid rgba(233, 30, 99, 0.3)'
                              : '1px solid transparent',
                        }}
                        onClick={() => scrollToSection(index)}
                        onMouseEnter={e => {
                          if (currentSection !== index) {
                            e.currentTarget.style.background = 'rgba(255, 255, 255, 0.1)';
                          }
                        }}
                        onMouseLeave={e => {
                          if (currentSection !== index) {
                            e.currentTarget.style.background = 'transparent';
                          }
                        }}
                      >
                        <Text
                          size="sm"
                          c={currentSection === index ? 'white' : 'dimmed'}
                          fw={currentSection === index ? 600 : 400}
                        >
                          {getSectionName(index)}
                        </Text>
                      </Box>
                    ))}
                  </Stack>
                </Box>
              )}

              {/* Quick Navigation Buttons */}
              <Group justify="center" mt="md" gap="xs">
                <ActionIcon
                  variant="subtle"
                  color="white"
                  size="sm"
                  onClick={scrollToTop}
                  style={{
                    background: 'rgba(255, 255, 255, 0.1)',
                    border: '1px solid rgba(255, 255, 255, 0.2)',
                  }}
                >
                  <IconChevronUp size={16} />
                </ActionIcon>
                <ActionIcon
                  variant="subtle"
                  color="white"
                  size="sm"
                  onClick={scrollToBottom}
                  style={{
                    background: 'rgba(255, 255, 255, 0.1)',
                    border: '1px solid rgba(255, 255, 255, 0.2)',
                  }}
                >
                  <IconChevronDown size={16} />
                </ActionIcon>
              </Group>

              {/* Scroll Status Indicator */}
              <Box
                style={{
                  position: 'absolute',
                  top: '-8px',
                  right: '-8px',
                  width: '16px',
                  height: '16px',
                  borderRadius: '50%',
                  background: isScrolling
                    ? colorCombinations.sakuraGradient
                    : 'rgba(255, 255, 255, 0.3)',
                  transition: 'all 0.3s ease',
                  boxShadow: isScrolling ? '0 0 10px rgba(233, 30, 99, 0.5)' : 'none',
                }}
              />
            </Box>
          </Box>
        )}
      </Transition>
    </Box>
  );
}
