import type { ActionIconProps, GroupProps } from "@mantine/core";

export const headerGroupProps: GroupProps = {
  display: "flex",
  justify: "space-between",
  p: "md",
  px: "lg",
};

export const headerActionIconStaticProps: ActionIconProps = {
  radius: "md",
  size: "lg",
  variant: "filled",
};

export const headerGoBackProps: ActionIconProps = {
  radius: "md",
  size: "lg",
  variant: "filled",
  bg: "light-dark(var(--mantine-color-blue-6), var(--mantine-color-blue-6))",
};
