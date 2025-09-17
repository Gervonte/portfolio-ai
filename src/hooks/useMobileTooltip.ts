import { useCallback, useEffect, useRef, useState } from 'react';

interface UseMobileTooltipOptions {
  delay?: number;
  disabled?: boolean;
  trigger?: 'hover' | 'click' | 'both';
}

interface UseMobileTooltipReturn {
  opened: boolean;
  setOpened: (opened: boolean) => void;
  handlers: {
    onMouseEnter: () => void;
    onMouseLeave: () => void;
    onTouchStart: () => void;
    onTouchEnd: () => void;
    onClick: () => void;
  };
  ref: React.RefObject<HTMLElement | null>;
}

/**
 * Custom hook for mobile-optimized tooltip behavior
 * Handles both hover (desktop) and touch (mobile) interactions
 */
export function useMobileTooltip({
  delay = 200,
  disabled = false,
  trigger = 'both',
}: UseMobileTooltipOptions = {}): UseMobileTooltipReturn {
  const [opened, setOpened] = useState(false);
  const [timeoutId, setTimeoutId] = useState<NodeJS.Timeout | null>(null);
  const ref = useRef<HTMLElement>(null);

  // Note: Hover detection removed as it's not currently used
  // but can be re-added if needed for future enhancements

  const clearTooltipTimeout = useCallback(() => {
    if (timeoutId) {
      clearTimeout(timeoutId);
      setTimeoutId(null);
    }
  }, [timeoutId]);

  const openTooltip = useCallback(() => {
    if (disabled) return;

    clearTooltipTimeout();
    const id = setTimeout(() => {
      setOpened(true);
    }, delay);
    setTimeoutId(id);
  }, [disabled, delay, clearTooltipTimeout]);

  const closeTooltip = useCallback(() => {
    clearTooltipTimeout();
    setOpened(false);
  }, [clearTooltipTimeout]);

  const toggleTooltip = useCallback(() => {
    if (disabled) return;

    if (opened) {
      closeTooltip();
    } else {
      openTooltip();
    }
  }, [disabled, opened, openTooltip, closeTooltip]);

  // Handle mouse events (desktop)
  const handleMouseEnter = useCallback(() => {
    if (trigger === 'hover' || trigger === 'both') {
      openTooltip();
    }
  }, [trigger, openTooltip]);

  const handleMouseLeave = useCallback(() => {
    if (trigger === 'hover' || trigger === 'both') {
      closeTooltip();
    }
  }, [trigger, closeTooltip]);

  // Handle touch events (mobile)
  const handleTouchStart = useCallback(() => {
    if (trigger === 'click' || trigger === 'both') {
      // On mobile, show tooltip immediately on touch
      clearTooltipTimeout();
      setOpened(true);
    }
  }, [trigger, clearTooltipTimeout]);

  const handleTouchEnd = useCallback(() => {
    // On mobile, keep tooltip open until user taps elsewhere
    // This is handled by the click handler
  }, []);

  // Handle click events (both desktop and mobile)
  const handleClick = useCallback(() => {
    if (trigger === 'click' || trigger === 'both') {
      toggleTooltip();
    }
  }, [trigger, toggleTooltip]);

  // Handle click outside to close tooltip
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent | TouchEvent) => {
      if (opened && ref.current && event.target && !ref.current.contains(event.target as Node)) {
        closeTooltip();
      }
    };

    if (opened) {
      // Add event listeners for both mouse and touch events
      document.addEventListener('mousedown', handleClickOutside);
      document.addEventListener('touchstart', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('touchstart', handleClickOutside);
    };
  }, [opened, closeTooltip]);

  // Cleanup timeout on unmount
  useEffect(() => {
    return () => {
      clearTooltipTimeout();
    };
  }, [clearTooltipTimeout]);

  return {
    opened,
    setOpened,
    handlers: {
      onMouseEnter: handleMouseEnter,
      onMouseLeave: handleMouseLeave,
      onTouchStart: handleTouchStart,
      onTouchEnd: handleTouchEnd,
      onClick: handleClick,
    },
    ref,
  };
}
