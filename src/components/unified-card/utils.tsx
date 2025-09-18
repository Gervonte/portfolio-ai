import { CardStyles, SizeConfig } from './types';

export const getCardStyles = (variant: string): CardStyles => {
  const baseStyles: CardStyles = {
    transition: 'all 0.3s ease',
    boxShadow: '0 2px 10px rgba(0,0,0,0.1)',
  };

  switch (variant) {
    case 'elevated':
      return {
        ...baseStyles,
        boxShadow: '0 4px 20px rgba(0,0,0,0.15)',
      };
    case 'outlined':
      return {
        ...baseStyles,
        boxShadow: 'none',
        border: '2px solid',
        borderColor: 'var(--mantine-color-gray-3)',
      };
    case 'filled':
      return {
        ...baseStyles,
        background: 'var(--mantine-color-gray-0)',
      };
    default:
      return baseStyles;
  }
};

export const getSizeConfig = (size: string): SizeConfig => {
  switch (size) {
    case 'sm':
      return {
        thumbnailHeight: '120px',
        padding: 'md',
      };
    case 'md':
      return {
        thumbnailHeight: '160px',
        padding: 'lg',
      };
    case 'lg':
      return {
        thumbnailHeight: '200px',
        padding: 'xl',
      };
    default:
      return {
        thumbnailHeight: '160px',
        padding: 'lg',
      };
  }
};

export const isUrl = (text: string): boolean => {
  return text.includes('.com') || text.includes('http');
};

export const getHoverStyles = () => ({
  transform: 'translateY(-2px)',
  boxShadow: '0 8px 25px rgba(0,0,0,0.15)',
});

export const getDefaultHoverStyles = () => ({
  transform: 'translateY(0)',
  boxShadow: '0 2px 10px rgba(0,0,0,0.1)',
});
