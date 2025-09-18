'use client';

import { Box, Group, Text } from '@mantine/core';
import { memo } from 'react';
import { formatSectionTitle } from './utils';
import { TabNavigationProps } from './types';

const TabNavigation = memo(
  ({ technicalSections, activeTab, onTabChange, commonColors }: TabNavigationProps) => {
    return (
      <Box
        style={{
          background: commonColors.backgroundCard,
          padding: '0',
          margin: '0 -1rem',
          borderBottom: 'none',
          display: 'flex',
          justifyContent: 'center',
          width: 'calc(100% + 2rem)',
          minHeight: '64px',
          overflowX: 'auto',
          scrollbarWidth: 'none',
          msOverflowStyle: 'none',
          WebkitOverflowScrolling: 'touch',
          gap: '0',
          position: 'relative',
          zIndex: 10,
          boxShadow: `0 1px 3px ${commonColors.shadowLight}`,
          borderRadius: 'var(--mantine-radius-lg) var(--mantine-radius-lg) 0 0',
        }}
        className="hide-scrollbar"
      >
        {technicalSections.map(({ key, icon }) => (
          <Box
            key={key}
            id={`tab-${key}`}
            onClick={() => onTabChange(key)}
            onKeyDown={e => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                onTabChange(key);
              }
            }}
            tabIndex={0}
            role="tab"
            aria-selected={activeTab === key}
            aria-controls={`tabpanel-${key}`}
            style={{
              fontWeight: 600,
              transition: 'all 0.2s ease-in-out',
              padding: 'var(--mantine-spacing-sm) var(--mantine-spacing-md)',
              fontSize: 'var(--mantine-font-size-sm)',
              color: activeTab === key ? commonColors.accentPrimary : commonColors.textSecondary,
              background: activeTab === key ? commonColors.backgroundCard : 'transparent',
              flex: '1 1 0',
              minWidth: '0',
              textAlign: 'center',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              borderTop:
                activeTab === key
                  ? `4px solid ${commonColors.accentPrimary}`
                  : '4px solid transparent',
              borderBottom: activeTab === key ? 'none' : `2px solid ${commonColors.borderPrimary}`,
              cursor: 'pointer',
              height: '100%',
              minHeight: '56px',
              whiteSpace: 'nowrap',
              transform: activeTab === key ? 'scale(1.01)' : 'scale(1)',
              boxShadow:
                activeTab === key
                  ? `0 2px 8px ${commonColors.shadowLight}, 0 1px 2px ${commonColors.shadowLight}`
                  : `0 1px 2px ${commonColors.shadowLight}`,
              borderRadius:
                activeTab === key ? 'var(--mantine-radius-md) var(--mantine-radius-md) 0 0' : '0',
              position: 'relative',
              overflow: 'hidden',
              zIndex: activeTab === key ? 20 : 1,
              marginBottom: activeTab === key ? '-1px' : '0',
              marginTop: activeTab === key ? '1px' : '0',
            }}
            onMouseEnter={e => {
              if (activeTab !== key) {
                e.currentTarget.style.transform = 'scale(1.02)';
                e.currentTarget.style.boxShadow = `0 3px 12px ${commonColors.shadowLight}, 0 1px 3px ${commonColors.shadowLight}`;
                e.currentTarget.style.marginTop = '1px';
                e.currentTarget.style.marginBottom = '-1px';
              }
            }}
            onMouseLeave={e => {
              if (activeTab !== key) {
                e.currentTarget.style.transform = 'scale(1)';
                e.currentTarget.style.boxShadow = `0 1px 2px ${commonColors.shadowLight}`;
                e.currentTarget.style.marginTop = '0';
                e.currentTarget.style.marginBottom = '0';
              }
            }}
          >
            <Group gap="sm" align="center" wrap="nowrap">
              {icon}
              <Text size="sm" fw={600}>
                {formatSectionTitle(key)}
              </Text>
            </Group>
          </Box>
        ))}
      </Box>
    );
  }
);

TabNavigation.displayName = 'TabNavigation';

export default TabNavigation;
