import type { BoxProps, PaperProps } from "@mantine/core";

export const layoutWrapperProps: BoxProps = {
  style: {
    padding: "var(--mantine-spacing-lg)",
    background:
      "light-dark(var(--mantine-color-gray-2), var(--mantine-color-dark-8))",
    scrollbarGutter: "stable",
    height: "100dvh",
    width: "100dvw",
    overflow: "hidden",
  },
};

export const layoutRootProps: PaperProps = {
  radius: "md",
  withBorder: true,
  style: {
    height: "calc(100dvh - var(--mantine-spacing-lg) * 2)",
    display: "flex",
    flexDirection: "column",
    background: "light-dark(#ffffff, var(--mantine-color-dark-6))",
  },
};

export const layoutHeaderProps: PaperProps = {
  style: {
    border: "1px solid light-dark(#d7dde8, #343a46)",
    boxShadow:
      "0 4px 14px light-dark(rgba(22, 30, 46, 0.08), rgba(0, 0, 0, 0.35))",
  },
};

export const layoutMainProps: BoxProps = {
  style: {
    display: "flex",
    flex: 1,
    padding: "var(--mantine-spacing-lg)",
  },
};
