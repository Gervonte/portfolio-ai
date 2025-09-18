'use client';

import { ActionIcon, ActionIconProps } from '@mantine/core';
import { ReactNode } from 'react';
import { MobileTooltip } from './MobileTooltip';

interface TouchActionIconProps extends ActionIconProps {
  children: ReactNode;
  tooltip?: string;
  href?: string;
  target?: string;
  onClick?: () => void;
  'aria-label'?: string;
}

/**
 * Touch-friendly ActionIcon with mobile-optimized tooltip
 * Ensures proper touch targets and accessibility on mobile devices
 */
export function TouchActionIcon({
  children,
  tooltip,
  href,
  target = '_blank',
  onClick,
  size = 'md',
  'aria-label': ariaLabel,
  ...props
}: TouchActionIconProps) {
  // Ensure minimum touch target size on mobile
  const touchSize = size === 'xs' ? 'sm' : size === 'sm' ? 'md' : size;

  const actionIconProps: ActionIconProps = {
    ...props,
    size: touchSize,
    // Responsive touch targets: 5px on desktop, 44px on mobile
    style: {
      minHeight: '5px',
      minWidth: '44px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      transition: 'all 0.2s ease',
      ...props.style,
    },
  };

  const actionIcon = (
    <ActionIcon
      {...actionIconProps}
      onClick={onClick}
      aria-label={ariaLabel || tooltip}
      onMouseEnter={(e: React.MouseEvent<HTMLButtonElement>) => {
        e.currentTarget.style.transform = 'scale(1.1)';
        e.currentTarget.style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.15)';
      }}
      onMouseLeave={(e: React.MouseEvent<HTMLButtonElement>) => {
        e.currentTarget.style.transform = 'scale(1)';
        e.currentTarget.style.boxShadow = 'none';
      }}
    >
      {children}
    </ActionIcon>
  );

  // If href is provided, wrap in anchor tag
  const wrappedActionIcon = href ? (
    <a href={href} target={target} style={{ textDecoration: 'none' }}>
      {actionIcon}
    </a>
  ) : (
    actionIcon
  );

  // If no tooltip, return wrapped ActionIcon
  if (!tooltip) {
    return wrappedActionIcon;
  }

  // Wrap with mobile-optimized tooltip
  return (
    <MobileTooltip label={tooltip} trigger="both" mobileBehavior="tap" position="top" offset={8}>
      {wrappedActionIcon}
    </MobileTooltip>
  );
}
