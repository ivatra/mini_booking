import { Box } from "@shared/ui-kit";

import s from "./grid-list.module.css";

interface IProps {
  children: React.ReactNode;
}

export const GridList = ({ children }: IProps) => (
  <Box className={s.scrollWrapper}>
    <Box
      className={s.grid}
      component="section">
      {children}
    </Box>
  </Box>
);
