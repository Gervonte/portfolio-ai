'use client';

import { useModal } from '@/lib/modal-context';
import { useColorCombinations, useCommonColors } from '@/lib/theme-aware-colors';
import { ActionIcon, Box, Group, Progress, Stack, Text, Transition } from '@mantine/core';
import { IconChevronDown, IconChevronUp } from '@tabler/icons-react';
import { useCallback, useEffect, useState } from 'react';

// Helper function to avoid hook rules issues
const withOpacity = (color: string, opacity: number): string => {
  const hexToRgb = (hex: string) => {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result
      ? `${parseInt(result[1], 16)}, ${parseInt(result[2], 16)}, ${parseInt(result[3], 16)}`
      : '0, 0, 0';
  };
  const rgb = hexToRgb(color);
  return `rgba(${rgb}, ${opacity})`;
};

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
  const colorCombinations = useColorCombinations();
  const commonColors = useCommonColors();
  const [scrollProgress, setScrollProgress] = useState(0);
  const [currentSection, setCurrentSection] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const [showIndicator, setShowIndicator] = useState(false);
  const [pressedButton, setPressedButton] = useState<'up' | 'down' | null>(null);
  const [lastInteraction, setLastInteraction] = useState<number>(0);
  const [hoveredSection, setHoveredSection] = useState<number | null>(null);
  const [isNavigating, setIsNavigating] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const { isModalOpen } = useModal();
  const [hoverTimeout, setHoverTimeout] = useState<NodeJS.Timeout | null>(null);
  const [hideTimeout, setHideTimeout] = useState<NodeJS.Timeout | null>(null);

  const scrollToSection = useCallback(
    (sectionIndex: number) => {
      const sectionId = sections[sectionIndex];
      const element = document.getElementById(sectionId);
      if (element) {
        // Set navigation state and update current section immediately
        setIsNavigating(true);
        setCurrentSection(sectionIndex);
        setLastInteraction(Date.now()); // Track interaction

        element.scrollIntoView({ behavior: 'smooth' });

        // Reset navigation state after smooth scroll completes
        setTimeout(() => {
          setIsNavigating(false);
        }, 800); // Allow time for smooth scroll to complete
      }
    },
    [sections]
  );

  // Calculate delay based on recent interactions
  const getHideDelay = useCallback(() => {
    const now = Date.now();
    const timeSinceInteraction = now - lastInteraction;

    // If user interacted recently (within last 1 second), reset to 1.5 seconds
    if (timeSinceInteraction < 1000) {
      return 1500; // Reset to 1.5 seconds after recent interaction
    }

    // Default delay for no recent interaction
    return 1000; // 1 second for better responsiveness
  }, [lastInteraction]);

  // Separate function to handle hiding the indicator
  const scheduleHide = useCallback(() => {
    // Clear any existing hide timeout
    if (hideTimeout) {
      clearTimeout(hideTimeout);
      setHideTimeout(null);
    }

    // Schedule hide after delay
    const hideDelay = getHideDelay();
    const timeout = setTimeout(() => {
      setShowIndicator(false);
      setHideTimeout(null);
    }, hideDelay);
    setHideTimeout(timeout);
  }, [hideTimeout, getHideDelay]);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = (scrollTop / docHeight) * 100;

      setScrollProgress(Math.min(100, Math.max(0, progress)));
      setIsVisible(scrollTop > 100);

      // Determine current section (skip if we're programmatically navigating)
      if (!isNavigating) {
        const sectionElements = sections
          .map(section => document.getElementById(section))
          .filter(Boolean);

        let activeSection = -1; // Use -1 to indicate no section found
        const viewportCenter = window.innerHeight / 2;

        // First, try to find a section that contains the viewport center
        for (let i = 0; i < sectionElements.length; i++) {
          const element = sectionElements[i];
          if (element) {
            const rect = element.getBoundingClientRect();
            if (rect.top <= viewportCenter && rect.bottom >= viewportCenter) {
              activeSection = i;
              break;
            }
          }
        }

        // If no section contains the center, find the closest one
        if (activeSection === -1) {
          let closestSection = 0;
          let closestDistance = Infinity;

          for (let i = 0; i < sectionElements.length; i++) {
            const element = sectionElements[i];
            if (element) {
              const rect = element.getBoundingClientRect();
              const sectionCenter = rect.top + (rect.bottom - rect.top) / 2;
              const distance = Math.abs(sectionCenter - viewportCenter);

              if (distance < closestDistance) {
                closestDistance = distance;
                closestSection = i;
              }
            }
          }
          activeSection = closestSection;
        }

        setCurrentSection(activeSection);
      }
    };

    const handleScrollStart = () => {
      setShowIndicator(true);
      setLastInteraction(Date.now()); // Track scroll interaction
      if (hideTimeout) {
        clearTimeout(hideTimeout); // Clear any pending hide timeout when scrolling starts
        setHideTimeout(null);
      }
    };

    const handleScrollEnd = () => {
      // Scroll ended - schedule hide
      scheduleHide();
    };

    let scrollTimeout: NodeJS.Timeout;

    const throttledScroll = () => {
      clearTimeout(scrollTimeout);

      scrollTimeout = setTimeout(() => {
        handleScroll();
        // Don't call handleScrollEnd here - it gets called on every scroll event
      }, 10);
    };

    // Separate scroll end detection
    const handleScrollEndDetection = () => {
      clearTimeout(scrollTimeout);

      scrollTimeout = setTimeout(() => {
        // This only runs when scrolling has actually stopped
        handleScrollEnd();
      }, 150); // Wait 150ms after last scroll event
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

          // Navigate directly to the calculated section
          scrollToSection(newSection);

          setShowIndicator(true);
          setLastInteraction(Date.now()); // Track keyboard interaction

          // Schedule hide after keyboard navigation
          scheduleHide();
        }
      }
    };

    window.addEventListener('scroll', handleScrollStart);
    window.addEventListener('scroll', throttledScroll);
    window.addEventListener('scroll', handleScrollEndDetection);
    window.addEventListener('keydown', handleKeyDown);
    handleScroll(); // Initial call

    return () => {
      window.removeEventListener('scroll', handleScrollStart);
      window.removeEventListener('scroll', throttledScroll);
      window.removeEventListener('scroll', handleScrollEndDetection);
      window.removeEventListener('keydown', handleKeyDown);
      clearTimeout(scrollTimeout);
      if (hideTimeout) {
        clearTimeout(hideTimeout);
      }
      if (hoverTimeout) {
        clearTimeout(hoverTimeout);
      }
    };
  }, [
    sections,
    currentSection,
    scrollToSection,
    isNavigating,
    isHovered,
    getHideDelay,
    hoverTimeout,
  ]);

  const handleButtonPress = (direction: 'up' | 'down') => {
    setPressedButton(direction);

    // Reset pressed state after animation
    setTimeout(() => {
      setPressedButton(null);
    }, 200);
  };

  const scrollToPreviousSection = () => {
    handleButtonPress('up');
    setLastInteraction(Date.now()); // Track button interaction
    const previousSection = Math.max(0, currentSection - 1);
    scrollToSection(previousSection);
  };

  const scrollToNextSection = () => {
    handleButtonPress('down');
    setLastInteraction(Date.now()); // Track button interaction
    const nextSection = Math.min(sections.length - 1, currentSection + 1);
    scrollToSection(nextSection);
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
          mounted={isVisible && showIndicator && !isModalOpen}
          transition="slide-up"
          duration={500}
          timingFunction="ease-out"
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
                transition: 'all 0.3s ease-out', // Smooth container transition
              }}
              className={className}
            >
              <Box
                style={{
                  background: `${commonColors.backgroundCard}CC`, // Card background with opacity
                  backdropFilter: 'blur(20px)',
                  border: `1px solid ${commonColors.borderPrimary}`,
                  borderRadius: '12px', // Design spec: 12px border radius
                  padding: '16px 24px',
                  minWidth: '400px',
                  boxShadow: isHovered
                    ? `0 4px 16px rgba(0, 0, 0, 0.12), 0 0 24px ${commonColors.shadowPrimaryLight}`
                    : `0 2px 8px rgba(0, 0, 0, 0.08), 0 0 20px ${commonColors.shadowPrimary}`,
                  transform: isHovered ? 'scale(1.02)' : 'scale(1)',
                  transition: 'all 0.3s ease-out',
                }}
                onMouseEnter={() => {
                  setIsHovered(true);
                  setShowIndicator(true); // Keep indicator visible while hovering
                  // Clear any existing timeouts when hovering
                  if (hideTimeout) {
                    clearTimeout(hideTimeout);
                    setHideTimeout(null);
                  }
                  if (hoverTimeout) {
                    clearTimeout(hoverTimeout);
                    setHoverTimeout(null);
                  }
                }}
                onMouseLeave={() => {
                  setIsHovered(false);
                  // Schedule hide when mouse leaves
                  scheduleHide();
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
                        color={commonColors.accentPrimary}
                        style={{
                          background: withOpacity(commonColors.backgroundSecondary, 0.2),
                        }}
                      />
                      <Text size="sm" c={commonColors.textPrimary} ta="center" mt="xs" fw={600}>
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
                            transition: 'all 0.2s ease-in-out',
                            background:
                              currentSection === index
                                ? colorCombinations.primaryGradient
                                : hoveredSection === index
                                  ? withOpacity(commonColors.backgroundSecondary, 0.2)
                                  : withOpacity(commonColors.backgroundSecondary, 0.1),
                            border:
                              currentSection === index
                                ? `1px solid ${commonColors.borderFocus}`
                                : hoveredSection === index
                                  ? `1px solid ${commonColors.borderSecondary}`
                                  : `1px solid ${commonColors.borderPrimary}`,
                            boxShadow:
                              currentSection === index
                                ? `0 4px 15px ${commonColors.shadowPrimary}`
                                : hoveredSection === index
                                  ? `0 2px 8px ${commonColors.shadowPrimaryLight}`
                                  : 'none',
                            transform: hoveredSection === index ? 'scale(1.02)' : 'scale(1)',
                          }}
                          onClick={() => scrollToSection(index)}
                          onMouseEnter={() => setHoveredSection(index)}
                          onMouseLeave={() => setHoveredSection(null)}
                        >
                          <Text
                            size="sm"
                            c={
                              currentSection === index
                                ? commonColors.textInverse
                                : hoveredSection === index
                                  ? commonColors.textPrimary
                                  : commonColors.textSecondary
                            }
                            fw={
                              currentSection === index ? 700 : hoveredSection === index ? 600 : 500
                            }
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
                      size="md"
                      onClick={scrollToPreviousSection}
                      aria-label={`Go to previous section: ${getSectionName(Math.max(0, currentSection - 1))}`}
                      style={{
                        background:
                          pressedButton === 'up'
                            ? colorCombinations.primaryGradient
                            : withOpacity(commonColors.backgroundSecondary, 0.8),
                        border:
                          pressedButton === 'up'
                            ? `1px solid ${commonColors.borderFocus}`
                            : `1px solid ${commonColors.borderPrimary}`,
                        boxShadow:
                          pressedButton === 'up'
                            ? `0 4px 16px ${commonColors.shadowPrimary}` // Design spec shadow
                            : '0 2px 8px rgba(0, 0, 0, 0.08)', // Design spec shadow
                        transform: pressedButton === 'up' ? 'scale(0.98)' : 'scale(1)', // Design spec: 0.98x scale
                        transition: 'all 0.2s ease-in-out', // Design spec: 0.2s ease-in-out
                        borderRadius: '8px', // Consistent with design
                      }}
                    >
                      <IconChevronUp size={16} />
                    </ActionIcon>
                    <ActionIcon
                      variant="subtle"
                      size="md"
                      onClick={scrollToNextSection}
                      aria-label={`Go to next section: ${getSectionName(Math.min(sections.length - 1, currentSection + 1))}`}
                      style={{
                        background:
                          pressedButton === 'down'
                            ? colorCombinations.primaryGradient
                            : withOpacity(commonColors.backgroundSecondary, 0.8),
                        border:
                          pressedButton === 'down'
                            ? `1px solid ${commonColors.borderFocus}`
                            : `1px solid ${commonColors.borderPrimary}`,
                        boxShadow:
                          pressedButton === 'down'
                            ? `0 4px 16px ${commonColors.shadowPrimary}` // Design spec shadow
                            : '0 2px 8px rgba(0, 0, 0, 0.08)', // Design spec shadow
                        transform: pressedButton === 'down' ? 'scale(0.98)' : 'scale(1)', // Design spec: 0.98x scale
                        transition: 'all 0.2s ease-in-out', // Design spec: 0.2s ease-in-out
                        borderRadius: '8px', // Consistent with design
                      }}
                    >
                      <IconChevronDown size={16} />
                    </ActionIcon>
                  </Group>
                </Group>
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
          mounted={isVisible && showIndicator && !isModalOpen}
          transition="fade"
          duration={500}
          timingFunction="ease-out"
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
                transition: 'all 0.3s ease-out', // Smooth container transition
              }}
              className={className}
            >
              <Progress
                value={scrollProgress}
                size="xs"
                radius="xl"
                color={commonColors.accentPrimary}
                style={{
                  width: '4px',
                  height: '200px',
                  background: withOpacity(commonColors.backgroundSecondary, 0.1),
                  backdropFilter: 'blur(10px)',
                  border: `1px solid ${commonColors.borderPrimary}`,
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
        duration={500}
        timingFunction="ease-out"
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
              transition: 'all 0.3s ease-out', // Smooth container transition
            }}
            className={className}
          >
            <Box
              style={{
                background: `${commonColors.backgroundCard}CC`,
                backdropFilter: 'blur(20px)',
                border: `1px solid ${commonColors.borderPrimary}`,
                borderRadius: '16px',
                padding: '16px',
                minWidth: '200px',
                boxShadow: isHovered
                  ? `0 8px 32px rgba(0, 0, 0, 0.15), 0 0 24px ${commonColors.shadowPrimaryLight}`
                  : `0 8px 32px rgba(0, 0, 0, 0.1)`,
                transform: isHovered ? 'scale(1.02)' : 'scale(1)',
                transition: 'all 0.3s ease-out',
              }}
              onMouseEnter={() => {
                setIsHovered(true);
                setShowIndicator(true); // Keep indicator visible while hovering
                // Clear any existing timeouts when hovering
                if (hideTimeout) {
                  clearTimeout(hideTimeout);
                  setHideTimeout(null);
                }
                if (hoverTimeout) {
                  clearTimeout(hoverTimeout);
                  setHoverTimeout(null);
                }
              }}
              onMouseLeave={() => {
                setIsHovered(false);
                // Schedule hide when mouse leaves
                scheduleHide();
              }}
            >
              {/* Progress Section */}
              {showProgress && (
                <Box mb="md">
                  <Group justify="space-between" mb="xs">
                    <Text size="sm" fw={500} c={commonColors.textPrimary}>
                      Progress
                    </Text>
                    <Text size="sm" c={commonColors.textSecondary}>
                      {Math.round(scrollProgress)}%
                    </Text>
                  </Group>
                  <Progress
                    value={scrollProgress}
                    size="sm"
                    radius="xl"
                    color={commonColors.accentPrimary}
                    style={{
                      background: withOpacity(commonColors.backgroundSecondary, 0.1),
                    }}
                  />
                </Box>
              )}

              {/* Section Navigation */}
              {showNavigation && (
                <Box>
                  <Text size="sm" fw={500} c={commonColors.textPrimary} mb="xs">
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
                          transition: 'all 0.2s ease-in-out', // Design spec: 0.2s ease-in-out
                          background:
                            currentSection === index
                              ? withOpacity(commonColors.accentPrimary, 0.1)
                              : 'transparent',
                          border:
                            currentSection === index
                              ? `1px solid ${commonColors.borderFocus}`
                              : '1px solid transparent',
                          // Hover effect preparation
                          transform: 'scale(1)',
                        }}
                        onClick={() => scrollToSection(index)}
                        onMouseEnter={e => {
                          if (currentSection !== index) {
                            e.currentTarget.style.background = withOpacity(
                              commonColors.backgroundSecondary,
                              0.5
                            );
                            e.currentTarget.style.transform = 'scale(1.02)'; // Design spec: 1.02x scale
                            e.currentTarget.style.boxShadow = '0 4px 16px rgba(0, 0, 0, 0.12)'; // Design spec shadow
                          }
                        }}
                        onMouseLeave={e => {
                          if (currentSection !== index) {
                            e.currentTarget.style.background = 'transparent';
                            e.currentTarget.style.transform = 'scale(1)';
                            e.currentTarget.style.boxShadow = 'none';
                          }
                        }}
                      >
                        <Text
                          size="sm"
                          c={
                            currentSection === index
                              ? commonColors.textInverse
                              : commonColors.textSecondary
                          }
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
                  size="sm"
                  onClick={scrollToPreviousSection}
                  aria-label={`Go to previous section: ${getSectionName(Math.max(0, currentSection - 1))}`}
                  style={{
                    background: withOpacity(commonColors.backgroundSecondary, 0.3),
                    border: `1px solid ${commonColors.borderPrimary}`,
                  }}
                >
                  <IconChevronUp size={16} />
                </ActionIcon>
                <ActionIcon
                  variant="subtle"
                  size="sm"
                  onClick={scrollToNextSection}
                  aria-label={`Go to next section: ${getSectionName(Math.min(sections.length - 1, currentSection + 1))}`}
                  style={{
                    background: withOpacity(commonColors.backgroundSecondary, 0.3),
                    border: `1px solid ${commonColors.borderPrimary}`,
                  }}
                >
                  <IconChevronDown size={16} />
                </ActionIcon>
              </Group>
            </Box>
          </Box>
        )}
      </Transition>
    </Box>
  );
}
