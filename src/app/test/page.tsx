'use client';

import { Container, Title, Text, Button, Group, Box, Stack, Grid, Card } from '@mantine/core';
import SakuraBackground from '@/components/SakuraBackground';
import SakuraEffect from '@/components/SakuraEffect';
import { useState } from 'react';

export default function TestPage() {
  const [currentEffect, setCurrentEffect] = useState<'falling' | 'floating' | 'gentle'>('falling');
  const [currentIntensity, setCurrentIntensity] = useState<'subtle' | 'moderate' | 'intense'>(
    'moderate'
  );

  return (
    <SakuraBackground intensity={currentIntensity} variant={currentEffect}>
      <Box
        style={{
          position: 'relative',
          zIndex: 2,
          minHeight: '100vh',
          padding: '2rem 0',
        }}
      >
        <Container size="lg">
          <Stack gap="xl">
            <Title order={1} ta="center" mb="md">
              Sakura Effects Test
            </Title>

            <Text ta="center" size="lg" mb="xl" c="dimmed">
              Test different sakura petal effects and intensities
            </Text>

            <Grid>
              <Grid.Col span={{ base: 12, md: 6 }}>
                <Card shadow="sm" padding="lg" radius="md" withBorder>
                  <Stack gap="md">
                    <Title order={3}>Effect Variants</Title>
                    <Group>
                      <Button
                        variant={currentEffect === 'falling' ? 'filled' : 'outline'}
                        color="sakura"
                        onClick={() => setCurrentEffect('falling')}
                      >
                        Falling
                      </Button>
                      <Button
                        variant={currentEffect === 'floating' ? 'filled' : 'outline'}
                        color="sakura"
                        onClick={() => setCurrentEffect('floating')}
                      >
                        Floating
                      </Button>
                      <Button
                        variant={currentEffect === 'gentle' ? 'filled' : 'outline'}
                        color="sakura"
                        onClick={() => setCurrentEffect('gentle')}
                      >
                        Gentle
                      </Button>
                    </Group>
                  </Stack>
                </Card>
              </Grid.Col>

              <Grid.Col span={{ base: 12, md: 6 }}>
                <Card shadow="sm" padding="lg" radius="md" withBorder>
                  <Stack gap="md">
                    <Title order={3}>Intensity Levels</Title>
                    <Group>
                      <Button
                        variant={currentIntensity === 'subtle' ? 'filled' : 'outline'}
                        color="sakura"
                        onClick={() => setCurrentIntensity('subtle')}
                      >
                        Subtle
                      </Button>
                      <Button
                        variant={currentIntensity === 'moderate' ? 'filled' : 'outline'}
                        color="sakura"
                        onClick={() => setCurrentIntensity('moderate')}
                      >
                        Moderate
                      </Button>
                      <Button
                        variant={currentIntensity === 'intense' ? 'filled' : 'outline'}
                        color="sakura"
                        onClick={() => setCurrentIntensity('intense')}
                      >
                        Intense
                      </Button>
                    </Group>
                  </Stack>
                </Card>
              </Grid.Col>
            </Grid>

            <Card shadow="sm" padding="lg" radius="md" withBorder>
              <Stack gap="md">
                <Title order={3}>Individual Sakura Effect</Title>
                <Text size="sm" c="dimmed">
                  This is a separate sakura effect component that can be used independently
                </Text>
                <Box style={{ height: '200px', position: 'relative' }}>
                  <SakuraEffect
                    petalCount={10}
                    petalSize={12}
                    fallSpeed={0.4}
                    windSpeed={0.3}
                    colors={['#F8BBD9', '#FCE4EC', '#F48FB1']}
                  />
                  <Box
                    style={{
                      position: 'absolute',
                      top: '50%',
                      left: '50%',
                      transform: 'translate(-50%, -50%)',
                      zIndex: 3,
                      background: 'rgba(255, 255, 255, 0.9)',
                      padding: '1rem',
                      borderRadius: '8px',
                      textAlign: 'center',
                    }}
                  >
                    <Text size="sm" fw={500}>
                      Individual Effect
                    </Text>
                  </Box>
                </Box>
              </Stack>
            </Card>

            <Group justify="center">
              <Button component="a" href="/" variant="outline" color="sakura">
                Back to Home
              </Button>
            </Group>
          </Stack>
        </Container>
      </Box>
    </SakuraBackground>
  );
}
