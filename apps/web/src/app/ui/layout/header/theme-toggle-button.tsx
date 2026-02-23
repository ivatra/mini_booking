import {
  ActionIcon,
  useMantineColorScheme,
  type ActionIconProps,
} from "@mantine/core";
import { IconMoon, IconSun } from "@tabler/icons-react";

const iconProps: ActionIconProps = {
  variant: "default",
  radius: "md",
  size: "lg",
};

const ThemeToggleButton = () => {
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
};

export default ThemeToggleButton;
