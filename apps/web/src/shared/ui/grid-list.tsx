import { Box, Paper } from "@shared/ui-kit";

import s from "./grid-list.module.css";

interface IProps {
  children: React.ReactNode;
}

const GridList = ({ children }: IProps) => (
  <Box className={s.scrollWrapper}>
    <Paper
      className={s.grid}
      component="section">
      {children}
    </Paper>
  </Box>
);

export default GridList;
