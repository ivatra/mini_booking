import { Box } from "@shared/ui-kit";

import s from "./grid-list.module.css";

interface IProps {
  children: React.ReactNode;
  hasFilters?: boolean;
}

export const GridList = ({ children, hasFilters }: IProps) => (
  <Box
    className={s.scrollWrapper}
    mah={
      hasFilters
        ? "calc(100svh - var(--mantine-spacing-lg) * 20)"
        : "calc(100svh - var(--mantine-spacing-lg) * 15)"
    }>
    <Box
      className={s.grid}
      component="section">
      {children}
    </Box>
  </Box>
);
