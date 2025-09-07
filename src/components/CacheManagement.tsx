'use client';

import { useState, useEffect } from 'react';
import {
  Card,
  Title,
  Text,
  Group,
  Button,
  Stack,
  Progress,
  Badge,
  Alert,
  LoadingOverlay,
  Divider,
} from '@mantine/core';
import { IconTrash, IconRefresh, IconInfoCircle } from '@tabler/icons-react';

interface CacheStats {
  totalEntries: number;
  totalSize: number;
  maxSize: number;
  hitRate?: number;
}

export default function CacheManagement() {
  const [stats, setStats] = useState<CacheStats | null>(null);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<string | null>(null);

  const fetchStats = async () => {
    setLoading(true);
    try {
      const response = await fetch('/api/cache');
      const data = await response.json();

      if (data.success) {
        setStats(data.stats);
        setMessage('Cache statistics updated');
      } else {
        setMessage('Failed to fetch cache statistics');
      }
    } catch (error) {
      setMessage('Error fetching cache statistics');
    } finally {
      setLoading(false);
    }
  };

  const clearCache = async () => {
    setLoading(true);
    try {
      const response = await fetch('/api/cache', { method: 'DELETE' });
      const data = await response.json();

      if (data.success) {
        setMessage('Cache cleared successfully');
        await fetchStats(); // Refresh stats
      } else {
        setMessage('Failed to clear cache');
      }
    } catch (error) {
      setMessage('Error clearing cache');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStats();
  }, []);

  const formatBytes = (bytes: number): string => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  const getUsagePercentage = (): number => {
    if (!stats) return 0;
    return (stats.totalSize / stats.maxSize) * 100;
  };

  const getUsageColor = (): string => {
    const percentage = getUsagePercentage();
    if (percentage < 50) return 'green';
    if (percentage < 80) return 'yellow';
    return 'red';
  };

  return (
    <Card withBorder radius="lg" p="xl">
      <LoadingOverlay visible={loading} />

      <Stack gap="md">
        <Group justify="space-between" align="center">
          <Title order={3}>Screenshot Cache Management</Title>
          <Group>
            <Button
              leftSection={<IconRefresh size={16} />}
              onClick={fetchStats}
              variant="outline"
              size="sm"
            >
              Refresh
            </Button>
            <Button
              leftSection={<IconTrash size={16} />}
              onClick={clearCache}
              color="red"
              variant="outline"
              size="sm"
            >
              Clear Cache
            </Button>
          </Group>
        </Group>

        {message && (
          <Alert
            icon={<IconInfoCircle size={16} />}
            color={message.includes('success') ? 'green' : 'red'}
            onClose={() => setMessage(null)}
            withCloseButton
          >
            {message}
          </Alert>
        )}

        {stats && (
          <Stack gap="md">
            <Group justify="space-between">
              <Text fw={500}>Cache Usage</Text>
              <Badge color={getUsageColor()} variant="light">
                {formatBytes(stats.totalSize)} / {formatBytes(stats.maxSize)}
              </Badge>
            </Group>

            <Progress
              value={getUsagePercentage()}
              color={getUsageColor()}
              size="lg"
              radius="md"
            />

            <Divider />

            <Group justify="space-between">
              <Text size="sm" c="dimmed">
                Total Entries
              </Text>
              <Badge variant="outline">{stats.totalEntries}</Badge>
            </Group>

            <Group justify="space-between">
              <Text size="sm" c="dimmed">
                Cache Size
              </Text>
              <Text size="sm" fw={500}>
                {formatBytes(stats.totalSize)}
              </Text>
            </Group>

            <Group justify="space-between">
              <Text size="sm" c="dimmed">
                Max Size
              </Text>
              <Text size="sm" fw={500}>
                {formatBytes(stats.maxSize)}
              </Text>
            </Group>

            {stats.hitRate && (
              <Group justify="space-between">
                <Text size="sm" c="dimmed">
                  Hit Rate
                </Text>
                <Badge color="blue" variant="light">
                  {(stats.hitRate * 100).toFixed(1)}%
                </Badge>
              </Group>
            )}
          </Stack>
        )}

        <Alert
          icon={<IconInfoCircle size={16} />}
          color="blue"
          title="Cache Information"
        >
          <Text size="sm">
            Screenshots are cached for 7 days to improve performance. The cache
            automatically cleans up expired entries and manages size limits.
          </Text>
        </Alert>
      </Stack>
    </Card>
  );
}
