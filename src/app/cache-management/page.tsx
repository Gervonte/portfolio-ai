import { Container, Title, Text, Stack, Box } from '@mantine/core';
import CacheManagement from '@/components/CacheManagement';

export default function CacheManagementPage() {
  return (
    <Container size="md" py="xl">
      <Stack gap="xl">
        <Box ta="center">
          <Title order={1} mb="md">
            Cache Management
          </Title>
          <Text c="dimmed" size="lg">
            Monitor and manage screenshot cache performance
          </Text>
        </Box>

        <CacheManagement />
      </Stack>
    </Container>
  );
}
