'use client';

import { useMobileTooltip } from '@/hooks/useMobileTooltip';
import { Tooltip, TooltipProps } from '@mantine/core';
import { ReactNode } from 'react';

interface MobileTooltipProps extends Omit<TooltipProps, 'opened' | 'onOpen' | 'onClose'> {
  children: ReactNode;
  label: string | ReactNode;
  delay?: number;
  disabled?: boolean;
  trigger?: 'hover' | 'click' | 'both';
  mobileBehavior?: 'tap' | 'hold' | 'both';
}

/**
 * Mobile-optimized tooltip component that handles both hover and touch interactions
 * Provides better UX on mobile devices with appropriate touch handling
 */
export function MobileTooltip({
  children,
  label,
  delay = 200,
  disabled = false,
  trigger = 'both',
  mobileBehavior = 'tap', // eslint-disable-line @typescript-eslint/no-unused-vars
  multiline = true,
  withArrow = true,
  position = 'top',
  offset = 8,
  ...props
}: MobileTooltipProps) {
  const { opened, handlers } = useMobileTooltip({
    delay,
    disabled,
    trigger,
    // mobileBehavior is available for future enhancements
  });

  // Enhanced props for mobile
  const tooltipProps: TooltipProps = {
    ...props,
    opened,
    label,
    multiline,
    withArrow,
    position,
    offset,
    // Mobile-specific styling
    styles: {
      tooltip: {
        fontSize: '14px',
        maxWidth: '280px',
        padding: '8px 12px',
        borderRadius: '8px',
        boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)',
        zIndex: 1000,
      },
      arrow: {
        zIndex: 1001,
      },
    },
    // Prevent tooltip from being cut off on mobile
    withinPortal: true,
    // Better positioning for mobile
    positionDependencies: [opened],
  };

  return (
    <Tooltip {...tooltipProps}>
      <div
        {...handlers}
        style={{
          // Ensure touch targets are large enough on mobile
          minHeight: '44px',
          minWidth: '44px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        {children}
      </div>
    </Tooltip>
  );
}
