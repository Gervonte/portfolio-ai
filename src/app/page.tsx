import { Container, Title, Text, Button, Group } from '@mantine/core';

export default function HomePage() {
  return (
    <Container size="lg" py="xl">
      <Title order={1} ta="center" mb="md">
        Welcome to My Portfolio
      </Title>
      <Text ta="center" size="lg" mb="xl" c="dimmed">
        Professional portfolio showcasing AI-assisted and traditional
        development work
      </Text>
      <Group justify="center">
        <Button size="lg" color="sakura">
          View My Work
        </Button>
        <Button size="lg" variant="outline" color="sakura">
          Contact Me
        </Button>
      </Group>
    </Container>
  );
}
