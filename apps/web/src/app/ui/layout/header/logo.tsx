import { Group, Title } from "@mantine/core";
import { IconBuilding } from "@tabler/icons-react";

const iconColor =
  "light-dark(var(--mantine-color-blue-6), var(--mantine-color-blue-3))";

const Logo = () => (
  <Group gap="xs">
    <IconBuilding
      size={22}
      style={{ color: iconColor }}
    />
    <Title order={4}>MiniBooking</Title>
  </Group>
);

export default Logo;
