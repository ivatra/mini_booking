import { ActionIcon, useMantineColorScheme } from "@mantine/core";
import { IconMoon, IconSun } from "@tabler/icons-react";

import type { TActionIconProps } from "../types";

const iconProps: TActionIconProps = {
  variant: "default",
  radius: "md",
  size: "lg",
};

export function ThemeToggle() {
  const { colorScheme, setColorScheme } = useMantineColorScheme();

  const isDark = colorScheme === "dark";

  const switchTheme = () => setColorScheme(isDark ? "light" : "dark");

  return (
    <ActionIcon
      {...iconProps}
      onClick={switchTheme}
      aria-label="Toggle color scheme">
      {isDark ? <IconSun size={18} /> : <IconMoon size={18} />}
    </ActionIcon>
  );
}
