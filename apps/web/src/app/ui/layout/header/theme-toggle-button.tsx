import { IconMoon, IconSun } from "@shared/icons";
import {
  ActionIcon,
  useColorScheme,
  type ActionIconProps,
} from "@shared/ui-kit";

const iconProps: ActionIconProps = {
  variant: "default",
  radius: "md",
  size: "lg",
};

const ThemeToggleButton = () => {
  const { colorScheme, setColorScheme } = useColorScheme();

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
