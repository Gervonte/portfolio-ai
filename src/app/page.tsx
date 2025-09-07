import {
  Container,
  Title,
  Text,
  Button,
  Group,
  Box,
  Stack,
} from '@mantine/core';
import SakuraBackground from '@/components/SakuraBackground';

export default function HomePage() {
  return (
    <SakuraBackground intensity="moderate" variant="falling">
      <Box
        style={{
          position: 'relative',
          zIndex: 2,
          minHeight: '100vh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <Container size="lg" py="xl">
          <Stack align="center" gap="xl">
            <Title
              order={1}
              ta="center"
              mb="md"
              style={{
                background: 'linear-gradient(135deg, #E91E63, #F8BBD9)',
                backgroundClip: 'text',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                fontSize: 'clamp(2.5rem, 5vw, 4rem)',
                fontWeight: 700,
              }}
            >
              Welcome to My Portfolio
            </Title>
            <Text
              ta="center"
              size="xl"
              mb="xl"
              c="dimmed"
              style={{
                maxWidth: '600px',
                lineHeight: 1.6,
              }}
            >
              Professional portfolio showcasing AI-assisted and traditional
              development work with a touch of mono no aware
            </Text>
            <Group justify="center" gap="md">
              <Button
                size="lg"
                color="sakura"
                style={{
                  background: 'linear-gradient(135deg, #E91E63, #F48FB1)',
                  border: 'none',
                  boxShadow: '0 4px 15px rgba(233, 30, 99, 0.3)',
                }}
              >
                View My Work
              </Button>
              <Button
                size="lg"
                variant="outline"
                color="sakura"
                style={{
                  borderColor: '#E91E63',
                  color: '#E91E63',
                  background: 'rgba(248, 187, 217, 0.1)',
                }}
              >
                Contact Me
              </Button>
            </Group>
          </Stack>
        </Container>
      </Box>
    </SakuraBackground>
  );
}
