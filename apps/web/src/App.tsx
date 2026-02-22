import { Container, Title, Group, Button, Text } from "@mantine/core";

function App() {
  return (
    <Container py="xl">
      <Title order={2}>Mantine + Vite + TS + IZI</Title>
      <Text c="dimmed" mt="xs">
        Все работает 🎉
      </Text>

      <Group mt="md">
        <Button>Primary</Button>
        <Button variant="light">Light</Button>
      </Group>
    </Container>
  );
}

export default App;
